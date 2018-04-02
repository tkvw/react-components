import { createContext } from 'react-broadcast';

const defaultValue = {};
const { Broadcast, Subscriber } = createContext(defaultValue);

export {
    Broadcast as ResourceDataProducer,
    Subscriber as ResourceDataConsumer,
};
