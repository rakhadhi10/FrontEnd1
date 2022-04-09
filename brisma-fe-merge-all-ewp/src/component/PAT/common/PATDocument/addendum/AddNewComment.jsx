import { connect } from "react-redux";
import { addNewComment } from "../../../../../store/ducks/AddendumPATDocument/actions";
import AddNewComment from "../common/AddNewComment";

function AddNewCommentNormal(props) {
  return <AddNewComment {...props} />
}

const mapDispatchToProps = {
  addNewComment: addNewComment
}

export default connect(null, mapDispatchToProps)(AddNewCommentNormal)