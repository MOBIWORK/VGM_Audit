import frappe
import json
import sys
import os
__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, '../')))
from deepvision import DeepVision
from deepvision.service import ProductCountService
@frappe.whitelist(methods=["POST"])
# param {items: arr,doctype: ''}
def deleteListByDoctype(*args,**kwargs): 
    RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
    deep_vision: DeepVision = DeepVision()
    product_recognition: ProductRecognitionService = deep_vision.init_product_recognition_service(RECOGNITION_API_KEY)
    products: Products = product_recognition.get_products()
    try:
        # Chuyển đổi ids từ chuỗi JSON thành danh sách Python
        ids_list = frappe.parse_json(kwargs.get('items'))

        # Lặp qua danh sách ids và thực hiện xóa
        for id in ids_list:
            if kwargs.get('doctype') == "VGM_Product":
                # Trong trường hợp doctype là VGM_Product, xóa sản phẩm trong mô hình AI
                doc = frappe.get_doc(kwargs.get('doctype'), id)
                product_name = doc.product_name
                collection_name = doc.category
                products.delete_product_by_name(collection_name, product_name)
                frappe.delete_doc(kwargs.get('doctype'), id)
            else:
                frappe.delete_doc(kwargs.get('doctype'), id)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error"}
@frappe.whitelist(methods=["POST"],allow_guest=True)
# param {items: arr,doctype: ''}
def checkImageProductExist(*args,**kwargs):
    RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
    deep_vision: DeepVision = DeepVision()
    recognition: ProductCountService = deep_vision.init_product_count_service(RECOGNITION_API_KEY)
    base_url = frappe.utils.get_request_site_address()
    collection_name = kwargs.get('collection_name')
    linkimages = kwargs.get('linkimages')
    
    image_path = base_url + linkimages
    # product_id = self.product
    # get_product_name =  frappe.get_value("Product", {"name": product_id}, "product_name")
    response = recognition.count(collection_name, image_path)
    if response.get('status') == 'completed':
        count_value = response.get('result', {}).get('count', {})
        return count_value
        # self.set('sum', count_value)
    else:
        return {"status": "error"}
        # self.set('sum', self.sum)
@frappe.whitelist(methods=["POST"],allow_guest=True)
# param {collection_name: ''}
def deleteCategory(*args,**kwargs):
    RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
    deep_vision: DeepVision = DeepVision()
    product_recognition: ProductRecognitionService = deep_vision.init_product_recognition_service(RECOGNITION_API_KEY)
    products: Products = product_recognition.get_products()
    collection_name = kwargs.get('collection_name')
    products.delete_all(collection_name)

    if response.get('status') == 'completed':
        return {"status": "success"}   
    else:
        return {"status": "error"}
    
@frappe.whitelist(allow_guest=True)
def get_campaign_info(*args,**kwargs):
    """
    Trả về thông tin chiến dịch (campaign) dựa trên customer_code và e_name,
    đồng thời kiểm tra xem cả customer_code và e_name có trong trường employees và retails không.

    :param customer_code: Mã khách hàng.
    :param e_name: Tên nhân viên.
    :return: Danh sách các bản ghi chiến dịch (campaign).
    """

    # Lấy thông tin chiến dịch dựa trên điều kiện
    campaign_records = frappe.get_all(
        "VGM_Campaign",
        fields=["*"]  # Thay thế field1, field2 bằng các trường bạn muốn lấy
    )
    # Lặp qua các bản ghi chiến dịch để kiểm tra customer_code và e_name
    valid_campaigns = []
    for campaign_record in campaign_records:
        # Truy cập trường employees của mỗi chiến dịch
        employees_json = frappe.db.get_value("VGM_Campaign", campaign_record.name, "employees")
        employees_list = json.loads(employees_json) if employees_json else []

        # Truy cập trường retails của mỗi chiến dịch
        retails_json = frappe.db.get_value("VGM_Campaign", campaign_record.name, "retails")
        retails_list = json.loads(retails_json) if retails_json else []
        # Kiểm tra xem customer_code có trong danh sách nhân viên không
        # và e_name có trong danh sách retails không
        if kwargs.get('customer_code') in employees_list and kwargs.get('e_name') in retails_list:
            valid_campaigns.append(campaign_record)

    return valid_campaigns
        