import { getDefaultFFIProvider, IFFIProvider } from '@projetoacbr/acbrlib-base-node'

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
export default class ACBrLibCEPBridgeMT {
    private acbrNativeLib: TypeACBrCepMT

    /**
     * @param libraryPath é o caminho da biblioteca nativa ACBrLibCep, windows use a convenção cdecl
     * @param ffiProvider Provider FFI opcional (usa o padrão se não fornecido)
     */
    constructor(libraryPath: string, ffiProvider?: IFFIProvider) {
        const provider = ffiProvider || getDefaultFFIProvider()
        const acbrcep = provider.load(libraryPath)

        this.acbrNativeLib = {
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

    /**
     * 
     * @returns TypeACBrCepMT é uma interface que representa os métodos nativos da ACBrLibCep
     */
    public getAcbrNativeLib(): TypeACBrCepMT {
        return this.acbrNativeLib
    }
}