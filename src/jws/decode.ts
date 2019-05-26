import { isValidJws } from "./validation";
import { headerFromJws, payloadFromJws, signatureFromJws } from "./parse";
import { Convert } from "../convert";

export interface JwsDecodeOptions {
    json?: boolean;
    encoding?: string;
}

class JwsDecodeError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export function jwsDecode(jwsSig: string | object, opts: JwsDecodeOptions = {}) {
    const sig = Convert.toString(jwsSig);
    if (!isValidJws(sig))
        throw new JwsDecodeError(`Invalid JWS Given: ${sig}`);

    try {
        const header = headerFromJws(sig);
        
        let payload = payloadFromJws(sig, opts.encoding);
        if (header.typ === 'JWT' || opts.json)
            payload = JSON.parse(payload);
    
        const signature = signatureFromJws(sig);

        return { header, payload, signature };
    } catch (err) {
        const errMsg = 'Could not parse header from JWS.\nReason: '
        + err.message || err;
        throw new JwsDecodeError(errMsg);
    }
}
