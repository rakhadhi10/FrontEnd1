import { CheckCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function CardInformation({ listDataSource, title, status }) {
    const info = useSelector((state) => state.kkpa_info)

    return (
        <div className="p-5 border rounded-xl border-primary-blue">
            <div className="flex flex-row justify-between">
                <p className="md:text-xl lg:text-xl text-xs font-medium">{title}</p>
                <CheckCircleOutlined className="text-primary-blue" />
            </div>
            {
                status === "ruang-lingkup" ?
                    (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                            {
                                listDataSource.map((value, key) => (
                                    <div key={key}>
                                        <div className="flex flex-row">
                                            <span className='text-primary-blue w-40'>{value.title}</span>
                                            <span className='text-left w-80'>{value.ket}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : status === "sample" ?
                        (
                            <div className="bg-secondary-gray mt-5 p-4">
                                <div
                                    dangerouslySetInnerHTML={{ __html: info.kkpa_info && info.kkpa_info.program_audit }}
                                />

                            </div>
                        ) :
                        (
                            null
                        )
            }
        </div>
    )
}

CardInformation.propTypes = {
    listDataSource: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        ket: PropTypes.any
    })
    ),
    status: PropTypes.string,
    title: PropTypes.string
}

CardInformation.defaultProps = {
    listDataSource: [{
        title: 'masukan title',
        ket: 'Masukan Keterangan'
    }],
    status: "ruang-lingkup | sample",
    title: ""
}

