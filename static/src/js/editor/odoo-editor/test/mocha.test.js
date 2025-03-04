// Mocha tests in Odoo are primarily used for testing the Odoo Editor.
 
// This example demonstrates how to use Mocha (with Chai) to test the Odoo  
// Editor using various helper functions designed for editor testing.  

import { testEditor, BasicEditor } from "@web_editor/js/editor/odoo-editor/test/utils";

describe("My Mocha Tests", () => {
    it("Should make text bold", async () => {
        await testEditor(BasicEditor, {
            contentBefore: "<p>Hello [World]</p>",
            stepFunction: (editor) => editor.execCommand('bold'),
            contentAfter: "<p>Hello <strong>[World]</strong></p>",
        })
    })

    it("Should change text color", async () => {
        await testEditor(BasicEditor, {
            contentBefore: "<p>Hello [World]</p>",
            stepFunction: (editor) => editor.execCommand("applyColor", "red", "color"),
            contentAfter: "<p>Hello <font style='color: red;'>[World]</font></p>",
        })
    })
})