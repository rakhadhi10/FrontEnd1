import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuditInfoEwp } from "../../../store/ducks/EWP/AuditInfo/actions";
import { getAuditInfo } from "../../../store/ducks/EWP/AuditInfo/selectors";
import TableRealisasiInfoAudit from "./TableRealisasiInfoAudit";
import moment from "moment";

function FormInfoAudit({ infoAudit, getAuditInfoEwp }) {
  const { project_id } = useParams();
  useEffect(() => getAuditInfoEwp(project_id), [getAuditInfoEwp, project_id]);

  const InputBlock = ({ text }) => {
    return (
      <input
        type="text"
        className="bg-gray-800 text-white px-4 py-1 text-sm block"
        autoComplete="off"
        value={text}
        disable
      />
    );
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <p>Project ID</p>
      </Col>
      <Col span={18}>
        <p>{infoAudit.project_id}</p>
      </Col>

      <Col span={6}>
        <p>Nama Project</p>
      </Col>
      <Col span={18}>
        <InputBlock text={infoAudit.nama_project} />
      </Col>

      <Col span={6}>
        <p>Periode Ruang Lingkup</p>
      </Col>
      <Col span={18}>
        <div className="flex justify-start gap-8">
          <InputBlock
            text={moment(infoAudit.ruang_lingkup_start).format("YYYY-MM-DD")}
          />
          s/d
          <InputBlock
            text={moment(infoAudit.ruang_lingkup_end).format("YYYY-MM-DD")}
          />
        </div>
      </Col>

      <Col span={6}>
        <p>Ketua Tim Audit</p>
      </Col>
      <Col span={18}>
        <InputBlock
          disabled
          className="justify-start w-full"
          text={infoAudit.pn_kta + " - " + infoAudit.nama_kta}
        />
      </Col>

      <Col span={6}>
        <p>Realisasi</p>
      </Col>
      <Col span={18}>
        <TableRealisasiInfoAudit />
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    infoAudit: getAuditInfo(state),
  };
};

const mapDispachToProps = {
  getAuditInfoEwp: getAuditInfoEwp,
};

export default connect(mapStateToProps, mapDispachToProps)(FormInfoAudit);
