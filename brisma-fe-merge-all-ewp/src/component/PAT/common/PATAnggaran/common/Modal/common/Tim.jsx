import { Button, Form, Typography } from "antd";
import DebounceAuditor from "../../../../../../AutoComplete/DebounceAuditor";
import { validateAuditor } from "../../../../../../utils/validators";

export function TimSbp({
  next,
  prev,
  addAnggota,
  onFinish,
  anggota
}) {
  const handleOnFinish = (val) => {
    onFinish()
    next()
  }

  return (
    <Form
      name="buat_tim_audit"
      initialValues={{
        anggota: [...anggota, undefined],
      }}
    >
      <div className="grid grid-cols-3 gap-4">
        <Typography.Title
          level={5}
          style={{ margin: 0 }}
          className="py-2"
        >
          <span className="font-normal">Daftar Anggota</span>
        </Typography.Title>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Form.List name="anggota">
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
                        if (anggota.some(a => a.pn === value.pn)) {
                          return Promise.reject("Anggota sudah ada")
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
                          const lastInputPath = ["anggota", fields.length - 1]
                          await validateFields([lastInputPath])
                          const input = getFieldValue(lastInputPath)
                          if (input) addAnggota(input)
                          add()
                        } catch (error) { }
                      }}
                    >
                      <Typography.Text type="secondary">&#43; Tambah Anggota</Typography.Text>
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
              const { anggota } = getFieldsValue()
              const canGoNext = anggota && anggota.length > 1
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
