import {DocumentNode} from "./props";
import {GraphQLParseError} from "./GraphQLParseError";
import {GraphQLOperationError} from "./GraphQLOperation";

export const gql = (str: TemplateStringsArray): DocumentNode => {
    const trimmed = str[0].trim();
    let operation: string = null;
    let operationName: string = null;

    if( trimmed.indexOf('{') < 0 ) {
        throw new GraphQLParseError("GraphQLParseError: missing opening brace");
    }

    if( trimmed.indexOf("{") > 0 ) {
        const operationParts = trimmed.substring(0, trimmed.indexOf('{')).trim()
            .match(/(query|mutation|subscription)[\s]+([a-z0-9\_\$\(\)\'\"\:\!\[\]\s]+)/i)

        if( operationParts ) {
            operation = operationParts[1].trim();
            if( operationParts[2].indexOf("(") > 0)
                operationName = operationParts[2].substring(0, operationParts[2].indexOf("(")).trim();
            else
                operationName = operationParts[2].trim();
        }
    }
    else {
        let pos = trimmed.indexOf('{', 1);
        if( pos < 0 ) {
            pos = trimmed.indexOf('}');
        }
        if( pos < 0 ) {
            throw new GraphQLParseError('GraphQLParseError: missing closing brace');
        }

        operation = 'query';
        operationName = trimmed.substring(1, pos).trim();
    }

    if( !['query', 'mutation', 'subscription'].includes(operation) ) {
        throw new GraphQLOperationError(`GraphQLOperationError: Invalid graphql operation '${operation}'`);
    }

    if( !operationName ) {
        throw new GraphQLOperationError(`GraphQLOperationError: operationName must not be empty`);
    }

    if( operationName.indexOf('(') > 0 ) {
        if( operationName.indexOf(')') <= 0 ) {
            throw new GraphQLParseError('GraphQLParseError: missing closing brace');
        }

        const bracePos = operationName.indexOf('(');
        operationName = operationName.substring(0, bracePos);
    }

    return {
        kind: "Document",
        definitions: [
            {
                kind: "OperationDefinition",
                operation,
                name: {
                    kind: "Name",
                    value: operationName
                }
            }
        ],
        toString: () => {
            return str[0]
        }
    }
}
