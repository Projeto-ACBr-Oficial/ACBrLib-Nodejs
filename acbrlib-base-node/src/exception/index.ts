
/**
 * ACBrLibError  é uma classe de Exception para lançar Exceçoes da ACBr
 * 
 */
export default class ACBrLibError extends Error {
    constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibLibNaoInicializadaError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibLibNaoFinalizadaError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibConfigLerError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibConfigGravarError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibArquivoNaoExisteError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibDiretorioNaoExisteError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibHttpError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibParametroInvalidoError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibExecutandoMetodoError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibNaoDisponivelEmModoConsoleError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibTimeOutError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


export class ACBrLibDemoExpiradoError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}

