import {
    AutocompleteInput as RaAutocompleteInput,
    BooleanInput as RaBooleanInput,
    CheckboxGroupInput as RaCheckboxGroupInput,
    DateInput as RaDateInput,
    DisabledInput as RaDisabledInput,
    FileInput as RaFileInput,
    LongTextInput as RaLongTextInput,
    NullableBooleanInput as RaNullableBooleanInput,
    NumberInput as RaNumberInput,
    RadioButtonGroupInput as RaRadioButtonGroupInput,
    ReferenceArrayInput as RaReferenceArrayInput,
    ReferenceInput as RaReferenceInput,
    SelectArrayInput as RaSelectArrayInput,
    SelectInput as RaSelectInput,
    TextInput as RaTextInput,
} from 'ra-ui-materialui';

import createWithResourceDataInput from './withResourceDataInput';

const withResourceDataInput = createWithResourceDataInput({ addLabel: false });

export {
    default as ImageFileInput,
    ImageFileInputCropperPreview,
    ImageFileInputImagePreview,
    ImageFileInputFileFilter,
} from './ImageFileInput';
export { default as WithResourceData } from './WithResourceData';
export { default as WithResourcesData } from './WithResourcesData';

export const AutocompleteInput = withResourceDataInput(RaAutocompleteInput);
export const BooleanInput = withResourceDataInput(RaBooleanInput);
export const CheckboxGroupInput = withResourceDataInput(RaCheckboxGroupInput);
export const DateInput = withResourceDataInput(RaDateInput);
export const DisabledInput = withResourceDataInput(RaDisabledInput);
export const FileInput = withResourceDataInput(RaFileInput);
export const LongTextInput = withResourceDataInput(RaLongTextInput);
export const NullableBooleanInput = withResourceDataInput(
    RaNullableBooleanInput
);
export const NumberInput = withResourceDataInput(RaNumberInput);
export const RadioButtonGroupInput = withResourceDataInput(
    RaRadioButtonGroupInput
);
export const ReferenceArrayInput = withResourceDataInput(RaReferenceArrayInput);
export const ReferenceInput = withResourceDataInput(RaReferenceInput);
export const SelectArrayInput = withResourceDataInput(RaSelectArrayInput);
export const SelectInput = withResourceDataInput(RaSelectInput);
export const TextInput = withResourceDataInput(RaTextInput);
