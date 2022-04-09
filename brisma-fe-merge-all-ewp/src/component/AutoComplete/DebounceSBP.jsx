import { useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AutoComplete, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { searchSbp } from '../../store/ducks/search/actions';
import { getSbpError, getSbpLoading, getSbps } from '../../store/ducks/search/selectors';

export function DebounceSBP({
  debounceTimeout = 800,
  fetching,
  error,
  sbps,
  fetchSbps,
  value, // Passed from Form.Item
  onChange, // Passed from Form.Item
  ...props
}) {
  const { pat_id } = useParams()

  const debounceFetcher = useMemo(() => {
    const loadOptions = (keyword) => {
      if (!keyword) return
      fetchSbps(keyword, pat_id)
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchSbps, pat_id]);

  const options = sbps.map(sbp => ({
    value: sbp.nama,
    label: sbp.nama,
    sbp
  }))

  const getValue = () => {
    if (!value) return value
    if (value.pn) return value.nama
    return value.nama
  }

  const handleOnChange = (currVal, option) => {
    if (option.sbp) onChange({ ...value, ...option.sbp })
    else onChange({
      ...value,
      id: undefined,
      nama: currVal
    })
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
  fetching: getSbpLoading(state),
  error: getSbpError(state),
  sbps: getSbps(state)
})

const mapDispatchToProps = {
  fetchSbps: searchSbp
}

export default connect(mapStateToProps, mapDispatchToProps)(DebounceSBP)