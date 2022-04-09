import { compose } from 'redux';
import { memo } from 'react';
import { connect } from 'react-redux';

const DaftarIsi = () => {
    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam soluta eaque, adipisci, aut quasi, necessitatibus labore facere totam sed nesciunt incidunt praesentium fuga temporibus! Corporis alias eius minus tempora iste.
        </div>
    )
}


const mapStateToProps = (state) => ({
    state_kkpa_list: state.kkpa_list,
    state_kkpa_info: state.kkpa_info
});




const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(DaftarIsi)


