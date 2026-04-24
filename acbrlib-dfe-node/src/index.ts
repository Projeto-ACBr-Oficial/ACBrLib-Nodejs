import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src"
import ACBrBuffer from '@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer'
import { TAMANHO_PADRAO } from '@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer'
import ACBrLibDFeComum from "./dfe-comum";

/**
 * @description ACBrLibDFeMT é uma classe de alto nível que abstrai os métodos comuns a NFe e MDFe
 * As classes que herdam desta classe devem implementar os métodos LIB_* abstratos.
 * * DFe: Documento Fiscal Eletrônico

 */
export default abstract class ACBrLibDFeMT extends ACBrLibDFeComum {

    constructor(acbrlib: any, arquivoConfig: string, chaveCrypt: string) {
        super(acbrlib, arquivoConfig, chaveCrypt)
    }

    // ===== MÉTODOS PARA CARREGAMENTO E MANIPULAÇÃO DE DFeS =====

    /**
     * Método usado para carregar um arquivo XML de evento para processamento
     * @param arquivoXML - Caminho do arquivo XML ou conteúdo XML do evento
     * @returns Código de status da operação
     */
    public carregarEventoXML(arquivoXML: string): number {
        let status = this.LIB_CarregarEventoXML(this.getHandle(), arquivoXML)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para carregar um arquivo INI de evento para processamento
     * @param arquivoINI - Caminho do arquivo INI ou conteúdo INI do evento
     * @returns Código de status da operação
     */
    public carregarEventoINI(arquivoINI: string): number {
        let status = this.LIB_CarregarEventoINI(this.getHandle(), arquivoINI)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para limpar a lista de eventos carregados
     * @returns Código de status da operação
     */
    public limparListaEventos(): number {
        let status = this.LIB_LimparListaEventos(this.getHandle())
        this._checkResult(status)
        return status
    }



    // ===== MÉTODOS PARA VALIDAÇÃO E ASSINATURA =====

    /**
     * Método usado para assinar o DFe
     * @returns Código de status da operação
     */
    public assinar(): number {
        let status = this.LIB_Assinar(this.getHandle())
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para validar o DFe
     * @returns Código de status da operação
     */
    public validar(): number {
        let status = this.LIB_Validar(this.getHandle())
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para validar as regras de negócio do DFe
     * @returns String contendo o resultado da validação
     */
    public validarRegrasdeNegocios(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ValidarRegrasdeNegocios(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para verificar a assinatura do DFe
     * @returns String contendo o resultado da verificação
     */
    public verificarAssinatura(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_VerificarAssinatura(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar a chave do DFe
     * @param ACodigoUF - Código da UF
     * @param ACodigoNumerico - Código numérico
     * @param AModelo - Modelo do DFe
     * @param ASerie - Série do DFe
     * @param ANumero - Número do DFe
     * @param ATpEmi - Tipo de emissão
     * @param AEmissao - Data de emissão
     * @param ACNPJCPF - CNPJ/CPF
     * @returns String contendo a chave gerada
     */
    public gerarChave(
        ACodigoUF: number, ACodigoNumerico: number, AModelo: number,
        ASerie: number, ANumero: number, ATpEmi: number,
        AEmissao: string, ACNPJCPF: string
    ): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_GerarChave(
            this.getHandle(), ACodigoUF, ACodigoNumerico, AModelo,
            ASerie, ANumero, ATpEmi, AEmissao, ACNPJCPF,
            acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer()
        )
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para obter o caminho do evento
     * @param codigoEvento - Código do evento
     * @returns String contendo o caminho do evento
     */
    public getPathEvento(codigoEvento: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_GetPathEvento(this.getHandle(), codigoEvento, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS PARA CONSULTA E STATUS =====

    /**
     * Método usado para consultar o status do serviço
     * @returns String contendo o status do serviço
     */
    public statusServico(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_StatusServico(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar o DFe
     * @param eChaveOuDFe - Chave ou path do DFe ou conteúdo XML do DFe
     * @param AExtrairEventos - Se true extrai os eventos
     * @returns String contendo o resultado da consulta
     */
    public consultar(eChaveOuDFe: string, AExtrairEventos: boolean): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_Consultar(this.getHandle(), eChaveOuDFe, AExtrairEventos, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar o recibo
     * @param recibo - Número do recibo
     * @returns String contendo o resultado da consulta
     */
    public consultarRecibo(recibo: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ConsultarRecibo(this.getHandle(), recibo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS PARA IMPRESSÃO =====

    /**
     * Método usado para imprimir o DFe
     * @param cImpressora - Nome da impressora
     * @param nNumCopias - Número de cópias
     * @param cProtocolo - Protocolo
     * @param bMostrarPreview - Se true mostra preview
     * @param cMarcaDagua - Marca d'água
     * @param bViaConsumidor - Se true imprime via do consumidor
     * @param bSimplificado - Se true imprime simplificado
     * @returns Código de status da operação
     */
    public imprimir(
        cImpressora: string, nNumCopias: number, cProtocolo: string,
        bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string
    ): number {
        let status = this.LIB_Imprimir(
            this.getHandle(), cImpressora, nNumCopias, cProtocolo,
            bMostrarPreview, cMarcaDagua, bViaConsumidor, bSimplificado
        )
        this._checkResult(status)
        return status
    }

    // ===== MÉTODOS PARA ENVIO E CANCELAMENTO =====


    /**
     * Método usado para cancelar o DFe
     * @param chave - Chave do DFe
     * @param justificativa - Justificativa do cancelamento
     * @param CNPJ - CNPJ do autorizador
     * @param lote - Número do lote
     * @returns String contendo o resultado do cancelamento
     */
    public cancelar(chave: string, justificativa: string, CNPJ: string, lote: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_Cancelar(this.getHandle(), chave, justificativa, CNPJ, lote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS PARA IMPRESSÃO DE EVENTOS =====

    /**
     * Método usado para imprimir evento
     * @param eArquivoXmlDFe - Arquivo XML do DFe para impressão
     * @param eArquivoXmlEvento - Arquivo XML do evento para impressão
     * @returns Código de status da operação
     */
    public imprimirEvento(eArquivoXmlDFe: string, eArquivoXmlEvento: string): number {
        let status = this.LIB_ImprimirEvento(this.getHandle(), eArquivoXmlDFe, eArquivoXmlEvento)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para imprimir evento em PDF
     * @param eArquivoXmlDFe - Arquivo XML do DFe para impressão
     * @param eArquivoXmlEvento - Arquivo XML do evento para impressão
     * @returns String contendo o resultado da operação
     */
    public imprimirEventoPDF(eArquivoXmlDFe: string, eArquivoXmlEvento: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ImprimirEventoPDF(this.getHandle(), eArquivoXmlDFe, eArquivoXmlEvento)
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para salvar evento em PDF
     * @param eArquivoXmlDFe - Arquivo XML do DFe
     * @param eArquivoXmlEvento - Arquivo XML do evento
     * @returns String contendo o PDF em formato Base64
     */
    public salvarEventoPDF(eArquivoXmlDFe: string, eArquivoXmlEvento: string): string {
        using buffer: ACBrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_SalvarEventoPDF(this.getHandle(), eArquivoXmlDFe, eArquivoXmlEvento, buffer.getBuffer(), buffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(buffer)
    }

    // ===== MÉTODOS PARA COMUNICAÇÃO =====

    /**
     * Método usado para enviar e-mail
     * @param ePara - Endereço de e-mail do destinatário
     * @param eXMLDFe - Path do XML do DFe a ser anexado ao e-mail.
     * @param enviaPDF - Se true gera o PDF e anexa ao e-mail
     * @param eAssunto - Assunto do e-mail
     * @param eCC - Endereços de e-mail em cópia (separados por ponto e vírgula)
     * @param eAnexos - Caminho de arquivos adicionais para anexar (separados por ponto e vírgula)
     * @param eMensagem - Mensagem do e-mail
     * @returns Código de status da operação
     */
    public enviarEmail(ePara: string, eXMLDFe: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        const status = this.LIB_EnviarEmail(this.getHandle(), ePara, eXMLDFe, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para enviar e-mail de evento
     * @param ePara - Endereço de e-mail do destinatário
     * @param eChaveEvento - Chave do evento do Evento a ser anexado ao e-mail.
     * @param eChaveDFe - Chave ou Path do DFe a ser anexado ao e-mail.
     * @param enviaPDF - Se true gera o PDF e anexa ao e-mail
     * @param eAssunto - Assunto do e-mail
     * @param eCC - Endereços de e-mail em cópia (separados por ponto e vírgula)
     * @param eAnexos - Caminho de arquivos adicionais para anexar (separados por ponto e vírgula)
     * @param eMensagem - Mensagem do e-mail
     * @returns Código de status da operação
     */
    public enviarEmailEvento(ePara: string, eChaveEvento: string, eChaveDFe: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        const status = this.LIB_EnviarEmailEvento(this.getHandle(), ePara, eChaveEvento, eChaveDFe, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para enviar evento
     * @param idLote - ID do lote
     * @returns String contendo o resultado do envio
     */
    public enviarEvento(idLote: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_EnviarEvento(this.getHandle(), idLote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    // ===== MÉTODOS PARA DISTRIBUIÇÃO DFe =====

    /**
     * Método usado para consultar distribuição DFe por último NSU
     * @param ufAutor - UF do autorizador
     * @param eCNPJCPF - CNPJ/CPF
     * @param eultNSU - Último NSU
     * @returns String contendo o resultado da consulta
     */
    public distribuicaoDFePorUltNSU(ufAutor: number, eCNPJCPF: string, eultNSU: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_DistribuicaoDFePorUltNSU(this.getHandle(), ufAutor, eCNPJCPF, eultNSU, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar distribuição DFe por NSU
     * @param ufAutor - UF do autorizador
     * @param eCNPJCPF - CNPJ/CPF
     * @param eNSU - NSU
     * @returns String contendo o resultado da consulta
     */
    public distribuicaoDFePorNSU(ufAutor: number, eCNPJCPF: string, eNSU: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_DistribuicaoDFePorNSU(this.getHandle(), ufAutor, eCNPJCPF, eNSU, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para consultar distribuição DFe por chave
     * @param ufAutor - UF do autorizador
     * @param eCNPJCPF - CNPJ/CPF
     * @param eChave - Chave do DFe
     * @returns String contendo o resultado da consulta
     */
    public distribuicaoDFePorChave(ufAutor: number, eCNPJCPF: string, eChave: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_DistribuicaoDFePorChave(this.getHandle(), ufAutor, eCNPJCPF, eChave, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * Método usado para obter o caminho do DFe
     * @param tipo - Tipo de path que será retornado:
     * @returns String contendo o caminho do DFe
     */
    public getPath(tipo: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_GetPath(this.getHandle(), tipo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }



    // ===== MÉTODOS ABSTRATOS QUE DEVEM SER IMPLEMENTADOS PELAS CLASSES FILHAS =====

    protected abstract LIB_GetPath(handle: any, tipo: number, buffer: Buffer, refTamanho: any): number
    // 📄 Métodos de Eventos (específicos de NFe/MDFe)
    protected abstract LIB_CarregarEventoXML(handle: any, arquivoXML: string): number
    protected abstract LIB_CarregarEventoINI(handle: any, arquivoINI: string): number
    protected abstract LIB_LimparListaEventos(handle: any): number

    // 📄 Métodos de Gravação (específicos de NFe/MDFe)
    protected abstract LIB_GravarXml(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number
    protected abstract LIB_GravarIni(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number

    // 🔐 Métodos de Validação e Assinatura (específicos de NFe/MDFe)
    protected abstract LIB_Assinar(handle: any): number
    protected abstract LIB_Validar(handle: any): number
    protected abstract LIB_ValidarRegrasdeNegocios(handle: any, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_VerificarAssinatura(handle: any, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_GerarChave(handle: any, ACodigoUF: number, ACodigoNumerico: number, AModelo: number, ASerie: number, ANumero: number, ATpEmi: number, AEmissao: string, ACNPJCPF: string, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_GetPathEvento(handle: any, codigoEvento: string, buffer: Buffer, refTamanho: any): number

    // 🌐 Métodos de Consulta e Status (específicos de NFe/MDFe)
    protected abstract LIB_StatusServico(handle: any, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_Consultar(handle: any, eChaveOuDocumento: string, AExtrairEventos: boolean, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_ConsultarRecibo(handle: any, recibo: string, buffer: Buffer, refTamanho: any): number

    // 🖨️ Métodos de Impressão (específicos de NFe/MDFe)
    protected abstract LIB_Imprimir(handle: any, cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string): number

    protected abstract LIB_Cancelar(handle: any, chave: string, justificativa: string, CNPJ: string, lote: number, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_EnviarEvento(handle: any, idLote: number, buffer: Buffer, refTamanho: any): number

    // 📧 Métodos de Email (específicos de NFe/MDFe)
    protected abstract LIB_EnviarEmail(handle: any, ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number
    protected abstract LIB_EnviarEmailEvento(handle: any, ePara: string, eChaveEvento: string, eChaveDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number

    // 🖨️ Métodos de Impressão de Eventos (específicos de NFe/MDFe)
    protected abstract LIB_ImprimirEvento(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number
    protected abstract LIB_ImprimirEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number
    protected abstract LIB_SalvarEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string, buffer: Buffer, refTamanho: any): number

    // 🌐 Métodos de Distribuição DFe (específicos de NFe/MDFe)
    protected abstract LIB_DistribuicaoDFePorUltNSU(handle: any, ufAutor: number, eCNPJCPF: string, eultNSU: string, buffer: any, refTamanho: any): number
    protected abstract LIB_DistribuicaoDFePorNSU(handle: any, ufAutor: number, eCNPJCPF: string, eNSU: string, buffer: any, refTamanho: any): number
    protected abstract LIB_DistribuicaoDFePorChave(handle: any, ufAutor: number, eCNPJCPF: string, eChave: string, buffer: any, refTamanho: any): number

} 