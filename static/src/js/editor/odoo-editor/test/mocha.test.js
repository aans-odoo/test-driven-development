// Mocha tests in Odoo are primarily used for testing the Odoo Editor.
 
// This example demonstrates how to use Mocha (with Chai) to test the Odoo  
// Editor using various helper functions designed for editor testing.  

import { testEditor, BasicEditor } from "@web_editor/js/editor/odoo-editor/test/utils";

describe("My Mocha Tests", () => {
    it("Should make text bold", async () => {
        await testEditor(BasicEditor, {
            contentBefore: '<p>Hello [World]</p>',
            stepFunction: (editor) => editor.execCommand('bold'),
            contentAfter: '<p>Hello <strong>[World]</strong></p>',
        })
    })

    it("Should change text color", async () => {
        await testEditor(BasicEditor, {
            contentBefore: '<p>Hello [World]</p>',
            stepFunction: (editor) => editor.execCommand("applyColor", "red", "color"),
            contentAfter: '<p>Hello <font style="color: red;">[World]</font></p>',
        })
    })

    it("Should make text italics", async () => {
        await testEditor(BasicEditor, {
            contentBefore: '<p><i class="fa fa-star"></i>[Abc]</p>',
            contentBeforeEdit: '<p><i class="fa fa-star" contenteditable="false">\u200b</i>[Abc]</p>',
            stepFunction: (editor) => editor.execCommand("italic"),
            contentAfterEdit: '<p><i class="fa fa-star" contenteditable="false">\u200b</i><em>[Abc]</em></p>',
            contentAfter: '<p><i class="fa fa-star"></i><em>[Abc]</em></p>',
        })
    })
})