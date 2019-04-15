module.exports = {
    /*
    Rules are made up by a name and a configuration array.The configuration array contains:
        - Level[ 0. .2 ]: 0 disables the rule.For 1 it will be considered a warning
            for 2 an error.
        - Applicable always | never: never inverts the rule.
        - Value: value to use for this rule.

    Rule configurations are either of type array residing on a key with the rule 's name as key on the rules object or 
        of type function returning type array or Promise<array>. 
    This means all of the following notations are supported.
    */
    rules:
    {
        'body-leading-blank': [ 2, 'always' ],
        'body-max-length': [ 2, 'always', Infinity ],
        'body-max-line-length': [ 1, 'always', Infinity ],
        'body-min-length': [ 2, 'always', 0 ],
        'footer-leading-blank': [ 2, 'always' ],
        'footer-max-length': [ 2, 'always', Infinity ],
        'footer-max-line-length': [ 2, 'always', Infinity ],
        'footer-min-length': [ 1, 'always', 0 ],
        'header-max-length': [ 2, 'always', 172 ],
        'header-min-length': [ 2, 'always', 10 ],
        'references-empty': [ 0, 'never' ],
        'scope-enum': [ 2, 'always',
            [ 'npm', 'module', 'localization', 'scripts', 'package', 'tasks', 'typescript', 'cli', 'switches',
                'resources',
            ]
        ],
        'scope-case': [ 2, 'never', [ 'sentence-case', 'start-case', 'pascal-case', 'upper-case' ] ],
        'scope-empty': [ 2, 'never' ],
        'scope-max-length': [ 2, 'always', 20 ],
        'scope-min-length': [ 2, 'always', 3 ],
        'subject-case': [
            2, 'never',
            [ 'sentence-case', 'start-case', 'pascal-case', 'upper-case' ]
        ],
        'subject-empty': [ 2, 'never' ],
        'subject-full-stop': [ 2, 'never', '.' ], // can't end message with a period
        'subject-max-length': [ 2, 'always', 120 ],
        'subject-min-length': [ 2, 'always', 3 ],
        'type-enum': [
            2, 'always',
            [ 'breaking', 'build', 'ci', 'chore', 'docs', 'feat', 'fix', 'other', 'perf', 'refactor', 'revert',
                'style', 'test'
            ]
        ],
        'type-case': [ 2, 'always', 'lower-case' ],
        'type-empty': [ 2, 'never' ],
        'type-max-length': [ 2, 'always', 9 ],
        'type-min-length': [ 2, 'always', 2 ],
    }
};