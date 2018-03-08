import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerSearchable, unregisterSearchable } from './actions';

const santizeParams = ({
    children,
    registerSearchable,
    unregisterSearchable,
    id,
    term,
    description,
    ...params
}) => params;
class Searchable extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        term: PropTypes.string.isRequired,
        description: PropTypes.string,
    };
    componentWillMount() {
        this._registerSearchable();
    }

    _registerSearchable = ({ id, term, description, ...rest } = this.props) => {
        registerSearchable(id, term, description, santizeParams(rest));
    };
    _unregisterSearchable = ({ id, unregisterSearchable } = this.props) => {
        unregisterSearchable(id);
    };

    componentWillReceiveProps(nextProps) {
        const { id, term, description } = this.props;

        if (
            nextProps.id !== id ||
            nextProps.term !== term ||
            nextProps.description !== description
        ) {
            this._registerSearchable(nextProps);
        }
    }
    componentWillUnmount() {
        this._unregisterSearchable();
    }

    render() {
        const { children } = this.props;
        return children ? { children } : null;
    }
}

export default connect(null, { registerSearchable, unregisterSearchable })(
    Searchable
);
