import moment from "moment";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Card, DatePicker, Form, Input, InputNumber, Radio, Select } from "antd";
import { fetchAnggaran, updateFilterForm } from "../../../../../store/ducks/PATAnggaran/actions";
import { getAllStatus } from "../../../../../store/ducks/PATProject/selectors";
import { frontendFormat } from "../../../../../utils/momentHelpers";

function SearchAnggaranNormal({ tahun, updateFilterForm, fetchAnggaran }) {
  const { pat_id } = useParams()

  return (
    <Card>
      <Form
        onValuesChange={(_, all) => updateFilterForm(all)}
        onFinish={() => fetchAnggaran(pat_id)}
      >
        <div className="grid grid-cols-3 gap-x-8 items-start">
          <Form.Item name="nama_kegiatan">
            <Input placeholder="Cari Nama Kegiatan" />
          </Form.Item>
          <div className="flex items-center justify-between gap-4">
            <Form.Item noStyle shouldUpdate>
              {
                ({ getFieldValue }) => (
                  <Form.Item name="start_date" noStyle>
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
            <p>s/d</p>
            <Form.Item noStyle shouldUpdate>
              {
                ({ getFieldValue }) => (
                  <Form.Item name="end_date" noStyle>
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
                <Select.Option value="less">Less Than</Select.Option>
                <Select.Option value="more">More Than</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="anggaran" className="col-span-2">
              <InputNumber className="w-full" controls={false} type="number" placeholder="Anggaran" />
            </Form.Item>
          </div>
          <Form.Item name="tim_name">
            <Input placeholder="Cari Nama Tim" />
          </Form.Item>
          <Form.Item name="tipe_anggaran">
            <Radio.Group className="flex justify-between">
              <Radio value="audit">
                <p className="px-2 py-1 mx-1 bg-primary-red text-xs font-mulish font-light text-white">Audit</p>
              </Radio>
              <Radio value="sbp">
                <p className="px-2 py-1 mx-1 bg-primary-green text-xs font-mulish font-light text-white">SBP</p>
              </Radio>
              <Radio value="lain">
                <p className="px-2 py-1 mx-1 bg-primary-purple text-xs font-mulish font-light text-white">Lain-lain</p>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </div>
      </Form>
    </Card>
  );
}

const mapDispatchToProps = {
  updateFilterForm: updateFilterForm,
  fetchAnggaran: fetchAnggaran
}

const mapStateToProps = state => ({
  tahun: getAllStatus(state).tahun
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAnggaranNormal)
