// credits to kevinzunigacuellar on github for the idea and code
// important: idk why dev server doesn't work because of this
import type { APIContext } from "astro";
import fs from "fs/promises";
import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";

const LDReg = await fs.readFile(new URL("./fonts/LexendDeca-Regular.ttf", import.meta.url));
const LDSemi = await fs.readFile(new URL("./fonts/LexendDeca-SemiBold.ttf", import.meta.url));
const pages = import.meta.glob("../blog/*.mdx", { eager: true });

export async function get({ params }: APIContext) {
  let q = `../blog/${params.slug}.mdx`;
  // @ts-ignore
  const { title, description, pubDate } = pages[q].frontmatter;
  const date = new Date(pubDate).toLocaleDateString("en", { dateStyle: "long" });
  const markup = html` <div style="color: #111827; width: 1200px; height: 630px; display: flex; flex-direction: column;">
    <div style="width: 100%; background-color: #18141c; height: 80%; display:flex; justify-content: center; padding: 0px 50px; flex-direction: column;">
      <div style="color: #cbd5e1; font-size: 24px; line-height: 24px; padding-bottom: 20px;">${date}</div>
      <div style="font-size: 52px; font-weight: 600; color: white; padding-bottom: 30px;">${title}</div>
      <div style="color: #cbd5e1; font-size: 30px; line-height: 42px;">${description}</div>
    </div>
    <div style="background-color: #201c24; width: 100%; height: 20%; display: flex; align-items: center; justify-content: space-between; padding: 0px 50px;">
      <div style="font-size: 30px; color: white; font-weight: 600;">lanceross.xyz</div>
      <div style="font-size: 30px; color: white; font-weight: 600;">Lance Ross (lancerossdev)</div>
    </div>
  </div>`;

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "LexendDeca",
        data: LDReg,
        weight: 400,
      },
      {
        name: "LexendDeca",
        data: LDSemi,
        weight: 600,
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return {
    body: pngBuffer,
    encoding: "binary",
  };
}

export async function getStaticPaths() {
  const paths = Object.keys(pages).map((path) => {
    const [, slug] = path.match(/\/blog\/(.*)\.mdx$/);
    return { params: { slug } };
  });
  return paths;
}
