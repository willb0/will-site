import fs from "node:fs/promises";
import fetch from "node-fetch";

interface DataType {
  data: {
    viewer: {
      repositoriesContributedTo: {
        nodes: Repo[];
      };
    };
  };
}

interface Repo {
  nameWithOwner: string;
  description: string;
  githubUrl: string;
  languages: {
    nodes: Language[];
  };
}

interface Language {
  name: string;
}

async function getLatestProjects() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
      query {
        viewer {
          repositoriesContributedTo(
            first: 20
            orderBy: {field: STARGAZERS, direction: DESC}
            contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
          ) {
            nodes {
              nameWithOwner
              description
              githubUrl
              languages(first: 4, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `,
    }),
  });

  const { data } = (await res.json()) as DataType;
  const projects = data.viewer.repositoriesContributedTo.nodes
    .filter((repo) => repo.languages.nodes.length > 1)
    .map((repository) => {
      return {
        title: repository.nameWithOwner,
        description: repository.description,
        githubUrl: repository.url,
        languages: repository.languages.nodes.map((language) => language.name),
      };
    });
  return projects;
}

const projects = await getLatestProjects();
await fs.writeFile("./src/content/projects.json", JSON.stringify(projects, null, 2));

console.log("Projects list updated!");
