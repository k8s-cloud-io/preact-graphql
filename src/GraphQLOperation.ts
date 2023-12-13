export class GraphQLOperationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = GraphQLOperationError.constructor.name;
    }
}