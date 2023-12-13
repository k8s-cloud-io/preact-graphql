export class GraphQLClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GraphQLClientError';
    }
}

export class GraphQLOperationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GraphQLOperationError';
    }
}

export class GraphQLParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GraphQLParseError';
    }
}