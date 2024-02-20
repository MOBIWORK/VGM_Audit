import frappe
import sys
import os
__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, '../')))
from deepvision import DeepVision
from deepvision.service import ProductCountService
@frappe.whitelist(methods=["POST"])
# param {items: arr,doctype: ''}
def deleteList(*args,**kwargs): 
    try:
        # Chuyển đổi ids từ chuỗi JSON thành danh sách Python
        ids_list = frappe.parse_json(kwargs.get('items'))

        # Lặp qua danh sách ids và thực hiện xóa
        for id in ids_list:
            # Thực hiện xóa cho mỗi id
            frappe.delete_doc(kwargs.get('doctype'), id)

        return {"status": "success", "message": "Deleted successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
@frappe.whitelist(methods=["POST"])
# param {items: arr,doctype: ''}
def checkImageProductExist(*args,**kwargs):
    RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
    deep_vision: DeepVision = DeepVision()
    recognition: ProductCountService = deep_vision.init_product_count_service(RECOGNITION_API_KEY)
    base_url = frappe.utils.get_request_site_address()
    collection_name = 'VGM_Product'
    linkimages = frappe.parse_json(kwargs.get('linkimages'))
    
    image_path = base_url + linkimages
    product_id = self.product
    get_product_name =  frappe.get_value("Product", {"name": product_id}, "product_name")
    response = recognition.count(collection_name, image_path)
    if response.get('status') == 'completed':
        count_value = response.get('result', {}).get('count', {}).get(get_product_name)
        self.set('sum', count_value)
    else:
        self.set('sum', self.sum)