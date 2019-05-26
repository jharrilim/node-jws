import { headerFromJws } from './parse';

const JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

export function isValidJws(input: string) {
    return JWS_REGEX.test(input) && !!headerFromJws(input);
}
