import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@tkvw/react-admin';
import shallowEqual from 'recompose/shallowEqual';
import memoizeOne from 'memoize-one';

const empty = 'RA/EMPTY';

class I18nProps extends React.Component {
    static propTypes = {
        i18nProps: PropTypes.arrayOf(PropTypes.string),
        render: PropTypes.func,
        resource: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        translate: PropTypes.func,
    };
    componentWillMount() {
        this.i18nProps = memoizeOne(
            ({
                i18nProps=[],
                record,
                resource,
                source,
                locale,
                translate,
                ...props
            }) => {
                return i18nProps.reduce((acc, item) => {
                    acc[item] = translate(
                        props[item] ||
                            `resources.${resource}.fields.${source}_${item}`,
                        {
                            _: props[item] || empty,
                            record,
                        }
                    );
                    if (acc[item] === empty) delete acc[item];
                    return acc;
                }, {});
            },
            shallowEqual
        );
    }

    render() {
        const { render, ...props } = this.props;

        return render(props.i18nProps ? this.i18nProps(props) : undefined);
    }
}
export default translate(I18nProps);
