export class GraphQLParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = GraphQLParseError.constructor.name;
    }
}