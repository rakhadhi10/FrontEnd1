import { Button, Tabs } from "antd";
import { connect } from "react-redux";

const { TabPane } = Tabs;

export const ObjekAudit = ({ next, prev, unitKerjaTab, echannelTab, canGoNext, updateEchannel }) => {
  return (
    <>
      <Tabs defaultActiveKey={1} centered>
        <TabPane tab="Unit Kerja" key="1">
          {unitKerjaTab}
        </TabPane>
        <TabPane tab="E-Channel" key="2">
          {echannelTab}
        </TabPane>
      </Tabs>
      <div className="mt-8 flex justify-between items-center">
        <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
        <div className="flex flex-row justify-end gap-4">
          <Button
            disabled={false}
            onClick={prev}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canGoNext}
            onClick={next}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const rows = ownProps.getSpecialTematikRows(state)

  const echannels = ownProps.getEchannels(state)
  const echannelsValid = Object.values(echannels).every(e => {
    if (!e.jumlah_existing) return true
    if (e.jumlah_existing >= e.jumlah_target) return true
    else return false
  })

  const canGoNext = rows.length !== 0 && echannelsValid

  return { canGoNext }
}

export default connect(mapStateToProps)(ObjekAudit)