import { GraphQLLoadingState, MutationProps, QueryProps } from './props';
import {useContext, useEffect, useState} from 'react';
import {GraphQLContext} from "./GraphQLContext";

export const useGraphQLClient = () => {
    return useContext(GraphQLContext);
}

export const useQuery = (props: QueryProps) => {
    const client = useContext(GraphQLContext);
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState<GraphQLLoadingState>({
        loading: false,
        data: null,
        error: null,
        client
    });

    const refresh = () => {
        setLoaded(() => {
            setState({
                ...state,
                loading: false,
                data: null,
                error: null,
                client
            })
            return false;
        })
    }

    useEffect(() => {
        if (!loaded && !state.loading) {
            setState({
                ...state,
                loading: true,
                data: null,
                error: null,
            });
            client
                .query(props)
                .then((result) => {
                    setLoaded(() => {
                        setState({
                            ...state,
                            data: result,
                        });
                        return true;
                    });
                })
                .catch((e) => {
                    setLoaded(() => {
                        setState({
                            ...state,
                            error: {
                                message: e.message,
                            },
                        });
                        return true;
                    });
                });
        }
    }, [loaded, state.loading]);

    return {
        ...state,
        refresh
    };
};

export const useMutation = (props: MutationProps) => {
    const client = useContext(GraphQLContext);
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState<GraphQLLoadingState>({
        loading: false,
        data: null,
        error: null,
        client,
    });

    const refresh = () => {
        setLoaded(() => {
            setState({
                ...state,
                loading: false,
                data: null,
                error: null,
                client
            })
            return false;
        })
    }

    useEffect(() => {
        if (!loaded && !state.loading) {
            setState({
                ...state,
                loading: true,
                data: null,
                error: null,
            });
            client
                .mutate(props)
                .then((result) => {
                    setLoaded(() => {
                        setState({
                            ...state,
                            data: result,
                        });
                        return true;
                    });
                })
                .catch((e) => {
                    setLoaded(() => {
                        setState({
                            ...state,
                            error: {
                                message: e.message,
                            },
                        });
                        return true;
                    });
                });
        }
    }, [loaded, state.loading]);

    return {
        ...state,
        refresh
    };
};
