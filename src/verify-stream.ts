import { Buffer } from 'safe-buffer';
import { DataStream } from './data-stream';
import * as jwa from 'jwa';
import { Stream, Readable } from 'stream';
import { } from 'util';

export interface VerifyStreamOptions {
    secret?: string;
    publicKey?: string;
    key?: string;
    algorithm: string;
    encoding: string;
    signature: string;
}

export class VerifyStream extends Readable {
    private signature: DataStream;
    private secretStream: DataStream;
    private encoding: string;
    private algorithm: string;

    constructor(opts: VerifyStreamOptions) {
        super();
        const { 
            secret, publicKey, key, 
            encoding, algorithm, signature
        } = opts;

        const secretOrKey = secret || publicKey || key;
        this.secretStream = new DataStream(secretOrKey!);
        this.signature = new DataStream(signature);
        this.encoding = encoding;
        this.algorithm = algorithm;

        this.secretStream.once('close', () => {
            if(!this.signature.writable && this.readable)
                this.verify();
        })
    }

    _read(_size: number) {
        this.once('close', () => {

        });
        this.push();
    }

    verify() {
        try {
            const valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
            const obj = jwsDecode(this.signature.buffer, this.encoding);
            this.emit('done', valid, obj);
            this.emit('data', valid);
            this.emit('end');
            this.readable = false;
            return valid;
          } catch (e) {
            this.readable = false;
            this.emit('error', e);
            this.emit('close');
          }
    }
}
