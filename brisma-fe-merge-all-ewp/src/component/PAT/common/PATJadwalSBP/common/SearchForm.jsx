import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllStatus } from "../../../../../store/ducks/PATProject/selectors";
import { frontendFormat } from "../../../../../utils/momentHelpers";

const { Option } = Select;

function SearchForm({ tahun, updateFilterForm, fetchAllSbp }) {
  const { pat_id } = useParams()

  return (
    <Form
      name="sbp_search_form"
      onValuesChange={(_, allVal) => updateFilterForm(allVal)}
      onFinish={() => fetchAllSbp(pat_id)}
    >
      <div className="grid grid-cols-3 gap-8">
        <div>
          <Form.Item name="uker">
            <Input placeholder="Unit Kerja" />
          </Form.Item>
          <Form.Item name="nama_sbp" style={{ marginBottom: "0" }}>
            <Input placeholder="Nama Consulting" />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="pembicara">
            <Input placeholder="Pembicara" />
          </Form.Item>
          <Form.Item name="pic" style={{ marginBottom: "0" }}>
            <Input placeholder="PIC" />
          </Form.Item>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item noStyle shouldUpdate>
              {
                ({ getFieldValue }) => (
                  <Form.Item name="start_date">
                    <DatePicker
                      className="w-full"
                      format={frontendFormat}
                      placeholder="Start Date"
                      defaultPickerValue={moment(tahun, "YYYY")}
                      disabledDate={(current) => {
                        return current && current > getFieldValue("end_date")
                      }}
                    />
                  </Form.Item>
                )
              }
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {
                ({ getFieldValue }) => (
                  <Form.Item name="end_date">
                    <DatePicker
                      className="w-full"
                      format={frontendFormat}
                      placeholder="End Date"
                      defaultPickerValue={moment(tahun, "YYYY")}
                      disabledDate={(current) => {
                        return current && current < getFieldValue("start_date")
                      }}
                    />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item name="modifier">
              <Select placeholder="Less" allowClear>
                <Option value="less">Less Than</Option>
                <Option value="more">More Than</Option>
              </Select>
            </Form.Item>
            <Form.Item name="anggaran" className="col-span-2">
              <InputNumber className="w-full" controls={false} type="number" placeholder="Anggaran" />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = state => ({
  tahun: getAllStatus(state).tahun
})

export default connect(mapStateToProps)(SearchForm)