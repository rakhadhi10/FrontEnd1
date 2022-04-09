import { connect } from 'react-redux';
import { AutoComplete, Spin } from 'antd';
import { getTimAudit, getTimAuditError, getTimAuditLoading } from '../../store/ducks/RPMNegosiasi/selectors';

function AnggotaTim({
  debounceTimeout = 800,
  fetching,
  error,
  auditors,
  value, // Passed from Form.Item
  onChange, // Passed from Form.Item
  ...props
}) {
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
      onChange={handleOnChange}
      value={getValue()}
      loading={fetching}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      {...props}
    />
  );
}

const mapStateToProps = state => ({
  fetching: getTimAuditLoading(state),
  error: getTimAuditError(state),
  auditors: getTimAudit(state)
})

export default connect(mapStateToProps)(AnggotaTim)