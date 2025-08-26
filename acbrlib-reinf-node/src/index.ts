import ACBrLibReinfMTBridge, { TypeACBrReinfMT } from "./bridge";
import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node";
import ACBrBuffer,{TAMANHO_PADRAO} from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";


/***
 * @description ACBrLibReinfMT é uma classe de alto nível que abstrai os métodos da ACBrLibReinf Multi-thread<br/>
 * Esta classe permite que programadores de javascript/typescript usem a ACBrLibReinf sem grandes preocupações.
 */
export class ACBrLibReinfMT extends ACBrLibBaseMT {
   
    /**
     * 
     * @param libraryPath é o caminho da biblioteca acbrlibreinf (*.so ou *.dll), usar convenção cdecl
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     */
    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibReinfMTBridge(libraryPath).getAcbrNativeLib(), arquivoConfig, chaveCrypt)
    }

    /**
     * Obtém a instância da biblioteca nativa REINF tipada
     * @returns Interface TypeACBrReinfMT com todos os métodos da biblioteca nativa
     */
    public getAcbrlib(): TypeACBrReinfMT {
        return super.getAcbrlib() as TypeACBrReinfMT //cast de any para TypeACBrReinfMT
    }

    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().Reinf_Inicializar(handle, configPath, chaveCrypt)
    }
    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().Reinf_Finalizar(handle)
    }
    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().Reinf_UltimoRetorno(handle, mensagem, refTamanho)
    }
    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().Reinf_Nome(handle, nome, refTamanho)
    }
    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().Reinf_Versao(handle, versao, refTamanho)
    }
    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().Reinf_ConfigLer(handle, arqConfig)
    }
    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().Reinf_ConfigGravar(handle, arqConfig)
    }
    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().Reinf_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }
    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().Reinf_ConfigGravarValor(handle, sessao, chave, valor)
    }
    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().Reinf_ConfigImportar(handle, arqConfig)
    }
    protected LIB_ConfigExportar(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().Reinf_ConfigExportar(handle, mensagem, refTamanho)
    }
    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().Reinf_OpenSSLInfo(handle, configuracoes, refTamanho)
    }

    /**
     * Cria e envia um evento REINF
     * @param arquivoOuXML - Caminho do arquivo INI ou XML do evento REINF
     * @returns String contendo a resposta da transmissão
     */
    public criarEnviarReinf(arquivoOuXML: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().Reinf_CriarEnviarReinf(this.getHandle(), arquivoOuXML, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Limpa os dados do REINF carregados na memória
     * @returns Código de status da operação
     */
    public limparReinf(): number {
        let status = this.getAcbrlib().Reinf_LimparReinf(this.getHandle())
        this._checkResult(status)
        return status
    }

    /**
     * Carrega um XML de evento REINF para processamento
     * @param arquivoOuXML - Caminho do arquivo XML ou conteúdo XML do evento REINF
     * @returns Código de status da operação
     */
    public carregarXMLEventoReinf(arquivoOuXML: string): number {
        let status = this.getAcbrlib().Reinf_CarregarXMLEventoReinf(this.getHandle(), arquivoOuXML)
        this._checkResult(status)
        return status
    }

    /**
     * Define o ID do contribuinte para o evento REINF
     * @param idContribuinte - Identificador do contribuinte
     * @returns Código de status da operação
     */
    public setIDContribuinte(idContribuinte: string): number {
        let status = this.getAcbrlib().Reinf_SetIDContribuinte(this.getHandle(), idContribuinte)
        this._checkResult(status)
        return status
    }

    /**
     * Define o ID do transmissor para o evento REINF
     * @param idTransmissor - Identificador do transmissor
     * @returns Código de status da operação
     */
    public setIDTransmissor(idTransmissor: string): number {
        let status = this.getAcbrlib().Reinf_SetIDTransmissor(this.getHandle(), idTransmissor)
        this._checkResult(status)
        return status
    }

    /**
     * Define o tipo do contribuinte para o evento REINF
     * @param tipoContribuinte - Tipo do contribuinte (1-Pessoa Física, 2-Pessoa Jurídica)
     * @returns Código de status da operação
     */
    public setTipoContribuinte(tipoContribuinte: string): number {
        let status = this.getAcbrlib().Reinf_SetTipoContribuinte(this.getHandle(), tipoContribuinte)
        this._checkResult(status)
        return status
    }

    /**
     * Define a versão do layout DF para o evento REINF
     * @param versao - Versão do layout (ex: "2.01.02")
     * @returns Código de status da operação
     */
    public setVersaoDF(versao: string): number {
        let status = this.getAcbrlib().Reinf_SetVersaoDF(this.getHandle(), versao)
        this._checkResult(status)
        return status
    }

    /**
     * Obtém a lista de certificados digitais disponíveis
     * @returns String contendo a lista de certificados no formato JSON
     */
    public obterCertificados(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().Reinf_ObterCertificados(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Valida o evento REINF carregado na memória
     * @returns Código de status da operação
     */
    public validar(): number {
        let status = this.getAcbrlib().Reinf_Validar(this.getHandle())
        this._checkResult(status)
        return status
    }

    /**
     * Envia um evento REINF já criado para a Receita Federal
     * @returns String contendo a resposta da transmissão
     */
    public enviarReinf(): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().Reinf_EnviarReinf(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Consulta um evento REINF na Receita Federal pelo protocolo
     * @param protocolo - Número do protocolo para consulta
     * @returns String contendo a resposta da consulta
     */
    public consultarReinf(protocolo: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().Reinf_ConsultarReinf(this.getHandle(), protocolo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Consulta o recibo de um evento REINF na Receita Federal
     * @param perApur - Período de apuração (formato: AAAA-MM)
     * @param tipoEvento - Tipo do evento (1-Retencao, 2-RetencaoPF, 3-RetencaoPJ)
     * @param nrInscEstab - Número de inscrição do estabelecimento
     * @param cnpjPrestador - CNPJ do prestador de serviços
     * @param nrInscTomador - Número de inscrição do tomador
     * @param dtApur - Data de apuração (formato: DD/MM/AAAA)
     * @param cpfCnpjBenef - CPF/CNPJ do beneficiário
     * @param cnpjFonte - CNPJ da fonte pagadora
     * @returns String contendo a resposta da consulta
     */
    public consultarReciboReinf(perApur: string, tipoEvento: number, nrInscEstab: string, cnpjPrestador: string, nrInscTomador: string, dtApur: string, cpfCnpjBenef: string, cnpjFonte: string): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().Reinf_ConsultarReciboReinf(this.getHandle(), perApur, tipoEvento, nrInscEstab, cnpjPrestador, nrInscTomador, dtApur, cpfCnpjBenef, cnpjFonte, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Cria um evento REINF sem enviar
     * @param arqIni - Caminho do arquivo INI com os dados do evento REINF
     * @returns Código de status da operação
     */
    public criarEventoReinf(arqIni: string): number {
        let status = this.getAcbrlib().Reinf_CriarEventoReinf(this.getHandle(), arqIni)
        this._checkResult(status)
        return status
    }


}
