import ACBrLibDFeComum from "@projetoacbr/acbrlib-dfe-node/dist/src/dfe-comum";
import ACBrBuffer from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";
import { TAMANHO_PADRAO } from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";
import { TypeACBrLibNFSe } from "./bridge";
import ACBrLibNFSeBridgeMT from "./bridge";
import { ACBrDateConverter } from "@projetoacbr/acbrlib-base-node/dist/src/utils";

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

    // ===== MÉTODOS ESPECÍFICOS DO NFSe =====


    /**
     * Método usado para enviar um evento NFSe.
     * @param infoEvento Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @returns string com resultado do envio do evento.
     */
    public enviarEvento(infoEvento: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_EnviarEvento(this.getHandle(), infoEvento, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

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
     * @param numeroNFSe - Número da NFSe
     * @param serieNFSe - Série da NFSe  
     * @param codigoCancelamento - Código de cancelamento
     * @param motivoCancelamento - Motivo do cancelamento
     * @param numeroLote - Número do lote
     * @param codigoVerificacao - Código de verificação
     * @returns String contendo o resultado da substituição
     */
    public substituirNFSe(numeroNFSe: string, serieNFSe: string, codigoCancelamento: string, motivoCancelamento: string, numeroLote: string, codigoVerificacao: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_SubstituirNFSe(this.getHandle(), numeroNFSe, serieNFSe, codigoCancelamento, motivoCancelamento, numeroLote, codigoVerificacao, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar link da NFSe
     * @param numeroNFSe - Número da NFSe
     * @param codigoVerificacao - Código de verificação
     * @param chaveAcesso - Chave de acesso
     * @param valorServico - Valor do serviço
     * @returns String contendo o link da NFSe
     */
    public linkNFSe(numeroNFSe: string, codigoVerificacao: string, chaveAcesso: string, valorServico: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_LinkNFSe(this.getHandle(), numeroNFSe, codigoVerificacao, chaveAcesso, valorServico, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar lote
     * @param lote - Lote
     * @param qtdMaximaRps - Quantidade máxima de RPS
     * @param modoEnvio - Modo de envio
     * @returns String contendo o resultado da geração do lote
     */
    public gerarLote(lote: string, qtdMaximaRps: number, modoEnvio: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_GerarLote(this.getHandle(), lote, qtdMaximaRps, modoEnvio, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar token
     * @returns String contendo o token gerado
     */
    public gerarToken(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_GerarToken(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por número
     * @param numero - Número da NFSe
     * @param pagina - Página da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorNumero(numero: string, pagina: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorNumero(this.getHandle(), numero, pagina, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por período
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param pagina - Página da consulta
     * @param numeroLote - Número do lote
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorPeriodo(dataInicial: Date, dataFinal: Date, pagina: number, numeroLote: string, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorPeriodo(this.getHandle(), dataInicialPascal, dataFinalPascal, pagina, numeroLote, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para obter DANFSE
     * @param chaveNFSe - Chave da NFSe
     * @returns String contendo o DANFSE
     */
    public obterDANFSE(chaveNFSe: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ObterDANFSE(this.getHandle(), chaveNFSe, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar parâmetros
     * @param tipoParametroMunicipio - Tipo do parâmetro do município
     * @param codigoServico - Código do serviço
     * @param competencia - Data de competência
     * @param numeroBeneficio - Número do benefício
     * @returns String contendo os parâmetros
     */
    public consultarParametros(tipoParametroMunicipio: number, codigoServico: string, competencia: Date, numeroBeneficio: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const competenciaPascal = ACBrDateConverter.convertDateToPascalTDateTime(competencia)
        let status = this.getAcbrlib().NFSE_ConsultarParametros(this.getHandle(), tipoParametroMunicipio, codigoServico, competenciaPascal, numeroBeneficio, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
     * @param protocolo - Protocolo de consulta
     * @param numLote - Número do lote
     * @returns String contendo o resultado da consulta
     */
    public consultarSituacao(protocolo: string, numLote: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarSituacao(this.getHandle(), protocolo, numLote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar lote de RPS
     * @param protocolo - Protocolo de autorização
     * @param numLote - Número do lote
     * @returns String contendo o resultado da consulta
     */
    public consultarLoteRPS(protocolo: string, numLote: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarLoteRps(this.getHandle(), protocolo, numLote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por RPS
     * @param numeroRps - Número do RPS
     * @param serie - Série do RPS
     * @param tipo - Tipo do RPS
     * @param codigoVerificacao - Código de verificação
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorRPS(numeroRps: string, serie: string, tipo: string, codigoVerificacao: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorRps(this.getHandle(), numeroRps, serie, tipo, codigoVerificacao, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA ADICIONAIS =====

    /**
     * Método usado para consultar NFSe por faixa
     * @param numeroInicial - Número inicial da faixa
     * @param numeroFinal - Número final da faixa
     * @param pagina - Página da consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorFaixa(numeroInicial: string, numeroFinal: string, pagina: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorFaixa(this.getHandle(), numeroInicial, numeroFinal, pagina, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consulta genérica de NFSe
     * @param infConsultaNFSe - Informações da consulta NFSe
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeGenerico(infConsultaNFSe: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeGenerico(this.getHandle(), infConsultaNFSe, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar link de NFSe
     * @param infConsultaLinkNFSe - Informações da consulta do link NFSe
     * @returns String contendo o resultado da consulta
     */
    public consultarLinkNFSe(infConsultaLinkNFSe: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarLinkNFSe(this.getHandle(), infConsultaLinkNFSe, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA DE SERVIÇOS PRESTADOS =====

    /**
     * Método usado para consultar NFSe de serviços prestados por número
     * @param numero - Número da NFSe
     * @param pagina - Página da consulta
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorNumero(numero: string, pagina: number, dataInicial: Date, dataFinal: Date, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorNumero(this.getHandle(), numero, pagina, dataInicialPascal, dataFinalPascal, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços prestados por período
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param pagina - Página da consulta
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorPeriodo(dataInicial: Date, dataFinal: Date, pagina: number, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorPeriodo(this.getHandle(), dataInicialPascal, dataFinalPascal, pagina, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços prestados por tomador
     * @param cnpj - CNPJ do tomador
     * @param inscMun - Inscrição municipal
     * @param pagina - Página da consulta
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorTomador(cnpj: string, inscMun: string, pagina: number, dataInicial: Date, dataFinal: Date, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorTomador(this.getHandle(), cnpj, inscMun, pagina, dataInicialPascal, dataFinalPascal, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços prestados por intermediário
     * @param cnpj - CNPJ do intermediário
     * @param inscMun - Inscrição municipal
     * @param pagina - Página da consulta
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoPrestadoPorIntermediario(cnpj: string, inscMun: string, pagina: number, dataInicial: Date, dataFinal: Date, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoPrestadoPorIntermediario(this.getHandle(), cnpj, inscMun, pagina, dataInicialPascal, dataFinalPascal, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA DE SERVIÇOS TOMADOS =====

    /**
     * Método usado para consultar NFSe de serviços tomados por número
     * @param numero - Número da NFSe
     * @param pagina - Página da consulta
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorNumero(numero: string, pagina: number, dataInicial: Date, dataFinal: Date, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorNumero(this.getHandle(), numero, pagina, dataInicialPascal, dataFinalPascal, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por prestador
     * @param cnpj - CNPJ do prestador
     * @param inscMun - Inscrição municipal
     * @param pagina - Página da consulta
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorPrestador(cnpj: string, inscMun: string, pagina: number, dataInicial: Date, dataFinal: Date, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorPrestador(this.getHandle(), cnpj, inscMun, pagina, dataInicialPascal, dataFinalPascal, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por tomador
     * @param cnpj - CNPJ do tomador
     * @param inscMun - Inscrição municipal
     * @param pagina - Página da consulta
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorTomador(cnpj: string, inscMun: string, pagina: number, dataInicial: Date, dataFinal: Date, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorTomador(this.getHandle(), cnpj, inscMun, pagina, dataInicialPascal, dataFinalPascal, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por período
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param pagina - Página da consulta
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorPeriodo(dataInicial: Date, dataFinal: Date, pagina: number, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorPeriodo(this.getHandle(), dataInicialPascal, dataFinalPascal, pagina, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe de serviços tomados por intermediário
     * @param cnpj - CNPJ do intermediário
     * @param inscMun - Inscrição municipal
     * @param pagina - Página da consulta
     * @param dataInicial - Data inicial do período
     * @param dataFinal - Data final do período
     * @param tipoPeriodo - Tipo do período
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSeServicoTomadoPorIntermediario(cnpj: string, inscMun: string, pagina: number, dataInicial: Date, dataFinal: Date, tipoPeriodo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const dataInicialPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataInicial)
        const dataFinalPascal = ACBrDateConverter.convertDateToPascalTDateTime(dataFinal)
        let status = this.getAcbrlib().NFSE_ConsultarNFSeServicoTomadoPorIntermediario(this.getHandle(), cnpj, inscMun, pagina, dataInicialPascal, dataFinalPascal, tipoPeriodo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS DE CONSULTA ADICIONAIS =====

    /**
     * Método usado para consultar DPS por chave
     * @param chaveDPS - Chave do DPS para consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarDPSPorChave(chaveDPS: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarDPSPorChave(this.getHandle(), chaveDPS, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar NFSe por chave
     * @param chaveNFSe - Chave da NFSe para consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarNFSePorChave(chaveNFSe: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarNFSePorChave(this.getHandle(), chaveNFSe, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar evento
     * @param chave - Chave do evento
     * @param tipoEvento - Tipo do evento
     * @param numSeq - Número sequencial
     * @returns String contendo o resultado da consulta
     */
    public consultarEvento(chave: string, tipoEvento: number, numSeq: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarEvento(this.getHandle(), chave, tipoEvento, numSeq, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar DFe
     * @param nsu - NSU para consulta
     * @returns String contendo o resultado da consulta
     */
    public consultarDFe(nsu: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ConsultarDFe(this.getHandle(), nsu, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para obter informações do provedor
     * @returns String contendo as informações do provedor
     */
    public obterInformacoesProvedor(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFSE_ObterInformacoesProvedor(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


}

export default ACBrLibNFSeMT