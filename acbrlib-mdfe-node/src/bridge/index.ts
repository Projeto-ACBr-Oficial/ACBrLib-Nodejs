import * as koffi from 'koffi'

export interface ACBrNativeLibrary {

    MDFE_Inicializar: (configPath: string, chaveCrypt: string) => number
    MDFE_Finalizar: () => number
    MDFE_UltimoRetorno: (mensagem: Buffer, refTamanho: any) => number
    MDFE_Nome: (nome: Buffer, refTamanho: any) => number
    MDFE_Versao: (versao: Buffer, refTamanho: any) => number

    MDFE_OpenSSLInfo: (configuracoes: Buffer, refTamanho: any) => number

    MDFE_ConfigLer: (arqConfig: string) => number
    MDFE_ConfigGravar: (arqConfig: string) => number
    MDFE_ConfigLerValor: (sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    MDFE_ConfigGravarValor: (sessao: string, chave: string, valor: string) => number
    MDFE_ConfigImportar: (arqConfig: string) => number
    MDFE_ConfigExportar: (configuracoes: Buffer, refTamanho: any) => number

    MDFE_CarregarXML: (arquivoXML: string) => number
    MDFE_CarregarINI: (arquivoINI: string) => number
    MDFE_ObterXml: (indice: number, nfeXML: Buffer, refTamanho: any) => number
    MDFE_GravarXml: (indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    MDFE_ObterIni: (indice: number, nfeXML: Buffer, refTamanho: any) => number
    MDFE_GravarIni: (indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    MDFE_CarregarEventoXML: (arquivoXML: string) => number
    MDFE_CarregarEventoINI: (arquivoINI: string) => number
    MDFE_LimparLista: () => number
    MDFE_LimparListaEventos: () => number
    MDFE_Assinar: () => number
    MDFE_Validar: () => number
    MDFE_ValidarRegrasdeNegocios: (mensagem: Buffer, refTamanho: any) => number
    MDFE_VerificarAssinatura: (mensagem: Buffer, refTamanho: any) => number

    MDFE_GerarChave: (
        ACodigoUF: number, ACodigoNumerico: number, AModelo: number,
        ASerie: number, ANumero: number, ATpEmi: number,
        AEmissao: string, ACNPJCPF: string, sResposta: Buffer, esTamanho: any
    ) => number

    MDFE_ObterCertificados: (mensagem: Buffer, refTamanho: any) => number
    MDFE_GetPath: (tipo: number, mensagem: Buffer, refTamanho: any) => number
    MDFE_GetPathEvento: (ACodEvento: string, mensagem: Buffer, refTamanho: any) => number

    MDFE_StatusServico: (mensagem: Buffer, refTamanho: any) => number
    MDFE_Consultar: (eChaveOuNFe: string, AExtrairEventos: boolean, mensagem: Buffer, refTamanho: any) => number
    MDFE_ConsultarRecibo: (recibo: string, mensagem: Buffer, refTamanho: any) => number

    MDFE_Enviar: (ALote: number, AImprimir: boolean, ASincrono: boolean, AZipado: boolean, sResposta: Buffer, esTamanho: any) => number;
    MDFE_Cancelar: (eChave: string, eJustificativa: string, eCNPJ: string, ALote: number, sResposta: Buffer, esTamanho: any) => number;
    MDFE_EnviarEvento: (idLote: number, sResposta: Buffer, esTamanho: any) => number;

    MDFE_DistribuicaoDFePorUltNSU: (AcUFAutor: string, eCNPJCPF: string, eultNSU: string, sResposta: Buffer, esTamanho: any) => number
    MDFE_DistribuicaoDFePorNSU: (AcUFAutor: number, eCNPJCPF: string, eNSU: string, sResposta: Buffer, esTamanho: any) => number;
    MDFE_DistribuicaoDFePorChave: (AcUFAutor: number, eCNPJCPF: string, eChave: string, sResposta: Buffer, esTamanho: any) => number;
    MDFE_EnviarEmail: (ePara: string, eXMLNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;
    MDFE_EnviarEmailEvento: (ePara: string, eChaveEvento: string, eChaveNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;

    MDFE_ImprimirPDF: () => number,
    MDFE_Imprimir: (cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string) => number;
    MDFE_SalvarPDF: (sResposta: Buffer, esTamanho: any) => number;
    MDFE_ImprimirEvento: (eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    MDFE_ImprimirEventoPDF: (eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    MDFE_SalvarEventoPDF: (eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
};


export default class ACBrLibNFeBridge {

    private acbrNativeLib: ACBrNativeLibrary

    constructor(libraryPath: string) {
        const acbrmdfe = koffi.load(libraryPath)

        this.acbrNativeLib = {
            MDFE_Inicializar: acbrmdfe.func('MDFE_Inicializar', 'int', ['string', 'string']),
            MDFE_Finalizar: acbrmdfe.func('MDFE_Finalizar', 'int', []),
            MDFE_UltimoRetorno: acbrmdfe.func('MDFE_UltimoRetorno', 'int', ['char*', 'int*']),
            MDFE_Nome: acbrmdfe.func('MDFE_Nome', 'int', ['char*', 'int*']),
            MDFE_Versao: acbrmdfe.func('MDFE_Versao', 'int', ['char*', 'int*']),
            MDFE_OpenSSLInfo: acbrmdfe.func('MDFE_OpenSSLInfo', 'int', ['char *', 'int *']),

            MDFE_ConfigLer: acbrmdfe.func('MDFE_ConfigLer', 'int', ['string']),
            MDFE_ConfigGravar: acbrmdfe.func('MDFE_ConfigGravar', 'int', ['string']),
            MDFE_ConfigLerValor: acbrmdfe.func('MDFE_ConfigLerValor', 'int', ['string', 'string', 'char*', 'int*']),
            MDFE_ConfigGravarValor: acbrmdfe.func('MDFE_ConfigGravarValor', 'int', ['string', 'string', 'string']),
            MDFE_ConfigImportar: acbrmdfe.func('MDFE_ConfigImportar', 'int', ['string']),
            MDFE_ConfigExportar: acbrmdfe.func('MDFE_ConfigExportar', 'int', ['char*', 'int*']),

            MDFE_CarregarXML: acbrmdfe.func('MDFE_CarregarXML', 'int', ['string']),
            MDFE_CarregarINI: acbrmdfe.func('MDFE_CarregarINI', 'int', ['string']),
            MDFE_ObterXml: acbrmdfe.func('MDFE_ObterXml', 'int', ['int', 'char*', 'int*']),
            MDFE_GravarXml: acbrmdfe.func('MDFE_GravarXml', 'int', ['int', 'string', 'string']),
            MDFE_ObterIni: acbrmdfe.func('MDFE_ObterIni', 'int', ['int', 'char*', 'int*']),
            MDFE_GravarIni: acbrmdfe.func('MDFE_GravarIni', 'int', ['int', 'string', 'string']),
            MDFE_CarregarEventoXML: acbrmdfe.func('MDFE_CarregarEventoXML', 'int', ['string']),
            MDFE_CarregarEventoINI: acbrmdfe.func('MDFE_CarregarEventoINI', 'int', ['string']),
            MDFE_LimparLista: acbrmdfe.func('MDFE_LimparLista', 'int', []),
            MDFE_LimparListaEventos: acbrmdfe.func('MDFE_LimparListaEventos', 'int', []),
            MDFE_Assinar: acbrmdfe.func('MDFE_Assinar', 'int', []),
            MDFE_Validar: acbrmdfe.func('MDFE_Validar', 'int', []),
            MDFE_ValidarRegrasdeNegocios: acbrmdfe.func('MDFE_ValidarRegrasdeNegocios', 'int', ['char*', 'int*']),
            MDFE_VerificarAssinatura: acbrmdfe.func('MDFE_VerificarAssinatura', 'int', ['char*', 'int*']),
            MDFE_GerarChave: acbrmdfe.func('MDFE_GerarChave', 'int', ['int', 'int', 'int', 'int', 'int', 'int', 'string', 'string', 'char*', 'int*']),
            MDFE_ObterCertificados: acbrmdfe.func('MDFE_ObterCertificados', 'int', ['char*', 'int*']),
            MDFE_GetPath: acbrmdfe.func('MDFE_GetPath', 'int', ['int', 'char*', 'int*']),
            MDFE_GetPathEvento: acbrmdfe.func('MDFE_GetPathEvento', 'int', ['string', 'char*', 'int*']),

            MDFE_StatusServico: acbrmdfe.func('MDFE_StatusServico', 'int', ['char*', 'int*']),
            MDFE_Consultar: acbrmdfe.func('MDFE_Consultar', 'int', ['string', 'bool', 'char*', 'int*']),
            MDFE_ConsultarRecibo: acbrmdfe.func('MDFE_ConsultarRecibo', 'int', ['string', 'char*', 'int*']),

            MDFE_Enviar: acbrmdfe.func('MDFE_Enviar', 'int', ['int', 'bool', 'bool', 'bool', 'char*', 'int*']),
            MDFE_Cancelar: acbrmdfe.func('MDFE_Cancelar', 'int', ['string', 'string', 'string', 'int', 'char*', 'int*']),
            MDFE_EnviarEvento: acbrmdfe.func('MDFE_EnviarEvento', 'int', ['int', 'char*', 'int*']),

            MDFE_DistribuicaoDFePorUltNSU: acbrmdfe.func('MDFE_DistribuicaoDFePorUltNSU', 'int', ['string', 'string', 'string', 'char*', 'int*']),
            MDFE_DistribuicaoDFePorNSU: acbrmdfe.func('MDFE_DistribuicaoDFePorNSU', 'int', ['int', 'string', 'string', 'char*', 'int*']),
            MDFE_DistribuicaoDFePorChave: acbrmdfe.func('MDFE_DistribuicaoDFePorChave', 'int', ['int', 'string', 'string', 'char*', 'int*']),
            MDFE_EnviarEmail: acbrmdfe.func('MDFE_EnviarEmail', 'int', ['string', 'string', 'bool', 'string', 'string', 'string', 'string']),
            MDFE_EnviarEmailEvento: acbrmdfe.func('MDFE_EnviarEmailEvento', 'int', ['string', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),

            MDFE_ImprimirPDF: acbrmdfe.func('MDFE_ImprimirPDF', 'int', []),
            MDFE_Imprimir: acbrmdfe.func('MDFE_Imprimir', 'int', ['string', 'int', 'string', 'string', 'string', 'string', 'string']),
            MDFE_SalvarPDF: acbrmdfe.func('MDFE_SalvarPDF', 'int', ['char*', 'int*']),
            MDFE_ImprimirEvento: acbrmdfe.func('MDFE_ImprimirEvento', 'int', ['string', 'string']),
            MDFE_ImprimirEventoPDF: acbrmdfe.func('MDFE_ImprimirEventoPDF', 'int', ['string', 'string']),
            MDFE_SalvarEventoPDF: acbrmdfe.func('MDFE_SalvarEventoPDF', 'int', ['string', 'string'])
        } as ACBrNativeLibrary
    }

    public getAcbrNativeLib(): ACBrNativeLibrary {
        return this.acbrNativeLib
    }
}