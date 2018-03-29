import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import createWithResourceDataField from './withResourceDataField';
import {
    DateField as RaDateField,
    NumberField as RaNumberField,
    BooleanField as RaBooleanField,
    ReferenceManyField as RaReferenceManyField,
    ReferenceField as RaReferenceField,
    ReferenceArrayField as RaReferenceArrayField,
    RichTextField as RaRichTextField,
    TextField as RaTextField,
} from 'ra-ui-materialui';

const withResourceData = createWithResourceDataField({ addLabel: true });
const enhance = compose(defaultProps({ source: 'id' }), withResourceData);

export const DateField = enhance(RaDateField);
export const NumberField = enhance(RaNumberField);
export const BooleanField = enhance(RaBooleanField);
export const ReferenceManyField = enhance(RaReferenceManyField);
export const ReferenceField = enhance(RaReferenceField);
export const ReferenceArrayField = enhance(RaReferenceArrayField);
export const RichTextField = enhance(RaRichTextField);
export const TextField = enhance(RaTextField);
