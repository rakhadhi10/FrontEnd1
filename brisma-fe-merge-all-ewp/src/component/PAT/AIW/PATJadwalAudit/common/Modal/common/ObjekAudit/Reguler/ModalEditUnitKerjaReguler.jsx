import { Button, Modal, Spin } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCode } from "../../../../../../../../../api/utils";
import { searchBranchChildren } from "../../../../../../../../../store/ducks/search/actions";
import { getBranchChildrenLoading } from "../../../../../../../../../store/ducks/search/selectors";

export function ModalEditUnitKerjaReguler({
  editUnitKerjaTable,
  regulerModalVisible,
  ukerInduk,
  loading,
  closeRegulerModal,
  fetchBranchChildren
}) {
  useEffect(() => {
    if (regulerModalVisible) fetchBranchChildren(getCode(ukerInduk.branch.branch))
  }, [fetchBranchChildren, regulerModalVisible, ukerInduk])

  return (
    <Modal
      visible={regulerModalVisible}
      width="1000px"
      centered
      maskClosable={false}
      destroyOnClose
      onCancel={closeRegulerModal}
      footer={null}
      title={null}
    >
      {loading && <div><Spin /></div>}
      {!loading &&
        <>
          {/* <Form
          initialValues={{ uker_induk: { orgeh: undefined, branch: undefined } }}
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="flex gap-4 col-span-2">
              <Form.Item
                name="uker_induk"
                className="w-full m-0"
              >
                <DebounceOrgehBranch>
                  {(inputOrgeh, inputBranch) => (
                    <div className="flex gap-4">
                      {inputOrgeh}
                      {inputBranch}
                    </div>
                  )}
                </DebounceOrgehBranch>
              </Form.Item>
            </div>
            <div className="flex gap-4 items-center">
              <Form.Item noStyle shouldUpdate>
                {({ getFieldsValue }) => {
                  const { uker_induk: { orgeh, branch } } = getFieldsValue(true)
                  const canSearch = orgeh !== "" && branch !== ""
                  return (
                    <Button
                      disabled={!canSearch}
                    >
                      Search
                    </Button>
                  )
                }}
              </Form.Item>
              <Form.Item noStyle shouldUpdate>
                <p className="float-right text-sm underline cursor-pointer">
                  <Typography.Text type="secondary">Reset Filter</Typography.Text>
                </p>
              </Form.Item>
            </div>
          </div>
        </Form> */}
          {editUnitKerjaTable}
          <div className="flex flex-row justify-end gap-4">
            <Button
              type="primary"
              htmlType="submit"
              disabled={false}
              onClick={closeRegulerModal}
            >
              Simpan
            </Button>
          </div>
        </>
      }
    </Modal>
  );
}

const mapDispatchToProps = {
  fetchBranchChildren: searchBranchChildren
}

const mapStateToProps = state => ({
  loading: getBranchChildrenLoading(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUnitKerjaReguler)