import * as koffi from 'koffi'

export const TAMANHO_PADRAO = 1024 

function deref(pointer: any, pointerType: string) {
    return koffi.decode(pointer, pointerType)
}

/**
 * ACBrBuffer é uma classe que representa um buffer
 * Implementa auto-cleanup com 'using' declaration
 */
export default class ACBrBuffer {
    private bufferSize: any
    private bufferData: Buffer
    private disposed = false

    /**
     * 
     * @param size Tamanho do buffer (usa valor padrão se inválido)
     */
    constructor(size: number  = TAMANHO_PADRAO) {
        // Se o valor for inválido, usa o padrão
        if (!Number.isFinite(size) || size <= 0) {
            size = TAMANHO_PADRAO
        }
        
        this.bufferSize = koffi.alloc("int", 1)
        this.bufferData = Buffer.alloc(size)
        koffi.encode(this.bufferSize, 'int', size)
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
        let size = deref(this.bufferSize, 'int')
        let strBuffer = this.bufferData.toString('utf8', 0, (Math.min(size, this.bufferData.length)))
        return strBuffer
    }

    /**
     * 
     * @description Destroi o buffer e liberando memoria dos recursos alocados
     */

    destroy() {
        if (!this.disposed) {
            koffi.free(this.bufferSize)
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