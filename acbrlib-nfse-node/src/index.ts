import ACBrLibDFeComum from "@projetoacbr/acbrlib-dfe-node/dist/src/dfe-comum";
import ACBrBuffer from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";
import { TAMANHO_PADRAO } from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";
import { TypeACBrLibNFSe } from "./bridge";
import ACBrLibNFSeBridgeMT from "./bridge";
import { ACBrLibResultCodes } from "@projetoacbr/acbrlib-base-node/dist/src/exception/ACBrLibResultCodes"
import { ACBrLibExecutandoMetodoError } from '@projetoacbr/acbrlib-base-node/dist/src/exception';

/**
 * @description ACBrLibNFSeMT é uma classe de alto nível que abstrai os métodos da ACBrLibNFSe Multi-thread<br/>
 * Esta classe permite que programadores de javascript/typescript usem a ACBrLibNFSe sem grandes preocupações.
 */

class ACBrLibNFSeMT extends ACBrLibDFeComum {

    /**
     * 
     * @param libraryPath é o caminho da biblioteca acbrlibnfse (*.so ou *.dll)
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     */
    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibNFSeBridgeMT(libraryPath).getAcbrNativeLib(), arquivoConfig, chaveCrypt)
    }

    public getAcbrlib(): TypeACBrLibNFSe;

    public getAcbrlib(): TypeACBrLibNFSe {
        return super.getAcbrlib() as TypeACBrLibNFSe //cast de any para TypeACBrLibNFSe
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DE ACBrLibBaseMT =====

    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().NFSE_Inicializar(handle, configPath, chaveCrypt)
    }

    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().NFSE_Finalizar(handle)
    }

    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFSE_UltimoRetorno(handle, mensagem, refTamanho)
    }

    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFSE_Nome(handle, nome, refTamanho)
    }

    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFSE_Versao(handle, versao, refTamanho)
    }

    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().NFSE_ConfigLer(handle, arqConfig)
    }

    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().NFSE_ConfigGravar(handle, arqConfig)
    }

    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFSE_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }

    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().NFSE_ConfigGravarValor(handle, sessao, chave, valor)
    }

    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().NFSE_ConfigImportar(handle, arqConfig)
    }

    protected LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFSE_ConfigExportar(handle, configuracoes, refTamanho)
    }

    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        throw new Error('LIB_OpenSSLInfo não está disponível para NFSe.');
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DE ACBrLibDFeComum =====

    protected LIB_CarregarXML(handle: any, arquivoXML: string): number {
        return this.getAcbrlib().NFSE_CarregarXML(handle, arquivoXML)
    }

    protected LIB_CarregarINI(handle: any, arquivoINI: string): number {
        return this.getAcbrlib().NFSE_CarregarINI(handle, arquivoINI)
    }

    protected LIB_ObterXml(handle: any, indice: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFSE_ObterXml(handle, indice, buffer, refTamanho)
    }

    protected LIB_GravarXml(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().NFSE_GravarXml(handle, indice, caminhoArquivo, nomeArquivo)
    }

    protected LIB_ObterIni(handle: any, indice: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFSE_ObterIni(handle, indice, buffer, refTamanho)
    }

    protected LIB_GravarIni(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().NFSE_GravarIni(handle, indice, caminhoArquivo, nomeArquivo)
    }

    protected LIB_LimparLista(handle: any): number {
        return this.getAcbrlib().NFSE_LimparLista(handle)
    }

    protected LIB_ObterCertificados(handle: any, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFSE_ObterCertificados(handle, buffer, refTamanho)
    }

    protected LIB_ImprimirPDF(handle: any): number {
        return this.getAcbrlib().NFSE_ImprimirPDF(handle)
    }

    protected LIB_SalvarPDF(handle: any, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFSE_SalvarPDF(handle, buffer, refTamanho)
    }

    protected LIB_EnviarEmail(handle: any, ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        return this.getAcbrlib().NFSE_EnviarEmail(handle, ePara, eXMLDocumento, enviaPDF, eAssunto, eMensagem, eCC, eAnexos)
    }

    protected LIB_EnviarEvento(handle: any, idLote: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFSE_EnviarEvento(handle, buffer, refTamanho)
    }

    // ===== MÉTODOS ESPECÍFICOS DO NFSe =====

    /**
     * Método usado para emitir NFSe
     * @param xml - XML da NFSe
     * @param aLote - Número do lote
     * @param imprimir - Se true imprime a NFSe
     * @returns String contendo o resultado da emissão
     */
    public emitir(xml: string, aLote: number, imprimir: boolean): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_Emitir(this.getHandle(), xml, aLote, imprimir, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para substituir NFSe
     * @param xml - XML da NFSe substituta
     * @param aLote - Número do lote
     * @returns String contendo o resultado da substituição
     */
    public substituirNFSe(xml: string, aLote: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_SubstituirNFSe(this.getHandle(), xml, aLote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar link da NFSe
     * @param xml - XML da NFSe
     * @returns String contendo o link da NFSe
     */
    public linkNFSe(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_LinkNFSe(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar lote
     * @param xml - XML da NFSe
     * @returns String contendo o resultado da geração do lote
     */
    public gerarLote(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_GerarLote(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar token
     * @param xml - XML da NFSe
     * @returns String contendo o token gerado
     */
    public gerarToken(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_GerarToken(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por número
     * @param xml - XML da NFSe
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorNumero(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorNumero(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por período
     * @param xml - XML da NFSe
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorPeriodo(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorPeriodo(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para obter DANFSE
     * @param xml - XML da NFSe
     * @returns String contendo o DANFSE
     */
    public obterDANFSE(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ObterDANFSE(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar parâmetros
     * @param xml - XML da NFSe
     * @returns String contendo os parâmetros
     */
    public consultarParametros(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarParametros(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para cancelar NFSe
     * @param xml - XML da NFSe
     * @param protocolo - Protocolo de autorização
     * @param motivo - Motivo do cancelamento
     * @param aLote - Número do lote
     * @returns String contendo o resultado do cancelamento
     */
    public cancelarNFSe(xml: string, protocolo: string, motivo: string, aLote: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_Cancelar(this.getHandle(), xml, protocolo, motivo, aLote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }



    /**
     * Método usado para imprimir NFSe
     * @param impressora - Nome da impressora
     * @param numCopias - Número de cópias
     * @param gerarPDF - Se deve gerar PDF
     * @param mostrarPreview - Se deve mostrar preview
     * @param cancelada - Se é NFSe cancelada
     * @returns Código de status da operação
     */
    public imprimir(impressora: string, numCopias: number, gerarPDF: string, mostrarPreview: string, cancelada: string): number {
        let status = this.getAcbrlib().NFSE_Imprimir(this.getHandle(), impressora, numCopias, gerarPDF, mostrarPreview, cancelada)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para consultar situação da NFSe
     * @param xml - XML da NFSe
     * @returns String contendo o resultado da consulta
     */
    public consultarSituacao(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarSituacao(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar lote de RPS
     * @param protocolo - Protocolo de autorização
     * @returns String contendo o resultado da consulta
     */
    public consultarLoteRPS(protocolo: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarLoteRps(this.getHandle(), protocolo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por RPS
     * @param xml - XML da NFSe
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorRPS(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorRps(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA ADICIONAIS =====

    /**
     * Método usado para consultar NFSe por faixa
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorFaixa(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorFaixa(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consulta genérica de NFSe
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeGenerico(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeGenerico(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA DE SERVIÇOS PRESTADOS =====

    /**
     * Método usado para consultar NFSe de serviços prestados por número
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorNumero(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorNumero(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços prestados por período
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorPeriodo(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorPeriodo(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços prestados por tomador
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorTomador(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorTomador(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços prestados por intermediário
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorIntermediario(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorIntermediario(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA DE SERVIÇOS TOMADOS =====

    /**
     * Método usado para consultar NFSe de serviços tomados por número
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorNumero(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorNumero(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por prestador
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorPrestador(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorPrestador(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por tomador
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorTomador(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorTomador(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por período
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorPeriodo(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorPeriodo(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por intermediário
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorIntermediario(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorIntermediario(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA ADICIONAIS =====

    /**
     * Método usado para consultar DPS por chave
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarDPSPorChave(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarDPSPorChave(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por chave
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorChave(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorChave(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar evento
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarEvento(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarEvento(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar DFe
     * @param xml - XML da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarDFe(xml: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarDFe(this.getHandle(), xml, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }



    // ===== MÉTODOS DE MANIPULAÇÃO DE ARQUIVOS =====




    
    // ===== MÉTODO DE VERIFICAÇÃO DE ERROS =====

    _checkResult(result: number): void {

        // se o resultado é maior ou igual a OK, não há erro
        if (!this._isResultErrorCode(result)) {
            return;
        }

        super._checkResult(result);

        // Para NFSe, vamos usar um tratamento de erro genérico
        throw new Error(`Erro NFSe: ${this.ultimoRetorno()}`);
    }

}

export default ACBrLibNFSeMT