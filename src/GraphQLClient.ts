import {
    DocumentNode,
    GraphQLClientProps,
    KeyValuePair,
    MutationProps,
    QueryProps,
} from './props';
import crypto from "crypto";
import {GraphQLClientError, GraphQLOperationError} from "./GraphQLError";
import {InMemoryCache} from "./InMemoryCache";

export class GraphQLClient {
    private opts: GraphQLClientProps;
    constructor(props: GraphQLClientProps) {
        this.opts = props;
        if (!props) {
            throw new GraphQLClientError(
                'Unable to instanciate GraphQLClient: missing properties',
            );
        }
    }

    public query = (props: QueryProps): Promise<any> => {
        return this.request(props.query, props.variables, 'query');
    };

    public mutate = (props: MutationProps): Promise<any> => {
        return this.request(props.mutation, props.variables, 'mutation');
    };

    private request(
        document: DocumentNode,
        variables: KeyValuePair,
        requestType: string,
    ): Promise<any> {
        const operationType = document.definitions[0].operation;
        const operationName = document.definitions[0].name.value

        let data = {
            variables: variables || {},
            operationName
        };

        if (requestType === 'query') {
            if (operationType !== 'query') {
                throw new GraphQLOperationError(
                    'Unable to start request: operation must be of type query: ' + operationType,
                );
            }
            data = Object.assign(data, {
                query: document.toString(),
            });
        }

        if (requestType === 'mutation') {
            if (operationType !== 'mutation') {
                throw new GraphQLOperationError(
                    'Unable to start request: operation must be of type mutation',
                );
            }
            data = Object.assign(data, {
                query: document.toString(),
            });
        }

        const requestBody = JSON.stringify(data);
        const md5sum = crypto.createHash('md5');
        const hash = md5sum.update(requestBody, 'utf8').digest('hex');
        if( this.opts.cache.has(hash) ) {
            return this.opts.cache.get(hash);
        }

        return new Promise((resolve, reject) => {
            fetch(this.opts.uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            })
                .then((result) => result.json())
                .then((result) => {
                    const data = result;
                    if( data.data[operationName] ) {
                        this.opts.cache.put(hash, requestBody);
                        resolve(data.data);
                        return;
                    }
                    reject(data.errors[0]);
                })
                .catch((e) => reject(e));
        });
    }
}
