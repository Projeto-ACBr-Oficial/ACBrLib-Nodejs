# Changelog - @projetoacbr/acbrlib-base-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.11] - 2026-02-05

### Correções

- Mensagens de exceção em `_checkResult` passam a incluir contexto descritivo por tipo de erro:
  - `ACBrLibConfigLerError`: prefixo `"Erro ao ler arquivo de configuração/arquivo com configurações inválidas: "`
  - `ACBrLibConfigGravarError`: prefixo `"Erro ao gravar configuração: "`
  - `ACBrLibArquivoNaoExisteError`: prefixo `"Erro: Arquivo não existe: "`
  - `ACBrLibDiretorioNaoExisteError`: prefixo `"Erro: Diretório não existe: "`
  - `ACBrLibLibNaoInicializadaError`: mensagem alterada para `"Erro ao inicializar a biblioteca {nomeDaClasse}"`
- Quando a biblioteca não está inicializada, `errorMessage` deixa de conter o texto genérico `"Biblioteca não inicializada"` — o contexto fica apenas na exceção específica

### Documentação

- JSDoc expandido em `ACBrLibConfigLerError`, `ACBrLibDiretorioNaoExisteError` e `ACBrLibDemoExpiradoError` com exemplos de causas comuns
- `README.md` atualizado com badge de versão `1.0.11` e `tsconfig.json` recomendado com `lib: ["esnext"]` e `moduleResolution: "node"`

## [1.0.10] - 2026-02-02

### Correções

- Código de retorno `ErrExecutandoMetodo` passa a lançar `ACBrLibExecutandoMetodoError` em vez de `ACBrLibParametroInvalidoError`, usando a exceção correta para o tipo de falha

## [1.0.9] - 2026-02-02

### Novidades

- Mensagens de erro em `_checkResult` passam a incluir o código numérico do retorno nativo no formato `"{código}: {ultimoRetorno}"` (ex.: `"-3: Arquivo não encontrado"`)

## [1.0.8] - 2026-01-27

### Correções

- `getHandle()` passa a lançar `ACBrLibLibNaoInicializadaError` com mensagem orientando a chamar `inicializar()` antes de usar outros métodos, em vez de decodificar um handle inválido
- `_checkResult` usa `ultimoRetorno()` apenas quando a biblioteca está inicializada; caso contrário, utiliza `"Biblioteca não inicializada"` como mensagem base
- `ACBrLibLibNaoInicializadaError` passa a exibir o nome da classe concreta (`this.constructor.name`) em vez de `this.nome`
- Removido `console.log` de depuração em `_checkResult`

## [1.0.7] - 2026-01-26

### Build

- Script `local-release` alterado de `npm link` para `npx yalc publish` (apenas fluxo de publicação local; **sem alterações funcionais** em relação à `1.0.6` — refatoração de interfaces tentada neste intervalo foi revertida antes da publicação)

## [1.0.6] - 2025-10-29

### Correções

- `inicializar()` deixa de chamar `#releaseHandle()` quando a inicialização falha, evitando liberar memória de um handle ainda não válido

### Refatoração

- `ACBrBuffer`: construtor aceita tamanho opcional com valor padrão `TAMANHO_PADRAO` e valida se o tamanho é finito e positivo, usando o padrão quando inválido
- JSDoc adicionado às classes de exceção e aos métodos de `ACBrBuffer`

## [1.0.5] - 2025-09-26

### Novidades

- Adicionada a classe `ACBrDateConverter` (`src/utils/index.ts`) que converte `Date` do JavaScript em Pascal `TDateTime` (`number`) via `convertDateToPascalTDateTime(date)` — dias desde 30/12/1899, com a parte fracionária representando a hora; usada pelos pacotes filhos (ex.: PIXCD, NFSe) ao chamar métodos nativos que esperam `TDateTime`

### Documentação

- `README.md` com exemplos separados para TypeScript e JavaScript, e `tsconfig.json` recomendado

## [1.0.4] - 2025-08-26

### Correções

- `#releaseHandle()` corrigido: removida chamada a `koffi.encode(this.getHandle(), 'void *', null)` antes de `koffi.free()`, que causava **segmentation fault no Linux** ao tentar decodificar handle inválido durante a liberação de memória
- Licença do pacote corrigida de `ISC` para `LGPL-2.1`

### Documentação

- `README.md` reestruturado com badges, seções de arquitetura, instalação e funcionalidades

## [1.0.2] - 2025-08-23

### Refatoração

- Classe renomeada de `ACBrLibBase` para `ACBrLibBaseMT`, com suporte a `destroy()` e flag `disposed` para gerenciamento de recursos
- Construtor passa a receber a instância FFI (`acbrlib`) como primeiro parâmetro, desacoplando o bridge da classe base
- Controle de inicialização via `isHandleInitialized` para evitar dupla liberação de memória no heap
- `_checkResult` implementado com exceções tipadas por código de retorno (`ACBrLibResultCodes`)
- `ACBrBuffer` implementa `[Symbol.dispose]()` para uso com `using` (Explicit Resource Management)
- Pacote renomeado de `acbrlib-base-node` para `@projetoacbr/acbrlib-base-node`

### Limpeza

- Removida implementação duplicada em `src/MT/index.ts`

### Build

- Repositório e URLs apontando para `Projeto-ACBr-Oficial/ACBrLib-Nodejs`
- Dependência `koffi` atualizada de `^2.6.0` para `^2.12.0`

## [1.0.0] - 2025-07-17

### Novidades

- Lançamento inicial com classe abstrata `ACBrLibBase`, `ACBrBuffer` e estrutura base do pacote
