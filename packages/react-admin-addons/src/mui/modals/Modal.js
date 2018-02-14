import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import * as modalActions from '../../actions/modalActions';

class Modal extends React.Component {
    render() {
        const { type, showType, showProps, render, ...rest } = this.props;

        return render({
            ...rest,
            open: type === showType,
            options: showProps,
        });
    }
}
Modal.propTypes = {
    type: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    showType: PropTypes.string,
    showProps: PropTypes.object,
};
const defaultModalStateSelector = state => state.admin_addons.modals;

const mapState = (
    state,
    { modalStateSelector = defaultModalStateSelector }
) => ({
    showType: modalStateSelector(state).types[0],
    showProps: modalStateSelector(state).props[0],
});

const enhance = compose(
    connect(mapState, modalActions),
    shouldUpdate((props, nextProps) => props.showType !== nextProps.showType)
);

export default enhance(Modal);
