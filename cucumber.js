module.exports = {
  default: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    tags: 'not @skip',
    parallel: 1,
  },
  dev: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    tags: 'not @skip',
    parallel: 1,
    worldParameters: {
      headless: false,
    },
  },
  ci: {
    require: ['support/**/*.js', 'steps/**/*.js'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'junit:reports/cucumber-report.xml',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    tags: 'not @skip and not @wip',
    parallel: 4,
    worldParameters: {
      headless: true,
    },
    retry: 1,
  },
};
