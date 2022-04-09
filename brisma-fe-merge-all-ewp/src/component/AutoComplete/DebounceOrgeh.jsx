import { useMemo } from "react";
import { connect } from "react-redux";
import { AutoComplete, Spin } from "antd";
import debounce from "lodash/debounce";
import { getOrgehData, getOrgehError, getOrgehLoading } from "../../store/ducks/search/selectors";
import { searchOrgeh } from "../../store/ducks/search/actions";

export function DebounceOrgeh({
  debounceTimeout = 800,
  fetching,
  error,
  orgeh,
  fetchOrgeh,
  value, // Passed from Form.Item
  onChange, // Passed from Form.Item
  ...props
}) {
  const debounceFetcher = useMemo(() => {
    const loadOptions = (keyword) => {
      if (!keyword || keyword.length < 3) return;
      fetchOrgeh(keyword);
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOrgeh]);

  const handleOnChange = (currVal, option) => {
    if (option.orgeh) onChange({ ...option.orgeh });
    else onChange(currVal);
  };

  const getValue = () => {
    if (typeof value === "object") return `${value.child} - ${value.my_name}`;
    return value;
  };

  const options = orgeh.map((o) => {
    return {
      value: `${o.child} - ${o.my_name}`,
      label: `${o.child} - ${o.my_name}`,
      orgeh: o,
    };
  });

  return (
    <AutoComplete
      value={getValue()}
      onChange={handleOnChange}
      filterOption={false}
      onSearch={debounceFetcher}
      loading={fetching}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      {...props}
    />
  );
}

const mapStateToProps = (state) => ({
  fetching: getOrgehLoading(state),
  error: getOrgehError(state),
  orgeh: getOrgehData(state),
});

const mapDispatchToProps = {
  fetchOrgeh: searchOrgeh,
};

export default connect(mapStateToProps, mapDispatchToProps)(DebounceOrgeh);
