
/**
 * Interface que abstrai o provedor FFI (Foreign Function Interface)
 * Permite usar diferentes bibliotecas FFI como Koffi, node-ffi-napi, etc.
 */
export interface IFFIProvider {
    /**
     * Carrega uma biblioteca nativa
     * @param libraryPath Caminho para a biblioteca nativa
     * @returns Handle da biblioteca carregada
     */
    load(libraryPath: string): any;

    /**
     * Define uma função da biblioteca nativa
     * @param lib Handle da biblioteca
     * @param funcName Nome da função
     * @param returnType Tipo de retorno
     * @param paramTypes Array com tipos dos parâmetros
     * @returns Função tipada
     */
    func(lib: any, funcName: string, returnType: string, paramTypes: string[]): Function;

    /**
     * Aloca memória
     * @param type Tipo de dados
     * @param size Tamanho
     * @returns Ponteiro para memória alocada
     */
    alloc(type: string, size: number): any;

    /**
     * Libera memória alocada
     * @param pointer Ponteiro para memória
     */
    free(pointer: any): void;

    /**
     * Decodifica um ponteiro
     * @param pointer Ponteiro
     * @param type Tipo de dados
     * @returns Valor decodificado
     */
    decode(pointer: any, type: string): any;

    /**
     * Codifica um valor em um ponteiro
     * @param pointer Ponteiro
     * @param type Tipo de dados
     * @param value Valor a ser codificado
     */
    encode(pointer: any, type: string, value: any): void;
}
