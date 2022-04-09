import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingAuth from "../../../component/LoadingAuth";
import { getUserPN } from "../../../store/ducks/auth/selectors";
import { currentProject } from "../../../store/ducks/EWP/CreateEWP/actions";
import {
  getCurrentTimAudit,
  getCurrentProjectLoading,
} from "../../../store/ducks/EWP/CreateEWP/selectors";
import { setPosisi } from "../../../store/ducks/EWP/Mapa/Dashboard/actions";

export default function withMapaStatus(WrappedComponent) {
  const MapaStatus = ({ currentProject, tim_audit, pn, setPosisi, loading, ...rest }) => {
    const { project_id } = useParams();
    useEffect(() => currentProject(project_id), [currentProject, project_id]);
    if (tim_audit) {
      console.log(tim_audit);
      if (tim_audit.ma.pn == pn) {
        setPosisi("ma");
        return <WrappedComponent {...rest} />;
      } else if (tim_audit.kta.pn == pn) {
        console.log(pn);
        setPosisi("kta");
        return <WrappedComponent {...rest} />;
      } else {
        const ata = tim_audit.ata.some((item) => item.pn == pn);
        if (ata) {
          setPosisi("ata");
          return <WrappedComponent {...rest} />;
        } else {
          setPosisi("other");
          return <WrappedComponent {...rest} />;
        }
      }
    }
    return <LoadingAuth text="Check Mapa Status" />;
  };

  const mapStateToProps = (state) => {
    return {
      tim_audit: getCurrentTimAudit(state),
      pn: getUserPN(state),
      loading: getCurrentProjectLoading(state),
    };
  };
  const mapDispatchToProps = {
    setPosisi: setPosisi,
    currentProject: currentProject,
  };

  return connect(mapStateToProps, mapDispatchToProps)(MapaStatus);
}
