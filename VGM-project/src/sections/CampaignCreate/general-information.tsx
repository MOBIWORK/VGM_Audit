import { Col, Input, Select, DatePicker } from "antd";
import RowCustom from "../RouterCreate/styled";
import { FormItemCustom } from "../../components";
import TextArea from "antd/es/input/TextArea";

type Options = {
  label: string;
  value: any;
};
export const statusOption: Options[] = [
  {
    label: "Hoạt động",
    value: "Open",
  },
  {
    label: "Đóng",
    value: "Close",
  },
];
export default function GeneralInformation({ form }) {

  const onChangeDateStart = (value, dateString) => {
    console.log(value, dateString)
  }
  const onOkDateStart = (value) => {
    console.log(value);
  }

  return (
    <>
      <div className="p-4 pt-6 pb-[58px]">
        <RowCustom>
          <Col span={8}>
            <FormItemCustom label="Tên chiến dịch" name="campaign_name" required>
              <Input />
            </FormItemCustom>
          </Col>
          <Col span={8}>
            <FormItemCustom label="Thời gian bắt đầu" >
            <DatePicker showTime onChange={onChangeDateStart} onOk={onOkDateStart} />
            </FormItemCustom>
          </Col>
          <Col span={8}>
            <FormItemCustom label="Thời gian kết thúc" required>
              <Input />
            </FormItemCustom>
          </Col>
        </RowCustom>
        <RowCustom className="pt-2">
          <Col span={8}>
            <FormItemCustom label="Trạng thái" name="status">
              <Select options={statusOption} defaultValue={"Active"} />
            </FormItemCustom>
          </Col>
          <Col span={8}>
            <FormItemCustom label="Mô tả" required>
              <TextArea
                className="bg-[#F5F7FA]"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </FormItemCustom>
          </Col>
        </RowCustom>
      </div>
    </>
  );
}
