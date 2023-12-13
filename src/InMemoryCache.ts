import { CacheInterface } from './CacheInterface';
import { KeyValuePair } from './props';

export class InMemoryCache implements CacheInterface {
    private static instance: InMemoryCache;
    private static cache: KeyValuePair;

    public constructor() {
        if (!InMemoryCache.instance) {
            InMemoryCache.instance = this;
        }
    }

    public static getInstance = () => {
        return InMemoryCache.instance;
    };

    public put(key: string, value: any) {
        InMemoryCache.cache[key] = value;
    }

    public get = (key: string): any => {
        return InMemoryCache.cache[key];
    };
}
