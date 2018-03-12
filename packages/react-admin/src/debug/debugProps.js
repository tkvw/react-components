import React from 'react';
export default ({ name }) => Component => {
    const WithDebug = props => {
        console.log('>>>>> ', name, props);
        return <Component {...props} />;
    };
    return WithDebug;
};
