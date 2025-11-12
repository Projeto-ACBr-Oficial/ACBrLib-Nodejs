import { IFFIProvider } from '../types/IFFIProvider';

export const TAMANHO_PADRAO = 1024 

/**
 * ACBrBuffer é uma classe que representa um buffer
 * Implementa auto-cleanup com 'using' declaration
 */
export default class ACBrBuffer {
    private bufferSize: any
    private bufferData: Buffer
    private disposed = false
    private ffiProvider: IFFIProvider

    /**
     * 
     * @param ffiProvider Provedor FFI para operações de memória
     * @param size Tamanho do buffer (usa valor padrão se inválido)
     */
    constructor(ffiProvider: IFFIProvider, size: number = TAMANHO_PADRAO) {
        this.ffiProvider = ffiProvider
        
        // Se o valor for inválido, usa o padrão
        if (!Number.isFinite(size) || size <= 0) {
            size = TAMANHO_PADRAO
        }
        
        this.bufferSize = this.ffiProvider.alloc("int", 1)
        this.bufferData = Buffer.alloc(size)
        // Encode do tamanho usando uma função auxiliar já que koffi.encode não existe na interface
        this.setBufferSize(size)
    }

    /**
     * Define o tamanho do buffer internamente
     * @param size Tamanho do buffer
     */
    private setBufferSize(size: number): void {
        this.ffiProvider.encode(this.bufferSize, 'int', size)
    }

    /**
     * @description Retorna a referencia do tamanho do buffer
     * @returns Referencia do tamanho do buffer
     */
    getRefTamanhoBuffer() {
        return this.bufferSize
    }

    /**
     * @description Retorna o buffer
     * @returns Buffer
     */
    getBuffer() {
        return this.bufferData
    }

    /**
     * @description Retorna a string do conteudo do buffer
     * @returns String do conteudo do buffer
     */
    toString() {
        return this.lerString()
    }

    /**
     * Lê a string do buffer usando o provedor FFI
     * @returns String do conteúdo do buffer
     */
    lerString(): string {
        let size = this.ffiProvider.decode(this.bufferSize, 'int')
        let strBuffer = this.bufferData.toString('utf8', 0, (Math.min(size, this.bufferData.length)))
        return strBuffer
    }

    /**
     * 
     * @description Destroi o buffer e liberando memoria dos recursos alocados
     */
    destroy() {
        if (!this.disposed) {
            this.ffiProvider.free(this.bufferSize)
            this.bufferSize = null
            this.disposed = true
        }
    }

    /**
     *    
     * @description Implementação do auto-cleanup com 'using' declaration
     */
    [Symbol.dispose]() {
        this.destroy()
    }
}