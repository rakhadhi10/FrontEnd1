import { useMemo } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { getAuditorError, getAuditorLoading, getAuditors } from '../../store/ducks/search/selectors';
import { searchAuditors } from '../../store/ducks/search/actions';

export function DebounceAuditor({
  debounceTimeout = 800,
  fetching,
  error,
  auditors,
  fetchAuditors,
  value, // Passed from Form.Item
  onChange, // Passed from Form.Item
  ...props
}) {
  const debounceFetcher = useMemo(() => {
    const loadOptions = (keyword) => {
      if (!keyword || keyword.length < 3) return
      fetchAuditors(keyword)
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchAuditors]);

  const options = auditors.map(auditor => ({
    value: `${auditor.pn} - ${auditor.nama}`,
    label: `${auditor.pn} - ${auditor.nama}`,
    auditor
  }))

  const getValue = () => {
    if (!value) return value
    if (value.pn) return `${value.pn} - ${value.nama}`
    return value.nama
  }

  const handleOnChange = (currVal, option) => {
    if (option.auditor) onChange({ ...option.auditor })
    else onChange(currVal)
  }

  return (
    <AutoComplete
      filterOption={false}
      onSearch={debounceFetcher}
      onChange={handleOnChange}
      value={getValue()}
      loading={fetching}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      {...props}
    />
  );
}

const mapStateToProps = state => ({
  fetching: getAuditorLoading(state),
  error: getAuditorError(state),
  auditors: getAuditors(state)
})

const mapDispatchToProps = {
  fetchAuditors: searchAuditors
}

export default connect(mapStateToProps, mapDispatchToProps)(DebounceAuditor)