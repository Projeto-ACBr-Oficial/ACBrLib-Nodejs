
//#region Imports e Dependências
import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src";
import ACBrLibPixCDBridge,{TypeACBrPIXCD} from "./bridge";
import ACBrBuffer,{TAMANHO_PADRAO} from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";
import { ACBrDateConverter } from "@projetoacbr/acbrlib-base-node/dist/src/utils";
//#endregion


/**
 * Enum para status da cobrança PIX
 * @enum StatusCobrancaPIX
 * @property NENHUM Nenhum
 * @property ATIVA Ativa
 * @property CONCLUIDA Concluída
 * @property REMOVIDA_PELO_USUARIO_RECEBEDOR Removida pelo usuário recebedor
 * @property REMOVIDA_PELO_PSP Removida pelo PSP
 */
export enum StatusCobrancaPIX {
    NENHUM, ATIVA, CONCLUIDA, REMOVIDA_PELO_USUARIO_RECEBEDOR, REMOVIDA_PELO_PSP
};

/**
 * Enum para Provedor de Serviços de Pagamento PIX
 * @enum PSP
 * @property BRADESCO Bradesco
 * @property ITAU Itaú
 * @property BANCO_DO_BRASIL Banco do Brasil
 * @property SANTANDER Santander
 * @property SHIPAY Shipay
 * @property SICREDI Sicredi
 * @property SICOOB Sicoob
 * @property PAGSEGURO PagSeguro
 * @property GERENCIANET GerenciaNet
 * @property PIXPDV PixPDV
 * @property INTER Inter
 * @property AILOS Ailos
 * @property MATERA Matera
 * @property CIELO Cielo
 * @property MERCADOPAGO MercadoPago
 * @property GATE2ALL Gate2All
 * @property BANRISUL Banrisul
 * @property C6BANK C6Bank
 * @property APPLESS AppLess
 */
export enum PSP {
    BRADESCO = 0,
    ITAU = 1,
    BANCO_DO_BRASIL = 2,
    SANTANDER = 3,
    SHIPAY = 4,
    SICREDI = 5,
    SICOOB = 6,
    PAGSEGURO = 7,
    GERENCIANET = 8,
    PIXPDV = 9,
    INTER = 10,
    AILOS = 11,
    MATERA = 12,
    CIELO = 13,
    MERCADOPAGO = 14,
    GATE2ALL = 15,
    BANRISUL = 16,
    C6BANK = 17,
    APPLESS = 18
};




/** 
 * ACBrLibPixCDMT é uma classe de alto nível que implementa os métodos da ACBrLibPixCD Multi-Thread
 */

export default class ACBrLibPixCDMT extends ACBrLibBaseMT {

    //#region Constructor
    /**
     * 
     * @param libraryPath caminho para a biblioteca ACBrLibPixCD, note para windows a dll usa convenção de chamada cdecl
     * @param arquivoConfig arquivo de configuração
     * @param chaveCrypt chave de criptografia
     */
    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibPixCDBridge(libraryPath).getAcbrlibNative(), arquivoConfig, chaveCrypt);
    }
    //#endregion



    //#region Métodos Públicos Base
    public getAcbrlib(): TypeACBrPIXCD ;

    public getAcbrlib(): TypeACBrPIXCD {
        return super.getAcbrlib() as TypeACBrPIXCD;
    }
    //#endregion





    //#region Implementação dos Métodos Abstratos da Classe Base
    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().PIXCD_Inicializar(handle, configPath, chaveCrypt)
    }

    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().PIXCD_Finalizar(handle)
    }

    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_UltimoRetorno(handle, mensagem, refTamanho)
    }

    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_Nome(handle, nome, refTamanho)
    }

    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_Versao(handle, versao, refTamanho)
    }

    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().PIXCD_ConfigLer(handle, arqConfig)
    }

    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().PIXCD_ConfigGravar(handle, arqConfig)
    }

    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }

    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().PIXCD_ConfigGravarValor(handle, sessao, chave, valor)
    }

    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().PIXCD_ConfigImportar(handle, arqConfig)
    }

    protected LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_ConfigExportar(handle, configuracoes, refTamanho)
    }

    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_OpenSSLInfo(handle, configuracoes, refTamanho)
    }
    //#endregion

    //#region Métodos PIX Básicos - QR Code e Consultas
    /**
     * Método usado para gerar um QR Code estático
     * @param valor Valor da transação pix
     * @param infoAdicional Informação adicional
     * @param txID ID da transação
     * @returns String contendo o QR Code gerado
     */
    public gerarQRCodeEstatico(valor: number, infoAdicional: string, txID: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_GerarQRCodeEstatico(this.getHandle(), valor, infoAdicional, txID, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar um pix
     * @param e2eid  End-to-End IDentification (Identificação de Ponta a Ponta).
     * @returns String contendo o resultado da consulta
     */
    public consultarPix(e2eid: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_ConsultarPix(this.getHandle(), e2eid, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }
    //#endregion

    //#region Métodos PIX - Devoluções
    /**
     * Método usado para solicitar uma devolução de pix
     * @param infDevolucao Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @param e2eid End-to-End IDentification (Identificação de Ponta a Ponta).
     * @param aidDevolucao ID Devolução PIX.
     * @returns String contendo o resultado da solicitação
     */
    public solicitarDevolucaoPix(infDevolucao: string, e2eid: string, aidDevolucao: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_SolicitarDevolucaoPix(this.getHandle(), infDevolucao, e2eid, aidDevolucao, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar uma devolução de pix
     * @param e2eid End-to-End IDentification (Identificação de Ponta a Ponta).
     * @param aidDevolucao ID Devolução PIX.
     * @returns String contendo o resultado da consulta
     */
    public consultarDevolucaoPix(e2eid: string, aidDevolucao: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_ConsultarDevolucaoPix(this.getHandle(), e2eid, aidDevolucao, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }
    //#endregion


    //#region Endpoint /cob - Cobranças Imediatas
    /**
     * Cria uma nova cobrança imediata
     * @param infCobSolicitada Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @param txID Identificador da Transação PIX. O conteúdo de ATxId deve respeitar o formato: [a-zA-Z0-9]{26,35}  
     * @returns String contendo o resultado da criação da cobrança
     */
    public criarCobrancaImediata(infCobSolicitada: string, txID: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_CriarCobrancaImediata(this.getHandle(), infCobSolicitada, txID, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar uma cobrança imediata
     * @param txID ID da transação PIX.
     * @param revisao Revisão da cobrança PIX.
     * @returns String contendo o resultado da consulta
     */
    public consultarCobrancaImediata(txID: string, revisao: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_ConsultarCobrancaImediata(this.getHandle(), txID, revisao, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar cobranças cob
     * @param dataInicio  Data de início da consulta (observação data será convertida para Pascal TDateTime)
     * @param dataFim Data de fim da consulta (observação data será convertida para Pascal TDateTime)
     * @param cpfCnpj CPF/CNPJ do recebedor
     * @param locationPresente Indica se a localização está presente
     * @param status Status da cobrança
     * @param pagAtual Página atual
     * @param itensPorPagina Itens por página
     * @returns String contendo o resultado da consulta
     */
    public consultarCobrancasCob(dataInicio: Date, dataFim: Date, cpfCnpj: string, locationPresente: boolean, status: number, pagAtual: number, itensPorPagina: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let dataInicioNumber = ACBrDateConverter.convertDateToPascalTDateTime(dataInicio)
        let dataFimNumber = ACBrDateConverter.convertDateToPascalTDateTime(dataFim)
        let result = this.getAcbrlib().PIXCD_ConsultarCobrancasCob(this.getHandle() , dataInicioNumber, dataFimNumber, cpfCnpj, locationPresente, status, pagAtual, itensPorPagina, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(result)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para revisar uma cobrança imediata
     * @param infCobRevisada Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @param txID ID da transação PIX.
     * @returns String contendo o resultado da revisão da cobrança
     */
    public revisarCobrancaImediata(infCobRevisada: string, txID: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_RevisarCobrancaImediata(this.getHandle(), infCobRevisada, txID, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    public cancelarCobrancaImediata(txID: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_CancelarCobrancaImediata(this.getHandle(), txID, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }
    //#endregion

    //#region Endpoint /cobv - Cobranças com Vencimento
    public criarCobranca(infCobVSolicitada: string, txID: string): string {

        /**
         * Cria uma nova cobrança com vencimento
         * @param infCobVSolicitada Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
         * @param txID Identificador da Transação PIX. O conteúdo de ATxId deve respeitar o formato: [a-zA-Z0-9]{26,35}  
         * @returns String contendo o resultado da criação da cobrança
         */
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_CriarCobranca(this.getHandle(), infCobVSolicitada, txID, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar uma cobrança com vencimento
     * @param txID ID da transação PIX.
     * @param revisao Revisão da cobrança PIX.
     * @returns String contendo o resultado da consulta
     */
    public consultarCobranca(txID: string, revisao: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_ConsultarCobranca(this.getHandle(), txID, revisao, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }



    /**
     * Método usado para consultar cobranças com vencimento
     * @param dataInicio Data de início da consulta (observação data será convertida para Pascal TDateTime)
     * @param dataFim Data de fim da consulta (observação data será convertida para Pascal TDateTime)
     * @param cpfCnpj CPF/CNPJ do recebedor
     * @param locationPresente Indica se a localização está presente
     * @param status Status da cobrança
     * @param pagAtual Página atual
     * @param itensPorPagina Itens por página
     * @returns String contendo o resultado da consulta
     */

    public consultarCobrancasCobV(dataInicio: Date, dataFim: Date, cpfCnpj: string, locationPresente: boolean, status: StatusCobrancaPIX, pagAtual: number, itensPorPagina: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let dataInicioNumber = ACBrDateConverter.convertDateToPascalTDateTime(dataInicio)
        let dataFimNumber = ACBrDateConverter.convertDateToPascalTDateTime(dataFim)
        let result = this.getAcbrlib().PIXCD_ConsultarCobrancasCobV(this.getHandle() , dataInicioNumber, dataFimNumber, cpfCnpj, locationPresente, status, pagAtual, itensPorPagina, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(result)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para revisar uma cobrança com vencimento
     * @param infCobVRevisada Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @param txID ID da transação PIX.
     * @returns String contendo o resultado da revisão da cobrança
     */

    public revisarCobranca(infCobVRevisada: string, txID: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_RevisarCobranca(this.getHandle(), infCobVRevisada, txID, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para cancelar uma cobrança com vencimento
     * @param txID ID da transação PIX.
     * @returns String contendo o resultado da cancelação da cobrança
     */

    public cancelarCobranca(txID: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().PIXCD_CancelarCobranca(this.getHandle(), txID, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }   

    //#endregion
    
}