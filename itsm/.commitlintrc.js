module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Customize your commit message format rules here
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'chore', 'refactor', 'test']],
  },
};
