import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, Button, DatePicker, Form, Input, Popover, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { fetchRefTemaAudit, fetchRefTipeAudit } from "../../../../../../../store/ducks/reference/actions";
import { getRefTemaAudit, getRefTipeAudit } from "../../../../../../../store/ducks/reference/selectors";
import { frontendFormat } from "../../../../../../../utils/momentHelpers";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";
import moment from "moment";

const { Option } = Select;

export const InfoKegiatan = ({
  tahun,
  initialValues,
  selected_tipe_audit_code,
  ref_tipe_audit,
  ref_tema_audit,
  ref_teams,
  next,
  onValuesChange,
  onFinish,
  fetchRefTipeAudit,
  fetchRefTemaAudit,
  fetchRefTeams
}) => {
  const { pat_id } = useParams()

  useEffect(() => {
    fetchRefTipeAudit("aiti")
    fetchRefTemaAudit()
    fetchRefTeams(pat_id)
  }, [fetchRefTipeAudit, fetchRefTemaAudit, fetchRefTeams, pat_id])

  const handleOnFinish = (val) => {
    onFinish()
    next()
  }

  return (
    <Form
      name="info-kegiatan"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      onFinish={handleOnFinish}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <p>Nama Kegiatan</p>
            <Form.Item name="nama_kegiatan_audit" className="m-0 w-10/12">
              <Input placeholder="AITI_Reguler_DivTSI.Brinets_Mei_2013" />
            </Form.Item>
          </div>
          <div hidden={selected_tipe_audit_code !== "TMT"}>
            <p>Pilih Tema</p>
            <Form.Item name="tema" className="m-0 w-1/2">
              <Select>
                {ref_tema_audit.map((item) => (
                  <Option key={item.kode} value={item.kode}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>
            <p>Tim Audit</p>
            <Form.Item name="tim" className="m-0 w-1/2">
              <Select>
                {ref_teams.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-1/2">
            <p>Tipe Audit</p>
            <Form.Item name="tipe_audit" style={{ margin: 0 }}>
              <Select>
                {ref_tipe_audit.map((item) => (
                  <Option key={item.kode} value={item.kode}>
                    {item.nama}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="w-full">
            <p>Periode Kegiatan</p>
            <div className="grid grid-cols-5 items-center gap-4">
              <Form.Item noStyle shouldUpdate>
                {
                  ({ getFieldValue }) => (
                    <Form.Item
                      name="start_date"
                      style={{ margin: 0 }}
                      className="col-span-2"
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
              <p className="justify-self-center">s/d</p>
              <Form.Item noStyle shouldUpdate>
                {
                  ({ getFieldValue }) => (
                    <Form.Item
                      name="end_date"
                      style={{ margin: 0 }}
                      className="col-span-2"
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
          <Form.Item
            shouldUpdate
            noStyle
          >
            {
              ({ getFieldValue }) => {
                const tim = getFieldValue("tim")
                return (
                  <TeamViewer team={ref_teams.find(t => t.id === tim)} />
                )
              }
            }
          </Form.Item>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
        <Form.Item
          shouldUpdate
          noStyle
        >
          {
            ({ getFieldsValue }) => {
              const {
                nama_kegiatan_audit,
                tim,
                tipe_audit,
                start_date,
                end_date,
                tema
              } = getFieldsValue(true)
              let canGoNext = nama_kegiatan_audit && tim && tipe_audit && start_date && end_date
              if (tipe_audit === "TMT") canGoNext = canGoNext && tema
              return (
                <div className="flex flex-row justify-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!canGoNext}
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
};

const TeamViewer = ({ team }) => {
  const atas = team ? team.ref_tim_audit_ata || team.atas : []

  return (
    <div className="p-4 bg-gray-300 rounded-lg w-full h-40 flex items-start justify-center">
      {team &&
        <div className="w-full grid grid-cols-2 gap-4 items-start">
          <div className="flex justify-center gap-4">
            <Avatar.Group size="large">
              <Popover content={(<p>{team.pn_ma.nama}</p>)} trigger="hover">
                <Avatar
                  style={{
                    backgroundColor: "#C9EEFA",
                  }}
                  icon={<UserOutlined />}
                />
              </Popover>
            </Avatar.Group>
            <Avatar.Group size="large">
              <Popover content={(<p>{team.pn_kta.nama}</p>)} trigger="hover">
                <Avatar
                  style={{
                    backgroundColor: "#FAD6D8",
                  }}
                  icon={<UserOutlined />}
                />
              </Popover>
            </Avatar.Group>
          </div>
          <div className="justify-self-start">
            <Avatar.Group size="large" className="flex flex-wrap justify-start">
              {atas.map(ata => (
                <Popover
                  key={ata.id || ata.pn}
                  content={(<p>{ata.nama_ata || ata.name || ata.nama}</p>)}
                  trigger="hover"
                >
                  <Avatar
                    style={{
                      backgroundColor: "#E0FAD6",
                    }}
                    icon={<UserOutlined />}
                  />
                </Popover>
              ))}
            </Avatar.Group>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  ref_tipe_audit: getRefTipeAudit(state),
  ref_tema_audit: getRefTemaAudit(state),
  tahun: getAllStatus(state).tahun
})

const mapDispatchToProps = {
  fetchRefTipeAudit: fetchRefTipeAudit,
  fetchRefTemaAudit: fetchRefTemaAudit,
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoKegiatan)
