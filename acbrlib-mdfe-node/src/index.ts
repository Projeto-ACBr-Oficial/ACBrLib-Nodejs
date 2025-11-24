import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src";
import ACBrLibDFeMT from "@projetoacbr/acbrlib-dfe-node/dist/src";
import ACBrBuffer from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";
import { TAMANHO_PADRAO } from "@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer";

import { TypeACBrMDFeMT } from "./bridge";
import ACBrLibMDFeBridgeMT from "./bridge";
import { ACBrLibResultCodes } from "@projetoacbr/acbrlib-base-node/dist/src/exception/ACBrLibResultCodes"
import ACBrLibMDFeError, {
    ACBrLibMDFeCNPJInvalidoError,
    ACBrLibMDFeGerarXmlError,
    ACBrLibMDFeIndexError
} from "./exception"
import { ACBrLibExecutandoMetodoError } from '@projetoacbr/acbrlib-base-node/dist/src/exception';



/**
 ** @description ACBrLibMDFeMT é uma classe de alto nível que abstrai os métodos da ACBrLibMDFe Multi-thread<br/>
 * Esta classe permite que programadores de javascript/typescript usem a ACBrLibMDFe sem grandes preocupações.
 */

class ACBrLibMDFeMT extends ACBrLibDFeMT  {
    
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

    /**
     * Método usado para enviar o documento
     * @param lote - Número do lote
     * @param imprimir - Se true imprime o documento
     * @param sincrono - Se true envia de forma síncrona
     * @returns String contendo o resultado do envio
     */
    public enviar(lote: number, imprimir: boolean, sincrono: boolean):string  {
        using acbrBuffer : ACBrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().MDFE_Enviar(this.getHandle(), lote, imprimir, sincrono, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }



    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS BASE =====

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

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DFe COMUM =====

    protected LIB_CarregarXML(handle: any, arquivoXML: string): number {
        return this.getAcbrlib().MDFE_CarregarXML(handle, arquivoXML)
    }
    protected LIB_CarregarINI(handle: any, arquivoINI: string): number {
        return this.getAcbrlib().MDFE_CarregarINI(handle, arquivoINI)
    }
    protected LIB_ObterXml(handle: any, indice: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_ObterXml(handle, indice, buffer, refTamanho)
    }
    protected LIB_ObterIni(handle: any, indice: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_ObterIni(handle, indice, buffer, refTamanho)
    }
    protected LIB_GravarXml(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().MDFE_GravarXml(handle, indice, nomeArquivo, caminhoArquivo)
    }
    protected LIB_GravarIni(handle: any, indice: number, nomeArquivo: string, caminhoArquivo: string): number {
        return this.getAcbrlib().MDFE_GravarIni(handle, indice, nomeArquivo, caminhoArquivo)
    }
    protected LIB_LimparLista(handle: any): number {
        return this.getAcbrlib().MDFE_LimparLista(handle)
    }
    protected LIB_ObterCertificados(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_ObterCertificados(handle, buffer, refTamanho)
    }
    protected LIB_ImprimirPDF(handle: any): number {
        return this.getAcbrlib().MDFE_ImprimirPDF(handle)
    }
    protected LIB_SalvarPDF(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_SalvarPDF(handle, buffer, refTamanho)
    }
    protected LIB_EnviarEmail(handle: any, ePara: string, eXMLDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        return this.getAcbrlib().MDFE_EnviarEmail(handle, ePara, eXMLDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
    }

    // ===== IMPLEMENTAÇÃO DOS MÉTODOS ABSTRATOS DFe MT =====

    protected LIB_CarregarEventoXML(handle: any, arquivoXML: string): number {
        return this.getAcbrlib().MDFE_CarregarEventoXML(handle, arquivoXML)
    }
    protected LIB_CarregarEventoINI(handle: any, arquivoINI: string): number {
        return this.getAcbrlib().MDFE_CarregarEventoINI(handle, arquivoINI)
    }
    protected LIB_LimparListaEventos(handle: any): number {
        return this.getAcbrlib().MDFE_LimparListaEventos(handle)
    }
    protected LIB_Assinar(handle: any): number {
        return this.getAcbrlib().MDFE_Assinar(handle)
    }
    protected LIB_Validar(handle: any): number {
        return this.getAcbrlib().MDFE_Validar(handle)
    }
    protected LIB_ValidarRegrasdeNegocios(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_ValidarRegrasdeNegocios(handle, buffer, refTamanho)
    }
    protected LIB_VerificarAssinatura(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_VerificarAssinatura(handle, buffer, refTamanho)
    }
    protected LIB_GerarChave(handle: any, ACodigoUF: number, ACodigoNumerico: number, AModelo: number, ASerie: number, ANumero: number, ATpEmi: number, AEmissao: string, ACNPJCPF: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_GerarChave(handle, ACodigoUF, ACodigoNumerico, AModelo, ASerie, ANumero, ATpEmi, AEmissao, ACNPJCPF, buffer, refTamanho)
    }
    protected LIB_GetPathEvento(handle: any, codigoEvento: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_GetPathEvento(handle, codigoEvento, buffer, refTamanho)
    }
    protected LIB_StatusServico(handle: any, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_StatusServico(handle, buffer, refTamanho)
    }
    protected LIB_Consultar(handle: any, eChaveOuDocumento: string, AExtrairEventos: boolean, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_Consultar(handle, eChaveOuDocumento, AExtrairEventos, buffer, refTamanho)
    }
    protected LIB_ConsultarRecibo(handle: any, recibo: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_ConsultarRecibo(handle, recibo, buffer, refTamanho)
    }
    protected LIB_Imprimir(handle: any, cImpressora: string, nNumCopias: number, cProtocolo: string, bMostrarPreview: string, cMarcaDagua: string, bViaConsumidor: string, bSimplificado: string): number {
        return this.getAcbrlib().MDFE_Imprimir(handle, cImpressora, nNumCopias, cProtocolo, bMostrarPreview, cMarcaDagua, bViaConsumidor, bSimplificado)
    }

    protected LIB_Cancelar(handle: any, chave: string, justificativa: string, CNPJ: string, lote: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_Cancelar(handle, chave, justificativa, CNPJ, lote, buffer, refTamanho)
    }
    protected LIB_EnviarEvento(handle: any, idLote: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_EnviarEvento(handle, idLote, buffer, refTamanho)
    }
    protected LIB_EnviarEmailEvento(handle: any, ePara: string, eChaveEvento: string, eChaveDocumento: string, enviaPDF: boolean, eAssunto: string, eCC: string, eAnexos: string, eMensagem: string): number {
        return this.getAcbrlib().MDFE_EnviarEmailEvento(handle, ePara, eChaveEvento, eChaveDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)
    }
    protected LIB_ImprimirEvento(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        return this.getAcbrlib().MDFE_ImprimirEvento(handle, eArquivoXmlDocumento, eArquivoXmlEvento)
    }
    protected LIB_ImprimirEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string): number {
        return this.getAcbrlib().MDFE_ImprimirEventoPDF(handle, eArquivoXmlDocumento, eArquivoXmlEvento)
    }
    protected LIB_SalvarEventoPDF(handle: any, eArquivoXmlDocumento: string, eArquivoXmlEvento: string, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_SalvarEventoPDF(handle, eArquivoXmlDocumento, eArquivoXmlEvento, buffer, refTamanho)
    }
    protected LIB_DistribuicaoDFePorUltNSU(handle: any, ufAutor: string, eCNPJCPF: string, eultNSU: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().MDFE_DistribuicaoDFePorUltNSU(handle, ufAutor, eCNPJCPF, eultNSU, buffer, refTamanho)
    }
    protected LIB_DistribuicaoDFePorNSU(handle: any, ufAutor: number, eCNPJCPF: string, eNSU: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().MDFE_DistribuicaoDFePorNSU(handle, ufAutor, eCNPJCPF, eNSU, buffer, refTamanho)
    }
    protected LIB_DistribuicaoDFePorChave(handle: any, ufAutor: number, eCNPJCPF: string, eChave: string, buffer: any, refTamanho: any): number {
        return this.getAcbrlib().MDFE_DistribuicaoDFePorChave(handle, ufAutor, eCNPJCPF, eChave, buffer, refTamanho)
    }
    protected LIB_GetPath(handle: any, tipo: number, buffer: Buffer, refTamanho: any): number {
        return this.getAcbrlib().MDFE_GetPath(handle, tipo, buffer, refTamanho)
    }

     



}

export default ACBrLibMDFeMT