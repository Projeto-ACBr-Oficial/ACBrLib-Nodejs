
import * as koffi from 'koffi';
import { IFFIProvider } from '../types/IFFIProvider';

/**
 * Implementação do provedor FFI usando Koffi
 */
export class KoffiFFIProvider implements IFFIProvider {
    
    load(libraryPath: string): any {
        return koffi.load(libraryPath);
    }

    func(lib: any, funcName: string, returnType: string, paramTypes: string[]): Function {
        return lib.func(funcName, returnType, paramTypes);
    }

    alloc(type: string, size: number): any {
        return koffi.alloc(type, size);
    }

    free(pointer: any): void {
        koffi.free(pointer);
    }

    decode(pointer: any, type: string): any {
        return koffi.decode(pointer, type);
    }

    encode(pointer: any, type: string, value: any): void {
        koffi.encode(pointer, type, value);
    }
}
