# @projetoacbr/acbrlib-base-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-base-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib Base Node** é o pacote fundamental que fornece funcionalidades básicas para todos os outros pacotes da família ACBrLib-Nodejs. Esta classe base implementa funcionalidades essenciais como inicialização, configuração e gerenciamento de memória.

### 🎯 Resumo das Funcionalidades Principais

- **🏗️ Classe Base Abstrata**: `ACBrLibBaseMT` - fundamento para todas as implementações
- **🔌 Arquitetura Desacoplada**: Interfaces bem definidas (`IFFIProvider`, `IACBrLibBridgeMT`, `IACBrLibBaseMT`)
- **💾 Gerenciamento Automático de Memória**: `ACBrBuffer` com auto-cleanup via `using` declaration
- **⚡ Abstração Completa**: Esconde detalhes de FFI, ponteiros, buffers e alocação de memória
- **🎭 Provedor FFI Padrão**: `getDefaultFFIProvider()` retorna `KoffiFFIProvider` configurado
- **📋 Interfaces Específicas**: Padrão `IACBrLib[Nome]MT` para cada biblioteca (CEP, NFe, NFSe, etc.)

### 🔧 Componentes Principais

| Componente | Descrição | Localização |
|------------|-----------|-------------|
| **ACBrLibBaseMT** | Classe base abstrata | `src/index.ts` |
| **ACBrBuffer** | Gerenciamento de buffers | `src/ACBrBuffer/` |
| **IFFIProvider** | Interface para provedores FFI | `src/types/` |
| **KoffiFFIProvider** | Implementação padrão FFI | `src/providers/` |
| **getDefaultFFIProvider** | Função para obter provedor padrão | `src/providers/` |

## 🏗️ Arquitetura

Esta é a classe base (`ACBrLibBaseMT`) que serve como fundamento para toda a hierarquia de pacotes ACBrLib-Nodejs.

### 🔌 Arquitetura Desacoplada

O pacote implementa uma **arquitetura desacoplada** através de interfaces bem definidas que permitem flexibilidade e extensibilidade:

#### 📋 Interfaces Principais

- **`IFFIProvider`** - Interface para provedores FFI (Foreign Function Interface)
- **`IACBrLibBridgeMT`** - Interface para bridges de bibliotecas nativas
- **`IACBrLibBaseMT`** - Interface base para todas as implementações ACBrLib

## 🎨 Padrões de Projeto Utilizados

Este projeto implementa diversos padrões de projeto para garantir flexibilidade, manutenibilidade e extensibilidade:

| Padrão | Descrição | Onde é Usado |
|--------|-----------|--------------|
| **[🌉 Bridge](https://pt.wikipedia.org/wiki/Bridge_(padr%C3%A3o_de_projeto))** | Separa abstração da implementação | `ACBrLibBridgeMT` classes |
| **[🔄 Singleton](https://pt.wikipedia.org/wiki/Singleton)** | Garante uma única instância | Bridge instances |
| **[📋 Strategy](https://pt.wikipedia.org/wiki/Strategy)** | Algoritmos intercambiáveis | `IFFIProvider` implementations |
| **[🏭 Factory Function](https://pt.wikipedia.org/wiki/Factory_Method)** | Criação de objetos padronizada | `getDefaultFFIProvider()` |

### 💡 Para Desenvolvedores

Documentações específicas estão disponíveis em suas respectivas pastas:
- **Providers**: [`src/providers/README.md`](src/providers/README.md) - Documentação dos provedores FFI
- **Types**: [`src/types/README.md`](src/types/README.md) - Documentação das interfaces

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-base-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibBaseMT oficial conforme documentação
import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src";
```

**⚙️ Configuração tsconfig.json recomendada:**
```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

#### 🔧 JavaScript/CommonJS

```javascript
const ACBrLibBaseMT = require('@projetoacbr/acbrlib-base-node/dist/src').default
```

### Uso Básico

```javascript
// Esta classe é abstrata e não deve ser instanciada diretamente
// Use as classes específicas que herdam dela:
// - ACBrLibDFeComum
// - ACBrLibNFeMT
// - ACBrLibMDFeMT
// - ACBrLibNFSeMT
// - ACBrLibCepMT
```

### 📐 Recomendações para Classes Filhas

**⚠️ IMPORTANTE**: Cada classe filha deve criar sua própria interface específica seguindo o padrão de nomenclatura, focando nos métodos de alto nível (a classe base abstrai os detalhes de baixo nível):

```typescript
// ✅ Recomendado: Cada biblioteca deve ter sua interface específica
interface IACBrLibCepMT extends IACBrLibBaseMT {
  // Métodos de alto nível - detalhes de buffer/memória abstraídos
  buscarPorCEP(cep: string): string;
}

interface IACBrLibNFeMT extends IACBrLibBaseMT {
  // Métodos de alto nível - detalhes de FFI abstraídos
  assinarNFe(xml: string): string;
}

interface IACBrLibNFSeMT extends IACBrLibBaseMT {
  // Métodos de alto nível - complexidade interna abstraída
  gerarNFSe(rps: string): string;
}
```

#### 🎯 Padrão de Nomenclatura

- **Base**: `IACBrLibBaseMT` (esta interface)
- **CEP**: `IACBrLibCepMT`
- **NFe**: `IACBrLibNFeMT`
- **NFSe**: `IACBrLibNFSeMT`
- **MDFe**: `IACBrLibMDFeMT`
- **PixCD**: `IACBrLibPixCDMT`
- **REINF**: `IACBrLibReinfMT`

#### 🔧 Abstração de Detalhes de Baixo Nível

A classe base **abstrai completamente** os seguintes aspectos técnicos:

```typescript
// ❌ Desenvolvedores NÃO precisam se preocupar com:
// - Gerenciamento de buffers (ACBrBuffer)
// - Alocação/liberação de memória  
// - Ponteiros e FFI (Foreign Function Interface)
// - Carregamento de bibliotecas nativas
// - Codificação/decodificação de dados

// ✅ Desenvolvedores focam APENAS em:
interface IACBrLib[Nome]MT extends IACBrLibBaseMT {
  // Métodos de negócio de alto nível
  metodoEspecifico(parametro: string): string;
}
```

**📝 Detalhes Abstraídos pela Classe Base:**
- **Buffers**: Gerenciamento automático via `ACBrBuffer` com auto-cleanup
- **Memória**: Alocação/liberação através do `IFFIProvider`
- **FFI**: Interface com bibliotecas nativas via `KoffiFFIProvider`
- **Ponteiros**: Manipulação segura de ponteiros C/C++

#### 💡 Benefícios da Abstração

- **Simplicidade**: Desenvolvedores focam apenas na lógica de negócio
- **Abstração completa**: Detalhes de baixo nível (buffers, ponteiros, FFI) são ocultados
- **Type Safety**: Garantia de tipos específicos para cada biblioteca
- **Intellisense**: Melhor experiência de desenvolvimento no IDE
- **Manutenibilidade**: Sem necessidade de gerenciar memória manualmente
- **Produtividade**: Desenvolvimento mais rápido sem complexidade técnica
- **Segurança**: Prevenção automática de vazamentos de memória

### 🔧 Uso Avançado com Interfaces

#### 🎭 Benefícios da Abstração Completa

A classe base `ACBrLibBaseMT` abstrai completamente a complexidade de baixo nível:

```typescript
// ✅ COM abstração ACBrLib (código simples que você escreve):
class ACBrLibCepMT extends ACBrLibBaseMT implements IACBrLibCepMT {
  buscarPorCEP(cep: string): string {
    // Tudo abstraído! Sem buffer, sem FFI, sem ponteiros
    return this.executarMetodo('BuscarPorCEP', [cep]);
  }
  // Fim! Classe base cuida de tudo mais.
}
```

**🛡️ A abstração elimina a necessidade de:**
- Carregar bibliotecas nativas manualmente
- Definir funções FFI com tipos específicos
- Alocar e liberar memória manualmente
- Gerenciar buffers e ponteiros
- Codificar/decodificar dados entre JavaScript e C/C++
- Tratar erros de FFI diretamente
- Controlar ciclo de vida de recursos nativos

#### Exemplo com Auto-Cleanup usando getDefaultFFIProvider

```typescript
import { getDefaultFFIProvider } from '@projetoacbr/acbrlib-base-node';
import ACBrBuffer from '@projetoacbr/acbrlib-base-node';

function exemploAutoCleanup() {
  // ✅ Sempre use getDefaultFFIProvider() 
  const ffiProvider = getDefaultFFIProvider();
  
  // Buffer será automaticamente liberado ao sair do escopo
  using buffer = new ACBrBuffer(ffiProvider, 1024);
  
  // Usar o buffer normalmente
  console.log(buffer.toString());
  
  // Cleanup automático aqui - não precisa chamar destroy()
}
```

## 🔧 Funcionalidades

### Métodos Principais

- **Inicialização e Finalização**
  - `inicializar(configPath, chaveCrypt)`
  - `finalizar()`

- **Configuração**
  - `configLer(arquivoConfig)`
  - `configGravar(arquivoConfig)`
  - `configLerValor(sessao, chave)`
  - `configGravarValor(sessao, chave, valor)`
  - `configImportar(arquivoConfig)`
  - `configExportar()`

- **Informações do Sistema**
  - `nome()`
  - `versao()`
  - `openSSLInfo()`
  - `ultimoRetorno()`

- **Gerenciamento de Memória**
  - `ACBrBuffer` - Classe para gerenciamento de buffers com auto-cleanup
  - `TAMANHO_PADRAO` - Constante para tamanho padrão de buffer

### 🔌 Interfaces e Provedores

#### IFFIProvider
Interface que abstrai o provedor FFI, permitindo usar diferentes bibliotecas FFI:

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

#### KoffiFFIProvider
Implementação padrão do `IFFIProvider` usando a biblioteca Koffi.

**⚠️ RECOMENDAÇÃO**: Use sempre a função `getDefaultFFIProvider()` para obter o provedor FFI:

```typescript
import { getDefaultFFIProvider } from '@projetoacbr/acbrlib-base-node';

// ✅ Recomendado: Use sempre getDefaultFFIProvider()
const ffiProvider = getDefaultFFIProvider(); // Retorna KoffiFFIProvider configurado
```

#### IACBrLibBridgeMT
Interface para bridges que carregam bibliotecas nativas:

```typescript
interface IACBrLibBridgeMT {
  loadLibrary(libraryPath: string): void;
  getAcbrNativeLib(): any;
}
```

**📋 Responsabilidades:**
- **Carregamento**: Carrega a biblioteca nativa específica para cada módulo ACBrLib
- **Abstração**: Esconde detalhes de carregamento de bibliotecas (.so/.dll)
- **Acesso**: Fornece referência à biblioteca nativa carregada
- **Gerenciamento**: Mantém o ciclo de vida da biblioteca nativa

**🎯 Implementação por Biblioteca:**
- `ACBrLibCepMT` → `libacbrcep.so` (Linux) / `ACBrCEP64.dll` (Windows)
- `ACBrLibNFeMT` → `libacbrnfe.so` (Linux) / `ACBrNFe64.dll` (Windows)  
- `ACBrLibNFSeMT` → `libacbrnfse.so` (Linux) / `ACBrNFSe64.dll` (Windows)
- `ACBrLibMDFeMT` → `libacbrmdfe.so` (Linux) / `ACBrMDFe64.dll` (Windows)

#### ACBrBuffer com Auto-Cleanup
A classe `ACBrBuffer` agora suporta auto-cleanup usando a declaração `using` (ES2022):

```typescript
// ✅ Sempre obtenha o provider via getDefaultFFIProvider()
const ffiProvider = getDefaultFFIProvider();

// Auto-cleanup automático
using buffer = new ACBrBuffer(ffiProvider, 1024);
// Buffer é automaticamente liberado ao sair do escopo

// Ou cleanup manual
const buffer = new ACBrBuffer(ffiProvider, 1024);
try {
  // usar buffer
} finally {
  buffer.destroy(); // Libera memória manualmente
}
```

## 🔗 Dependências

- **koffi** - Para interface com bibliotecas nativas (implementação padrão)

## 🎯 Benefícios da Arquitetura Desacoplada

### ✅ Flexibilidade
- **Troca de provedores FFI**: Fácil migração entre diferentes bibliotecas FFI (Koffi, node-ffi-napi, etc.)
- **Extensibilidade**: Novos provedores podem ser adicionados sem modificar o código existente

### 🛡️ Robustez
- **Gerenciamento automático de memória**: Auto-cleanup previne vazamentos
- **Interfaces tipadas**: TypeScript garante type safety em tempo de compilação

### 🔧 Facilidade de Manutenção
- **Separação de responsabilidades**: Cada interface tem um propósito específico
- **Testabilidade**: Interfaces podem ser facilmente mockadas para testes
- **Hierarquia clara**: Interface base + interfaces específicas = arquitetura organizada

## 🏛️ Padrão de Implementação para Desenvolvedores

### 📝 Criando uma Nova Biblioteca ACBrLib

Ao criar uma nova biblioteca baseada no ACBrLib Base Node, siga este padrão:

#### 1. Crie a Interface Específica

```typescript
// src/types/IACBrLibExemploMT.ts
import { IACBrLibBaseMT } from '@projetoacbr/acbrlib-base-node';

export interface IACBrLibExemploMT extends IACBrLibBaseMT {
  // Apenas métodos de alto nível - sem preocupação com buffers/memória
  metodoEspecifico(parametro: string): string;
  // A classe base cuida de: FFI, buffers, ponteiros, alocação de memória
}
```

#### 2. Implemente a Classe Concreta

```typescript
// src/ACBrLibExemploMT.ts
import ACBrLibBaseMT from '@projetoacbr/acbrlib-base-node';
import { IACBrLibExemploMT } from './types/IACBrLibExemploMT';

// ✅ CORRETO: Estende ACBrLibBaseMT E implementa a interface específica
export default class ACBrLibExemploMT extends ACBrLibBaseMT implements IACBrLibExemploMT {
  
  // Implementação simples - sem gerenciamento de buffer/memória
  metodoEspecifico(parametro: string): string {
    // A classe base abstrai: buffer allocation, FFI calls, memory management
    return this.executarMetodo('MetodoEspecifico', [parametro]);
  }
  
  // ✅ Desenvolvedor não precisa implementar:
  // - Gerenciamento de ACBrBuffer
  // - Alocação/liberação de memória
  // - Calls FFI diretas
  // - Manipulação de ponteiros
}
```

#### 3. Exporte Corretamente

```typescript
// src/index.ts
export { default } from './ACBrLibExemploMT';
export type { IACBrLibExemploMT } from './types/IACBrLibExemploMT';
```

### 🔍 Exemplo Completo de Implementação

```typescript
// ❌ ERRADO - Não estende ACBrLibBaseMT nem implementa interface
class ExemploErrado {
  metodoEspecifico(parametro: string): string {
    return 'exemplo';
  }
}

// ❌ ERRADO - Só estende mas não implementa interface
class ExemploErrado2 extends ACBrLibBaseMT {
  metodoEspecifico(parametro: string): string {
    return this.executarMetodo('MetodoEspecifico', [parametro]);
  }
}

// ❌ ERRADO - Só implementa interface mas não estende classe base
class ExemploErrado3 implements IACBrLibExemploMT {
  metodoEspecifico(parametro: string): string {
    return 'exemplo'; // Sem acesso aos métodos da classe base!
  }
}

// ✅ CORRETO - Estende ACBrLibBaseMT E implementa IACBrLibExemploMT
class ACBrLibExemploMT extends ACBrLibBaseMT implements IACBrLibExemploMT {
  metodoEspecifico(parametro: string): string {
    // Tem acesso a todos os métodos da classe base + type safety da interface
    return this.executarMetodo('MetodoEspecifico', [parametro]);
  }
}
```

### 🔍 Exemplo de Uso da Interface

```typescript
import ACBrLibExemploMT, { IACBrLibExemploMT } from '@projetoacbr/acbrlib-exemplo-node';

// Uso com interface para melhor type safety
const acbrLib: IACBrLibExemploMT = new ACBrLibExemploMT();

// Agora o TypeScript conhece todos os métodos disponíveis
acbrLib.inicializar('./config.ini', '');
const resultado = acbrLib.metodoEspecifico('parametro');
```

## 📚 Documentação

Para informações detalhadas sobre cada método, consulte a documentação JSDoc incluída no código fonte.

## 🎯 Melhores Práticas para Interfaces

### ✅ O que FAZER

- ✅ **Criar interface específica**: Sempre estenda `IACBrLibBaseMT` para sua biblioteca
- ✅ **Estender ACBrLibBaseMT**: Sua classe DEVE estender a classe base
- ✅ **Implementar interface específica**: Sua classe DEVE implementar `IACBrLib[Nome]MT`
- ✅ **Focar em alto nível**: Implemente apenas métodos de negócio
- ✅ **Seguir nomenclatura**: Use o padrão `IACBrLib[Nome]MT`
- ✅ **Usar provedor padrão**: Sempre use `getDefaultFFIProvider()` para obter o provedor FFI
- ✅ **Deixar abstração trabalhar**: Confie na classe base para gerenciar detalhes técnicos
- ✅ **Documentar métodos**: Adicione JSDoc em todos os métodos da interface
- ✅ **Tipagem forte**: Use tipos TypeScript específicos nos parâmetros e retornos
- ✅ **Exports organizados**: Exporte tanto a classe quanto a interface

### ❌ O que NÃO fazer

- ❌ **Usar IACBrLibBaseMT diretamente**: Esta é uma interface abstrata
- ❌ **Gerenciar buffers manualmente**: A classe base já faz isso
- ❌ **Criar provedores FFI personalizados**: Use sempre `getDefaultFFIProvider()`
- ❌ **Manipular ponteiros diretamente**: Deixe a abstração cuidar disso
- ❌ **Alocar/liberar memória manualmente**: ACBrBuffer tem auto-cleanup
- ❌ **Chamar FFI diretamente**: Use os métodos da classe base
- ❌ **Ignorar tipos**: Não use `any` desnecessariamente

### 📋 Checklist de Implementação

Ao criar uma nova biblioteca ACBrLib, verifique se:

- [ ] Criou interface específica que estende `IACBrLibBaseMT`
- [ ] Seguiu o padrão de nomenclatura `IACBrLib[Nome]MT`
- [ ] **Classe estende `ACBrLibBaseMT`** - herança obrigatória
- [ ] **Classe implementa `IACBrLib[Nome]MT`** - interface específica obrigatória  
- [ ] **Focou apenas em métodos de alto nível** (sem buffer/ponteiro/FFI)
- [ ] **NÃO tentou gerenciar memória manualmente** - deixou para a classe base
- [ ] Implementou todos os métodos da interface específica
- [ ] Adicionou métodos específicos com tipagem adequada
- [ ] Exportou corretamente classe e interface
- [ ] Documentou todos os métodos públicos
- [ ] Testou que a abstração funciona corretamente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/Projeto-ACBr-Oficial/ACBrLib-Nodejs/issues)
- **Documentação ACBrLib**: [https://acbr.sourceforge.io/ACBrLib/BemVindo.html](https://acbr.sourceforge.io/ACBrLib/BemVindo.html)

## 📄 Licença

LGPL-2.1 License - veja o arquivo [LICENSE](../LICENSE) para detalhes.

## 📁 Estrutura do Projeto

```
acbrlib-base-node/
├── src/
│   ├── index.ts                    # Classe ACBrLibBaseMT principal
│   ├── ACBrBuffer/                 # Gerenciamento automático de memória
│   │   └── index.ts                # ACBrBuffer com auto-cleanup
│   ├── providers/                  # Provedores FFI
│   │   ├── README.md              # 📋 Documentação dos provedores
│   │   ├── index.ts               # getDefaultFFIProvider()
│   │   └── KoffiFFIProvider.ts    # Implementação padrão com Koffi
│   ├── types/                     # Interfaces e tipos TypeScript
│   │   ├── README.md              # 📋 Documentação das interfaces
│   │   ├── index.ts               # IACBrLibBaseMT interface base
│   │   └── IFFIProvider.ts        # Interface para provedores FFI
│   ├── exception/                 # Códigos de erro e exceções
│   └── utils/                     # Utilitários diversos
└── README.md                      # 📖 Esta documentação
```

## 🚀 Links Úteis

### 📋 Documentação Técnica

- **📋 Documentação dos Providers**: [`src/providers/README.md`](src/providers/README.md)
- **📋 Documentação das Interfaces**: [`src/types/README.md`](src/types/README.md)

### 🌐 Recursos Externos

- **🏗️ Projeto ACBr**: [https://www.projetoacbr.com.br/](https://www.projetoacbr.com.br/)
- **📚 Documentação ACBrLib**: [https://acbr.sourceforge.io/ACBrLib/BemVindo.html](https://acbr.sourceforge.io/ACBrLib/BemVindo.html)

---

**ACBrLib Base Node** - Classe base fundamental para ACBrLib-Nodejs  
**Versão**: 1.0.1  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)  

**🎯 Principais Características**: Abstração completa de FFI, gerenciamento automático de memória, interfaces tipadas, arquitetura desacoplada e foco na produtividade do desenvolvedor.

