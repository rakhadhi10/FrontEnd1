import { Button, Tabs } from "antd";
import { connect } from "react-redux";

const { TabPane } = Tabs;

const ObjekAudit = ({
  next,
  prev,
  unitKerjaTab,
  echannelTab,
  canGoNext,
  getRows,
  getSpecialTematikRows,
  getEchannel,
  getSelectedTipeAudit
}) => {
  return (
    <>
      <Tabs defaultActiveKey={1} centered>
        <TabPane tab="Unit Kerja" key="1">
          {unitKerjaTab}
          {/* <UnitKerjaTab /> */}
        </TabPane>
        <TabPane tab="E-Channel" key="2">
          {echannelTab}
          {/* <EChannel updateEchannel={updateEchannel} getEchannels={getEchannels} /> */}
        </TabPane>
      </Tabs>
      <div className="mt-8 flex justify-between items-center">
        <p className="font-semibold">
          Mohon isi semua data sebelum ke tahap selanjutnya
        </p>
        <div className="flex flex-row justify-end gap-4">
          <Button disabled={false} onClick={prev}>
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

const mapDispatchToProps = null

const mapStateToProps = (state, ownProps) => {
  const selectedTipeAudit = ownProps.getSelectedTipeAudit(state);
  let canGoNext;
  if (selectedTipeAudit === "REG") {
    const rows = ownProps.getRows(state);
    const emptyRows = rows.length === 0;
    const unfilledOrgeh = rows.some((r) => {
      return typeof r.orgeh !== "object" || !r.orgeh;
    });
    canGoNext = !emptyRows && !unfilledOrgeh;
  } else if (selectedTipeAudit === "SA" || selectedTipeAudit === "TMT") {
    const rows = ownProps.getSpecialTematikRows(state);
    const emptyRows = rows.length === 0;
    canGoNext = !emptyRows;
  }

  const echannels = ownProps.getEchannels(state);
  const echannelsValid = Object.values(echannels).every((e) => {
    if (!e.jumlah_existing) return true;
    if (e.jumlah_existing >= e.jumlah_target) return true;
    else return false;
  });

  canGoNext = canGoNext && echannelsValid;

  return { canGoNext };
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjekAudit);
