
/***
 * Exceções da ACBrLib
 */

/**
 * ACBrLibError é uma classe de Exception para lançar Exceçoes da ACBr
 */
export default class ACBrLibError extends Error {
    constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibLibNaoInicializadaError é uma classe que lança uma exceção quando a biblioteca não está inicializada
 */
export class ACBrLibLibNaoInicializadaError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibLibNaoFinalizadaError é uma classe que lança uma exceção quando a biblioteca não está finalizada
 */
export class ACBrLibLibNaoFinalizadaError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibConfigLerError é uma classe que lança uma exceção quando ocorre um erro ao ler a configuração
 * ou quando o arquivo de configuração tem configurações inválidas
 * Erro comum é conversão de configurações para enumerado, por exemplo, Ambiente=2, quando o valor 2 não é um valor válido para o enumerado Ambiente, que tem os valores 1 (Produção) e 2 (Homologação)
 */
export class ACBrLibConfigLerError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibConfigGravarError é uma classe que lança uma exceção quando ocorre um erro ao gravar a configuração
 */
export class ACBrLibConfigGravarError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibArquivoNaoExisteError é uma classe que lança uma exceção quando o arquivo não existe
 */
export class ACBrLibArquivoNaoExisteError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibDiretorioNaoExisteError é uma classe que lança uma exceção quando o diretório acessado pelo método não existe
 * Erro comum é quando o método espera um diretório para salvar um arquivo, por exemplo, e o diretório não existe, ou seja, o caminho do diretório é inválido
 */

export class ACBrLibDiretorioNaoExisteError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}

/**
 * ACBrLibHttpError é uma classe que lança uma exceção quando ocorre um erro ao fazer uma requisição HTTP
 */
export class ACBrLibHttpError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}

/**
 * ACBrLibParametroInvalidoError é uma classe que lança uma exceção quando o parâmetro é inválido
 */
export class ACBrLibParametroInvalidoError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}

/**
 * ACBrLibExecutandoMetodoError é uma classe que lança uma exceção quando o método está sendo executado
 */
export class ACBrLibExecutandoMetodoError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibNaoDisponivelEmModoConsoleError é uma classe que lança uma exceção quando a biblioteca não está disponível em modo console
 */
export class ACBrLibNaoDisponivelEmModoConsoleError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}


/**
 * ACBrLibTimeOutError é uma classe que lança uma exceção quando o tempo de espera expira
 */
export class ACBrLibTimeOutError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}

/**
 * ACBrLibDemoExpiradoError é uma classe que lança uma exceção quando o demo expira
 * Ocorre quando passa 30 minutos após inicialização da biblioteca, ou seja, quando o tempo de uso do demo expira
 */
export class ACBrLibDemoExpiradoError extends ACBrLibError {
 constructor(msg: string){
        super(msg);
   }
}

