import fs from "node:fs/promises";
import fetch from "node-fetch";

interface DataType {
  data: {
    viewer: {
      repositories: {
        nodes: Repo[];
      };
    };
  };
}

interface Repo {
  name: string;
  stargazerCount: number;
  description: string;
  url: string;
  languages: {
    nodes: Language[];
  };
}

interface Language {
  name: string;
}

async function getProjects() {
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
          repositories(
            first: 20
            isFork: false
          ) {
            nodes {
              name
              description
              url
              stargazerCount
              languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
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
  const contributions = data.viewer.repositories.nodes
    .filter((repo) => repo.languages.nodes.length > 1)
    .map((repository) => {
      return {
        title: repository.name,
        description: repository.description,
        githubUrl: repository.url,
        technologies: repository.languages.nodes.map((language) => language.name),
        stargazers: repository.stargazerCount,
      };
    });
  return contributions;
}

const contributions = await getProjects();
await fs.writeFile("./src/content/projects.json", JSON.stringify(contributions, null, 2));

console.log("Projects list updated");
