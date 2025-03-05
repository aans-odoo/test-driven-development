from odoo.tests.common import TransactionCase
from odoo.tests import tagged
import unittest

@tagged('post_install', '-at_install')
class ProductTest(TransactionCase):
    def setUp(self):
        super(ProductTest, self).setUp()
        self.product_model = self.env['product.product']
        self.category_all = self.env.ref('product.product_category_goods')

    def test_product_creation(self):
        # just to show the test is running
        # ----------------------------------------------------------------
        print("\n")
        print("-"*123)
        print(" TEST STARTS FROM HERE ".center(100, " "))
        print("-"*123)
        print("\n")
        # ----------------------------------------------------------------
        
        product = self.product_model.create({
            'name': 'Test Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertEqual(product.name, 'Test Product', "Product name should be 'Test Product'")
        self.assertEqual(product.type, 'service', "Product type should be 'product'")
        self.assertEqual(product.categ_id.id, self.category_all.id, "Product category should be 'All Products'")

    def test_product_name_not_equal(self):
        product = self.product_model.create({
            'name': 'Another Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertNotEqual(product.name, 'Test Product', "Product name should not be 'Test Product'")

    def test_product_is_active(self):
        product = self.product_model.create({
            'name': 'Active Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertTrue(product.active, "Product should be active by default")

    def test_product_is_not_service(self):
        product = self.product_model.create({
            'name': 'Non-Service Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertFalse(product.type == 'consu', "Product type should not be 'service'")

    def test_product_is_instance(self):
        product = self.product_model.create({
            'name': 'Instance Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertIsInstance(product, self.product_model.__class__, "Product should be an instance of 'product.product'")

    def test_product_is_not_none(self):
        product = self.product_model.create({
            'name': 'Non-None Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertIsNotNone(product, "Product should not be None")

    def test_product_in_category(self):
        product = self.product_model.create({
            'name': 'Category Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertIn(product.categ_id, self.env['product.category'].search([]), "Product category should be in the list of all categories")

    def test_product_not_in_category(self):
        product = self.product_model.create({
            'name': 'Non-Category Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertNotIn(product.categ_id, self.env['product.category'].search([('id', '!=', 1)]), "Product category should not be in a non-existent category")

    def test_product_creation_raises(self):
        with self.assertRaises(ValueError, msg="Creating a product with an invalid type should raise a ValueError"):
            self.product_model.create({
                'name': 'Invalid Product',
                'type': 'invalid_type',  # This should raise an exception
                'categ_id': self.category_all.id,
            })

    @unittest.skip("Skipping this test unconditionally")
    def test_skip_example(self):
        product = self.product_model.create({
            'name': 'Skipped Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertEqual(product.name, 'Skipped Product', "Product name should be 'Skipped Product'")

    @unittest.skipIf(True, "Skipping this test because the condition is True")
    def test_skipif_example(self):
        product = self.product_model.create({
            'name': 'Conditionally Skipped Product',
            'type': 'service',
            'categ_id': self.category_all.id,
        })
        self.assertEqual(product.name, 'Conditionally Skipped Product', "Product name should be 'Conditionally Skipped Product'")
