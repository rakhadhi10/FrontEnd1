import { useEffect } from "react";
import EWPLayout from "../../../layouts/EwpLayout";
import { compose } from "redux";
import { memo } from "react";
import { connect } from "react-redux";
import { fetchKkptDetail } from "../../../store/ducks/EWP/Kkpt/kkptdetail/action";

const KkptLayout = ({ title, breadcrumb, children, fetchKkptDetail, kkpt_id, selectedKey }) => {


    useEffect(() => {
        (async () => {
            fetchKkptDetail(kkpt_id)
        })();
    }, [kkpt_id]);

    return (
        <EWPLayout selectedKey={selectedKey} breadcrumb={breadcrumb}>
            {children}
        </EWPLayout>
    );
};


const mapDispatchToProps = {
    fetchKkptDetail
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(KkptLayout);
