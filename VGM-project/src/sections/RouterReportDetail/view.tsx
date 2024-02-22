
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
  stt: string;
  name: string;
  status: string;
  start: string;
  end: string;
  sum : string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Cửa hàng",
    dataIndex: "name",
  },
  {
    title: "Tên chiến dịch",
    dataIndex: "name",
  },
  {
    title: "Nhân viên thực hiện",
    dataIndex: "name",
  },
  {
    title: "Thời gian vào",
    dataIndex: "start",
  },
  {
    title: "Thời gian ra",
    dataIndex: "end",
  },
  {
    title: "Số lượng",
    dataIndex: "sum",
  },
];

const data: DataType[] = [
  {
    key: "1",
    stt: "1",
    name: "John Brown",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy",
    sum : "2"
  },
  {
    key: "2",
    stt: "2",
    name: "Jim Green",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy",
    sum : "1"
  },
  {
    key: "3",
    stt: "3",
    name: "Joe Black",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy",
    sum : "2"
  },
  {
    key: "4",
    stt: "4",
    name: "Disabled User",
    status: "Hoạt động",
    start: "dd/mm/yy",
    end: "dd/mm/yy",
    sum : "2"
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

export default function ReportDetail() {
  const navigate = useNavigate();
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  return (
    <>
      <HeaderPage
        title="Báo cáo"
        // buttons={[
        //   {
        //     label: "Xóa",
        //     type: "primary",
        //     icon: <DeleteOutlined />,
        //     size: "20px",
        //     className: "flex items-center mr-2",
        //     danger: true,
        //   },
        //   {
        //     label: "Nhập file",
        //     icon: <LuUploadCloud className="text-xl" />,
        //     size: "20px",
        //     className: "flex items-center mr-2",
        //   },
        //   {
        //     label: "Thêm mới",
        //     type: "primary",
        //     icon: <VscAdd className="text-xl" />,
        //     size: "20px",
        //     className: "flex items-center",
        //     action: () => navigate('/campaign-create')
        //   },
        // ]}
      />
      <div className="bg-white rounded-xl">
        <div className="flex p-4" style={{ alignItems: 'flex-end' }}>
      <FormItemCustom className="w-[320px] border-none mr-4 " >
        <Input placeholder="Tìm kiếm theo chiến dịch" prefix={<SearchOutlined />} />
      </FormItemCustom>
      <FormItemCustom className="w-[200px] border-none mr-4" label="Thời gian thực hiện">
        <Input style={{ height: '36px' }} placeholder="" />
      </FormItemCustom>
      <FormItemCustom className="w-[200px] border-none" label="Nhân viên">
        <Input style={{ height: '36px' }} placeholder="" />
      </FormItemCustom>
    </div>
        <div className="p-4">
          <TableCustom
            columns={columns}
            dataSource={data}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => handleRowClick(record), // Gọi hàm xử lý khi click vào dòng
              };
            }}
          />
        </div>
      </div>
    </>
  );

}
