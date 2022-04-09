import { useParams } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { BankOutlined, DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import DebounceAuditor from "../../../../../AutoComplete/DebounceAuditor";
import DebounceOrgehBranch from "../../../../../AutoComplete/DebounceOrgehBranch";
import { createErrorNotification, createSuccessNotification } from "../../../../../utils/notifications";
import { validateATA, validateKTA, validateMA, validateOrgehBranch } from "../../../../../utils/validators";
import DialogAlasanAddendum from "../../../DialogAlasanAddendum";

const showSuccessNotif = createSuccessNotification("Tim Audit", "Berhasil menyimpan tim audit")
const showErrorNotif = createErrorNotification("Tim Audit", "Gagal menyimpan tim audit");

export default function EditTim({
  addendum,
  buttonLabel = "Simpan",
  initialValues,
  submitting,
  footer,
  onSubmit,
  onChange,
  closeModal,
  fetchAllTimAudit
}) {
  const { pat_id } = useParams()

  const handleOnFinish = async (val) => {
    if (addendum) {
      DialogAlasanAddendum(async (alasan) => {
        const success = await onSubmit(pat_id, alasan)
        if (success) {
          showSuccessNotif()
          fetchAllTimAudit(pat_id)
          closeModal()
        } else {
          showErrorNotif()
        }
        return success
      })
    } else {
      const success = await onSubmit(pat_id)
      if (success) {
        showSuccessNotif()
        fetchAllTimAudit(pat_id)
        closeModal()
      } else {
        showErrorNotif()
      }
    }
  }

  return (
    <Form
      name="form_tim_audit"
      layout="vertical"
      onFinish={handleOnFinish}
      onValuesChange={onChange}
      initialValues={initialValues}
    >
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="name"
          label="Nama Tim Audit"
          rules={[{ required: true, message: "Missing nama tim audit" }]}
        >
          <Input
            placeholder="Ketik Nama Tim"
            disabled={submitting}
          />
        </Form.Item>
        <Form.Item
          name="ma"
          label="Nama MA"
          rules={[
            () => ({
              validator(rule, value) {
                const { kta, atas } = initialValues
                return validateMA(rule, value, kta, atas)
              },
            }),
          ]}
        >
          <DebounceAuditor
            placeholder="Ketik Nama atau PN"
            disabled={submitting}
          />
        </Form.Item>
        <Form.Item
          name="kta"
          label="Nama KTA"
          rules={[
            () => ({
              validator(rule, value) {
                const { ma, atas } = initialValues
                return validateKTA(rule, value, ma, atas)
              },
            }),
          ]}
        >
          <DebounceAuditor
            placeholder="Ketik Nama atau PN"
            disabled={submitting}
          />
        </Form.Item>
      </div>
      <Form.List name="atas">
        {(fields, { add: addAta, remove: removeAta }) => (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h5 className="text-lg">
                <span className="font-normal m-0">Daftar Anggota</span>
              </h5>
              {!submitting &&
                <div
                  className="border border-dashed rounded-lg py-1 px-8 cursor-pointer"
                  onClick={() => addAta({ new: true, nama: undefined, saved: false, uker: [{ orgeh: undefined, branch: undefined }] }, 0)}
                >
                  &#43; Tambah Anggota
                </div>
              }
            </div>
            <div style={{ backgroundColor: "#F4F5F4" }} className="h-72 my-4 py-4 px-2 overflow-auto">
              {fields.map(({ key, name: atasName, fieldKey, ...restField }, indexAta) => (
                <div key={key} className="bg-white p-4 mb-2 rounded-lg grid grid-cols-8 items-start gap-4">
                  <div className="flex gap-4 col-span-2 w-full">
                    <UserOutlined className="text-lg flex-none" />
                    <Form.Item shouldUpdate className="flex-1 m-0">
                      {({ getFieldValue }) => {
                        const path = ["atas", atasName, "saved"];
                        const saved = getFieldValue(path);
                        if (saved)
                          return (
                            <Form.Item
                              {...restField}
                              name={[atasName, "nama"]}
                              fieldKey={[fieldKey, "nama"]}
                              style={{ margin: 0, padding: 0 }}
                            >
                              <AnggotaView />
                            </Form.Item>
                          );
                        else
                          return (
                            <Form.Item
                              {...restField}
                              name={[atasName, "nama"]}
                              fieldKey={[fieldKey, "nama"]}
                              rules={[
                                () => ({
                                  validator(rule, value) {
                                    const { ma, kta, atas } = initialValues;
                                    return validateATA(rule, value, ma, kta, atas, atasName)
                                  },
                                }),
                              ]}
                              style={{ margin: 0, padding: 0 }}
                            >
                              <DebounceAuditor
                                placeholder="Ketik Nama atau PN"
                                disabled={submitting}
                              />
                            </Form.Item>
                          );
                      }}
                    </Form.Item>
                  </div>
                  <div className="col-span-5">
                    <Form.List name={[atasName, "uker"]}>
                      {(ukers, { add, remove }) => {
                        return (
                          <div>
                            {ukers.map(({ key, name, fieldKey, ...restField }, indexUker) => (
                              <div key={key} className="flex gap-4">
                                <BankOutlined className="text-lg p-0 m-0" />
                                <Form.Item shouldUpdate className="flex-1 m-0">
                                  {({ getFieldValue }) => {
                                    const path = ["atas", atasName, "saved"];
                                    const saved = getFieldValue(path);
                                    if (saved)
                                      return (
                                        <Form.Item
                                          {...restField}
                                          name={[indexUker]}
                                          className="m-0"
                                        >
                                          <UkerView />
                                        </Form.Item>
                                      );
                                    else
                                      return (
                                        <Form.Item
                                          {...restField}
                                          name={[indexUker]}
                                          className="w-full m-0 pb-2"
                                          rules={[
                                            () => ({
                                              validator(rule, value) {
                                                const { branch, orgeh } = value
                                                if (!branch && !orgeh) return Promise.resolve()
                                                return validateOrgehBranch(rule, value)
                                              },
                                            }),
                                          ]}
                                        >
                                          <DebounceOrgehBranch disabled={submitting}>
                                            {(inputOrgeh, inputBranch) => (
                                              <div className="grid grid-cols-2 gap-4">
                                                {inputOrgeh}
                                                {inputBranch}
                                              </div>
                                            )}
                                          </DebounceOrgehBranch>
                                        </Form.Item>
                                      );
                                  }}
                                </Form.Item>
                              </div>
                            ))}
                            <Form.Item noStyle shouldUpdate className="flex-1">
                              {({ getFieldValue }) => {
                                const path = ["atas", atasName, "saved"];
                                const saved = getFieldValue(path);
                                if (!saved)
                                  return (
                                    <>
                                      {
                                        !submitting &&
                                        <p className="float-right text-sm underline cursor-pointer" onClick={() => add()}>
                                          <Typography.Text type="secondary">&#43; Tambah Unit Kerja</Typography.Text>
                                        </p>
                                      }
                                    </>
                                  );
                              }}
                            </Form.Item>
                          </div>
                        );
                      }}
                    </Form.List>
                  </div>
                  {!submitting &&
                    <Form.Item shouldUpdate noStyle>
                      {({ validateFields, getFieldValue }) => {
                        const path = ["atas", atasName, "saved"];
                        const saved = getFieldValue(path);
                        if (saved)
                          return (
                            <Form.Item
                              {...restField}
                              name={[atasName, "saved"]}
                              fieldKey={[fieldKey, "saved"]}
                              className="m-0"
                              initialValue={true}
                            >
                              <EditDeleteButton
                                onDelete={async () => {
                                  removeAta(indexAta)
                                }}
                              />
                            </Form.Item>
                          );
                        else
                          return (
                            <Form.Item
                              {...restField}
                              name={[atasName, "saved"]}
                              fieldKey={[fieldKey, "saved"]}
                              className="m-0"
                              initialValue={true}
                            >
                              <SimpanButton
                                validate={validateFields}
                                fieldPath={[["atas", atasName, "nama"]]}
                              />
                            </Form.Item>
                          );
                      }}
                    </Form.Item>
                  }
                </div>
              ))}
            </div>
          </>
        )}
      </Form.List>
      <div className="flex justify-between items-center">
        {footer}
        <Form.Item
          shouldUpdate
          noStyle
        >
          {
            ({ getFieldsError }) => {
              const anyErrors = getFieldsError().some(({ errors }) => errors.length)
              return (
                <div className="flex flex-row justify-end">
                  <Button
                    type={addendum ? "danger" : "primary"}
                    htmlType="submit"
                    disabled={anyErrors}
                    loading={submitting}
                  >
                    {buttonLabel}
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

const AnggotaView = ({ value, onChange }) => (
  <p className="w-full">
    {typeof (value) === "string" && value}
    {typeof (value) === "object" && `${value.pn} - ${value.nama}`}
  </p>
)

const UkerView = ({ value = { orgeh: {}, branch: {} }, onChange }) => (
  <p className="w-full">
    {`${value.branch ? value.branch.branch : ""} - ${value.orgeh ? value.orgeh.child : ""} - ${value.orgeh ? value.orgeh.my_name : ""}`}
  </p>
)

const SimpanButton = ({ value, onChange, validate, fieldPath }) => (
  <Button
    onClick={async () => {
      try {
        await validate(fieldPath);
        onChange(true);
      } catch (error) { }
    }}
  >
    Simpan
  </Button>
);

const EditDeleteButton = ({ value, onChange, onDelete }) => (
  <div className="flex gap-2">
    <Button
      onClick={() => {
        onChange(false)
      }}
      icon={<EditOutlined />}
      shape="circle"
      style={{
        backgroundColor: "#CCD2E3"
      }}
    />
    <Button
      onClick={onDelete}
      icon={<DeleteOutlined />}
      shape="circle"
      style={{
        backgroundColor: "#CCD2E3"
      }}
    />
  </div>
);