import { SignStream, SignStreamOptions } from './sign-stream';
import { VerifyStream, VerifyStreamOptions } from './verify-stream';

export const ALGORITHMS = [
    'HS256', 'HS384', 'HS512',
    'RS256', 'RS384', 'RS512',
    'PS256', 'PS384', 'PS512',
    'ES256', 'ES384', 'ES512'
];

export type Algorithms = 'HS256'
    | 'HS384'
    | 'HS512'
    | 'RS256'
    | 'RS384'
    | 'RS512'
    | 'PS256'
    | 'PS384'
    | 'PS512'
    | 'ES256'
    | 'ES384'
    | 'ES512'
;

export function createSign(opts: SignStreamOptions) {
    return new SignStream(opts);
}

export function createVerify(opts: VerifyStreamOptions) {
    return new VerifyStream(opts);
}

export { jwsSign as sign } from './jws/sign';
export { verify } from './jws';
export { jwsDecode as decode } from './jws/decode';
export { isValidJws as isValid } from './jws/validation';
