import { useMemo } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { getBranchError, getBranches, getBranchLoading } from '../../store/ducks/search/selectors';
import { searchBranches } from '../../store/ducks/search/actions';

export function DebounceBranch({
  debounceTimeout = 800,
  fetching,
  error,
  branches,
  fetchBranches,
  value, // Passed from Form.Item
  onChange, // Passed from Form.Item
  ...props
}) {
  const debounceFetcher = useMemo(() => {
    const loadOptions = (keyword) => {
      if (!keyword || keyword.length < 1) return
      fetchBranches(keyword)
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchBranches]);

  const options = branches.map(branch => ({
    value: `${branch.branch} - ${branch.brdesc}`,
    label: `${branch.branch} - ${branch.brdesc}`,
  }))

  return (
    <AutoComplete
      filterOption={false}
      onSearch={debounceFetcher}
      loading={fetching}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      {...props}
    />
  );
}

const mapStateToProps = state => ({
  fetching: getBranchLoading(state),
  error: getBranchError(state),
  branches: getBranches(state)
})

const mapDispatchToProps = {
  fetchBranches: searchBranches
}

export default connect(mapStateToProps, mapDispatchToProps)(DebounceBranch)