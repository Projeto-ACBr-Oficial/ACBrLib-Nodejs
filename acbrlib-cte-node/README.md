# @projetoacbr/acbrlib-cte-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-cte-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib CTe Node** é uma implementação específica para Conhecimento de Transporte Eletrônico (CTe) que fornece uma interface de alto nível para todas as funcionalidades da ACBrLibCTe. Esta classe permite emissão, cancelamento, consultas, inutilização e outras operações relacionadas ao CTe.

## 🏗️ Arquitetura

Esta classe (`ACBrLibCTeMT`) estende `ACBrLibDFeMT` e implementa todos os métodos específicos do CTe, herdando funcionalidades comuns dos pacotes base.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-cte-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibCTeMT oficial conforme documentação
import ACBrLibCTeMT from "@projetoacbr/acbrlib-cte-node/dist/src";
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
const ACBrLibCTeMT = require('@projetoacbr/acbrlib-cte-node/dist/src').default
```

### 🔧 Uso Básico

#### TypeScript
```typescript
const acbrCTe = new ACBrLibCTeMT(
    './libacbrcte64.so',    // Linux
    // './ACBrCTe64.dll', // Windows
    './acbrlib.ini',
    '12345678'
)
```

#### JavaScript/CommonJS
```javascript
const acbrCTe = new ACBrLibCTeMT(
    './libacbrcte64.so',    // Linux
    // './ACBrCTe64.dll', // Windows
    './acbrlib.ini',
    '12345678'
)

// Inicializar a biblioteca
acbrCTe.inicializar()

// Carregar XML
acbrCTe.carregarXML('./cte.xml')

// Validar e assinar
acbrCTe.validar()
acbrCTe.assinar()

// Enviar
const resposta = acbrCTe.enviar(1, false, true)
```

## 🔧 Funcionalidades

### Métodos Herdados (DFe Comum)
- `inicializar()`, `finalizar()`
- `carregarXML()`, `carregarINI()`
- `obterXml()`, `obterIni()`
- `gravarXml()`, `gravarIni()`
- `imprimirPDF()`, `salvarPDF()`
- `enviarEmail()`

### Métodos Específicos do CTe

- **Emissão e Envio**
  - `enviar(lote, imprimir, sincrono)`
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

**ACBrLib CTe Node** - Interface Node.js para ACBrLibCTe  
**Versão**: 1.0.0  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
