import { connect } from "react-redux";
import { closeComment, reply } from "../../../../../store/ducks/PATDocument/actions";
import CommentSectionReply from "../common/CommentSectionReply";

function CommentSectionReplyNormal(props) {
  return <CommentSectionReply {...props} />
}

const mapDispatchToProps = {
  closeComment: closeComment,
  reply: reply
}

export default connect(null, mapDispatchToProps)(CommentSectionReplyNormal)