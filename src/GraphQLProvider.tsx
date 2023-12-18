import React, {createContext, PropsWithChildren} from "react";
import {GraphQLClient} from "./GraphQLClient";
import {MutationProps, QueryProps} from "./props";

type GraphQLProviderProps = {
    client: GraphQLClient
} & PropsWithChildren;

export const GraphQLContext = createContext<{
    query: (props: QueryProps) => Promise<any>,
    mutate: (props: MutationProps) => Promise<any>
}>(null);

export const GraphQLProvider = (props: GraphQLProviderProps) => {
    return <GraphQLContext.Provider value={props.client}>
        {props.children}
    </GraphQLContext.Provider>;
}