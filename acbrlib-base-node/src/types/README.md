# 📋 Types - Definições de Tipos e Interfaces

Esta pasta contém todas as definições de tipos TypeScript e interfaces que formam o contrato da arquitetura ACBrLib Base Node.

## 🎯 Visão Geral

As interfaces definem:
- **Contratos bem definidos** para implementações
- **Type Safety** em tempo de compilação
- **Abstração de implementação** específica
- **Extensibilidade** para novos provedores

## 🏗️ Estrutura

```
types/
├── index.ts           # Interface base IACBrLibBaseMT e exportações
├── IFFIProvider.ts    # Interface para provedores FFI
└── README.md         # Esta documentação
```

## 🔧 Interfaces Principais

### IACBrLibBaseMT
**Arquivo**: `index.ts`

Interface base que define o contrato padrão para todas as bibliotecas ACBrLib.

```typescript
interface IACBrLibBaseMT {
  // Métodos de inicialização
  inicializar(configPath: string, chaveCrypt: string): void;
  finalizar(): void;
  
  // Métodos de configuração
  configLer(arquivoConfig: string): void;
  configGravar(arquivoConfig: string): void;
  configLerValor(sessao: string, chave: string): string;
  configGravarValor(sessao: string, chave: string, valor: string): void;
  
  // Métodos informativos
  nome(): string;
  versao(): string;
  openSSLInfo(): string;
  ultimoRetorno(): string;
}
```

#### Características:
- **Base para todas as interfaces específicas**
- **Métodos comuns** a todas as bibliotecas
- **Abstrai detalhes de implementação**
- **Garante consistência** na API

### IFFIProvider
**Arquivo**: `IFFIProvider.ts`

Interface que abstrai o provedor FFI, permitindo diferentes implementações.

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

#### Responsabilidades:
- **Abstração de FFI** (Foreign Function Interface)
- **Gerenciamento de memória** nativa
- **Codificação/decodificação** de dados
- **Carregamento de bibliotecas** nativas

### IACBrLibBridgeMT
**Arquivo**: `../providers/index.ts`

Interface para bridges que gerenciam bibliotecas nativas específicas.

```typescript
interface IACBrLibBridgeMT {
  loadLibrary(libraryPath: string): void;
  getAcbrNativeLib(): any;
}
```

#### Propósito:
- **Abstração de carregamento** de bibliotecas nativas
- **Isolamento de responsabilidades** entre FFI e bibliotecas específicas
- **Padronização** do acesso às bibliotecas ACBr nativas
- **Facilita testes** com mocking das bibliotecas nativas

#### Fluxo de Uso Real:
```typescript
// 1. Obter instância singleton da bridge específica
const bridge = ACBrLibCEPBridgeMT.getInstance('./libacbrcep64.so');

// 2. Obter referência da biblioteca nativa já carregada e tipada
const nativeLib: TypeACBrCepMT = bridge.getAcbrNativeLib();

// 3. Usar métodos nativos com type safety
const resultado = nativeLib.CEP_BuscarPorCEP(handle, cep, buffer, refTamanho);

// 4. Na classe ACBrLibCepMT, usar através da classe base
class ACBrLibCepMT extends ACBrLibBaseMT implements IACBrLibCepMT {
  buscarPorCEP(cep: string): string {
    //acesso codigo nativo
  }
}
```

## 🔗 Relação Entre as Interfaces

### Arquitetura em Camadas
```typescript
┌─────────────────────┐
│   IACBrLibBaseMT    │ ← Interface base (métodos comuns)
│                     │
├─────────────────────┤
│ IACBrLib[Nome]MT    │ ← Interfaces específicas (estendem base)
│                     │
├─────────────────────┤
│  IACBrLibBridgeMT   │ ← Bridge para biblioteca nativa
│                     │
├─────────────────────┤
│    IFFIProvider     │ ← Provedor FFI (abstrai Koffi/outros)
│                     │
└─────────────────────┘
```

### Fluxo de Dados
1. **Aplicação** → Chama método da interface específica
2. **Interface Específica** → Implementa lógica de negócio  
3. **ACBrLibBaseMT** → Usa bridge para acessar biblioteca nativa
4. **IACBrLibBridgeMT** → Gerencia biblioteca nativa específica
5. **IFFIProvider** → Executa chamadas FFI de baixo nível

## 🎭 Padrão de Interfaces Específicas

### Nomenclatura
Cada biblioteca deve ter sua interface específica seguindo o padrão:

```typescript
// Padrão: IACBrLib[Nome]MT
interface IACBrLibCepMT extends IACBrLibBaseMT {
  buscarPorCEP(cep: string): string;
}

interface IACBrLibNFeMT extends IACBrLibBaseMT {
  assinarNFe(xml: string): string;
}

interface IACBrLibNFSeMT extends IACBrLibBaseMT {
  gerarNFSe(rps: string): string;
}
```

### Bibliotecas Suportadas

| Biblioteca | Interface | Descrição |
|------------|-----------|-----------|
| **CEP** | `IACBrLibCepMT` | Consulta de CEP |
| **NFe** | `IACBrLibNFeMT` | Nota Fiscal Eletrônica |
| **NFSe** | `IACBrLibNFSeMT` | Nota Fiscal de Serviços |
| **MDFe** | `IACBrLibMDFeMT` | Manifesto de Documentos Fiscais |
| **PixCD** | `IACBrLibPixCDMT` | PIX Cobrança Dinâmica |
| **REINF** | `IACBrLibReinfMT` | Eventos do eSocial |

## 🏛️ Arquitetura de Tipos

### Herança de Interfaces
```typescript
// Base
IACBrLibBaseMT

// Específicas (estendem a base)
├── IACBrLibCepMT
├── IACBrLibNFeMT
├── IACBrLibNFSeMT
├── IACBrLibMDFeMT
├── IACBrLibPixCDMT
└── IACBrLibReinfMT
```

### Implementação Obrigatória
```typescript
// ✅ CORRETO: Classe deve estender E implementar
class ACBrLibCepMT extends ACBrLibBaseMT implements IACBrLibCepMT {
  buscarPorCEP(cep: string): string {
    return this.executarMetodo('BuscarPorCEP', [cep]);
  }
}
```

## 🎯 Benefícios das Interfaces

### Type Safety
- **Verificação em tempo de compilação**
- **IntelliSense completo** no IDE
- **Prevenção de erros** de tipo

### Abstração
- **Esconde detalhes de implementação**
- **Foca na lógica de negócio**
- **Facilita manutenção**

### Extensibilidade
- **Fácil adição** de novas bibliotecas
- **Permite implementações alternativas**
- **Mantém compatibilidade**

## 🔧 Guia de Implementação

### 1. Criar Interface Específica
```typescript
// src/types/IACBrLibExemploMT.ts
import { IACBrLibBaseMT } from '@projetoacbr/acbrlib-base-node';

export interface IACBrLibExemploMT extends IACBrLibBaseMT {
  metodoEspecifico(parametro: string): string;
}
```

### 2. Implementar Classe Concreta
```typescript
// src/ACBrLibExemploMT.ts
import ACBrLibBaseMT from '@projetoacbr/acbrlib-base-node';
import { IACBrLibExemploMT } from './types/IACBrLibExemploMT';

export default class ACBrLibExemploMT extends ACBrLibBaseMT implements IACBrLibExemploMT {
  metodoEspecifico(parametro: string): string {
    return this.executarMetodo('MetodoEspecifico', [parametro]);
  }
}
```

### 3. Exportar Corretamente
```typescript
// src/index.ts
export { default } from './ACBrLibExemploMT';
export type { IACBrLibExemploMT } from './types/IACBrLibExemploMT';
```

## ✅ Melhores Práticas

### Interface Design
- **Métodos específicos** da biblioteca
- **Tipos explícitos** (evitar `any`)
- **Documentação JSDoc** completa
- **Nomes descritivos** e consistentes

### Implementação
- **Sempre estender** `ACBrLibBaseMT`
- **Sempre implementar** interface específica
- **Focar em alto nível** (sem FFI/buffers)
- **Deixar abstração trabalhar**

## 📚 Exemplos de Uso

### Com Type Safety
```typescript
import ACBrLibCepMT, { IACBrLibCepMT } from '@projetoacbr/acbrlib-cep-node';

const acbrCep: IACBrLibCepMT = new ACBrLibCepMT();
const resultado = acbrCep.buscarPorCEP('01310-100'); // ✅ Type checked
```

### Polimorfismo
```typescript
function processar(acbr: IACBrLibBaseMT) {
  acbr.inicializar('./config.ini', '');
  // Funciona com qualquer implementação específica
}
```

## 🔮 Extensibilidade Futura

A arquitetura permite:
- **Novos provedores FFI** (além do Koffi)
- **Novas bibliotecas ACBr** seguindo o padrão
- **Implementações alternativas** das interfaces
- **Compatibilidade com versões futuras**
