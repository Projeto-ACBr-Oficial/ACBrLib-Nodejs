import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src"
import ACBrBuffer from '@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer'
import { TAMANHO_PADRAO } from '@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer'

/**
 * @description ACBrLibDFeComum é uma classe abstrata que implementa APENAS os métodos comuns entre NFe, MDFe e NFSe
 * Esta classe serve como base para funcionalidades compartilhadas entre diferentes tipos de DFe
 * NOTA: Não inclui métodos já implementados na ACBrLibBaseMT (inicializar, finalizar, configLer, etc.)
 */
export default abstract class ACBrLibDFeComum extends ACBrLibBaseMT {

    constructor(acbrlib: any, arquivoConfig: string, chaveCrypt: string) {
        super(acbrlib, arquivoConfig, chaveCrypt)
    }

    // ===== MÉTODOS ABSTRATOS QUE DEVEM SER IMPLEMENTADOS PELAS CLASSES FILHAS =====
    
    // 📄 Manipulação de Arquivos (específicos de DFe)
    protected abstract LIB_CarregarXML(handle: any, arquivoXML: string): number
    protected abstract LIB_CarregarINI(handle: any, arquivoINI: string): number
    protected abstract LIB_ObterXml(handle: any, indice: number, buffer: any, refTamanho: any): number
    protected abstract LIB_ObterIni(handle: any, indice: number, buffer: any, refTamanho: any): number
    protected abstract LIB_GravarXml(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number
    protected abstract LIB_GravarIni(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number
    protected abstract LIB_LimparLista(handle: any): number

    // 🔐 Segurança (específicos de DFe)
    protected abstract LIB_ObterCertificados(handle: any, buffer: any, refTamanho: any): number

    // 🖨️ Impressão (específicos de DFe)
    protected abstract LIB_ImprimirPDF(handle: any): number
    protected abstract LIB_SalvarPDF(handle: any, buffer: any, refTamanho: any): number

    // 📧 Email (específicos de DFe)
    protected abstract LIB_EnviarEmail(handle: any, ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number

    // ===== IMPLEMENTAÇÕES CONCRETAS DOS MÉTODOS COMUNS DE DFe =====

    // 📄 Manipulação de Arquivos
    /**
     * Carrega um arquivo XML de documento fiscal para processamento
     * @param arquivoXML - Caminho do arquivo XML ou conteúdo XML do documento
     * @returns Código de status da operação (0 = sucesso, outros = erro)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_CarregarXML}
     */
    public carregarXML(arquivoXML: string): number {
        const status = this.LIB_CarregarXML(this.getHandle(), arquivoXML)
        this._checkResult(status)
        return status
    }

    /**
     * Carrega um arquivo INI de documento fiscal para processamento
     * @param arquivoINI - Caminho do arquivo INI ou conteúdo INI do documento
     * @returns Código de status da operação (0 = sucesso, outros = erro)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_CarregarINI}
     */
    public carregarINI(arquivoINI: string): number {
        const status = this.LIB_CarregarINI(this.getHandle(), arquivoINI)
        this._checkResult(status)
        return status
    }

    /**
     * Obtém o conteúdo XML de um documento fiscal específico da lista
     * @param indice - Índice do documento na lista (baseado em 0)
     * @returns String contendo o XML do documento
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_ObterXml}
     */
    public obterXml(indice: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_ObterXml(this.getHandle(), indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Obtém o conteúdo INI de um documento fiscal específico da lista
     * @param indice - Índice do documento na lista (baseado em 0)
     * @returns String contendo o INI do documento
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_ObterIni}
     */
    public obterIni(indice: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_ObterIni(this.getHandle(), indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Grava o XML de um documento fiscal em arquivo
     * @param indice - Índice do documento na lista (baseado em 0)
     * @param nomeArquivo - Nome do arquivo a ser criado
     * @param caminhoArquivo - Caminho onde o arquivo será salvo
     * @returns Código de status da operação (0 = sucesso, outros = erro)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_GravarXml}
     */
    public gravarXml(indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        const status = this.LIB_GravarXml(this.getHandle(), indice, nomeArquivo, caminhoArquivo)
        this._checkResult(status)
        return status
    }

    /**
     * Grava o INI de um documento fiscal em arquivo
     * @param indice - Índice do documento na lista (baseado em 0)
     * @param nomeArquivo - Nome do arquivo a ser criado
     * @param caminhoArquivo - Caminho onde o arquivo será salvo
     * @returns Código de status da operação (0 = sucesso, outros = erro)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_GravarIni}
     */
    public gravarIni(indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        const status = this.LIB_GravarIni(this.getHandle(), indice, nomeArquivo, caminhoArquivo)
        this._checkResult(status)
        return status
    }

    /**
     * Limpa a lista de notas no componente ACBrNFe
     * @returns Código de status da operação (0 = sucesso, outros = erro)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_LimparLista}
     */
    public limparLista(): number {
        const status = this.LIB_LimparLista(this.getHandle())
        this._checkResult(status)
        return status
    }

    // 🔐 Segurança
    /**
     * Obtém informações sobre os certificados digitais disponíveis
     * @returns String contendo informações dos certificados (formato XML)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_ObterCertificados}
     */
    public obterCertificados(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_ObterCertificados(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // 🖨️ Impressão
    /**
     * Imprime o documento fiscal em PDF na impressora padrão
     * @returns Código de status da operação (0 = sucesso, outros = erro)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_ImprimirPDF}
     */
    public imprimirPDF(): number {
        const status = this.LIB_ImprimirPDF(this.getHandle())
        this._checkResult(status)
        return status
    }

    /**
     * Salva o documento fiscal em arquivo PDF
     * @returns String contendo o caminho do arquivo PDF gerado
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_SalvarPDF}
     */
    public salvarPDF(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_SalvarPDF(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // 📧 Email
    /**
     * Envia o documento fiscal por email
     * @param ePara - Endereço de email do destinatário
     * @param eXMLDocumento - XML do documento a ser enviado
     * @param enviaPDF - Se deve anexar o PDF do documento
     * @param eAssunto - Assunto do email
     * @param eCC - Endereços de email em cópia (separados por vírgula)
     * @param eAnexos - Caminhos de arquivos adicionais para anexar
     * @param eMensagem - Mensagem personalizada do email
     * @returns Código de status da operação (0 = sucesso, outros = erro)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosNFe.html NFE_EnviarEmail}
     */
    public enviarEmail(ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        const status = this.LIB_EnviarEmail(this.getHandle(), ePara, eXMLDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
        this._checkResult(status)
        return status
    }

} 