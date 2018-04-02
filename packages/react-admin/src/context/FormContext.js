import { createContext } from 'react-broadcast';

const defaultValue = {};
const { Broadcast, Subscriber } = createContext(defaultValue);

export { Broadcast as FormDataProducer, Subscriber as FormDataConsumer };
