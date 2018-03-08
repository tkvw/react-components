const search = '%{';
const regexp = /%{(.*?)}/g;
const replaceWith = '{{$1}}';
const transformRaMessages = messages =>
    Object.keys(messages).reduce((acc, key) => {
        if (typeof acc[key] === 'object') {
            acc[key] = transformRaMessages(acc[key]);
        } else {
            if (acc[key].indexOf(search) !== -1)
                acc[key] = acc[key].replace(regexp, replaceWith);
        }
        return acc;
    }, messages);

export default transformRaMessages;
