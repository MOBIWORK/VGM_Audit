import { VscAdd } from "react-icons/vsc";
import { HeaderPage } from "../../components";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form, Tabs } from "antd";
import GeneralInformation from "./general-information";
import Product from "./product";
import Customer from "./customer-list";
import EmployeeSell from "./employee-sale";
import React, {useState} from 'react';

export default function  CampaignCreate() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [campaignStatus, setCampaignStatus] = useState("Open");

  const handleAddCampaign = async () => {
    console.log(form.getFieldsValue());
    console.log(campaignStatus);
  }

  const handleCampaignStatusChange = (val) => {
    setCampaignStatus(val);
  }

  return (
    <>
      <HeaderPage
        title="Thêm mới chiến dịch"
        icon={
          <p
            onClick={() => navigate("/campaign")}
            className="mr-2 cursor-pointer"
          >
            <LeftOutlined />
          </p>
        }
        buttons={[
          {
            label: "Thêm mới",
            type: "primary",
            size: "20px",
            className: "flex items-center",
            action: handleAddCampaign
          },
        ]}
      />
      <div className="bg-white pt-4 rounded-xl">
        <Form layout="vertical" form={form}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: <p className="px-4 mb-0"> Thông tin chung</p>,
                key: "1",
                children: <GeneralInformation form={form} onCampaignStatusChange={handleCampaignStatusChange}/>,
              },
              {
                label: <p className="px-4 mb-0">Sản phẩm</p>,
                key: "2",
                children: (
                  <Product
                    // handleCustomer={setCustomerRouter}
                    // listCustomer={customerRouter}
                  />
                ),
              },
              {
                label: <p className="px-4 mb-0">Nhân viên bán hàng</p>,
                key: "3",
                children: (
                  <EmployeeSell
                  />
                ),
              },
              {
                label: <p className="px-4 mb-0">Khách hàng</p>,
                key: "4",
                children: (
                  <Customer
                  />
                ),
              },
            ]}
            indicatorSize={(origin) => origin - 18}
          />
        </Form>
      </div>
    </>
  );
}
