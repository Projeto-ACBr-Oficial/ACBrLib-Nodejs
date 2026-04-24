# @projetoacbr/acbrlib-nfe-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.10-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-nfe-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib NFe Node** é uma implementação específica para Nota Fiscal Eletrônica (NFe) que fornece uma interface de alto nível para todas as funcionalidades da ACBrLibNFe. Esta classe permite emissão, cancelamento, consultas e outras operações relacionadas à NFe.

## 🏗️ Arquitetura

Esta classe (`ACBrLibNFeMT`) estende `ACBrLibDFeMT` e implementa todos os métodos específicos da NFe, herdando funcionalidades comuns dos pacotes base.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-nfe-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibNFeMT oficial conforme documentação
import ACBrLibNFeMT from "@projetoacbr/acbrlib-nfe-node/dist/src";
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
const ACBrLibNFeMT = require('@projetoacbr/acbrlib-nfe-node/dist/src').default
```

### 🔧 Uso Básico

#### TypeScript
```typescript
import path from "path";
import os from "os";

const libName = os.platform() === 'win32' ? 'ACBrNFe64.dll' : 'libacbrnfe64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrNFe = new ACBrLibNFeMT(libPath, eArqConfig, '');
```

#### JavaScript/CommonJS
```javascript
const path = require('path');
const os = require('os');

const libName = os.platform() === 'win32' ? 'ACBrNFe64.dll' : 'libacbrnfe64.so';
const libPath = path.resolve(__dirname, libName);
const eArqConfig = path.resolve(__dirname, 'data', 'config', 'acbrlib.ini');

const acbrNFe = new ACBrLibNFeMT(libPath, eArqConfig, '');

// Inicializar a biblioteca
acbrNFe.inicializar();

// Carregar XML
acbrNFe.carregarXML('./nfe.xml');

// Validar e assinar
acbrNFe.validar();
acbrNFe.assinar();

// Enviar
const resposta = acbrNFe.enviar(1, false, true, false);
```

## 🔧 Funcionalidades

### Métodos Herdados (DFe Comum)
- `inicializar()`, `finalizar()`
- `carregarXML()`, `carregarINI()`
- `obterXml()`, `obterIni()`
- `gravarXml()`, `gravarIni()`
- `imprimirPDF()`, `salvarPDF()`
- `enviarEmail()`

### Métodos Específicos da NFe

- **Emissão e Envio**
  - `enviar(lote, imprimir, sincrono, zipado)`
  - `enviarEvento(idLote)`

- **Cancelamento e Inutilização**
  - `cancelar(chave, justificativa, CNPJ, lote)`
  - `inutilizar(CNPJ, justificativa, ano, modelo, serie, numeroInicial, numeroFinal)`

- **Consultas**
  - `statusServico()`
  - `consultar(chaveOuDocumento, extrairEventos)`
  - `consultarRecibo(recibo)`
  - `consultaCadastro(cUF, nDocumento, nIE)`

- **Distribuição DFe**
  - `distribuicaoDFePorUltNSU(ufAutor, cnpjCpf, ultNSU)`
  - `distribuicaoDFePorNSU(ufAutor, cnpjCpf, NSU)`
  - `distribuicaoDFePorChave(ufAutor, cnpjCpf, chave)`

- **Impressão Específica**
  - `imprimirInutilizacao(arquivoXml)`
  - `imprimirInutilizacaoPDF(arquivoXml)`
  - `salvarInutilizacaoPDF(arquivoXml)`

## 🔗 Dependências

- **@projetoacbr/acbrlib-dfe-node** - Classe base para DFe

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

**ACBrLib NFe Node** - Interface Node.js para ACBrLibNFe  
**Versão**: 1.0.10  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
