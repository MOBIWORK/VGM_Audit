
import { LuUploadCloud } from "react-icons/lu";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import  {AxiosService} from '../../services/server';
import { VscAdd } from "react-icons/vsc";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Space, Table, TableColumnsType,DatePicker,Select } from "antd";
import { useState,useEffect } from "react";
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
const { RangePicker } = DatePicker;
const columns: TableColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Cửa hàng",
    dataIndex: "retail_code",
  },
  {
    title: "Tên chiến dịch",
    dataIndex: "campaign_name",
  },
  {
    title: "Nhân viên thực hiện",
    dataIndex: "employee_code",
  },
  {
    title: "Thời gian vào",
    dataIndex: "date_check_in",
  },
  {
    title: "Thời gian ra",
    dataIndex: "date_check_out",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity_cate",
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
  const [dataReport, setDataReport] = useState<any[]>([]);
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  const handleRowClick = (record) => {
    // Lưu record vào local storage
    localStorage.setItem('recordData', JSON.stringify(record));
    navigate(`/report-view`);
  };
  //Các hàm xử lý danh mục
  const fetchDataReport= async () => {
    try {
      //setLoading(true);
      let urlReport = '/api/method/vgm_audit.api.api.get_list_reports';
      const response = await AxiosService.get(urlReport);
      // Kiểm tra xem kết quả từ API có chứa dữ liệu không
      if (response && response.message.data) {
        //Thêm key cho mỗi phần tử trong mảng, sử dụng trường 'name'
        let dataReport: DataType[] = response.message.data.map((item: DataType,index: number) => {
          return {
            ...item,
            key: item.name,
            stt: index+1
          }
        })
        setDataReport(dataReport);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchDataReport();
  }, []);

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
      <FormItemCustom className="w-[250px] border-none mr-4" label="Thời gian thực hiện">
        <RangePicker />
      </FormItemCustom>
    
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{paddingBottom: '5px'}}>Nhân viên:</label>
    <Select className="w-[200px] h-[36px]">
      <Select.Option value="demo">Nguyễn Văn A</Select.Option>
      <Select.Option value="demo1">Nguyễn Văn B</Select.Option>
      <Select.Option value="demo2">Nguyễn Văn C</Select.Option>
      <Select.Option value="demo3">Nguyễn Văn D</Select.Option>

    </Select>
  </div>

    </div>
        <div className="p-4">
          <TableCustom
            columns={columns}
            dataSource={dataReport}
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
