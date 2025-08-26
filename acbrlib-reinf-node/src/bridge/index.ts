import koffi from 'koffi'

export interface TypeACBrReinfMT {
    REINF_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number
    REINF_Finalizar: (handle: any) => number
    REINF_Nome: (handle: any, nome: Buffer, refTamanho: any) => number
    REINF_Versao: (handle: any, versao: Buffer, refTamanho: any) => number
    REINF_UltimoRetorno: (handle: any, mensagem: Buffer, refTamanho: any) => number
    REINF_ConfigLer: (handle: any, arqConfig: string) => number
    REINF_ConfigGravar: (handle: any, arqConfig: string) => number
    REINF_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    REINF_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number
    REINF_ConfigImportar: (handle: any, arqConfig: string) => number
    REINF_ConfigExportar: (handle: any, mensagem: Buffer, refTamanho: any) => number
    REINF_OpenSSLInfo: (handle: any, configuracoes: Buffer, refTamanho: any) => number
    REINF_CriarEventoReinf: (handle: any, arqIni: string) => number
    REINF_EnviarReinf: (handle: any, resposta: Buffer, refTamanho: any) => number
    REINF_ConsultarReinf: (handle: any, protocolo: string, resposta: Buffer, refTamanho: any) => number
    REINF_ConsultarReciboReinf: (handle: any, perApur: string, tipoEvento: number, nrInscEstab: string, cnpjPrestador: string, nrInscTomador: string, dtApur: string, cpfCnpjBenef: string, cnpjFonte: string, resposta: Buffer, refTamanho: any) => number
    REINF_CriarEnviarReinf: (handle: any, arqIni: string, resposta: Buffer, refTamanho: any) => number
    REINF_LimparReinf: (handle: any) => number
    REINF_CarregarXMLEventoReinf: (handle: any, arquivoOuXML: string) => number
    REINF_SetIDContribuinte: (handle: any, idContribuinte: string) => number
    REINF_SetIDTransmissor: (handle: any, idTransmissor: string) => number
    REINF_SetTipoContribuinte: (handle: any, tipoContribuinte: string) => number
    REINF_SetVersaoDF: (handle: any, versao: string) => number
    REINF_ObterCertificados: (handle: any, resposta: Buffer, refTamanho: any) => number
    REINF_Validar: (handle: any) => number
    
}

export default class ACBrLibReinfMTBridge {
    private acbrNativeLib: TypeACBrReinfMT

    constructor(libraryPath: string) {
        const acbrreinf = koffi.load(libraryPath)
        this.acbrNativeLib = {
            REINF_Inicializar: acbrreinf.func("REINF_Inicializar", 'int', ['void **', 'string', 'string']),
            REINF_Finalizar: acbrreinf.func("REINF_Finalizar", 'int', ['void *']),
            REINF_UltimoRetorno: acbrreinf.func("REINF_UltimoRetorno", 'int', ['void *', 'char *', 'int *']),
            REINF_Nome: acbrreinf.func("REINF_Nome", 'int', ['void *', 'char *', 'int *']),
            REINF_Versao: acbrreinf.func("REINF_Versao", 'int', ['void *', 'char *', 'int *']),
            REINF_ConfigLer: acbrreinf.func("REINF_ConfigLer", 'int', ['void *', 'string']),
            REINF_ConfigGravar: acbrreinf.func("REINF_ConfigGravar", 'int', ['void *', 'string']),
            REINF_ConfigLerValor: acbrreinf.func("REINF_ConfigLerValor", 'int', ['void *', 'string', 'string', 'char *', 'int *']),
            REINF_ConfigGravarValor: acbrreinf.func("REINF_ConfigGravarValor", 'int', ['void *', 'string', 'string', 'string']),
            REINF_ConfigImportar: acbrreinf.func("REINF_ConfigImportar", 'int', ['void *', 'string']),
            REINF_ConfigExportar: acbrreinf.func("REINF_ConfigExportar", 'int', ['void *', 'char *', 'int *']),
            REINF_OpenSSLInfo: acbrreinf.func("REINF_OpenSSLInfo", 'int', ['void *', 'char *', 'int *']),            REINF_CriarEventoReinf: acbrreinf.func("REINF_CriarEventoReinf", 'int', ['void *', 'string']),
            REINF_EnviarReinf: acbrreinf.func("REINF_EnviarReinf", 'int', ['void *', 'char *', 'int *']),
            REINF_ConsultarReinf: acbrreinf.func("REINF_ConsultarReinf", 'int', ['void *', 'string', 'char *', 'int *']),
            REINF_ConsultarReciboReinf: acbrreinf.func("REINF_ConsultarReciboReinf", 'int', ['void *', 'string', 'int', 'string', 'string', 'string', 'string', 'string', 'string', 'char *', 'int *']),
            REINF_CriarEnviarReinf: acbrreinf.func("REINF_CriarEnviarReinf", 'int', ['void *', 'string', 'char *', 'int *']),
            REINF_LimparReinf: acbrreinf.func("REINF_LimparReinf", 'int', ['void *']),
            REINF_CarregarXMLEventoReinf: acbrreinf.func("REINF_CarregarXMLEventoReinf", 'int', ['void *', 'string']),
            REINF_SetIDContribuinte: acbrreinf.func("REINF_SetIDContribuinte", 'int', ['void *', 'string']),
            REINF_SetIDTransmissor: acbrreinf.func("REINF_SetIDTransmissor", 'int', ['void *', 'string']),
            REINF_SetTipoContribuinte: acbrreinf.func("REINF_SetTipoContribuinte", 'int', ['void *', 'string']),
            REINF_SetVersaoDF: acbrreinf.func("REINF_SetVersaoDF", 'int', ['void *', 'string']),
            REINF_ObterCertificados: acbrreinf.func("REINF_ObterCertificados", 'int', ['void *', 'char *', 'int *']),
            REINF_Validar: acbrreinf.func("REINF_Validar", 'int', ['void *']),
           
        }
    }

    getAcbrNativeLib(): TypeACBrReinfMT {
        return this.acbrNativeLib
    }
}