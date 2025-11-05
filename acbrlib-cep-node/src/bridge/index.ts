import { getDefaultFFIProvider, IFFIProvider,IACBrLibBridgeMT } from '@projetoacbr/acbrlib-base-node/dist/src'
/**
 * TypeACBrCepMT é uma interface que representa os métodos nativos da ACBrLibCep
 * Ela é necessária para o intelisense do Typescript entender os métodos da ACBrLibCep
 */
export interface TypeACBrCepMT {
    CEP_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number
    CEP_Finalizar: (handle: any) => number
    CEP_UltimoRetorno: (handle: any, mensagem: Buffer, refTamanho: any) => number
    CEP_Nome: (handle: any, nome: Buffer, refTamanho: any) => number;
    CEP_Versao: (handle: any, v: Buffer, refTamanho: any) => number
    CEP_OpenSSLInfo: (handle: any, configuracoes: Buffer, refTamanho: any) => number

    CEP_ConfigLer: (handle: any, arqConfig: string) => number
    CEP_ConfigGravar: (handle: any, arqConfig: string) => number
    CEP_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    CEP_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number
    CEP_ConfigImportar: (handle: any, arqConfig: string) => number
    CEP_ConfigExportar: (handle: any, configuracoes: Buffer, refTamanho: any) => number
    CEP_BuscarPorCEP: (handle: any, cep: string, mensagem: Buffer, refTamanho: any) => number
    CEP_BuscarPorLogradouro: (handle: any, cidade: string, tipoLogradouro: string, logradouro: string, uf: string, bairro: string, mensagem: Buffer, refTamanho: any) => number
}

/**
 * ACBrLibCEPBridgeMT é uma classe que acessa a biblioteca nativa ACBrLibCep usando FFI desacoplado
 */
export default class ACBrLibCEPBridgeMT implements IACBrLibBridgeMT {
    #acbrNativeLib: TypeACBrCepMT
    private static instance: ACBrLibCEPBridgeMT;

    /**
     * 
     * @returns TypeACBrCepMT é uma interface que representa os métodos nativos da ACBrLibCep
     */


    private constructor(libraryPath: string) {
        this.#acbrNativeLib = this.#loadLibrary(libraryPath);
    }


    /**
     * Retorna a instância singleton do ACBrLibCEPBridgeMT
     * @param libraryPath Caminho da biblioteca nativa ACBrLibCep
     * @returns Instância singleton do ACBrLibCEPBridgeMT
     */
    public static getInstance(libraryPath: string): ACBrLibCEPBridgeMT {
        if (!ACBrLibCEPBridgeMT.instance) {
            ACBrLibCEPBridgeMT.instance = new ACBrLibCEPBridgeMT(libraryPath);
        }
        return ACBrLibCEPBridgeMT.instance;

    }


    public getAcbrNativeLib(): TypeACBrCepMT {
        return this.#acbrNativeLib
    }


    /**
     * Método privado que de fato retorna os métodos mapeados para a classe
     */
    #loadLibrary(libraryPath: string): TypeACBrCepMT {
        const provider = getDefaultFFIProvider()
        const acbrcep = provider.load(libraryPath)

        return {
            CEP_Inicializar: provider.func(acbrcep, 'CEP_Inicializar', 'int', ['void **', 'string', 'string']),
            CEP_Finalizar: provider.func(acbrcep, 'CEP_Finalizar', 'int', ['void *']),
            CEP_UltimoRetorno: provider.func(acbrcep, 'CEP_UltimoRetorno', 'int', ['void *', 'char*', 'int*']),
            CEP_Nome: provider.func(acbrcep, 'CEP_Nome', 'int', ['void *', 'char*', 'int*']),
            CEP_Versao: provider.func(acbrcep, 'CEP_Versao', 'int', ['void *', 'char*', 'int*']),
            CEP_OpenSSLInfo: provider.func(acbrcep, 'CEP_OpenSSLInfo', 'int', ['void *', 'char *', 'int *']),

            CEP_ConfigLer: provider.func(acbrcep, 'CEP_ConfigLer', 'int', ['void *', 'string']),
            CEP_ConfigGravar: provider.func(acbrcep, 'CEP_ConfigGravar', 'int', ['void *', 'string']),
            CEP_ConfigLerValor: provider.func(acbrcep, 'CEP_ConfigLerValor', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            CEP_ConfigGravarValor: provider.func(acbrcep, 'CEP_ConfigGravarValor', 'int', ['void *', 'string', 'string', 'string']),
            CEP_ConfigImportar: provider.func(acbrcep, 'CEP_ConfigImportar', 'int', ['void *', 'string']),
            CEP_ConfigExportar: provider.func(acbrcep, 'CEP_ConfigExportar', 'int', ['void *', 'char*', 'int*']),
            CEP_BuscarPorCEP: provider.func(acbrcep, 'CEP_BuscarPorCEP', 'int', ['void *', 'string', 'char *', 'int *']),
            CEP_BuscarPorLogradouro: provider.func(acbrcep, 'CEP_BuscarPorLogradouro', 'int', ['void *', 'string', 'string', 'string', 'string', 'string', 'char*', 'int*'])
        } as TypeACBrCepMT

    }
    public loadLibrary(libraryPath: string): void {
        if (this.#acbrNativeLib === null) {
            this.#acbrNativeLib = this.#loadLibrary(libraryPath);
        }
    }
}