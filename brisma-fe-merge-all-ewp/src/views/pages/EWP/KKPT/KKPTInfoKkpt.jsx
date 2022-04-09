import { Button, Card, Input, Form, Row, Col, Radio, Select, notification } from "antd";
import React, { useState, memo, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { CardInfoKKPT, TableInfoKkpt, KkptLayout } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { SaveOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { saveInfoKkptTry, getResikoType, getFocusAudit, getProduk } from "../../../../store/ducks/EWP/Kkpt/kkptinfosave/action"
import { compose } from "redux";
import { connect } from "react-redux";
const { TextArea } = Input;
const { Option } = Select;



const breadcrumb = [
  {
    title: "BRISMA",
    link: "/",
  },
  {
    title: "EWP",
    link: "/dashboard",
  },
  {
    title: "20210011",
    link: "/ewp/project",
  },
  {
    title: "KKPT",
    link: "/ewp/project/kkpt",
  },
  {
    title: "Info KKPT",
    link: "/ewp/project/kkpt/info-kkpt",
  },
];

function KKPTInfoKkpt({ stateKkptDetail, stateKkptInfoSave, saveInfoKkptTry, getResikoType, getFocusAudit, getProduk }) {
  const { kkpt_id } = useParams();
  const { tipe_resiko, focus_audit, produk } = stateKkptInfoSave;
  const [form] = Form.useForm();
  const [produkData, setprodukData] = useState([]);
  const [riskData, setRiskData] = useState({
    key: null, value: '', children: ''
  });
  const [focusData, setFocusData] = useState({ key: null, value: '', children: '' });
  const judul_kkpt = stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.judul_kkpt : null
  const riskTypeName = stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.mtd_stc_risk_type_name : null
  const riskTypeKode = stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.mtd_stc_risk_type_kode : null
  const auditFocusName = stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.audit_focus_name : null
  const auditFocusKode = stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.audit_focus_kode : null
  const produkKode = stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.products_kode : null
  const temuanBerulang = stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.is_temuan_berulang : false

  const lengthProduk = produkKode !== null ? produkKode : 0



  useEffect(() => {




    (async () => {
      getResikoType()
      getFocusAudit()
      getProduk()
      setRiskData(state => ({
        ...state,
        value: riskTypeKode,
        children: riskTypeName
      }))
      setFocusData(state => ({
        ...state,
        value: auditFocusKode,
        children: auditFocusName
      }))
    })();

    if (lengthProduk !== 0) {
      produkKode.forEach((v, k) => {
        setprodukData(state => ([...state, { key: k + 1, produk: v }]))

      })
    }


    console.log('i fire once');
  }, [lengthProduk])



  const onFormSave = async () => {

    const temuanBerulang = form.getFieldValue(["is_temuan_berulang"])

    let dataProdukTemp = []
    produkData.forEach((value, key) => {
      dataProdukTemp.push(value.produk)
    })

    let payload = {
      judul_kkpt,
      id: Number(kkpt_id),
      is_temuan_berulang: temuanBerulang,
      mtd_stc_risk_type_kode: riskData.value,
      mtd_stc_risk_type_name: riskData.children,
      audit_focus_kode: focusData.value,
      audit_focus_name: focusData.children,
      products_kode: dataProdukTemp,
    }

    console.log(payload)

    const status = await saveInfoKkptTry(payload)

    if (status === "success") {
      form.resetFields()
      produkData.length = 0
      notification['success']({
        message: 'SuccessFully',
        description:
          'Berhasil melakukan Insert Info Kkpt',
      });
    }

  };



  const onProdukSave = () => {
    const formData = form.getFieldValue("produk");
    if (produkData.filter(item => item.produk === formData).length === 0) {
      const key = produkData.length + 1;
      const newData = { key: key, produk: formData };
      setprodukData((prev) => [...prev, newData]);
    }
  };

  const onProdukDelete = (key) => {
    setprodukData(produkData.filter((item) => item.key !== key));
  };

  const onChangeRisk = (value, option) => {
    setRiskData(option)

  }

  const onChangeFocusAudit = (value, option) => {
    console.log(option)
    setFocusData(option)
  }

  // console.log(temuanBerulang)

  return (
    <KkptLayout selectedKey="5" title="EWP" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">KKPT Info</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      {/*form section */}
      <Card
        style={{ overflow: "hidden", borderRadius: "10px", borderColor: "#3C64B1" }}
        className="mb-5"
      >
        <Form form={form}
          initialValues={{
            is_temuan_berulang: temuanBerulang
          }}

        >
          <div>
            <Row>
              <Col span={3}>
                <p className="font-mulish font-light text-primary-blue">Judul KKPT</p>
              </Col>
              <Col flex={9}>
                {
                  stateKkptDetail.data !== null &&
                  <Form.Item name="judul_kkpt">
                    <TextArea defaultValue={stateKkptDetail.data.kkpt.judul_kkpt} readOnly rows={3} />
                  </Form.Item>
                }
              </Col>
            </Row>
            <Row>
              <Col span={3}>
                <p className="font-mulish font-light text-primary-blue">Temuan Berulang</p>
              </Col>
              <Col span={9}>
                {
                  stateKkptDetail.data !== null &&
                  <Form.Item name="is_temuan_berulang">
                    <Radio.Group defaultValue={temuanBerulang} >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                }


              </Col>
            </Row>

            <Row>
              <Col span={3}>
                <p className="font-mulish font-light text-primary-blue">Tipe Resiko</p>
              </Col>
              <Col span={9}>
                {
                  stateKkptDetail.data !== null &&
                  <Form.Item name="tipeResiko">
                    <Select onChange={onChangeRisk} defaultValue={riskTypeName} >
                      {tipe_resiko.map((item, keyOption) => (
                        <Option key={keyOption} value={`${item.kode}`}>
                          {item.nama}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                }

              </Col>
            </Row>
            <Row>
              <Col span={3}>
                <p className="font-mulish font-light text-primary-blue">Focus Audit</p>
              </Col>
              <Col span={9}>
                {
                  stateKkptDetail.data !== null &&
                  <Form.Item name="focusAudit">
                    <Select onChange={onChangeFocusAudit} defaultValue={auditFocusName} >
                      {focus_audit.map((item, keyOption) => (
                        <Option key={keyOption} value={`${item.kode}`}>
                          {item.nama}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                }

              </Col>
            </Row>
            <Row>
              <Col span={3}>
                <p className="font-mulish font-light text-primary-blue">Produk</p>
              </Col>
              <Col span={8}>
                <Form.Item name="produk">
                  <Select>
                    {produk.map((item) => (
                      <Option key={item.kode} value={item.nama}>
                        {item.nama}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={1}>
                <Button
                  icon={<SaveOutlined style={{ color: "#FFFFFF" }} />}
                  style={{ background: "#6BB669" }}
                  onClick={onProdukSave}
                />
              </Col>
            </Row>
          </div>
          <div className="py-5">
            <TableInfoKkpt data={produkData} onProdukDelete={onProdukDelete} />
          </div>
          <div className="flex flex-row justify-end">
            <Button type="primary" onClick={onFormSave}>
              Save
            </Button>

          </div>
        </Form>
      </Card>
    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateKkptInfoSave: state.kkpt_info_save,
  stateKkptDetail: state.kkpt_detail
});

const mapDispatchToProps = {
  saveInfoKkptTry,
  getResikoType,
  getFocusAudit,
  getProduk
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTInfoKkpt);
