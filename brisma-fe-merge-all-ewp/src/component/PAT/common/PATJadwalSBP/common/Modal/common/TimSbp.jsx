import { Button, Form, Typography } from "antd";
import DebounceAuditor from "../../../../../../AutoComplete/DebounceAuditor";
import { validateAuditor } from "../../../../../../utils/validators";

export default function TimSbp({
  next,
  prev,
  addPembicara,
  addPenanggungJawab,
  onFinish,
  pembicara,
  penanggung_jawab
}) {
  const handleOnFinish = (val) => {
    onFinish()
    next()
  }

  return (
    <Form
      name="buat_tim_audit"
      initialValues={{
        pn_pembicara: [...pembicara, undefined],
        pn_penanggung_jawab: [...penanggung_jawab, undefined]
      }}
    >
      <div className="grid grid-cols-3 gap-4">
        <Typography.Title
          level={5}
          style={{ margin: 0 }}
          className="py-2"
        >
          <span className="font-normal">Pembicara</span>
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{ margin: 0 }}
          className="py-2"
        >
          <span className="font-normal">PIC</span>
        </Typography.Title>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Form.List name="pn_pembicara">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Form.Item
                  {...restField}
                  key={fieldKey}
                  name={[name]}
                  fieldKey={[fieldKey]}
                  rules={[
                    () => ({
                      validator(rule, value) {
                        const existsPembicara = pembicara.some(a => a.pn === value.pn)
                        const existsPIC = penanggung_jawab.some(a => a.pn === value.pn)
                        if (existsPembicara || existsPIC) {
                          return Promise.reject("Pembicara/PIC sudah ada")
                        }
                        return validateAuditor(rule, value)
                      },
                    }),
                  ]}
                  className="w-full mb-2"
                >
                  {fields.length - 1 !== index
                    ? <AnggotaView />
                    : <DebounceAuditor
                      placeholder="Ketik Nama atau PN"
                    />
                  }
                </Form.Item>
              ))}
              <Form.Item shouldUpdate noStyle>
                {({ validateFields, getFieldValue }) => {
                  return (
                    <p
                      className="float-right text-sm underline cursor-pointer"
                      onClick={async () => {
                        try {
                          const lastInputPath = ["pn_pembicara", fields.length - 1]
                          await validateFields([lastInputPath])
                          const input = getFieldValue(lastInputPath)
                          if (input) addPembicara(input)
                          add()
                        } catch (error) { }
                      }}
                    >
                      <Typography.Text type="secondary">&#43; Tambah Pembicara</Typography.Text>
                    </p>
                  )
                }}
              </Form.Item>
            </div>
          )}
        </Form.List>
        <Form.List name="pn_penanggung_jawab">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Form.Item
                  {...restField}
                  key={index}
                  name={[name]}
                  fieldKey={[fieldKey]}
                  rules={[
                    () => ({
                      validator(rule, value) {
                        const existsPembicara = pembicara.some(a => a.pn === value.pn)
                        const existsPIC = penanggung_jawab.some(a => a.pn === value.pn)
                        if (existsPembicara || existsPIC) {
                          return Promise.reject("Pembicara/PIC sudah ada")
                        }
                        return validateAuditor(rule, value)
                      },
                    }),
                  ]}
                  className="w-full mb-2"
                >
                  {fields.length - 1 !== index
                    ? <AnggotaView />
                    : <DebounceAuditor
                      placeholder="Ketik Nama atau PN"
                    />
                  }
                </Form.Item>
              ))}
              <Form.Item shouldUpdate noStyle>
                {({ validateFields, getFieldValue }) => {
                  return (
                    <p
                      className="float-right text-sm underline cursor-pointer"
                      onClick={async () => {
                        try {
                          const lastInputPath = ["pn_penanggung_jawab", fields.length - 1]
                          await validateFields([lastInputPath])
                          const input = getFieldValue(lastInputPath)
                          if (input) addPenanggungJawab(input)
                          add()
                        } catch (error) { }
                      }}
                    >
                      <Typography.Text type="secondary">&#43; Tambah PIC</Typography.Text>
                    </p>
                  )
                }}
              </Form.Item>
            </div>
          )}
        </Form.List>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
        <Form.Item
          shouldUpdate
          noStyle
        >
          {
            ({ getFieldsValue }) => {
              const { pn_pembicara, pn_penanggung_jawab } = getFieldsValue()
              const canGoNext =
                pn_pembicara &&
                pn_penanggung_jawab &&
                pn_pembicara.length > 1 &&
                pn_penanggung_jawab.length > 1
              return (
                <div className="flex flex-row justify-end gap-4">
                  <Button onClick={prev}>
                    Back
                  </Button>
                  <Button
                    type="primary"
                    disabled={!canGoNext}
                    onClick={handleOnFinish}
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

const AnggotaView = ({ value, onChange }) => (
  <p className="w-full font-semibold">
    {value.pn ? `${value.pn} - ${value.nama}` : value.nama}
  </p>
)
