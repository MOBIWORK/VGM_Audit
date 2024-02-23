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

export default function Product(props) {
  console.log(props.recordData);
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
      { title: "STT", dataIndex: "stt" },
      { title: "Tên sản phẩm", dataIndex: "name" },
      { title: "Số lượng sản phẩm máy chấm", dataIndex: "quantityAI"},
      { title: "Ảnh trưng bày", dataIndex: "date", }
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
    { title: "Danh mục sản phẩm", dataIndex: "category", key: "product" },
    { title: "Số lượng sản phẩm", dataIndex: "quantity", key: "quantity" },
    {
      title: "",
      key: "",
     
    },
  ];

  const columns1: TableColumnsType<DataType> = [
    { title: "Danh mục sản phẩm", dataIndex: "category", key: "product" },
    { title: "Số lượng sản phẩm", dataIndex: "quantity", key: "quantity" },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < props.recordData?.category_names.length; ++i) {
    let categoryObject = props.recordData.category_names[i];
    let categoryName = Object.values(categoryObject)[0]; // Lấy giá trị tên danh mục từ đối tượng
    data.push({
      key: i.toString(),
      stt: (i + 1).toString(),
      category: categoryName,
      quantity: 190
    });
}

  return (
   
      < >
        <TableCustom
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          dataSource={data}
        />
      </>
    
  );
}
