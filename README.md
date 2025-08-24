# ACBrLib-Nodejs

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.5.4-green.svg)](https://nodejs.org/)

## 📋 Descrição

**ACBrLib-Nodejs** é uma biblioteca Node.js/TypeScript que fornece interfaces de alto nível para as bibliotecas nativas da ACBr (Automação Comercial Brasil). Esta biblioteca permite que desenvolvedores JavaScript/TypeScript utilizem todas as funcionalidades da ACBrLib sem precisar lidar diretamente com as complexidades das bibliotecas nativas C/C++.

## 🏗️ Arquitetura

O projeto é organizado em uma hierarquia de pacotes que segue o padrão de herança:

```
ACBrLibBaseMT (classe base)
    ↓
ACBrLibDFeComum (métodos comuns DFe)
    ↓
ACBrLibDFeMT (métodos comuns NFe/MDFe)
    ↓
ACBrLibNFeMT, ACBrLibMDFeMT, ACBrLibNFSeMT (implementações específicas)
```

## 📦 Pacotes Disponíveis

### 📊 Status dos Pacotes

| Pacote | Versão | Status | Publicado |
|--------|--------|--------|-----------|
| `@projetoacbr/acbrlib-base-node` | 1.0.1 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-dfe-node` | 1.0.1 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-nfe-node` | 1.0.1 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-mdfe-node` | 1.0.1 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-nfse-node` | 1.0.1 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-cep-node` | 1.0.1 | ✅ Disponível | ✅ Sim |
| `@projetoacbr/acbrlib-reinf-node` | - | 🚧 Em Desenvolvimento | ❌ Não |

## 🚀 Instalação

```bash
# Pacotes específicos (dependências são instaladas automaticamente)
npm install @projetoacbr/acbrlib-nfe-node
npm install @projetoacbr/acbrlib-mdfe-node
npm install @projetoacbr/acbrlib-nfse-node
npm install @projetoacbr/acbrlib-cep-node
```

## 📖 Como Usar

### 🎯 Importação das Classes

Todas as classes principais são exportadas como **default**. Para melhor compatibilidade, use o formato CommonJS:

```javascript
// ✅ Forma correta (recomendada) - CommonJS
const ACBrLibNFeMT = require('@projetoacbr/acbrlib-nfe-node/dist/src').default
const ACBrLibMDFeMT = require('@projetoacbr/acbrlib-mdfe-node/dist/src').default
const ACBrLibNFSeMT = require('@projetoacbr/acbrlib-nfse-node/dist/src').default
const ACBrLibCepMT = require('@projetoacbr/acbrlib-cep-node/dist/src').default
```

### 🔧 Configuração Básica

```javascript
const ACBrLibNFeMT = require('@projetoacbr/acbrlib-nfe-node/dist/src').default

const acbrNFe = new ACBrLibNFeMT(
    '/caminho/para/libacbrnfe64.so', // Linux
    // '/caminho/para/ACBrNFe64.dll', // Windows
    '/caminho/para/acbrlib.ini',
    'chave-criptografia'
)
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



---

**ACBrLib-Nodejs** - Interface Node.js/TypeScript para ACBrLib  
**Versão**: 1.0.1  
**Licença**: LGPL-2.1  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
