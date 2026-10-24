# Arquitetura proposta

## 1. Visão geral
A solução será uma aplicação web responsiva, com possibilidade de instalação como PWA, para consulta de protocolos radiográficos institucionais. Deve funcionar em computadores, tablets e celulares, com interface adequada a diferentes tamanhos de tela.

## 2. Componentes
- **Interface:** React + TypeScript + Vite.
- **Estilo e responsividade:** Tailwind CSS, com componentes acessíveis e padrões visuais consistentes.
- **PWA:** manifesto, ícones e estratégia de cache a definir. Conteúdo clínico não deve ser disponibilizado offline por cache sem avaliação de risco, controle de versão e decisão institucional explícita.
- **Persistência e autenticação:** Supabase com PostgreSQL e autenticação, sujeito à aprovação de TI/segurança do hospital.
- **Controle de acesso:** políticas de autorização no banco/servidor, incluindo Row Level Security (RLS) quando aplicável.
- **Qualidade:** Vitest, Playwright e verificações automatizadas no GitHub Actions.

A arquitetura é uma proposta inicial. A escolha definitiva de serviços, hospedagem, residência dos dados, backups e retenção depende da aprovação institucional.

## 3. Organização sugerida do repositório

    .
    ├── .github/workflows/
    ├── docs/
    │   ├── ARQUITETURA.md
    │   ├── SEGURANCA.md
    │   ├── VALIDACAO-CLINICA.md
    │   └── PLANO-DE-DESENVOLVIMENTO.md
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── features/auth/
    │   ├── features/protocols/
    │   ├── features/quality/
    │   ├── lib/
    │   ├── pages/
    │   └── types/
    ├── supabase/migrations/
    ├── tests/e2e/
    ├── tests/unit/
    ├── .env.example
    ├── .gitignore
    └── README.md

Os diretórios da aplicação podem ser criados gradualmente; a estrutura acima é o destino proposto, não a afirmação de que todo o código já existe.

## 4. Modelo de domínio inicial
Entidades candidatas:
- **profiles:** perfil de acesso associado à identidade autenticada.
- **user_roles:** papéis autorizados e sua atribuição.
- **equipment:** fabricante, modelo, modalidade DR/CR, identificador interno e situação.
- **anatomical_regions:** regiões anatômicas e estudos relacionados.
- **protocols:** identidade estável do protocolo e seu estado geral.
- **protocol_versions:** conteúdo versionado, aplicabilidade, fontes, justificativa da alteração e datas.
- **protocol_reviews:** registros de revisão técnica e aprovação formal.
- **audit_logs:** eventos relevantes de acesso administrativo e alterações.

O modelo definitivo deve ser revisto com radiologia, responsável técnico, TI e encarregado de proteção de dados. Não incluir dados identificáveis de pacientes no escopo inicial.

## 5. Ciclo de vida do protocolo
Estados propostos:
1. Rascunho.
2. Em revisão técnica.
3. Aguardando aprovação formal.
4. Em teste/validação local, quando aplicável.
5. Publicado.
6. Suspenso ou arquivado.

Somente versões aprovadas podem aparecer como conteúdo vigente para consulta operacional. Uma versão publicada não deve ser sobrescrita: qualquer mudança gera uma nova versão, preservando histórico e vínculo com a anterior.

## 6. Dados mínimos de uma versão
- Identificador e número da versão.
- Região anatômica e finalidade do exame.
- Modalidade/equipamento aplicável (DR ou CR), incluindo modelo quando necessário.
- Instruções de posicionamento e critérios de qualidade.
- Parâmetros técnicos, apenas quando formalmente aprovados.
- Fontes e documentos de referência.
- Autor, revisor técnico e aprovador formal.
- Data de criação, aprovação, publicação e próxima revisão.
- Justificativa da alteração e histórico de versões.

## 7. Ambientes e entrega
Separar desenvolvimento, testes e produção. A publicação em produção deve depender de revisão de código, testes automatizados e aprovação do conteúdo clínico. Não colocar segredos no front-end nem no histórico do Git.
