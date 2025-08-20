import ACBrLibError from '@projetoacbr/acbrlib-base-node/dist/src/exception';

export default class ACBrLibNFeError extends ACBrLibError {
    constructor(message: string){
        super(message);
    }
}


export class ACBrLibNFeIndexError extends ACBrLibNFeError {
    constructor(message: string){
        super("Indice fora do intervalo válido: " + message);	
    }
}

export class ACBrLibNFeGerarXmlError extends ACBrLibNFeError {
    constructor(message: string){
        super("Erro ao gerar XML: " + message);	
    }
}

export class ACBrLibNFeCNPJInvalidoError extends ACBrLibNFeError {
    constructor(message: string){
        super("CNPJ inválido: " + message);	
    }
}

export class ACBrLibNFeCPFInvalidoError extends ACBrLibNFeError {
    constructor(message: string){
        super("CPF inválido: " + message);	
    }
}
