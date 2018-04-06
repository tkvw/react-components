import React from 'react';
import FormInput from './FormInput';

export default Component => {
    const FormInputHoc = ({ children, ...props }) => (
        <FormInput {...props}>
            <Component>{children}</Component>
        </FormInput>
    );
    return FormInputHoc;
};
