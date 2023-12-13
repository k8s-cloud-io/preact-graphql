import React from "react";
import {GraphQLClient} from "./GraphQLClient";
import {PropsWithChildren} from "react";
import {GraphQLContext} from "./GraphQLContext";

type GraphQLProviderProps = {
    client: GraphQLClient
} & PropsWithChildren;
export const GraphQLProvider = (props: GraphQLProviderProps) => {
    return <GraphQLContext.Provider value={props.client}>
        {props.children}
    </GraphQLContext.Provider>;
}