import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { translate } from 'react-admin';
import { crudCustom } from '../../actions';

class Custom extends Component {
    getBasePath() {
        const { location } = this.props;
        return location.pathname
            .split('/')
            .slice(0, -1)
            .join('/');
    }
    defaultRedirectRoute() {
        const { hasShow, hasEdit } = this.props;
        if (hasEdit) return 'edit';
        if (hasShow) return 'show';
        return 'list';
    }

    save = (record, redirect, dispatch, { form }) => {
        this.props.crudCustom({
            data: record,
            form,
            resource: this.props.resource,
            init: {
                ...this.props.defaultInit,
                ...this.props.init,
            },
            target: this.props.target,
            basePath: this.getBasePath(),
            redirect,
            dispatch,
        });
        return false;
    }
        

    render() {
        const { children, resource, translate } = this.props;

        if (!children) return null;
        const basePath = this.getBasePath();

        return React.cloneElement(children, {
            save: this.save,
            resource,
            basePath,
            record: {},
            translate,
            redirect:
                typeof children.props.redirect === 'undefined'
                    ? this.defaultRedirectRoute()
                    : children.props.redirect,
        });
    }
}

Custom.propTypes = {
    target: PropTypes.string,
    actions: PropTypes.element,
    children: PropTypes.element,
    crudCustom: PropTypes.func,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    onAction: PropTypes.func,
    handleSave: PropTypes.func,
    hasList: PropTypes.bool,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    actionProperties: PropTypes.object,
    defaultInit: PropTypes.object,
    init: PropTypes.shape({
        method: PropTypes.oneOf(['POST', 'GET', 'PUT']),
    }),
};

Custom.defaultProps = {
    data: {},
    defaultInit: {
        method: 'POST',
    },
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

const enhance = compose(connect(mapStateToProps, { crudCustom }), translate);

export default enhance(Custom);
