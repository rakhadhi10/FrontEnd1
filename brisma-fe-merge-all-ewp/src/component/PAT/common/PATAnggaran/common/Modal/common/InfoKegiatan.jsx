import { connect } from "react-redux";
import moment from "moment";
import { Button, DatePicker, Form, Input, Typography } from "antd";
import DebounceOrgehBranch from "../../../../../../AutoComplete/DebounceOrgehBranch";
import { validateOrgehBranch } from "../../../../../../utils/validators";
import { frontendFormat } from "../../../../../../../utils/momentHelpers";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";

function InfoKegiatan({ tahun, initialValues, next, onValuesChange, onFinish }) {
  const handleOnFinish = (val) => {
    onFinish()
    next()
  }

  return (
    <Form
      name="info-kegiatan"
      onFinish={handleOnFinish}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
    >
      <div className="grid grid-cols-3 gap-4 ">
        <Typography.Title
          level={5}
          style={{ margin: 0 }}
          className="py-2"
        >
          <span className="font-normal">Nama Kegiatan</span>
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{ margin: 0 }}
          className="py-2"
        >
          <span className="font-normal">Orgeh</span>
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{ margin: 0 }}
          className="py-2"
        >
          <span className="font-normal">Branch</span>
        </Typography.Title>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="nama_kegiatan"
          rule={[{ required: true, message: "Missing nama kegiatan" }]}
          style={{ minWidth: "250px" }}
        >
          <Input placeholder="Nama Kegiatan" />
        </Form.Item>
        <Form.Item
          name="uker"
          className="w-full m-0 col-span-2"
          rules={[
            () => ({
              validator(rule, value) {
                return validateOrgehBranch(rule, value)
              },
            }),
          ]}
        >
          <DebounceOrgehBranch>
            {(inputOrgeh, inputBranch) => (
              <div className="grid grid-cols-2 gap-4">
                {inputOrgeh}
                {inputBranch}
              </div>
            )}
          </DebounceOrgehBranch>
        </Form.Item>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Typography.Title
          level={5}
          style={{ margin: 0 }}
          className="py-2"
        >
          <span className="font-normal">Periode Kegiatan</span>
        </Typography.Title>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex items-center gap-4">
          <Form.Item noStyle shouldUpdate>
            {
              ({ getFieldValue }) => (
                <Form.Item
                  name="start_date"
                  style={{ margin: 0 }}
                  className="flex-1"
                >
                  <DatePicker
                    className="w-full"
                    format={frontendFormat}
                    defaultPickerValue={moment(tahun, "YYYY")}
                    disabledDate={(current) => {
                      return current &&
                        (
                          current.year() !== tahun ||
                          current < moment().endOf('day') ||
                          current > getFieldValue("end_date")
                        )
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
                <Form.Item
                  name="end_date"
                  style={{ margin: 0 }}
                  className="flex-1"
                >
                  <DatePicker
                    className="w-full"
                    format={frontendFormat}
                    defaultPickerValue={moment(tahun, "YYYY")}
                    disabledDate={(current) => {
                      return current &&
                        (
                          current.year() !== tahun ||
                          current < moment().endOf('day') ||
                          current < getFieldValue("start_date")
                        )
                    }}
                  />
                </Form.Item>
              )
            }
          </Form.Item>
        </div>
      </div>
      <div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
        <Form.Item
          shouldUpdate
          noStyle
        >
          {
            ({ getFieldsValue, getFieldsError }) => {
              const { nama_kegiatan, uker: { orgeh, branch }, start_date, end_date } = getFieldsValue(true)
              const anyErrors = getFieldsError().some(({ errors }) => errors.length)
              const allFilled = nama_kegiatan && orgeh && branch && start_date && end_date && !anyErrors
              return (
                <div className="flex flex-row justify-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!allFilled}
                  >
                    Next
                  </Button>
                </div>
              )
            }
          }
        </Form.Item>
      </div>
    </Form>
  );
}

const mapStateToProps = state => ({
  tahun: getAllStatus(state).tahun
})

export default connect(mapStateToProps)(InfoKegiatan)
