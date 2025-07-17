import * as koffi from 'koffi'

export interface ACBrNativeLibrary {

    NFE_Inicializar: (configPath: string, chaveCrypt: string) => number
    NFE_Finalizar: () => number
    NFE_UltimoRetorno: (mensagem: Buffer, refTamanho: any) => number
    NFE_Nome: (nome: Buffer, refTamanho: any) => number
    NFE_Versao: (versao: Buffer, refTamanho: any) => number

    NFE_OpenSSLInfo: (configuracoes: Buffer, refTamanho: any) => number

    NFE_ConfigLer: (arqConfig: string) => number
    NFE_ConfigGravar: (arqConfig: string) => number
    NFE_ConfigLerValor: (sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    NFE_ConfigGravarValor: (sessao: string, chave: string, valor: string) => number
    NFE_ConfigImportar: (arqConfig: string) => number
    NFE_ConfigExportar: (configuracoes: Buffer, refTamanho: any) => number

    NFE_CarregarXML: (arquivoXML: string) => number
    NFE_CarregarINI: (arquivoINI: string) => number
    NFE_ObterXml: (indice: number, nfeXML: Buffer, refTamanho: any) => number
    NFE_GravarXml: (indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    NFE_ObterIni: (indice: number, nfeXML: Buffer, refTamanho: any) => number
    NFE_GravarIni: (indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    NFE_CarregarEventoXML: (arquivoXML: string) => number
    NFE_CarregarEventoINI: (arquivoINI: string) => number
    NFE_LimparLista: () => number
    NFE_LimparListaEventos: () => number
    NFE_Assinar: () => number
    NFE_Validar: () => number
    NFE_ValidarRegrasdeNegocios: (mensagem: Buffer, refTamanho: any) => number
    NFE_VerificarAssinatura: (mensagem: Buffer, refTamanho: any) => number

    NFE_GerarChave: (
        ACodigoUF: number, ACodigoNumerico: number, AModelo: number,
        ASerie: number, ANumero: number, ATpEmi: number,
        AEmissao: string, ACNPJCPF: string, sResposta: Buffer, esTamanho: any
    ) => number

    NFE_ObterCertificados: (mensagem: Buffer, refTamanho: any) => number
    NFE_GetPath: (tipo: number, mensagem: Buffer, refTamanho: any) => number
    NFE_GetPathEvento: (ACodEvento: string, mensagem: Buffer, refTamanho: any) => number

    NFE_StatusServico: (mensagem: Buffer, refTamanho: any) => number
    NFE_Consultar: (eChaveOuNFe: string, AExtrairEventos: boolean, mensagem: Buffer, refTamanho: any) => number
    NFE_ConsultarRecibo: (recibo: string, mensagem: Buffer, refTamanho: any) => number
    NFE_ConsultaCadastro: (cUF: string, nDocumento: string, nIE: boolean, sResposta: Buffer, esTamanho: any) => number;

    NFE_Inutilizar: (ACNPJ: string, AJustificativa: string, Ano: number, Modelo: number, Serie: number, NumeroInicial: number, NumeroFinal: number, sResposta: Buffer, esTamanho: any) => number;
    NFE_Enviar: (ALote: number, AImprimir: boolean, ASincrono: boolean, AZipado: boolean, sResposta: Buffer, esTamanho: any) => number;
    NFE_Cancelar: (eChave: string, eJustificativa: string, eCNPJ: string, ALote: number, sResposta: Buffer, esTamanho: any) => number;
    NFE_EnviarEvento: (idLote: number, sResposta: Buffer, esTamanho: any) => number;

    NFE_DistribuicaoDFePorUltNSU: (AcUFAutor: string, eCNPJCPF: string, eultNSU: string, sResposta: Buffer, esTamanho: any) => number
    NFE_DistribuicaoDFePorNSU: (AcUFAutor: number, eCNPJCPF: string, eNSU: string, sResposta: Buffer, esTamanho: any) => number;
    NFE_DistribuicaoDFePorChave: (AcUFAutor: number, eCNPJCPF: string, eChave: string, sResposta: Buffer, esTamanho: any) => number;
    NFE_EnviarEmail: (ePara: string, eXMLNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;
    NFE_EnviarEmailEvento: (ePara: string, eChaveEvento: string, eChaveNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;

    NFE_ImprimirPDF: () => number,
    NFE_Imprimir: (cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string) => number;
    NFE_SalvarPDF: (sResposta: Buffer, esTamanho: any) => number;
    NFE_ImprimirEvento: (eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    NFE_ImprimirEventoPDF: (eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    NFE_SalvarEventoPDF: (eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    NFE_ImprimirInutilizacao: (eArquivoXml: string) => number;
    NFE_ImprimirInutilizacaoPDF: (eArquivoXml: string) => number;
    NFE_SalvarInutilizacaoPDF: (eArquivoXml: string) => number;
};


export default class ACBrLibNFeBridge {

    private acbrNativeLib: ACBrNativeLibrary

    constructor(libraryPath: string) {
        const acbrnfe = koffi.load(libraryPath)

        this.acbrNativeLib = {
            NFE_Inicializar: acbrnfe.func('NFE_Inicializar', 'int', ['string', 'string']),
            NFE_Finalizar: acbrnfe.func('NFE_Finalizar', 'int', []),
            NFE_UltimoRetorno: acbrnfe.func('NFE_UltimoRetorno', 'int', ['char*', 'int*']),
            NFE_Nome: acbrnfe.func('NFE_Nome', 'int', ['char*', 'int*']),
            NFE_Versao: acbrnfe.func('NFE_Versao', 'int', ['char*', 'int*']),
            NFE_OpenSSLInfo: acbrnfe.func('NFE_OpenSSLInfo', 'int', ['char *', 'int *']),

            NFE_ConfigLer: acbrnfe.func('NFE_ConfigLer', 'int', ['string']),
            NFE_ConfigGravar: acbrnfe.func('NFE_ConfigGravar', 'int', ['string']),
            NFE_ConfigLerValor: acbrnfe.func('NFE_ConfigLerValor', 'int', ['string', 'string', 'char*', 'int*']),
            NFE_ConfigGravarValor: acbrnfe.func('NFE_ConfigGravarValor', 'int', ['string', 'string', 'string']),
            NFE_ConfigImportar: acbrnfe.func('NFE_ConfigImportar', 'int', ['string']),
            NFE_ConfigExportar: acbrnfe.func('NFE_ConfigExportar', 'int', ['char*', 'int*']),

            NFE_CarregarXML: acbrnfe.func('NFE_CarregarXML', 'int', ['string']),
            NFE_CarregarINI: acbrnfe.func('NFE_CarregarINI', 'int', ['string']),
            NFE_ObterXml: acbrnfe.func('NFE_ObterXml', 'int', ['int', 'char*', 'int*']),
            NFE_GravarXml: acbrnfe.func('NFE_GravarXml', 'int', ['int', 'string', 'string']),
            NFE_ObterIni: acbrnfe.func('NFE_ObterIni', 'int', ['int', 'char*', 'int*']),
            NFE_GravarIni: acbrnfe.func('NFE_GravarIni', 'int', ['int', 'string', 'string']),
            NFE_CarregarEventoXML: acbrnfe.func('NFE_CarregarEventoXML', 'int', ['string']),
            NFE_CarregarEventoINI: acbrnfe.func('NFE_CarregarEventoINI', 'int', ['string']),
            NFE_LimparLista: acbrnfe.func('NFE_LimparLista', 'int', []),
            NFE_LimparListaEventos: acbrnfe.func('NFE_LimparListaEventos', 'int', []),
            NFE_Assinar: acbrnfe.func('NFE_Assinar', 'int', []),
            NFE_Validar: acbrnfe.func('NFE_Validar', 'int', []),
            NFE_ValidarRegrasdeNegocios: acbrnfe.func('NFE_ValidarRegrasdeNegocios', 'int', ['char*', 'int*']),
            NFE_VerificarAssinatura: acbrnfe.func('NFE_VerificarAssinatura', 'int', ['char*', 'int*']),
            NFE_GerarChave: acbrnfe.func('NFE_GerarChave', 'int', ['int', 'int', 'int', 'int', 'int', 'int', 'string', 'string', 'char*', 'int*']),
            NFE_ObterCertificados: acbrnfe.func('NFE_ObterCertificados', 'int', ['char*', 'int*']),
            NFE_GetPath: acbrnfe.func('NFE_GetPath', 'int', ['int', 'char*', 'int*']),
            NFE_GetPathEvento: acbrnfe.func('NFE_GetPathEvento', 'int', ['string', 'char*', 'int*']),

            NFE_StatusServico: acbrnfe.func('NFE_StatusServico', 'int', ['char*', 'int*']),
            NFE_Consultar: acbrnfe.func('NFE_Consultar', 'int', ['string', 'bool', 'char*', 'int*']),
            NFE_ConsultarRecibo: acbrnfe.func('NFE_ConsultarRecibo', 'int', ['string', 'char*', 'int*']),
            NFE_ConsultaCadastro: acbrnfe.func('NFE_ConsultaCadastro', 'int', ['string', 'string', 'bool', 'char*', 'int*']),

            NFE_Inutilizar: acbrnfe.func('NFE_Inutilizar', 'int', ['string', 'string', 'int', 'int', 'int', 'int', 'int', 'char*', 'int*']),
            NFE_Enviar: acbrnfe.func('NFE_Enviar', 'int', ['int', 'bool', 'bool', 'bool', 'char*', 'int*']),
            NFE_Cancelar: acbrnfe.func('NFE_Cancelar', 'int', ['string', 'string', 'string', 'int', 'char*', 'int*']),
            NFE_EnviarEvento: acbrnfe.func('NFE_EnviarEvento', 'int', ['int', 'char*', 'int*']),

            NFE_DistribuicaoDFePorUltNSU: acbrnfe.func('NFE_DistribuicaoDFePorUltNSU', 'int', ['string', 'string', 'string', 'char*', 'int*']),
            NFE_DistribuicaoDFePorNSU: acbrnfe.func('NFE_DistribuicaoDFePorNSU', 'int', ['int', 'string', 'string', 'char*', 'int*']),
            NFE_DistribuicaoDFePorChave: acbrnfe.func('NFE_DistribuicaoDFePorChave', 'int', ['int', 'string', 'string', 'char*', 'int*']),
            NFE_EnviarEmail: acbrnfe.func('NFE_EnviarEmail', 'int', ['string', 'string', 'bool', 'string', 'string', 'string', 'string']),
            NFE_EnviarEmailEvento: acbrnfe.func('NFE_EnviarEmailEvento', 'int', ['string', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),

            NFE_ImprimirPDF: acbrnfe.func('NFE_ImprimirPDF', 'int', []),
            NFE_Imprimir: acbrnfe.func('NFE_Imprimir', 'int', ['string', 'int', 'string', 'string', 'string', 'string', 'string']),
            NFE_SalvarPDF: acbrnfe.func('NFE_SalvarPDF', 'int', ['char*', 'int*']),
            NFE_ImprimirEvento: acbrnfe.func('NFE_ImprimirEvento', 'int', ['string', 'string']),
            NFE_ImprimirEventoPDF: acbrnfe.func('NFE_ImprimirEventoPDF', 'int', ['string', 'string']),
            NFE_SalvarEventoPDF: acbrnfe.func('NFE_SalvarEventoPDF', 'int', ['string', 'string']),
            NFE_ImprimirInutilizacao: acbrnfe.func('NFE_ImprimirInutilizacao', 'int', ['string']),
            NFE_ImprimirInutilizacaoPDF: acbrnfe.func('NFE_ImprimirInutilizacaoPDF', 'int', ['string']),
            NFE_SalvarInutilizacaoPDF: acbrnfe.func('NFE_SalvarInutilizacaoPDF', 'int', ['string'])
        } as ACBrNativeLibrary
    }

    public getAcbrNativeLib(): ACBrNativeLibrary {
        return this.acbrNativeLib
    }
}