/** @odoo-module **/

import { click, editInput, getFixture } from "@web/../tests/helpers/utils";
import { makeView, setupViewRegistries } from "@web/../tests/views/helpers";

QUnit.module("MyQunit", (hooks) => {
    let target;
    const serverData = {
        models: {
            "res.partner": {
                fields: {
                    name: { string: "Name", type: "char" },
                    email: { string: "Email", type: "char" },
                },
                records: [
                    { id: 1, name: "John Doe", email: "john@example.com" },
                ],
            },
        },
    };
    const formArch = `
        <form>
            <field name="name"/>
            <field name="email"/>
            <button name="custom_action" type="object" string="Custom Action"/>
        </form>
    `;

    hooks.beforeEach(() => {
        // Get an empty DOM in which our test element will be mounted
        target = getFixture();

        // Enable the use of form, list, etc. views
        setupViewRegistries();
    });

    QUnit.test("Form view renders correctly", async function (assert) {
        assert.expect(3);

        await makeView({
            type: "form",
            resModel: "res.partner",
            resId: 1,
            arch: formArch,
            serverData,
        });

        assert.containsOnce(target, ".o_form_view", "Form view should be rendered");
        assert.strictEqual(
            target.querySelector("[name='name'] input").value,
            "John Doe",
            "Name field should display 'John Doe'"
        );
        assert.strictEqual(
            target.querySelector("[name='email'] input").value,
            "john@example.com",
            "Email field should display 'john@example.com'"
        );
    });

    QUnit.test("Editing email field updates the value", async function (assert) {
        assert.expect(2);

        await makeView({
            type: "form",
            resModel: "res.partner",
            resId: 1,
            arch: formArch,
            serverData,
        });

        await editInput(target, "[name='email'] input", "newemail@example.com");
        assert.strictEqual(
            target.querySelector("[name='email'] input").value,
            "newemail@example.com",
            "Email field should be updated to 'newemail@example.com'"
        );

        // Simulate saving the record
        await click(target.querySelector(".o_form_button_save"));
        assert.strictEqual(
            serverData.models["res.partner"].records[0].email,
            "newemail@example.com",
            "Server data should be updated with the new email"
        );
    });

    QUnit.test("Clicking 'Custom Action' button triggers action", async function (assert) {
        assert.expect(1);

        let actionTriggered = false;

        await makeView({
            type: "form",
            resModel: "res.partner",
            resId: 1,
            arch: formArch,
            serverData,
            mockRPC: (route, args) => {
                if (args.method === "custom_action") {
                    actionTriggered = true;
                    return Promise.resolve();
                }
                return this._super.apply(this, arguments);
            },
        });

        await click(target.querySelector("button[name='custom_action']"));
        assert.ok(actionTriggered, "Custom action should be triggered upon button click");
    });
});
