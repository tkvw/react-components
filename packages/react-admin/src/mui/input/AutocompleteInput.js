import React from 'react';
import { AutocompleteInput as RaAutocompleteInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const AutocompleteInput = props => (
    <ResourceInput {...props}>
        <RaAutocompleteInput />
    </ResourceInput>
);
export default AutocompleteInput;
