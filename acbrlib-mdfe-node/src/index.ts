import ACBrLibMDFeBridge, { ACBrNativeLibrary } from './bridge';
import { TAMANHO_PADRAO } from 'acbrlib-base-node/dist/src/ACBrBuffer';
import ACBrLibBase from 'acbrlib-base-node'


/**
 * @description ACBrLibMDFe é uma classe de alto nível que expõe os métodos da ACBrLibMDFe
 */

export default class ACBrLibMDFe extends ACBrLibBase {
    private acbrNativeLib: ACBrNativeLibrary

    /**
     * 
     * @param libraryPath  é o caminho da biblioteca acbrLibMDFe (*.so ou *.dll)
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     */

    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(arquivoConfig, chaveCrypt)
        let acbrMDFeBridge = new ACBrLibMDFeBridge(libraryPath)
        this.acbrNativeLib = acbrMDFeBridge.getAcbrNativeLib()
    }


    /**
    * @description Método usado para ler o arquivo XML para o componente acbrMDFe.
    * @param arquivoXML Path com o nome do arquivo XML a ser lido ou o conteúdo do XML.
    * @returns 0 ou código
    */


    public carregarXML(arquivoXML: string): number {
        let status = this.acbrNativeLib.MDFE_CarregarXML(arquivoXML)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para ler o arquivo INI para o componente acbrMDFe.
     * @param arquivoXML Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @returns 0 ou código de erro
     */

    public carregarINI(arquivoXML: string): number {
        let status = this.acbrNativeLib.MDFE_CarregarINI(arquivoXML)
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
        let status = this.acbrNativeLib.MDFE_ObterXml(indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     *  @description Método para gravar o xml da MDFe.
     * @param indice Posição da MDFe na lista, a lista inicia em 0.
     * @param nomeArquivo Nome do arquivo xml a ser salvo.
     * @param caminhoArquivo Local onde será salvo o xml.
     * @returns 0 ou código de erro
     */

    public gravarXml(indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        let status = this.acbrNativeLib.MDFE_GravarXml(indice, nomeArquivo, caminhoArquivo)
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
        let status = this.acbrNativeLib.MDFE_ObterIni(indice, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.acbrNativeLib.MDFE_GravarIni(indice, nomeArquivo, caminhoArquivo)
        return status

    }

    /**
     * @description Método usado para ler o arquivo XML para o componente acbrMDFe.
     * @param arquivoXML Path com o nome do arquivo XML a ser lido ou o conteúdo do XML.
     * @returns 0 ou código de erro
     */

    public carregarEventoXML(arquivoXML: string): number {
        let status = this.acbrNativeLib.MDFE_CarregarEventoXML(arquivoXML)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para ler o arquivo INI para o componente acbrMDFe.
     * @param arquivoXML Path com o nome do arquivo INI a ser lido ou o conteúdo do INI.
     * @returns 0 ou código de erro
     */

    public carregarEventoINI(arquivoXML: string): number {
        let status = this.acbrNativeLib.MDFE_CarregarEventoINI(arquivoXML)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para limpar a lista de notas no componente acbrMDFe.
     * @returns 0 ou código de erro
     */

    public limparLista() {
        let status = this.acbrNativeLib.MDFE_LimparLista()
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para limpar a lista de eventos no componente acbrMDFe
     * @returns 0 ou código de erro
     */

    public limparListaEventos() {
        let status = this.acbrNativeLib.MDFE_LimparListaEventos()
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para assinar as notas carregadas no componente acbrMDFe.
     * @returns 0 ou código de erro.
     */

    public assinar(): number {
        let status = this.acbrNativeLib.MDFE_Assinar()
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para validar as notas assinadas através do componente acbrMDFe.
     * @returns 0 ou código de erro
     */

    public validar(): number {
        let status = this.acbrNativeLib.MDFE_Validar()
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para Validar Regras de Negócios dos dados que se encontram no XML de uma NF-e.
     * @returns Uma string com informações da validação
     */

    public validarRegrasdeNegocio(): string {
        return this._getStringFromACBrLibBufferCallback(this.acbrNativeLib.MDFE_ValidarRegrasdeNegocios)
    }

    public verificarAssinatura(): string {
        return this._getStringFromACBrLibBufferCallback(this.acbrNativeLib.MDFE_VerificarAssinatura)
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
        let status = this.acbrNativeLib.MDFE_GerarChave(ACodigoUF, ACodigoNumerico, AModelo, ASerie, ANumero, ATpEmi, AEmissao, ACNPJCPF, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * @description Método usado retornar uma lista de dados do certificados instalados na maquina:
    - Com certificado Instalado no Windows e usando o Wincrypt, basta este metódo; 
    - Usando OpenSSL (Linux/Windows) devemos configurar o INI ( { @link https://acbr.sourceforge.io/ACBrLib/DFe.html | Configurações DFe }  ) informar o path e o arquivo pfx (ArquivoPFX=c:\temp\certificado.pfx) e a senha antes este método.

     */
    public obterCertificados(): string {
        return this._getStringFromACBrLibBufferCallback(this.acbrNativeLib.MDFE_ObterCertificados)
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
        let status = this.acbrNativeLib.MDFE_GetPath(tipo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * @description Método usado retornar o path onde será salvos os eventos gerado pela biblioteca.
     * @param codigoEvento O código do evento.
     * @returns 0 ou código de erro
     */

    public getPathEvento(codigoEvento:string):string {
        let acbrBuffer = this._createAcbrBuffer(TAMANHO_PADRAO)
        let status = this.acbrNativeLib.MDFE_GetPathEvento(codigoEvento,acbrBuffer.getBuffer(),acbrBuffer.getRefTamanhoBuffer())
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
        return this._getStringFromACBrLibBufferCallback(this.acbrNativeLib.MDFE_StatusServico)
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
        let status = this.acbrNativeLib.MDFE_Consultar(eChaveOuMDFe, AExtrairEventos, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.acbrNativeLib.MDFE_ConsultarRecibo(recibo, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }


    /**
     * @description Método usado para gerar o PDF do DAMDFe de um MDFe carregado.
     * @returns 0 ou código de erro 
     */
    public imprimirPDF(): number {
        let status = this.acbrNativeLib.MDFE_ImprimirPDF()
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
        let status = this.acbrNativeLib.MDFE_Enviar(lote, imprimir, sincrono, zipado, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.acbrNativeLib.MDFE_Cancelar(chave, justificativa, CNPJ, lote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.acbrNativeLib.MDFE_EnviarEvento(idLote, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.acbrNativeLib.MDFE_DistribuicaoDFePorUltNSU(ufAutor, eCNPJCPF, eultNSU, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.acbrNativeLib.MDFE_DistribuicaoDFePorNSU(ufAutor, eCNPJCPF, eNSU, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
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
        let status = this.acbrNativeLib.MDFE_DistribuicaoDFePorChave(ufAutor, eCNPJCPF, eChave, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * @description Método usado para enviar e-mail através do componente acbrMDFe.
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
        let status = this.acbrNativeLib.MDFE_EnviarEmail(ePara, eXMLMDFe, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para enviar evento por e-mail através do componente acbrMDFe.
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
        let status = this.acbrNativeLib.MDFE_EnviarEmailEvento(ePara, eChaveEvento, eChaveMDFe, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
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
        let status = this.acbrNativeLib.MDFE_Imprimir(cImpressora, nNumCopias, cProtocolo, bMostrarPreview, cMarcaDagua, bSimplificado, bViaConsumidor)
        this._checkResult(status)
        return status
    }

    /**
     * @description Método usado para gerar o PDF do DAMDFe de um MDFe carregado.
     * @returns 0 ou código de erro
     */

    public salvarPDF(): string {
        return this._getStringFromACBrLibBufferCallback(this.acbrNativeLib.MDFE_SalvarPDF)
    }

    /**
     * @description Método usado para imprimir um evento.
     * @param eArquivoXmlMDFe Path do arquivo XML da MDFe para impressão.
     * @param eArquivoXmlEvento Path do arquivo XML do evento para impressão.
     * @returns 0 ou código de erro
     */

    public imprimirEvento(eArquivoXmlMDFe: string, eArquivoXmlEvento: string): number {
        let status = this.acbrNativeLib.MDFE_ImprimirEvento(eArquivoXmlMDFe, eArquivoXmlEvento)
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
        let status = this.acbrNativeLib.MDFE_ImprimirEventoPDF(eArquivoXmlMDFe, eArquivoXmlEvento)
        this._checkResult(status)
        return status
    }


    
    /**
     * @description Método usado para salvar o PDF de um evento em formato Base64.
     * @param eArquivoXmlMDFe Path do arquivo XML da MDFe para  formato Base64.
     * @param eArquivoXmlEvento Path do arquivo XML do evento para  formato Base64.
     * @returns 0 ou código de erro
     */

    public salvarEventoPDF(eArquivoXmlMDFe:string, eArquivoXmlEvento:string): number {
        let status  = this.acbrNativeLib.MDFE_SalvarEventoPDF(eArquivoXmlMDFe, eArquivoXmlEvento)
        this._checkResult(status)
        return status 
    }

    protected LIB_Inicializar(configPath: string, chaveCrypt: string): number {
        let status = this.acbrNativeLib.MDFE_Inicializar(configPath, chaveCrypt)
        console.log(status)
        return status
    }
    protected LIB_Finalizar(): number {
        return this.acbrNativeLib.MDFE_Finalizar()
    }
    protected LIB_UltimoRetorno(mensagem: Buffer, refTamanho: any): number {
        return this.acbrNativeLib.MDFE_UltimoRetorno(mensagem, refTamanho)
    }
    protected LIB_Nome(nome: Buffer, refTamanho: any): number {
        return this.acbrNativeLib.MDFE_Nome(nome, refTamanho)
    }
    protected LIB_Versao(versao: Buffer, refTamanho: any): number {
        return this.acbrNativeLib.MDFE_Versao(versao, refTamanho)
    }
    protected LIB_ConfigLer(arqConfig: string): number {
        return this.acbrNativeLib.MDFE_ConfigLer(arqConfig)
    }
    protected LIB_ConfigGravar(arqConfig: string): number {
        return this.acbrNativeLib.MDFE_ConfigGravar(arqConfig)
    }
    protected LIB_ConfigLerValor(sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.acbrNativeLib.MDFE_ConfigLerValor(sessao, chave, valor, refTamanho)
    }
    protected LIB_ConfigGravarValor(sessao: string, chave: string, valor: string): number {
        return this.acbrNativeLib.MDFE_ConfigGravarValor(sessao, chave, valor)
    }
    protected LIB_ConfigImportar(arqConfig: string): number {
        return this.acbrNativeLib.MDFE_ConfigImportar(arqConfig)
    }
    protected LIB_ConfigExportar(configuracoes: Buffer, refTamanho: any): number {
        return this.acbrNativeLib.MDFE_ConfigExportar(configuracoes, refTamanho)
    }

    protected LIB_OpenSSLInfo(configuracoes: Buffer, refTamanho: any): number {
        return this.acbrNativeLib.MDFE_OpenSSLInfo(configuracoes, refTamanho)
    }



}
