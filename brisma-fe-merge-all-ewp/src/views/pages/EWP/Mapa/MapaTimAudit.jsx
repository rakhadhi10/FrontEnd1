import React, { useEffect } from "react";
import { Button, Card, Form, Row, Col, Avatar, Space, Spin } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import DebounceAuditor from "../../../../component/AutoComplete/DebounceAuditor";
import { DeleteOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { EWPLayout } from "../../../../layouts/EwpLayout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchTimAudit,
  postTimAudit,
} from "../../../../store/ducks/EWP/Mapa/TimAudit/actions";
import {
  getError,
  getLoading,
  getSubmitError,
  getSubmitLoading,
  getDataTimAudit,
} from "../../../../store/ducks/EWP/Mapa/TimAudit/selectors";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../component/utils/notifications";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { Link } from "react-router-dom";

const showSuccessNotif = createSuccessNotification(
  "Tim Audit",
  "Berhasil menyimpan tim audit"
);
const showErrorNotif = createErrorNotification(
  "Tim Audit",
  "Gagal menyimpan tim audit"
);

function MapaTimAudit({
  fetchTimAudit,
  postTimAudit,
  loading,
  error,
  submitLoading,
  submitError,
  dataForm,
}) {
  const [form] = Form.useForm();
  const { project_id } = useParams();
  useEffect(() => fetchTimAudit(project_id), [fetchTimAudit, project_id]);
  useEffect(() => form.setFieldsValue(dataForm), [dataForm, form]);

  const onFinish = async (values) => {
    try {
      const success = await postTimAudit(project_id, values);
      console.log(values);
      if (success) {
        showSuccessNotif();
        fetchTimAudit(project_id);
      } else {
        showErrorNotif();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    { title: "Tim Audit", link: "/ewp/mapa/tim-audit/" + project_id },
  ];

  return (
    <EWPLayout breadcrumb={breadcrumb} selectedKey="2">
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      {!loading && error && <div className="text-center">{error}</div>}
      {!loading && !error && (
        <>
          <div className="flex gap-1 mb-5">
            <Button size="small">
              <Link to={"/ewp/mapa/sumber-informasi/" + project_id}>&lt;</Link>
            </Button>
            <Button size="small">
              <Link to={"/ewp/mapa/uker-assesment/" + project_id}>&gt;</Link>
            </Button>
          </div>

          <div className="px-6">
            <CardProjectEWP />
          </div>
          <div className="flex items-center gap-4 mb-4 mt-8">
            <p className="text-secondary-light-black text-3xl font-mulish font-bold">
              Tim Audit
            </p>
            <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
          </div>
          {/*form section */}
          <Card
            style={{
              overflow: "hidden",
              borderRadius: "10px",
              borderColor: "#3C64B1",
            }}
            className="mb-5"
          >
            <Form form={form} onFinish={onFinish}>
              <div>
                <Row className="mb-4">
                  <Col span={3}>
                    <Avatar
                      style={{
                        backgroundColor: "#C9EEFA",
                      }}
                      icon={<UserOutlined />}
                    />
                    <p className="font-mulish font-light text-primary-blue">
                      Manager Audit
                    </p>
                  </Col>
                  <Col flex={6}>
                    <Form.Item name="ma" style={{ margin: 0, padding: 0 }}>
                      <DebounceAuditor
                        placeholder="Ketik Nama atau PN"
                        disabled={loading}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col span={3}>
                    <Avatar
                      style={{
                        backgroundColor: "#FAD6D8",
                      }}
                      icon={<UserOutlined />}
                    />
                    <p className="font-mulish font-light text-primary-blue">
                      Ketua Tim Audit
                    </p>
                  </Col>
                  <Col flex={6}>
                    <Form.Item name="kta" style={{ margin: 0, padding: 0 }}>
                      <DebounceAuditor
                        placeholder="Ketik Nama atau PN"
                        disabled={true}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.List name="ata">
                  {(fields, { add, remove }) => (
                    <Space direction="vertical" className="w-full">
                      <Row className="mb-4">
                        <Col span={12}>
                          <Avatar
                            style={{
                              backgroundColor: "#E0FAD6",
                            }}
                            icon={<UserOutlined />}
                          />
                          <Row className="mb-4">
                            <p className="font-mulish font-light text-primary-blue">
                              Anggota Tim Audit
                            </p>

                            <Button
                              onClick={() => add("", 0)}
                              size="small"
                              shape="circle"
                              icon={<PlusOutlined />}
                              className="block bg-transparent border ml-2 border-primary-blue"
                            />
                          </Row>
                        </Col>
                      </Row>

                      {fields.map(
                        (
                          { key, name: atasName, fieldKey, ...restField },
                          index
                        ) => (
                          <div
                            key={key}
                            className="bg-white w-full rounded-lg grid grid-cols-2 items-start gap-2"
                          >
                            <Form.Item key={fieldKey} noStyle>
                              <Form.Item
                                {...restField}
                                key={[key, "nama"]}
                                name={atasName}
                                fieldKey={[fieldKey, "nama"]}
                                style={{ margin: 0, padding: 0 }}
                              >
                                <DebounceAuditor
                                  placeholder="Ketik Nama atau PN"
                                  disabled={loading}
                                />
                              </Form.Item>

                              <Button
                                onClick={() => remove(index)}
                                size="small"
                                shape="circle"
                                icon={
                                  <DeleteOutlined className="text-primary-red" />
                                }
                                className="block bg-transparent border border-primary-red"
                              />
                            </Form.Item>
                          </div>
                        )
                      )}
                    </Space>
                  )}
                </Form.List>
              </div>

              <div className="flex flex-row mt-5 justify-end">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </>
      )}
    </EWPLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    submitLoading: getSubmitLoading(state),
    submitError: getSubmitError(state),
    dataForm: getDataTimAudit(state),
  };
};

const mapDispachToProps = {
  fetchTimAudit: fetchTimAudit,
  postTimAudit: postTimAudit,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(MapaTimAudit);
