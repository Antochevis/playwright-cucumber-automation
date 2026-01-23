module.exports = {
  default: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};
