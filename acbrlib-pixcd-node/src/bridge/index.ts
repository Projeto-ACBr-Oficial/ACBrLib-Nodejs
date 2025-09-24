import koffi from "koffi";


/**
 * TypeACBrPIXCD é uma interface que define os métodos da ACBrLibPixCD
 */


export interface TypeACBrPIXCD {
    // Métodos de inicialização/finalização
    PIXCD_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number;
    PIXCD_Finalizar: (handle: any) => number;

    // Métodos de configuração
    PIXCD_ConfigLer: (handle: any, arqConfig: string) => number;
    PIXCD_ConfigLerValor: (handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any) => number;
    PIXCD_ConfigImportar: (handle: any, arqConfig: string) => number;
    PIXCD_ConfigExportar: (handle: any, configuracoes: Buffer, refTamanho: any) => number;
    PIXCD_ConfigGravarValor: (handle: any, sessao: string, chave: string, valor: string) => number;
    PIXCD_ConfigGravar: (handle: any, arqConfig: string) => number;

    // Métodos comuns
    PIXCD_UltimoRetorno: (handle: any, mensagem: Buffer, refTamanho: any) => number;
    PIXCD_Nome: (handle: any, nome: Buffer, refTamanho: any) => number;
    PIXCD_Versao: (handle: any, versao: Buffer, refTamanho: any) => number;
    PIXCD_OpenSSLInfo: (handle: any, configuracoes: Buffer, refTamanho: any) => number;

    // Métodos específicos do PIX CD
    PIXCD_GerarQRCodeEstatico: (handle: any, AValor: number, AinfoAdicional: string, ATxID: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_GerarQRCodeEstaticoComChavePix: (handle: any, AChavePix: string, AValor: number, AinfoAdicional: string, ATxID: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_ConsultarPix: (handle: any, Ae2eid: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_ConsultarPixRecebidos: (handle: any, ADataInicio: number, ADataFim: number, ATxId: string, ACpfCnpj: string, PagAtual: number, ItensPorPagina: number, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_SolicitarDevolucaoPix: (handle: any, AInfDevolucao: string, Ae2eid: string, AidDevolucao: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_ConsultarDevolucaoPix: (handle: any, Ae2eid: string, AidDevolucao: string, sResposta: Buffer, esTamanho: any) => number;

    // Métodos de cobrança imediata
    PIXCD_CriarCobrancaImediata: (handle: any, AInfCobSolicitada: string, ATxId: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_ConsultarCobrancaImediata: (handle: any, ATxId: string, ARevisao: number, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_ConsultarCobrancasCob: (handle: any, ADataInicio: number, ADataFim: number, ACpfCnpj: string, ALocationPresente: boolean, AStatus: number, PagAtual: number, ItensPorPagina: number, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_RevisarCobrancaImediata: (handle: any, AInfCobRevisada: string, ATxId: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_CancelarCobrancaImediata: (handle: any, ATxId: string, sResposta: Buffer, esTamanho: any) => number;

    // Métodos de cobrança com vencimento
    PIXCD_CriarCobranca: (handle: any, AInfCobVSolicitada: string, ATxId: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_ConsultarCobranca: (handle: any, ATxId: string, ARevisao: number, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_ConsultarCobrancasCobV: (handle: any, ADataInicio: number, ADataFim: number, ACpfCnpj: string, ALocationPresente: boolean, AStatus: number, PagAtual: number, ItensPorPagina: number, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_RevisarCobranca: (handle: any, AInfCobVRevisada: string, ATxId: string, sResposta: Buffer, esTamanho: any) => number;
    PIXCD_CancelarCobranca: (handle: any, ATxId: string, sResposta: Buffer, esTamanho: any) => number;

   
    // Métodos específicos do Matera

}


export default class ACBrLibPixCDBridge {
    private acbrlibNative: TypeACBrPIXCD;


    constructor(libraryPath: string) {
        const acbrpixcd = koffi.load(libraryPath);

        this.acbrlibNative = {

            // Métodos de inicialização/finalização
            PIXCD_Inicializar: acbrpixcd.func('PIXCD_Inicializar', 'int', ['void **', 'string', 'string']),
            PIXCD_Finalizar: acbrpixcd.func('PIXCD_Finalizar', 'int', ['void *']),

            // Métodos de configuração
            PIXCD_ConfigLer: acbrpixcd.func('PIXCD_ConfigLer', 'int', ['void *', 'string']),
            PIXCD_ConfigLerValor: acbrpixcd.func('PIXCD_ConfigLerValor', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            PIXCD_ConfigImportar: acbrpixcd.func('PIXCD_ConfigImportar', 'int', ['void *', 'string']),
            PIXCD_ConfigExportar: acbrpixcd.func('PIXCD_ConfigExportar', 'int', ['void *', 'char*', 'int*']),
            PIXCD_ConfigGravarValor: acbrpixcd.func('PIXCD_ConfigGravarValor', 'int', ['void *', 'string', 'string', 'string']),
            PIXCD_ConfigGravar: acbrpixcd.func('PIXCD_ConfigGravar', 'int', ['void *', 'string']),

            // Métodos comuns
            PIXCD_UltimoRetorno: acbrpixcd.func('PIXCD_UltimoRetorno', 'int', ['void *', 'char*', 'int*']),
            PIXCD_Nome: acbrpixcd.func('PIXCD_Nome', 'int', ['void *', 'char*', 'int*']),
            PIXCD_Versao: acbrpixcd.func('PIXCD_Versao', 'int', ['void *', 'char*', 'int*']),
            PIXCD_OpenSSLInfo: acbrpixcd.func('PIXCD_OpenSSLInfo', 'int', ['void *', 'char *', 'int *']),

            // Métodos específicos do PIX CD
            PIXCD_GerarQRCodeEstatico: acbrpixcd.func('PIXCD_GerarQRCodeEstatico', 'int', ['void *', 'double', 'string', 'string', 'char*', 'int*']),
            PIXCD_GerarQRCodeEstaticoComChavePix: acbrpixcd.func('PIXCD_GerarQRCodeEstaticoComChavePix', 'int', ['void *', 'string', 'double', 'string', 'string', 'char*', 'int*']),
            PIXCD_ConsultarPix: acbrpixcd.func('PIXCD_ConsultarPix', 'int', ['void *', 'string', 'char*', 'int*']),
            PIXCD_ConsultarPixRecebidos: acbrpixcd.func('PIXCD_ConsultarPixRecebidos', 'int', ['void *', 'double', 'double', 'string', 'string', 'int', 'int', 'char*', 'int*']),
            PIXCD_SolicitarDevolucaoPix: acbrpixcd.func('PIXCD_SolicitarDevolucaoPix', 'int', ['void *', 'string', 'string', 'string', 'char*', 'int*']),
            PIXCD_ConsultarDevolucaoPix: acbrpixcd.func('PIXCD_ConsultarDevolucaoPix', 'int', ['void *', 'string', 'string', 'char*', 'int*']),

            // Métodos de cobrança imediata
            PIXCD_CriarCobrancaImediata: acbrpixcd.func('PIXCD_CriarCobrancaImediata', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            PIXCD_ConsultarCobrancaImediata: acbrpixcd.func('PIXCD_ConsultarCobrancaImediata', 'int', ['void *', 'string', 'int', 'char*', 'int*']),
            PIXCD_ConsultarCobrancasCob: acbrpixcd.func('PIXCD_ConsultarCobrancasCob', 'int', ['void *', 'double', 'double', 'string', 'bool', 'int', 'int', 'int', 'char*', 'int*']),
            PIXCD_RevisarCobrancaImediata: acbrpixcd.func('PIXCD_RevisarCobrancaImediata', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            PIXCD_CancelarCobrancaImediata: acbrpixcd.func('PIXCD_CancelarCobrancaImediata', 'int', ['void *', 'string', 'char*', 'int*']),

            // Métodos de cobrança com vencimento
            PIXCD_CriarCobranca: acbrpixcd.func('PIXCD_CriarCobranca', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            PIXCD_ConsultarCobranca: acbrpixcd.func('PIXCD_ConsultarCobranca', 'int', ['void *', 'string', 'int', 'char*', 'int*']),
            PIXCD_ConsultarCobrancasCobV: acbrpixcd.func('PIXCD_ConsultarCobrancasCobV', 'int', ['void *', 'double', 'double', 'string', 'bool', 'int', 'int', 'int', 'char*', 'int*']),
            PIXCD_RevisarCobranca: acbrpixcd.func('PIXCD_RevisarCobranca', 'int', ['void *', 'string', 'string', 'char*', 'int*']),
            PIXCD_CancelarCobranca: acbrpixcd.func('PIXCD_CancelarCobranca', 'int', ['void *', 'string', 'char*', 'int*']),
        } as TypeACBrPIXCD;

    }
    public getAcbrlibNative(): TypeACBrPIXCD {
        return this.acbrlibNative as TypeACBrPIXCD;
    }
}