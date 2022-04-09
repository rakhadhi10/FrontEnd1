import PropTypes from "prop-types";
import { Avatar, Button, Input, Form, message } from "antd";
import { connect } from "react-redux";
import { getUserName, getUserPN } from "../../../../store/ducks/auth/selectors";
import {
  getErrorSubmitKomen,
  getLoadingSubmitKomen,
} from "../../../../store/ducks/EWP/Mapa/Dokumen/selectors";
import {
  fetchKomenMapaDokumen,
  submitKomenMapaDokumen,
} from "../../../../store/ducks/EWP/Mapa/Dokumen/actions";
import { useParams } from "react-router-dom";

function Reply({
  onClose,
  pn,
  name,
  bab_id,
  parent_id,
  loadingSubmit,
  errorSubmit,
  submitKomen,
  fetchKomen,
}) {
  const { project_id } = useParams();

  const onSubmit = async (comment) => {
    const body = {
      ref_bab_mapa_id: bab_id,
      deskripsi: comment,
      parent_comment_id: parent_id,
    };
    const failed = await submitKomen(project_id, body);
    if (!failed) {
      message.success("Komentar berhasil ditambahkan");
      fetchKomen(project_id, bab_id);
      onClose();
    } else {
      message.error(failed);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar alt="My Avatar" />
          <p className="font-semibold">{pn + " - " + name}</p>
        </div>
      </div>
      <div className="pt-4">
        <Form>
          <Form.Item name="comment">
            <Input.TextArea rows={4} />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Form.Item noStyle>
              <Button htmlType="submit" onClick={onClose}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const comment = getFieldValue("comment");
                return (
                  <Button
                    htmlType="submit"
                    type="primary"
                    onClick={() => onSubmit(comment)}
                    disabled={!comment}
                    loading={loadingSubmit}
                  >
                    Kirim Komentar
                  </Button>
                );
              }}
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pn: getUserPN(state),
    name: getUserName(state),
    loadingSubmit: getLoadingSubmitKomen(state),
    errorSubmit: getErrorSubmitKomen(state),
  };
};

const mapDispatchToProps = {
  submitKomen: submitKomenMapaDokumen,
  fetchKomen: fetchKomenMapaDokumen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reply);
