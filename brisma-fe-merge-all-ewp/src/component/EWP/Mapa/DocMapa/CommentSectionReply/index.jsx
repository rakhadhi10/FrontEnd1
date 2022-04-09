import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Collapse, message, Space } from "antd";
import Reply from "../Reply";
import Comment from "../Comment";
import "./CommentSectionReply.css";
import moment from "moment";
import { getLoadingSubmitCloseKomen } from "../../../../../store/ducks/EWP/Mapa/Dokumen/selectors";
import {
  fetchKomenMapaDokumen,
  submitCloseKomenMapaDokumen,
} from "../../../../../store/ducks/EWP/Mapa/Dokumen/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function CommentSectionReply({ dataComments, bab_id, loadingClose, submitClose, fetchKomen }) {
  const [editing, setEditing] = useState(false);
  const { project_id } = useParams();
  console.log(dataComments);
  return (
    <Collapse
      expandIconPosition="right"
      bordered
      ghost
      activeKey={dataComments.id}
      style={{ border: "1px solid black", borderRadius: "0.5rem" }}
    >
      <Collapse.Panel
        header={
          <span className="font-semibold">
            {dataComments.create_by.pn + " - " + dataComments.create_by.fullName}
          </span>
        }
        key={dataComments.id}
        className="w-full rounded-lg"
        id="custom"
        style={{ backgroundColor: dataComments.is_closed && "#EBEBEB" }}
      >
        <Space
          direction="vertical"
          className="w-full"
          split={<div className="border-b border-gray-400" />}
        >
          <Comment
            nama={dataComments.create_by.pn + " - " + dataComments.create_by.fullName}
            waktu={moment().format("HH:mm")}
            komentar={dataComments.deskripsi}
          />
          {dataComments.child_comment.map((item) => {
            return (
              <Comment
                nama={item.create_by.pn + " - " + item.create_by.fullName}
                waktu={moment().format("HH:mm")}
                komentar={item.deskripsi}
              />
            );
          })}
          {editing && !dataComments.is_closed && (
            <Reply bab_id={bab_id} parent_id={dataComments.id} onClose={() => setEditing(false)} />
          )}
          {!editing && !dataComments.is_closed && (
            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditing(true)}>Tambah Komentar</Button>
              <Button
                key={dataComments.id}
                type="primary"
                onClick={async () => {
                  const failed = await submitClose(project_id, dataComments.id);
                  if (!failed) {
                    message.success("berhasil menutup komen");
                    fetchKomen(project_id, bab_id);
                  } else {
                    message.error(failed);
                  }
                }}
              >
                Tandai Sudah Selesai
              </Button>
            </div>
          )}
        </Space>
        {dataComments.is_closed && (
          <p className="font-semibold text-center italic">Komentar ditandai Selesai</p>
        )}
      </Collapse.Panel>
    </Collapse>
  );
}

const mapStateToProps = (state) => {
  return {
    loadingClose: getLoadingSubmitCloseKomen(state),
  };
};

const mapDispatchToProps = {
  submitClose: submitCloseKomenMapaDokumen,
  fetchKomen: fetchKomenMapaDokumen,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentSectionReply);
