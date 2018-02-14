import flattenObject from './flattenObject';

export default (object, options) => {
    const data = flattenObject(object, options);
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
};
