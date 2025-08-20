import ACBrLibError from '@projetoacbr/acbrlib-base-node/dist/src/exception';

export default class ACBrLibMDFeError extends ACBrLibError {
    constructor(message: string){
        super(message);
    }
}


export class ACBrLibMDFeIndexError extends ACBrLibMDFeError {
    constructor(message: string){
        super("Indice fora do intervalo válido: " + message);	
    }
}

export class ACBrLibMDFeGerarXmlError extends ACBrLibMDFeError {
    constructor(message: string){
        super("Erro ao gerar XML: " + message);	
    }
}

export class ACBrLibMDFeCNPJInvalidoError extends ACBrLibMDFeError {
    constructor(message: string){
        super("CNPJ inválido: " + message);	
    }
}

export class ACBrLibMDFeCPFInvalidoError extends ACBrLibMDFeError {
    constructor(message: string){
        super("CPF inválido: " + message);	
    }
}
