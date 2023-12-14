import React from "preact";
import {GraphQLClient} from "./GraphQLClient";
import {PropsWithChildren} from "preact/compat";
import {GraphQLContext} from "./GraphQLContext";

type GraphQLProviderProps = {
    client: GraphQLClient
} & PropsWithChildren;
export const GraphQLProvider = (props: GraphQLProviderProps) => {
    return <GraphQLContext.Provider value={props.client}>
        {props.children}
    </GraphQLContext.Provider>;
}