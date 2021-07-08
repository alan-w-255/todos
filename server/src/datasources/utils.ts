import { Sequelize } from 'sequelize';

export const getDB = (() => {
    let DB : Sequelize;
    return () => {
        if (!DB) {
            DB = new Sequelize({
                dialect: 'sqlite',
                storage: './store.sqlite',
            });
        }
        return DB;
    };
})();
