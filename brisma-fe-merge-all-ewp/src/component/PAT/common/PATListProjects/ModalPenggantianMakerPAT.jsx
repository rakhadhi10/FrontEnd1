import { Button, Form, Input, Modal, Select, Spin, Typography } from "antd";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getMakers, getMakersLoading, getModalVisible, getSelectedPATId } from "../../../../store/ducks/PATListProjects/selectors";
import { closeModal, fetchMakers, postMakers } from "../../../../store/ducks/PATListProjects/actions";
import TableMakers from "./TableMakers";
import { createErrorNotification, createSuccessNotification } from "../../../utils/notifications";

const { Option } = Select

const mapStateToProps = state => ({
  visible: getModalVisible(state),
  makers: getMakers(state),
  loading: getMakersLoading(state),
  pat_id: getSelectedPATId(state)
})

const mapDispatchToProps = {
  onCancel: closeModal,
  fetchMakers: fetchMakers,
  postMakers: postMakers
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPenggantianMakerPAT)

export function ModalPenggantianMakerPAT({
  visible,
  makers,
  loading,
  pat_id,
  onCancel,
  fetchMakers,
  postMakers
}) {
  useEffect(() => visible && fetchMakers(pat_id), [fetchMakers, visible, pat_id])

  const [formVal, setFormVal] = useState({ pn: null, nama: null, kategori: "pic_latar_belakang_tujuan" })

  const getData = () => {
    const val = makers[formVal.kategori]
    if (!val) return []
    if (Array.isArray(val)) return filterArr(val)
    return filterArr([val])
  }

  const filterArr = (arr) => {
    let copy = [...arr]
    if (formVal.pn) copy = copy.filter(c => Number(c.pn) === Number(formVal.pn))
    if (formVal.nama) copy = copy.filter(c => c.nama === formVal.nama)
    return copy
  }

  return (
    <Modal
      centered
      destroyOnClose
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={null}
      width={800}
      title={[
        <Typography.Title level={3} className="text-center">
          Penggantian Maker PAT
        </Typography.Title>,
      ]}
    >
      <Form onFinish={(val) => setFormVal({ ...val })}>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
            >
              Personal Number
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
            >
              Nama Maker
            </Typography.Title>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item noStyle name="pn">
              <Input placeholder="Ketik Personal Number" />
            </Form.Item>
            <Form.Item noStyle name="nama">
              <Input placeholder="Ketik Nama Maker" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
            >
              Pilih Status
            </Typography.Title>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item noStyle name="kategori" initialValue="pic_latar_belakang_tujuan">
              <Select>
                <Option value="pic_latar_belakang_tujuan">Maker Latar Belakang</Option>
                <Option value="pic_sumber_informasi">Maker Sumber Informasi</Option>
                <Option value="pic_maker_tim_audit">Maker Tim Audit</Option>
                <Option value="pic_jadwal_audit">Maker Jadwal Audit</Option>
                <Option value="pic_jadwal_sbp">Maker Jadwal Consulting</Option>
                <Option value="pic_kegiatan_lain">Maker Kegiatan Lain</Option>
              </Select>
            </Form.Item>
            <Button htmlType="submit">Search</Button>
          </div>
        </div>
      </Form>
      <div className="border border-primary-blue rounded-lg my-4 p-2 max-h-96 overflow-auto">
        {loading
          ?
          (<div className="flex items-center justify-center p-12">
            <Spin />
          </div>)
          :
          <TableMakers data={getData()} kategori={formVal.kategori} />
        }
      </div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: <p className="text-center">Apakah anda yakin ingin mengubah data ini?</p>,
              centered: true,
              icon: null,
              okText: "Ya",
              cancelText: "Tidak",
              async onOk() {
                const error = await postMakers(pat_id)
                if (error) createErrorNotification("Penggantian Maker PAT", error)()
                else {
                  createSuccessNotification("Penggantian Maker PAT", "Berhasil mengganti maker")()
                  onCancel()
                }
              },
            });
          }}
        >
          Simpan
        </Button>
      </div>
    </Modal>
  );
}