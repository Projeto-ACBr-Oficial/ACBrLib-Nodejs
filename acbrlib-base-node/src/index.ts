

import { TAMANHO_PADRAO } from './ACBrBuffer'
import ACBrBuffer from './ACBrBuffer'
import * as koffi from 'koffi'

interface ACBrBufferCallType {
    (buffer: any, refTamanho: any): number
}


/**
 * ACBrLibBase é uma  classe de alto nível que implementa os métodos da ACBrLibComum 
 */

export default abstract class ACBrLibBase {

    private arquivoConfig: string
    private chaveCrypt: string

    /**
     * @description Construtor da ACBrLibBase
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     */
    constructor(arquivoConfig: string, chaveCrypt: string) {
        this.arquivoConfig = arquivoConfig
        this.chaveCrypt = chaveCrypt
    }


    /** assinaturas de sobrecarga do metódo inicializar  */


    /**
     * @description Método usado para inicializar o componente para uso da biblioteca
     */
    public inicializar(): number;

    /**
       * @description Método usado para inicializar o componente para uso da biblioteca
       * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
       * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
       * @returns 0 se sucesso ou o código de erro
  */
    public inicializar(arquivoConfig: string, chaveCrypt: string): number;


    public inicializar(arquivoConfig?: string, chaveCrypt?: string): number {

        if (typeof arquivoConfig === "undefined" && typeof chaveCrypt === "undefined") {
            return this.#inicializar(this.arquivoConfig, this.chaveCrypt)
        } else {

            if (typeof arquivoConfig === "string" && typeof chaveCrypt === "string") {
                return this.#inicializar(arquivoConfig, chaveCrypt)
            }

            throw new Error("missing parameter")
        }
    }


    /**
     * Método usado para remover o componente ACBrNFe e suas classes da memoria
     * @returns 0 ou código de erro 
     */

    public finalizar(): number {
        let status = this.LIB_Finalizar()
        this._checkResult(status)
        return status
    }

    /**
     * @description Método que retornar o nome da biblioteca.
     * @returns Uma string com o nome da biblioteca
     */


    public nome(): string {
        return this._getStringFromACBrLibBufferCallback(this.LIB_Nome.bind(this))
    }

    /**
     * @description Método que retornar a versão da biblioteca.
     * @returns  Uma string com o versão da biblioteca
     */

    public versao(): string {
        return this._getStringFromACBrLibBufferCallback(this.LIB_Versao.bind(this))
    }

    /**
     * @description Método usado retornar o ultimo retorno processado pela biblioteca
     * @returns Retorna uma string com o último retorno processado pela biblioteca.
     */

    public ultimoRetorno(): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        this.LIB_UltimoRetorno(acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        return this._processaResult(acbrBuffer)
    }


    /**
     * @description Método usado para ler a configuração da biblioteca do arquivo INI informado.
     * @returns 0 ou código de erro 
     */

    public configLer(): number;

    /**
     * @description Método usado para ler a configuração da biblioteca do arquivo INI informado.
     * @param arquivoConfig (opcional) Arquivo INI para ler, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro 
     */

    public configLer(arquivoConfig: string): number;

    public configLer(arquivoConfig?: string): number {
        if (typeof arquivoConfig === "undefined") {
            return this.#configLer(this.arquivoConfig)
        }
        return this.#configLer(arquivoConfig)
    }

  


    /**  
     * @description Método usado para gravar a configuração da biblioteca no arquivo INI informado.
     * @returns 0 ou código de erro
     */

    public configGravar(): number;

      /**
     * @description Método usado para gravar a configuração da biblioteca no arquivo INI informado.
     * @param arquivoConfig Arquivo INI para ler, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro
     */

    public configGravar(arquivoConfig: string): number;


    public configGravar(arquivoConfig?: string): number {

        if (typeof arquivoConfig === "undefined") {
            return this.#configGravar(this.arquivoConfig)
        }
        return this.#configGravar(arquivoConfig)
    }

    /**
     * @description Método usado para ler uma determinado item da configuração.
     * @param sessao Nome da sessão de configuração.
     * @param chave Nome da chave da sessão.
     * @returns 0 ou código de erro
     */

    public configLerValor(sessao: string, chave: string): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ConfigLerValor(sessao, chave, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)

    }

    /**
     * @description Método usado para gravar um determinado item  da configuração.
     * @param sessao Nome da sessão de configuração.
     * @param chave Nome da chave da sessão.
     * @param valor  Valor para ser gravado na configuração 
     * @returns 0 ou código de erro
     */

    public configGravarValor(sessao: string, chave: string, valor: string): number {
        let status = this.LIB_ConfigGravarValor(sessao, chave, valor)
        this._checkResult(status)
        return status
    }


    /**
     * @description Método usado para exportar a configuração da biblioteca do arquivo INI informado.
     * @returns Uma string com a configuração exportada.
     */
    public configExportar(): string {
        return this._getStringFromACBrLibBufferCallback(this.LIB_ConfigExportar.bind(this))
    }


    /**
     * 
     * @description Método usado para importar a configuração da biblioteca do arquivo INI informado
     * @param arquivoConfig  Arquivo INI para ler, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro
     */

    public configImportar(arquivoConfig: string): number {
        let status = this.LIB_ConfigImportar(arquivoConfig)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método que retorna informações da biblioteca OpenSsl
     * @returns
     */
    public openSslInfo():string{
        return this._getStringFromACBrLibBufferCallback(this.LIB_OpenSSLInfo.bind(this))
    }


    /* Métodos protegidos */

    _isRequiredReallocBuffer(requiredLen: number) {
        return requiredLen > TAMANHO_PADRAO
    }


    _processaResult(buffer: ACBrBuffer): string {
        let requiredLen =  koffi.decode(buffer.getRefTamanhoBuffer(), 'int')

        if (this._isRequiredReallocBuffer(requiredLen)) {
            requiredLen = Math.round(requiredLen * 1.3)
            return this._ultimoRetorno(requiredLen)
        }
        return buffer.toString()
    }

    _checkResult(result: number) {
        if (result === 0)
            return
        let error = this.ultimoRetorno()
        throw new Error(error)
    }

    _getStringFromACBrLibBufferCallback(callback: ACBrBufferCallType): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)

        let status = callback(acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    _createAcbrBuffer(size: number): ACBrBuffer {
        return new ACBrBuffer(size)
    }


    _ultimoRetorno(size: number): string {
        let acbrBuffer = this._createAcbrBuffer(size)
        this.LIB_UltimoRetorno(acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        return acbrBuffer.toString()
    }


    /* Metodos que devem ser implementados em classes filhas */

    protected abstract LIB_Inicializar(configPath: string, chaveCrypt: string): number
    protected abstract LIB_Finalizar(): number
    protected abstract LIB_UltimoRetorno(mensagem: any, refTamanho: any): number
    protected abstract LIB_Nome(nome: any, refTamanho: any): number
    protected abstract LIB_Versao(versao: any, refTamanho: any): number

    protected abstract LIB_ConfigLer(arqConfig: string): number
    protected abstract LIB_ConfigGravar(arqConfig: string): number
    protected abstract LIB_ConfigLerValor(sessao: string, chave: string, valor: any, refTamanho: any): number
    protected abstract LIB_ConfigGravarValor(sessao: string, chave: string, valor: string): number
    protected abstract LIB_ConfigImportar(arqConfig: string): number
    protected abstract LIB_ConfigExportar(configuracoes: any, refTamanho: any): number
    protected abstract LIB_OpenSSLInfo(configuracoes: any, refTamanho: any): number

    //metodos privados

    #configGravar(arquivoConfig: string) {
        let status = this.LIB_ConfigGravar(arquivoConfig)
        this._checkResult(status)
        return status
    }

    #configLer(arquivoConfig: string) {
        let status = this.LIB_ConfigLer(arquivoConfig)
        this._checkResult(status)
        return status
    }

    #inicializar(arquivoConfig: string, chaveCrypt: string) {
        let status = this.LIB_Inicializar(arquivoConfig, chaveCrypt)
        this._checkResult(status)
        return status
    }
}