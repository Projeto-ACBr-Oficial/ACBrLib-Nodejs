import ACBrLibDFeMT from "@projetoacbr/acbrlib-dfe-node/dist/src";
import ACBrBuffer from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";
import { TAMANHO_PADRAO } from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";

import { TypeACBrCTeMT } from "./bridge";
import ACBrLibCTeBridgeMT from "./bridge";
import ACBrLibCTeError, {
    ACBrLibCTeCNPJInvalidoError,
    ACBrLibCTeGerarXmlError,
    ACBrLibCTeIndexError
} from "./exception"

/**
 ** @description ACBrLibCTeMT é uma classe de alto nível que abstrai os métodos da ACBrLibCTe Multi-thread<br/>
 * Esta classe permite que programadores de javascript/typescript usem a ACBrLibCTe sem grandes preocupações.
 */

class ACBrLibCTeMT extends ACBrLibDFeMT  {
    
    /**
     * 
     * @param libraryPath é o caminho da biblioteca ACBrLibCTe (*.so ou *.dll)
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     */
    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibCTeBridgeMT(libraryPath).getAcbrNativeLib(), arquivoConfig, chaveCrypt)
    }


    public getAcbrlib(): TypeACBrCTeMT;


    public getAcbrlib(): TypeACBrCTeMT {
        return super.getAcbrlib() as TypeACBrCTeMT //cast de any para TypeACBrCTeMT
    }

    /**
     * Método usado para enviar o CTe
     * @param lote - Número do lote
     * @param imprimir - Se true imprime o documento
     * @param sincrono - Se true envia de forma síncrona
     * @returns String contendo o resultado do envio
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosCTe.html | Documentação oficial ACBrLib CTe}
     */
    public enviar(lote: number, imprimir: boolean, sincrono: boolean): string {
        using acbrBuffer: ACBrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.getAcbrlib().CTE_Enviar(this.getHandle(), lote, imprimir, sincrono, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para inutilizar uma faixa de numeração de CTe
     * @param CNPJ - CNPJ do emitente
     * @param justificativa - Justificativa da inutilização
     * @param ano - Ano de inutilização (formato YYYY)
     * @param modelo - Modelo do documento
     * @param serie - Série do documento
     * @param numeroInicial - Número inicial da faixa a ser inutilizada
     * @param numeroFinal - Número final da faixa a ser inutilizada
     * @returns XML de retorno da inutilização
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosCTe.html | Documentação oficial ACBrLib CTe}
     */
    public inutilizar(CNPJ: string, justificativa: string, ano: number, modelo: number, serie: number, numeroInicial: number, numeroFinal: number): string {
        using acbrBuffer: ACBrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        const status = this.getAcbrlib().CTE_Inutilizar(this.getHandle(), CNPJ, justificativa, ano, modelo, serie, numeroInicial, numeroFinal, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    /**
     * Método usado para imprimir o protocolo de inutilização do CTe
     * @param eArquivoXml - Caminho do arquivo XML de inutilização
     * @returns Código de status da operação (0 = sucesso)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosCTe.html | Documentação oficial ACBrLib CTe}
     */
    public imprimirInutilizacao(eArquivoXml: string): number {
        const status = this.getAcbrlib().CTE_ImprimirInutilizacao(this.getHandle(), eArquivoXml)
        this._checkResult(status)
        return status
    }

    /**
     * Método usado para imprimir o protocolo de inutilização do CTe em PDF
     * @param eArquivoXml - Caminho do arquivo XML de inutilização
     * @returns Código de status da operação (0 = sucesso)
     * @see {@link https://acbr.sourceforge.io/ACBrLib/MetodosCTe.html | Documentação oficial ACBrLib CTe}
     */
    public imprimirInutilizacaoPDF(eArquivoXml: string): number {
        const status = this.getAcbrlib().CTE_ImprimirInutilizacaoPDF(this.getHandle(), eArquivoXml)
        this._checkResult(status)
        return status
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS BASE =====

    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().CTE_Inicializar(handle, configPath, chaveCrypt)
    }
    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().CTE_Finalizar(handle)
    }
    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_UltimoRetorno(handle, mensagem, refTamanho)
    }
    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_Nome(handle, nome, refTamanho)
    }
    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_Versao(handle, versao, refTamanho)
    }
    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().CTE_ConfigLer(handle, arqConfig)
    }
    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().CTE_ConfigGravar(handle, arqConfig)
    }
    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }
    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().CTE_ConfigGravarValor(handle, sessao, chave, valor)
    }
    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().CTE_ConfigImportar(handle, arqConfig)
    }
    protected LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_ConfigExportar(handle, configuracoes, refTamanho)
    }
    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_OpenSSLInfo(handle, configuracoes, refTamanho)
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DFe COMUM =====

    protected LIB_CarregarXML(handle: any, arquivoXML: string): number {
        return this.getAcbrlib().CTE_CarregarXML(handle, arquivoXML)
    }
    protected LIB_CarregarINI(handle: any, arquivoINI: string): number {
        return this.getAcbrlib().CTE_CarregarINI(handle, arquivoINI)
    }
    protected LIB_ObterXml(handle: any, indice: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_ObterXml(handle, indice, buffer, refTamanho)
    }
    protected LIB_ObterIni(handle: any, indice: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_ObterIni(handle, indice, buffer, refTamanho)
    }
    protected LIB_GravarXml(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().CTE_GravarXml(handle, indice, nomeArquivo, caminhoArquivo)
    }
    protected LIB_GravarIni(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().CTE_GravarIni(handle, indice, nomeArquivo, caminhoArquivo)
    }
    protected LIB_LimparLista(handle: any): number {
        return this.getAcbrlib().CTE_LimparLista(handle)
    }
    protected LIB_ObterCertificados(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_ObterCertificados(handle, buffer, refTamanho)
    }
    protected LIB_ImprimirPDF(handle: any): number {
        return this.getAcbrlib().CTE_ImprimirPDF(handle)
    }
    protected LIB_SalvarPDF(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_SalvarPDF(handle, buffer, refTamanho)
    }
    protected LIB_EnviarEmail(handle: any, ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        return this.getAcbrlib().CTE_EnviarEmail(handle, ePara, eXMLDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DFe MT =====

    protected LIB_CarregarEventoXML(handle: any, arquivoXML: string): number {
        return this.getAcbrlib().CTE_CarregarEventoXML(handle, arquivoXML)
    }
    protected LIB_CarregarEventoINI(handle: any, arquivoINI: string): number {
        return this.getAcbrlib().CTE_CarregarEventoINI(handle, arquivoINI)
    }
    protected LIB_LimparListaEventos(handle: any): number {
        return this.getAcbrlib().CTE_LimparListaEventos(handle)
    }
    protected LIB_Assinar(handle: any): number {
        return this.getAcbrlib().CTE_Assinar(handle)
    }
    protected LIB_Validar(handle: any): number {
        return this.getAcbrlib().CTE_Validar(handle)
    }
    protected LIB_ValidarRegrasdeNegocios(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_ValidarRegrasdeNegocios(handle, buffer, refTamanho)
    }
    protected LIB_VerificarAssinatura(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_VerificarAssinatura(handle, buffer, refTamanho)
    }
    protected LIB_GerarChave(handle: any, ACodigoUF: number, ACodigoNumerico: number, AModelo: number, ASerie: number, ANumero: number, ATpEmi: number, AEmissao: string, ACNPJCPF: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_GerarChave(handle, ACodigoUF, ACodigoNumerico, AModelo, ASerie, ANumero, ATpEmi, AEmissao, ACNPJCPF, buffer, refTamanho)
    }
    protected LIB_GetPathEvento(handle: any, codigoEvento: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_GetPathEvento(handle, codigoEvento, buffer, refTamanho)
    }
    protected LIB_StatusServico(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_StatusServico(handle, buffer, refTamanho)
    }
    protected LIB_Consultar(handle: any, eChaveOuDocumento: string, AExtrairEventos: boolean, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_Consultar(handle, eChaveOuDocumento, AExtrairEventos, buffer, refTamanho)
    }
    protected LIB_ConsultarRecibo(handle: any, recibo: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_ConsultarRecibo(handle, recibo, buffer, refTamanho)
    }
    protected LIB_Imprimir(handle: any, cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string): number {
        return this.getAcbrlib().CTE_Imprimir(handle, cImpressora, nNumCopias, cProtocolo, bMostrarPreview, cMarcaDagua, bViaConsumidor, bSimplificado)
    }

    protected LIB_Cancelar(handle: any, chave: string, justificativa: string, CNPJ: string, lote: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_Cancelar(handle, chave, justificativa, CNPJ, lote, buffer, refTamanho)
    }
    protected LIB_EnviarEvento(handle: any, idLote: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_EnviarEvento(handle, idLote, buffer, refTamanho)
    }
    protected LIB_EnviarEmailEvento(handle: any, ePara: string, eChaveEvento: string, eChaveDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        return this.getAcbrlib().CTE_EnviarEmailEvento(handle, ePara, eChaveEvento, eChaveDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
    }
    protected LIB_ImprimirEvento(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        return this.getAcbrlib().CTE_ImprimirEvento(handle, eArquivoXmlDocumento, eArquivoXmlEvento)
    }
    protected LIB_ImprimirEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        return this.getAcbrlib().CTE_ImprimirEventoPDF(handle, eArquivoXmlDocumento, eArquivoXmlEvento)
    }
    protected LIB_SalvarEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_SalvarEventoPDF(handle, eArquivoXmlDocumento, eArquivoXmlEvento, buffer, refTamanho)
    }
    protected LIB_DistribuicaoDFePorUltNSU(handle: any, ufAutor: string, eCNPJCPF: string, eultNSU: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().CTE_DistribuicaoDFePorUltNSU(handle, ufAutor, eCNPJCPF, eultNSU, buffer, refTamanho)
    }
    protected LIB_DistribuicaoDFePorNSU(handle: any, ufAutor: number, eCNPJCPF: string, eNSU: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().CTE_DistribuicaoDFePorNSU(handle, ufAutor, eCNPJCPF, eNSU, buffer, refTamanho)
    }
    protected LIB_DistribuicaoDFePorChave(handle: any, ufAutor: number, eCNPJCPF: string, eChave: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().CTE_DistribuicaoDFePorChave(handle, ufAutor, eCNPJCPF, eChave, buffer, refTamanho)
    }
    protected LIB_GetPath(handle: any, tipo: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CTE_GetPath(handle, tipo, buffer, refTamanho)
    }

     



}

export default ACBrLibCTeMT