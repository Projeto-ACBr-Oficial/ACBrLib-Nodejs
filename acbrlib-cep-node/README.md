# @projetoacbr/acbrlib-cep-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.7-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-cep-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib CEP Node** é uma implementação para consulta de CEP usando a biblioteca ACBrLibCEP. Esta classe fornece uma interface de alto nível para buscar informações de endereços através de CEPs, permitindo validação e consulta de logradouros.

## 🏗️ Arquitetura

Esta classe (`ACBrLibCepMT`) estende diretamente `ACBrLibBaseMT` e implementa métodos específicos para consulta de CEP.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-cep-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibCepMT oficial conforme documentação
import ACBrLibCepMT from "@projetoacbr/acbrlib-cep-node/dist/src";
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
const ACBrLibCepMT = require('@projetoacbr/acbrlib-cep-node/dist/src').default
```

### 🔧 Uso Básico

#### TypeScript
```typescript
import path from "path";
import os from "os";

const libName = os.platform() === 'win32' ? 'ACBrCEP64.dll' : 'libacbrcep64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrCep = new ACBrLibCepMT(libPath, eArqConfig, '');
```

#### JavaScript/CommonJS
```javascript
const path = require('path');
const os = require('os');

const libName = os.platform() === 'win32' ? 'ACBrCEP64.dll' : 'libacbrcep64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrCep = new ACBrLibCepMT(libPath, eArqConfig, '');

// Inicializar a biblioteca
acbrCep.inicializar();

// Buscar por CEP
const endereco = acbrCep.buscarPorCep('18270-170');
console.log('Endereço:', endereco);
```

## 🔧 Funcionalidades

### Métodos Herdados (Base)
- `inicializar()`, `finalizar()`
- `configLer()`, `configGravar()`
- `nome()`, `versao()`
- `ultimoRetorno()`

### Métodos Específicos do CEP

- **Consulta de CEP**
  - `buscarPorCep(cep)` - Busca informações de endereço por CEP

- **Validação**
  - Validação automática de formato de CEP
  - Tratamento de erros de CEP inválido

## 🔗 Dependências

- **@projetoacbr/acbrlib-base-node** - Classe base fundamental

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

## 📄 Licença

LGPL-2.1 License - veja o arquivo [LICENSE](../LICENSE) para detalhes.

---

**ACBrLib CEP Node** - Interface Node.js para ACBrLibCEP  
**Versão**: 1.0.7  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
