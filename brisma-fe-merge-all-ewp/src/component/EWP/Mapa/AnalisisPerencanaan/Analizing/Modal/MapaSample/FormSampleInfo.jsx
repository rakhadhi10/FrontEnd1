import {
  Button,
  DatePicker,
  Input,
  Form,
  Select,
  message,
  Skeleton,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMapaSample,
  fetchTeknikSample,
  submitMapaSample,
} from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import {
  getDataMapaSample,
  getDataTeknikSample,
  getErrorMapaSample,
  getErrorTeknikSample,
  getLoadingMapaSample,
  getLoadingTeknikSample,
  getSubmitMapaSampleError,
  getSubmitMapaSampleLoading,
} from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";

const { Option } = Select;

function FormSampleInfo({
  data,
  loading,
  error,
  dataTeknikSample,
  loadingTeknikSample,
  errorTeknikSample,
  submitLoading,
  submitError,
  fetchMapaSample,
  fetchTeknikSample,
  submitMapaSample,
  mcr_id,
}) {
  const [form] = Form.useForm();
  const { project_id } = useParams();
  const [teknikSample, setteknikSample] = useState([]);
  const [selectedTeknikSample, setselectedTeknikSample] = useState({});

  useEffect(() => fetchTeknikSample(), [fetchTeknikSample]);
  useEffect(
    () => fetchMapaSample(project_id, mcr_id),
    [fetchMapaSample, project_id, mcr_id]
  );
  useEffect(() => setteknikSample(dataTeknikSample), [dataTeknikSample]);
  useEffect(
    () =>
      data &&
      form.setFieldsValue({
        ...data,
        sample_periode_start: data.sample_periode_start
          ? moment(data.sample_periode_start)
          : "",
        sample_periode_end: data.sample_periode_end
          ? moment(data.sample_periode_end)
          : "",
      }),
    [data]
  );

  const selectOnChange = (value) => {
    setselectedTeknikSample({
      sample_ref_teknik_sampling_kode: value.key,
      sample_ref_teknik_sampling_name: value.value,
    });
  };

  const onSave = async () => {
    const formdata = form.getFieldsValue();
    const body = {
      ...formdata,
      ...selectedTeknikSample,
      mapa_uker_mcr_id: mcr_id,
    };
    const failed = await submitMapaSample(project_id, body);
    if (!failed) {
      message.success("Berhasil menyimpan mapa sample info!");
    } else {
      message.error("gagal menyimpan mapa sample infp. ERROR: " + failed);
    }
  };

  return (
    <div className="border border-primary-blue rounded-lg p-6 space-y-4">
      {loading && loadingTeknikSample && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton.Input active />
            <Skeleton.Input active />
            <Skeleton.Input active />
          </div>
          <div>
            <Skeleton.Input active />
            <Skeleton.Input active />
            <Skeleton.Input active />
          </div>
        </div>
      )}
      {error && message.error(error)}
      {errorTeknikSample && message.error(errorTeknikSample)}
      {!loading && !loadingTeknikSample && (
        <Form form={form}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex space-x-4 items-center">
              <p className="w-3/12">Sumber Info</p>
              <Form.Item name="sample_sumber_info" className="w-9/12">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4 items-center">
              <p className="w-3/12">Jumlah Populasi</p>
              <Form.Item name="sample_jumlah_populasi" className="w-9/12">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4 items-center">
              <p className="w-3/12">Periode</p>
              <div className="w-9/12 flex justify-between space-x-3">
                <Form.Item name="sample_periode_start">
                  <DatePicker />
                </Form.Item>
                <Form.Item name="sample_periode_end">
                  <DatePicker />
                </Form.Item>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <p className="w-3/12">Jumlah Sample</p>
              <Form.Item name="sample_jumlah_sample" className="w-9/12">
                <Input />
              </Form.Item>
            </div>
            <div className="flex space-x-4 items-center">
              <p className="w-3/12">Teknik Sampling</p>
              <Select
                name="sample_teknik_sample"
                placeholder="Pilih Teknik Sample"
                onChange={selectOnChange}
                labelInValue
                defaultValue={data && data.sample_ref_teknik_sampling_name}
              >
                {teknikSample.map((item) => (
                  <Option key={item.kode} value={item.name}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex space-x-4 items-center">
              <p className="w-3/12">Uraian Sample</p>
              <Form.Item name="sample_uraian" className="w-9/12">
                <Input.TextArea cols={2} />
              </Form.Item>
            </div>
          </div>
          <div>
            <Button type="primary" onClick={onSave} loading={submitLoading}>
              Simpan
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataMapaSample(state),
    loading: getLoadingMapaSample(state),
    error: getErrorMapaSample(state),
    dataTeknikSample: getDataTeknikSample(state),
    loadingTeknikSample: getLoadingTeknikSample(state),
    errorTeknikSample: getErrorTeknikSample(state),
    submitLoading: getSubmitMapaSampleLoading(state),
    submitError: getSubmitMapaSampleError(state),
  };
};

const mapDispatchToProps = {
  fetchMapaSample: fetchMapaSample,
  fetchTeknikSample: fetchTeknikSample,
  submitMapaSample: submitMapaSample,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSampleInfo);
