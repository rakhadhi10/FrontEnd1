import { Form, Select, InputNumber, Button } from "antd";

const { Option } = Select

export default function FormBiayaPerjalananDinas({
  options,
  addBiayaDinas
}) {
  return (
    <Form
      labelCol={{ span: 8 }}
    >
      <Form.Item
        name="posisi_jabatan"
        label="Posisi Jabatan"
        labelAlign="left"
      >
        <Select placeholder="Posisi Jabatan">
          {options.map(item => (
            <Option key={item.value} value={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="biaya_tiket_pp"
        label="Tiket PP"
        labelAlign="left"
      >
        <InputNumber
          type="number"
          controls={false}
          placeholder="Tiket PP"
          className="w-full"
        // formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        // parser={value => value.replace(/(\.*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        name="biaya_transport_lokal"
        label="Transport Lokal"
        labelAlign="left"
      >
        <InputNumber
          type="number"
          controls={false}
          placeholder="Transport Lokal"
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        name="biaya_perjalanan_hari"
        label="Uang Harian"
        labelAlign="left"
      >
        <InputNumber
          type="number"
          controls={false}
          placeholder="Uang Harian"
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        name="biaya_akomodasi"
        label="Biaya Akomodasi"
        labelAlign="left"
      >
        <InputNumber
          type="number"
          controls={false}
          placeholder="Biaya Akomodasi"
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        shouldUpdate
        noStyle
      >
        {
          ({ getFieldsValue }) => {
            const {
              posisi_jabatan,
              biaya_tiket_pp,
              biaya_transport_lokal,
              biaya_perjalanan_hari,
              biaya_akomodasi
            } = getFieldsValue()
            const canAdd = posisi_jabatan && biaya_tiket_pp && biaya_transport_lokal && biaya_perjalanan_hari && biaya_akomodasi
            return (
              <div className="flex flex-row justify-end">
                <Button
                  htmlType="submit"
                  disabled={!canAdd}
                  onClick={() => addBiayaDinas(getFieldsValue())}
                >
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
