import { useState } from "react";

const COLORS = {
  navy: "#1B2F4B",
  navyLight: "#243d5f",
  gold: "#C9931A",
  goldLight: "#E8A820",
  cream: "#FDF8F0",
  sand: "#F5EDD8",
  text: "#2C2C2C",
  textMuted: "#6B7280",
  white: "#FFFFFF",
  success: "#2D7A4F",
};

const initialJobs = [
  {
    id: 1,
    title: "Analista de RH Pleno",
    company: "Tech Solutions",
    location: "São Paulo, SP",
    type: "CLT",
    area: "Recursos Humanos",
    salary: "R$ 4.500 – R$ 5.500",
    description:
      "Buscamos um profissional apaixonado por pessoas para atuar em processos de recrutamento, desenvolvimento organizacional e cultura. Você irá conduzir entrevistas, aplicar ferramentas de assessment e apoiar gestores em decisões estratégicas de RH.",
    requirements: [
      "Graduação em Psicologia, Administração ou áreas afins",
      "Experiência mínima de 2 anos em RH",
      "Conhecimento em ferramentas de recrutamento (ATS)",
      "Boa comunicação e escuta ativa",
    ],
    postedAt: "2025-05-15",
    active: true,
  },
  {
    id: 2,
    title: "Assistente Administrativo",
    company: "Grupo Meridian",
    location: "Campinas, SP",
    type: "CLT",
    area: "Administrativo",
    salary: "R$ 2.200 – R$ 2.800",
    description:
      "Suporte às rotinas administrativas, controle de documentos, atendimento interno e externo. Ambiente dinâmico e equipe colaborativa.",
    requirements: [
      "Ensino médio completo (superior em andamento é diferencial)",
      "Pacote Office intermediário",
      "Organização e proatividade",
    ],
    postedAt: "2025-05-18",
    active: true,
  },
  {
    id: 3,
    title: "Coordenador de Treinamento & Desenvolvimento",
    company: "Varejo Nacional",
    location: "Remoto",
    type: "CLT",
    area: "Treinamento & Desenvolvimento",
    salary: "R$ 7.000 – R$ 9.000",
    description:
      "Responsável por planejar, implementar e avaliar programas de T&D para toda a rede. Você irá mapear necessidades, desenvolver trilhas de aprendizagem e mensurar resultados de forma estratégica.",
    requirements: [
      "Graduação completa em Psicologia, Pedagogia ou Administração",
      "Experiência em T&D corporativo",
      "Conhecimento em plataformas LMS",
      "Visão estratégica e orientação a resultados",
    ],
    postedAt: "2025-05-10",
    active: true,
  },
  {
    id: 4,
    title: "Recrutador(a) Sênior",
    company: "Fintech Start",
    location: "São Paulo, SP",
    type: "PJ",
    area: "Recursos Humanos",
    salary: "R$ 6.000 – R$ 8.000",
    description:
      "Conduzir processos seletivos end-to-end para vagas técnicas e de negócio. Construir e manter pipeline ativo de talentos, atuar como business partner junto aos gestores.",
    requirements: [
      "Experiência sólida em recrutamento especializado",
      "Domínio de LinkedIn Recruiter e ferramentas de ATS",
      "Capacidade de atuar com múltiplos processos simultâneos",
    ],
    postedAt: "2025-05-20",
    active: true,
  },
];

const AREAS = ["Todas as áreas", "Recursos Humanos", "Administrativo", "Treinamento & Desenvolvimento", "Financeiro", "Tecnologia"];
const TYPES = ["Todos os tipos", "CLT", "PJ", "Estágio", "Freelance"];

// SVG Logo Lumna (vetorial inline)
function LumnaLogo({ size = 120, light = false }) {
  const textColor = light ? "#FFFFFF" : "#2C2C2C";
  const goldColor = "#C9931A";
  return (
    <svg width={size} height={size * 0.52} viewBox="0 0 220 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* L shape */}
      <rect x="18" y="8" width="18" height="62" rx="9" fill={textColor} />
      <rect x="18" y="52" width="42" height="18" rx="9" fill={textColor} />
      {/* dot/seed */}
      <ellipse cx="52" cy="46" rx="12" ry="15" fill={goldColor} transform="rotate(-15 52 46)" />
      {/* umna text */}
      <text x="72" y="68" fontFamily="'Nunito', 'Quicksand', sans-serif" fontWeight="700" fontSize="46" fill={textColor} letterSpacing="-1">umna</text>
      {/* tagline */}
      <text x="19" y="98" fontFamily="'Nunito', 'Quicksand', sans-serif" fontWeight="400" fontSize="17" fill={goldColor} letterSpacing="0.5">Gestão de Pessoas</text>
    </svg>
  );
}

function Badge({ children, color }) {
  const styles = {
    CLT: { bg: "#E8F5E9", text: "#2D7A4F" },
    PJ: { bg: "#FFF3E0", text: "#E65100" },
    Estágio: { bg: "#E3F2FD", text: "#1565C0" },
    Freelance: { bg: "#F3E5F5", text: "#6A1B9A" },
  };
  const s = styles[children] || { bg: "#F0F0F0", text: "#555" };
  return (
    <span style={{
      background: s.bg, color: s.text,
      padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
    }}>
      {children}
    </span>
  );
}

function JobCard({ job, onClick }) {
  return (
    <div
      onClick={() => onClick(job)}
      style={{
        background: COLORS.white,
        border: `1.5px solid #EEE5D0`,
        borderRadius: 16,
        padding: "24px 28px",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 2px 8px rgba(27,47,75,0.06)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = COLORS.gold;
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,147,26,0.15)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#EEE5D0";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(27,47,75,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3 }}>{job.title}</h3>
        <Badge>{job.type}</Badge>
      </div>
      <p style={{ margin: "4px 0 12px", color: COLORS.gold, fontWeight: 600, fontSize: 14 }}>{job.company}</p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
          📍 {job.location}
        </span>
        <span style={{ fontSize: 13, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
          💼 {job.area}
        </span>
        <span style={{ fontSize: 13, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
          💰 {job.salary}
        </span>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(27,47,75,0.55)",
      backdropFilter: "blur(4px)", zIndex: 1000, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div
        style={{
          background: COLORS.white, borderRadius: 20,
          maxWidth: 640, width: "100%", maxHeight: "90vh",
          overflowY: "auto", boxShadow: "0 24px 64px rgba(27,47,75,0.25)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function JobDetailModal({ job, onClose, onApply }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ padding: "32px 36px" }}>
        <button onClick={onClose} style={{
          float: "right", background: "none", border: "none",
          fontSize: 22, cursor: "pointer", color: COLORS.textMuted, lineHeight: 1,
        }}>✕</button>
        <div style={{ marginBottom: 20 }}>
          <Badge>{job.type}</Badge>
          <h2 style={{ margin: "10px 0 4px", color: COLORS.navy, fontSize: 22, fontWeight: 800 }}>{job.title}</h2>
          <p style={{ margin: 0, color: COLORS.gold, fontWeight: 700, fontSize: 15 }}>{job.company}</p>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid #EEE5D0` }}>
          <InfoChip icon="📍" label={job.location} />
          <InfoChip icon="💼" label={job.area} />
          <InfoChip icon="💰" label={job.salary} />
        </div>
        <h4 style={{ color: COLORS.navy, marginBottom: 8 }}>Sobre a vaga</h4>
        <p style={{ color: COLORS.text, lineHeight: 1.7, marginBottom: 20 }}>{job.description}</p>
        <h4 style={{ color: COLORS.navy, marginBottom: 10 }}>Requisitos</h4>
        <ul style={{ paddingLeft: 20, margin: "0 0 28px", lineHeight: 2 }}>
          {job.requirements.map((r, i) => (
            <li key={i} style={{ color: COLORS.text }}>{r}</li>
          ))}
        </ul>
        <button
          onClick={() => onApply(job)}
          style={{
            width: "100%", padding: "14px", background: COLORS.navy,
            color: COLORS.white, border: "none", borderRadius: 12,
            fontSize: 16, fontWeight: 700, cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = COLORS.navyLight}
          onMouseLeave={e => e.currentTarget.style.background = COLORS.navy}
        >
          Candidatar-me a esta vaga →
        </button>
      </div>
    </Modal>
  );
}

function InfoChip({ icon, label }) {
  return (
    <span style={{
      background: COLORS.sand, borderRadius: 10, padding: "6px 14px",
      fontSize: 13, color: COLORS.navy, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
    }}>
      {icon} {label}
    </span>
  );
}

const EMAILJS_SERVICE_ID = "service_ovblngm";
const EMAILJS_TEMPLATE_ID = "template_5j4noe4";
const EMAILJS_PUBLIC_KEY = "ST9enNbH96O792xw-";

function ApplicationForm({ job, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [cvB64, setCvB64] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCvFile(file);
    setError("");
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setCvB64(reader.result.split(",")[1]);
      setUploading(false);
    };
    reader.onerror = () => {
      setError("Erro ao ler o arquivo. Tente novamente.");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const sendEmail = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Por favor, preencha nome e e-mail.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_ovblngm",
          template_id: "template_5j4noe4",
          user_id: "ST9enNbH96O792xw-",
          template_params: {
            data_hora: new Date().toLocaleString("pt-BR"),
            vaga: job.title,
            empresa: job.company,
            nome: name,
            email: email,
            telefone: phone || "Não informado",
            linkedin: linkedin || "Não informado",
            mensagem: message || "Não informada",
            curriculo: cvFile ? cvFile.name + " (anexado em base64 — " + Math.round(cvB64.length * 0.75 / 1024) + "KB)" : "Não enviado",
          cv_base64: cvB64 ? cvB64.substring(0, 100) + "..." : "Não enviado",
          },
        }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        const txt = await res.text();
        setError("Erro ao enviar: " + txt);
      }
    } catch (e) {
      setError("Falha na conexão. Tente novamente.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: "1.5px solid #DDD4C0", fontSize: 14, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit", marginBottom: 14,
    display: "block",
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ padding: "32px 36px" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          float: "right", background: "none", border: "none",
          fontSize: 22, cursor: "pointer", color: COLORS.textMuted,
        }}>✕</button>
        <h2 style={{ margin: "0 0 4px", color: COLORS.navy, fontSize: 20, fontWeight: 800 }}>Candidatura</h2>
        <p style={{ margin: "0 0 20px", color: COLORS.gold, fontWeight: 600 }}>{job.title} — {job.company}</p>

        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>Nome completo *</label>
        <input style={inputStyle} type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} />

        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>E-mail *</label>
        <input style={inputStyle} type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />

        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>Telefone / WhatsApp</label>
        <input style={inputStyle} type="tel" placeholder="(16) 99999-9999" value={phone} onChange={e => setPhone(e.target.value)} />

        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>LinkedIn (opcional)</label>
        <input style={inputStyle} type="text" placeholder="linkedin.com/in/seuperfil" value={linkedin} onChange={e => setLinkedin(e.target.value)} />

        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>Mensagem</label>
        <textarea
          rows={3}
          placeholder="Conte um pouco sobre você e por que tem interesse nesta vaga..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 6 }}>
          Currículo (PDF) *
        </label>
        <label style={{
          display: "flex", alignItems: "center", gap: 10,
          background: cvFile && !uploading ? "#E8F5E9" : COLORS.sand,
          border: cvFile && !uploading ? "1.5px solid #2D7A4F" : "1.5px dashed #C9931A",
          borderRadius: 10, padding: "12px 16px", cursor: "pointer",
          fontSize: 14, color: COLORS.navy, marginBottom: 14,
        }}>
          <span>{uploading ? "⏳" : cvFile ? "✅" : "📎"}</span>
          <span>
            {uploading ? "Lendo arquivo..." : cvFile ? cvFile.name + " — pronto!" : "Clique para anexar seu currículo"}
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>

        {error && (
          <p style={{ color: "#B91C1C", fontSize: 13, marginBottom: 12, background: "#FEE2E2", padding: "8px 12px", borderRadius: 8 }}>
            ⚠️ {error}
          </p>
        )}

        <button
          onClick={sendEmail}
          disabled={loading || uploading}
          style={{
            width: "100%", padding: 14,
            background: loading || uploading ? "#AAA" : COLORS.gold,
            color: COLORS.white, border: "none", borderRadius: 12,
            fontSize: 16, fontWeight: 700,
            cursor: loading || uploading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Enviando..." : uploading ? "Aguarde..." : "Enviar candidatura ✓"}
        </button>
      </div>
    </Modal>
  );
}

function SuccessModal({ job, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ padding: "48px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ color: COLORS.navy, marginBottom: 8 }}>Candidatura enviada!</h2>
        <p style={{ color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 8 }}>
          Sua candidatura para <strong>{job.title}</strong> foi recebida com sucesso.
        </p>
        <p style={{ color: COLORS.textMuted, marginBottom: 28 }}>
          A equipe Lumna irá analisar seu perfil e entrará em contato em breve. 💛
        </p>
        <button onClick={onClose} style={{
          background: COLORS.navy, color: COLORS.white, border: "none",
          borderRadius: 12, padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
        }}>
          Ver outras vagas
        </button>
      </div>
    </Modal>
  );
}

// ---- ADMIN PANEL ----
function AdminPanel({ jobs, setJobs, onClose }) {
  const [tab, setTab] = useState("list");
  const [editJob, setEditJob] = useState(null);
  const empty = { title: "", company: "", location: "", type: "CLT", area: "Recursos Humanos", salary: "", description: "", requirements: "", active: true };
  const [form, setForm] = useState(empty);

  const openNew = () => { setForm(empty); setEditJob(null); setTab("form"); };
  const openEdit = (j) => {
    setForm({ ...j, requirements: j.requirements.join("\n") });
    setEditJob(j.id); setTab("form");
  };
  const toggleActive = (id) => setJobs(js => js.map(j => j.id === id ? { ...j, active: !j.active } : j));
  const deleteJob = (id) => { if (confirm("Remover esta vaga?")) setJobs(js => js.filter(j => j.id !== id)); };

  const saveForm = () => {
    if (!form.title || !form.company) return alert("Título e empresa são obrigatórios.");
    const reqs = form.requirements.split("\n").map(r => r.trim()).filter(Boolean);
    if (editJob) {
      setJobs(js => js.map(j => j.id === editJob ? { ...form, id: editJob, requirements: reqs, postedAt: j.postedAt } : j));
    } else {
      setJobs(js => [...js, { ...form, id: Date.now(), requirements: reqs, postedAt: new Date().toISOString().slice(0, 10) }]);
    }
    setTab("list");
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: `1.5px solid #DDD4C0`, fontSize: 14, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit", marginBottom: 14,
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(27,47,75,0.6)",
      backdropFilter: "blur(4px)", zIndex: 2000, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: COLORS.white, borderRadius: 20, width: "100%",
        maxWidth: 780, maxHeight: "92vh", overflowY: "auto",
        boxShadow: "0 24px 64px rgba(27,47,75,0.3)",
      }}>
        <div style={{
          background: COLORS.navy, padding: "20px 28px",
          borderRadius: "20px 20px 0 0", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>⚙️</span>
            <span style={{ color: COLORS.white, fontWeight: 800, fontSize: 17 }}>Painel Admin — Vagas</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.white, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "24px 28px" }}>
          {tab === "list" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14 }}>{jobs.length} vagas cadastradas</p>
                <button onClick={openNew} style={{
                  background: COLORS.gold, color: COLORS.white, border: "none",
                  borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14,
                }}>+ Nova vaga</button>
              </div>
              {jobs.map(j => (
                <div key={j.id} style={{
                  border: `1.5px solid #EEE5D0`, borderRadius: 12,
                  padding: "16px 20px", marginBottom: 10,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  opacity: j.active ? 1 : 0.5,
                }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: COLORS.navy }}>{j.title}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: COLORS.textMuted }}>{j.company} · {j.location} · {j.type}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => toggleActive(j.id)} style={{
                      background: j.active ? "#E8F5E9" : "#FFF3E0", border: "none",
                      borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700,
                      cursor: "pointer", color: j.active ? "#2D7A4F" : "#E65100",
                    }}>{j.active ? "Ativa" : "Inativa"}</button>
                    <button onClick={() => openEdit(j)} style={{
                      background: COLORS.sand, border: "none", borderRadius: 8,
                      padding: "6px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600,
                    }}>Editar</button>
                    <button onClick={() => deleteJob(j.id)} style={{
                      background: "#FEE2E2", border: "none", borderRadius: 8,
                      padding: "6px 12px", fontSize: 12, cursor: "pointer", color: "#B91C1C", fontWeight: 600,
                    }}>Excluir</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === "form" && (
            <>
              <h3 style={{ margin: "0 0 20px", color: COLORS.navy }}>{editJob ? "Editar vaga" : "Nova vaga"}</h3>
              {[
                { key: "title", label: "Título da vaga *", placeholder: "Ex: Analista de RH Pleno" },
                { key: "company", label: "Empresa *", placeholder: "Nome da empresa" },
                { key: "location", label: "Localização", placeholder: "Ex: São Paulo, SP ou Remoto" },
                { key: "salary", label: "Faixa salarial", placeholder: "Ex: R$ 4.500 – R$ 5.500" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>{label}</label>
                  <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder} style={inputStyle} />
                </div>
              ))}

              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>Tipo de contrato</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ ...inputStyle, marginBottom: 0 }}>
                    {["CLT", "PJ", "Estágio", "Freelance"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>Área</label>
                  <select value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} style={{ ...inputStyle, marginBottom: 0 }}>
                    {AREAS.slice(1).map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>Descrição da vaga</label>
              <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Descreva a vaga, responsabilidades e ambiente de trabalho..."
                style={{ ...inputStyle, resize: "vertical" }} />

              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, display: "block", marginBottom: 4 }}>
                Requisitos <span style={{ fontWeight: 400, color: COLORS.textMuted }}>(um por linha)</span>
              </label>
              <textarea rows={4} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
                placeholder={"Graduação em Administração\nExperiência de 2 anos\nPacote Office avançado"}
                style={{ ...inputStyle, resize: "vertical" }} />

              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setTab("list")} style={{
                  flex: 1, padding: 12, background: COLORS.sand, border: "none",
                  borderRadius: 10, fontWeight: 700, cursor: "pointer",
                }}>Cancelar</button>
                <button onClick={saveForm} style={{
                  flex: 2, padding: 12, background: COLORS.navy, color: COLORS.white,
                  border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15,
                }}>
                  {editJob ? "Salvar alterações" : "Publicar vaga"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- MAIN APP ----
export default function LumnaPortal() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [filterArea, setFilterArea] = useState("Todas as áreas");
  const [filterType, setFilterType] = useState("Todos os tipos");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [successJob, setSuccessJob] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const filtered = jobs.filter(j => {
    if (!j.active) return false;
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
    const matchArea = filterArea === "Todas as áreas" || j.area === filterArea;
    const matchType = filterType === "Todos os tipos" || j.type === filterType;
    return matchSearch && matchArea && matchType;
  });

  const handleAdminAccess = () => {
    if (adminPass === "lumna2025") { setAdminAuth(true); setShowAdmin(true); }
    else alert("Senha incorreta.");
  };

  return (
    <div style={{ fontFamily: "'Nunito', 'Quicksand', Georgia, sans-serif", background: COLORS.cream, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <header style={{
        background: COLORS.navy, padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72, boxShadow: "0 4px 20px rgba(27,47,75,0.3)",
      }}>
        <LumnaLogo size={110} light />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
            {jobs.filter(j => j.active).length} vagas abertas
          </span>
          {!adminAuth ? (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="password"
                placeholder="Senha admin"
                value={adminPass}
                onChange={e => setAdminPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdminAccess()}
                style={{
                  padding: "7px 12px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)", color: COLORS.white, fontSize: 13, outline: "none",
                  width: 130,
                }}
              />
              <button onClick={handleAdminAccess} style={{
                background: COLORS.gold, color: COLORS.white, border: "none",
                borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 13,
              }}>Entrar</button>
            </div>
          ) : (
            <button onClick={() => setShowAdmin(true)} style={{
              background: COLORS.gold, color: COLORS.white, border: "none",
              borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13,
            }}>⚙️ Painel Admin</button>
          )}
        </div>
      </header>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #243d5f 60%, #1B2F4B 100%)`,
        padding: "60px 40px", textAlign: "center",
      }}>
        <h1 style={{
          color: COLORS.white, fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: 800, margin: "0 0 12px", lineHeight: 1.2,
        }}>
          Encontre a vaga certa para <span style={{ color: COLORS.gold }}>você</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, margin: "0 0 32px" }}>
          Oportunidades selecionadas com cuidado pela equipe Lumna
        </p>

        {/* Search */}
        <div style={{
          maxWidth: 600, margin: "0 auto",
          background: COLORS.white, borderRadius: 14,
          display: "flex", overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}>
          <span style={{ padding: "0 16px", display: "flex", alignItems: "center", fontSize: 18 }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por cargo, empresa ou cidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: 15, padding: "16px 0", fontFamily: "inherit",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{
              padding: "0 16px", background: "none", border: "none",
              cursor: "pointer", color: COLORS.textMuted, fontSize: 16,
            }}>✕</button>
          )}
        </div>
      </section>

      {/* FILTERS + LISTING */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: COLORS.textMuted, fontSize: 14, fontWeight: 600 }}>Filtrar por:</span>
          <select value={filterArea} onChange={e => setFilterArea(e.target.value)} style={{
            padding: "8px 14px", borderRadius: 10, border: `1.5px solid #DDD4C0`,
            fontSize: 14, background: COLORS.white, cursor: "pointer", fontFamily: "inherit", outline: "none",
          }}>
            {AREAS.map(a => <option key={a}>{a}</option>)}
          </select>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{
            padding: "8px 14px", borderRadius: 10, border: `1.5px solid #DDD4C0`,
            fontSize: 14, background: COLORS.white, cursor: "pointer", fontFamily: "inherit", outline: "none",
          }}>
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          {(filterArea !== "Todas as áreas" || filterType !== "Todos os tipos" || search) && (
            <button onClick={() => { setFilterArea("Todas as áreas"); setFilterType("Todos os tipos"); setSearch(""); }} style={{
              background: "none", border: `1.5px solid #DDD4C0`, borderRadius: 10,
              padding: "8px 14px", fontSize: 13, cursor: "pointer", color: COLORS.textMuted,
            }}>Limpar filtros</button>
          )}
          <span style={{ marginLeft: "auto", fontSize: 14, color: COLORS.textMuted }}>
            {filtered.length} {filtered.length === 1 ? "vaga encontrada" : "vagas encontradas"}
          </span>
        </div>

        {/* Job list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔎</div>
            <h3 style={{ color: COLORS.navy }}>Nenhuma vaga encontrada</h3>
            <p style={{ color: COLORS.textMuted }}>Tente outros termos ou remova os filtros.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map(j => <JobCard key={j.id} job={j} onClick={setSelectedJob} />)}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{
        background: COLORS.navy, padding: "32px 40px",
        textAlign: "center",
      }}>
        <LumnaLogo size={90} light />
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "16px 0 0" }}>
          © 2025 Lumna Gestão de Pessoas · Todos os direitos reservados
        </p>
      </footer>

      {/* MODALS */}
      {selectedJob && !applyJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={(j) => { setApplyJob(j); setSelectedJob(null); }}
        />
      )}
      {applyJob && !successJob && (
        <ApplicationForm
          job={applyJob}
          onClose={() => setApplyJob(null)}
          onSuccess={() => { setSuccessJob(applyJob); setApplyJob(null); }}
        />
      )}
      {successJob && (
        <SuccessModal job={successJob} onClose={() => setSuccessJob(null)} />
      )}
      {showAdmin && (
        <AdminPanel jobs={jobs} setJobs={setJobs} onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}
