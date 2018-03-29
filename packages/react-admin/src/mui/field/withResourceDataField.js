import compose from 'recompose/compose';
import { withResourceData } from '../../data/index';
import { labeledField } from '../layout';

export default options =>
    compose(
        withResourceData({
            includeProps: ['basePath', 'record', 'resource'],
        }),
        labeledField(options)
    );
