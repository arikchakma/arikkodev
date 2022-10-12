const defaultConfig = require('@commitlint/config-conventional');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    ...defaultConfig.rules,
    'type-enum': [
      2,
      'always',
      [
        'fix', // A bug fix

        'test', // Adding missing tests or correcting existing tests,

        'style', //Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

        'tooling', //Changes that are not necessarily required to build the project (dependency updates, package managers, etc)

        'refactor', // A code change that neither fixes a bug nor adds a feature

        'revert', // Revert to the previous commit

        'example', // Adding example code or updating example code

        'docs', // Documentation changes

        'format', // Code format changes

        'feat', // A new feature

        'chore', // Changes to the build process or auxiliary tools and libraries such as documentation generation
      ],
    ],
  },
};
