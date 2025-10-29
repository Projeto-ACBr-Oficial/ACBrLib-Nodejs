import { TAMANHO_PADRAO } from './ACBrBuffer'
import ACBrBuffer from './ACBrBuffer'
import {
    ACBrLibConfigLerError,
    ACBrLibLibNaoFinalizadaError,
    ACBrLibLibNaoInicializadaError,
    ACBrLibTimeOutError,
    ACBrLibArquivoNaoExisteError,
    ACBrLibDiretorioNaoExisteError,
    ACBrLibHttpError,
    ACBrLibParametroInvalidoError,
    ACBrLibDemoExpiradoError,
    ACBrLibNaoDisponivelEmModoConsoleError,
    ACBrLibConfigGravarError
} from './exception'
import { ACBrLibResultCodes } from './exception/ACBrLibResultCodes'
import * as koffi from 'koffi'



/**
 * ACBrLibBaseMT é uma  classe de alto nível que implementa os métodos da ACBrLibComum Multi-Thread
 * Implementa Disposable para auto-cleanup do handle
 */
export default abstract class ACBrLibBaseMT {


    private handle: any // ponteiro para ponteiro (void **)
    private isHandleInitialized : boolean = false; 
    private acbrlib: any
    private arquivoConfig: string
    private chaveCrypt: string
    private disposed = false

    constructor(acbrlib: any, arquivoConfig: string, chaveCrypt: string) {
        this.arquivoConfig = arquivoConfig
        this.chaveCrypt = chaveCrypt
        this.acbrlib = acbrlib
        this.handle = null
    }

    public getAcbrlib(): any {
        return this.acbrlib
    }
    public getHandle(): any {
        return koffi.decode(this.handle, 'void *')
    }

    #isInitialized() : boolean{
    
        // diferente do ref-napi que tem o metodo isNull() koffi até a presente versão não tem
        // sendo impossivel saber se o handle é null (do lado nodejs) ou não, usamos o isHandleInitialized
        // para saber se a biblioteca foi inicializada
        // sem esse controle, é possivel liberar a memoria mais de uma vez e corromper o heap.
        return this.isHandleInitialized
    }

    /**
     * Libera recursos alocados
     */
    destroy() {
       
        if (!this.disposed) {
            try {
                // Finaliza a biblioteca se estiver inicializada
                if (this.#isInitialized()) {
                   this.finalizar()
                }
                this.disposed = true
            } catch (error) {
                console.error('Erro ao liberar recursos:', error)
            }
        }
    }

    /**
     * Implementação do Disposable interface para using declaration
     */
    [Symbol.dispose]() {
        this.destroy()
    }

    /**
     * Implementação do AsyncDisposable interface para using await
     */
    async [Symbol.asyncDispose]() {
        this.destroy()
    }


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

        //let status = this.LIB_Inicializar(this.handle, arquivoConfig, chaveCrypt)


        if (typeof arquivoConfig === "undefined" && typeof chaveCrypt === "undefined") {
            return this.#inicializar(this.arquivoConfig, this.chaveCrypt)
        } else {

            if (typeof arquivoConfig === "string" && typeof chaveCrypt === "string") {
                return this.#inicializar(arquivoConfig, chaveCrypt)
            }

            throw new Error("inicializar precisa de dois parâmetros: chaveCrypt e arquivoConfig")
        }


    }

    // metodo auxiliar para destruir o ponteiro do handle
    #releaseHandle() {
        if (!this.handle) {
            return
        }
        
        koffi.free(this.handle)
        this.handle = null
    }

    /**
     * Método usado para remover ACBrLib  e suas classes da memoria
     * @returns 0 ou código de erro 
     */

    public finalizar(): number {

        if ( !this.#isInitialized()){
            return 0
        }

        let status = this.LIB_Finalizar(this.getHandle())
        
        if (status == ACBrLibResultCodes.OK) {
            this.#releaseHandle()
            this.isHandleInitialized = false
        }
        this._checkResult(status)
    
        return status
    }

    /**
     * @description Método que retornar o nome da biblioteca.
     * @returns Uma string com o nome da biblioteca
     */


    public nome(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_Nome(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * @description Método que retornar a versão da biblioteca.
     * @returns  Uma string com o versão da biblioteca
     */

    public versao(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_Versao(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * @description Método usado retornar o ultimo retorno processado pela biblioteca
     * @returns Retorna uma string com o último retorno processado pela biblioteca.
     */

    public ultimoRetorno(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        this.LIB_UltimoRetorno(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        return this._processaResult(acbrBuffer)
    }


    configLer(): number;
    configLer(arquivoConfig: string): number;

    /**
     * @description Método usado para ler a configuração da biblioteca do arquivo INI informado.
     * @param arquivoConfig Arquivo INI para ler, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro 
     */


    public configLer(arquivoConfig?: string): number {
        if (typeof arquivoConfig === "undefined") {
            return this.#configLer(this.arquivoConfig)
        }
        return this.#configLer(arquivoConfig)
    }

    /**
     * @description Método usado para gravar a configuração da biblioteca no arquivo INI informado.
     * @param arquivoConfig Arquivo INI para ler, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro
     */


    /**  
    * @description Método usado para gravar a configuração da biblioteca no arquivo INI informado.
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
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ConfigLerValor(this.getHandle(), sessao, chave, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.LIB_ConfigGravarValor(this.getHandle(), sessao, chave, valor)
        this._checkResult(status)
        return status
    }


    /**
     * @description Método usado para exportar a configuração da biblioteca do arquivo INI informado.
     * @returns Uma string com a configuração exportada.
     */
    public configExportar(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_ConfigExportar(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * 
     * @description Método usado para importar a configuração da biblioteca do arquivo INI informado
     * @param arquivoConfig  Arquivo INI para ler, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro
     */

    public configImportar(arquivoConfig: string): number {
        let status = this.LIB_ConfigImportar(this.getHandle(), arquivoConfig)
        this._checkResult(status)
        return status
    }


    /**
      * @description Método que retorna informações da biblioteca OpenSsl
      * @returns
      */
    public openSslInfo(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.LIB_OpenSSLInfo(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
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

    /**
     * Verifica se o resultado é um código de erro
     * @param result 
     * @returns 
     */
    _isResultErrorCode(result: number): boolean {
        return result < ACBrLibResultCodes.OK
    }
    /**
     * Checa o resultado da operação e propaga a exceção se result < 0
     * @param result 
     */
    _checkResult(result: number) {

        // se o resultado é maior ou igual a OK, não há erro
        if ( !this._isResultErrorCode(result)) {
            return;
        }

        let errorMessage: string = this.ultimoRetorno();

        console.log("Checking result: ", result, " Error message: ", errorMessage)
        switch (result) {

            case ACBrLibResultCodes.ErrLibNaoInicializada:
                throw new ACBrLibLibNaoInicializadaError("Erro ao inicializar "+ this.nome);
                break;

            case ACBrLibResultCodes.ErrLibNaoFinalizada:
                throw new ACBrLibLibNaoFinalizadaError("Erro ao finalizar a biblioteca");
                break

            case ACBrLibResultCodes.ErrConfigLer:
                throw new ACBrLibConfigLerError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrConfigGravar:
                throw new ACBrLibConfigGravarError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrArquivoNaoExiste:
                throw new ACBrLibArquivoNaoExisteError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrDiretorioNaoExiste:
                throw new ACBrLibDiretorioNaoExisteError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrHttp:
                throw new ACBrLibHttpError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrTimeOut:
                throw new ACBrLibTimeOutError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrDemoExpirado:
                throw new ACBrLibDemoExpiradoError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrNaoDisponivelEmModoConsole:
                throw new ACBrLibNaoDisponivelEmModoConsoleError(errorMessage);
                break

            case ACBrLibResultCodes.ErrParametroInvalido:
                throw new ACBrLibParametroInvalidoError(errorMessage);
                break;

            case ACBrLibResultCodes.ErrExecutandoMetodo:
                throw new ACBrLibParametroInvalidoError(errorMessage);
                break;

            default:
                // se a exceção não é uma exceção comum a todas as bibliotecas, exibe a mensagem de erro
                // as classes filhas devem implementar as exceções específicas
                console.error("O código de erro ", result, " Mensagem: ", errorMessage)

                break;
        }

    }



    _ultimoRetorno(size: number): string {
        using acbrBuffer = new ACBrBuffer(size)
        this.LIB_UltimoRetorno(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        return acbrBuffer.toString()
    }


    /** Metodos que devem ser implementados em classes filhas */

    protected abstract LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number
    protected abstract LIB_Finalizar(handle: any): number
    protected abstract LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number
    protected abstract LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number
    protected abstract LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number

    protected abstract LIB_ConfigLer(handle: any, arqConfig: string): number
    protected abstract LIB_ConfigGravar(handle: any, arqConfig: string): number
    protected abstract LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number
    protected abstract LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number
    protected abstract LIB_ConfigImportar(handle: any, arqConfig: string): number
    protected abstract LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number
    protected abstract LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number




    #configGravar(arquivoConfig: string) {
        let status = this.LIB_ConfigGravar(this.getHandle(), arquivoConfig)
        this._checkResult(status)
        return status
    }

    #configLer(arquivoConfig: string) {
        let status = this.LIB_ConfigLer(this.getHandle(), arquivoConfig)
        this._checkResult(status)
        return status
    }

    #inicializar(arquivoConfig: string, chaveCrypt: string) {
        if (this.handle == null) {
            this.handle = koffi.alloc('void *', 1)
        }
        let status = this.LIB_Inicializar(this.handle, arquivoConfig, chaveCrypt)
        if (status === ACBrLibResultCodes.OK) {
            this.isHandleInitialized = true
        }
        this._checkResult(status)
        return status
    }
}