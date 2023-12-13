import { CacheInterface } from './CacheInterface';
import { GraphQLClient } from './GraphQLClient';

export type KeyValuePair = {
    [key: string]: any;
}

export interface NameNode {
    kind: string;
    value: string
}

export interface DefinitionNode {
    kind: string
    operation: string // TODO change to enum
    name: NameNode
}
export interface DocumentNode {
    kind: string;
    definitions: Array<DefinitionNode>;
    toString: () => string;
}
export type GraphQLClientProps = {
    uri: string;
    cache: CacheInterface;
};

export type QueryProps = {
    query: DocumentNode;
    variables?: KeyValuePair;
};

export type MutationProps = {
    mutation: DocumentNode;
    variables?: KeyValuePair;
};

export type GraphQLLoadingState = {
    loading: boolean;
    error: any;
    data: any;
    client: GraphQLClient;
};
