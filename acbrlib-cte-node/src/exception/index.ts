import ACBrLibError from '@projetoacbr/acbrlib-base-node/dist/src/exception';

export default class ACBrLibCTeError extends ACBrLibError {
    constructor(message: string){
        super(message);
    }
}


export class ACBrLibCTeIndexError extends ACBrLibCTeError {
    constructor(message: string){
        super("Indice fora do intervalo válido: " + message);	
    }
}

export class ACBrLibCTeGerarXmlError extends ACBrLibCTeError {
    constructor(message: string){
        super("Erro ao gerar XML: " + message);	
    }
}

export class ACBrLibCTeCNPJInvalidoError extends ACBrLibCTeError {
    constructor(message: string){
        super("CNPJ inválido: " + message);	
    }
}

export class ACBrLibCTeCPFInvalidoError extends ACBrLibCTeError {
    constructor(message: string){
        super("CPF inválido: " + message);	
    }
}
