// QUnit was used for unit testing in Odoo, it is now replaced with Hoot but
// lagacy test cases using QUnit still exist in Odoo codebase.

// This example demonstrate a basic QUnit test to test a list view, showing use
// of QUnit hook, odoo helper functions, mock server, mock data and mock RPC
// calls

import { getFixture } from "@web/../tests/helpers/utils";
import { makeView, setupViewRegistries } from "@web/../tests/views/helpers";

let target;
let serverData;

QUnit.module("My Qunit", (hooks) => {

    QUnit.module("My Sub Module");
    
    hooks.beforeEach(function () {
        target = getFixture();
        serverData = {
            models: {
                my_user: {
                    fields: {
                        name: { string: "Name", type: "char", placeholder:"Name" },
                        email: { string: "Email", type: "char" }
                    },
                    records: [
                        {
                            name: "Abcd",
                            email: "abcd@odoo.com",
                        },
                    ],
                },
            },
            views: {
                "my_user,false,list": `
                <list>
                    <field name="name"/>
                    <field name="email"/>
                </list>
                `,
            },
        };
        setupViewRegistries();
    });

    QUnit.test("Test list view", async function (assert) {
        assert.expect(2);

        await makeView({
            type: "list",
            resModel: "my_user",
            serverData,
            mockRPC(route, args) {
                if (args.method === "get_views") {
                    assert.equal(args.model, "my_user", "Using right model")
                }
            },
        });

        const nameCellEl = target.querySelector(".o_data_row td[name='name']");
        assert.strictEqual(nameCellEl.innerText, "Abcd", "Mock data is visible in list view")
    });
});
