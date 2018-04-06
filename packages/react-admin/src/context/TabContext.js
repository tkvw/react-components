import { createContext } from 'react-broadcast';

const defaultValue = () => {};
const { Provider, Consumer } = createContext(defaultValue);

export { Provider as TabProvider, Consumer as TabConsumer };
