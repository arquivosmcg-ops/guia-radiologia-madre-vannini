# Segurança e privacidade

## Objetivo
Definir salvaguardas mínimas para o desenvolvimento de uma ferramenta institucional de consulta de protocolos radiográficos. Este documento é uma base para revisão pela TI, segurança da informação e responsáveis institucionais; não substitui análise de risco formal.

## Requisitos obrigatórios

### Acesso e autorização
- Autenticar usuários antes de permitir funções restritas.
- Definir papéis explícitos: técnico de radiologia, revisor/responsável técnico e administrador autorizado.
- Aplicar autorização no backend/banco de dados. Ocultar botões na interface não é controle de segurança suficiente.
- Usar políticas de menor privilégio e negar acesso por padrão.
- Restringir criação, revisão, aprovação, publicação e administração a usuários autorizados.
- Revisar periodicamente contas, papéis e acessos; revogar acesso quando deixar de ser necessário.

### Segredos e configuração
- Nunca versionar senhas, tokens, chaves privadas, credenciais de produção ou arquivos de configuração com segredos.
- Manter .env.example apenas com nomes de variáveis e valores demonstrativos não secretos.
- Usar variáveis de ambiente e mecanismos seguros de gestão de segredos no ambiente de implantação.
- Chaves privilegiadas do Supabase, incluindo a service role key, nunca podem ser entregues ao navegador ou incluídas no bundle do front-end.
- Se um segredo for exposto, revogar/rotacionar imediatamente e avaliar o impacto.

### Proteção de dados
- A primeira versão não deve coletar nem armazenar dados identificáveis de pacientes.
- Não usar dados reais de pacientes em testes, capturas de tela, demonstrações ou issues.
- Se houver necessidade futura de dados pessoais ou de saúde, interromper a expansão até avaliação institucional de finalidade, base legal, minimização, acesso, retenção, descarte e obrigações da LGPD.
- Não registrar dados clínicos ou credenciais em logs.
- Definir backups, retenção e recuperação antes da produção.

### Banco de dados e API
- Ativar e testar Row Level Security (RLS) em tabelas expostas ao cliente.
- Criar políticas específicas para leitura de protocolos publicados e para funções administrativas.
- Não confiar em filtros aplicados somente pela interface.
- Validar entradas no servidor e aplicar restrições de integridade no banco.
- Usar conexões criptografadas e serviços aprovados pela instituição.

### Auditoria e versionamento
- Registrar eventos importantes de criação, alteração, revisão, aprovação, publicação, suspensão e mudança de permissões.
- Registrar usuário, horário, objeto afetado, versão e justificativa quando aplicável.
- Evitar que usuários comuns alterem ou apaguem os próprios registros de auditoria.
- Preservar versões publicadas e registrar cada alteração em nova versão.
- Definir política de retenção e acesso aos logs.

### Aplicação e cadeia de desenvolvimento
- Revisar dependências e manter pacotes atualizados.
- Ativar proteção de branches e revisão por pull request antes de produção.
- Executar testes e verificações automatizadas em integração contínua.
- Não incluir conteúdo clínico não aprovado em exemplos, fixtures ou dados de demonstração.
- Realizar avaliação de segurança antes da implantação e após mudanças relevantes.

## Critérios mínimos antes da produção
- [ ] Aprovação de arquitetura, hospedagem e fornecedores pela instituição.
- [ ] Matriz de papéis e permissões aprovada.
- [ ] RLS e autorização testadas com usuários de diferentes papéis.
- [ ] Segredos fora do código e do bundle do cliente.
- [ ] Logs e auditoria revisados quanto à minimização de dados.
- [ ] Plano de backup, restauração e resposta a incidentes.
- [ ] Avaliação de privacidade/LGPD pela área competente.
- [ ] Testes de segurança e acessibilidade documentados.
- [ ] Conteúdo clínico aprovado conforme VALIDACAO-CLINICA.md.

## Incidentes
Qualquer suspeita de acesso indevido, exposição de segredo ou alteração não autorizada de protocolo deve ser comunicada imediatamente aos responsáveis institucionais, com preservação das evidências e aplicação do procedimento interno de resposta a incidentes.
