import { Buffer } from 'safe-buffer';

export namespace Convert {
    export function toBuffer(value: any, encoding: string = 'utf8'): Buffer {
        if (Buffer.isBuffer(value))
            return value;
    
        if (typeof value === 'string')
            return Buffer.from(value, encoding);
    
        if (typeof value === 'number')
            return Buffer.from(value.toString(), encoding);
    
        return Buffer.from(JSON.stringify(value), encoding);
    }
    
    export function toString(value: any) {
        if (typeof value === 'string')
            return value;
    
        if (typeof value === 'number' || Buffer.isBuffer(value))
            return value.toString();
        
        return JSON.stringify(value);
    }
}
