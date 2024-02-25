import {
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
  import { FormItemCustom, TableCustom } from "../../components";
  import { Button, Input, Modal, TableProps } from "antd";
  import { useEffect, useState } from "react";
  
  interface TypeCustomer {
    key: React.Key;
    name: string;
    customer_name: string;
    customer_group: string;
    customer_primary_address: string;
    customer_code: string;
  }
  
  
  
  export default function CustomerCampaignEdit({onChangeCustomer, customerEdit}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
    const [customers, setCustomers] = useState<TypeCustomer[]>([]);
    const [customersTemp, setCustomersTemp] = useState<TypeCustomer[]>([]);
    const [customersSelected, setCustomersSelected] = useState<TypeCustomer[]>([]);
    const [searchCustomer, setSearchCustomer] = useState("");
  
    const columns: TableProps<TypeCustomer>["columns"] = [
      {
        title: "ID",
        dataIndex: "customer_code",
        key: "customer_code",
        render: (text: string) => <a>{text}</a>,
      },{
        title: "Tên khách hàng",
        key: "customer_name",
        dataIndex: "customer_name",
      },{
        title: "Nhóm khách hàng",
        dataIndex: "customer_group",
        key: "customer_group",
      },{
        title: "Địa chỉ",
        key: "customer_primary_address",
        dataIndex: "customer_primary_address",
      },{
        title: "",
        key: "action",
        render: (_, record) => (
          <a>
            <DeleteOutlined onClick={() => handleDeleteCustomer(record)}/>
          </a>
        ),
      },
    ];
  
    useEffect(() => {
      initDataCustomer();
    }, []);
  
    useEffect(() => {
      let customerFilter = customersTemp;
      if(searchCustomer != null && searchCustomer != ""){
        customerFilter = customersTemp.filter(x => x.customer_name.toLowerCase().includes(searchCustomer.toLowerCase()));
      }
      setCustomers(customerFilter);
    }, [searchCustomer]);
  
    const initDataCustomer = async () => {
      let dataCustomer = [
        {
          'key': "Nguyễn huệ",
          'name': "Nguyễn huệ",
          'customer_code': "BH0054807122022",
          'customer_name': "Nguyễn huệ",
          'customer_group': "Hệ thống siêu thị",
          'customer_primary_address': ""
        },{
          'key': "Anh Huy",
          'name': "Anh Huy",
          'customer_code': "BH0057724022023",
          'customer_name': "Anh Huy",
          'customer_group': "Hệ thống siêu thị",
          'customer_primary_address': "CT1, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội-Billing-4"
        },{
          'key': "Anh Trọng",
          'name': "Anh Trọng",
          'customer_code': "BH0051611082022",
          'customer_name': "Anh Trọng",
          'customer_group': "Khách hàng mua buôn",
          'customer_primary_address': "Ngõ 135 Vũ Tông Phan, Khương Đình, Thanh Xuân, Hà Nội, Việt Nam-Billing"
        }
      ]
      setCustomers(dataCustomer);
      setCustomersTemp(dataCustomer);
      let customersInitSelected = [];
      for(let i = 0; i < customerEdit.length; i++){
        let dataCustomerFilter = dataCustomer.filter(x => x.name==customerEdit[i]);
        if(dataCustomerFilter != null && dataCustomerFilter.length > 0){
            //selectedRowKeys.push(customerEdit[i]);
            customersInitSelected.push(dataCustomerFilter[0]);
        } 
      }
      setCustomersSelected(customersInitSelected);
    }
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const onChangeSearchCustomer = (event) => {
      setSearchCustomer(event.target.value);
    }
  
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };
  
    const handleAddCustomer = () => {
      let customerSelecteds: TypeCustomer[] = [];
      for(let i = 0; i < selectedRowKeys.length; i++ ){
        let customerFilter = customers.filter(x => x.name == selectedRowKeys[i]);
        if(customerFilter != null && customerFilter.length > 0) customerSelecteds.push(customerFilter[0]);
      }
      setCustomersSelected(customerSelecteds);
      onChangeCustomer(customerSelecteds);
      handleCancel();
    }
  
    const handleDeleteCustomer = (item) => {
      const updatedCustomerSelected = customersSelected.filter(customer => customer.name !== item.name);
      setCustomersSelected(updatedCustomerSelected);
      onChangeCustomer(updatedCustomerSelected);
    }
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
  
    return (
      <>
        <div className="pt-4">
          <p className="ml-4 font-semibold text-sm text-[#212B36]">
            Danh sách khách hàng
          </p>
          <div
            onClick={showModal}
            className="flex justify-center h-9 cursor-pointer items-center ml-4 border-solid border-[1px] border-indigo-600 rounded-xl w-[160px]"
          >
            <p className="mr-2">
              <PlusOutlined />
            </p>
            <p className="text-sm font-bold text-[#1877F2]">Chọn khách hàng</p>
          </div>
          <div className="pt-6 ml-4">
            <TableCustom columns={columns} dataSource={customersSelected} />;
          </div>
          <Modal
            width={990}
            title="Chọn khách hàng"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            <div className="flex items-center justify-between">
              <FormItemCustom className="w-[320px] border-none pt-4">
                <Input value={searchCustomer} onChange={onChangeSearchCustomer}
                  placeholder="Tìm kiếm tên khách hàng"
                  prefix={<SearchOutlined />}
                />
              </FormItemCustom>
              <div>
                <span style={{ marginRight: 8 }}>
                  {hasSelected
                    ? `Đã chọn ${selectedRowKeys.length} khách hàng`
                    : ""}
                </span>
                <Button type="primary" onClick={handleAddCustomer}>Thêm</Button>
              </div>
            </div>
            <div className="pt-4">
              <TableCustom
                rowSelection={rowSelection}
                columns={[{
                  title: "ID",
                  dataIndex: "customer_code",
                  key: "customer_code",
                  render: (text: string) => <a>{text}</a>,
                },{
                  title: "Tên khách hàng",
                  key: "customer_name",
                  dataIndex: "customer_name",
                },{
                  title: "Nhóm khách hàng",
                  dataIndex: "customer_group",
                  key: "customer_group",
                },{
                  title: "Địa chỉ",
                  key: "customer_primary_address",
                  dataIndex: "customer_primary_address",
                }]}
                dataSource={customers}
              />
            </div>
          </Modal>
        </div>
      </>
    );
  }
  