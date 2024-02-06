module.exports = config => {

    config.addPassthroughCopy('./page/js');
    config.addPassthroughCopy('./page/gastrulation/*.js');
    config.addPassthroughCopy('./page/neuralcrest/*.js');

    return {
      markdownTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',

      dir: {
        input: 'page',
        output: 'dist'
      }
    };
  };