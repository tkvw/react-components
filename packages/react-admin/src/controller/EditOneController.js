import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';
import { reset } from 'redux-form';
import { startUndoable, translate } from 'ra-core';
import { crudGetSingle, crudUpdateSingle } from '../actions';

export class EditOneController extends Component {
    componentDidMount() {
        this.updateData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { version } = this.props;
        if (nextProps.version !== version) {
            this.props.resetForm(this.getForm());
            this.updateData(nextProps);
        }
    }

    getForm = () => this.props.form || `${this.props.resource}-form`;

    getBasePath() {
        const { location } = this.props;
        return location
            ? location.pathname
                  .split('/')
                  .slice(0, -1)
                  .join('/')
            : '';
    }

    defaultRedirectRoute() {
        return 'edit';
    }

    updateData({ crudGetSingle, path, postOnly, resource }) {
        if (!postOnly) crudGetSingle(resource, path, this.getBasePath());
    }

    save = (data, redirect, form) => {
        const {
            undoable,
            record,
            resource,
            path,
            startUndoable,
            dispatchCrudUpdateSingle,
        } = this.props;
        return undoable
            ? startUndoable(
                  crudUpdateSingle(
                      resource,
                      data,
                      record,
                      redirect,
                      form,
                      path,
                      this.getBasePath()
                  )
              )
            : dispatchCrudUpdateSingle(
                  resource,
                  data,
                  record,
                  redirect,
                  form,
                  path,
                  this.getBasePath()
              );
    };

    render() {
        const {
            children,
            record,
            isLoading,
            resource,
            path,
            translate,
            version,
        } = this.props;

        if (!children) return null;

        const basePath = this.getBasePath();

        const defaultTitle = translate(`resources.${resource}.title`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });

        return children({
            isLoading,
            defaultTitle,
            save: this.save,
            resource,
            form: this.getForm(),
            path,
            basePath,
            record,
            redirect: this.defaultRedirectRoute(),
            translate,
            version,
        });
    }
}

EditOneController.propTypes = {
    children: PropTypes.func.isRequired,
    crudGetSingle: PropTypes.func,
    dispatchCrudUpdateSingle: PropTypes.func,
    form: PropTypes.string,
    record: PropTypes.object,
    hasShow: PropTypes.bool,
    hasList: PropTypes.bool,
    isLoading: PropTypes.bool,
    location: PropTypes.object,
    match: PropTypes.object,
    path: PropTypes.string,
    postOnly: PropTypes.bool,
    resetForm: PropTypes.func,
    resource: PropTypes.string,
    startUndoable: PropTypes.func,
    title: PropTypes.any,
    translate: PropTypes.func,
    undoable: PropTypes.bool,
    version: PropTypes.number,
};

function mapStateToProps(state, props) {
    return {
        record: state.addons.resources[props.resource]
            ? state.addons.resources[props.resource].data
            : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}

export default compose(
    connect(mapStateToProps, {
        crudGetSingle,
        dispatchCrudUpdateSingle: crudUpdateSingle,
        startUndoable,
        resetForm: reset,
    }),
    translate
)(EditOneController);
