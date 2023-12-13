import { CacheInterface } from './CacheInterface';
import { KeyValuePair } from './props';

export class InMemoryCache implements CacheInterface {
    private static cache: KeyValuePair;

    public constructor() {
        InMemoryCache.cache = {}
    }

    public put(key: string, value: any) {
        InMemoryCache.cache[key] = {
            value,
            timestamp: new Date().getTime()
        }
    }

    public get = (key: string): any => {
        if(!this.isValid(key)) return null;
        return InMemoryCache.cache[key].value;
    };

    public has = (key: string): boolean => {
        return this.isValid(key);
    }

    public isValid = (key: string): boolean => {
        let value = InMemoryCache.cache[key] || undefined;
        const currentTimestamp = new Date().getTime();
        if( value && value.timestamp + 5000 <= currentTimestamp ) {
            delete InMemoryCache.cache[key];
            value = undefined;
        }
        return value && value.timestamp + 5000 > currentTimestamp;
    }
}
