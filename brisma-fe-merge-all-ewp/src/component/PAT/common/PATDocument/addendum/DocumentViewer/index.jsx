import { useState } from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import CommentDrawer from "../../common/CommentDrawer";
import { getComments } from "../../../../../../store/ducks/AddendumPATDocument/selectors";
import AddNewComment from "../AddNewComment";
import CommentSectionReply from "../CommentSectionReply";
import AddendumDoc from "./AddendumDoc";

export default function DocumentViewer() {
  const [commentVisible, setCommentVisible] = useState(false)
  const handleOnClickCommentButton = () => setCommentVisible(!commentVisible);

  return (
    <section className="mt-8 pb-4">
      <div
        className="relative bg-white border border-primary-blue rounded-lg p-4 overflow-x-hidden"
        style={{ height: 800 }}
      >
        <div className="absolute right-8 top-8">
          <Button
            size="large"
            shape="circle"
            style={{ backgroundColor: "#E8B912" }}
            icon={<MessageOutlined className="text-2xl" />}
            onClick={handleOnClickCommentButton}
          />
        </div>
        <div className="mt-16">
          <AddendumDoc />
        </div>
        <CommentDrawer
          visible={commentVisible}
          onClickClose={() => setCommentVisible(false)}
          getComments={getComments}
          addNewComment={AddNewComment}
          commentSectionReply={CommentSectionReply}
        />
      </div>
    </section>
  )
}