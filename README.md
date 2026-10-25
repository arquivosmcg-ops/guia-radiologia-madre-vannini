# Guia de Radiologia — aplicação multi-hospitalar

Aplicativo responsivo para organizar instituições, equipamentos de radiologia e o fluxo documental de protocolos técnicos. O sistema foi pensado para ser utilizado por diferentes hospitais: cada instituição mantém seu próprio inventário e seus próprios protocolos.

> **Importante:** esta é a primeira versão funcional de interface/protótipo. Os registros são guardados no armazenamento local do navegador usado naquele dispositivo. Ainda não há autenticação real, sincronização entre usuários/dispositivos, banco de dados central ou autorização clínica operacional. Não utilizar como sistema clínico de produção até concluir backend, segurança, testes e validação institucional.

## Funcionalidades presentes nesta versão

- Painel inicial com resumo da instituição selecionada.
- Cadastro de múltiplos hospitais.
- Inventário de aparelhos de raios X, detectores DR e digitalizadores CR.
- Cadastro progressivo: fabricante, modelo, número de série e tecnologia podem ficar em branco.
- Identificação de registros incompletos para conferência posterior.
- Separação dos protocolos em elaboração, em revisão e aprovados.
- Interface responsiva para computador, tablet e celular.
- Estrutura de PWA: manifesto, ícone, service worker e cache básico do aplicativo para facilitar instalação e abertura offline após a primeira visita.
- Dados de demonstração iniciais do Hospital e Maternidade Madre Vannini, incluindo detector AGFA AXYS (série 4493) e digitalizador AGFA CR 35-X.

## Instalar em celular ou computador

Depois de publicar o aplicativo em um endereço HTTPS, abra o endereço no navegador compatível:

- **Android / Chrome:** abra o site e use a opção **Instalar app** ou **Adicionar à tela inicial**.
- **iPhone / iPad:** abra no Safari, toque em **Compartilhar** e escolha **Adicionar à Tela de Início**.
- **Computador / Chrome ou Edge:** use o ícone de instalação na barra de endereços, quando exibido, ou o menu do navegador para instalar.

A opção de instalação depende do navegador e da publicação em HTTPS. O cache offline disponibiliza a estrutura da aplicação, mas os registros permanecem no armazenamento local do navegador; ainda não são sincronizados entre dispositivos.

## Executar localmente

Requisitos: Node.js LTS e npm.

```bash
npm install
npm run dev
```

Para verificar a compilação de produção:

```bash
npm run build
npm run preview
```

## Próximas etapas antes de uso real

1. Definir autenticação, perfis e isolamento de dados por instituição.
2. Implementar backend central (por exemplo, Supabase/PostgreSQL) após aprovação institucional.
3. Aplicar permissões e regras de segurança no servidor/banco de dados.
4. Criar edição, auditoria, exportação e gestão de versões de equipamentos e protocolos.
5. Formalizar o fluxo de revisão/aprovação com responsáveis técnicos de cada hospital.
6. Criar testes automatizados, política de backup, recuperação e avaliação de segurança.
7. Validar a aplicação em ambiente controlado antes de qualquer uso clínico.

## Segurança clínica

Esta versão não define nem recomenda parâmetros de exposição radiográfica. Protocolos clínicos devem ser criados e aprovados formalmente pelos responsáveis de cada instituição, conforme equipamentos, práticas locais, orientações dos fabricantes e requisitos aplicáveis. Um protocolo aprovado em um hospital não deve ser automaticamente considerado válido em outro.

Não cadastrar dados identificáveis de pacientes nesta versão de demonstração.

## Documentação

- `docs/ARQUITETURA.md`
- `docs/SEGURANCA.md`
- `docs/VALIDACAO-CLINICA.md`
- `docs/PLANO-DE-DESENVOLVIMENTO.md`
