import koffi from 'koffi'

export interface TypeACBrReinfMT {
    Reinf_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number
    Reinf_Finalizar: (handle: any) => number
    Reinf_Nome: (handle: any, nome: Buffer, refTamanho: any) => number
    Reinf_Versao: (handle: any, versao: Buffer, refTamanho: any) => number
    Reinf_UltimoRetorno: (handle: any, mensagem: Buffer, refTamanho: any) => number
    Reinf_ConfigLer: (handle: any, arqConfig: string) => number
    Reinf_ConfigGravar: (handle: any, arqConfig: string) => number
    Reinf_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    Reinf_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number
    Reinf_ConfigImportar: (handle: any, arqConfig: string) => number
    Reinf_ConfigExportar: (handle: any, mensagem: Buffer, refTamanho: any) => number
    Reinf_OpenSSLInfo: (handle: any, configuracoes: Buffer, refTamanho: any) => number
    Reinf_CriarEventoReinf: (handle: any, arqIni: string) => number
    Reinf_EnviarReinf: (handle: any, resposta: Buffer, refTamanho: any) => number
    Reinf_ConsultarReinf: (handle: any, protocolo: string, resposta: Buffer, refTamanho: any) => number
    Reinf_ConsultarReciboReinf: (handle: any, perApur: string, tipoEvento: number, nrInscEstab: string, cnpjPrestador: string, nrInscTomador: string, dtApur: string, cpfCnpjBenef: string, cnpjFonte: string, resposta: Buffer, refTamanho: any) => number
    Reinf_CriarEnviarReinf: (handle: any, arqIni: string, resposta: Buffer, refTamanho: any) => number
    Reinf_LimparReinf: (handle: any) => number
    Reinf_CarregarXMLEventoReinf: (handle: any, arquivoOuXML: string) => number
    Reinf_SetIDContribuinte: (handle: any, idContribuinte: string) => number
    Reinf_SetIDTransmissor: (handle: any, idTransmissor: string) => number
    Reinf_SetTipoContribuinte: (handle: any, tipoContribuinte: string) => number
    Reinf_SetVersaoDF: (handle: any, versao: string) => number
    Reinf_ObterCertificados: (handle: any, resposta: Buffer, refTamanho: any) => number
    Reinf_Validar: (handle: any) => number
    
}

export default class ACBrLibReinfMTBridge {
    private acbrNativeLib: TypeACBrReinfMT

    constructor(libraryPath: string) {
        const acbrreinf = koffi.load(libraryPath)
        this.acbrNativeLib = {
            Reinf_Inicializar: acbrreinf.func("Reinf_Inicializar", 'int', ['void **', 'string', 'string']),
            Reinf_Finalizar: acbrreinf.func("Reinf_Finalizar", 'int', ['void *']),
            Reinf_UltimoRetorno: acbrreinf.func("Reinf_UltimoRetorno", 'int', ['void *', 'char *', 'int *']),
            Reinf_Nome: acbrreinf.func("Reinf_Nome", 'int', ['void *', 'char *', 'int *']),
            Reinf_Versao: acbrreinf.func("Reinf_Versao", 'int', ['void *', 'char *', 'int *']),
            Reinf_ConfigLer: acbrreinf.func("Reinf_ConfigLer", 'int', ['void *', 'string']),
            Reinf_ConfigGravar: acbrreinf.func("Reinf_ConfigGravar", 'int', ['void *', 'string']),
            Reinf_ConfigLerValor: acbrreinf.func("Reinf_ConfigLerValor", 'int', ['void *', 'string', 'string', 'char *', 'int *']),
            Reinf_ConfigGravarValor: acbrreinf.func("Reinf_ConfigGravarValor", 'int', ['void *', 'string', 'string', 'string']),
            Reinf_ConfigImportar: acbrreinf.func("Reinf_ConfigImportar", 'int', ['void *', 'string']),
            Reinf_ConfigExportar: acbrreinf.func("Reinf_ConfigExportar", 'int', ['void *', 'char *', 'int *']),
            Reinf_OpenSSLInfo: acbrreinf.func("Reinf_OpenSSLInfo", 'int', ['void *', 'char *', 'int *']),
            Reinf_CriarEventoReinf: acbrreinf.func("Reinf_CriarEventoReinf", 'int', ['void *', 'string']),
            Reinf_EnviarReinf: acbrreinf.func("Reinf_EnviarReinf", 'int', ['void *', 'char *', 'int *']),
            Reinf_ConsultarReinf: acbrreinf.func("Reinf_ConsultarReinf", 'int', ['void *', 'string', 'char *', 'int *']),
            Reinf_ConsultarReciboReinf: acbrreinf.func("Reinf_ConsultarReciboReinf", 'int', ['void *', 'string', 'int', 'string', 'string', 'string', 'string', 'string', 'string', 'char *', 'int *']),
            Reinf_CriarEnviarReinf: acbrreinf.func("Reinf_CriarEnviarReinf", 'int', ['void *', 'string', 'char *', 'int *']),
            Reinf_LimparReinf: acbrreinf.func("Reinf_LimparReinf", 'int', ['void *']),
            Reinf_CarregarXMLEventoReinf: acbrreinf.func("Reinf_CarregarXMLEventoReinf", 'int', ['void *', 'string']),
            Reinf_SetIDContribuinte: acbrreinf.func("Reinf_SetIDContribuinte", 'int', ['void *', 'string']),
            Reinf_SetIDTransmissor: acbrreinf.func("Reinf_SetIDTransmissor", 'int', ['void *', 'string']),
            Reinf_SetTipoContribuinte: acbrreinf.func("Reinf_SetTipoContribuinte", 'int', ['void *', 'string']),
            Reinf_SetVersaoDF: acbrreinf.func("Reinf_SetVersaoDF", 'int', ['void *', 'string']),
            Reinf_ObterCertificados: acbrreinf.func("Reinf_ObterCertificados", 'int', ['void *', 'char *', 'int *']),
            Reinf_Validar: acbrreinf.func("Reinf_Validar", 'int', ['void *']),
           
        }
    }

    getAcbrNativeLib(): TypeACBrReinfMT {
        return this.acbrNativeLib
    }
}