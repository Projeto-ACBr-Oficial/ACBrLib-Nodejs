# @projetoacbr/acbrlib-mdfe-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.9-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-mdfe-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib MDFe Node** é uma implementação específica para Manifesto Eletrônico de Documentos Fiscais (MDFe) que fornece uma interface de alto nível para todas as funcionalidades da ACBrLibMDFe. Esta classe permite emissão, cancelamento, consultas e outras operações relacionadas ao MDFe.

## 🏗️ Arquitetura

Esta classe (`ACBrLibMDFeMT`) estende `ACBrLibDFeMT` e implementa todos os métodos específicos do MDFe, herdando funcionalidades comuns dos pacotes base.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-mdfe-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibMDFeMT oficial conforme documentação
import ACBrLibMDFeMT from "@projetoacbr/acbrlib-mdfe-node/dist/src";
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
const ACBrLibMDFeMT = require('@projetoacbr/acbrlib-mdfe-node/dist/src').default
```

### 🔧 Uso Básico

#### TypeScript
```typescript
const acbrMDFe = new ACBrLibMDFeMT(
    './libacbrmdfe64.so',    // Linux
    // './ACBrMDFe64.dll', // Windows
    './acbrlib.ini',
    '12345678'
)
```

#### JavaScript/CommonJS
```javascript
const acbrMDFe = new ACBrLibMDFeMT(
    './libacbrmdfe64.so',    // Linux
    // './ACBrMDFe64.dll', // Windows
    './acbrlib.ini',
    '12345678'
)

// Inicializar a biblioteca
acbrMDFe.inicializar()

// Carregar XML
acbrMDFe.carregarXML('./mdfe.xml')

// Validar e assinar
acbrMDFe.validar()
acbrMDFe.assinar()

// Enviar
const resposta = acbrMDFe.enviar(1, false, true, false)
```

## 🔧 Funcionalidades

### Métodos Herdados (DFe Comum)
- `inicializar()`, `finalizar()`
- `carregarXML()`, `carregarINI()`
- `obterXml()`, `obterIni()`
- `gravarXml()`, `gravarIni()`
- `imprimirPDF()`, `salvarPDF()`
- `enviarEmail()`

### Métodos Específicos do MDFe

- **Emissão e Envio**
  - `enviar(lote, imprimir, sincrono, zipado)`
  - `enviarEvento(idLote)`

- **Cancelamento**
  - `cancelar(chave, justificativa, CNPJ, lote)`

- **Consultas**
  - `statusServico()`
  - `consultar(chaveOuDocumento, extrairEventos)`
  - `consultarRecibo(recibo)`

- **Distribuição DFe**
  - `distribuicaoDFePorUltNSU(ufAutor, cnpjCpf, ultNSU)`
  - `distribuicaoDFePorNSU(ufAutor, cnpjCpf, NSU)`
  - `distribuicaoDFePorChave(ufAutor, cnpjCpf, chave)`

- **Eventos**
  - `carregarEventoXML(arquivoXML)`
  - `carregarEventoINI(arquivoINI)`
  - `limparListaEventos()`

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

**ACBrLib MDFe Node** - Interface Node.js para ACBrLibMDFe  
**Versão**: 1.0.9  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
