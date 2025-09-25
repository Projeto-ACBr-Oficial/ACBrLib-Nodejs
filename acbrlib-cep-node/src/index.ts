import ACBrLibCEPBridgeMT from "./bridge";
import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src";
import { TypeACBrCepMT } from "./bridge";
import { ACBrLibResultCodes } from '@projetoacbr/acbrlib-base-node/dist/src/exception/ACBrLibResultCodes';
import ACBrBuffer, { TAMANHO_PADRAO } from '@projetoacbr/acbrlib-base-node/dist/src/ACBrBuffer';

export default class ACBrLibCepMT extends ACBrLibBaseMT {

    public getAcbrlib(): TypeACBrCepMT;

    public getAcbrlib(): TypeACBrCepMT {
        return super.getAcbrlib() as TypeACBrCepMT
    }

    protected LIB_Inicializar(handle: any, configPath: string, chaveCrypt: string): number {
        return this.getAcbrlib().CEP_Inicializar(handle, configPath, chaveCrypt)
    }

    protected LIB_Finalizar(handle: any): number {
        return this.getAcbrlib().CEP_Finalizar(handle)
    }

    protected LIB_UltimoRetorno(handle: any, mensagem: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CEP_UltimoRetorno(handle, mensagem, refTamanho)
    }

    protected LIB_Nome(handle: any, nome: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CEP_Nome(handle, nome, refTamanho)
    }

    protected LIB_Versao(handle: any, versao: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CEP_Versao(handle, versao, refTamanho)
    }

    protected LIB_ConfigLer(handle: any, arqConfig: string): number {
        return this.getAcbrlib().CEP_ConfigLer(handle, arqConfig)
    }

    protected LIB_ConfigGravar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().CEP_ConfigGravar(handle, arqConfig)
    }

    protected LIB_ConfigLerValor(handle: any, sessao: string, chave: string, valor: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CEP_ConfigLerValor(handle, sessao, chave, valor, refTamanho)
    }

    protected LIB_ConfigGravarValor(handle: any, sessao: string, chave: string, valor: string): number {
        return this.getAcbrlib().CEP_ConfigGravarValor(handle, sessao, chave, valor)
    }

    protected LIB_ConfigImportar(handle: any, arqConfig: string): number {
        return this.getAcbrlib().CEP_ConfigImportar(handle, arqConfig)
    }

    protected LIB_ConfigExportar(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CEP_ConfigExportar(handle, configuracoes, refTamanho)
    }

    protected LIB_OpenSSLInfo(handle: any, configuracoes: Buffer, refTamanho: any): number {
        return this.getAcbrlib().CEP_OpenSSLInfo(handle, configuracoes, refTamanho)
    }

    constructor(libraryPath: string, arquivoConfig: string, chaveCrypt: string) {
        super(new ACBrLibCEPBridgeMT(libraryPath).getAcbrNativeLib(), arquivoConfig, chaveCrypt)
    }

    /**
     * Método usado para realizar uma consulta pelo numero do CEP no componente ACBrCEP.
     * @param cep CEP a ser buscado
     * @returns String contendo o resultado da consultas
     */
    public buscarPorCep(cep: string): string{
        using responseBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().CEP_BuscarPorCEP(this.getHandle(), cep, responseBuffer.getBuffer(), responseBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(responseBuffer)
    }

    /**
     * Método usado para realizar uma consulta pelo numero do CEP no componente ACBrCEP.
     * @param cidade Cidade a ser buscado
     * @param tipoLogradouro Tipo de logradouro a ser buscado
     * @param logradouro Logradouro a ser buscado
     * @param bairro Bairro do endereço a ser buscado
     * @param uf UF do endereço a ser buscado
     * @returns String contendo o resultado da consulta
     */
    public buscarPorLogradouro(cidade: string, tipoLogradouro: string, logradouro: string, uf: string, bairro: string): string{
        using acbrBuffer = new ACBrBuffer(TAMANHO_PADRAO)
        let status = this.getAcbrlib().CEP_BuscarPorLogradouro(this.getHandle(), cidade, tipoLogradouro, logradouro, uf, bairro, acbrBuffer.getBuffer(), acbrBuffer.getRefTamanhoBuffer())
        this._checkResult(status)
        return this._processaResult(acbrBuffer)
    }
}