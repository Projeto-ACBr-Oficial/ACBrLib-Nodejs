# ACBrLib-Nodejs

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.5.4-green.svg)](https://nodejs.org/)

## 📋 Descrição

**ACBrLib-Nodejs** é uma biblioteca Node.js/TypeScript que fornece interfaces de alto nível para as bibliotecas nativas da ACBr (Automação Comercial Brasil). Esta biblioteca permite que desenvolvedores JavaScript/TypeScript utilizem todas as funcionalidades da ACBrLib sem precisar lidar diretamente com as complexidades das bibliotecas nativas C/C++.

## 🏗️ Arquitetura

O projeto é organizado em uma hierarquia de pacotes que segue o padrão de herança:

```
ACBrLibBaseMT (classe base fundamental)
├── ACBrLibCepMT (implementação CEP)
├── ACBrLibReinfMT (implementação REINF)
├── ACBrLibPixCDMT (implementação PIX CD)
└── ACBrLibDFeComum (métodos comuns DFe)
    ├── ACBrLibNFSeMT (implementação NFSe)
    └── ACBrLibDFeMT (métodos comuns NFe/MDFe)
        ├── ACBrLibNFeMT (implementação NFe)
        └── ACBrLibMDFeMT (implementação MDFe)
```

## 📦 Pacotes Disponíveis

### 📊 Status dos Pacotes

| Pacote | Versão | Status | Publicado |
|--------|--------|--------|-----------|
| `@projetoacbr/acbrlib-base-node` | 1.0.11 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-dfe-node` | 1.0.11 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-nfe-node` | 1.0.10 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-mdfe-node` | 1.0.9 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-nfse-node` | 1.0.11 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-cte-node` | 1.0.2 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-cep-node` | 1.0.7 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-reinf-node` | 1.0.5 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-pixcd-node` | 1.0.0 | ✅ Disponível | ✅ Sim |

## 🚀 Instalação

```bash
# Pacotes específicos (dependências são instaladas automaticamente)
npm install @projetoacbr/acbrlib-nfe-node
npm install @projetoacbr/acbrlib-mdfe-node
npm install @projetoacbr/acbrlib-nfse-node
npm install @projetoacbr/acbrlib-cep-node
npm install @projetoacbr/acbrlib-pixcd-node
```

## 📖 Como Usar

### 🎯 Importação das Classes

#### 📝 TypeScript (Recomendado)

Para projetos TypeScript, use a importação ES6 com suporte completo a tipos:

```typescript
// ✅ TypeScript - Importação recomendada
// Importa a classe ACBrLibNFeMT oficial conforme documentação
import ACBrLibNFeMT from "@projetoacbr/acbrlib-nfe-node/dist/src";
import ACBrLibMDFeMT from "@projetoacbr/acbrlib-mdfe-node/dist/src";
import ACBrLibNFSeMT from "@projetoacbr/acbrlib-nfse-node/dist/src";
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

Para projetos JavaScript ou compatibilidade com CommonJS:

```javascript
// ✅ Forma correta (recomendada) - CommonJS
const ACBrLibNFeMT = require('@projetoacbr/acbrlib-nfe-node/dist/src').default
const ACBrLibMDFeMT = require('@projetoacbr/acbrlib-mdfe-node/dist/src').default
const ACBrLibNFSeMT = require('@projetoacbr/acbrlib-nfse-node/dist/src').default
const ACBrLibCepMT = require('@projetoacbr/acbrlib-cep-node/dist/src').default
```

### 🔧 Configuração Básica

#### TypeScript
```typescript
import ACBrLibNFeMT from "@projetoacbr/acbrlib-nfe-node/dist/src";
import path from "path";
import os from "os";

const libName = os.platform() === 'win32' ? 'ACBrNFe64.dll' : 'libacbrnfe64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrNFe = new ACBrLibNFeMT(libPath, eArqConfig, '');
```

#### JavaScript/CommonJS
```javascript
const ACBrLibNFeMT = require('@projetoacbr/acbrlib-nfe-node/dist/src').default;
const path = require('path');
const os = require('os');

const libName = os.platform() === 'win32' ? 'ACBrNFe64.dll' : 'libacbrnfe64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrNFe = new ACBrLibNFeMT(libPath, eArqConfig, '');
```

## 🔧 Requisitos do Sistema

### 📋 Dependências
- **Node.js** 18+ (recomendado 20+)
- **Bibliotecas nativas ACBr** correspondentes aos pacotes instalados

### 🔨 Para Desenvolvimento/Compilação
- **TypeScript** 5.5.4+ (apenas para compilar os pacotes)

### 📥 Onde Obter as Bibliotecas Nativas ACBr

**Downloads PRO**: [https://www.projetoacbr.com.br/forum/files/category/36-acbrlib-pro/](https://www.projetoacbr.com.br/forum/files/category/36-acbrlib-pro/)  
**Downloads DEMO**: [https://www.projetoacbr.com.br/forum/files/category/63-acbrlib-demo/](https://www.projetoacbr.com.br/forum/files/category/63-acbrlib-demo/)  

> **💡 Nota**: 
> - **PRO**: Binários pré-compilados para Windows e Linux
> - **DEMO**: Versões com limitações de funcionamento para testes
### 🐧 Linux
```bash
# Opção 1: Downloads PRO (binários pré-compilados)
# https://www.projetoacbr.com.br/forum/files/category/36-acbrlib-pro/

# Opção 2: Downloads DEMO (versões limitadas para testes)
# https://www.projetoacbr.com.br/forum/files/category/63-acbrlib-demo/

# ⚠️ Importante: Usar versão MT (Multi-Thread)
```

### 🪟 Windows
```bash
# Opção 1: Downloads PRO (DLLs pré-compiladas)
# https://www.projetoacbr.com.br/forum/files/category/36-acbrlib-pro/

# Opção 2: Downloads DEMO (versões limitadas para testes)
# https://www.projetoacbr.com.br/forum/files/category/63-acbrlib-demo/

# ⚠️ Importante: Usar convenção de chamada cdecl
# ⚠️ Importante: Usar versão MT (Multi-Thread)
```

## 🏗️ Desenvolvimento

### 📁 Estrutura do Projeto

```
ACBrLib-Nodejs/
├── acbrlib-base-node/          # Classe base fundamental
├── acbrlib-dfe-node/           # Classe abstrata para DFe
├── acbrlib-nfe-node/           # Implementação NFe
├── acbrlib-mdfe-node/          # Implementação MDFe
├── acbrlib-nfse-node/          # Implementação NFSe
├── acbrlib-cep-node/           # Implementação CEP
├── acbrlib-reinf-node/         # Implementação REINF
├── LICENSE                      # Licença do projeto
└── README.md                   # Este arquivo
```

### 🔨 Scripts de Build

```bash
# Em cada pacote
npm run build        # Compilar TypeScript
npm run test         # Executar testes
npm run local-release # Build e link local
```

## 📄 Licenças

- **Pacotes principais**: LGPL-2.1 License
- **acbrlib-reinf-node**: LGPL-2.1 License
- **Bibliotecas nativas ACBr**: LGPL-2.1 License

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/Projeto-ACBr-Oficial/ACBrLib-Nodejs/issues)
- **Documentação ACBrLib**: [https://acbr.sourceforge.io/ACBrLib/BemVindo.html](https://acbr.sourceforge.io/ACBrLib/BemVindo.html)
- **Downloads ACBr**: [https://www.projetoacbr.com.br/forum/files/](https://www.projetoacbr.com.br/forum/files/)
- **Fontes ACBr**: [https://projetoacbr.com.br/fontes/](https://projetoacbr.com.br/fontes/)
- **Comunidade ACBr**: [https://www.projetoacbr.com.br/forum/](https://www.projetoacbr.com.br/forum/)



## ⚠️ Known Issues

### 🐳 Docker

As bibliotecas nativas ACBr dependem de `libxml2` e `openssl`. Em ambientes Docker, utilize obrigatoriamente imagens baseadas em **Debian** ou **Ubuntu** e instale as dependências antes de executar a aplicação.

> ⚠️ Imagens baseadas em **Alpine Linux** não são recomendadas devido a incompatibilidades com as bibliotecas nativas ACBr.

> ⚠️ Em ambientes Docker (sem interface gráfica), utilize **obrigatoriamente** as versões **Console MT** das bibliotecas nativas ACBr (ex: `libacbrnfe64.so`, `libacbrcte64.so`). As versões GUI não funcionam em containers.

#### Exemplo de Dockerfile

```dockerfile
FROM ubuntu:noble

RUN apt-get update && apt-get install -y \
    libxml2 \
    openssl \
    nodejs \
    npm \
    wget \
    ca-certificates \
    ttf-mscorefonts-installer \
    && rm -rf /var/lib/apt/lists/*


RUN ln -s /usr/lib/x86_64-linux-gnu/libxml2.so.2  /usr/lib/libxml2.so && \

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "index.js"]
```

#### ⚙️ Configuração OpenSSL Legacy

As bibliotecas ACBr podem exigir suporte a algoritmos legados do OpenSSL (ex: MD5, RC4). Para habilitar, baixe o arquivo de configuração e referencie-o via variável de ambiente `OPENSSL_CONF`:

📄 **Download**: [`openssl-legacy.cnf`](https://github.com/Projeto-ACBr-Oficial/Docker/blob/main/PHP/openssl-legacy.cnf)

```dockerfile
COPY openssl-legacy.cnf /etc/ssl/openssl-legacy.cnf
ENV OPENSSL_CONF=/etc/ssl/openssl-legacy.cnf
```

---

**ACBrLib-Nodejs** - Interface Node.js/TypeScript para ACBrLib  
**Versão**: 1.0.1  
**Licença**: LGPL-2.1  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
