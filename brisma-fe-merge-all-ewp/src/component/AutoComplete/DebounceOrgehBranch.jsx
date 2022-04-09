import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { getBranchError, getBranches, getBranchLoading, getBranchMap, getOrgeh, getOrgehBranchError, getOrgehBranchLoading } from '../../store/ducks/search/selectors';
import { searchBranches, searchOrgehBranch, setBranches } from '../../store/ducks/search/actions';

export function DebounceOrgehBranch({
  debounceTimeout = 500,
  disabled = false,
  children,

  branchFetching,
  branchError,
  branches,
  fetchBranches,
  setBranches,

  branchMap,

  orgehFetching,
  orgehError,
  orgeh,
  fetchOrgeh,

  value = {
    orgeh: undefined,
    branch: undefined
  }, // Passed from Form.Item
  onChange, // Passed from Form.Item
}) {
  const [openBranch, setOpenBranch] = useState(false)

  const updateBranchOptions = (orgeh) => {
    const branches = branchMap[orgeh]
    if (branches) {
      setBranches(branches)
    } else {
      setBranches([])
    }
  }

  const handleSelectOrgeh = (_, option) => {
    setOpenBranch(true)
    updateBranchOptions(option.orgeh.child)
  }

  const debounceFetchOrgeh = useMemo(() => {
    const loadOrgehOptions = async (keyword) => {
      if (!keyword || keyword.length < 3) return
      await fetchOrgeh(keyword)
    };
    return debounce(loadOrgehOptions, debounceTimeout);
  }, [debounceTimeout, fetchOrgeh]);

  const debounceFetchBranch = useMemo(() => {
    const loadBranchOptions = async (keyword) => {
      if (!keyword || keyword.length < 1) return
      setOpenBranch(true)
      await fetchBranches(keyword)
    };
    return debounce(loadBranchOptions, debounceTimeout);
  }, [debounceTimeout, fetchBranches]);

  const handleSelectBranch = () => {
    setOpenBranch(false)
  }

  const handleOnChangeOrgeh = (val, opt) => {
    if (opt.orgeh) onChange({ ...value, orgeh: { ...opt.orgeh } })
    else onChange({ ...value, orgeh: val });
  };

  const handleOnChangeBranch = (val, opt) => {
    if (opt.branch) onChange({ ...value, branch: { ...opt.branch } })
    else onChange({ ...value, branch: val });
  }

  const getOrgehValue = () => {
    if (typeof value.orgeh === "object") {
      return `${value.orgeh.child} - ${value.orgeh.my_name}`
    }
    return value.orgeh
  }

  const orgehOptions = orgeh.map(item => ({
    value: `${item.child} - ${item.my_name}`,
    label: `${item.child} - ${item.my_name}`,
    orgeh: item
  }))

  const inputOrgeh =
    <AutoComplete
      placeholder="Ketik Kode/Nama Orgeh"
      value={getOrgehValue()}
      disabled={disabled}
      loading={orgehFetching}
      options={orgehOptions}
      notFoundContent={orgehFetching ? <Spin size="small" /> : null}
      onSelect={handleSelectOrgeh}
      onSearch={debounceFetchOrgeh}
      onChange={handleOnChangeOrgeh}
    />

  const getBranchValue = () => {
    if (typeof value.branch === "object") {
      return `${value.branch.branch} - ${value.branch.brdesc}`
    }
    return value.branch
  }

  const branchOptions = branches.map((d) => ({
    value: `${d.branch} - ${d.brdesc}`,
    label: `${d.branch} - ${d.brdesc}`,
    branch: d
  }));

  const inputBranch =
    <AutoComplete
      placeholder="Ketik Kode/Nama Branch"
      value={getBranchValue()}
      disabled={disabled}
      loading={branchFetching}
      open={openBranch}
      options={branchOptions}
      notFoundContent={branchFetching ? <Spin size="small" /> : null}
      onBlur={() => setOpenBranch(false)}
      onSelect={handleSelectBranch}
      onSearch={debounceFetchBranch}
      onChange={handleOnChangeBranch}
    />

  return children(inputOrgeh, inputBranch)
}

const mapStateToProps = state => ({
  branchFetching: getBranchLoading(state),
  branchError: getBranchError(state),
  branchMap: getBranchMap(state),
  branches: getBranches(state),
  orgehFetching: getOrgehBranchLoading(state),
  orgehError: getOrgehBranchError(state),
  orgeh: getOrgeh(state)
})

const mapDispatchToProps = {
  fetchBranches: searchBranches,
  setBranches: setBranches,
  fetchOrgeh: searchOrgehBranch
}

export default connect(mapStateToProps, mapDispatchToProps)(DebounceOrgehBranch)