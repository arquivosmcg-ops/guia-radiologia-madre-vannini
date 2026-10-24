# Guia de Radiologia — Hospital e Maternidade Madre Vannini

Aplicativo institucional responsivo para consulta de protocolos radiográficos aprovados, apoio ao posicionamento e consulta de critérios de qualidade da imagem em equipamentos de radiografia digital (DR) e radiografia computadorizada (CR).

> **Segurança clínica:** este repositório inicia com estrutura e documentação. Não contém parâmetros de exposição clínica aprovados. Nenhum valor técnico deve ser criado, presumido ou utilizado na assistência sem validação formal pelos responsáveis designados pelo hospital.

## Objetivos
- Centralizar protocolos institucionais aprovados e suas versões.
- Facilitar a consulta por técnicos de radiologia em computadores, tablets e celulares.
- Documentar posicionamento, critérios de qualidade e aplicabilidade por equipamento.
- Manter rastreabilidade de autoria, revisão, aprovação e alterações.
- Separar claramente conteúdo em elaboração de conteúdo aprovado para uso.

## Escopo inicial
- Equipamentos DR e CR.
- Perfis: técnico de radiologia, responsável técnico/revisor e administrador autorizado.
- Consulta de protocolos publicados.
- Fluxo documental de elaboração, revisão, aprovação, publicação e revisão periódica.
- Sem armazenamento de dados identificáveis de pacientes na primeira etapa.

## Arquitetura proposta
- Front-end: React, TypeScript, Vite e Tailwind CSS.
- Experiência instalável e responsiva: Progressive Web App (PWA).
- Backend e persistência propostos: Supabase/PostgreSQL, condicionados à aprovação institucional e à análise de segurança.
- Testes: Vitest para testes unitários e Playwright para testes de ponta a ponta.
- Repositório e automação: GitHub.

Consulte a documentação em docs/ARQUITETURA.md, docs/SEGURANCA.md, docs/VALIDACAO-CLINICA.md e docs/PLANO-DE-DESENVOLVIMENTO.md.

## Princípios obrigatórios
1. Não publicar protocolos sem aprovação formal.
2. Não inventar nem extrapolar parâmetros de exposição.
3. Registrar versão, equipamento aplicável, fontes e responsáveis.
4. Preservar versões publicadas; alterações devem gerar nova versão.
5. Aplicar permissões no servidor/banco de dados, não apenas na interface.
6. Não incluir credenciais, chaves privadas ou dados de pacientes no Git.
7. Tratar conteúdo técnico como controlado: toda publicação requer validação institucional.

## Situação do projeto
**Fase 0 — Fundação documental.** Estrutura e documentação inicial; ainda não é um sistema clínico operacional.

## Desenvolvimento local
Os comandos serão definidos quando os arquivos da aplicação e o gerenciador de pacotes forem introduzidos. Não existe ainda uma aplicação executável nesta fase.

## Responsabilidade
O uso clínico depende de governança, validação e aprovação formal do Hospital e Maternidade Madre Vannini. A aplicação é uma ferramenta de consulta e documentação; não substitui treinamento, julgamento profissional, normas aplicáveis ou instruções do fabricante.
