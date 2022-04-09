import { Modal } from "antd";

export default function confirmDelete(
  title = "Delete",
  content = "Are you sure you want to delete this item?",
  onOk = () => null,
  onCancel = () => null
){
  return () =>
		Modal.confirm({
			title: <p className="text-center text-primary-red text-lg">{title}</p>,
			content: content,
			icon: null,
			centered: true,
			okText: "Delete",
			okType: "danger",
			async onOk() { await onOk() } ,
			onCancel() {
				onCancel();
			},
		});
}