import { VscAdd } from "react-icons/vsc";
import { HeaderPage } from "../../components";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form, Tabs ,Collapse } from "antd";
import type { CollapseProps } from 'antd';
import GeneralInformation from "./general-information";
import Product from "./product";
import Customer from "./customer-list";
import EmployeeSell from "./employee-sale";


export default function  ReportView() {
  const navigate = useNavigate();
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const [form] = Form.useForm();
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Thông tin chung',
      children: <GeneralInformation form={form} />,
    },
    {
      key: '2',
      label: 'Sản  phẩm',
      children: <Product
      // handleCustomer={setCustomerRouter}
      // listCustomer={customerRouter}
    />,
    },
    
  ];
  
 
  return (
    <>
      <HeaderPage
        title="[Tên cửa hàng ] - [chiến dịch]"
        icon={
          <p
            onClick={() => navigate("/campaign")}
            className="mr-2 cursor-pointer"
          >
            <LeftOutlined />
          </p>
        }
        // buttons={[
        //   {
        //     label: "Thêm mới",
        //     type: "primary",
        //     size: "20px",
        //     className: "flex items-center",
        //   },
        // ]}
      />
      <div className="bg-white  rounded-xl">
        <Form layout="vertical" form={form}>
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
          {/* <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: <p className="px-4 mb-0"> Thông tin chung</p>,
                key: "1",
                children: <GeneralInformation form={form} />,
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
          /> */}
        </Form>
      </div>
    </>
  );
}
