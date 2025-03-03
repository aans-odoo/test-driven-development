{
    'name': 'Test Driven Development (TDD)',
    'summary': 'A simple module having different type of tests cases to showcase types of tests in Odoo',
    'version': '1.0',
    'category': 'Session',
    'author': 'Arib Ansari, Vivek Panchal',
    'depends': ['base', 'web', 'web_editor', 'product'],
    'assets': {
        # QUnit test files
        'web.qunit_suite_tests': [
            'tdd/static/tests/legacy/qunit_tests.js',
        ],

        # Mocha test files
        'web_editor.mocha_tests': [
            'tdd/static/src/js/editor/odoo-editor/test/mocha.test.js',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'AGPL-3'
}
