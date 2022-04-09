import { Form, Select, InputNumber, Button, Spin } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { fetchRefKategoriAnggaran } from "../../../../store/ducks/reference/actions";
import { getRefKategoriAnggaran, getRefKategoriAnggaranError, getRefKategoriAnggaranLoading } from "../../../../store/ducks/reference/selectors";

const { Option } = Select

function BiayaSelamaKegiatanForm({
  // From redux reference
  ref_kategori_anggaran,
  loading,
  error,
  fetchRefKategoriAnggaran,
  // From direct props
  addBiayaKegiatan
}) {
  useEffect(() => fetchRefKategoriAnggaran(), [fetchRefKategoriAnggaran])

  const [currentCategory, setCurrentCategory] = useState("")
  const [form] = Form.useForm()

  const handleChange = (value) => {
    setCurrentCategory(value)
  }

  if (loading) return <div><Spin /></div>
  if (error && !loading) return <p>{error}</p>

  return (
    <Form
      labelCol={{ span: 8 }}
      form={form}
      onFinish={() => addBiayaKegiatan(form.getFieldsValue())}
    >
      <Form.Item
        name="kegiatan"
        label="Pilih Kategori"
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Select
          onChange={handleChange}
        >
          {ref_kategori_anggaran.map(k => {
            return <Option key={k.id} value={k.nama}>{k.nama}</Option>
          })}
        </Select>
      </Form.Item>
      {
        currentCategory &&
        ref_kategori_anggaran.find(k => k.nama === currentCategory).ref_sub_kategori_anggarans.map(sub => (
          <Form.Item
            key={sub.id}
            name={sub.nama}
            label={sub.nama}
            labelAlign="left"
            rules={[{ required: true }]}
          >
            <InputNumber type="number" controls={false} className="w-full" placeholder={sub.nama} />
          </Form.Item>
        ))
      }
      <Form.Item shouldUpdate noStyle>
        {
          ({ getFieldsError }) => {
            const anyErrors = getFieldsError().some(({ errors }) => errors.length)
            return (
              <div className="flex flex-row justify-end">
                <Button htmlType="submit" disabled={anyErrors}>
                  Tambah Biaya
                </Button>
              </div>
            )
          }
        }
      </Form.Item>
    </Form>
  );
}

const mapStateToProps = state => ({
  ref_kategori_anggaran: getRefKategoriAnggaran(state),
  loading: getRefKategoriAnggaranLoading(state),
  error: getRefKategoriAnggaranError(state)
})

const mapDispatchToProps = {
  fetchRefKategoriAnggaran: fetchRefKategoriAnggaran,
}

export default connect(mapStateToProps, mapDispatchToProps)(BiayaSelamaKegiatanForm)