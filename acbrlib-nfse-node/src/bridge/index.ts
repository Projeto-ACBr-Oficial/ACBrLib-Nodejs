import * as koffi from 'koffi'

/**
 * TypeACBrLibNFSe é uma interface que representa os métodos nativos da ACBrLibNFSe
 * Baseado na documentação oficial: https://acbr.sourceforge.io/ACBrLib/MetodosNFSe.html
 */
export interface TypeACBrLibNFSe {
    // ===== MÉTODOS DE CONFIGURAÇÃO E INICIALIZAÇÃO =====
    NFSE_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number;
    NFSE_Finalizar: (handle: any) => number;
    NFSE_UltimoRetorno: (handle: any, resposta: Buffer, tamanho: any) => number;
    NFSE_Nome: (handle: any, resposta: Buffer, tamanho: any) => number;
    NFSE_Versao: (handle: any, resposta: Buffer, tamanho: any) => number;
    NFSE_ConfigLer: (handle: any, arquivo: string) => number;
    NFSE_ConfigGravar: (handle: any, arquivo: string) => number;
    NFSE_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, tamanho: any) => number;
    NFSE_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number;
    NFSE_ConfigImportar: (handle: any, arquivo: string) => number;
    NFSE_ConfigExportar: (handle: any, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE MANIPULAÇÃO DE ARQUIVOS =====
    NFSE_CarregarXML: (handle: any, arquivo: string) => number;
    NFSE_CarregarINI: (handle: any, arquivo: string) => number;
    NFSE_ObterXml: (handle: any, indice: number, resposta: Buffer, tamanho: any) => number;
    NFSE_GravarXml: (handle: any, indice: number, caminho: string, nome: string) => number;
    NFSE_ObterIni: (handle: any, indice: number, resposta: Buffer, tamanho: any) => number;
    NFSE_GravarIni: (handle: any, indice: number, caminho: string, nome: string) => number;
    NFSE_LimparLista: (handle: any) => number;
    NFSE_ObterCertificados: (handle: any, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE EMISSÃO E PROCESSAMENTO =====
    NFSE_Emitir: (handle: any, xml: string, aLote: number, imprimir: boolean, resposta: Buffer, tamanho: any) => number;
    NFSE_SubstituirNFSe: (handle: any, xml: string, aLote: number, resposta: Buffer, tamanho: any) => number;
    NFSE_LinkNFSe: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_GerarLote: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_GerarToken: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE CONSULTA =====
    NFSE_ConsultarSituacao: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarLoteRps: (handle: any, protocolo: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSePorRps: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSePorNumero: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSePorPeriodo: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSePorFaixa: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeGenerico: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE CONSULTA DE SERVIÇOS PRESTADOS =====
    NFSE_ConsultarNFSeServicoPrestadoPorNumero: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeServicoPrestadoPorPeriodo: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeServicoPrestadoPorTomador: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeServicoPrestadoPorIntermediario: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE CONSULTA DE SERVIÇOS TOMADOS =====
    NFSE_ConsultarNFSeServicoTomadoPorNumero: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeServicoTomadoPorPrestador: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeServicoTomadoPorTomador: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeServicoTomadoPorPeriodo: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSeServicoTomadoPorIntermediario: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE COMUNICAÇÃO E EVENTOS =====
    NFSE_EnviarEmail: (handle: any, destinatario: string, xml: string, anexarPDF: boolean, assunto: string, mensagem: string, cc: string, anexo: string) => number;
    NFSE_EnviarEvento: (handle: any,  infoEvento: string,resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarDPSPorChave: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarNFSePorChave: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarEvento: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarDFe: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE IMPRESSÃO E PDF =====
    NFSE_Imprimir: (handle: any, impressora: string, numCopias: number, gerarPDF: string, mostrarPreview: string, cancelada: string) => number;
    NFSE_ImprimirPDF: (handle: any) => number;
    NFSE_SalvarPDF: (handle: any, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS ADICIONAIS =====
    NFSE_ObterDANFSE: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;
    NFSE_ConsultarParametros: (handle: any, xml: string, resposta: Buffer, tamanho: any) => number;

    // ===== MÉTODOS DE CANCELAMENTO =====
    NFSE_Cancelar: (handle: any, xml: string, protocolo: string, motivo: string, aLote: number, resposta: Buffer, tamanho: any) => number;
}

/**
 * ACBrLibNFSeMTBridge é uma classe que acessa a biblioteca nativa ACBrLibNFSe
 */
export default class ACBrLibNFSeMTBridge {
    private acbrNativeLib: TypeACBrLibNFSe

    /**
     * 
     * @param libraryPath é o caminho da biblioteca nativa ACBrLibNFSe
     */
    constructor(libraryPath: string) {
        const acbrnfse = koffi.load(libraryPath)
        this.acbrNativeLib = {
            // ===== MÉTODOS DE CONFIGURAÇÃO E INICIALIZAÇÃO =====
            NFSE_Inicializar: acbrnfse.func("NFSE_Inicializar", 'int', ['void **','string', 'string']),
            NFSE_Finalizar: acbrnfse.func("NFSE_Finalizar", 'int', ['void *']),
            NFSE_UltimoRetorno: acbrnfse.func("NFSE_UltimoRetorno", 'int', ['void *', 'char*', 'int*']),
            NFSE_Nome: acbrnfse.func("NFSE_Nome", 'int', ['void *', 'char*', 'int*']),
            NFSE_Versao: acbrnfse.func("NFSE_Versao", 'int', ['void *', 'char*', 'int*']),
            NFSE_ConfigLer: acbrnfse.func("NFSE_ConfigLer", 'int', ['void *', 'string']),
            NFSE_ConfigGravar: acbrnfse.func("NFSE_ConfigGravar", 'int', ['void *', 'string']),
            NFSE_ConfigLerValor: acbrnfse.func("NFSE_ConfigLerValor", 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            NFSE_ConfigGravarValor: acbrnfse.func("NFSE_ConfigGravarValor", 'int', ['void *', 'string', 'string', 'string']),
            NFSE_ConfigImportar: acbrnfse.func("NFSE_ConfigImportar", 'int', ['void *', 'string']),
            NFSE_ConfigExportar: acbrnfse.func("NFSE_ConfigExportar", 'int', ['void *', 'char*', 'int*']),

            // ===== MÉTODOS DE MANIPULAÇÃO DE ARQUIVOS =====
            NFSE_CarregarXML: acbrnfse.func("NFSE_CarregarXML", 'int', ['void *', 'string']),
            NFSE_CarregarINI: acbrnfse.func("NFSE_CarregarINI", 'int', ['void *', 'string']),
            NFSE_ObterXml: acbrnfse.func("NFSE_ObterXml", 'int', ['void *', 'int', 'char*', 'int*']),
            NFSE_GravarXml: acbrnfse.func("NFSE_GravarXml", 'int', ['void *', 'int', 'string', 'string']),
            NFSE_ObterIni: acbrnfse.func("NFSE_ObterIni", 'int', ['void *', 'int', 'char*', 'int*']),
            NFSE_GravarIni: acbrnfse.func("NFSE_GravarIni", 'int', ['void *', 'int', 'string', 'string']),
            NFSE_LimparLista: acbrnfse.func("NFSE_LimparLista", 'int', ['void *']),
            NFSE_ObterCertificados: acbrnfse.func("NFSE_ObterCertificados", 'int', ['void *', 'char*', 'int*']),

            // ===== MÉTODOS DE EMISSÃO E PROCESSAMENTO =====
            NFSE_Emitir: acbrnfse.func("NFSE_Emitir", 'int', ['void *', 'string', 'int', 'bool', 'char*', 'int*']),
            NFSE_SubstituirNFSe: acbrnfse.func("NFSE_SubstituirNFSe", 'int', ['void *', 'string', 'int', 'char*', 'int*']),
            NFSE_LinkNFSe: acbrnfse.func("NFSE_LinkNFSe", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_GerarLote: acbrnfse.func("NFSE_GerarLote", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_GerarToken: acbrnfse.func("NFSE_GerarToken", 'int', ['void *', 'string', 'char*', 'int*']),

            // ===== MÉTODOS DE CONSULTA =====
            NFSE_ConsultarSituacao: acbrnfse.func("NFSE_ConsultarSituacao", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarLoteRps: acbrnfse.func("NFSE_ConsultarLoteRps", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSePorRps: acbrnfse.func("NFSE_ConsultarNFSePorRps", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSePorNumero: acbrnfse.func("NFSE_ConsultarNFSePorNumero", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSePorPeriodo: acbrnfse.func("NFSE_ConsultarNFSePorPeriodo", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSePorFaixa: acbrnfse.func("NFSE_ConsultarNFSePorFaixa", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeGenerico: acbrnfse.func("NFSE_ConsultarNFSeGenerico", 'int', ['void *', 'string', 'char*', 'int*']),

            // ===== MÉTODOS DE CONSULTA DE SERVIÇOS PRESTADOS =====
            NFSE_ConsultarNFSeServicoPrestadoPorNumero: acbrnfse.func("NFSE_ConsultarNFSeServicoPrestadoPorNumero", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeServicoPrestadoPorPeriodo: acbrnfse.func("NFSE_ConsultarNFSeServicoPrestadoPorPeriodo", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeServicoPrestadoPorTomador: acbrnfse.func("NFSE_ConsultarNFSeServicoPrestadoPorTomador", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeServicoPrestadoPorIntermediario: acbrnfse.func("NFSE_ConsultarNFSeServicoPrestadoPorIntermediario", 'int', ['void *', 'string', 'char*', 'int*']),

            // ===== MÉTODOS DE CONSULTA DE SERVIÇOS TOMADOS =====
            NFSE_ConsultarNFSeServicoTomadoPorNumero: acbrnfse.func("NFSE_ConsultarNFSeServicoTomadoPorNumero", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeServicoTomadoPorPrestador: acbrnfse.func("NFSE_ConsultarNFSeServicoTomadoPorPrestador", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeServicoTomadoPorTomador: acbrnfse.func("NFSE_ConsultarNFSeServicoTomadoPorTomador", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeServicoTomadoPorPeriodo: acbrnfse.func("NFSE_ConsultarNFSeServicoTomadoPorPeriodo", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSeServicoTomadoPorIntermediario: acbrnfse.func("NFSE_ConsultarNFSeServicoTomadoPorIntermediario", 'int', ['void *', 'string', 'char*', 'int*']),

            // ===== MÉTODOS DE COMUNICAÇÃO E EVENTOS =====
            NFSE_EnviarEmail: acbrnfse.func("NFSE_EnviarEmail", 'int', ['void *', 'string', 'string', 'bool', 'string', 'string', 'string', 'string']),
            NFSE_EnviarEvento: acbrnfse.func("NFSE_EnviarEvento", 'int', ['void *','string', 'char*', 'int*']),
            NFSE_ConsultarDPSPorChave: acbrnfse.func("NFSE_ConsultarDPSPorChave", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarNFSePorChave: acbrnfse.func("NFSE_ConsultarNFSePorChave", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarEvento: acbrnfse.func("NFSE_ConsultarEvento", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarDFe: acbrnfse.func("NFSE_ConsultarDFe", 'int', ['void *', 'string', 'char*', 'int*']),

            // ===== MÉTODOS DE IMPRESSÃO E PDF =====
            NFSE_Imprimir: acbrnfse.func("NFSE_Imprimir", 'int', ['void *','string','int','string','string','string']),
            NFSE_ImprimirPDF: acbrnfse.func("NFSE_ImprimirPDF", 'int', ['void *']),
            NFSE_SalvarPDF: acbrnfse.func("NFSE_SalvarPDF", 'int', ['void *', 'char*', 'int*']),

            // ===== MÉTODOS ADICIONAIS =====
            NFSE_ObterDANFSE: acbrnfse.func("NFSE_ObterDANFSE", 'int', ['void *', 'string', 'char*', 'int*']),
            NFSE_ConsultarParametros: acbrnfse.func("NFSE_ConsultarParametros", 'int', ['void *', 'string', 'char*', 'int*']),

            // ===== MÉTODOS DE CANCELAMENTO =====
            NFSE_Cancelar: acbrnfse.func("NFSE_Cancelar", 'int', ['void *', 'string', 'string', 'string', 'int', 'char*', 'int*'])
        } as TypeACBrLibNFSe;
    }

    public getAcbrNativeLib(): TypeACBrLibNFSe {
        return this.acbrNativeLib
    }
}