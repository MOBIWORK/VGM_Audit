import { LuUploadCloud } from "react-icons/lu";
import { VscAdd } from "react-icons/vsc";
import { FormItemCustom, HeaderPage } from "../../components";
import {
  DeleteOutlined,
  EditOutlined,
  FileProtectOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Row,
  Space,
  Table,
  TableColumnsType,
  Typography,
  Upload,
  UploadProps,
  message
} from "antd";
import { useState, useEffect } from "react";
import Dragger from "antd/es/upload/Dragger";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { UploadFile } from "antd/lib";
import  {AxiosService} from '../../services/server';
import "./productsku.css";
import JsBarcode from "jsbarcode";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface TypeCategory{
  key: React.Key;
  name: string;
  category_name: string;
  category_description: string;
  owner: string;
  hidden: boolean;
}
interface TypeProduct{
  key: React.Key;
  name: string;
  barcode: string;
  category: string;
  category_name: string;
  product_code: string;
  product_name: string;
  product_description: string;
}

import type { GetProp } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const columnProducts: TableColumnsType<DataType> = [
  {
    title: "Mã Sản phẩm",
    dataIndex: "product_code",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "product_name",
  },
  {
    title: "Danh mục",
    dataIndex: "category_name",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          <EditOutlined />
        </a>
        <a>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};



export default function Product_SKU() {
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  const [categories, setCategories] = useState<any[]>([]);
  const [searchCategory, setSearchCategory] = useState('');

  const [form] = useForm();
  const [formEditCategory] = useForm();
  const [formAddProduct] = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const [isModalOpenAddCategory, setIsModalOpenAddCategory] = useState(false);
  //item and isShowModel for delete category
  const [deleteItemCategory, setDeleteItemCategory] = useState({});
  const [isModelOpenDeleteCategory, setIsModelOpenDeleteCategory] = useState(false);
  //item and isShowModel for edit category
  const [editItemCategory, setEditItemCategory] = useState({});
  const [isModelOpenEditCategory, setIsModelOpenEditCategory] = useState(false);

  //biến cho sản phẩm theo danh mục
  const [categorySelected, setCategorySelected] = useState({});
  const [products, setProducts] = useState<any[]>([]);
  const [fileUploadAddProduct, setFileUploadAddProduct] = useState([]);

  const propUploadAddProducts: UploadProps = {
    onRemove: (file) => {},
    beforeUpload: async (file) => {
      const formData = new FormData();
      const fields = {
        file,
        is_private: "0",
        folder: "Home"
      };
  
      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value);
      }
      const response = await AxiosService.post(
        "/api/method/upload_file",
        formData
      );
      if (response.message) {
        //fileListUpload.push(response.message);
        setFileUploadAddProduct(prevFileUpload => [...prevFileUpload, response.message]);
        message.success("Tải ảnh thành công");
      } else {
        message.error("Tải ảnh thất bại");
      }
      return false;
    },
  };

  //Các hàm xử lý danh mục
  const fetchDataCategories = async () => {
    try {
      //setLoading(true);
      let urlCategory = '/api/resource/VGM_Category?fields=["*"]';
      console.log(searchCategory);
      if(searchCategory != null && searchCategory != ""){
        let filterComand = `[["category_name", "like", "${searchCategory}"]]`;
        urlCategory += `&${filterComand}`;
      }
      const response = await AxiosService.get(urlCategory);
      // Kiểm tra xem kết quả từ API có chứa dữ liệu không
      if (response && response.data) {
        // Thêm key cho mỗi phần tử trong mảng, sử dụng trường 'name'
        let dataCategories: TypeCategory[] = response.data.map((item: TypeCategory) => {
          return {
            ...item,
            key: item.name,
            hidden: true
          }
        })
        setCategories(dataCategories);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  const onChangeFilterCategory = (event) => {
    setSearchCategory(event.target.value);
    fetchDataCategories();
  }

  const handleMouseEnterCategory = (event, item) => {
    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.key === item.key) {
          return { ...category, hidden: false };
        }
        return category;
      })
    );
  }

  const handleMouseLeaveCategory = (event, item) => {
    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.key === item.key) {
          return { ...category, hidden: true };
        }
        return category;
      })
    );
  }

  const handleDeleteCategoryClick = (item) => {
    let itemModel = {
      'item': item,
      'title': "Xóa " + item.category_name,
      'contentConfirm': "Bạn có chắc muốn xóa " + item.category_name +" ra khỏi hệ thống không?", 
      'contentRemind': "Khi thực hiện hành động này, sẽ không thể hoàn tác."
    }
    setDeleteItemCategory(itemModel);
    setIsModelOpenDeleteCategory(true);
  }

  const handleDeleteOkCategory = async () => {
    if(deleteItemCategory != null && deleteItemCategory.item != null){
      let urlDelete = `/api/resource/VGM_Category/${deleteItemCategory.item.name}`;
      let res = await AxiosService.delete(urlDelete);
      if(res != null && res.message == "ok"){
        fetchDataCategories();
        handleDeleteCancelCategory();
      }
    }
  }

  const handleDeleteCancelCategory = () => {
    setIsModelOpenDeleteCategory(false);
    setDeleteItemCategory({});
  }

  const handleEditCategoryClick = (item) => {
    formEditCategory.setFieldsValue({
      name_item: item.category_name,
      des: item.category_description,
    });
    setEditItemCategory(item);
    setIsModelOpenEditCategory(true);
  }

  const handleOkEditCategory = async ()=> {
    let objCategory = formEditCategory.getFieldsValue();
    console.log(objCategory);
    if(editItemCategory != null && editItemCategory.name != null){
      let urlPutCategory = `/api/resource/VGM_Category/${editItemCategory.name}`;
      let dataPut = {
        'category_name': objCategory.name_item,
        'category_description': objCategory.des
      }
      let res = await AxiosService.put(urlPutCategory, dataPut);
      if(res != null && res.data != null){
        fetchDataCategories();
        handleCancelEditCategory();
      }
    }
  }
  
  const handleCancelEditCategory = () => {
    setEditItemCategory({});
    setIsModelOpenEditCategory(false);
  }

  const showModalCategory = () => {
    setIsModalOpenAddCategory(true);
  };

  const handleOkCategory = async () => {
    let valField = form.getFieldsValue();
    let dataPost = {
      'doc': JSON.stringify({
        'doctype': "VGM_Category",
        'category_name': valField.name_item,
        'category_description': valField.des
      }),
      'action': "Save"
    }
    let resCreateCategory = await AxiosService.post('/api/method/frappe.desk.form.save.savedocs', dataPost);
    if(resCreateCategory != null && resCreateCategory.docs != null && resCreateCategory.docs.length > 0){
      form.resetFields();
      //Hiển thị thông báo thêm mới thành công
      fetchDataCategories();
      setIsModalOpenAddCategory(false);
    }else{
      //Hiển thị thông báo thêm mới thất bại
    }
  };

  const handleCancelCategory = () => {
    setIsModalOpenAddCategory(false);
  };

  //Các hàm xử lý danh sách sản phẩm
  const handleSelectedCategory = (item) => {
    setCategorySelected(item);
  }

  useEffect(() => {
    initDataProductByCategory();
  }, [categorySelected]);

  const initDataProductByCategory = async () => {
    let urlProducts = `/api/resource/VGM_Product?fields=["*"]&filters=[["category","=","${categorySelected.name}"]]`;
    let res = await AxiosService.get(urlProducts);
    if (res && res.data) {
      // Thêm key cho mỗi phần tử trong mảng, sử dụng trường 'name'
      let dataProducts: TypeProduct[] = res.data.map((item: TypeProduct) => {
        return {
          ...item,
          key: item.name,
          category_name: categorySelected.category_name
        }
      })
      setProducts(dataProducts);
    }
  }

  const showModalAddProduct = () => {
    if(categorySelected != null && categorySelected.name != null){
      setIsModalOpenAddProduct(true);
    }
  };

  const handleOkAddProduct = async () => {
    let objProduct = formAddProduct.getFieldsValue();
    let barcode = document.getElementById("barcode");
  
    console.log(objProduct);
    console.log(barcode);
    console.log(fileUploadAddProduct);
  };

  const handleRenderBarcodeAddProduct = (event) => {
    JsBarcode("#barcode",event.target.value, {
      width: 4,
      height: 40,
      displayValue: true,
      font: "Arial",
      text: event.target.value,
      textMargin: 10,
      fontSize: 13,
      background: "#F5F7FA"
    });
  }

  const handleCancelAddProduct = () => {
    setIsModalOpenAddProduct(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // {
  //   uid: "-1",
  //   name: "image.png",
  //   status: "done",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },

  const onChangeImageFormAddProduct: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <HeaderPage
        title="Sản phẩm"
        buttons={[
          {
            label: "Xóa",
            type: "primary",
            icon: <DeleteOutlined />,
            size: "20px",
            className: "flex items-center mr-2",
            danger: true,
            hidden: true
          },
          {
            label: "Nhập file",
            icon: <LuUploadCloud className="text-xl" />,
            size: "20px",
            className: "flex items-center mr-2",
          },
          {
            label: "Kiểm tra sản phẩm",
            type: "primary",
            icon: <FileProtectOutlined className="text-xl" />,
            size: "20px",
            className: "flex items-center mr-2",
            action: showModal,
          },
          {
            label: "Thêm mới",
            type: "primary",
            icon: <VscAdd className="text-xl" />,
            size: "20px",
            className: "flex items-center",
            action: showModalAddProduct,
          },
        ]}
      />
      <Row gutter={16}>
        <Col span={18} push={6}>
          <div className="bg-white rounded-xl">
            <FormItemCustom className="w-[320px] border-none p-4">
              <Input
                placeholder="Tìm kiếm sản phẩm"
                prefix={<SearchOutlined />}
              />
            </FormItemCustom>
            <div className="pt-4 p-4">
              <Table
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columnProducts}
                dataSource={products}
              />
            </div>
          </div>
        </Col>

        <Col span={6} pull={18}>
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div><p className="text-base leading-5 font-medium text-[#212B36]">Danh mục</p></div>
              <div className="cursor-pointer" onClick={showModalCategory}>
                <PlusOutlined />
              </div>
            </div>
            <div className="py-3">
              <FormItemCustom className="w-full border-none" name="filter_category">
                <Input onChange={onChangeFilterCategory} value={searchCategory}
                  placeholder="Tìm kiếm mục danh"
                  prefix={<SearchOutlined />}
                />
              </FormItemCustom>
            </div>
            <List
              header={false}
              footer={false}
              bordered={false}
              dataSource={categories}
              renderItem={(item: any) => (
                <List.Item onMouseEnter={(event) => handleMouseEnterCategory(event, item)}
                 onMouseLeave={(event) => handleMouseLeaveCategory(event, item)}
                 onClick={() => handleSelectedCategory(item)}>
                  <div className={"item_category"}>
                    <span>
                      <Typography.Text></Typography.Text> {item.category_name}
                    </span>
                    <span style={{display: item.hidden? 'none' : 'block'}}>
                      <span style={{marginRight: "10px"}}>
                        <EditOutlined key="edit" onClick={() => handleEditCategoryClick(item)}/>
                      </span>
                      <DeleteOutlined key="delete" onClick={() => handleDeleteCategoryClick(item)}/>
                    </span>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>

      <Modal
        title="Kiểm tra sản phẩm"
        open={isModalOpen}
        width={777}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Kiểm tra
          </Button>,
        ]}
      >
        <p className="text-[#637381] font-normal text-sm">
          Chọn ảnh sản phẩm bát kì để kiểm tra nhận diện sản phẩm
        </p>
        <Dragger>
          <p className="ant-upload-drag-icon">
            <PlusOutlined />
          </p>
          <p className="ant-upload-text">Kéo, thả hoặc chọn ảnh để tải lên</p>
        </Dragger>
      </Modal>

      <Modal
        title={"Thêm mới sản phẩm"}
        open={isModalOpenAddProduct}
        onOk={handleOkAddProduct}
        onCancel={handleCancelAddProduct}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancelAddProduct}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkAddProduct}>
            Lưu
          </Button>,
        ]}
      >
        <div className="pt-4">
          <Form layout="vertical" form={formAddProduct}>
            <FormItemCustom label="Mã sản phâm" name="product_code" required>
              <Input />
            </FormItemCustom>
            <FormItemCustom
              className="pt-3"
              label="Barcode"
              name="barcode_product"
              required
            >
              <Input onChange={(event) => handleRenderBarcodeAddProduct(event)}/>
            </FormItemCustom>
            <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginTop: "10px",
                  backgroundColor: "#F5F7FA",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#d9d9d9",
                  borderRadius: "6px",
                  height: "85px"
                }}
              >
                <svg id="barcode"></svg></div>
            
            <FormItemCustom
              className="pt-3"
              label="Tên sản phẩm"
              name="product_name"
              required
            >
              <Input />
            </FormItemCustom>
            <FormItemCustom className="pt-3" label="Mô tả" name="product_description" required>
              <TextArea className="bg-[#F5F7FA]" autoSize={{ minRows: 3, maxRows: 5 }} />
            </FormItemCustom>
            <FormItemCustom
              className="pt-3"
              label="Hình ảnh"
              name="img"
              required
            >
              <Upload {...propUploadAddProducts}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onChange={onChangeImageFormAddProduct}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </FormItemCustom>
          </Form>
        </div>
      </Modal>

      <Modal
        title={"Thêm mới danh mục"}
        open={isModalOpenAddCategory}
        onOk={handleOkCategory}
        onCancel={handleCancelCategory}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancelCategory}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkCategory}>
            Lưu
          </Button>,
        ]}
      >
        <div className="pt-4">
          <Form layout="vertical" form={form}>

            <FormItemCustom
              className="pt-3"
              label="Tên danh mục"
              name="name_item"
              required
            >
              <Input />
            </FormItemCustom>
            <FormItemCustom className="pt-3" label="Mô tả" name="des">
              <TextArea className="bg-[#F5F7FA]" autoSize={{ minRows: 3, maxRows: 5 }} />
            </FormItemCustom>
            
          </Form>
        </div>
      </Modal>

      <Modal
        title={"Sửa danh mục"}
        open={isModelOpenEditCategory}
        onOk={handleOkEditCategory}
        onCancel={handleCancelEditCategory}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancelEditCategory}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkEditCategory}>
            Lưu
          </Button>,
        ]}
      >
        <div className="pt-4">
          <Form layout="vertical" form={formEditCategory}>

            <FormItemCustom
              className="pt-3"
              label="Tên danh mục"
              name="name_item"
              required
            >
              <Input value={editItemCategory.category_name}/>
            </FormItemCustom>
            <FormItemCustom className="pt-3" label="Mô tả" name="des">
              <TextArea className="bg-[#F5F7FA]" autoSize={{ minRows: 3, maxRows: 5 }} value={editItemCategory.category_description}/>
            </FormItemCustom>
            
          </Form>
        </div>
      </Modal>

      <Modal
        title={deleteItemCategory.title}
        open={isModelOpenDeleteCategory}
        onOk={handleDeleteOkCategory}
        onCancel={handleDeleteCancelCategory}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div>{deleteItemCategory.contentConfirm}</div>
        <div>{deleteItemCategory.contentRemind}</div>
      </Modal>
    </>
  );
}
