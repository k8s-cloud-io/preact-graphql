import { GraphQLLoadingState, MutationProps, QueryProps } from './props';
import {useContext, useEffect, useState} from 'preact/compat';
import {GraphQLContext} from "./GraphQLContext";

export const useGraphQLClient = () => {
    return useContext(GraphQLContext);
}

export const useQuery = (props: QueryProps) => {
    const client = useContext(GraphQLContext)
    const [state, setState] = useState<GraphQLLoadingState>({
        loaded: false,
        loading: false,
        data: null,
        error: null,
        client
    });

    const refresh = () => {
        setState({
            ...state,
            loaded: false,
            loading: false,
            data: null,
            error: null,
            client
        })
    }

    useEffect(() => {
        if (!state.loaded && !state.loading) {
            setState({
                ...state,
                loading: true,
                data: null,
                error: null,
            });
            client
                .query(props)
                .then((result: any) => {
                    setState({
                        ...state,
                        loaded: true,
                        loading: false,
                        data: result,
                    });
                })
                .catch((e: any) => {
                    setState({
                        ...state,
                        loaded: true,
                        loading: false,
                        error: {
                            message: e.message,
                        },
                    });
                });
        }
    }, [state.loaded, state.loading]);

    return {
        ...state,
        refresh
    };
};

export const useMutation = (props: MutationProps) => {
    const client = useContext(GraphQLContext);
    const [state, setState] = useState<GraphQLLoadingState>({
        loaded: false,
        loading: false,
        data: null,
        error: null,
        client,
    });

    const refresh = () => {
        setState({
            ...state,
            loaded: false,
            loading: false,
            data: null,
            error: null,
            client
        })
    }

    useEffect(() => {
        if (!state.loaded && !state.loading) {
            setState({
                ...state,
                loaded: false,
                loading: true,
                data: null,
                error: null,
            });
            client
                .mutate(props)
                .then((result: any) => {
                    setState({
                        ...state,
                        loading: false,
                        loaded: true,
                        data: result,
                    });
                })
                .catch((e: any) => {
                    setState({
                        ...state,
                        loaded: true,
                        loading: false,
                        error: {
                            message: e.message,
                        },
                    });
                });
        }
    }, [state.loaded, state.loading]);

    return {
        ...state,
        refresh
    };
};
