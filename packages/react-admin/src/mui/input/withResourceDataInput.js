import compose from 'recompose/compose';
import { withResourceData } from '../../data/index';
import { labeledField } from '../layout';

export default options =>
    compose(
        withResourceData({
            includeProps: ['record', 'resource'],
        }),
        labeledField(options)
    );
