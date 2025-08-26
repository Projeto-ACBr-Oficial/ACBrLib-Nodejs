# @projetoacbr/acbrlib-nfse-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-nfse-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib NFSe Node** é uma implementação específica para Nota Fiscal de Serviço Eletrônica (NFSe) que fornece uma interface de alto nível para todas as funcionalidades da ACBrLibNFSe. Esta classe permite emissão, substituição, consultas e outras operações relacionadas à NFSe.

## 🏗️ Arquitetura

Esta classe (`ACBrLibNFSeMT`) estende `ACBrLibDFeMT` e implementa todos os métodos específicos da NFSe, herdando funcionalidades comuns dos pacotes base.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-nfse-node
```

## 📖 Como Usar

### Importação

```javascript
const ACBrLibNFSeMT = require('@projetoacbr/acbrlib-nfse-node/dist/src').default
```

### Uso Básico

```javascript
const acbrNFSe = new ACBrLibNFSeMT(
    './libacbrnfse64.so',    // Linux
    // './ACBrNFSe64.dll', // Windows
    './acbrlib.ini',
    '12345678'
)

// Carregar XML
acbrNFSe.carregarXML('./nfse.xml')

// Validar e assinar
acbrNFSe.validar()
acbrNFSe.assinar()

// Emitir
const resposta = acbrNFSe.emitir()
```

## 🔧 Funcionalidades

### Métodos Herdados (DFe Comum)
- `carregarXML()`, `carregarINI()`
- `obterXml()`, `obterIni()`
- `gravarXml()`, `gravarIni()`
- `imprimirPDF()`, `salvarPDF()`
- `enviarEmail()`

### Métodos Específicos da NFSe

- **Emissão e Substituição**
  - `emitir()`
  - `substituirNFSe(numeroNFSe, codigoCancelamento, motivoCancelamento, numeroNFSeSubstituidora)`

- **Consultas**
  - `linkNFSe(chaveAcesso, senha, visualizacao)`
  - `consultarNFSePorRps(numeroRPS, serieRPS, tipoRPS, codigoVerificacao, codigoMunicipio)`
  - `consultarNFSePorNumero(numeroNFSe, pagina)`
  - `consultarNFSePorPeriodo(dataInicial, dataFinal, pagina, numeroLote)`
  - `consultarNFSePorFaixa(numeroInicial, numeroFinal, pagina)`
  - `consultarNFSePorChave(chaveAcesso)`
  - `consultarParametros(codigoMunicipio, nomeParametro, valorParametro)`

- **Geração de Lote e Token**
  - `gerarLote(numeroLote, quantidadeRPS, assinatura)`
  - `gerarToken(codigoMunicipio, UFAutor, CNPJ, inscricaoMunicipal, razaoSocial, chaveAcesso)`

- **Cancelamento**
  - `cancelarNFSe(numeroNFSe, codigoCancelamento, motivoCancelamento, numeroNFSeSubstituidora)`

- **Impressão e Geração**
  - `obterDANFSE(numeroNFSe)`
  - `imprimir(impressora, numCopias, protocolo, mostrarPreview, marcaDagua, viaConsumidor, simplificado)`

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

**ACBrLib NFSe Node** - Interface Node.js para ACBrLibNFSe  
**Versão**: 1.0.1  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
