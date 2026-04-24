# @projetoacbr/acbrlib-dfe-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.11-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-dfe-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib DFe Node** é uma classe abstrata que implementa métodos comuns entre diferentes tipos de Documentos Fiscais Eletrônicos (NFe, MDFe e NFSe). Esta classe serve como base para funcionalidades compartilhadas entre diferentes tipos de DFe.

## 🏗️ Arquitetura

Esta classe (`ACBrLibDFeComum`) estende `ACBrLibBaseMT` e implementa métodos comuns a todos os tipos de DFe, eliminando duplicação de código nas classes filhas.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-dfe-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibDFeComum oficial conforme documentação
import ACBrLibDFeComum from "@projetoacbr/acbrlib-dfe-node/dist/src/dfe-comum";
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
const ACBrLibDFeComum = require('@projetoacbr/acbrlib-dfe-node/dist/src/dfe-comum').default
```

### Uso Básico

```javascript
// Esta classe é abstrata e não deve ser instanciada diretamente
// Use as classes específicas que herdam dela:
// - ACBrLibNFeMT
// - ACBrLibMDFeMT
// - ACBrLibNFSeMT
```

## 🔧 Funcionalidades

### Métodos Comuns de DFe

- **Inicialização e Finalização**
  - `inicializar()`
  - `finalizar()`

- **Manipulação de Arquivos**
  - `carregarXML(arquivoXML)`
  - `carregarINI(arquivoINI)`
  - `obterXml(indice)`
  - `obterIni(indice)`
  - `gravarXml(indice, nomeArquivo, caminhoArquivo)`
  - `gravarIni(indice, nomeArquivo, caminhoArquivo)`
  - `limparLista()`

- **Segurança**
  - `obterCertificados()`

- **Impressão**
  - `imprimirPDF()`
  - `salvarPDF()`

- **Email**
  - `enviarEmail(ePara, eXMLDocumento, enviaPDF, eAssunto, eCC, eAnexos, eMensagem)`

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

**ACBrLib DFe Node** - Classe abstrata para Documentos Fiscais Eletrônicos  
**Versão**: 1.0.11  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/) 