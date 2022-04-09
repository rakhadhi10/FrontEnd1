import { UserOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { memo } from 'react';
import { connect } from 'react-redux';

const CardInfoKkpa = ({ info_kkpa }) => {
    return (
        <div className="shadow-lg  bg-white px-5   rounded-xl">
            <div className="flex md:flex-row lg:flex-row flex-col place-items-center divide-x-2 divide-primary-gray  p-3">
                <div className="text-lg font-bold text-primary-blue p-5 ">Info KKPA</div>
                <div className="flex flex-col px-5 space-y-1">
                    <div className="text-sm text-secondary-light-black w-full">
                        [ {info_kkpa && info_kkpa.kkpa.auditor.posisi} ] {info_kkpa && info_kkpa.kkpa.auditor.pn} {info_kkpa && info_kkpa.kkpa.auditor.name}
                    </div>
                    <div className="text-sm text-secondary-light-black">
                        {info_kkpa && info_kkpa.risk_issue.kode} - {info_kkpa && info_kkpa.risk_issue.name}
                    </div>
                    <div className="text-sm text-secondary-light-black">
                        {info_kkpa && info_kkpa.sub_major.kode} - {info_kkpa && info_kkpa.sub_major.name}
                    </div>
                    <div className="text-sm text-secondary-light-black">
                        {info_kkpa && info_kkpa.sub_aktivitas.name}
                    </div>
                    <div className="text-sm text-secondary-light-black">
                        {info_kkpa && info_kkpa.aktivitas.name}
                    </div>
                    <div className="text-sm text-secondary-light-black">
                        {info_kkpa && info_kkpa.uker.name}
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <div className={`bg-secondary-light-green px-1 py-1 rounded-3xl text-xs`} >
                            {info_kkpa && info_kkpa.kkpa.status_persetujuan_kkpa.name}
                        </div>

                    </div>

                </div>
            </div>


        </div>
    )
}

const mapStateToProps = (state) => ({
    info_kkpa: state.kkpa_info.info_kkpa
});


const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CardInfoKkpa)


