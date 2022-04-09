import { Button, Divider, message } from "antd";
import React from "react";
import { connect } from "react-redux";
import { getUserUkaName } from "../../../../../store/ducks/auth/selectors";
import { setJadwalAudit } from "../../../../../store/ducks/EWP/CreateEWP/actions";
import {
  getErrorPat,
  getSelectedJadwalAudit,
  getTahunPAT,
} from "../../../../../store/ducks/EWP/CreateEWP/selectors";
import AuditedInfo from "./AuditedInfo";
import FilterForm from "./FilterForm";
import TablePat from "./TablePat";
import YearSelect from "./YearSelect";

function PAT({
  error,
  uka,
  tahun,
  selectedJadwalAudit,
  onNext,
  onPrev,
  setJadwalAudit,
}) {
  const handleOnNext = () => {
    const data = { ...selectedJadwalAudit, audit_year: tahun };
    setJadwalAudit(data);
    onNext();
  };

  return (
    <div className="space-y-4">
      {error && message.error(error)}
      <div className="space-y-2">
        <p className="text-2xl text-primary-green">PAT</p>
        <p className="text-xl text-primary-blue">{uka}</p>
        <YearSelect />
      </div>
      <div className="border border-primary-blue rounded p-4 space-y-4">
        <div className="flex">
          <AuditedInfo />
          <Divider
            type="vertical"
            dashed
            className="h-full border-secondary-light-black"
          />
          <FilterForm />
        </div>
        <TablePat />
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={onPrev}>Previous</Button>
        <Button
          type="primary"
          onClick={handleOnNext}
          disabled={selectedJadwalAudit === null}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tahun: getTahunPAT(state),
    error: getErrorPat(state),
    uka: getUserUkaName(state),
    selectedJadwalAudit: getSelectedJadwalAudit(state),
  };
};

const mapDispatchToProps = {
  setJadwalAudit: setJadwalAudit,
};
export default connect(mapStateToProps, mapDispatchToProps)(PAT);
