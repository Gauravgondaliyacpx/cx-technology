module.exports = function(eleventyConfig) {
  // Fast passthrough copy in dev server mode: serves assets directly from src/assets
  // without copying 1,119 large image and video files on every single save
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // Debounce file changes to prevent overlapping build loops ("You saved while Eleventy was running")
  eleventyConfig.setWatchThrottleWaitTime(300);

  // Explicitly ignore output directory and dependencies
  eleventyConfig.ignores.add("_site/**");
  eleventyConfig.ignores.add("node_modules/**");

  // Passthrough copy for static assets (copies to _site/assets during production build)
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Add custom filters
  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value, null, 2);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
