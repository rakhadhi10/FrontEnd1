import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMapaDokumen } from "../../../../store/ducks/EWP/Mapa/Dokumen/actions";
import {
  getDataBab,
  getError,
  getLoading,
} from "../../../../store/ducks/EWP/Mapa/Dokumen/selectors";

function BaseContentViewer({ data, loading, error, fetchMapaDokumen, params, template }) {
  const { project_id } = useParams();
  const [dataContent, setdataContent] = useState();

  useEffect(() => fetchMapaDokumen(project_id, params), [params]);
  useEffect(() => {
    template && data && !loading ? setdataContent(template(data)) : setdataContent(data);
  }, [data]);
  console.log(data);

  return (
    <div>
      <iframe
        title="Dokumen"
        srcDoc={dataContent ? dataContent : ""}
        style={{ minHeight: 690 }}
        className="w-full h-full"
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    data: getDataBab(state),
  };
};

const mapDispatchToProps = {
  fetchMapaDokumen: fetchMapaDokumen,
};
export default connect(mapStateToProps, mapDispatchToProps)(BaseContentViewer);
