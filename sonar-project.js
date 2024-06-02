const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://0.0.0.0:9000",
    options: {
      "sonar.login": "sqp_a15f7490253ef6c2a1a4b47ed7701b36241b5868",
      "sonar.projectKey": "calculator_project",
      "sonar.sources": ".",
      "sonar.tests": ".",
      "sonar.inclusions": "app.js",
      "sonar.test.inclusions": "app.test.js",
      "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
    },
  },
  () => {}
);
