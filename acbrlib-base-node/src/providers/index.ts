
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

/**
 * Interface de carregamento de bibliotecas nativas
 * Toda as ACBrLibBridgeMT devem implementar essa interface
 * Uma ACBrLibBridgeMT é responsável por carregar a biblioteca nativa e fornecer acesso aos seus métodos
 */
export interface IACBrLibBridgeMT {

    /*
    Metodo que carrega a biblioteca
    */
    loadLibrary( libraryPath: string): void;

    /**
     * Método para obter a referencia para a biblioteca já carregada
     */
    getAcbrNativeLib(): any
}
