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
    contexts,
    description,
    ...params
}) => params;
class Searchable extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        contexts: PropTypes.arrayOf(PropTypes.string).isRequired,
        term: PropTypes.string.isRequired,
        description: PropTypes.string,
    };
    componentWillMount() {
        this._registerSearchable(this.props);
    }

    _registerSearchable = ({
        id,
        term,
        contexts,
        description,
        registerSearchable,
        ...rest
    }) => {
        registerSearchable(
            id,
            term,
            contexts,
            description,
            santizeParams(rest)
        );
    };
    _unregisterSearchable = ({ id, unregisterSearchable } = this.props) => {
        unregisterSearchable(id);
    };

    componentWillReceiveProps(nextProps) {
        const { id, contexts, term, description } = this.props;

        if (
            nextProps.id !== id ||
            nextProps.term !== term ||
            nextProps.contexts !== contexts ||
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
