import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  Table,
  TableColumnsType,
} from "antd";
import { FormItemCustom, TableCustom } from "../../components";
import { useState } from "react";

interface DataType {
  key: React.Key;
  stt?: string;
  product: string;
  quantity: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Mã sản phẩm", dataIndex: "date", key: "date" },
      { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: "STT", dataIndex: "stt", key: "STT" },
    { title: "Danh mục sản phẩm", dataIndex: "product", key: "product" },
    { title: "Số lượng sản phẩm", dataIndex: "quantity", key: "quantity" },
    {
      title: "",
      key: "",
      render: () => (
        <a>
          <DeleteOutlined />
        </a>
      ),
    },
  ];

  const columns1: TableColumnsType<DataType> = [
    { title: "Danh mục sản phẩm", dataIndex: "product", key: "product" },
    { title: "Số lượng sản phẩm", dataIndex: "quantity", key: "quantity" },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      stt: "Screen",
      product: "iOS",
      quantity: "10.3.4.5654",
    });
  }

  return (
    <div className="pt-4">
      <p className="ml-4 font-semibold text-sm text-[#212B36]">Sản phẩm</p>
      <div
        onClick={showModal}
        className="flex justify-center h-9 cursor-pointer items-center ml-4 border-solid border-[1px] border-indigo-600 rounded-xl w-[160px]"
      >
        <p className="mr-2">
          <PlusOutlined />
        </p>
        <p className="text-sm font-bold text-[#1877F2]">Chọn danh mục</p>
      </div>
      <div className="pt-6 ml-4">
        <TableCustom
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          dataSource={data}
        />
      </div>
      <Modal
        width={990}
        title="Chọn danh mục"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="flex items-center justify-between">
          <FormItemCustom className="w-[320px] border-none pt-4">
            <Input
              placeholder="Tìm kiếm sản phẩm"
              prefix={<SearchOutlined />}
            />
          </FormItemCustom>
          <div>
            <span style={{ marginRight: 8 }}>
              {hasSelected ? `Đã chọn ${selectedRowKeys.length} danh mục` : ""}
            </span>
            <Button type="primary">Thêm</Button>
          </div>
        </div>
        <div className="pt-4">
            <TableCustom rowSelection={rowSelection} columns={columns1} dataSource={data} />
        </div>
      </Modal>
    </div>
  );
}
