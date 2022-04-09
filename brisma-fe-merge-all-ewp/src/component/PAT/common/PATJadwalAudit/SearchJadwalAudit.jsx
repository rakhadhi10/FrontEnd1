import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllStatus } from "../../../../store/ducks/PATProject/selectors";
import { fetchRefTipeAudit } from "../../../../store/ducks/reference/actions";
import { getRefTipeAudit } from "../../../../store/ducks/reference/selectors";
import { frontendFormat } from "../../../../utils/momentHelpers";

const { Option } = Select;

function SearchJadwalAudit({
  tahun,
  uka,
  ref_tipe_audit,
  ref_teams,
  fetchRefTipeAudit,
  fetchRefTeams,
  updateFilterForm,
  fetchAllJadwalAudit
}) {
  const { pat_id } = useParams()
  useEffect(() => {
    fetchRefTipeAudit(uka)
    fetchRefTeams(pat_id)
  }, [uka, fetchRefTeams, fetchRefTipeAudit, pat_id])

  return (
    <Card>
      <Form
        onValuesChange={(_, allVal) => updateFilterForm(allVal)}
        onFinish={(_) => fetchAllJadwalAudit(pat_id)}
      >
        <div className="grid grid-cols-3 gap-x-8">
          <div>
            <Form.Item name="project_name">
              <Input placeholder="Project Name" className="w-full" />
            </Form.Item>
            <div className="flex flex-row justify-between items-center gap-4">
              <Form.Item noStyle shouldUpdate>
                {
                  ({ getFieldValue }) => (
                    <Form.Item name="start" noStyle>
                      <DatePicker
                        className="w-full"
                        format={frontendFormat}
                        placeholder="Start Date"
                        defaultPickerValue={moment(tahun, "YYYY")}
                        disabledDate={(current) => {
                          return current && current > getFieldValue("end")
                        }}
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
              s/d
              <Form.Item noStyle shouldUpdate>
                {
                  ({ getFieldValue }) => (
                    <Form.Item name="end" noStyle>
                      <DatePicker
                        className="w-full"
                        format={frontendFormat}
                        placeholder="End Date"
                        defaultPickerValue={moment(tahun, "YYYY")}
                        disabledDate={(current) => {
                          return current && current < getFieldValue("start")
                        }}
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </div>
          </div>
          <div>
            <Form.Item name="tipe_project">
              <Select placeholder="Tipe Project" allowClear className="w-full">
                {ref_tipe_audit.map(t => <Option key={t.kode} value={t.kode}>{t.nama}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="timAudit" className="col-span-2" noStyle>
              <Select placeholder="Tim Audit" allowClear className="w-full">
                {ref_teams.map(t => <Option key={t.id} value={t.id}>{t.name}</Option>)}
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-start items-end">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

const mapStateToProps = state => ({
  ref_tipe_audit: getRefTipeAudit(state),
  tahun: getAllStatus(state).tahun
})

const mapDispatchToProps = {
  fetchRefTipeAudit: fetchRefTipeAudit,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchJadwalAudit)
