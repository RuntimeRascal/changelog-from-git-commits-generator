'use strict';
module.exports = {
    types: [
    {
        value: 'breaking',
        name: 'breaking: a breaking change'
    },
    {
        value: 'build',
        name: 'build: a build improvment'
    },
    {
        value: 'ci',
        name: 'ci: continuous-integration'
    },
    {
        value: 'chore',
        name: 'chore: normal development'
    },
    {
        value: 'feat',
        name: 'feat: new feature'
    },
    {
        value: 'fix',
        name: 'fix: bug fix'
    },
    {
        value: 'docs',
        name: 'docs: documentation only changes'
    },
    {
        value: 'style',
        name: 'style: changes that do not affect the meaning of the code\n    (white-space, formatting, missing semi-colons, etc)'
    },
    {
        value: 'refactor',
        name: 'refactor: code change that neither fixes a bug nor adds a feature'
    },
    {
        value: 'perf',
        name: 'perf: code change that improves performance'
    },
    {
        value: 'test',
        name: 'test: adding missing tests'
    },
    {
        value: 'revert',
        name: 'revert:'
    },
    {
        value: 'other',
        name: 'other: doesnt fit in any other category'
    } ],
    scopes: [ { name: 'npm' }, { name: 'module' }, { name: 'localization' }, { name: 'scripts' },
    { name: 'package' }, { name: 'tasks' }, { name: 'typescript' }, { name: 'switches' }, { name: 'cli' },
        { name: 'resources' }
    ],
    /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
    messages:
    {
        type: 'select the type of change that you\'re committing:',
        scope: '\ndenote the SCOPE of this change (not optional):',
        // used if allowCustomScopes is true
        customScope: 'denote the SCOPE of this change:',
        subject: 'very short description of the change. (lowercase)(no-period):\n',
        body: 'provide a longer description of the change (optional). Use "|" to break new line:\nincludes motivation for the change and contrasts with previous behavior\n',
        breaking: 'list any BREAKING CHANGES. description of the change, justification and migration notes (optional):\n',
        footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
        confirmCommit: 'Are you sure you want to proceed with the commit above?'
    },
    allowCustomScopes: false,
    allowBreakingChanges: [ 'feat', 'fix' ],
    subjectLimit: 120
};