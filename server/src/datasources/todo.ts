import { DataSource } from 'apollo-datasource';
import { DataTypes } from 'sequelize';
import { getDB } from './utils';

const db = getDB();

export const todos = db.define('todo', {
    content: DataTypes.STRING,
    status: DataTypes.ENUM('DONE', 'PENDING', 'ARCHIVED'),
});

todos.sync();

export class TodoAPI extends DataSource {
    context: any;

    constructor() {
        super();
    }

    initialize(config: any) {
        this.context = config.context;
    }

    async getToDo(id: number) {
        const result = await todos.findAll({ where: { id } });
        return result && result[0] ? result[0] : null;
    }

    async getToDos() {
        const result = await todos.findAll();
        return result;
    }

    async addToDo(content: string) {
        const todo = await todos.create({ content, status: 'PENDING' });
        return todo;
    }

    async updateToDo(id: number, content: string) {
        const todo = await todos.update({ content }, {
            where: { id },
        });
        return todo[0];
    }

    async setToDoStatus(id: number, status: string) {
        const todo = await todos.update({ status }, {
            where: { id },
        });
        return todo[0];
    }

    async deleteToDo(id: number) {
        return todos.destroy({ where: { id } });
    }
}
