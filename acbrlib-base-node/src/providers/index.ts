
import { KoffiFFIProvider } from './KoffiFFIProvider';
import { IFFIProvider } from '../types/IFFIProvider';

export { KoffiFFIProvider } from './KoffiFFIProvider';

/**
 * Retorna o provider FFI padrão (KoffiFFIProvider)
 * @returns IFFIProvider - Provider FFI padrão configurado
 */
export function getDefaultFFIProvider(): IFFIProvider {
    return new KoffiFFIProvider();
}
