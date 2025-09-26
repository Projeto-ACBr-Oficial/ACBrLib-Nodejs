/**
 * Classe utilitária para conversões de tipos de dados específicas da ACBrLib
 * 
 * Esta classe fornece métodos estáticos para converter entre tipos de dados
 * JavaScript/TypeScript e os formatos esperados pelas bibliotecas nativas ACBr.
 * 
 */
export class ACBrDateConverter {
    // Constantes para conversão Pascal TDateTime - ES2022 compatible
    private static readonly MILLIS_PER_DAY = 86_400_000.0 as const;
    private static readonly UNIX_EPOCH_START_PASCAL = 25_569.0 as const;

    /**
     * Converte uma data JavaScript para o formato Pascal TDateTime
     * 
     * Pascal TDateTime representa datas como número de dias desde 30/12/1899
     * com a parte fracionária representando a hora do dia.
     * 
     * @param date - Data JavaScript a ser convertida
     * @returns O valor em Pascal TDateTime
     * @throws {TypeError} Quando o parâmetro não é uma instância de Date
     * @throws {RangeError} Quando a data é inválida ou anterior ao epoch Unix
     * 
     * @example
     * ```typescript
     * const date = new Date('2023-01-01T12:00:00Z');
     * const pascalDateTime = ACBrConverters.convertDateToPascalTDateTime(date);
     * console.log(pascalDateTime); // 44927.5
     * ```
     */
    static convertDateToPascalTDateTime(date: Date): number {
        // Validação de tipo usando ES2022 features
        if (!(date instanceof Date)) {
            throw new TypeError('Parâmetro deve ser uma instância de Date');
        }

        // Verificação de data inválida usando Number.isNaN (ES2015+, compatível com ES2022)
        if (Number.isNaN(date.getTime())) {
            throw new RangeError('Data inválida para conversão para Pascal TDateTime');
        }

        // Verificação de data anterior ao epoch Unix (1970-01-01)
        if (date.getTime() < 0) {
            throw new RangeError('Data anterior ao epoch Unix não é suportada');
        }

        // Conversão usando operadores matemáticos modernos
        return (date.getTime() / this.MILLIS_PER_DAY) + this.UNIX_EPOCH_START_PASCAL;
    }

    /**
     * Construtor privado para prevenir instanciação
     * Esta classe deve ser usada apenas através de seus métodos estáticos
     */
    private constructor() {
        throw new Error('ACBrDateConvert é uma classe utilitária e não deve ser instanciada');
    }
}


