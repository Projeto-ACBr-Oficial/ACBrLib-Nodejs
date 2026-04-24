# ACBrLib REINF Node.js

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-blue.svg)](https://opensource.org/licenses/LGPL-2.1)
[![Version](https://img.shields.io/badge/version-1.0.5-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-reinf-node)

Pacote Node.js para integração com a **ACBrLibReinf**, fornecendo uma interface de alto nível para envio e consulta de eventos do **REINF (Retenções e Outras Informações Fiscais)** da Receita Federal do Brasil.

## 📋 Sobre

O **acbrlib-reinf-node** permite que aplicações Node.js/TypeScript integrem facilmente com o sistema REINF da Receita Federal, facilitando:

- Criação e envio de eventos REINF
- Consulta de protocolos e recibos
- Validação de eventos
- Configuração de parâmetros do contribuinte

## 🏗️ Arquitetura

Este pacote estende a `ACBrLibBaseMT`, oferecendo métodos específicos para REINF:

```
ACBrLibBaseMT (do @projetoacbr/acbrlib-base-node)
    ↳ ACBrLibReinfMT
```

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-reinf-node
```

## 🚀 Uso Básico

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibReinfMT oficial conforme documentação
import ACBrLibReinfMT from "@projetoacbr/acbrlib-reinf-node/dist/src";
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
const ACBrLibReinfMT = require('@projetoacbr/acbrlib-reinf-node/dist/src').default;
```

### 🔧 Configuração e Uso

#### TypeScript
```typescript
import path from "path";
import os from "os";

const libName = os.platform() === 'win32' ? 'ACBrReinf64.dll' : 'libacbrreinf64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrReinf = new ACBrLibReinfMT(libPath, eArqConfig, '');
```

#### JavaScript/CommonJS
```javascript
const path = require('path');
const os = require('os');

const libName = os.platform() === 'win32' ? 'ACBrReinf64.dll' : 'libacbrreinf64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrReinf = new ACBrLibReinfMT(libPath, eArqConfig, '');
```

## 🔧 Principais Funcionalidades

### Configuração do Contribuinte
- `setIDContribuinte(id)` - Define ID do contribuinte
- `setIDTransmissor(id)` - Define ID do transmissor
- `setTipoContribuinte(tipo)` - Define tipo do contribuinte (1=PF, 2=PJ)
- `setVersaoDF(versao)` - Define versão do layout DF

### Gestão de Eventos
- `criarEventoReinf(arquivoIni)` - Cria evento a partir de arquivo INI
- `validar()` - Valida evento carregado
- `enviarReinf()` - Envia evento para a Receita Federal

### Consultas
- `consultarReinf(protocolo)` - Consulta evento por protocolo
- `consultarReciboReinf(params...)` - Consulta recibo detalhado

### Utilitários
- `obterCertificados()` - Lista certificados digitais disponíveis

## 📋 Pré-requisitos

### Bibliotecas Nativas
- **Linux**: `libacbrreinf64.so`
- **Windows**: `ACBrReinf64.dll`

### Observações Técnicas
- **Windows**: Usar convenção de chamada `cdecl`
- **Ambos**: Utilizar versão MT (Multi-Thread)

### Como Obter as Bibliotecas
- **Downloads PRO**: [ACBrLib PRO](https://www.projetoacbr.com.br/forum/files/category/36-acbrlib-pro/)
- **Downloads DEMO**: [ACBrLib DEMO](https://www.projetoacbr.com.br/forum/files/category/63-acbrlib-demo/)

## ⚙️ Configuração

O pacote utiliza um arquivo de configuração `acbrlib.ini` para definir parâmetros da biblioteca.

## 📚 Dependências

- `@projetoacbr/acbrlib-base-node` - Funcionalidades base
- `koffi` - Interface FFI para bibliotecas nativas

## 📖 Documentação

Para documentação completa da ACBrLib, visite:
[Documentação Oficial ACBrLib](https://acbr.sourceforge.io/ACBrLib/BemVindo.html)

## 📄 Licença

Este projeto está licenciado sob **LGPL-2.1** - veja o arquivo [LICENSE](../LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Veja nosso [repositório principal](https://github.com/Projeto-ACBr-Oficial/ACBrLib-Nodejs) para mais informações.

## ⚠️ Status

**Em Desenvolvimento** - Este pacote está em fase de desenvolvimento e pode conter funcionalidades incompletas.
