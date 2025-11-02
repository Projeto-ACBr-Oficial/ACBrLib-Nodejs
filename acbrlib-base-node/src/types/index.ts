export default interface IACBrLibBaseMT {
    inicializar(): number;
    inicializar(arquivoConfig: string, chaveCrypt: string): number;
    finalizar(): number;
    nome(): string;
    versao(): string;
    ultimoRetorno(): string;
    configLer(): number;
    configLer(arquivoConfig: string): number;
    configGravar(): number;
    configGravar(arquivoConfig: string): number;
    configLerValor(sessao: string, chave: string): string;
    configGravarValor(sessao: string, chave: string, valor: string): number;
    configExportar(): string;
    configImportar(config: string): number;
}

// Export additional types
export { IFFIProvider } from './IFFIProvider';