import { useMemo } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { getAuditeeError, getAuditeeLoading, getAuditees } from '../../store/ducks/search/selectors';
import { searchAuditee } from '../../store/ducks/search/actions';

function DebounceAuditee({
  debounceTimeout = 800,
  fetching,
  error,
  auditees,
  fetchAuditees,
  value, // Passed from Form.Item
  onChange, // Passed from Form.Item
  ...props
}) {
  const debounceFetcher = useMemo(() => {
    const loadOptions = (keyword) => {
      if (!keyword || keyword.length < 3) return
      fetchAuditees(keyword)
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchAuditees]);

  const options = auditees.map(auditor => ({
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
  fetching: getAuditeeLoading(state),
  error: getAuditeeError(state),
  auditees: getAuditees(state)
})

const mapDispatchToProps = {
  fetchAuditees: searchAuditee
}

export default connect(mapStateToProps, mapDispatchToProps)(DebounceAuditee)