# @projetoacbr/acbrlib-pixcd-node

[![License: LGPL-2.1](https://img.shields.io/badge/License-LGPL--2.1-green.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/@projetoacbr/acbrlib-pixcd-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descrição

**ACBrLib PIX CD Node** é uma implementação específica para PIX CD (PIX Cobrança Dinâmica) que fornece uma interface de alto nível para todas as funcionalidades da ACBrLibPixCD. Esta classe permite criar QR codes PIX, gerenciar cobranças imediatas e com vencimento, processar devoluções e outras operações relacionadas ao PIX.

## 🏗️ Arquitetura

Esta classe (`ACBrLibPixCDMT`) estende `ACBrLibBaseMT` e implementa todos os métodos específicos do PIX CD, herdando funcionalidades comuns dos pacotes base.

## 📦 Instalação

```bash
npm install @projetoacbr/acbrlib-pixcd-node
```

## 📖 Como Usar

### 🎯 Importação

#### 📝 TypeScript (Recomendado)

```typescript
// Importa a classe ACBrLibPixCDMT oficial conforme documentação
import ACBrLibPixCDMT, { StatusCobrancaPIX, PSP } from "@projetoacbr/acbrlib-pixcd-node/dist/src";
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
const ACBrLibPixCDMT = require('@projetoacbr/acbrlib-pixcd-node/dist/src').default
const { StatusCobrancaPIX, PSP } = require('@projetoacbr/acbrlib-pixcd-node/dist/src')
```


## 🔧 Funcionalidades

### Métodos Herdados (Base)
- `inicializar()`, `finalizar()`
- `configLer()`, `configGravar()`
- `nome()`, `versao()`
- `ultimoRetorno()`

### 🎯 Métodos PIX Básicos

#### **QR Code e Consultas**
- `gerarQRCodeEstatico(valor, infoAdicional, txID)` - Gera QR Code PIX estático
- `consultarPix(e2eid)` - Consulta PIX por End-to-End ID

#### **Devoluções**
- `solicitarDevolucaoPix(infDevolucao, e2eid, aidDevolucao)` - Solicita devolução PIX
- `consultarDevolucaoPix(e2eid, aidDevolucao)` - Consulta status de devolução

### 💰 Endpoint /cob - Cobranças Imediatas

- `criarCobrancaImediata(infCobSolicitada, txID)` - Cria nova cobrança imediata
- `consultarCobrancaImediata(txID, revisao)` - Consulta cobrança específica
- `consultarCobrancasCob(dataInicio, dataFim, cpfCnpj, locationPresente, status, pagAtual, itensPorPagina)` - Lista cobranças
- `revisarCobrancaImediata(infCobRevisada, txID)` - Revisa cobrança existente
- `cancelarCobrancaImediata(txID)` - Cancela cobrança imediata

### 📅 Endpoint /cobv - Cobranças com Vencimento

- `criarCobranca(infCobVSolicitada, txID)` - Cria cobrança com vencimento
- `consultarCobranca(txID, revisao)` - Consulta cobrança com vencimento
- `consultarCobrancasCobV(dataInicio, dataFim, cpfCnpj, locationPresente, status, pagAtual, itensPorPagina)` - Lista cobranças com vencimento

### 📊 Enums Disponíveis

#### StatusCobrancaPIX
```typescript
export enum StatusCobrancaPIX {
    NENHUM = 0,                           // Nenhum
    ATIVA = 1,                           // Ativa
    CONCLUIDA = 2,                       // Concluída
    REMOVIDA_PELO_USUARIO_RECEBEDOR = 3, // Removida pelo usuário recebedor
    REMOVIDA_PELO_PSP = 4                // Removida pelo PSP
}
```

#### PSP (Provedor de Serviços de Pagamento)
```typescript
export enum PSP {
    BRADESCO = 0,        // Bradesco
    ITAU = 1,           // Itaú
    BANCO_DO_BRASIL = 2, // Banco do Brasil
    SANTANDER = 3,      // Santander
    SHIPAY = 4,         // Shipay
    SICREDI = 5,        // Sicredi
    SICOOB = 6,         // Sicoob
    PAGSEGURO = 7,      // PagSeguro
    GERENCIANET = 8,    // GerenciaNet
    PIXPDV = 9,         // PixPDV
    INTER = 10,         // Inter
    AILOS = 11,         // Ailos
    MATERA = 12,        // Matera
    CIELO = 13,         // Cielo
    MERCADOPAGO = 14,   // MercadoPago
    GATE2ALL = 15,      // Gate2All
    BANRISUL = 16,      // Banrisul
    C6BANK = 17,        // C6Bank
    APPLESS = 18        // AppLess
}
```


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
- **Fontes ACBr**: [https://projetoacbr.com.br/fontes/](https://projetoacbr.com.br/fontes/)

## 📄 Licença

LGPL-2.1 License - veja o arquivo [LICENSE](../LICENSE) para detalhes.

---

**ACBrLib PIX CD Node** - Interface Node.js para ACBrLibPixCD  
**Versão**: 1.0.0  
**Desenvolvido por**: [Projeto ACBr](https://www.projetoacbr.com.br/)
