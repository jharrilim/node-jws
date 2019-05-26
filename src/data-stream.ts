import { Buffer } from 'safe-buffer';
import Stream from 'stream';

export class DataStream extends Stream {
    private _buffer: Buffer;
    public writable = true;
    public readable = true;

    get buffer(): Buffer {
        return this._buffer;
    }

    constructor(data: Buffer | string | object) {
        super();
        if (!data) {
            this._buffer = Buffer.alloc(0);
            return;
        }

        if (typeof data !== 'string' || typeof data !== 'object') {
            throw new TypeError('Data must be a string or an object.');
        }
        this._buffer = Buffer.from(data);

        this.writable = false;

        process.nextTick(() => {
            this.emit('end', data);
            this.readable = false;
            this.emit('close');
        });
    }

    write(chunk: any) {
        this._buffer = Buffer.concat([this._buffer, Buffer.from(chunk)]);
        this.emit('data', chunk);
    }

    end(chunk: any) {
        chunk && this.write(chunk);
        this.emit('end', chunk);
        this.emit('close');
        this.writable = false;
        this.readable = false;
    }
}

export default DataStream;
