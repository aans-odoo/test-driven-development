/*
 * This file contains some code snippets that are used as a examples in the
 * presentation slides.
 *
 */


// -----------------------------------------------------------------------------
// QUnit
// -----------------------------------------------------------------------------

QUnit.module("My Module", function (hooks) {
    // Tests comes here

    QUnit.module("Nested Module", function (hooks) {
        // Tests comes here

    });
});


QUnit.module("My Module", function (hooks) {
    hooks.before(function () {
        // Runs once before all tests in "My Module"
    });

    hooks.beforeEach(function () {
        // Runs before each test in "My Module"
    });

    hooks.afterEach(function () {
        // Runs after each test in "My Module"
    });

    hooks.after(function () {
        // Runs once after all tests in "My Module"
    });

    QUnit.module("Nested Module", function (hooks) {
        hooks.before(function () {
            // Runs once before all tests in "Nested Module"
        });

    });
});


QUnit.module("Math Tests", function () {

    QUnit.test("Addition should work correctly", function (assert) {
        assert.expect(1);

        let result = 2 + 3;

        assert.equal(result, 5);
    });
});

QUnit.test("My test", function (assert) {
    const data = {
        models: {
            partner: { records: [{ id: 1, name: "Jean" }] },
            bar: { records: [{ name: "zzz", partner_id: 1 }] },
            foo: { records: [] },
        },
    };
    const server = new MockServer(data, {});


    let result = 2 + 3;

    assert.equal(result, 5);
});

QUnit.test("My view test", async function (assert) {

    const target = getFixture();
    serverData = {
        models: {
            partner: {
                fields: {
                    id: { string: "ID", type: "number" },
                    type: { string: "Type", type: "char" }
                },
                records: [
                    {
                        id: 7,
                        type: "purchase",
                    },
                ],
            },
        },
        views: {
            "partner,false,list": `<list>
                    <field name="id"/>
                    <field name="display_name"/>
                </list>`,
        },
    };
    await makeView({
        type: "form",
        resModel: "partner",
        serverData,
        mockRPC(route, args) {
            if (args.method === "search_read") {
                return [{ id: 7, type: 'purchase' }];
            }
        },
    });

    assert.containsOnce(target, '.abcd');

});


class Counter extends Components {
    static defaultValue = "abc";

    setup() {
        this.index = 0;
    }

    increment() {
        this.index++;
    }
}

// PATCHING
patch(Counter.prototype, {
    setup() {
        this.index = 10;
    }
});





const unpatch = patch(Counter.prototype, {
    setup() {
        this.index = 10;
    }
});

unpatch();





class MyClass { }


// ORIGINAL CLASS
class SomeService {
    setup() {
        this.orm = services.orm;
        this.data;
    }

    async fetchData() {
        this.data = await this.orm.call(
            "some.model",
            "some_method"
        );
    }
}

// PATCHED CLASS IN TEST
patch(SomeService.prototype, {
    fetchData() {
        return { data: "test data" };
    }
})




// -----------------------------------------------------------------------------
// MOCHA
// -----------------------------------------------------------------------------
describe("Mocha test group", () => {
    it("mocha test", () => {

        window.chai.expect("hello").to.be.equal(
            "Hello",
            "Your error message"
        );
    })
})

describe('bold', () => {
    it('should make a few characters bold', async () => {
        await testEditor(BasicEditor, {
            contentBefore: '<p>ab[cde]fg</p>',
            stepFunction: (editor) => editor.execCommand('bold'),
            contentAfter: `<p>ab<strong>[cde]</strong>fg</p>`,
        });
    })
})
