# 🔌 Providers - Provedores FFI

Esta pasta contém os provedores FFI (Foreign Function Interface) que abstraem a interação com bibliotecas nativas.

## 📋 Visão Geral

Os providers são responsáveis por:
- **Carregar bibliotecas nativas** (.so no Linux, .dll no Windows)
- **Definir funções FFI** com tipos apropriados
- **Gerenciar alocação/liberação de memória**
- **Codificar/decodificar dados** entre JavaScript e C/C++

## 🏗️ Estrutura

```
providers/
├── index.ts              # Exportações e função getDefaultFFIProvider()
├── KoffiFFIProvider.ts    # Implementação padrão usando Koffi
└── README.md             # Esta documentação
```

## 🔧 Componentes

### KoffiFFIProvider
**Arquivo**: `KoffiFFIProvider.ts`

Implementação padrão do `IFFIProvider` usando a biblioteca [Koffi](https://www.npmjs.com/package/koffi).

```typescript
import { KoffiFFIProvider } from './KoffiFFIProvider';

const provider = new KoffiFFIProvider();
```

#### Métodos Implementados:
- `load(libraryPath)` - Carrega biblioteca nativa
- `func(lib, funcName, returnType, paramTypes)` - Define função FFI
- `alloc(type, size)` - Aloca memória
- `free(pointer)` - Libera memória
- `decode(pointer, type)` - Decodifica dados
- `encode(pointer, type, value)` - Codifica dados

### getDefaultFFIProvider()
**Arquivo**: `index.ts`

Função utilitária que retorna o provedor FFI padrão configurado.

```typescript
import { getDefaultFFIProvider } from '@projetoacbr/acbrlib-base-node';

// ✅ RECOMENDADO: Sempre use esta função
const ffiProvider = getDefaultFFIProvider();
```

#### Vantagens:
- **Configuração automática** do provedor
- **Consistência** em toda a aplicação
- **Facilita testes** e mocking
- **Permite troca futura** de implementação

### IACBrLibBridgeMT
**Arquivo**: `index.ts`

Interface para bridges que carregam bibliotecas nativas e fornecem acesso aos seus métodos.

```typescript
interface IACBrLibBridgeMT {
  loadLibrary(libraryPath: string): void;
  getAcbrNativeLib(): any;
}
```

#### Responsabilidades:
- **Carregar biblioteca nativa** específica (.so/.dll)
- **Fornecer acesso** à biblioteca já carregada
- **Abstrair detalhes** de carregamento
- **Gerenciar referência** da biblioteca nativa

#### Implementação Real (Baseada no ACBrLibCEPBridgeMT):
```typescript
// Interface tipada para métodos nativos específicos
export interface TypeACBrCepMT {
  CEP_Inicializar: (handle: any, configPath: string, chaveCrypt: string) => number;
  CEP_BuscarPorCEP: (handle: any, cep: string, mensagem: Buffer, refTamanho: any) => number;
  // ... outros métodos nativos
}

export default class ACBrLibCEPBridgeMT implements IACBrLibBridgeMT {
  #acbrNativeLib: TypeACBrCepMT;
  private static instance: ACBrLibCEPBridgeMT;

  // Singleton pattern
  public static getInstance(libraryPath: string): ACBrLibCEPBridgeMT {
    if (!ACBrLibCEPBridgeMT.instance) {
      ACBrLibCEPBridgeMT.instance = new ACBrLibCEPBridgeMT(libraryPath);
    }
    return ACBrLibCEPBridgeMT.instance;
  }

  private constructor(libraryPath: string) {
    this.#acbrNativeLib = this.#loadLibrary(libraryPath);
  }

  public getAcbrNativeLib(): TypeACBrCepMT {
    return this.#acbrNativeLib;
  }

  #loadLibrary(libraryPath: string): TypeACBrCepMT {
    const provider = getDefaultFFIProvider(); // ✅ Usa função recomendada
    const acbrcep = provider.load(libraryPath);

    return {
      CEP_BuscarPorCEP: provider.func(acbrcep, 'CEP_BuscarPorCEP', 'int', ['void *', 'string', 'char *', 'int *']),
      // ... mapeamento completo das funções nativas
    } as TypeACBrCepMT;
  }

  public loadLibrary(libraryPath: string): void {
    if (this.#acbrNativeLib === null) {
      this.#acbrNativeLib = this.#loadLibrary(libraryPath);
    }
  }
}
```

#### Uso nas Bibliotecas Específicas:
- **ACBrLibCepMT**: Carrega `libacbrcep.so`
- **ACBrLibNFeMT**: Carrega `libacbrnfe.so`
- **ACBrLibNFSeMT**: Carrega `libacbrnfse.so`
- **ACBrLibMDFeMT**: Carrega `libacbrmdfe.so`

## 🎯 Interfaces Principais

### IFFIProvider
Todos os providers devem implementar a interface `IFFIProvider`:

```typescript
interface IFFIProvider {
  load(libraryPath: string): any;
  func(lib: any, funcName: string, returnType: string, paramTypes: string[]): Function;
  alloc(type: string, size: number): any;
  free(pointer: any): void;
  decode(pointer: any, type: string): any;
  encode(pointer: any, type: string, value: any): void;
}
```

### IACBrLibBridgeMT
Interface para bridges de bibliotecas nativas:

```typescript
interface IACBrLibBridgeMT {
  loadLibrary(libraryPath: string): void;
  getAcbrNativeLib(): any;
}
```

## 🚀 Uso Recomendado

### ✅ Correto
```typescript
import { getDefaultFFIProvider } from '@projetoacbr/acbrlib-base-node';

// Use sempre a função padrão
const ffiProvider = getDefaultFFIProvider();
const buffer = new ACBrBuffer(ffiProvider, 1024);
```

### ❌ Evitar
```typescript
import { KoffiFFIProvider } from '@projetoacbr/acbrlib-base-node';

// Não instancie diretamente
const provider = new KoffiFFIProvider(); // ❌
```

## 🔮 Extensibilidade

Para criar um provider customizado:

```typescript
import { IFFIProvider } from '../types/IFFIProvider';

class MeuFFIProvider implements IFFIProvider {
  load(libraryPath: string): any {
    // Sua implementação
  }
  
  // ... outros métodos
}
```

**⚠️ Nota**: Recomenda-se usar sempre `getDefaultFFIProvider()` para manter consistência.

## 📚 Dependências

- **koffi**: Biblioteca FFI principal
- **IFFIProvider**: Interface base (../types/)

## 🎯 Responsabilidades

| Responsabilidade | Implementação |
|------------------|---------------|
| **Abstração FFI** | KoffiFFIProvider |
| **Gerenciamento de Memória** | alloc/free methods |
| **Carregamento de Bibliotecas** | IACBrLibBridgeMT |
| **Type Safety** | IFFIProvider interface |
| **Configuração Padrão** | getDefaultFFIProvider() |
| **Extensibilidade** | Interfaces bem definidas |
