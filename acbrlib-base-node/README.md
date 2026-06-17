# @projetoacbr/acbrlib-base-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.11-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-base-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib Base Node** é o pacote fundamental que fornece funcionalidades básicas para todos os outros pacotes da família ACBrLib-Nodejs. Esta classe base implementa funcionalidades essenciais como inicialização, configuração e gerenciamento de memória.

## 🏗️ Arquitetura

Esta é a classe base (`ACBrLibBaseMT`) que serve como fundamento para toda a hierarquia de pacotes ACBrLib-Nodejs.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-base-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript 

Configurações recomendas para Typescript com CommonJS

```typescript
// Importa a classe ACBrLibBaseMT oficial conforme documentação
import ACBrLibBaseMT from "@projetoacbr/acbrlib-base-node/dist/src";
```

**⚙️ Configuração tsconfig.json  recomendada:**

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
     "lib": [
      "esnext"
    ],
    "moduleResolution": "node",
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
  - `ACBrBuffer` - Classe para gerenciamento de buffers
  - `TAMANHO_PADRAO` - Constante para tamanho padrão de buffer

## 🔗 Dependências

- **koffi** - Para interface com bibliotecas nativas

## 📚 Documentação

Para informações detalhadas sobre cada método, consulte a documentação JSDoc incluída no código fonte.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/Projeto-ACBr-Oficial/ACBrLib-Nodejs/issues)
- **Documentação ACBrLib**: [https://acbr.sourceforge.io/ACBrLib/BemVindo.html](https://acbr.sourceforge.io/ACBrLib/BemVindo.html)

## 📋 Changelog

Para o histórico de mudanças entre versões publicadas, consulte o [ChangeLog.md](./ChangeLog.md).

## 📄 Licença

LGPL-2.1 License - veja o arquivo [LICENSE](../LICENSE) para detalhes.

---

**ACBrLib Base Node** - Classe base fundamental para ACBrLib-Nodejs  
**Versão**: 1.0.11 
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)

