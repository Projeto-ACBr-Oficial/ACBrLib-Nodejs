import ACBrLibDFeMT from "acbrlib-dfe-node/dist/src";
import ACBrBuffer from "acbrlib-base-node/dist/src/ACBrBuffer";
import { TAMANHO_PADRAO } from "acbrlib-base-node/dist/src/ACBrBuffer";
import { TypeACBrNFeMT } from "./bridge";
import ACBrLibNFeBridgeMT from "./bridge";
import { ACBrLibResultCodes } from "acbrlib-base-node/dist/src/exception/ACBrLibResultCodes"
import ACBrLibNFeError, {
    ACBrLibNFeCNPJInvalidoError,
    ACBrLibNFeGerarXmlError,
    ACBrLibNFeIndexError
} from "./exception"
import { ACBrLibExecutandoMetodoError } from 'acbrlib-base-node/dist/src/exception';


/**
 ** @description ACBrLibNFeMT é uma classe de alto nível que abstrai os métodos da ACBrLibNFE Multi-thread<br/>
 * Esta classe permite que programadores de javascript/typescript usem a ACBrLibNFe sem grandes preocupações.
 */

class ACBrLibNFeMT extends ACBrLibDFeMT {
   
    /**
     * 
     * @param libraryPath é o caminho da biblioteca acbrlibnfe (*.so ou *.dll)
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     */
    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibNFeBridgeMT(libraryPath).getAcbrNativeLib(), arquivoConfig, chaveCrypt)
    }


    public getAcbrlib(): TypeACBrNFeMT;


    public getAcbrlib(): TypeACBrNFeMT {
        return super.getAcbrlib() as TypeACBrNFeMT //cast de any para TypeACBrNFeMT
    }

    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().NFE_Inicializar(handle, configPath, chaveCrypt)
    }
    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().NFE_Finalizar(handle)
    }
    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFE_UltimoRetorno(handle, mensagem, refTamanho)
    }
    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFE_Nome(handle, nome, refTamanho)
    }
    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFE_Versao(handle, versao, refTamanho)
    }
    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().NFE_ConfigLer(handle, arqConfig)
    }
    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().NFE_ConfigGravar(handle, arqConfig)
    }
    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFE_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }
    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().NFE_ConfigGravarValor(handle, sessao, chave, valor)
    }
    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().NFE_ConfigImportar(handle, arqConfig)
    }
    protected LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFE_ConfigExportar(handle, configuracoes, refTamanho)
    }

    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFE_OpenSSLInfo(handle, configuracoes, refTamanho)
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DA CLASSE DFe =====

    protected LIB_CarregarXML(handle: any, arquivoXML: string): number {
        return this.getAcbrlib().NFE_CarregarXML(handle, arquivoXML)
    }

    protected LIB_CarregarINI(handle: any, arquivoINI: string): number {
        return this.getAcbrlib().NFE_CarregarINI(handle, arquivoINI)
    }

    protected LIB_ObterXml(handle: any, indice: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_ObterXml(handle, indice, buffer, refTamanho)
    }

    protected LIB_GravarXml(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().NFE_GravarXml(handle, indice, nomeArquivo, caminhoArquivo)
    }

    protected LIB_ObterIni(handle: any, indice: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_ObterIni(handle, indice, buffer, refTamanho)
    }

    protected LIB_GravarIni(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().NFE_GravarIni(handle, indice, nomeArquivo, caminhoArquivo)
    }

    protected LIB_CarregarEventoXML(handle: any, arquivoXML: string): number {
        return this.getAcbrlib().NFE_CarregarEventoXML(handle, arquivoXML)
    }

    protected LIB_CarregarEventoINI(handle: any, arquivoINI: string): number {
        return this.getAcbrlib().NFE_CarregarEventoINI(handle, arquivoINI)
    }

    protected LIB_LimparLista(handle: any): number {
        return this.getAcbrlib().NFE_LimparLista(handle)
    }

    protected LIB_LimparListaEventos(handle: any): number {
        return this.getAcbrlib().NFE_LimparListaEventos(handle)
    }



    protected LIB_StatusServico(handle: any, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_StatusServico(handle, buffer, refTamanho)
    }

    protected LIB_Consultar(handle: any, eChaveOuDocumento: string, AExtrairEventos: boolean, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_Consultar(handle, eChaveOuDocumento, AExtrairEventos, buffer, refTamanho)
    }

    protected LIB_ConsultarRecibo(handle: any, recibo: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_ConsultarRecibo(handle, recibo, buffer, refTamanho)
    }



    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DE ACBrLibDFeDistribuicaoMT =====

    protected LIB_GetPath(handle: any, tipo: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_GetPath(handle, tipo, buffer, refTamanho)
    }

    protected LIB_ConsultaCadastro(handle: any, cUF: string, nDocumento: string, nIE: boolean, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_ConsultaCadastro(handle, cUF, nDocumento, nIE, buffer, refTamanho)
    }

    protected LIB_ImprimirInutilizacao(handle: any, eArquivoXml: string): number {
        return this.getAcbrlib().NFE_ImprimirInutilizacao(handle, eArquivoXml)
    }

    protected LIB_SalvarInutilizacaoPDF(handle: any, eArquivoXml: string): number {
        return this.getAcbrlib().NFE_SalvarInutilizacaoPDF(handle, eArquivoXml)
    }

    protected LIB_ImprimirInutilizacaoPDF(handle: any, eArquivoXml: string): number {
        return this.getAcbrlib().NFE_ImprimirInutilizacaoPDF(handle, eArquivoXml)
    }

    protected LIB_Imprimir(handle: any, cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string): number {
        return this.getAcbrlib().NFE_Imprimir(handle, cImpressora, nNumCopias, cProtocolo, bMostrarPreview, cMarcaDagua, bViaConsumidor, bSimplificado)
    }

    protected LIB_EnviarEmailEvento(handle: any, ePara: string, eChaveEvento: string, eChaveDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        return this.getAcbrlib().NFE_EnviarEmailEvento(handle, ePara, eChaveEvento, eChaveDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
    }

    protected LIB_ImprimirEvento(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        return this.getAcbrlib().NFE_ImprimirEvento(handle, eArquivoXmlDocumento, eArquivoXmlEvento)
    }

    protected LIB_ImprimirEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        return this.getAcbrlib().NFE_ImprimirEventoPDF(handle, eArquivoXmlDocumento, eArquivoXmlEvento)
    }

    protected LIB_SalvarEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        return this.getAcbrlib().NFE_SalvarEventoPDF(handle, eArquivoXmlDocumento, eArquivoXmlEvento)
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DE ACBrLibDFeComum =====

    protected LIB_Assinar(handle: any): number {
        return this.getAcbrlib().NFE_Assinar(handle)
    }

    protected LIB_Validar(handle: any): number {
        return this.getAcbrlib().NFE_Validar(handle)
    }

    protected LIB_ValidarRegrasdeNegocios(handle: any, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_ValidarRegrasdeNegocios(handle, buffer, refTamanho)
    }

    protected LIB_VerificarAssinatura(handle: any, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_VerificarAssinatura(handle, buffer, refTamanho)
    }

    protected LIB_GerarChave(handle: any, ACodigoUF: number, ACodigoNumerico: number, AModelo: number, ASerie: number, ANumero: number, ATpEmi: number, AEmissao: string, ACNPJCPF: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_GerarChave(handle, ACodigoUF, ACodigoNumerico, AModelo, ASerie, ANumero, ATpEmi, AEmissao, ACNPJCPF, buffer, refTamanho)
    }

    protected LIB_GetPathEvento(handle: any, codigoEvento: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_GetPathEvento(handle, codigoEvento, buffer, refTamanho)
    }

    protected LIB_ObterCertificados(handle: any, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_ObterCertificados(handle, buffer, refTamanho)
    }

    protected LIB_ImprimirPDF(handle: any): number {
        return this.getAcbrlib().NFE_ImprimirPDF(handle)
    }

    protected LIB_SalvarPDF(handle: any, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_SalvarPDF(handle, buffer, refTamanho)
    }

    protected LIB_Cancelar(handle: any, chave: string, justificativa: string, CNPJ: string, lote: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_Cancelar(handle, chave, justificativa, CNPJ, lote, buffer, refTamanho)
    }

    protected LIB_EnviarEvento(handle: any, idLote: number, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_EnviarEvento(handle, idLote, buffer, refTamanho)
    }

    protected LIB_EnviarEmail(handle: any, ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        return this.getAcbrlib().NFE_EnviarEmail(handle, ePara, eXMLDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
    }

    protected LIB_DistribuicaoDFePorUltNSU(handle: any, ufAutor: string, eCNPJCPF: string, eultNSU: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_DistribuicaoDFePorUltNSU(handle, ufAutor, eCNPJCPF, eultNSU, buffer, refTamanho)
    }

    protected LIB_DistribuicaoDFePorNSU(handle: any, ufAutor: number, eCNPJCPF: string, eNSU: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_DistribuicaoDFePorNSU(handle, ufAutor, eCNPJCPF, eNSU, buffer, refTamanho)
    }

    protected LIB_DistribuicaoDFePorChave(handle: any, ufAutor: number, eCNPJCPF: string, eChave: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().NFE_DistribuicaoDFePorChave(handle, ufAutor, eCNPJCPF, eChave, buffer, refTamanho)
    }

    protected LIB_Enviar(handle: any, lote: number, imprimir: boolean, sincrono: boolean, zipado: boolean, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().NFE_Enviar(this.getHandle(), lote, imprimir, sincrono, zipado, buffer, refTamanho);
    }

    // ===== MÉTODOS ESPECÍFICOS DA NFE =====

    _checkResult(result: number): void {

        // se o resultado é maior ou igual a OK, não há erro
        if (!this._isResultErrorCode(result)) {
            return;
        }

        super._checkResult(result);

        switch (result) {
            case ACBrLibResultCodes.ErrCNPJInvalido:
                throw new ACBrLibNFeCNPJInvalidoError(this.ultimoRetorno());
                break;

            case ACBrLibResultCodes.ErrGerarXml:
                throw new ACBrLibNFeGerarXmlError(this.ultimoRetorno());
                break;

            case ACBrLibResultCodes.ErrIndex:
                throw new ACBrLibNFeIndexError(this.ultimoRetorno());
                break;

            case ACBrLibResultCodes.ErrExecutandoMetodo:
                throw new ACBrLibExecutandoMetodoError(this.ultimoRetorno());
                break;
            default:
                throw new ACBrLibNFeError(this.ultimoRetorno());
                break;
        }


    }

    public inutilizar(CNPJ: string, justificativa: string, ano: number, modelo: number, serie: number, numeroInicial: number, numeroFinal: number): string {
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().NFE_Inutilizar(this.getHandle(), CNPJ, justificativa, ano, modelo, serie, numeroInicial, numeroFinal, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }

    public imprimirInutilizacao(eArquivoXml: string): number {
        let status = this.getAcbrlib().NFE_ImprimirInutilizacao(this.getHandle(), eArquivoXml)
        this._checkResult(status)
        return status
    }

    public imprimirInutilizacaoPDF(eArquivoXml: string): number {
        let status = this.getAcbrlib().NFE_ImprimirInutilizacaoPDF(this.getHandle(), eArquivoXml)
        this._checkResult(status)
        return status
    }

    public salvarInutilizacaoPDF(eArquivoXml: string): number {
        let status = this.getAcbrlib().NFE_SalvarInutilizacaoPDF(this.getHandle(), eArquivoXml)
        this._checkResult(status)
        return status
    }   


}

export default ACBrLibNFeMT