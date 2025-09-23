
import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src";

import ACBrLibPixCDBridge,{TypeACBrPIXCD} from "./bridge";


/**
 * ACBrLibPixCDMT é uma classe de alto nível que implementa os métodos da ACBrLibPixCD Multi-Thread
 */

export default class ACBrLibPixCDMT extends ACBrLibBaseMT {

    /**
     * 
     * @param libraryPath caminho para a biblioteca ACBrLibPixCD, note para windows a dll usa convenção de chamada cdecl
     * @param arquivoConfig arquivo de configuração
     * @param chaveCrypt chave de criptografia
     */
    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibPixCDBridge(libraryPath), arquivoConfig, chaveCrypt);
    }



    public getAcbrlib(): TypeACBrPIXCD ;

    public getAcbrlib(): TypeACBrPIXCD {
        return super.getAcbrlib() as TypeACBrPIXCD;
    }





    // implementação dos métodos abstratos da classe base
    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().PIXCD_Inicializar(handle, configPath, chaveCrypt)
    }

    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().PIXCD_Finalizar(handle)
    }

    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_UltimoRetorno(handle, mensagem, refTamanho)
    }

    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_Nome(handle, nome, refTamanho)
    }

    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_Versao(handle, versao, refTamanho)
    }

    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().PIXCD_ConfigLer(handle, arqConfig)
    }

    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().PIXCD_ConfigGravar(handle, arqConfig)
    }

    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }

    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().PIXCD_ConfigGravarValor(handle, sessao, chave, valor)
    }

    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().PIXCD_ConfigImportar(handle, arqConfig)
    }

    protected LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_ConfigExportar(handle, configuracoes, refTamanho)
    }

    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().PIXCD_OpenSSLInfo(handle, configuracoes, refTamanho)
    }









    
}