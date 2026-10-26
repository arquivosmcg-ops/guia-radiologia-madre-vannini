# Guia de Radiologia — Hospital e Maternidade Madre Vannini

Aplicativo responsivo de consulta rápida para apoiar a equipe durante exames radiográficos. A navegação é organizada por região anatômica/exame, com orientações de posicionamento, centralização e parâmetros técnicos submetidos à validação institucional.

> **Estado atual:** protótipo demonstrativo. O primeiro conteúdo é Radiografia de tórax — rotina PA e Perfil. Os exemplos de kV, mAs e DFF exibidos na interface são valores fornecidos para estruturar o guia e estão explicitamente marcados como não validados. Não devem ser tratados como prescrição clínica nem usados até revisão e aprovação formal dos responsáveis técnicos.

## Funcionalidades presentes

- Biblioteca de exames por região anatômica, com busca rápida.
- Primeiro conteúdo demonstrativo: tórax PA e Perfil, com alternância entre incidências.
- Esquema visual ilustrativo e instruções de posicionamento.
- Área de parâmetros técnicos com alerta de validação local.
- Exames ainda não elaborados aparecem como “Em preparação”, sem valores técnicos inventados.
- Configuração técnica local secundária à consulta por exame.
- Interface responsiva para computador, tablet e celular.
- Estrutura de PWA: manifesto, ícone e service worker para facilitar instalação e reabertura offline após a primeira visita.

## Segurança clínica e limites

- O conteúdo exibido não substitui treinamento, julgamento profissional, instruções do fabricante nem protocolos institucionais aprovados.
- Parâmetros de exposição dependem do equipamento, detector, grade, biotipo, indicação e protocolo local.
- O posicionamento, a técnica, os critérios de qualidade e a aplicabilidade precisam ser revisados e aprovados pelos responsáveis designados antes do uso clínico.
- O protótipo ainda não implementa autenticação real, gestão de permissões, auditoria, banco central ou sincronização entre dispositivos.
- Não inserir dados identificáveis de pacientes.

Consulte docs/VALIDACAO-CLINICA.md, docs/SEGURANCA.md e docs/PLANO-DE-DESENVOLVIMENTO.md antes de ampliar o conteúdo ou considerar uso operacional.

## Publicar no GitHub Pages

O repositório inclui o fluxo GitHub Actions em .github/workflows/deploy-pages.yml.

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Acesse a aba **Actions** e acompanhe **Build and deploy PWA to GitHub Pages**.
4. Só considere a publicação concluída depois de o fluxo terminar com sucesso e o site ser aberto e verificado.

Endereço esperado: https://arquivosmcg-ops.github.io/guia-radiologia-madre-vannini/ — desde que GitHub Pages esteja habilitado e o fluxo conclua sem erros.

## Instalar em celular ou computador

Após a publicação em HTTPS, abra o site em navegador compatível e use **Instalar app** ou **Adicionar à tela inicial**. A disponibilidade depende do navegador. O modo offline depende de o aplicativo e os recursos terem sido carregados anteriormente.

## Executar localmente

Requisitos: Node.js LTS e npm.

~~~bash
npm install
npm run dev
~~~

Verificar compilação de produção:

~~~bash
npm run build
npm run preview
~~~
