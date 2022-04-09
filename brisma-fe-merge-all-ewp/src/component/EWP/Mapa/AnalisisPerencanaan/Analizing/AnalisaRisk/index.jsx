import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Typography, message } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import BreadCrumbAnalisaRiskComponent from "./BreadCrumbAnalisaRiskComponent";
import TableAnalisaRiskComponent from "./TableAnalisaRiskComponent";
import {
  getAnalisaRiskData,
  getAnalisaRiskError,
  getAnalisaRiskLoading,
  getSubmitAnalisaRiskError,
  getSubmitAnalisaRiskLoading,
} from "../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import {
  fetchAnalisaRisk,
  submitAnalisaRisk,
} from "../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function AnalisaRisk({
  kode,
  aktivitas_kode,
  level,
  uker,
  uker_id,
  onBack,
  data,
  loading,
  error,
  fetchAnalisaRisk,
  submitAnalisaRisk,
  loadingSubmit,
  errorSubmit,
}) {
  const [subAktivitasKode, setsubAktivitasKode] = useState("");
  const [dataAnalisisRisk, setdataAnalisisRisk] = useState([]);
  const { project_id } = useParams();

  useEffect(
    () => subAktivitasKode && fetchAnalisaRisk(project_id, subAktivitasKode),
    [fetchAnalisaRisk, subAktivitasKode, project_id]
  );

  useEffect(() => setdataAnalisisRisk(data), [data]);

  useEffect(() => {
    if (level === 3) {
      setsubAktivitasKode(`${kode}`);
    }
  }, [level, kode]);

  const handleOnChange = (e) => {
    setsubAktivitasKode(`${e}`);
  };

  const onUpdateAnalisaRisk = async (body) => {
    const newBody = {
      ...body,
      sub_aktivitas_kode: subAktivitasKode,
      aktivitas_kode: aktivitas_kode,
    };
    const status = await submitAnalisaRisk(project_id, newBody);
    console.log(status);
    if (status === "success") {
      fetchAnalisaRisk(project_id, subAktivitasKode);
    } else {
      message.error("Gagal mengupdate Analisa Risk!");
    }
  };

  const onCloseModal = async () => {
    await fetchAnalisaRisk(project_id, subAktivitasKode);
  };

  return (
    <>
      <div className="flex ">
        <Button
          type="text"
          size="large"
          icon={<ArrowLeftOutlined onClick={onBack} />}
        />
        <Typography.Title level={2}>Set Risk Issue</Typography.Title>
      </div>
      <Card>
        <div className="space-y-4">
          <BreadCrumbAnalisaRiskComponent
            kode={kode}
            level={level}
            uker={uker}
            handleOnChange={handleOnChange}
          />
          {error && message.error("Error: " + error)}
          <TableAnalisaRiskComponent
            dataAnalisa={dataAnalisisRisk}
            uker_id={uker_id}
            loading={loading}
            updateAnalisaRisk={onUpdateAnalisaRisk}
            key={subAktivitasKode}
            onCloseModal={onCloseModal}
          />
        </div>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: getAnalisaRiskData(state),
  loading: getAnalisaRiskLoading(state),
  error: getAnalisaRiskError(state),
  errorSubmit: getSubmitAnalisaRiskError(state),
  loadingSubmit: getSubmitAnalisaRiskLoading(state),
});

const mapDispachToProps = {
  fetchAnalisaRisk: fetchAnalisaRisk,
  submitAnalisaRisk: submitAnalisaRisk,
};

export default connect(mapStateToProps, mapDispachToProps)(AnalisaRisk);
