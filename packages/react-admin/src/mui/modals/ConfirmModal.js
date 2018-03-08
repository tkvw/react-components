import React from 'react';
import PropTypes from 'prop-types';

import ConfirmDialog from './ConfirmDialog';

import Modal from './Modal';
import { Responsive } from 'ra-ui-materialui';

class ConfirmModal extends React.Component {
    render() {
        const { type, ...defaultProps } = this.props;
        return (
            <Modal
                type={type}
                render={({ options, open }) => {
                    return (
                        <Responsive
                            small={
                                <ConfirmDialog
                                    fullScreen
                                    {...defaultProps}
                                    {...options}
                                    open={open}
                                />
                            }
                            medium={
                                <ConfirmDialog
                                    {...defaultProps}
                                    {...options}
                                    open={open}
                                />
                            }
                        />
                    );
                }}
            />
        );
    }
}

ConfirmModal.propTypes = {
    allowEscape: PropTypes.bool,
    escapeValue: PropTypes.any,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleArgs: PropTypes.object,
    message: PropTypes.string.isRequired,
    messageArgs: PropTypes.object,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            labelArgs: PropTypes.object,
            value: PropTypes.any,
        })
    ).isRequired,
};

export default ConfirmModal;
