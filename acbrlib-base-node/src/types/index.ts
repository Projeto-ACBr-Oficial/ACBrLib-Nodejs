/**
 * Interface base para todas as bibliotecas ACBrLib Node.js
 * 
 * Define o contrato padrão que todas as interfaces específicas das bibliotecas ACBrLib 
 * devem estender, fornecendo métodos básicos comuns (inicialização, configuração, 
 * informações da biblioteca, etc.).
 * 
 * Todas as interfaces específicas devem estender esta interface:
 * IACBrLibCepMT, IACBrLibNFeMT, IACBrLibNFSeMT, IACBrLibPIXMT, etc.
 * 
 * @interface IACBrLibBaseMT
 * @version 1.1.0
 * @since 1.0.0
 */
export default interface IACBrLibBaseMT {
    /**
     * @description Método usado para inicializar o componente para uso da biblioteca
     * @returns 0 se sucesso ou o código de erro
     */
    inicializar(): number;

    /**
     * @description Método usado para inicializar o componente para uso da biblioteca
     * @param arquivoConfig Localização do arquivo INI, pode ser em branco neste caso o ACBrLib vai criar um novo arquivo INI.
     * @param chaveCrypt Chave de segurança para criptografar as informações confidencias, pode ser em branco neste caso será usado a senha padrão.
     * @returns 0 se sucesso ou o código de erro
     */
    inicializar(arquivoConfig: string, chaveCrypt: string): number;

    /**
     * @description Método usado para remover ACBrLib e suas classes da memoria
     * @returns 0 ou código de erro 
     */
    finalizar(): number;

    /**
     * @description Método que retorna o nome da biblioteca.
     * @returns Uma string com o nome da biblioteca
     */
    nome(): string;

    /**
     * @description Método que retorna a versão da biblioteca.
     * @returns Uma string com a versão da biblioteca
     */
    versao(): string;

    /**
     * @description Método usado para retornar o ultimo retorno processado pela biblioteca
     * @returns Retorna uma string com o último retorno processado pela biblioteca.
     */
    ultimoRetorno(): string;

    /**
     * @description Método usado para ler a configuração da biblioteca do arquivo INI padrão.
     * @returns 0 ou código de erro
     */
    configLer(): number;

    /**
     * @description Método usado para ler a configuração da biblioteca do arquivo INI informado.
     * @param arquivoConfig Arquivo INI para ler, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro 
     */
    configLer(arquivoConfig: string): number;

    /**
     * @description Método usado para gravar a configuração da biblioteca no arquivo INI padrão.
     * @returns 0 ou código de erro
     */
    configGravar(): number;

    /**
     * @description Método usado para gravar a configuração da biblioteca no arquivo INI informado.
     * @param arquivoConfig Arquivo INI para gravar, se informado vazio será usado o valor padrão.
     * @returns 0 ou código de erro
     */
    configGravar(arquivoConfig: string): number;

    /**
     * @description Método usado para ler um determinado item da configuração.
     * @param sessao Nome da sessão de configuração.
     * @param chave Nome da chave da sessão.
     * @returns Valor da configuração como string
     */
    configLerValor(sessao: string, chave: string): string;

    /**
     * @description Método usado para gravar um determinado item da configuração.
     * @param sessao Nome da sessão de configuração.
     * @param chave Nome da chave da sessão.
     * @param valor Valor para ser gravado na configuração 
     * @returns 0 ou código de erro
     */
    configGravarValor(sessao: string, chave: string, valor: string): number;

    /**
     * @description Método usado para exportar a configuração da biblioteca.
     * @returns Uma string com a configuração exportada.
     */
    configExportar(): string;

    /**
     * @description Método usado para importar a configuração da biblioteca do arquivo INI informado
     * @param config Arquivo INI para importar ou string com configuração.
     * @returns 0 ou código de erro
     */
    configImportar(config: string): number;

    /**
     * @description Método que retorna informações da biblioteca OpenSSL
     * @returns String com informações da biblioteca OpenSSL
     */
    openSslInfo(): string;
}

// Export additional types
export { IFFIProvider } from './IFFIProvider';