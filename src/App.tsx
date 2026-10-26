import { useMemo, useState } from "react";

type View = "Tórax" | "Em preparação" | "Sobre o guia";
type Incidence = "PA" | "Perfil";

const exams = [
  { name: "Tórax", title: "Radiografia de tórax", detail: "Rotina: PA e Perfil", status: "Conteúdo inicial" },
  { name: "Abdome", title: "Radiografia de abdome", detail: "Incidências a definir", status: "Em preparação" },
  { name: "Coluna", title: "Radiografia de coluna", detail: "Incidências a definir", status: "Em preparação" },
  { name: "Crânio", title: "Radiografia de crânio", detail: "Incidências a definir", status: "Em preparação" },
  { name: "Extremidades", title: "Radiografia de extremidades", detail: "Incidências a definir", status: "Em preparação" },
];

function PositionDiagram({ incidence }: { incidence: Incidence }) {
  return <div className={`diagram diagram-${incidence.toLowerCase()}`} role="img" aria-label={incidence === "PA" ? "Esquema ilustrativo do posicionamento frontal para tórax PA" : "Esquema ilustrativo do posicionamento lateral para tórax"}>
    <div className="diagram-receptor"><span>RECEPTOR</span></div>
    <div className="diagram-person">
      <div className="head" />
      <div className="torso"><span className="lung lung-left" /><span className="lung lung-right" /><span className="spine" /></div>
      <div className="arm arm-left" /><div className="arm arm-right" />
      <div className="leg leg-left" /><div className="leg leg-right" />
    </div>
    <div className="beam-line"><span>Raio central</span></div>
    <div className="diagram-caption">{incidence === "PA" ? "Paciente de frente para o receptor" : "Lado esquerdo junto ao receptor"}</div>
  </div>;
}

export default function App() {
  const [selectedExam, setSelectedExam] = useState("Tórax");
  const [incidence, setIncidence] = useState<Incidence>("PA");
  const [search, setSearch] = useState("");
  const [showTechnique, setShowTechnique] = useState(true);
  const [showPosition, setShowPosition] = useState(true);
  const [showEquipment, setShowEquipment] = useState(false);
  const [equipment, setEquipment] = useState("Não configurado");
  const filteredExams = useMemo(() => exams.filter(e => (e.title + " " + e.name + " " + e.detail).toLowerCase().includes(search.toLowerCase())), [search]);
  const activeExam = exams.find(e => e.name === selectedExam) ?? exams[0];
  const isChest = selectedExam === "Tórax";

  return <div className="guide-app">
    <header className="app-header">
      <a className="brand" href="#" onClick={e => { e.preventDefault(); setSelectedExam("Tórax"); }} aria-label="Guia de Radiologia - início">
        <span className="brand-symbol">✚</span><span><strong>Guia de Radiologia</strong><small>HOSPITAL E MATERNIDADE MADRE VANNINI</small></span>
      </a>
      <div className="header-right"><span className="offline-label"><i /> Guia de consulta</span><button className="outline-button" onClick={() => setShowEquipment(v => !v)}>{showEquipment ? "Fechar configuração" : "Configuração técnica"}</button></div>
    </header>

    <main className="layout">
      <aside className="exam-sidebar">
        <div className="sidebar-title"><span>CONSULTA RÁPIDA</span><h2>Exames</h2><p>Escolha a região anatômica.</p></div>
        <label className="search-field"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar exame..." aria-label="Buscar exame" /></label>
        <nav className="exam-list" aria-label="Exames por região">
          {filteredExams.map(e => <button key={e.name} className={selectedExam === e.name ? "exam-item selected" : "exam-item"} onClick={() => { setSelectedExam(e.name); setIncidence("PA"); }}>
            <span className="exam-icon">{e.name === "Tórax" ? "♧" : e.name === "Abdome" ? "◉" : e.name === "Coluna" ? "♙" : e.name === "Crânio" ? "◌" : "✣"}</span>
            <span className="exam-item-copy"><strong>{e.name}</strong><small>{e.detail}</small></span><span className={e.name === "Tórax" ? "status-dot active-dot" : "status-dot"} />
          </button>)}
          {filteredExams.length === 0 && <p className="no-results">Nenhum exame encontrado.</p>}
        </nav>
        <div className="sidebar-note"><span>ⓘ</span><p><strong>Importante</strong><br />Consulte sempre o protocolo institucional aprovado e a orientação do responsável técnico.</p></div>
        <button className="about-link" onClick={() => setSelectedExam("Sobre o guia")}>Sobre este guia <span>→</span></button>
      </aside>

      <section className="main-area">
        {isChest ? <>
          <div className="breadcrumbs">Biblioteca de exames <span>/</span> Tórax <span>/</span> Rotina</div>
          <div className="hero-heading"><div><div className="eyebrow">RADIOGRAFIA CONVENCIONAL</div><h1>Radiografia de tórax</h1><p>Rotina: PA e Perfil</p></div><span className="draft-badge"><i /> Conteúdo demonstrativo</span></div>
          <div className="notice"><span className="notice-icon">!</span><div><strong>Parâmetros técnicos aguardam validação local</strong><p>Os valores exibidos são exemplos de referência fornecidos para estruturar o guia. Não são uma prescrição universal nem um protocolo aprovado para uso clínico. A equipe responsável deve validar posicionamento, técnica e aplicabilidade ao equipamento antes da publicação.</p></div></div>

          <div className="incidence-tabs" role="tablist" aria-label="Incidências de tórax">
            <button role="tab" aria-selected={incidence === "PA"} className={incidence === "PA" ? "incidence-tab active" : "incidence-tab"} onClick={() => setIncidence("PA")}><span className="tab-number">01</span><span><strong>PA</strong><small>Posteroanterior</small></span></button>
            <button role="tab" aria-selected={incidence === "Perfil"} className={incidence === "Perfil" ? "incidence-tab active" : "incidence-tab"} onClick={() => setIncidence("Perfil")}><span className="tab-number">02</span><span><strong>Perfil</strong><small>Lateral esquerda</small></span></button>
          </div>

          <div className="content-columns">
            <div className="left-column">
              <section className="guide-card">
                <button className="card-heading" onClick={() => setShowPosition(v => !v)} aria-expanded={showPosition}><span className="heading-icon">♧</span><span><strong>Posicionamento do paciente</strong><small>Orientação visual e alinhamento</small></span><span className="chevron">{showPosition ? "−" : "+"}</span></button>
                {showPosition && <div className="position-content"><PositionDiagram incidence={incidence} /><ol className="instruction-list">
                  {incidence === "PA" ? <>
                    <li><span>1</span><p><strong>Posição</strong>Paciente em pé, de frente para o receptor, com a região anterior do tórax apoiada no bucky vertical.</p></li>
                    <li><span>2</span><p><strong>Cabeça e ombros</strong>Elevar o queixo e rodar os ombros para a frente, afastando as escápulas dos campos pulmonares.</p></li>
                    <li><span>3</span><p><strong>Raio central</strong>Incidência perpendicular ao plano mediano, centrada aproximadamente no nível de T7, conforme protocolo validado.</p></li>
                    <li><span>4</span><p><strong>Respiração</strong>Realizar a exposição em apneia após inspiração profunda, conforme instrução do profissional responsável.</p></li>
                  </> : <>
                    <li><span>1</span><p><strong>Posição</strong>Paciente em pé, em perfil verdadeiro, com o lado esquerdo junto ao receptor.</p></li>
                    <li><span>2</span><p><strong> braços</strong>Elevar os braços para não sobrepor os campos pulmonares, mantendo o tronco sem rotação.</p></li>
                    <li><span>3</span><p><strong>Raio central</strong>Centrar na linha axilar média, aproximadamente ao nível de T7, conforme protocolo validado.</p></li>
                    <li><span>4</span><p><strong>Respiração</strong>Seguir a orientação de apneia e inspiração do protocolo institucional aprovado.</p></li>
                  </>}
                </ol></div>}
              </section>
              <section className="guide-card"><button className="card-heading" onClick={() => setShowTechnique(v => !v)} aria-expanded={showTechnique}><span className="heading-icon">⚙</span><span><strong>Técnica radiográfica</strong><small>Valores de referência não validados</small></span><span className="chevron">{showTechnique ? "−" : "+"}</span></button>
                {showTechnique && <div className="technique-content"><div className="technique-grid">
                  <div className="technique-value"><small>kV (exemplo)</small><strong>{incidence === "PA" ? "110–120" : "115–125"}</strong><span>Faixa informada no rascunho</span></div>
                  <div className="technique-value"><small>mAs (exemplo)</small><strong>{incidence === "PA" ? "2–4" : "4–8"}</strong><span>Adulto médio; conferir localmente</span></div>
                  <div className="technique-value"><small>DFF (referência)</small><strong>1,80 m</strong><span>Confirmar configuração e protocolo</span></div>
                  <div className="technique-value"><small>Grade antidifusora</small><strong>Conforme protocolo</strong><span>Depende da técnica e do sistema</span></div>
                </div><div className="technique-warning"><strong>Antes de usar:</strong> os valores devem ser confirmados pelo responsável técnico/radiologista e ajustados ao aparelho, detector, grade, biotipo e protocolo local. Não os use como configuração automática.</div><p className="technique-principle"><strong>Princípio geral informado:</strong> técnica de alto kV e baixo mAs, desde que validada para o sistema instalado e para a indicação clínica.</p></div>}
              </section>
            </div>
            <aside className="right-column">
              <section className="summary-card"><div className="summary-header"><span>✓</span><div><strong>Resumo da incidência</strong><small>{incidence === "PA" ? "PA · Posteroanterior" : "Perfil · Lateral esquerda"}</small></div></div><div className="summary-row"><span>Posição</span><strong>{incidence === "PA" ? "Em pé, anterior ao receptor" : "Em pé, lado esquerdo junto ao receptor"}</strong></div><div className="summary-row"><span>Centralização</span><strong>{incidence === "PA" ? "Plano mediano · T7" : "Linha axilar média · T7"}</strong></div><div className="summary-row"><span>Respiração</span><strong>Conforme protocolo aprovado</strong></div><div className="summary-footer"><span className="status-dot" /> Rascunho — não aprovado</div></section>
              <section className="quick-card"><h3>Conferência rápida</h3><ul><li><span>✓</span>Confirmar identidade e pedido do exame.</li><li><span>✓</span>Retirar objetos que possam causar artefatos.</li><li><span>✓</span>Orientar o paciente antes da exposição.</li><li><span>✓</span>Verificar colimação e critérios locais de qualidade.</li></ul><p>Seguir as normas de radioproteção e o protocolo institucional.</p></section>
              <section className="equipment-card"><div className="equipment-card-title"><span>▣</span><strong>Equipamento aplicado</strong></div><p>Use somente a técnica aprovada para o aparelho e detector instalados.</p><button onClick={() => setShowEquipment(v => !v)}>{showEquipment ? "Ocultar configuração" : "Configurar referência local"} →</button>{showEquipment && <label className="equipment-select">Referência do sistema<select value={equipment} onChange={e => setEquipment(e.target.value)}><option>Não configurado</option><option>Detector DR</option><option>Sistema CR</option><option>Outro / confirmar com responsável</option></select></label>}</section>
            </aside>
          </div>
          <footer className="page-footer"><span>Guia de Radiologia · Hospital e Maternidade Madre Vannini</span><span>Rascunho para validação institucional</span></footer>
        </> : selectedExam === "Sobre o guia" ? <div className="empty-page"><span className="large-icon">✚</span><div className="eyebrow">FINALIDADE</div><h1>Sobre este guia</h1><p>Ferramenta de consulta para apoiar a equipe durante exames radiográficos, com orientações de posicionamento e protocolos técnicos aprovados pela instituição.</p><div className="notice"><span className="notice-icon">!</span><div><strong>O conteúdo precisa de validação</strong><p>Este protótipo não substitui treinamento, julgamento profissional, instruções do fabricante nem protocolo institucional aprovado. Os parâmetros de exposição precisam ser revisados por profissionais autorizados antes do uso clínico.</p></div></div><button className="primary-button" onClick={() => setSelectedExam("Tórax")}>Voltar ao exame de tórax</button></div> : <div className="empty-page"><span className="large-icon">◌</span><div className="eyebrow">BIBLIOTECA EM CONSTRUÇÃO</div><h1>{activeExam.title}</h1><p>{activeExam.detail}. O conteúdo será incluído após revisão técnica e aprovação institucional.</p><div className="notice"><span className="notice-icon">i</span><div><strong>Protocolo ainda não disponível</strong><p>Para evitar informações incompletas ou parâmetros não validados, este exame ainda não apresenta instruções de posicionamento nem valores de exposição.</p></div></div><button className="primary-button" onClick={() => setSelectedExam("Tórax")}>Consultar tórax PA e Perfil</button></div>}
      </section>
    </main>
  </div>;
}
