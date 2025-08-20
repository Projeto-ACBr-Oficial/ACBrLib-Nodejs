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
    protected abstract LIB_LimparLista(handle: any): number

    // 🔐 Segurança (específicos de DFe)
    protected abstract LIB_ObterCertificados(handle: any, buffer: any, refTamanho: any): number

    // 🖨️ Impressão (específicos de DFe)
    protected abstract LIB_ImprimirPDF(handle: any): number
    protected abstract LIB_SalvarPDF(handle: any, buffer: any, refTamanho: any): number

    // ===== IMPLEMENTAÇÕES CONCRETAS DOS MÉTODOS COMUNS DE DFe =====

    // 📄 Manipulação de Arquivos
    public carregarXML(arquivoXML: string): number {
        const status = this.LIB_CarregarXML(this.getHandle(), arquivoXML)
        this._checkResult(status)
        return status
    }

    public carregarINI(arquivoINI: string): number {
        const status = this.LIB_CarregarINI(this.getHandle(), arquivoINI)
        this._checkResult(status)
        return status
    }

    public obterXml(indice: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_ObterXml(this.getHandle(), indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    public obterIni(indice: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_ObterIni(this.getHandle(), indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    public limparLista(): number {
        const status = this.LIB_LimparLista(this.getHandle())
        this._checkResult(status)
        return status
    }

    // 🔐 Segurança
    public obterCertificados(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_ObterCertificados(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    // 🖨️ Impressão
    public imprimirPDF(): number {
        const status = this.LIB_ImprimirPDF(this.getHandle())
        this._checkResult(status)
        return status
    }

    public salvarPDF(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.LIB_SalvarPDF(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

} 