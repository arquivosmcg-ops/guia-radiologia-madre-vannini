import { useMemo, useState, type FormEvent } from "react";

type Hospital = { id: string; name: string; city: string; status: "Ativo" | "Rascunho" };
type Equipment = {
  id: string; hospitalId: string; name: string; type: "Aparelho de raios X" | "Detector DR" | "Digitalizador CR" | "Outro";
  brand: string; model: string; serial: string; technology: "DR" | "CR" | "Não definida"; notes: string;
};
type Protocol = { id: string; hospitalId: string; title: string; modality: string; status: "Em elaboração" | "Em revisão" | "Aprovado"; updated: string };

const initialHospitals: Hospital[] = [{ id: "madre-vannini", name: "Hospital e Maternidade Madre Vannini", city: "Conchal — SP", status: "Ativo" }];
const initialEquipment: Equipment[] = [
  { id: "eq1", hospitalId: "madre-vannini", name: "Detector digital AGFA", type: "Detector DR", brand: "AGFA Healthcare", model: "AXYS", serial: "4493", technology: "DR", notes: "Cadastro inicial informado pela equipe." },
  { id: "eq2", hospitalId: "madre-vannini", name: "Digitalizador AGFA CR 35-X", type: "Digitalizador CR", brand: "AGFA", model: "CR 35-X", serial: "", technology: "CR", notes: "" },
  { id: "eq3", hospitalId: "madre-vannini", name: "Aparelho de raios X — identificação pendente", type: "Aparelho de raios X", brand: "", model: "", serial: "", technology: "Não definida", notes: "Identificação técnica a confirmar." }
];
const initialProtocols: Protocol[] = [
  { id: "p1", hospitalId: "madre-vannini", title: "Radiografia de tórax", modality: "Radiografia convencional", status: "Em elaboração", updated: "Ainda não publicada" },
  { id: "p2", hospitalId: "madre-vannini", title: "Critérios de qualidade da imagem", modality: "Controle de qualidade", status: "Em revisão", updated: "Ainda não publicada" }
];
const uid = () => Math.random().toString(36).slice(2, 10);
const read = <T,>(key: string, fallback: T): T => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
};

export default function App() {
  const [hospitals, setHospitals] = useState<Hospital[]>(() => read("gr-hospitals", initialHospitals));
  const [equipment, setEquipment] = useState<Equipment[]>(() => read("gr-equipment", initialEquipment));
  const [protocols] = useState<Protocol[]>(() => read("gr-protocols", initialProtocols));
  const [hospitalId, setHospitalId] = useState("madre-vannini");
  const [page, setPage] = useState("Visão geral");
  const [search, setSearch] = useState("");
  const [showHospitalForm, setShowHospitalForm] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalCity, setHospitalCity] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState<Equipment["type"]>("Aparelho de raios X");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [technology, setTechnology] = useState<Equipment["technology"]>("Não definida");
  const [notes, setNotes] = useState("");
  const currentHospital = hospitals.find(h => h.id === hospitalId) ?? hospitals[0];
  const currentEquipment = useMemo(() => equipment.filter(e => e.hospitalId === hospitalId && [e.name,e.brand,e.model,e.serial,e.type].join(" ").toLowerCase().includes(search.toLowerCase())), [equipment, hospitalId, search]);
  const currentProtocols = protocols.filter(p => p.hospitalId === hospitalId);
  const saveHospitals = (next: Hospital[]) => { setHospitals(next); localStorage.setItem("gr-hospitals", JSON.stringify(next)); };
  const saveEquipment = (next: Equipment[]) => { setEquipment(next); localStorage.setItem("gr-equipment", JSON.stringify(next)); };
  const addHospital = (event: FormEvent) => {
    event.preventDefault(); if (!hospitalName.trim()) return;
    const h = { id: uid(), name: hospitalName.trim(), city: hospitalCity.trim() || "Localização não informada", status: "Rascunho" as const };
    saveHospitals([...hospitals, h]); setHospitalId(h.id); setHospitalName(""); setHospitalCity(""); setShowHospitalForm(false); setPage("Equipamentos");
  };
  const addEquipment = (event: FormEvent) => {
    event.preventDefault(); if (!equipmentName.trim()) return;
    saveEquipment([...equipment, { id: uid(), hospitalId, name: equipmentName.trim(), type: equipmentType, brand: brand.trim(), model: model.trim(), serial: serial.trim(), technology, notes: notes.trim() }]);
    setEquipmentName(""); setBrand(""); setModel(""); setSerial(""); setNotes(""); setTechnology("Não definida"); setShowEquipmentForm(false);
  };
  const nav = [{ label: "Visão geral", icon: "◫" }, { label: "Hospitais", icon: "⌂" }, { label: "Equipamentos", icon: "▣" }, { label: "Protocolos", icon: "≡" }, { label: "Revisão técnica", icon: "✓" }];
  const unknownCount = equipment.filter(e => e.hospitalId === hospitalId && (!e.brand || !e.model)).length;
  const approvedCount = currentProtocols.filter(p => p.status === "Aprovado").length;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">✚</div><div><strong>Guia de Radiologia</strong><span>GESTÃO MULTI-HOSPITALAR</span></div></div>
      <div className="side-label">ESPAÇO DE TRABALHO</div>
      <label className="hospital-select-label" htmlFor="hospital-select">Instituição selecionada</label>
      <select id="hospital-select" className="hospital-select" value={hospitalId} onChange={e => { setHospitalId(e.target.value); setSearch(""); }}>
        {hospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
      </select>
      <nav>{nav.map(n => <button key={n.label} className={page === n.label ? "nav-item active" : "nav-item"} onClick={() => setPage(n.label)}><span className="nav-icon">{n.icon}</span>{n.label}{n.label === "Equipamentos" && <span className="nav-count">{equipment.filter(e => e.hospitalId === hospitalId).length}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="secure-icon">⌑</div><div><strong>Uso responsável</strong><p>Protocolos clínicos exigem aprovação técnica formal.</p></div></div>
      <div className="user-profile"><div className="avatar">GR</div><div><strong>Equipe de radiologia</strong><span>Perfil de demonstração</span></div><span className="dots">•••</span></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="breadcrumbs">Radiologia <span>/</span> {page}</div><div className="top-actions"><span className="status-dot"></span><span>Ambiente de demonstração</span><button className="help-button" title="Ajuda">?</button></div></header>
      <div className="page-wrap">
        <div className="page-heading"><div><div className="eyebrow">{currentHospital?.city ?? "Instituição"}</div><h1>{page}</h1><p className="subheading">{page === "Visão geral" ? "Acompanhe os equipamentos e a situação dos protocolos da instituição." : page === "Hospitais" ? "Cadastre e organize instituições sem exigir todos os dados no início." : page === "Equipamentos" ? "Cadastre aparelhos, detectores e digitalizadores mesmo com informações pendentes." : page === "Protocolos" ? "Organize documentos técnicos e acompanhe o estado de aprovação." : "Acompanhe itens que precisam de conferência antes da publicação."}</p></div><button className="primary-button" onClick={() => page === "Hospitais" ? setShowHospitalForm(true) : page === "Equipamentos" ? setShowEquipmentForm(true) : setPage("Equipamentos")}><span>＋</span>{page === "Hospitais" ? "Adicionar hospital" : page === "Equipamentos" ? "Novo equipamento" : "Cadastrar equipamento"}</button></div>

        {page === "Visão geral" && <>
          <section className="welcome-card"><div className="welcome-copy"><span className="welcome-tag">PAINEL INSTITUCIONAL</span><h2>Radiologia organizada.<br/><em>Informação confiável.</em></h2><p>Gerencie equipamentos e protocolos de cada hospital em um só lugar, respeitando a validação técnica local.</p><button className="light-button" onClick={() => setPage("Equipamentos")}>Ver equipamentos <span>→</span></button></div><div className="welcome-art"><div className="art-ring ring-one"></div><div className="art-ring ring-two"></div><div className="art-cross">✚</div><div className="art-caption">CUIDADO · QUALIDADE · SEGURANÇA</div></div></section>
          <div className="section-title-row"><div><h2>Resumo da instituição</h2><p>Visão geral do espaço selecionado</p></div><span className="date-chip">Atualizado neste dispositivo</span></div>
          <div className="stats-grid"><Stat label="Equipamentos cadastrados" value={String(equipment.filter(e => e.hospitalId === hospitalId).length)} detail="Inclui cadastros incompletos" icon="▣"/><Stat label="Dados a completar" value={String(unknownCount)} detail="Marca ou modelo não informado" icon="◷"/><Stat label="Protocolos aprovados" value={String(approvedCount)} detail="Liberados para consulta" icon="✓"/><Stat label="Em elaboração/revisão" value={String(currentProtocols.filter(p => p.status !== "Aprovado").length)} detail="Não liberados para uso clínico" icon="≡"/></div>
          <div className="content-grid"><section className="panel equipment-panel"><div className="panel-heading"><div><h3>Equipamentos recentes</h3><p>Registros da instituição</p></div><button className="text-button" onClick={() => setPage("Equipamentos")}>Ver todos →</button></div><div className="mini-list">{equipment.filter(e => e.hospitalId === hospitalId).slice(0,4).map(e => <div className="mini-row" key={e.id}><div className="equipment-icon">{e.type === "Detector DR" ? "▦" : e.type === "Digitalizador CR" ? "▤" : "▣"}</div><div className="mini-main"><strong>{e.name}</strong><span>{e.brand || "Fabricante não informado"}{e.model ? " · " + e.model : " · Modelo não informado"}</span></div><span className={e.brand && e.model ? "pill pill-green" : "pill pill-amber"}>{e.brand && e.model ? "Identificado" : "Incompleto"}</span></div>)}</div></section>
          <section className="panel protocol-panel"><div className="panel-heading"><div><h3>Fluxo de protocolos</h3><p>Situação documental</p></div><button className="text-button" onClick={() => setPage("Protocolos")}>Abrir →</button></div>{currentProtocols.length ? currentProtocols.map(p => <div className="protocol-row" key={p.id}><div className="protocol-symbol">≡</div><div className="protocol-main"><strong>{p.title}</strong><span>{p.modality}</span><span className={p.status === "Aprovado" ? "pill pill-green" : p.status === "Em revisão" ? "pill pill-blue" : "pill pill-amber"}>{p.status}</span></div></div>) : <Empty title="Nenhum protocolo cadastrado" text="Os protocolos poderão ser adicionados para esta instituição."/>}</section></div>
        </>}

        {page === "Hospitais" && <section className="panel full-panel"><div className="panel-heading"><div><h3>Instituições cadastradas</h3><p>Os dados e equipamentos são separados por hospital.</p></div><span className="count-chip">{hospitals.length} instituição(ões)</span></div><div className="table-wrap"><table><thead><tr><th>Instituição</th><th>Localização</th><th>Equipamentos</th><th>Situação</th><th></th></tr></thead><tbody>{hospitals.map(h => <tr key={h.id}><td><strong>{h.name}</strong><small>ID: {h.id}</small></td><td>{h.city || "Não informada"}</td><td>{equipment.filter(e => e.hospitalId === h.id).length}</td><td><span className={h.status === "Ativo" ? "pill pill-green" : "pill pill-amber"}>{h.status}</span></td><td><button className="small-outline" onClick={() => {setHospitalId(h.id); setPage("Equipamentos");}}>Abrir instituição →</button></td></tr>)}</tbody></table></div></section>}

        {page === "Equipamentos" && <section className="panel full-panel"><div className="panel-heading"><div><h3>Inventário de equipamentos</h3><p>Os campos de identificação são opcionais; complete-os quando tiver os dados.</p></div><button className="secondary-button" onClick={() => setShowEquipmentForm(true)}>＋ Adicionar equipamento</button></div><div className="search-row"><div className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome, fabricante, modelo ou série..." /></div><span className="count-chip">{currentEquipment.length} registro(s)</span></div>{currentEquipment.length ? <div className="table-wrap"><table><thead><tr><th>Equipamento</th><th>Tipo / tecnologia</th><th>Fabricante / modelo</th><th>Número de série</th><th>Cadastro</th></tr></thead><tbody>{currentEquipment.map(e => <tr key={e.id}><td><strong>{e.name}</strong>{e.notes && <small>{e.notes}</small>}</td><td>{e.type}<small>{e.technology}</small></td><td>{e.brand || "Não informado"}<small>{e.model || "Modelo não informado"}</small></td><td>{e.serial || "Não informado"}</td><td><span className={e.brand && e.model ? "pill pill-green" : "pill pill-amber"}>{e.brand && e.model ? "Identificado" : "Pendente"}</span></td></tr>)}</tbody></table></div> : <Empty title="Nenhum equipamento encontrado" text="Adicione um equipamento ou ajuste os termos da busca."/>}<div className="info-note"><span>ⓘ</span><p><strong>Cadastro progressivo:</strong> não é necessário conhecer todos os dados para começar. Campos desconhecidos não impedem o registro e podem ser atualizados depois.</p></div></section>}

        {page === "Protocolos" && <section className="panel full-panel"><div className="panel-heading"><div><h3>Protocolos da instituição</h3><p>Somente protocolos aprovados formalmente podem ser liberados para consulta clínica.</p></div><span className="count-chip">{currentProtocols.length} protocolo(s)</span></div>{currentProtocols.length ? <div className="table-wrap"><table><thead><tr><th>Protocolo</th><th>Categoria</th><th>Estado</th><th>Disponibilidade</th></tr></thead><tbody>{currentProtocols.map(p => <tr key={p.id}><td><strong>{p.title}</strong><small>{p.updated}</small></td><td>{p.modality}</td><td><span className={p.status === "Aprovado" ? "pill pill-green" : p.status === "Em revisão" ? "pill pill-blue" : "pill pill-amber"}>{p.status}</span></td><td>{p.status === "Aprovado" ? "Disponível para consulta" : "Não publicado"}</td></tr>)}</tbody></table></div> : <Empty title="Comece pelos documentos da instituição" text="A estrutura está pronta para receber protocolos e seu fluxo de aprovação."/>}<div className="info-note"><span>⚕</span><p><strong>Segurança clínica:</strong> esta versão não cria parâmetros de exposição. Conteúdo técnico precisa ser elaborado e aprovado pelos responsáveis de cada instituição.</p></div></section>}

        {page === "Revisão técnica" && <section className="panel full-panel"><div className="panel-heading"><div><h3>Pendências de cadastro e validação</h3><p>Itens que merecem atenção da equipe responsável.</p></div></div><div className="review-card"><div className="review-mark amber">!</div><div><strong>{unknownCount} equipamento(s) com identificação incompleta</strong><p>É permitido manter campos pendentes durante o inventário. Complete-os quando as etiquetas ou documentos estiverem disponíveis.</p><button className="text-button" onClick={() => setPage("Equipamentos")}>Revisar equipamentos →</button></div></div><div className="review-card"><div className="review-mark blue">✓</div><div><strong>{currentProtocols.filter(p => p.status !== "Aprovado").length} protocolo(s) ainda não aprovado(s)</strong><p>Conteúdo em elaboração ou revisão não deve ser apresentado como protocolo clínico liberado.</p><button className="text-button" onClick={() => setPage("Protocolos")}>Ver protocolos →</button></div></div></section>}
        <footer className="footer"><span>Guia de Radiologia <b>·</b> Versão inicial 0.1</span><span>Ferramenta de apoio documental — não substitui validação clínica institucional.</span></footer>
      </div>
    </main>

    {showHospitalForm && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setShowHospitalForm(false); }}><form className="modal" onSubmit={addHospital}><div className="modal-heading"><div><span className="eyebrow">NOVA INSTITUIÇÃO</span><h2>Adicionar hospital</h2><p>Você pode completar os dados institucionais depois.</p></div><button type="button" className="close-button" onClick={() => setShowHospitalForm(false)}>×</button></div><label>Nome do hospital <span>*</span><input autoFocus required value={hospitalName} onChange={e => setHospitalName(e.target.value)} placeholder="Ex.: Hospital Municipal..." /></label><label>Cidade / estado<input value={hospitalCity} onChange={e => setHospitalCity(e.target.value)} placeholder="Ex.: Campinas — SP (opcional)" /></label><div className="modal-note">A instituição será criada como rascunho. Seus equipamentos ficarão separados dos demais hospitais.</div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowHospitalForm(false)}>Cancelar</button><button className="primary-button" type="submit">Criar instituição</button></div></form></div>}

    {showEquipmentForm && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setShowEquipmentForm(false); }}><form className="modal modal-wide" onSubmit={addEquipment}><div className="modal-heading"><div><span className="eyebrow">INVENTÁRIO TÉCNICO</span><h2>Novo equipamento</h2><p>Instituição: {currentHospital?.name}. Preencha o que souber agora.</p></div><button type="button" className="close-button" onClick={() => setShowEquipmentForm(false)}>×</button></div><label>Nome para identificação <span>*</span><input autoFocus required value={equipmentName} onChange={e => setEquipmentName(e.target.value)} placeholder="Ex.: Aparelho sala 1, detector móvel..." /></label><div className="form-grid"><label>Tipo de equipamento<select value={equipmentType} onChange={e => setEquipmentType(e.target.value as Equipment["type"])}><option>Aparelho de raios X</option><option>Detector DR</option><option>Digitalizador CR</option><option>Outro</option></select></label><label>Tecnologia<select value={technology} onChange={e => setTechnology(e.target.value as Equipment["technology"])}><option>Não definida</option><option>DR</option><option>CR</option></select></label><label>Fabricante<input value={brand} onChange={e => setBrand(e.target.value)} placeholder="Opcional" /></label><label>Modelo<input value={model} onChange={e => setModel(e.target.value)} placeholder="Opcional" /></label><label>Número de série<input value={serial} onChange={e => setSerial(e.target.value)} placeholder="Opcional" /></label><label>Observações<input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Opcional" /></label></div><div className="modal-note"><strong>Não sabe algum dado?</strong> Deixe o campo vazio. O registro será salvo e marcado como pendente de identificação.</div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowEquipmentForm(false)}>Cancelar</button><button className="primary-button" type="submit">Salvar equipamento</button></div></form></div>}
  </div>;
}

function Stat({label, value, detail, icon}: {label:string; value:string; detail:string; icon:string}) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className="stat-icon">{icon}</div></div><div className="stat-value">{value}</div><div className="stat-detail">{detail}</div></div>;
}
function Empty({title,text}:{title:string;text:string}) { return <div className="empty-state"><div className="empty-icon">▤</div><strong>{title}</strong><p>{text}</p></div>; }