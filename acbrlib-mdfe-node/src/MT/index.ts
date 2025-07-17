import { TAMANHO_PADRAO } from "acbrlib-base-node/dist/src/ACBrBuffer";
import { TypeACBrMDFeMT } from "./bridge";
import ACBrLibBaseMT from "acbrlib-base-node/dist/src/MT";
import ACBrLibMDFeBridgeMT from "./bridge";
import { ACBrLibResultCodes } from "acbrlib-base-node/dist/src/exception/ACBrLibResultCodes"
import ACBrLibMDFeError, {
    ACBrLibMDFeCNPJInvalidoError,
    ACBrLibMDFeGerarXmlError,
    ACBrLibMDFeIndexError
} from "../exception"
import { ACBrLibExecutandoMetodoError } from 'acbrlib-base-node/dist/src/exception';

/**
 ** @description ACBrLibMDFeMT é uma classe de alto nível que abstrai os métodos da ACBrLibMDFe Multi-thread<br/>
 * Esta classe permite que programadores de javascript/typescript usem a ACBrLibMDFe sem grandes preocupações.
 */

class ACBrLibMDFeMT extends ACBrLibBaseMT {

    /**
     * 
     * @param libraryPath é o caminho da biblioteca ACBrLibMDFe (*.so ou *.dll)
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     */
    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibMDFeBridgeMT(libraryPath).getAcbrNativeLib(), arquivoConfig, chaveCrypt)
    }


    public getAcbrlib(): TypeACBrMDFeMT;


    public getAcbrlib(): TypeACBrMDFeMT {
        return super.getAcbrlib() as TypeACBrMDFeMT //cast de any para TypeACBrMDFeMT
    }

    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().MDFE_Inicializar(handle, configPath, chaveCrypt)
    }
    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().MDFE_Finalizar(handle)
    }
    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_UltimoRetorno(handle, mensagem, refTamanho)
    }
    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_Nome(handle, nome, refTamanho)
    }
    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_Versao(handle, versao, refTamanho)
    }
    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().MDFE_ConfigLer(handle, arqConfig)
    }
    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().MDFE_ConfigGravar(handle, arqConfig)
    }
    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }
    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().MDFE_ConfigGravarValor(handle, sessao, chave, valor)
    }
    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().MDFE_ConfigImportar(handle, arqConfig)
    }
    protected LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_ConfigExportar(handle, configuracoes, refTamanho)
    }

    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_OpenSSLInfo(handle, configuracoes, refTamanho)
    }

    _checkResult(result: number): void {

        super._checkResult(result);
        switch (result) {
            case ACBrLibResultCodes.OK:
                return 
                break;
            case ACBrLibResultCodes.ErrCNPJInvalido:
                throw new ACBrLibMDFeCNPJInvalidoError(this.ultimoRetorno());
                break;

            case ACBrLibResultCodes.ErrGerarXml:
                throw new ACBrLibMDFeGerarXmlError(this.ultimoRetorno());
                break;

            case ACBrLibResultCodes.ErrIndex:
                throw new ACBrLibMDFeIndexError(this.ultimoRetorno());
                break;

            case ACBrLibResultCodes.ErrExecutandoMetodo:
                throw new ACBrLibExecutandoMetodoError(this.ultimoRetorno());
                break;
            default:
          
                throw new ACBrLibMDFeError(this.ultimoRetorno());
                break;
        }


    }
    public carregarXML(arquivoXML: string): number {

        let status = this.getAcbrlib().MDFE_CarregarXML(this.getHandle(), arquivoXML)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para ler o arquivo INI para o componente ACBrMDFe.
     * @param arquivoXML Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @returns 0 ou código de erro
     */

    public carregarINI(arquivoXML: string): number {
        let status = this.getAcbrlib().MDFE_CarregarINI(this.getHandle(), arquivoXML)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método para retornar o xml da MDFe.
     * @param indice Posição da MDFe na lista, a lista inicia em 0.
     * @returns 
     */

    public obterXml(indice: number): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_ObterXml(this.getHandle(), indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * @description Método para gravar o xml da MDFe.
     * @param indice Posição da MDFe na lista, a lista inicia em 0.
     * @param nomeArquivo Nome do arquivo xml a ser salvo.
     * @param caminhoArquivo Local onde será salvo o xml.
     * @returns 0 ou código de erro
     */

    public gravarXml(indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        let status = this.getAcbrlib().MDFE_GravarXml(this.getHandle(), indice, nomeArquivo, caminhoArquivo)
        this._checkResult(status)
        return status

    }

    /**
   * @description Método para retornar o xml da MDFe em formato INI
   * @param indice Posição da MDFe na lista, a lista inicia em 0.
   * @returns Uma string com o conteúdo do arquivo XML em formato INI
   */

    public obterIni(indice: number): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_ObterIni(this.getHandle(), indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)

    }


    /**
     * @description Método para gravar o xml da MDFe em formato ini.
     * @param indice Posição da MDFe na lista, a lista inicia em 0.
     * @param nomeArquivo Posição da MDFe na lista, a lista inicia em 0.
     * @param caminhoArquivo Posição da MDFe na lista, a lista inicia em 0.
     * @returns 0 ou código de erro.
     */

    public gravarIni(indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        let status = this.getAcbrlib().MDFE_GravarIni(this.getHandle(), indice, nomeArquivo, caminhoArquivo)
        this._checkResult(status)
        return status

    }

    /**
     * @description Método usado para ler o arquivo XML para o componente ACBrMDFe.
     * @param arquivoXML Path com o nome do arquivo XML a ser lido ou o conteúdo do XML.
     * @returns 0 ou código de erro
     */

    public carregarEventoXML(arquivoXML: string): number {
        let status = this.getAcbrlib().MDFE_CarregarEventoXML(this.getHandle(), arquivoXML)
        this._checkResult(status)
        return status
    }


    /**
     * @description Método usado para ler o arquivo INI para o componente ACBrMDFe.
     * @param arquivoXML Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @returns 0 ou código de erro
    */

    public carregarEventoINI(arquivoXML: string): number {
        let status = this.getAcbrlib().MDFE_CarregarEventoINI(this.getHandle(), arquivoXML)
        this._checkResult(status)
        return status
    }


    /**
    * @description Método usado para limpar a lista de notas no componente ACBrMDFe.
    * @returns 0 ou código de erro
    */

    public limparLista() {
        let status = this.getAcbrlib().MDFE_LimparLista(this.getHandle())
        this._checkResult(status)
        return status
    }



    /**
   * @description Método usado para limpar a lista de eventos no componente ACBrMDFe
   * @returns 0 ou código de erro
   */

    public limparListaEventos() {
        let status = this.getAcbrlib().MDFE_LimparListaEventos(this.getHandle())
        this._checkResult(status)
        return status
    }

     /**
     * @description Método usado para assinar as notas carregadas no componente ACBrMDFe.
     * @returns 0 ou código de erro.
     */


    public assinar(): number {
        let status = this.getAcbrlib().MDFE_Assinar(this.getHandle())
        this._checkResult(status)
        return status
    }

      /**
     * @description Método usado para validar as notas assinadas através do componente ACBrMDFe.
     * @returns 0 ou código de erro
     */


    public validar(): number {
        let status = this.getAcbrlib().MDFE_Validar(this.getHandle())
        this._checkResult(status)
        return status
    }


      /**
     * @description Método usado para Validar Regras de Negócios dos dados que se encontram no XML de uma NF-e.
     * @returns Uma string com informações da validação
     */


    public validarRegrasdeNegocio(): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_ValidarRegrasdeNegocios(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }



    public verificarAssinatura(): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_VerificarAssinatura(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

      /**
     * @description Método usado gerar uma chave para o documento fiscal.
     * @param ACodigoUF Código da UF para gerar a chave.
     * @param ACodigoNumerico Código numérico da nota fiscal.
     * @param AModelo Modelo do documento 55 ou 65.
     * @param ASerie Série da nota fiscal.
     * @param ANumero Número da nota fiscal.
     * @param ATpEmi Tipo de Emissão:
        - 1 teNormal
        - 2 teContingencia
        - 3 teSCAN
        - 4 teDPEC
        - 5 teFSDA
        - 6 teSVCAN
        - 7 teSVCRS
        - 8 teSVCSP
        - 9 teOffLine
     * @param AEmissao Data da emissão da MDFe no formato [dd/MM/yyyy].
     * @param ACNPJCPF CPF/CNPJ do emissor da nota.
     * @returns Uma string com a chave gerada
     */

    public gerarChave(
        ACodigoUF: number, ACodigoNumerico: number, AModelo: number,
        ASerie: number, ANumero: number, ATpEmi: number,
        AEmissao: string, ACNPJCPF: string
    ): string {

        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_GerarChave(this.getHandle(), ACodigoUF, ACodigoNumerico, AModelo, ASerie, ANumero, ATpEmi, AEmissao, ACNPJCPF, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * @description Método usado retornar uma lista de dados do certificados instalados na maquina:
    - Com certificado Instalado no Windows e usando o Wincrypt, basta este metódo; 
    - Usando OpenSSL (Linux/Windows) devemos configurar o INI ( { @link https://acbr.sourceforge.io/ACBrLib/DFe.html | Configurações DFe }  ) informar o path e o arquivo pfx (ArquivoPFX=c:\temp\certificado.pfx) e a senha antes este método.

     */
    public obterCertificados(): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_ObterCertificados(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)

    }

     /**
     * @description Método usado retornar o path onde será salvos os documentos gerado pela biblioteca.
     * @param tipo Tipo de path que será retornado:
      - 0  MDFe
      - 1 Inutilização
      - 2 CCe
      - 3 Cancelamento
     * @returns 
     */

    public getPath(tipo: number) {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_GetPath(this.getHandle(), tipo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * @description Método usado retornar o path onde será salvos os eventos gerado pela biblioteca.
     * @param codigoEvento O código do evento.
     * @returns 0 ou código de erro
     */


    public getPathEvento(codigoEvento: string): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_GetPathEvento(this.getHandle(), codigoEvento, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }
    

    /**
     * @description Método usado para Consultar o Status de Serviço na SEFAZ.
     * @returns Uma string com informações do Status de Serviço
     * @example
     * ```ini 
     *       [STATUS]
     *       Versao=1.07
     *       TpAmb=2
     *       VerAplic=SP_MDFE_PL_005c
     *       CStat=107
     *       XMotivo=Serviço em Operação
     *       CUF=35
     *       DhRecbto=2009-03-25T08:44:20
     *       TMed=1
     *   ```
     */

    public statusServico(): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)

        let status = this.getAcbrlib().MDFE_StatusServico(this.getHandle(), acbrBuffer.getBuffer(),acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

     /**
     * Método usado para consultar um MDFe na SEFAZ.
     * @param eChaveOuMDFe Path com o nome do arquivo XML a ser consultado ou o conteúdo do XML.
     * @param AExtrairEventos Informe se deve ou não extrair os eventos, se houver os mesmos na reposta.
     * @returns Uma string com o resultado da consulta da MDFe
     * @example
     * ```ini
     * [CONSULTA]
    * Versao=1.07
    * TpAmb=2
    * VerAplic=SP_MDFE_PL_005c
    * CStat=100
    * XMotivo=Autorizado o uso da NF-e
    * CUF=35
    * ChMDFe=350XXXXXXXXXXXXXXXX550010000000220000000229
    * DhRecbto=2009-03-24T20:19:38
    * NProt=1350900073XXXXX
    * DigVal=OZl9uzQ+JVFPxNuqBJ/ex7TTxhc=
     * ```
     */

    public consultar(eChaveOuMDFe: string, AExtrairEventos: boolean): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_Consultar(this.getHandle(), eChaveOuMDFe, AExtrairEventos, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

     /**
     * @description Método usado para consultar o recibo de envio na SEFAZ.
     * @param recibo Número do recibo para consulta.
     * @returns Uma string com o resultado da consulta do recibo
     * @example
     * ```ini
     * [RETORNO]
    * Versao=1.10
    * TpAmb=2
    * VerAplic=SP_MDFE_PL_005c
    * NRec=35000000XXXXXXX
    * CStat=104
    * XMotivo=Lote processado
    * CUF=35
    * 
    [MDFe28]
    * Versao=1.07
    * Id=
    * TpAmb=2
    * VerAplic=SP_MDFE_PL_005c
    * CStat=100
    * XMotivo=Autorizado o uso da NF-e
    * CUF=35
    * ChMDFe=350XXXXXXXXXXXXXXXXX550010000000280000000281
    * DhRecbto=2009-03-25T09:25:04
    * NProt=13509000XXXXXXX
    * DigVal=UNTpscTtknjN5UOBUHa9PZPHJnE=
    * ```
     */


    public consultarRecibo(recibo: string): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_ConsultarRecibo(this.getHandle(), recibo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }
    

     /**
     * @description Método usado para gerar o PDF do DAMDFe de um MDFe carregado.
     * @returns 0 ou código de erro 
     */

    public imprimirPDF(): number {
        let status = this.getAcbrlib().MDFE_ImprimirPDF(this.getHandle())
        this._checkResult(status)
        return status
    }


    /**
     * @description Método usado para enviar um lote de MDFe para SEFAZ.
     * @param lote Numero do Lote a ser enviado.
     * @param imprimir Se True imprime o DAMDFe caso o NF-e for autorizado.
     * @param sincrono Se True imprime o envia em modo síncrono.
     * @param zipado Se True imprime o envia o arquivo zipado.
     * @returns Um string com o resultado do envio do lote para SEFAZ
     * @example
     * ```ini
     * [ENVIO]
    * Versao=1.10
    * TpAmb=2
    * VerAplic=SP_MDFE_PL_005c
    * CStat=103
    * XMotivo=Lote recebido com sucesso
    * CUF=35
    * NRec=35000000XXXXXXX
    * DhRecbto=2009-03-25T09:25:04
    * TMed=1
    * 
    [RETORNO]
    * Versao=1.10
    * TpAmb=2
    * VerAplic=SP_MDFE_PL_005c
    * NRec=35000000XXXXXXX
    * CStat=104
    * XMotivo=Lote processado
    * CUF=35
    * 
    [MDFe28]
    * Versao=1.07
    * Id=
    * TpAmb=2
    * VerAplic=SP_MDFE_PL_005c
    * CStat=100
    * XMotivo=Autorizado o uso da NF-e
    * CUF=35
    * ChMDFe=350XXXXXXXXXXXXXXXXX550010000000280000000281
    * DhRecbto=2009-03-25T09:25:04
    * NProt=13509000XXXXXXX
    * DigVal=UNTpscTtknjN5UOBUHa9PZPHJnE=
     * ```
     */

    public enviar(lote: number, imprimir: boolean, sincrono: boolean, zipado: boolean): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_Enviar(this.getHandle(), lote, imprimir, sincrono, zipado, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

     /**
     * @description Método usado para Cancelar um MDFe na SEFAZ.
     * @param chave Chave de acesso do XML a ser cancelado.
     * @param justificativa Motivo do cancelamento. 
     * @param CNPJ CNPJ do emitente.
     * @param lote Numero do Lote do evento de cancelamento.
     * @returns 
     * ```ini
     * [CANCELAMENTO]
    * Versao=1.07
    * TpAmb=2
    * VerAplic=SP_MDFE_PL_005c
    * CStat=101
    * XMotivo=Cancelamento de NF-e homologado
    * CUF=35
    * ChMDFe=350XXXXXXXXXXXXXXXXX550010000000220000000229
    * DhRecbto=2009-03-25T08:50:50
    * NProt=2009-03-25T08:50:50
    * tpEvento=
    * xEvento=
    * nSeqEvento=
    * CNPJDest=
    * emailDest=
    * XML=
     * ```
     */

    public cancelar(chave: string, justificativa: string, CNPJ: string, lote: number): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_Cancelar(this.getHandle(), chave, justificativa, CNPJ, lote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


     /**
     * @description Método usado para Enviar um Evento para SEFAZ.
     * @param idLote Numero do Lote do evento.
     * @returns 
     * ```ini
     * [Evento]
    * idLote=
    * cOrgao=
    * 
    [EVENTO001]
    * tpAmb=
    * VerAplic=
    * CStat=
    * XMotivo=
    * chMDFe=
    * nProt=
    * arquivo=
    * digVal=
    * Id=
    * cOrgao=
    * dhRegEvento=
    * tpEvento=
    * xEvento=
    * nSeqEvento=
    * CNPJDest=
    * emailDest=
    * XML=
     * ```
     */

    public enviarEvento(idLote: number): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_EnviarEvento(this.getHandle(), idLote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


      /**
     * @description Método usado para Baixar documentos do Ambiente Nacional através do método DistribuicaoDFe informando o último NSU retornado pela execução anterior.
     * @param ufAutor Código da UF do autor da consulta.
     * @param eCNPJCPF CNPJ/CPF do autor da consulta.
     * @param eultNSU Numero do ultimo NSU.
     * @returns 
     */


    public distribuicaoDFePorUltNSU(ufAutor: string, eCNPJCPF: string, eultNSU: string): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_DistribuicaoDFePorUltNSU(this.getHandle(), ufAutor, eCNPJCPF, eultNSU, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }
     /**
    * @description Método usado para Baixar o documento do Ambiente Nacional através do método DistribuicaoDFe informando o seu NSU.
    * @param ufAutor Código da UF do autor da consulta.
    * @param eCNPJCPF CNPJ/CPF do autor da consulta.
    * @param eNSU Numero do NSU do documento.
    * @returns Uma string com o { @link  https://acbr.sourceforge.io/ACBrLib/MDFE_DistribuicaoDFePorNSU.html | documento}  solicitado
    */

    public distribuicaoDFePorNSU(ufAutor: number, eCNPJCPF: string, eNSU: string): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_DistribuicaoDFePorNSU(this.getHandle(), ufAutor, eCNPJCPF, eNSU, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * @description Método usado para Baixar o MDFe do Ambiente Nacional através do método DistribuicaoDFe informando o a sua chave.
     * @param ufAutor Código da UF do autor da consulta.
     * @param eCNPJCPF CNPJ/CPF do autor da consulta.
     * @param eChave Chave do MDFe.
     * @returns Uma string com a MDFe baixada do Ambiente Nacional
     */

    public distribuicaoDFePorChave(ufAutor: number, eCNPJCPF: string, eChave: string): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_DistribuicaoDFePorChave(this.getHandle(), ufAutor, eCNPJCPF, eChave, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

     /**
     * @description Método usado para enviar e-mail através do componente ACBrMDFe.
     * @param ePara Destinatário.
     * @param eXMLMDFe Path ou conteúdo do xml.
     * @param enviaPDF Se True gera o PDF do DAMDFe e anexa ao e-mail.
     * @param eAssunto Texto contendo o assunto do e-mail.
     * @param eCC endereços separados por ponto e vírgula que receberão uma cópia do e-mail.
     * @param eAnexos Path com o nome de arquivos separados por ponto e vírgula a serem anexados ao e-mail.
     * @param eMensagem Texto referente a mensagem do e-mail.
     * @returns 0 ou código de erro
     */

    public enviarEmail(ePara: string, eXMLMDFe: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        let status = this.getAcbrlib().MDFE_EnviarEmail(this.getHandle(), ePara, eXMLMDFe, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
        this._checkResult(status)
        return status
    }

    
    /**
     * @description Método usado para enviar evento por e-mail através do componente ACBrMDFe.
     * @param ePara Destinatário.
     * @param eChaveEvento Path com o nome do arquivo XML do Evento a ser anexado ao e-mail.
     * @param eChaveMDFe Path com o nome do arquivo XML do MDFe a ser anexado ao e-mail.
     * @param enviaPDFSe True gera o PDF do DAMDFe e anexa ao e-mail.
     * @param eAssunto Texto contendo o assunto do e-mail.
     * @param eCC endereços separados por ponto e vírgula que receberão uma cópia do e-mail.
     * @param eAnexos Path com o nome de arquivos separados por ponto e vírgula a serem anexados ao e-mail.
     * @param eMensagem 
     * @returns 0 ou código de erro
     */


    public enviarEmailEvento(ePara: string, eChaveEvento: string, eChaveMDFe: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        let status = this.getAcbrlib().MDFE_EnviarEmailEvento(this.getHandle(), ePara, eChaveEvento, eChaveMDFe, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
        this._checkResult(status)
        return status
    }

     /**
     * @description Método usado para imprimir o DAMDFe/DANFCe dos MDFes/NFCes carregados.
     * @param cImpressora Nome da impressora onde será impresso o documento, senão informado será usado a impressora informada nas configurações.
     * @param nNumCopias Quantidade de copias a ser impresso, informe zero para usar o valor informado nas configurações.
     * @param cProtocolo Número do protocolo da MDFe.
     * @param bMostrarPreview Se informado "True" exibira o preview, se "False" senão quiser mostra ou vazio para usar os valores das configurações.
     * @param cMarcaDagua Define o caminho da imagem que será usada como marca d'água na impressão da DAMDFe, senão informado será usado o valor da configuração. 
     * @param bViaConsumidor Se informado "True" imprimira a via do consumidor, se "False" senão quiser mostra ou vazio para usar os valores das configurações, valido apenas para NFCe.
     * @param bSimplificado Se informado "True"  imprimira a DANFCe de forma simplificada, se "False" senão quiser mostra ou vazio para usar os valores das configurações, valido apenas para NFCe.
     * @returns 0 ou código de erro
     */



    public imprimir(cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string): number {
        let status = this.getAcbrlib().MDFE_Imprimir(this.getHandle(), cImpressora, nNumCopias, cProtocolo, bMostrarPreview, cMarcaDagua, bSimplificado, bViaConsumidor)
        this._checkResult(status)
        return status
    }

     /**
     * @description Método usado para gerar o PDF do DAMDFe de um MDFe carregado.
     * @returns 0 ou código de erro
     */


    public salvarPDF(): string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_SalvarPDF(this.getHandle(), acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * @description Método usado para imprimir um evento.
     * @param eArquivoXmlMDFe Path do arquivo XML da MDFe para impressão.
     * @param eArquivoXmlEvento Path do arquivo XML do evento para impressão.
     * @returns 0 ou código de erro
     */

    public imprimirEvento(eArquivoXmlMDFe: string, eArquivoXmlEvento: string): number {
        let status = this.getAcbrlib().MDFE_ImprimirEvento(this.getHandle(), eArquivoXmlMDFe, eArquivoXmlEvento)
        this._checkResult(status)
        return status
    }


    /**
     * @description Método usado para gerar o PDF de um evento.
     * @param eArquivoXmlMDFe Path do arquivo XML da MDFe para impressão.
     * @param eArquivoXmlEvento Path do arquivo XML do evento para impressão.
     * @returns 
     */

    public imprimirEventoPDF(eArquivoXmlMDFe: string, eArquivoXmlEvento: string): number {
        let status = this.getAcbrlib().MDFE_ImprimirEventoPDF(this.getHandle(), eArquivoXmlMDFe, eArquivoXmlEvento)
        this._checkResult(status)
        return status
    }


    
     /**
     * @description Método usado para salvar o PDF de um evento em formato Base64.
     * @param eArquivoXmlMDFe Path do arquivo XML da MDFe para  formato Base64.
     * @param eArquivoXmlEvento Path do arquivo XML do evento para  formato Base64.
     * @returns 0 ou código de erro
     */

    public salvarEventoPDF(eArquivoXmlMDFe: string, eArquivoXmlEvento: string): number {
        let status = this.getAcbrlib().MDFE_SalvarEventoPDF(this.getHandle(), eArquivoXmlMDFe, eArquivoXmlEvento)
        this._checkResult(status)
        return status
    }

}

export default ACBrLibMDFeMT