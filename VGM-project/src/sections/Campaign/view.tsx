import { LuUploadCloud } from "react-icons/lu";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import { VscAdd } from "react-icons/vsc";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  status: string;
  start: string;
  end: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Tên chiến dịch",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Thời gian bắt đầu",
    dataIndex: "start",
  },
  {
    title: "Thời gian kết thúc",
    dataIndex: "end",
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

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy"
  },
  {
    key: "2",
    name: "Jim Green",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy"
  },
  {
    key: "3",
    name: "Joe Black",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy"
  },
  {
    key: "4",
    name: "Disabled User",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy"
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

export default function Campaign() {
const navigate = useNavigate();
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  return (
    <>
      <HeaderPage
        title="Chiến dịch"
        buttons={[
          {
            label: "Xóa",
            type: "primary",
            icon: <DeleteOutlined />,
            size: "20px",
            className: "flex items-center mr-2",
            danger: true,
          },
          {
            label: "Nhập file",
            icon: <LuUploadCloud className="text-xl" />,
            size: "20px",
            className: "flex items-center mr-2",
          },
          {
            label: "Thêm mới",
            type: "primary",
            icon: <VscAdd className="text-xl" />,
            size: "20px",
            className: "flex items-center",
            action: () => navigate('/campaign-create')
          },
        ]}
      />
      <div className="bg-white rounded-xl pt-4">
        <FormItemCustom className="w-[320px] border-none p-4">
          <Input placeholder="Tìm kiếm sản phẩm" prefix={<SearchOutlined />} />
        </FormItemCustom>
        <div className="p-4">
          <TableCustom
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
}
