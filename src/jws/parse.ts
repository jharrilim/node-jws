import { Header } from "./header";


export function headerFromJws(jwsSig: string): Header {
    const encodedHeader = jwsSig.split('.', 1)[0];
    const b = Buffer.from(encodedHeader, 'base64').toString('binary');
    return JSON.parse(b);
}

export function securedInputFromJws(jwsSig: string) {
    return jwsSig.split('.', 2).join('.');
}

export function payloadFromJws(jwsSig: string, encoding: string = 'utf8') {
    const payload = jwsSig.split('.')[1];
    return Buffer.from(payload, 'base64').toString(encoding);
}

export function signatureFromJws(jwsSig: string) {
    return jwsSig.split('.')[2];
}
