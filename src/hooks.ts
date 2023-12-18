import { GraphQLLoadingState, MutationProps, QueryProps } from './props';
import {useCallback, useContext, useEffect, useState} from 'react';
import {GraphQLContext} from ".";

export const useGraphQLClient = () => {
    return useContext(GraphQLContext);
}

export const useQuery = (props: QueryProps) => {
    const client = useGraphQLClient();
    const [state, setState] = useState<GraphQLLoadingState>({
        loaded: false,
        loading: true,
        data: null,
        error: null
    });

    const refresh = useCallback(() => {
        setState({
            loaded: false,
            loading: true,
            data: null,
            error: null,
        })
    }, []);

    useEffect(() => {
        if( state.loaded ) return;
            client
            .query(props)
            .then((result: any) => {
                setState({
                    loaded: true,
                    loading: false,
                    data: result,
                    error: null
                });
            })
            .catch((e: any) => {
                setState({
                    loaded: true,
                    loading: false,
                    data: null,
                    error: {
                        message: e.message,
                    },
                });
            });
    }, [state.loaded, state.loading]);

    return {
        ...state,
        client,
        refresh
    };
};

export const useMutation = (props: MutationProps) => {
    const client = useGraphQLClient();
    const [state, setState] = useState<GraphQLLoadingState>({
        loaded: false,
        loading: true,
        data: null,
        error: null
    });

    const refresh = useCallback(() => {
        setState({
            loaded: false,
            loading: true,
            data: null,
            error: null,
        })
    }, []);

    useEffect(() => {
        if( state.loaded ) return;
            client
                .mutate(props)
                .then((result: any) => {
                    setState({
                        loading: false,
                        loaded: true,
                        data: result,
                        error: null
                    });
                })
                .catch((e: any) => {
                    setState({
                        loaded: true,
                        loading: false,
                        data: null,
                        error: {
                            message: e.message,
                        },
                    });
                });
    }, [state.loaded, state.loading]);

    return {
        ...state,
        client,
        refresh
    }
};
