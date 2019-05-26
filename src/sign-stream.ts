import { DataStream } from './data-stream';
import { Stream } from 'stream';
import { jwsSign } from './jws/sign';

export interface SignStreamOptions {
    encoding: string;
    header: string;
    payload: string;
    secret?: string;
    privateKey?: string;
    key?: string;
}

export class SignStream extends Stream {
    readable = true;
    header: string;
    encoding: string;
    secret: DataStream;
    payload: DataStream;

    constructor({ encoding, header, key, privateKey, secret, payload }: SignStreamOptions) {
        super();
        this.encoding = encoding;
        this.header = header;
        this.secret = new DataStream(secret || privateKey || key!);
        this.payload = new DataStream(payload);
        this.secret.once('close', () => {
            if (!this.payload.writable && this.readable)
                this.sign();
        });

        this.payload.once('close', () => {
            if (!this.secret.writable && this.readable)
                this.sign();
        });
    }

    sign() {
        try {
            const signature = jwsSign({
                header: this.header,
                payload: this.payload,
                secret: this.secret,
                encoding: this.encoding
            });

            this.emit('done', signature);
            this.emit('data', signature);
            this.emit('end');

            this.readable = false;
            return signature;
        }
        catch (e) {
            this.readable = false;
            this.emit('error', e);
            this.emit('close');
        }
    }
}