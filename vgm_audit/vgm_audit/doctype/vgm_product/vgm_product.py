# Copyright (c) 2024, VGM and contributors
# For license information, please see license.txt

# import frappe
import json
import frappe
from frappe.model.document import Document
import sys
import os
__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, '../')))
import uuid
from deepvision import DeepVision
from deepvision.service import ProductRecognitionService
from deepvision.collections import Products
from frappe.model.document import Document

class VGM_Product(Document):
    def before_save(self):
        # Check exist Product
        product_exists = frappe.get_list("VGM_Product", filters={"name": self.name}, limit=1)
        if product_exists:
            self.update_product()
        else:
            # Kiểm tra và thêm sản phẩm
            self.check_and_add_product()
    def update_product(self):
        RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
        deep_vision: DeepVision = DeepVision()
        product_recognition: ProductRecognitionService = deep_vision.init_product_recognition_service(RECOGNITION_API_KEY)
        collection_name = 'VGM_Audits_Product'
        custom_field = json.loads(self.get('custom_field'))
        if custom_field is None:
            self.check_and_add_product()
        else:
            product_id_ai = custom_field.get('product_id')
            if product_id_ai is None:
                self.check_and_add_product()
            else:
                products: Products = product_recognition.get_products()
                products.update_by_id(collection_name, product_id_ai, self.product_name)
                # # Lien he tac gia de hieu chi tiet
                # imageSourceDBs = frappe.get_all("ProductImage_SKU", filters={"parent": self.name}, fields=["custom_field", "name", "uri_image"])
                # for index, photo in enumerate(self.photos):
                #     if not hasattr(photo, "custom_field") or photo.custom_field is None:
                #         # photo["custom_field"] = "your_value"
                #         image_ids = [str(uuid.uuid4())]
                #         base_url = frappe.utils.get_request_site_address()
                #         image_paths = [base_url + photo.uri_image]
                #         response = products.add(collection_name, product_id_ai, self.product_name, image_ids, image_paths)
                #         if response.get('status') == 'completed':
                #             custom_field_image = json.dumps({"image_id": image_ids[0], "product_id": product_id_ai})
                #             photo.set('custom_field', custom_field_image)
                #         else:
                #             frappe.msgprint("Không phân tích được ảnh")
                json_string = self.images
                images_dict = json.loads(json_string)
                base_url = frappe.utils.get_request_site_address()
                image_paths = [base_url + value for value in images_dict.values()]
                print(image_paths)
                image_ids = [str(uuid.uuid4())]
                response = products.add(collection_name, product_id_ai, self.product_name, image_ids, image_paths)
                print(response)
                if response.get('status') == 'completed':
                    pass
                else:
                    frappe.msgprint("Không phân tích được ảnh")
                
    def check_and_add_product(self):
        # Sử dụng self để truy cập trường product_name
        RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
        deep_vision: DeepVision = DeepVision()
        product_recognition: ProductRecognitionService = deep_vision.init_product_recognition_service(RECOGNITION_API_KEY)
        product_name = self.product_name
        json_string = self.images
        images_dict = json.loads(json_string)
        base_url = frappe.utils.get_request_site_address()
        image_paths = [base_url + value for value in images_dict.values()]
        collection_name = 'VGM_Audits_Product'
        product_id = str(uuid.uuid4())
        image_ids = [str(uuid.uuid4())]

        # Lấy danh sách sản phẩm
        products: Products = product_recognition.get_products()

        # Thực hiện thêm sản phẩm và xử lý kết quả
        response = products.add(collection_name, product_id, product_name, image_ids, image_paths)
        if response.get('status') == 'completed':
            product_AI = response.get('result', {}).get('product_id')
            custom_field_value = json.dumps({"product_id": product_AI})
            self.set('custom_field', custom_field_value)
        else:
            frappe.msgprint("Không phân tích được ảnh")