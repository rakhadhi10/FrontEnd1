import { Button, message, Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMapaSamplePenugasan,
  submitAuditorPenugasan,
} from "../../../../../store/ducks/EWP/Mapa/Penugasan/actions";
import {
  getDataMapaSample,
  getErrorMapaSample,
  getErrorSubmitAuditor,
  getLoadingMapaSample,
  getLoadingSubmitAuditor,
} from "../../../../../store/ducks/EWP/Mapa/Penugasan/selectors";
import SelectAuditor from "../../../common/SelectAuditor";
import { CSVTab } from "./CSVTab";
import { FileTab } from "./FileTab";
import { FRDTab } from "./FRDTab";
import { MonberTab } from "./MonberTab";

function SetAuditorModal({
  data,
  loading,
  error,
  fetchMapaSamplePenugasan,
  submitAuditorPenugasan,
  loadingSubmit,
  errorSubmit,
  mcr_id,
}) {
  const [dataSample, setdataSample] = useState({
    file: [],
    csv: [],
    frd: [],
    monber: [],
  });
  const [show, setshow] = useState(false);
  const [auditorTemp, setauditorTemp] = useState();
  const [selectedId, setselectedId] = useState([]);

  useEffect(() => {
    fetchMapaSamplePenugasan(mcr_id);
    setdataSample({ file: [], csv: [], frd: [], monber: [] });
    setshow(true);
  }, [fetchMapaSamplePenugasan, mcr_id]);
  useEffect(() => setdataSample(data), [data]);

  const handleOnChange = (e) => {
    setauditorTemp({ pn: e.key, nama: e.value });
  };

  const onSet = async () => {
    let body = [];
    selectedId.map((item) =>
      body.push({
        id: item,
        pn_auditor: auditorTemp.pn,
        name_auditor: auditorTemp.nama,
      })
    );
    console.log(body);
    const failed = await submitAuditorPenugasan(body);
    if (!failed) {
      message.success("Berhasil Menyimpan Auditor");
      fetchMapaSamplePenugasan(mcr_id);
      setselectedId([]);
    } else {
      message.error("Gagal menyimpan auditor. ERROR: " + failed);
    }
  };

  const onSelectData = (key) => {
    console.log(key);
    const index = selectedId.findIndex((e) => e === key);
    if (index < 0) {
      setselectedId((prev) => [...prev, key]);
    }
  };

  return (
    <div className="space-y-4">
      {error && message.error(error)}
      <div className="items-center border-2 rounded-md border-blue-300 mb-5 bg-white">
        <div className="flex flex-row gap-3 p-8">
          <div className="">
            <Typography.Title level={4}>Auditor</Typography.Title>
          </div>
          <div className="w-full">
            <SelectAuditor onChange={handleOnChange} />
          </div>
          <div>
            <Button type="primary" onClick={onSet} loading={loadingSubmit}>
              Set Selected Sample
            </Button>
          </div>
        </div>
      </div>
      <Tabs type="card">
        <Tabs.TabPane tab="CSV" key={1}>
          <div className="border border-primary-blue rounded-lg p-6">
            {show && (
              <CSVTab
                data={dataSample.csv}
                loading={loading}
                onSelectData={onSelectData}
              />
            )}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="File" key={2}>
          <div className="border border-primary-blue rounded-lg p-6">
            <FileTab
              data={dataSample.file}
              onSelectData={onSelectData}
              loading={loading}
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Monber" key={3}>
          <div className="border border-primary-blue rounded-lg p-6">
            <MonberTab
              data={dataSample.monber}
              onSelectData={onSelectData}
              loading={loading}
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="FRD" key={4}>
          <div className="border border-primary-blue rounded-lg p-6">
            <FRDTab
              data={dataSample.frd}
              onSelectData={onSelectData}
              loading={loading}
            />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataMapaSample(state),
    loading: getLoadingMapaSample(state),
    error: getErrorMapaSample(state),
    loadingSubmit: getLoadingSubmitAuditor(state),
    errorSubmit: getErrorSubmitAuditor(state),
  };
};

const mapDispatchToProps = {
  fetchMapaSamplePenugasan: fetchMapaSamplePenugasan,
  submitAuditorPenugasan: submitAuditorPenugasan,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetAuditorModal);
