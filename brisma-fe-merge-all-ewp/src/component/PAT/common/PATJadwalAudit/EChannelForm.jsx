import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { DatePicker, InputNumber, Form, Spin } from "antd";
import { fetchRefEchannel } from "../../../../store/ducks/reference/actions";
import { getRefEchannel, getRefEchannelError, getRefEchannelLoading } from "../../../../store/ducks/reference/selectors";
import { frontendFormat } from "../../../../utils/momentHelpers";

const validateEchannel = (target, existing) => {
  if (!existing) return Promise.resolve()
  if (existing < target) return Promise.reject("Jumlah target lebih besar dari jumlah existing")
  else return Promise.resolve()
}

const EChannelForm = ({
  echannel,
  loading,
  error,
  fetchRefEchannel,
  initialValue,
  updateEchannel
}) => {

  useEffect(() => fetchRefEchannel(), [fetchRefEchannel])

  const [localEchannel, setLocalEchannel] = useState(initialValue)
  const handleUpdateEchannel = (val) => {
    setLocalEchannel(val)
    updateEchannel(val)
  }

  const echannelPersentase = Object.keys(localEchannel).map(k => ({
    name: k,
    jumlah: localEchannel[k].jumlah_target,
    persen: Math.round(Number(localEchannel[k].jumlah_target) / Number(localEchannel[k].jumlah_existing) * 100) || 0
  }))

  if (loading) return <div><Spin /></div>
  if (error && !loading) return <p>{error}</p>

  return (
    <div>
      <div className="grid grid-cols-4">
        <div className="grid grid-cols-2 gap-x-10">
          {echannelPersentase.map((item) => (
            <div key={item.name} className="grid grid-cols-2">
              <p>{item.name}</p>
              <div className="flex">
                <p className="pr-1">{item.jumlah}</p>
                <p className="px-2 bg-gray-300 rounded-lg">{item.persen}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-primary-blue rounded-xl px-4 py-4 my-4">
        <div className="font-mulish text-gray-700 font-bold">
          <div className="grid grid-cols-4 gap-8 text-center mb-4">
            <p></p>
            <p>Jumlah Existing</p>
            <p>Jumlah Target Audit</p>
            <p>Poisisi Data</p>
          </div>
          <Form
            onValuesChange={(_, val) => handleUpdateEchannel(val)}
            initialValues={initialValue}
          >
            {echannel.map((item) => (
              <div key={item.name} className="grid grid-cols-4 gap-8">
                <p className="text-center">{item.name}</p>
                <Form.Item
                  name={[item.name, "jumlah_existing"]}
                  dependencies={[item.name, "jumlah_target"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const jumlah_target = getFieldValue([item.name, "jumlah_target"])
                        return validateEchannel(jumlah_target, value)
                      },
                    }),
                  ]}
                >
                  <InputNumber type="number" controls={false} className="w-full" />
                </Form.Item>
                <Form.Item
                  name={[item.name, "jumlah_target"]}
                  dependencies={[item.name, "jumlah_existing"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const jumlah_existing = getFieldValue([item.name, "jumlah_existing"])
                        return validateEchannel(value, jumlah_existing)
                      },
                    }),
                  ]}
                >
                  <InputNumber type="number" controls={false} className="w-full" />
                </Form.Item>
                <Form.Item name={[item.name, "posisi_data"]}>
                  <DatePicker showToday format={frontendFormat} className="w-full" />
                </Form.Item>
              </div>
            ))}
          </Form>
        </div>
      </div>
    </div>
  );
};



const mapStateToProps = state => {
  return {
    echannel: getRefEchannel(state),
    loading: getRefEchannelLoading(state),
    error: getRefEchannelError(state),
  }
}

const mapDispatchToProps = {
  fetchRefEchannel: fetchRefEchannel,
}

export default connect(mapStateToProps, mapDispatchToProps)(EChannelForm)