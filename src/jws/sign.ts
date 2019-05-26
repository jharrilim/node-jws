import { Convert } from "../convert";
import { Buffer } from 'safe-buffer';
import jwa from 'jwa';

function base64url(buffer: Buffer) {
    return buffer
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export function jwsSecuredInput(header: string, payload: string, encoding: string = 'utf8') {
    const encodedHeader = base64url(Convert.toBuffer(header));
    const encodedPayload = base64url(Convert.toBuffer(payload, encoding));
    return `${encodedHeader}.${encodedPayload}`;
}

export interface JwtSignOptions {
    header: any;
    payload: string;
    secret?: string;
    privateKey?: string;
    encoding: string;
    
    
}

export function jwsSign({ header, payload, encoding, secret, privateKey }: JwtSignOptions) {
    const algo = jwa(header.alg);
    const securedInput = jwsSecuredInput(header, payload, encoding);
    const secretOrKey = secret || privateKey;
    const sig = algo.sign(securedInput, secretOrKey);
    return `${securedInput}.${sig}`;
}
