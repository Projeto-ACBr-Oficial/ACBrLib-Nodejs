import ACBrLibError from "@projetoacbr/acbrlib-base-node/dist/src/exception";

/**
 * ACBrLibNFSeError é uma classe que lança uma exceção específica para erros relacionados à NFSe
 */
export default class ACBrLibNFSeError extends ACBrLibError {
    constructor(msg: string) {
        super(msg);
    }
}