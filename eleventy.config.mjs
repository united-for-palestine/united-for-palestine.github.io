import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/en/feed.xml",
    collection: {
      name: "post_en", // iterate over `collections.posts`
      limit: 100, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "United for Palestine Posts",
      subtitle: "This is a longer description about your blog.",
      base: "https://united-for-palestine.github.io",
      author: {
        name: "United for Palestine",
        email: "crept-hurt-recount@duck.com",
      },
    },
  });

  const breadcrumbNamesArray = [
    { url: "/", name: "UFP" },
    { url: "/en/", name: "English" },
    { url: "/en/post/", name: "Posts" },
    { url: "/en/event/", name: "Events" },
  ];

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["jpg", "webp"],
    widths: ["auto", 400, 800],
    defaultAttributes: {
      loading: "lazy",
      sizes: "100vw",
      decoding: "async",
    },
  });

  eleventyConfig.addFilter("breadcrumb", function (currentUrl) {
    return breadcrumbNamesArray.filter(({ url }) => {
      return currentUrl.startsWith(url) && currentUrl !== url;
    });
  });

  eleventyConfig.addFilter("date", function (date) {
    if (!date) return "";

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleString(this.lang, options);
  });

  const md = markdownIt({
    html: true,
    linkify: true,
  });

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content;

    const caption = md.renderInline(alt, env);

    return `
        <figure>
          <img src="${src}" alt="${alt}" />
          <figcaption>${caption}</figcaption>
        </figure>
      `;
  };

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addNunjucksFilter("markdownFile", function (filePath) {
    const absolutePath = join(__dirname, filePath);
    const content = fs.readFileSync(absolutePath, "utf-8");

    return md.render(content);
  });

  eleventyConfig.addFilter("head", function find(collection = [], amount = 1) {
    // If you want more advanced, dynamic filtering, you might need https://lodash.com/docs/4.17.15#get
    // for fetching [deeply] nested properties.
    return collection.slice(0, amount)
  });

}
