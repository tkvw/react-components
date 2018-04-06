import React from 'react';
import I18nProps from './I18nProps';

export default defaultProps => Component => {
    const I18nPropsHoc = props => (
        <I18nProps
            {...defaultProps}
            {...props}
            render={i18nProps => <Component {...props} {...i18nProps} />}
        />
    );

    return I18nPropsHoc;
};
