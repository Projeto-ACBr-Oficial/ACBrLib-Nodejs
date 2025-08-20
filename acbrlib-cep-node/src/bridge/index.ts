import * as koffi from 'koffi'

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
    CEP_BuscarPorCEP: (handle: any, cep: Buffer, mensagem: Buffer, refTamanho: any) => number
    CEP_BuscarPorLogradouro: (handle: any, logradouro: string, numero: string, complemento: string, bairro: string, cidade: string, mensagem: Buffer, refTamanho: any) => number
}

export default class ACBrLibCEPBridgeMT {
    private acbrNativeLib: TypeACBrCepMT

    constructor(libraryPath: string) {
        const acbrcep = koffi.load(libraryPath)

        this.acbrNativeLib = {
            CEP_Inicializar: acbrcep.func('CEP_Inicializar', 'int', ['void **', 'string', 'string']),
            CEP_Finalizar: acbrcep.func('CEP_Finalizar', 'int', ['void *']),
            CEP_UltimoRetorno: acbrcep.func('CEP_UltimoRetorno', 'int', ['void *', 'char*', 'int*']),
            CEP_Nome: acbrcep.func('CEP_Nome', 'int', ['void *', 'char*', 'int*']),
            CEP_Versao: acbrcep.func('CEP_Versao', 'int', ['void *', 'char*', 'int*']),
            CEP_OpenSSLInfo: acbrcep.func('CEP_OpenSSLInfo', 'int', ['void *', 'char *', 'int *']),

            CEP_ConfigLer: acbrcep.func('CEP_ConfigLer', 'int', ['void *', 'string']),
            CEP_ConfigGravar: acbrcep.func('CEP_ConfigGravar', 'int', ['void *', 'string']),
            CEP_ConfigLerValor: acbrcep.func('CEP_ConfigLerValor', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            CEP_ConfigGravarValor: acbrcep.func('CEP_ConfigGravarValor', 'int', ['void *', 'string', 'string', 'string']),
            CEP_ConfigImportar: acbrcep.func('CEP_ConfigImportar', 'int', ['void *', 'string']),
            CEP_ConfigExportar: acbrcep.func('CEP_ConfigExportar', 'int', ['void *', 'char*', 'int*']),
            CEP_BuscarPorCEP: acbrcep.func('CEP_BuscarPorCEP', 'int', ['void *', 'char *', 'char *', 'int *']),
            CEP_BuscarPorLogradouro: acbrcep.func('CEP_BuscarPorLogradouro', 'int', ['void *', 'string', 'string', 'string', 'string', 'string', 'char*', 'int*'])
        } as TypeACBrCepMT
    }

    public getAcbrNativeLib(): TypeACBrCepMT {
        return this.acbrNativeLib
    }
}