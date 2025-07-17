import * as koffi from 'koffi'

export interface TypeACBrNFeMT {
    NFE_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number
    NFE_Finalizar: (handle: any) => number
    NFE_UltimoRetorno: (handle: any, mensagem: Buffer, refTamanho: any) => number
    NFE_Nome: (handle: any, nome: Buffer, refTamanho: any) => number;
    NFE_Versao: (handle: any, v: Buffer, refTamanho: any) => number
    NFE_OpenSSLInfo: (handle: any, configuracoes: Buffer, refTamanho: any) => number

    NFE_ConfigLer: (handle: any, arqConfig: string) => number
    NFE_ConfigGravar: (handle: any, arqConfig: string) => number
    NFE_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any) => number
    NFE_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number
    NFE_ConfigImportar: (handle: any, arqConfig: string) => number
    NFE_ConfigExportar: (handle: any, configuracoes: Buffer, refTamanho: any) => number

    NFE_CarregarXML: (handle: any, arquivoXML: string) => number
    NFE_CarregarINI: (handle: any, arquivoINI: string) => number
    NFE_ObterXml: (handle: any, indice: number, nfeXML: Buffer, refTamanho: any) => number
    NFE_GravarXml: (handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    NFE_ObterIni: (handle: any, indice: number, nfeXML: Buffer, refTamanho: any) => number
    NFE_GravarIni: (handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string) => number
    NFE_CarregarEventoXML: (handle: any, arquivoXML: string) => number
    NFE_CarregarEventoINI: (handle: any, arquivoINI: string) => number
    NFE_LimparLista: (handle: any) => number
    NFE_LimparListaEventos: (handle: any) => number
    NFE_Assinar: (handle: any) => number
    NFE_Validar: (handle: any) => number
    NFE_ValidarRegrasdeNegocios: (handle: any, mensagem: Buffer, refTamanho: any) => number
    NFE_VerificarAssinatura: (handle: any, mensagem: Buffer, refTamanho: any) => number

    NFE_GerarChave: (handle: any,
        ACodigoUF: number, ACodigoNumerico: number, AModelo: number,
        ASerie: number, ANumero: number, ATpEmi: number,
        AEmissao: string, ACNPJCPF: string, sResposta: Buffer, esTamanho: any
    ) => number

    NFE_ObterCertificados: (handle: any, mensagem: Buffer, refTamanho: any) => number
    NFE_GetPath: (handle: any, tipo: number, mensagem: Buffer, refTamanho: any) => number
    NFE_GetPathEvento: (handle: any, ACodEvento: string, mensagem: Buffer, refTamanho: any) => number
    NFE_StatusServico: (handle: any, mensagem: Buffer, refTamanho: any) => number
    NFE_Consultar: (handle: any, eChaveOuNFe: string, AExtrairEventos: boolean, mensagem: Buffer, refTamanho: any) => number
    NFE_ConsultarRecibo: (handle: any, recibo: string, mensagem: Buffer, refTamanho: any) => number
    NFE_ConsultaCadastro: (handle: any, cUF: string, nDocumento: string, nIE: boolean, sResposta: Buffer, esTamanho: any) => number;

    NFE_Inutilizar: (handle: any, ACNPJ: string, AJustificativa: string, Ano: number, Modelo: number, Serie: number, NumeroInicial: number, NumeroFinal: number, sResposta: Buffer, esTamanho: any) => number;
    NFE_Enviar: (handle: any, ALote: number, AImprimir: boolean, ASincrono: boolean, AZipado: boolean, sResposta: Buffer, esTamanho: any) => number;
    NFE_Cancelar: (handle: any, eChave: string, eJustificativa: string, eCNPJ: string, ALote: number, sResposta: Buffer, esTamanho: any) => number;
    NFE_EnviarEvento: (handle: any, idLote: number, sResposta: Buffer, esTamanho: any) => number;

    NFE_DistribuicaoDFePorUltNSU: (handle: any, AcUFAutor: string, eCNPJCPF: string, eultNSU: string, sResposta: Buffer, esTamanho: any) => number
    NFE_DistribuicaoDFePorNSU: (handle: any, AcUFAutor: number, eCNPJCPF: string, eNSU: string, sResposta: Buffer, esTamanho: any) => number;
    NFE_DistribuicaoDFePorChave: (handle: any, AcUFAutor: number, eCNPJCPF: string, eChave: string, sResposta: Buffer, esTamanho: any) => number;
    NFE_EnviarEmail: (handle: any, ePara: string, eXMLNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;
    NFE_EnviarEmailEvento: (handle: any, ePara: string, eChaveEvento: string, eChaveNFe: string, AEnviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string) => number;

    NFE_ImprimirPDF: (handle: any) => number,
    NFE_Imprimir: (handle: any, cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string) => number;
    NFE_SalvarPDF: (handle: any, sResposta: Buffer, esTamanho: any) => number;
    NFE_ImprimirEvento: (handle: any, eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    NFE_ImprimirEventoPDF: (handle: any, eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    NFE_ImprimirInutilizacao: (handle: any, eArquivoXml: string) => number;
    NFE_SalvarInutilizacaoPDF: (handle: any, eArquivoXml: string) => number;

    NFE_SalvarEventoPDF: (handle: any, eArquivoXmlNFe: string, eArquivoXmlEvento: string) => number;
    NFE_ImprimirInutilizacaoPDF: (handle: any, eArquivoXml: string) => number;
}

export default class ACBrLibNFeBridgeMT {
    private acbrNativeLib: TypeACBrNFeMT

    constructor(libraryPath: string) {
        const acbrnfe = koffi.load(libraryPath)

        this.acbrNativeLib = {
            NFE_Inicializar: acbrnfe.func('NFE_Inicializar', 'int', ['void **', 'string', 'string']),
            NFE_Finalizar: acbrnfe.func('NFE_Finalizar', 'int', ['void *']),
            NFE_UltimoRetorno: acbrnfe.func('NFE_UltimoRetorno', 'int', ['void *', 'char*', 'int*']),
            NFE_Nome: acbrnfe.func('NFE_Nome', 'int', ['void *', 'char*', 'int*']),
            NFE_Versao: acbrnfe.func('NFE_Versao', 'int', ['void *', 'char*', 'int*']),
            NFE_OpenSSLInfo: acbrnfe.func('NFE_OpenSSLInfo', 'int', ['void *', 'char *', 'int *']),

            NFE_ConfigLer: acbrnfe.func('NFE_ConfigLer', 'int', ['void *', 'string']),
            NFE_ConfigGravar: acbrnfe.func('NFE_ConfigGravar', 'int', ['void *', 'string']),
            NFE_ConfigLerValor: acbrnfe.func('NFE_ConfigLerValor', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            NFE_ConfigGravarValor: acbrnfe.func('NFE_ConfigGravarValor', 'int', ['void *', 'string', 'string', 'string']),
            NFE_ConfigImportar: acbrnfe.func('NFE_ConfigImportar', 'int', ['void *', 'string']),
            NFE_ConfigExportar: acbrnfe.func('NFE_ConfigExportar', 'int', ['void *', 'char*', 'int*']),
            NFE_CarregarXML: acbrnfe.func('NFE_CarregarXML', 'int', ['void *', 'string']),
            NFE_CarregarINI: acbrnfe.func('NFE_CarregarINI', 'int', ['void *', 'string']),
            NFE_ObterXml: acbrnfe.func('NFE_ObterXml', 'int', ['void *', 'int', 'char*', 'int*']),
            NFE_GravarXml: acbrnfe.func('NFE_GravarXml', 'int', ['void *', 'int', 'string', 'string']),
            NFE_ObterIni: acbrnfe.func('NFE_ObterIni', 'int', ['void *', 'int', 'char*', 'int*']),
            NFE_GravarIni: acbrnfe.func('NFE_GravarIni', 'int', ['void *', 'int', 'string', 'string']),
            NFE_CarregarEventoXML: acbrnfe.func('NFE_CarregarEventoXML', 'int', ['void *', 'string']),
            NFE_CarregarEventoINI: acbrnfe.func('NFE_CarregarEventoINI', 'int', ['void *', 'string']),
            NFE_LimparLista: acbrnfe.func('NFE_LimparLista', 'int', ['void *']),
            NFE_LimparListaEventos: acbrnfe.func('NFE_LimparListaEventos', 'int', ['void *']),
            NFE_Assinar: acbrnfe.func('NFE_Assinar', 'int', ['void *']),
            NFE_Validar: acbrnfe.func('NFE_Validar', 'int', ['void *']),
            NFE_ValidarRegrasdeNegocios: acbrnfe.func('NFE_ValidarRegrasdeNegocios', 'int', ['void *', 'char*', 'int*']),
            NFE_VerificarAssinatura: acbrnfe.func('NFE_VerificarAssinatura', 'int', ['void *', 'char*', 'int*']),
            NFE_GerarChave: acbrnfe.func('NFE_GerarChave', 'int', ['void *', 'int', 'int', 'int', 'int', 'int', 'int', 'string', 'string', 'char*', 'int*']),
            NFE_ObterCertificados: acbrnfe.func('NFE_ObterCertificados', 'int', ['void *', 'char*', 'int*']),
            NFE_GetPath: acbrnfe.func('NFE_GetPath', 'int', ['void *', 'int', 'char*', 'int*']),
            NFE_GetPathEvento: acbrnfe.func('NFE_GetPathEvento', 'int', ['void *', 'int', 'char*', 'int*']),

            NFE_StatusServico: acbrnfe.func('NFE_StatusServico', 'int', ['void *', 'char*', 'int*']),
            NFE_Consultar: acbrnfe.func('NFE_Consultar', 'int', ['void *', 'string', 'bool', 'char*', 'int*']),
            NFE_ConsultarRecibo: acbrnfe.func('NFE_ConsultarRecibo', 'int', ['void *', 'string', 'char*', 'int*']),
            NFE_ConsultaCadastro: acbrnfe.func('NFE_ConsultaCadastro', 'int', ['void *', 'string', 'string', 'bool', 'char*', 'int*']),

            NFE_Inutilizar: acbrnfe.func('NFE_Inutilizar', 'int', ['void *', 'string', 'string', 'int', 'int', 'int', 'int', 'int', 'char*', 'int*']),
            NFE_Enviar: acbrnfe.func('NFE_Enviar', 'int', ['void *', 'int', 'bool', 'bool', 'bool', 'char*', 'int*']),
            NFE_Cancelar: acbrnfe.func('NFE_Cancelar', 'int', ['void *', 'string', 'string', 'string', 'int', 'char*', 'int*']),
            NFE_EnviarEvento: acbrnfe.func('NFE_EnviarEvento', 'int', ['void *', 'int', 'char*', 'int*']),

            NFE_DistribuicaoDFePorUltNSU: acbrnfe.func('NFE_DistribuicaoDFePorUltNSU', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            NFE_DistribuicaoDFePorNSU: acbrnfe.func('NFE_DistribuicaoDFePorNSU', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            NFE_DistribuicaoDFePorChave: acbrnfe.func('NFE_DistribuicaoDFePorChave', 'int', ['void *', 'int', 'string', 'string', 'char*', 'int*']),
            NFE_EnviarEmail: acbrnfe.func('NFE_EnviarEmail', 'int', ['void *', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),
            NFE_EnviarEmailEvento: acbrnfe.func('NFE_EnviarEmailEvento', 'int', ['void *', 'string', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),

            NFE_Imprimir: acbrnfe.func('NFE_Imprimir', 'int', ['void *', 'string', 'int', 'string', 'string', 'string', 'string', 'string']),
            NFE_ImprimirPDF: acbrnfe.func('NFE_ImprimirPDF', 'int', ['void *']),
            NFE_SalvarPDF: acbrnfe.func('NFE_SalvarPDF', 'int', ['void *', 'char*', 'int*']),
            NFE_ImprimirEvento: acbrnfe.func('NFE_ImprimirEvento', 'int', ['void *', 'string', 'string']),
            NFE_ImprimirEventoPDF: acbrnfe.func('NFE_ImprimirEventoPDF', 'int', ['void *', 'string', 'string']),
            NFE_ImprimirInutilizacao: acbrnfe.func('NFE_ImprimirInutilizacao', 'int', ['void *', 'string']),
            NFE_SalvarEventoPDF: acbrnfe.func('NFE_SalvarEventoPDF', 'int', ['void *', 'string', 'string']),
            NFE_ImprimirInutilizacaoPDF: acbrnfe.func('NFE_ImprimirInutilizacaoPDF', 'int', ['void *', 'string']),
            NFE_SalvarInutilizacaoPDF: acbrnfe.func('NFE_SalvarInutilizacaoPDF', 'int', ['void *', 'string'])
        } as TypeACBrNFeMT
    }

    public getAcbrNativeLib(): TypeACBrNFeMT {
        return this.acbrNativeLib
    }
}