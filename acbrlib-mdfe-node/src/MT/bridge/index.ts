import * as koffi from 'koffi'

export interface TypeACBrMDFeMT {
    MDFE_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number
    MDFE_Finalizar: (handle: any) => number
    MDFE_UltimoRetorno: (handle: any, mensagem: Buffer, refTamanho: any) => number
    MDFE_Nome: (handle: any, nome: Buffer, refTamanho: any) => number;
    MDFE_Versao: (handle: any, v: Buffer, refTamanho: any) => number
    MDFE_OpenSSLInfo: (handle: any, configuracoes: Buffer, refTamanho: any) => number

    MDFE_ConfigLer: (handle: any, arqConfig: string) => number
    MDFE_ConfigGravar: (handle: any, arqConfig: string) => number
    MDFE_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    MDFE_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number
    MDFE_ConfigImportar: (handle: any, arqConfig: string) => number
    MDFE_ConfigExportar: (handle: any, configuracoes: Buffer, refTamanho: any) => number

    MDFE_CarregarXML: (handle: any, arquivoXML: string) => number
    MDFE_CarregarINI: (handle: any, arquivoINI: string) => number
    MDFE_ObterXml: (handle: any, indice: number, nfeXML: Buffer, refTamanho: any) => number
    MDFE_GravarXml: (handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    MDFE_ObterIni: (handle: any, indice: number, nfeXML: Buffer, refTamanho: any) => number
    MDFE_GravarIni: (handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    MDFE_CarregarEventoXML: (handle: any, arquivoXML: string) => number
    MDFE_CarregarEventoINI: (handle: any, arquivoINI: string) => number
    MDFE_LimparLista: (handle: any) => number
    MDFE_LimparListaEventos: (handle: any) => number
    MDFE_Assinar: (handle: any) => number
    MDFE_Validar: (handle: any) => number
    MDFE_ValidarRegrasdeNegocios: (handle: any, mensagem: Buffer, refTamanho: any) => number
    MDFE_VerificarAssinatura: (handle: any, mensagem: Buffer, refTamanho: any) => number

    MDFE_GerarChave: (handle: any,
        ACodigoUF: number, ACodigoNumerico: number, AModelo: number,
        ASerie: number, ANumero: number, ATpEmi: number,
        AEmissao: string, ACNPJCPF: string, sResposta: Buffer, esTamanho: any
    ) => number

    MDFE_ObterCertificados: (handle: any, mensagem: Buffer, refTamanho: any) => number
    MDFE_GetPath: (handle: any, tipo: number, mensagem: Buffer, refTamanho: any) => number
    MDFE_GetPathEvento: (handle: any, ACodEvento: string, mensagem: Buffer, refTamanho: any) => number
    MDFE_StatusServico: (handle: any, mensagem: Buffer, refTamanho: any) => number
    MDFE_Consultar: (handle: any, eChaveOuNFe: string, AExtrairEventos: boolean, mensagem: Buffer, refTamanho: any) => number
    MDFE_ConsultarRecibo: (handle: any, recibo: string, mensagem: Buffer, refTamanho: any) => number

    MDFE_Enviar: (handle: any, ALote: number, AImprimir: boolean, ASincrono: boolean, AZipado: boolean, sResposta: Buffer, esTamanho: any) => number;
    MDFE_Cancelar: (handle: any, eChave: string, eJustificativa: string, eCNPJ: string, ALote: number, sResposta: Buffer, esTamanho: any) => number;
    MDFE_EnviarEvento: (handle: any, idLote: number, sResposta: Buffer, esTamanho: any) => number;

    MDFE_DistribuicaoDFePorUltNSU: (handle: any, AcUFAutor: string, eCNPJCPF: string, eultNSU: string, sResposta: Buffer, esTamanho: any) => number
    MDFE_DistribuicaoDFePorNSU: (handle: any, AcUFAutor: number, eCNPJCPF: string, eNSU: string, sResposta: Buffer, esTamanho: any) => number;
    MDFE_DistribuicaoDFePorChave: (handle: any, AcUFAutor: number, eCNPJCPF: string, eChave: string, sResposta: Buffer, esTamanho: any) => number;
    MDFE_EnviarEmail: (handle: any, ePara: string, eXMLNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;
    MDFE_EnviarEmailEvento: (handle: any, ePara: string, eChaveEvento: string, eChaveNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;

    MDFE_ImprimirPDF: (handle: any) => number,
    MDFE_Imprimir: (handle: any, cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string) => number;
    MDFE_SalvarPDF: (handle: any, sResposta: Buffer, esTamanho: any) => number;
    MDFE_ImprimirEvento: (handle: any, eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    MDFE_ImprimirEventoPDF: (handle: any, eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;

    MDFE_SalvarEventoPDF: (handle: any, eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
}

export default class ACBrLibMDFeBridgeMT {
    private acbrNativeLib: TypeACBrMDFeMT

    constructor(libraryPath: string) {
        const acbrmdfe = koffi.load(libraryPath)

        this.acbrNativeLib = {
            MDFE_Inicializar: acbrmdfe.func('MDFE_Inicializar', 'int', ['void **', 'string', 'string']),
            MDFE_Finalizar: acbrmdfe.func('MDFE_Finalizar', 'int', ['void *']),
            MDFE_UltimoRetorno: acbrmdfe.func('MDFE_UltimoRetorno', 'int', ['void *', 'char*', 'int*']),
            MDFE_Nome: acbrmdfe.func('MDFE_Nome', 'int', ['void *', 'char*', 'int*']),
            MDFE_Versao: acbrmdfe.func('MDFE_Versao', 'int', ['void *', 'char*', 'int*']),
            MDFE_OpenSSLInfo: acbrmdfe.func('MDFE_OpenSSLInfo', 'int', ['void *', 'char *', 'int *']),

            MDFE_ConfigLer: acbrmdfe.func('MDFE_ConfigLer', 'int', ['void *', 'string']),
            MDFE_ConfigGravar: acbrmdfe.func('MDFE_ConfigGravar', 'int', ['void *', 'string']),
            MDFE_ConfigLerValor: acbrmdfe.func('MDFE_ConfigLerValor', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            MDFE_ConfigGravarValor: acbrmdfe.func('MDFE_ConfigGravarValor', 'int', ['void *', 'string', 'string', 'string']),
            MDFE_ConfigImportar: acbrmdfe.func('MDFE_ConfigImportar', 'int', ['void *', 'string']),
            MDFE_ConfigExportar: acbrmdfe.func('MDFE_ConfigExportar', 'int', ['void *', 'char*', 'int*']),
            MDFE_CarregarXML: acbrmdfe.func('MDFE_CarregarXML', 'int', ['void *', 'string']),
            MDFE_CarregarINI: acbrmdfe.func('MDFE_CarregarINI', 'int', ['void *', 'string']),
            MDFE_ObterXml: acbrmdfe.func('MDFE_ObterXml', 'int', ['void *', 'int', 'char*', 'int*']),
            MDFE_GravarXml: acbrmdfe.func('MDFE_GravarXml', 'int', ['void *', 'int', 'string', 'string']),
            MDFE_ObterIni: acbrmdfe.func('MDFE_ObterIni', 'int', ['void *', 'int', 'char*', 'int*']),
            MDFE_GravarIni: acbrmdfe.func('MDFE_GravarIni', 'int', ['void *', 'int', 'string', 'string']),
            MDFE_CarregarEventoXML: acbrmdfe.func('MDFE_CarregarEventoXML', 'int', ['void *', 'string']),
            MDFE_CarregarEventoINI: acbrmdfe.func('MDFE_CarregarEventoINI', 'int', ['void *', 'string']),
            MDFE_LimparLista: acbrmdfe.func('MDFE_LimparLista', 'int', ['void *']),
            MDFE_LimparListaEventos: acbrmdfe.func('MDFE_LimparListaEventos', 'int', ['void *']),
            MDFE_Assinar: acbrmdfe.func('MDFE_Assinar', 'int', ['void *']),
            MDFE_Validar: acbrmdfe.func('MDFE_Validar', 'int', ['void *']),
            MDFE_ValidarRegrasdeNegocios: acbrmdfe.func('MDFE_ValidarRegrasdeNegocios', 'int', ['void *', 'char*', 'int*']),
            MDFE_VerificarAssinatura: acbrmdfe.func('MDFE_VerificarAssinatura', 'int', ['void *', 'char*', 'int*']),
            MDFE_GerarChave: acbrmdfe.func('MDFE_GerarChave', 'int', ['void *', 'int', 'int', 'int', 'int', 'int', 'int', 'string', 'string', 'char*', 'int*']),
            MDFE_ObterCertificados: acbrmdfe.func('MDFE_ObterCertificados', 'int', ['void *', 'char*', 'int*']),
            MDFE_GetPath: acbrmdfe.func('MDFE_GetPath', 'int', ['void *', 'int', 'char*', 'int*']),
            MDFE_GetPathEvento: acbrmdfe.func('MDFE_GetPathEvento', 'int', ['void *', 'int', 'char*', 'int*']),

            MDFE_StatusServico: acbrmdfe.func('MDFE_StatusServico', 'int', ['void *', 'char*', 'int*']),
            MDFE_Consultar: acbrmdfe.func('MDFE_Consultar', 'int', ['void *', 'string', 'bool', 'char*', 'int*']),
            MDFE_ConsultarRecibo: acbrmdfe.func('MDFE_ConsultarRecibo', 'int', ['void *', 'string', 'char*', 'int*']),

            MDFE_Enviar: acbrmdfe.func('MDFE_Enviar', 'int', ['void *', 'int', 'bool', 'bool', 'bool', 'char*', 'int*']),
            MDFE_Cancelar: acbrmdfe.func('MDFE_Cancelar', 'int', ['void *', 'string', 'string', 'string', 'int', 'char*', 'int*']),
            MDFE_EnviarEvento: acbrmdfe.func('MDFE_EnviarEvento', 'int', ['void *', 'int', 'char*', 'int*']),

            MDFE_DistribuicaoDFePorUltNSU: acbrmdfe.func('MDFE_DistribuicaoDFePorUltNSU', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            MDFE_DistribuicaoDFePorNSU: acbrmdfe.func('MDFE_DistribuicaoDFePorNSU', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            MDFE_DistribuicaoDFePorChave: acbrmdfe.func('MDFE_DistribuicaoDFePorChave', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            MDFE_EnviarEmail: acbrmdfe.func('MDFE_EnviarEmail', 'int', ['void *', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),
            MDFE_EnviarEmailEvento: acbrmdfe.func('MDFE_EnviarEmailEvento', 'int', ['void *', 'string', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),

            MDFE_Imprimir: acbrmdfe.func('MDFE_Imprimir', 'int', ['void *', 'string', 'int', 'string', 'string', 'string', 'string', 'string']),
            MDFE_ImprimirPDF: acbrmdfe.func('MDFE_ImprimirPDF', 'int', ['void *']),
            MDFE_SalvarPDF: acbrmdfe.func('MDFE_SalvarPDF', 'int', ['void *', 'char*', 'int*']),
            MDFE_ImprimirEvento: acbrmdfe.func('MDFE_ImprimirEvento', 'int', ['void *', 'string', 'string']),
            MDFE_ImprimirEventoPDF: acbrmdfe.func('MDFE_ImprimirEventoPDF', 'int', ['void *', 'string', 'string']),
            MDFE_SalvarEventoPDF: acbrmdfe.func('MDFE_SalvarEventoPDF', 'int', ['void *', 'string', 'string'])
        } as TypeACBrMDFeMT
    }

    public getAcbrNativeLib(): TypeACBrMDFeMT {
        return this.acbrNativeLib
    }
}