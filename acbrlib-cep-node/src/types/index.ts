import { IACBrLibBaseMT } from "@projetoacbr/acbrlib-base-node";

export default interface IACBrLibCepMT extends IACBrLibBaseMT {
    /**
     * Método usado para realizar uma consulta pelo numero do CEP no componente ACBrCEP.
     * @param cep CEP a ser buscado
     * @returns String contendo o resultado da consulta
     */
    buscarPorCep(cep: string): string;

    /**
     * Método usado para realizar uma consulta pelo logradouro no componente ACBrCEP.
     * @param cidade Cidade a ser buscada
     * @param tipoLogradouro Tipo de logradouro a ser buscado
     * @param logradouro Logradouro a ser buscado
     * @param uf UF do endereço a ser buscado
     * @param bairro Bairro do endereço a ser buscado
     * @returns String contendo o resultado da consulta
     */
    buscarPorLogradouro(cidade: string, tipoLogradouro: string, logradouro: string, uf: string, bairro: string): string;
}