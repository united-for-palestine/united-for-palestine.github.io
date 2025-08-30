import pluginRss from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import fs from "node:fs";
import { fileURLToPath } from "url";
import path from "path";
import mime from "mime-types";
import * as mm from "music-metadata";
import markdownTOC from 'markdown-it-toc-done-right';
import markdownAnchor from 'markdown-it-anchor';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function secondsToHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy("asset");

  const breadcrumbNamesArray = [
    { url: "/", name: "Home" },
    { url: "/en/", name: "English" },
    { url: "/en/post/", name: "Posts" },
    { url: "/en/event/", name: "Events" },
    { url: "/en/speech/", name: "Speeches" },
  ];

  eleventyConfig.addFilter("breadcrumb", function (currentUrl) {
    return breadcrumbNamesArray.filter(({ url }) => {
      return currentUrl.startsWith(url) && currentUrl !== url;
    });
  });

  eleventyConfig.addShortcode("renderlayoutblock", function (name) {
    return (this.page.layoutblock ?? {})[name];
  });

  eleventyConfig.addFilter("truncate", function (str, n = 256) {
    if (typeof str !== "string") return "";
    return str.length > n ? str.slice(0, n - 1) + "…" : str;
  });

  eleventyConfig.addPairedShortcode("layoutblock", function (content, name) {
    this.page.layoutblock = this.page.layoutblock ?? {};
    this.page.layoutblock[name] = content;
    return "";
  });

  let once = {}

  eleventyConfig.addPairedShortcode("once", function (content) {
    once[content] = content
    return ''
  })

  eleventyConfig.addPairedShortcode("renderOnce", function renderOnce() {
    return Object.values(once).join('\n')
  })

  eleventyConfig.addNunjucksAsyncFilter(
    "getAudioMetadata",
    async function (filePath, callback) {
      // Get the file type (MIME type)
      const absolutePath = path.join(__dirname, filePath);
      const mimeType = mime.lookup(absolutePath);

      const metadata = await mm.parseFile(absolutePath);
      const duration = secondsToHMS(metadata.format.duration || 0); // Duration in seconds

      // Get the file size (in bytes)
      const fileSize = fs.statSync(absolutePath).size;

      const data = {
        duration,
        file: filePath,
        type: mimeType || "audio/mpeg", // Default to 'audio/mpeg' if unknown
        length: fileSize,
      };

      return callback(null, data);
    },
  );

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

  eleventyConfig.addFilter("date", function (date, lang) {
    if (!date) return "";

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleString(lang || "en", options);
  });

  const md = markdownIt({
    breaks: true,
    html: true,
    linkify: true,
  })
    .use(markdownAnchor, {
      level: 2,
      permalink: true,
    })
    .use(markdownTOC, {
      level: 2
    });

  // Override the default table renderer
  md.renderer.rules.table_open = () => '<figure><table>';
  md.renderer.rules.table_close = () => `</table>
    <!-- <figcaption>A wide table showing horizontal scroll behavior.</figcaption> -->
  </figure>`;

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

  eleventyConfig.addFilter("markdown", function (markdown) {
    return md.render(markdown);
  });

  eleventyConfig.addNunjucksFilter("markdownFile", function (filePath) {
    const absolutePath = path.join(__dirname, filePath);
    const content = fs.readFileSync(absolutePath, "utf-8");

    return md.render(content);
  });

  eleventyConfig.addFilter("head", function find(collection = [], amount = 1) {
    // If you want more advanced, dynamic filtering, you might need https://lodash.com/docs/4.17.15#get
    // for fetching [deeply] nested properties.
    return collection.slice(0, amount);
  });

  eleventyConfig.addFilter("files", function (dir) {
    const directoryPath = path.join(__dirname, dir);

    return fs.readdirSync(directoryPath).map((file) => {
      const absolutePath = path.join(directoryPath, file);
      const type = mime.lookup(absolutePath);

      return {
        type,
        file: `/${path.join(dir, file)}`,
      };
    });
  });

  return {
    markdownTemplateEngine: "njk",
  };
}
