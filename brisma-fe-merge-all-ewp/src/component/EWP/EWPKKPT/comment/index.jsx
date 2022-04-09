import { CommentOutlined, CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Drawer, Button, Collapse } from "antd";
import { Fragment, useState } from "react";
import { Avatar, Typography, Input } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { memo } from "react";
import moment from "moment"
import { saveComment, closeComment } from "../../../../store/ducks/EWP/Kkpt/kkptcomment/action";

const { TextArea } = Input;
const { Panel } = Collapse;

const CommentKkpt = ({ state_comment, sendComment, closeComment, idkkpt }) => {
  const [visible, setVisible] = useState(false);
  const [newcomment, setNewComment] = useState(false);
  const [newChildcomment, setNewChildComment] = useState(false);
  const [newParentcomment, setNewParentComment] = useState(false);
  const [valueChildcomment, setValueChildComment] = useState("");
  const [keyCollapse, setCollapse] = useState(1)
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const newData = {
    parent_comment_id: null,
    kkpt_id: idkkpt,
    ref_bab_kkpt_id: state_comment.id_bab,
    deskripsi: valueChildcomment,
  };

  const sendChildComment = (data, type) => {
    setNewParentComment(false);
    setNewChildComment(false);
    const dataComment = {
      parent_comment_id: type === "child" ? data.parent_comment_id : data.id,
      kkpt_id: data.kkpt_id,
      ref_bab_kkpt_id: data.ref_bab_kkpt_id,
      deskripsi: valueChildcomment,
    };

    sendComment(type === "newData" ? newData : dataComment);
    setValueChildComment("");
    setNewComment(false);
  };

  const closeChildComment = (idchild, kkpa_id, bab) => {
    closeComment(idchild, kkpa_id, bab);
  };

  const newCommentAction = () => {
    if (newcomment) {
      setNewComment(false);
    } else {
      setNewComment(true);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-end mb-3 ">
        <div className="bg-primary-yellow h-9 w-10 flex items-center px-2 rounded-3xl">
          <CommentOutlined onClick={showDrawer} style={{ fontSize: "28px", color: "#06537a" }} />
        </div>
      </div>
      <Drawer
        title={
          <div className="flex flex-wrap justify-between">
            Comments
            <div className="flex gap-4">
              <FolderAddOutlined
                className="text-lg cursor-pointer hover:text-blue-700"
                onClick={() => newCommentAction()}
              />
              <CloseOutlined
                className="text-primary-red text-lg cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
        }
        placement={"right"}
        width={500}
        onClose={onClose}
        visible={visible}
      >

        {newcomment ? (
          <div className="mb-10">
            <TextArea
              onChange={(e) => setValueChildComment(e.target.value)}
              rows={4}
              className="mb-5"
            />
            <div className="flex gap-5">
              <Button
                onClick={() => sendChildComment(newData, "newData")}
                className="bg-white"
                size="small"
              >
                Kirim Komentar
              </Button>
            </div>
          </div>
        ) : null}
        {state_comment.data.map((value, key) => {
          return (
            <Collapse
              ghost
              style={{ border: "1px solid black", borderRadius: "0.5rem" }}
              expandIconPosition="right"
              bordered accordion={true} key={key} >
              <Panel header={`${key + 1}. ${value.deskripsi}`} key={key + 1}>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar alt="My Avatar" />
                      <p className="font-semibold text-xs">
                        {value.create_by.pn} - {value.create_by.name}
                      </p>
                    </div>
                    <p>
                      <Typography.Text type="secondary">{moment(value.created_at).format('LLL')}</Typography.Text>
                    </p>
                  </div>
                  <div className="pt-2 mb-5">{value.deskripsi}</div>

                  {newParentcomment ? (
                    value.is_closed !== true ? (
                      <TextArea
                        onChange={(e) => setValueChildComment(e.target.value)}
                        rows={4}
                        className="mb-5"
                      />
                    ) : null
                  ) : null}
                  {value.is_closed !== true ? (
                    newParentcomment ? (
                      <div className="flex gap-5">
                        <Button
                          onClick={() => sendChildComment(value, "parent")}
                          className="bg-white"
                          size="small"
                        >
                          Kirim Komentar
                        </Button>
                        <Button
                          onClick={() =>
                            closeChildComment(value.id, value.kkpa_id, value.ref_bab_kkpa_id)
                          }
                          className="bg-blue-700 text-white"
                          size="small"
                        >
                          Tandai Sudah Selesai
                        </Button>
                      </div>
                    ) : value.child_comment.length > 0 ? null :
                      (
                        <div className="flex gap-5">
                          <Button
                            onClick={() => setNewParentComment(true)}
                            className="bg-white"
                            size="small"
                          >
                            Tambah Komentar
                          </Button>
                          <Button
                            onClick={() =>
                              closeChildComment(value.id, value.kkpa_id, value.ref_bab_kkpa_id)
                            }
                            className="bg-blue-700 text-white"
                            size="small"
                          >
                            Tandai Sudah Selesai
                          </Button>
                        </div>
                      )
                  ) : (
                    <p className=" text-md font-bold">Komentar ditandai selesai</p>
                  )}

                  {value.child_comment.map((valueChild, keyChild) => {
                    return (
                      <div key={keyChild}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar alt="My Avatar" />
                            <p className="font-semibold text-xs">
                              {valueChild.create_by.pn} - {valueChild.create_by.name}
                            </p>
                          </div>
                          <p>

                            <Typography.Text type="secondary">{moment(valueChild.created_at).format('LLL')}</Typography.Text>
                          </p>
                        </div>
                        <div className="pt-2 mb-5">{valueChild.deskripsi}</div>
                        {
                          value.child_comment.length - 1 === keyChild ?
                            newChildcomment ? (
                              valueChild.is_closed !== true ? (
                                <TextArea
                                  onChange={(e) => setValueChildComment(e.target.value)}
                                  rows={4}
                                  className="mb-5"
                                />
                              ) : null
                            ) : null
                            : null
                        }
                        {
                          value.child_comment.length - 1 === keyChild ?
                            valueChild.is_closed !== true ? (
                              newChildcomment ? (
                                <div className="flex gap-5">
                                  <Button
                                    onClick={() => sendChildComment(valueChild, "child")}
                                    className="bg-white"
                                    size="small"
                                  >
                                    Kirim Komentar
                                  </Button>
                                  <Button
                                    onClick={() => setNewChildComment(false)}
                                    className="bg-blue-700 text-white"
                                    size="small"
                                  >
                                    Batal
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex gap-5">
                                  <Button
                                    onClick={() => setNewChildComment(true)}
                                    className="bg-white"
                                    size="small"
                                  >
                                    Tambah Komentar
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      closeChildComment(
                                        valueChild.id,
                                        valueChild.kkpa_id,
                                        valueChild.ref_bab_kkpa_id
                                      )
                                    }
                                    className="bg-blue-700 text-white"
                                    size="small"
                                  >
                                    Tandai Sudah Selesai
                                  </Button>
                                </div>
                              )
                            ) : (
                              <p className=" text-md font-bold">Komentar ditandai selesai</p>
                            )
                            :
                            null
                        }
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </Collapse>

          );
        })}
      </Drawer>
    </Fragment >
  );
};

const mapStateToProps = (state) => ({
  state_comment: state.kkpt_comment
});

const mapDispatchToProps = {
  sendComment: saveComment,
  closeComment,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CommentKkpt);
