# Changelog - @projetoacbr/acbrlib-pixcd-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas abaixo refletem o que foi **efetivamente publicado no npm**, com base no diff entre versões publicadas — não em bumps de versão intermediários no repositório que não chegaram ao registry.

## [1.0.1] - 2026-06-12

### Novidades

- Adicionado `QQPAG` (QQPag) ao enum `PSP`, mapeando o provedor de serviços de pagamento de índice 19

### Documentação

- Exemplos de inicialização no `README.md` atualizados para resolver caminhos da DLL/SO e do arquivo de configuração com `path` e `os`, com suporte explícito a Windows (`ACBrPIXCD64.dll`) e Linux (`libacbrpixcd64.so`)

## [1.0.0] - 2026-06-12

Primeira publicação no npm.

### Novidades

- Classe de alto nível `ACBrLibPixCDMT`, estendendo `ACBrLibBaseMT`, com bindings FFI via `koffi` na camada `ACBrLibPixCDBridge`
- Enum `StatusCobrancaPIX` (`NENHUM`, `ATIVA`, `CONCLUIDA`, `REMOVIDA_PELO_USUARIO_RECEBEDOR`, `REMOVIDA_PELO_PSP`)
- Enum `PSP` com 19 provedores: Bradesco, Itaú, Banco do Brasil, Santander, Shipay, Sicredi, Sicoob, PagSeguro, GerenciaNet, PixPDV, Inter, Ailos, Matera, Cielo, MercadoPago, Gate2All, Banrisul, C6Bank e AppLess
- **PIX:** `gerarQRCodeEstatico`, `consultarPix`, `solicitarDevolucaoPix`, `consultarDevolucaoPix`
- **Cobrança imediata (`/cob`):** `criarCobrancaImediata`, `consultarCobrancaImediata`, `consultarCobrancasCob`, `revisarCobrancaImediata`, `cancelarCobrancaImediata`
- **Cobrança com vencimento (`/cobv`):** `criarCobranca`, `consultarCobranca`, `consultarCobrancasCobV`, `revisarCobranca`, `cancelarCobranca`
- **Autenticação:** `gerarToken` e `informarToken`, com bindings `PIXCD_GerarToken` e `PIXCD_InformarToken` no bridge
- Conversão automática de datas JavaScript para `TDateTime` Pascal nos métodos de consulta por período

### Correções

- Construtor de `ACBrLibPixCDMT` corrigido para repassar `getAcbrlibNative()` à classe base, em vez da instância do bridge

### Refatoração

- Enum de provedores renomeado de `ProvedorServicosPagamentoPIX` para `PSP`

### Limpeza

- Removidos do bridge os métodos específicos do Matera (`PIXCD_Matera_*`), não expostos na API de alto nível

### Documentação

- `README.md` inicial com instalação, importação, exemplos e referência das funcionalidades

### Build

- Descrição do pacote corrigida no `package.json` (`acbrlibpixcd`)
