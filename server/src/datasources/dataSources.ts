import { TodoAPI } from './todo';

const dataSources = () => ({
    todoAPI: new TodoAPI(),
});

export default dataSources;
