export const resolvers = {
    Query: {
        todo: async (_: any, args: any, context: any) => context.dataSources.todoAPI.getToDo(args.id),
        todos: async (_: any, args: any, context: any) => context.dataSources.todoAPI.getToDos(),
    },
    Mutation: {
        addToDo: async (_: any, args: any, context: any) => context.dataSources.todoAPI.addToDo(args.content),

        updateToDo: async (_: any, args: any, context: any) => context.dataSources.todoAPI.updateToDo(args.id, args.content),

        setToDoStatus: async (_: any, args: any, context: any) => context.dataSources.todoAPI.setToDoStatus(args.id, args.status),

        deleteToDo: async (_: any, args: any, context: any) => context.dataSources.todoAPI.deleteToDo(args.id),
    },
};
