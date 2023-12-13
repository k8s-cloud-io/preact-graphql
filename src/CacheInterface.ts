export interface CacheInterface {
    put: (key: string, value: any) => void;
    get: (key: string) => any;
    has: (key: string) => boolean;
}
