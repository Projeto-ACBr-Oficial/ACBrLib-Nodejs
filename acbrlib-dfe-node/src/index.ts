import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src"
import ACBrBuffer from '@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer'
import { TAMANHO_PADRAO } from '@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer'
import ACBrLibDFeComum from "./dfe-comum";

/**
 * @description ACBrLibDFeMT é uma classe de alto nível que abstrai os métodos comuns a NFe e MDFe
 * As classes que herdam desta classe devem implementar os métodos LIB_* abstratos.
 */
export default abstract class ACBrLibDFeMT extends ACBrLibDFeComum {

    constructor(acbrlib: any, arquivoConfig: string, chaveCrypt: string) {
        super(acbrlib, arquivoConfig, chaveCrypt)
    }

    // ===== MÉTODOS PARA CARREGAMENTO E MANIPULAÇÃO DE DOCUMENTOS =====

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
     * Método usado para assinar o documento
     * @returns Código de status da operação
     */
    public assinar(): number {
        let status = this.LIB_Assinar(this.getHandle())
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para validar o documento
     * @returns Código de status da operação
     */
    public validar(): number {
        let status = this.LIB_Validar(this.getHandle())
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para validar as regras de negócio do documento
     * @returns String contendo o resultado da validação
     */
    public validarRegrasdeNegocios(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ValidarRegrasdeNegocios(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para verificar a assinatura do documento
     * @returns String contendo o resultado da verificação
     */
    public verificarAssinatura(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_VerificarAssinatura(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para gerar a chave do documento
     * @param ACodigoUF - Código da UF
     * @param ACodigoNumerico - Código numérico
     * @param AModelo - Modelo do documento
     * @param ASerie - Série do documento
     * @param ANumero - Número do documento
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
     * Método usado para consultar o documento
     * @param eChaveOuDocumento - Chave ou número do documento
     * @param AExtrairEventos - Se true extrai os eventos
     * @returns String contendo o resultado da consulta
     */
    public consultar(eChaveOuDocumento: string, AExtrairEventos: boolean): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_Consultar(this.getHandle(), eChaveOuDocumento, AExtrairEventos, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
     * Método usado para imprimir o documento
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
     * Método usado para enviar o documento
     * @param lote - Número do lote
     * @param imprimir - Se true imprime o documento
     * @param sincrono - Se true envia de forma síncrona
     * @param zipado - Se true envia compactado
     * @returns String contendo o resultado do envio
     */
    public enviar(lote: number, imprimir: boolean, sincrono: boolean, zipado: boolean): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_Enviar(this.getHandle(), lote, imprimir, sincrono, zipado, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // ===== MÉTODOS PARA IMPRESSÃO DE EVENTOS =====

    /**
     * Método usado para imprimir evento
     * @param eArquivoXmlDocumento - Arquivo XML do documento
     * @param eArquivoXmlEvento - Arquivo XML do evento
     * @returns Código de status da operação
     */
    public imprimirEvento(eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        let status = this.LIB_ImprimirEvento(this.getHandle(), eArquivoXmlDocumento, eArquivoXmlEvento)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para imprimir evento em PDF
     * @param eArquivoXmlDocumento - Arquivo XML do documento
     * @param eArquivoXmlEvento - Arquivo XML do evento
     * @returns String contendo o resultado da operação
     */
    public imprimirEventoPDF(eArquivoXmlDocumento: string, eArquivoXmlEvento: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ImprimirEventoPDF(this.getHandle(), eArquivoXmlDocumento, eArquivoXmlEvento)
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para salvar evento em PDF
     * @param eArquivoXmlDocumento - Arquivo XML do documento
     * @param eArquivoXmlEvento - Arquivo XML do evento
     * @returns String contendo o PDF em formato Base64
     */
    public salvarEventoPDF(eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        let status = this.LIB_SalvarEventoPDF(this.getHandle(), eArquivoXmlDocumento, eArquivoXmlEvento)
        this._checkResult(status)
        return status;
    }

    // ===== MÉTODOS PARA COMUNICAÇÃO =====

    /**
     * Método usado para enviar e-mail
     * @param ePara - Endereço de e-mail do destinatário
     * @param eXMLDocumento - XML do documento
     * @param enviaPDF - Se true gera o PDF e anexa ao e-mail
     * @param eAssunto - Assunto do e-mail
     * @param eCC - Endereços de e-mail em cópia (separados por ponto e vírgula)
     * @param eAnexos - Caminho de arquivos adicionais para anexar (separados por ponto e vírgula)
     * @param eMensagem - Mensagem do e-mail
     * @returns Código de status da operação
     */
    public enviarEmail(ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        const status = this.LIB_EnviarEmail(this.getHandle(), ePara, eXMLDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
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
    public distribuicaoDFePorUltNSU(ufAutor: string, eCNPJCPF: string, eultNSU: string): string {
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
     * @param eChave - Chave do documento
     * @returns String contendo o resultado da consulta
     */
    public distribuicaoDFePorChave(ufAutor: number, eCNPJCPF: string, eChave: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_DistribuicaoDFePorChave(this.getHandle(), ufAutor, eCNPJCPF, eChave, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * Método usado para obter o caminho do documento
     * @param tipo - Tipo de path que será retornado:
     * @returns String contendo o caminho do documento
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

    // 📤 Métodos de Envio (específicos de NFe/MDFe)
    protected abstract LIB_Enviar(handle: any, lote: number, imprimir: boolean, sincrono: boolean, zipado: boolean, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_Cancelar(handle: any, chave: string, justificativa: string, CNPJ: string, lote: number, buffer: Buffer, refTamanho: any): number
    protected abstract LIB_EnviarEvento(handle: any, idLote: number, buffer: Buffer, refTamanho: any): number
    
    // 📧 Métodos de Email (específicos de NFe/MDFe)
    protected abstract LIB_EnviarEmail(handle: any, ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number
    protected abstract LIB_EnviarEmailEvento(handle: any, ePara: string, eChaveEvento: string, eChaveDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number

    // 🖨️ Métodos de Impressão de Eventos (específicos de NFe/MDFe)
    protected abstract LIB_ImprimirEvento(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number
    protected abstract LIB_ImprimirEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number
    protected abstract LIB_SalvarEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number

    // 🌐 Métodos de Distribuição DFe (específicos de NFe/MDFe)
    protected abstract LIB_DistribuicaoDFePorUltNSU(handle: any, ufAutor: string, eCNPJCPF: string, eultNSU: string, buffer: any, refTamanho: any): number
    protected abstract LIB_DistribuicaoDFePorNSU(handle: any, ufAutor: number, eCNPJCPF: string, eNSU: string, buffer: any, refTamanho: any): number
    protected abstract LIB_DistribuicaoDFePorChave(handle: any, ufAutor: number, eCNPJCPF: string, eChave: string, buffer: any, refTamanho: any): number
    
} 