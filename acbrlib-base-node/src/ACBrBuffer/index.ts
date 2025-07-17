import * as koffi from 'koffi'

export const TAMANHO_PADRAO = 1024 

function deref(pointer: any, pointerType: string) {
    return koffi.decode(pointer, pointerType)
}

/**
 * ACBrBuffer é uma classe que representa um buffer
 */
export default class ACBrBuffer {
    private bufferSize: any
    private bufferData: Buffer

    constructor(size: number) {
        this.bufferSize = koffi.alloc("int", 1)
        this.bufferData = Buffer.alloc(size)
        koffi.encode(this.bufferSize, 'int', size)
    }

    getRefTamanhoBuffer() {
        return this.bufferSize
    }

    getBuffer() {
        return this.bufferData
    }

    toString() {
        let size = deref(this.bufferSize, 'int')
        let strBuffer = this.bufferData.toString('utf8', 0, (Math.min(size, this.bufferData.length)))
        return strBuffer
    }
}