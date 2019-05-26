import { Convert } from "../convert";
import { signatureFromJws, securedInputFromJws } from "./parse";
import jwa from 'jwa';

export function jwsVerify(
    jwsSig: string | object,
    algorithm: string,
    secretOrKey: string
) {
    if (!algorithm) {
        const err = new Error("Missing algorithm parameter for jws.verify");
        err.name = "MISSING_ALGORITHM";
        throw err;
    }
    jwsSig = Convert.toString(jwsSig);
    const signature = signatureFromJws(jwsSig);
    const securedInput = securedInputFromJws(jwsSig);
    const algo = jwa(algorithm);
    return algo.verify(securedInput, signature, secretOrKey);
}
