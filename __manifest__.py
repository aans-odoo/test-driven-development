{
    'name': 'Test Driven Development (TDD)',
    'summary': 'A simple module having different type of tests cases to showcase types of tests in Odoo',
    'version': '1.0',
    'category': 'Session',
    'author': 'Arib Ansari',
    'depends': ['base', 'web'],
    'assets': {
        'web.qunit_suite_tests': [
            'tdd/static/tests/qunit_tests.js',
        ]
    },
    'installable': True,
    'application': False,
    'license': 'AGPL-3'
}
