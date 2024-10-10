import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Blog Title",
      subtitle: "This is a longer description about your blog.",
      base: "https://example.com/",
      author: {
        name: "Your Name",
        email: "", // Optional
      },
    },
  });

  const breadcrumbNamesArray = [
    { url: "/", name: "Home" },
    { url: "/en/", name: "English" },
    { url: "/en/post/", name: "Posts" },
  ];

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: "html",
    // optional, output image formats
    formats: ["jpg", "webp"],
    // optional, output image widths
    widths: ["auto", 400, 800],
    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: "lazy",
      sizes: "100vw",
      decoding: "async",
    },
  });

  eleventyConfig.addFilter("breadcrumb", function (currentUrl) {
    return breadcrumbNamesArray.filter(({ url }) => {
      return currentUrl.startsWith(url);
    });
  });

  eleventyConfig.addFilter('date', function(date) {
    if (!date) return '';

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(date).toLocaleString(this.lang, options);
  });



}
