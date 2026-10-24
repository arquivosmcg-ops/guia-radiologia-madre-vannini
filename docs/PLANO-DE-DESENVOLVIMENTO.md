# Plano inicial de desenvolvimento

## Fase 0 — Fundação documental
- [x] Criar repositório privado.
- [x] Registrar arquitetura proposta.
- [x] Definir requisitos iniciais de segurança.
- [x] Documentar governança e validação clínica.
- [x] Registrar etapas de desenvolvimento.
- [ ] Revisão institucional da documentação.

## Fase 1 — Descoberta e decisões institucionais
- Confirmar responsável técnico e aprovadores de conteúdo.
- Identificar fabricantes/modelos dos equipamentos DR e CR em uso.
- Definir matriz de papéis e permissões.
- Confirmar infraestrutura, hospedagem, autenticação e requisitos de TI.
- Aprovar requisitos de privacidade, logs, backup e retenção.
- Definir formato e fontes autorizadas dos protocolos.
- Definir critérios de acessibilidade, disponibilidade e suporte.

**Saída:** requisitos aprovados e escopo priorizado.

## Fase 2 — Base técnica
- Criar aplicação React + TypeScript + Vite.
- Configurar Tailwind CSS, lint, formatação e testes.
- Configurar ambientes de desenvolvimento e testes.
- Definir estratégia PWA sem cache clínico inseguro.
- Preparar pipeline de integração contínua.
- Documentar configuração local e variáveis de ambiente.

**Saída:** aplicação mínima executável e verificações automatizadas.

## Fase 3 — Autenticação, autorização e dados
- Implementar autenticação aprovada pela instituição.
- Definir modelo de dados e migrações versionadas.
- Implementar papéis e permissões no servidor/banco.
- Implementar e testar RLS.
- Implementar auditoria de operações administrativas.
- Usar dados fictícios para desenvolvimento.

**Saída:** base segura de acesso e persistência validada em testes.

## Fase 4 — Consulta e gestão de protocolos
- Criar pesquisa e filtros por região anatômica, modalidade e equipamento.
- Criar página de detalhe com posicionamento e critérios de qualidade.
- Implementar estados de rascunho, revisão, aprovação, publicação e suspensão.
- Implementar histórico de versões imutáveis.
- Restringir edição, aprovação e publicação conforme papéis.
- Exibir claramente versão, aplicabilidade, aprovação e data de revisão.

**Saída:** fluxo funcional com conteúdo demonstrativo claramente não clínico.

## Fase 5 — Validação clínica e testes de aceitação
- Carregar apenas protocolos aprovados formalmente.
- Realizar testes com responsáveis e usuários designados.
- Verificar legibilidade e usabilidade em computador, tablet e celular.
- Testar controle de acesso, histórico, auditoria, suspensão e recuperação.
- Registrar evidências e resolver falhas antes da liberação.

**Saída:** aceite documentado de software e de conteúdo, separadamente.

## Fase 6 — Implantação e manutenção
- Aprovar ambiente de produção e procedimento de publicação.
- Definir monitoramento, suporte, backup e resposta a incidentes.
- Treinar usuários e administradores.
- Definir calendário de revisão de protocolos e dependências.
- Manter releases e notas de versão.

**Saída:** implantação autorizada e processo contínuo de manutenção.

## Critérios gerais de aceite
- Conteúdo não aprovado nunca aparece como protocolo vigente.
- Usuários sem permissão não conseguem aprovar, publicar ou alterar permissões por chamadas diretas.
- Toda versão publicada tem responsável, data, fontes e escopo documentados.
- Alterações preservam versões anteriores e geram registro de auditoria.
- Interface funciona nos tamanhos de tela previstos.
- Não há segredos no repositório nem dados reais de pacientes nos testes.
- Testes automatizados e revisão institucional passam antes da publicação.
