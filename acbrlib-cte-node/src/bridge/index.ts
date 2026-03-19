import * as koffi from 'koffi'

export interface TypeACBrCTeMT {
    CTE_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number
    CTE_Finalizar: (handle: any) => number
    CTE_UltimoRetorno: (handle: any, mensagem: Buffer, refTamanho: any) => number
    CTE_Nome: (handle: any, nome: Buffer, refTamanho: any) => number;
    CTE_Versao: (handle: any, v: Buffer, refTamanho: any) => number
    CTE_OpenSSLInfo: (handle: any, configuracoes: Buffer, refTamanho: any) => number

    CTE_ConfigLer: (handle: any, arqConfig: string) => number
    CTE_ConfigGravar: (handle: any, arqConfig: string) => number
    CTE_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    CTE_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number
    CTE_ConfigImportar: (handle: any, arqConfig: string) => number
    CTE_ConfigExportar: (handle: any, configuracoes: Buffer, refTamanho: any) => number

    CTE_CarregarXML: (handle: any, arquivoXML: string) => number
    CTE_CarregarINI: (handle: any, arquivoINI: string) => number
    CTE_ObterXml: (handle: any, indice: number, cteXML: Buffer, refTamanho: any) => number
    CTE_GravarXml: (handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    CTE_ObterIni: (handle: any, indice: number, cteINI: Buffer, refTamanho: any) => number
    CTE_GravarIni: (handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    CTE_CarregarEventoXML: (handle: any, arquivoXML: string) => number
    CTE_CarregarEventoINI: (handle: any, arquivoINI: string) => number
    CTE_LimparLista: (handle: any) => number
    CTE_LimparListaEventos: (handle: any) => number
    CTE_Assinar: (handle: any) => number
    CTE_Validar: (handle: any) => number
    CTE_ValidarRegrasdeNegocios: (handle: any, mensagem: Buffer, refTamanho: any) => number
    CTE_VerificarAssinatura: (handle: any, mensagem: Buffer, refTamanho: any) => number

    CTE_GerarChave: (handle: any,
        ACodigoUF: number, ACodigoNumerico: number, AModelo: number,
        ASerie: number, ANumero: number, ATpEmi: number,
        AEmissao: string, ACNPJCPF: string, sResposta: Buffer, esTamanho: any
    ) => number

    CTE_ObterCertificados: (handle: any, mensagem: Buffer, refTamanho: any) => number
    CTE_GetPath: (handle: any, tipo: number, mensagem: Buffer, refTamanho: any) => number
    CTE_GetPathEvento: (handle: any, ACodEvento: string, mensagem: Buffer, refTamanho: any) => number
    CTE_StatusServico: (handle: any, mensagem: Buffer, refTamanho: any) => number
    CTE_Consultar: (handle: any, eChaveOuCTe: string, AExtrairEventos: boolean, mensagem: Buffer, refTamanho: any) => number
    CTE_ConsultarRecibo: (handle: any, recibo: string, mensagem: Buffer, refTamanho: any) => number

    CTE_Inutilizar: (handle: any, ACNPJ: string, AJustificativa: string, Ano: number, Modelo: number, Serie: number, NumeroInicial: number, NumeroFinal: number, sResposta: Buffer, esTamanho: any) => number;
    CTE_Enviar: (handle: any, ALote: number, AImprimir: boolean, ASincrono: boolean, sResposta: Buffer, esTamanho: any) => number;
    CTE_Cancelar: (handle: any, eChave: string, eJustificativa: string, eCNPJ: string, ALote: number, sResposta: Buffer, esTamanho: any) => number;
    CTE_EnviarEvento: (handle: any, idLote: number, sResposta: Buffer, esTamanho: any) => number;

    CTE_DistribuicaoDFePorUltNSU: (handle: any, AcUFAutor: string, eCNPJCPF: string, eultNSU: string, sResposta: Buffer, esTamanho: any) => number
    CTE_DistribuicaoDFePorNSU: (handle: any, AcUFAutor: number, eCNPJCPF: string, eNSU: string, sResposta: Buffer, esTamanho: any) => number;
    CTE_DistribuicaoDFePorChave: (handle: any, AcUFAutor: number, eCNPJCPF: string, eChave: string, sResposta: Buffer, esTamanho: any) => number;
    CTE_EnviarEmail: (handle: any, ePara: string, eXMLCTe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;
    CTE_EnviarEmailEvento: (handle: any, ePara: string, eChaveEvento: string, eChaveCTe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;

    CTE_ImprimirPDF: (handle: any) => number,
    CTE_Imprimir: (handle: any, cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string) => number;
    CTE_SalvarPDF: (handle: any, sResposta: Buffer, esTamanho: any) => number;
    CTE_ImprimirEvento: (handle: any, eArquivoXmlCTe: string, eArquivoXmlEvento: string) => number;
    CTE_ImprimirEventoPDF: (handle: any, eArquivoXmlCTe: string, eArquivoXmlEvento: string) => number;

    CTE_ImprimirInutilizacao: (handle: any, eArquivoXml: string) => number;
    CTE_ImprimirInutilizacaoPDF: (handle: any, eArquivoXml: string) => number;

    CTE_SalvarEventoPDF: (handle: any, eArquivoXmlCTe: string, eArquivoXmlEvento: string, buffer: Buffer, refTamanho: any) => number;
}

export default class ACBrLibCTeBridgeMT {
    private acbrNativeLib: TypeACBrCTeMT

    constructor(libraryPath: string) {
        const acbrcte = koffi.load(libraryPath)

        this.acbrNativeLib = {
            CTE_Inicializar: acbrcte.func('CTE_Inicializar', 'int', ['void **', 'string', 'string']),
            CTE_Finalizar: acbrcte.func('CTE_Finalizar', 'int', ['void *']),
            CTE_UltimoRetorno: acbrcte.func('CTE_UltimoRetorno', 'int', ['void *', 'char*', 'int*']),
            CTE_Nome: acbrcte.func('CTE_Nome', 'int', ['void *', 'char*', 'int*']),
            CTE_Versao: acbrcte.func('CTE_Versao', 'int', ['void *', 'char*', 'int*']),
            CTE_OpenSSLInfo: acbrcte.func('CTE_OpenSSLInfo', 'int', ['void *', 'char *', 'int *']),

            CTE_ConfigLer: acbrcte.func('CTE_ConfigLer', 'int', ['void *', 'string']),
            CTE_ConfigGravar: acbrcte.func('CTE_ConfigGravar', 'int', ['void *', 'string']),
            CTE_ConfigLerValor: acbrcte.func('CTE_ConfigLerValor', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            CTE_ConfigGravarValor: acbrcte.func('CTE_ConfigGravarValor', 'int', ['void *', 'string', 'string', 'string']),
            CTE_ConfigImportar: acbrcte.func('CTE_ConfigImportar', 'int', ['void *', 'string']),
            CTE_ConfigExportar: acbrcte.func('CTE_ConfigExportar', 'int', ['void *', 'char*', 'int*']),

            CTE_CarregarXML: acbrcte.func('CTE_CarregarXML', 'int', ['void *', 'string']),
            CTE_CarregarINI: acbrcte.func('CTE_CarregarINI', 'int', ['void *', 'string']),
            CTE_ObterXml: acbrcte.func('CTE_ObterXml', 'int', ['void *', 'int', 'char*', 'int*']),
            CTE_GravarXml: acbrcte.func('CTE_GravarXml', 'int', ['void *', 'int', 'string', 'string']),
            CTE_ObterIni: acbrcte.func('CTE_ObterIni', 'int', ['void *', 'int', 'char*', 'int*']),
            CTE_GravarIni: acbrcte.func('CTE_GravarIni', 'int', ['void *', 'int', 'string', 'string']),

            CTE_CarregarEventoXML: acbrcte.func('CTE_CarregarEventoXML', 'int', ['void *', 'string']),
            CTE_CarregarEventoINI: acbrcte.func('CTE_CarregarEventoINI', 'int', ['void *', 'string']),
            CTE_LimparLista: acbrcte.func('CTE_LimparLista', 'int', ['void *']),
            CTE_LimparListaEventos: acbrcte.func('CTE_LimparListaEventos', 'int', ['void *']),
            CTE_Assinar: acbrcte.func('CTE_Assinar', 'int', ['void *']),
            CTE_Validar: acbrcte.func('CTE_Validar', 'int', ['void *']),
            CTE_ValidarRegrasdeNegocios: acbrcte.func('CTE_ValidarRegrasdeNegocios', 'int', ['void *', 'char*', 'int*']),
            CTE_VerificarAssinatura: acbrcte.func('CTE_VerificarAssinatura', 'int', ['void *', 'char*', 'int*']),

            CTE_GerarChave: acbrcte.func('CTE_GerarChave', 'int', ['void *', 'int', 'int', 'int', 'int', 'int', 'int', 'string', 'string', 'char*', 'int*']),
            CTE_ObterCertificados: acbrcte.func('CTE_ObterCertificados', 'int', ['void *', 'char*', 'int*']),
            CTE_GetPath: acbrcte.func('CTE_GetPath', 'int', ['void *', 'int', 'char*', 'int*']),
            CTE_GetPathEvento: acbrcte.func('CTE_GetPathEvento', 'int', ['void *', 'int', 'char*', 'int*']),

            CTE_StatusServico: acbrcte.func('CTE_StatusServico', 'int', ['void *', 'char*', 'int*']),
            CTE_Consultar: acbrcte.func('CTE_Consultar', 'int', ['void *', 'string', 'bool', 'char*', 'int*']),
            CTE_ConsultarRecibo: acbrcte.func('CTE_ConsultarRecibo', 'int', ['void *', 'string', 'char*', 'int*']),

            CTE_Inutilizar: acbrcte.func('CTE_Inutilizar', 'int', ['void *', 'string', 'string', 'int', 'int', 'int', 'int', 'int', 'char*', 'int*']),
            CTE_Enviar: acbrcte.func('CTE_Enviar', 'int', ['void *', 'int', 'bool', 'bool', 'char*', 'int*']),
            CTE_Cancelar: acbrcte.func('CTE_Cancelar', 'int', ['void *', 'string', 'string', 'string', 'int', 'char*', 'int*']),
            CTE_EnviarEvento: acbrcte.func('CTE_EnviarEvento', 'int', ['void *', 'int', 'char*', 'int*']),

            CTE_DistribuicaoDFePorUltNSU: acbrcte.func('CTE_DistribuicaoDFePorUltNSU', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            CTE_DistribuicaoDFePorNSU: acbrcte.func('CTE_DistribuicaoDFePorNSU', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            CTE_DistribuicaoDFePorChave: acbrcte.func('CTE_DistribuicaoDFePorChave', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            CTE_EnviarEmail: acbrcte.func('CTE_EnviarEmail', 'int', ['void *', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),
            CTE_EnviarEmailEvento: acbrcte.func('CTE_EnviarEmailEvento', 'int', ['void *', 'string', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),

            CTE_Imprimir: acbrcte.func('CTE_Imprimir', 'int', ['void *', 'string', 'int', 'string', 'string', 'string', 'string', 'string']),
            CTE_ImprimirPDF: acbrcte.func('CTE_ImprimirPDF', 'int', ['void *']),
            CTE_SalvarPDF: acbrcte.func('CTE_SalvarPDF', 'int', ['void *', 'char*', 'int*']),
            CTE_ImprimirEvento: acbrcte.func('CTE_ImprimirEvento', 'int', ['void *', 'string', 'string']),
            CTE_ImprimirEventoPDF: acbrcte.func('CTE_ImprimirEventoPDF', 'int', ['void *', 'string', 'string']),
            CTE_ImprimirInutilizacao: acbrcte.func('CTE_ImprimirInutilizacao', 'int', ['void *', 'string']),
            CTE_ImprimirInutilizacaoPDF: acbrcte.func('CTE_ImprimirInutilizacaoPDF', 'int', ['void *', 'string']),
            CTE_SalvarEventoPDF: acbrcte.func('CTE_SalvarEventoPDF', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
        } as TypeACBrCTeMT
    }

    public getAcbrNativeLib(): TypeACBrCTeMT {
        return this.acbrNativeLib
    }
}