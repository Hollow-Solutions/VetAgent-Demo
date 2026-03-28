import { useState } from "react";
import {
  LayoutGrid, Calendar, PawPrint, User, Package, CreditCard,
  BarChart3, Settings, ChevronDown, LogOut, Search, Bell,
  HelpCircle, Plus, Eye, AlertTriangle, Syringe, TrendingUp,
  TrendingDown, Download, ChevronLeft, ChevronRight, X,
  MessageCircle, Phone, Mail, MapPin, FileText, Save,
  Building2, Users, Lock, ArrowLeft, Filter, Clock,
  Edit, MoreVertical
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";

// ─── DESIGN TOKENS (V2 palette) ───────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --primary: #085041;
    --primary-mid: #1D9E75;
    --primary-light: #E1F5EE;
    --primary-text: #085041;
    --amber-bg: #FAEEDA; --amber-text: #633806; --amber-border: #EF9F27;
    --red-bg: #FCEBEB; --red-text: #791F1F;
    --blue-bg: #E6F1FB; --blue-text: #0C447C;
    --gray-bg: #F1EFE8; --gray-text: #5F5E5A;
    --page-bg: #F5F5F3; --surface: #FFFFFF;
    --border: rgba(0,0,0,0.09);
    --text-primary: #1A1A18; --text-secondary: #5F5E5A; --text-tertiary: #888780;
    --sidebar: #085041;
    --font: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
  }
  body { font-family: var(--font); background: var(--page-bg); color: var(--text-primary); font-size: 14px; }
  input, select, textarea, button { font-family: var(--font); }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
`;

// ─── STATUS BADGE ──────────────────────────────────────────
const statusStyles = {
  "CONFIRMADA": { bg: "#E1F5EE", text: "#085041" },
  "PENDIENTE": { bg: "#FAEEDA", text: "#633806" },
  "EN CONSULTA": { bg: "#E6F1FB", text: "#0C447C" },
  "COMPLETADA": { bg: "#F1EFE8", text: "#444441" },
  "CANCELADA": { bg: "#FCEBEB", text: "#791F1F" },
  "NO SE PRESENTÓ": { bg: "#F1EFE8", text: "#5F5E5A" },
};
function StatusBadge({ status }) {
  const s = statusStyles[status] || { bg: "#F1EFE8", text: "#5F5E5A" };
  return (
    <span style={{ background: s.bg, color: s.text, padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

// ─── SIDEBAR ───────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Inicio", icon: LayoutGrid },
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "pacientes", label: "Pacientes", icon: PawPrint },
  { id: "clientes", label: "Clientes", icon: User },
  { id: "inventario", label: "Inventario", icon: Package },
  { id: "facturacion", label: "Facturación", icon: CreditCard },
  { id: "reportes", label: "Reportes", icon: BarChart3 },
  { id: "configuracion", label: "Configuración", icon: Settings },
];

function Sidebar({ active, setActive }) {
  const [branchOpen, setBranchOpen] = useState(false);
  return (
    <div style={{ width: 220, background: "var(--sidebar)", color: "#fff", display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-mid)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PawPrint size={18} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Clínica Veterinaria</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.2 }}>San José, CR</div>
          </div>
        </div>
        <button onClick={() => setBranchOpen(!branchOpen)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderRadius: 6, background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", fontSize: 12, cursor: "pointer" }}>
          <span>Sede Central</span>
          <ChevronDown size={14} />
        </button>
        {branchOpen && (
          <div style={{ marginTop: 4, background: "rgba(255,255,255,0.1)", borderRadius: 6, overflow: "hidden" }}>
            {["Sede Central", "Sede Escazú", "Sede Santa Ana"].map((b, i) => (
              <button key={b} onClick={() => setBranchOpen(false)}
                style={{ width: "100%", textAlign: "left", padding: "7px 12px", background: "none", border: "none", color: i === 0 ? "var(--primary-mid)" : "rgba(255,255,255,0.75)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                {i === 0 && "✓"} {b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
        {navItems.map(item => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => setActive(item.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", background: isActive ? "rgba(255,255,255,0.12)" : "none", border: "none", color: isActive ? "#fff" : "rgba(255,255,255,0.72)", fontSize: 13, cursor: "pointer", textAlign: "left", position: "relative", transition: "all 0.15s" }}>
              {isActive && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "var(--primary-mid)", borderRadius: "0 2px 2px 0" }} />}
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>MP</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Dra. María Pérez</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Administradora</div>
        </div>
        <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 4 }}><LogOut size={15} /></button>
      </div>
    </div>
  );
}

// ─── TOPBAR ────────────────────────────────────────────────
const pageTitles = { dashboard: "Inicio", agenda: "Agenda", pacientes: "Pacientes", clientes: "Clientes", inventario: "Inventario", facturacion: "Facturación", reportes: "Reportes", configuracion: "Configuración" };

function Topbar({ active, setActive }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifs = [
    { icon: "🔴", text: "Vacuna de Rex vence mañana", time: "hace 2h" },
    { icon: "🟡", text: "Rocky confirmó su cita", time: "hace 3h" },
    { icon: "🟡", text: "Stock de Frontline bajo mínimo", time: "hace 5h" },
  ];
  return (
    <div style={{ height: 52, background: "#fff", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
      <div style={{ fontSize: 15, fontWeight: 500 }}>{pageTitles[active]}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
          <input placeholder="Buscar..." style={{ height: 32, width: 200, paddingLeft: 30, paddingRight: 10, border: "1px solid var(--border)", borderRadius: 7, background: "var(--page-bg)", fontSize: 13, outline: "none" }} />
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotifOpen(!notifOpen)}
            style={{ position: "relative", width: 32, height: 32, borderRadius: 7, background: "none", border: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={16} color="var(--text-secondary)" />
            <span style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, background: "var(--red-text)", borderRadius: "50%", border: "1.5px solid #fff" }} />
          </button>
          {notifOpen && (
            <div style={{ position: "absolute", right: 0, top: 38, width: 280, background: "#fff", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100 }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", fontSize: 12, fontWeight: 600 }}>Notificaciones · 3 nuevas</div>
              {notifs.map((n, i) => (
                <div key={i} style={{ padding: "10px 14px", display: "flex", gap: 8, borderBottom: i < notifs.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <span>{n.icon}</span>
                  <div>
                    <div style={{ fontSize: 12 }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "8px 14px" }}>
                <button onClick={() => setNotifOpen(false)} style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer" }}>Ver todas →</button>
              </div>
            </div>
          )}
        </div>
        <button style={{ width: 32, height: 32, borderRadius: 7, background: "none", border: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HelpCircle size={16} color="var(--text-secondary)" />
        </button>
      </div>
    </div>
  );
}

// ─── CARD WRAPPER ──────────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background: "#fff", borderRadius: 10, border: "1px solid var(--border)", ...style }}>{children}</div>;
}
function Btn({ children, variant = "primary", style = {}, onClick }) {
  const base = { height: 34, padding: "0 14px", borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, border: "none", transition: "opacity 0.15s" };
  const variants = {
    primary: { background: "var(--primary)", color: "#fff" },
    outline: { background: "#fff", color: "var(--text-primary)", border: "1px solid var(--border)" },
    ghost: { background: "none", color: "var(--primary-mid)", border: "none" },
  };
  return <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick}>{children}</button>;
}

// ─── DASHBOARD ─────────────────────────────────────────────
const dashAppts = [
  { time: "08:00", pet: "Max", breed: "Golden Retriever", owner: "Carlos Mora", service: "Consulta general", status: "CONFIRMADA" },
  { time: "09:00", pet: "Luna", breed: "Gato Persa", owner: "Ana Quesada", service: "Vacunación", status: "CONFIRMADA" },
  { time: "09:30", pet: "Rocky", breed: "Bulldog Francés", owner: "Luis Jiménez", service: "Control post-cirugía", status: "PENDIENTE" },
  { time: "11:00", pet: null, breed: null, owner: null, service: "Disponible", status: "EMPTY" },
  { time: "15:30", pet: "Thor", breed: "Labrador", owner: "Marco Solano", service: "Baño y corte", status: "EN CONSULTA" },
  { time: "16:30", pet: "Mia", breed: "Chihuahua", owner: "Sofía Castro", service: "Desparasitación", status: "PENDIENTE" },
  { time: "17:00", pet: "Bella", breed: "Schnauzer", owner: "Patricia Rojas", service: "Consulta general", status: "CONFIRMADA" },
];
const dashAlerts = [
  { type: "red", text: "Vacuna de rabia vence mañana — Rex", owner: "Pedro Vargas" },
  { type: "red", text: "Vacuna polivalente vencida — Simba", owner: "Valentina Mora" },
  { type: "amber", text: "Desparasitación en 5 días — Luna", owner: "Ana Quesada" },
  { type: "amber", text: "Control post-op esta semana — Rocky", owner: "Luis Jiménez" },
];
const weekOccupancy = [
  { day: "Mar 24", count: 12, max: 15, pct: 80 },
  { day: "Mié 25", count: 9, max: 15, pct: 60 },
  { day: "Jue 26", count: 11, max: 15, pct: 73 },
  { day: "Vie 27", count: 6, max: 15, pct: 40 },
];

function Dashboard({ setActive }) {
  const stats = [
    { label: "Citas hoy", value: "12", sub: "↑ 3 más que ayer", color: "var(--primary-mid)" },
    { label: "Por confirmar", value: "4", sub: "Requieren atención", color: "var(--amber-border)", icon: <AlertTriangle size={15} color="var(--amber-border)" /> },
    { label: "Alertas vacunas", value: "7", sub: "Vencen en 30 días", color: "var(--red-text)", icon: <Syringe size={15} color="var(--red-text)" /> },
    { label: "Ingresos mes", value: "₡487k", sub: "↑ 12% vs anterior", color: "var(--primary-mid)" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {stats.map((s, i) => (
          <Card key={i} style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{s.label}</div>
              {s.icon}
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: i === 1 ? "var(--amber-text)" : i === 2 ? "var(--red-text)" : "var(--primary-mid)" }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 14 }}>
        {/* Agenda */}
        <Card style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>Agenda de hoy</span>
              <span style={{ background: "var(--primary-light)", color: "var(--primary-text)", borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>Sede Central</span>
            </div>
            <Btn onClick={() => setActive("agenda")}><Plus size={14} /> Nueva cita</Btn>
          </div>
          {dashAppts.map((apt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < dashAppts.length - 1 ? "1px solid var(--border)" : "none", position: "relative", background: apt.status === "EN CONSULTA" ? "var(--primary-light)" : "none", borderRadius: apt.status === "EN CONSULTA" ? 6 : 0, paddingLeft: apt.status === "EN CONSULTA" ? 10 : 0 }}>
              {apt.status === "EN CONSULTA" && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "var(--primary-mid)", borderRadius: 2 }} />}
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", width: 44, flexShrink: 0 }}>{apt.time}</span>
              {apt.status === "EMPTY" ? (
                <div style={{ flex: 1, border: "2px dashed var(--border)", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Slot disponible</span>
                  <button onClick={() => setActive("agenda")} style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer" }}>Agendar →</button>
                </div>
              ) : (
                <>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{apt.pet} — {apt.breed}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{apt.owner} · {apt.service}</div>
                  </div>
                  <StatusBadge status={apt.status} />
                  <button onClick={() => setActive("pacientes")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--text-tertiary)" }}><Eye size={15} /></button>
                </>
              )}
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
            <button onClick={() => setActive("agenda")} style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer" }}>Ver agenda completa →</button>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>12 citas en total</span>
          </div>
        </Card>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Alerts */}
          <Card style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Alertas activas</span>
              <span style={{ background: "var(--red-bg)", color: "var(--red-text)", borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>7</span>
            </div>
            {dashAlerts.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.type === "red" ? "var(--red-text)" : "var(--amber-border)", marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{a.owner}</div>
                </div>
                {a.type === "red" && <Btn variant="outline" style={{ height: 26, padding: "0 8px", fontSize: 11 }}>Contactar</Btn>}
              </div>
            ))}
            <button style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer", marginTop: 4 }}>Ver las 7 alertas →</button>
          </Card>

          {/* Occupancy */}
          <Card style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Ocupación esta semana</div>
            {weekOccupancy.map((d, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span>{d.day}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{d.count}/{d.max} ({d.pct}%)</span>
                </div>
                <div style={{ height: 6, background: "var(--gray-bg)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${d.pct}%`, height: "100%", background: "var(--primary-mid)", borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </Card>

          {/* Quick actions */}
          <Card style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Accesos rápidos</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Nueva cita", "Nuevo paciente", "Vacunas pendientes", "Reporte del día"].map((a, i) => (
                <button key={i} onClick={() => setActive(i < 1 ? "agenda" : i === 1 ? "pacientes" : i === 2 ? "reportes" : "reportes")}
                  style={{ height: 36, border: "1px solid var(--border)", borderRadius: 7, background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>{a}</button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── AGENDA ────────────────────────────────────────────────
const weekDays = [
  { day: "Lun 24", count: 5 }, { day: "Mar 25", count: 3 }, { day: "Mié 26", count: 4 },
  { day: "Jue 27", count: 2 }, { day: "Vie 28", count: 3 }, { day: "Sáb 29", count: 2 },
];
const timeSlots = Array.from({ length: 13 }, (_, i) => `${String(i + 7).padStart(2, "0")}:00`);
const agendaAppts = [
  { day: 0, time: "08:00", dur: 60, pet: "Max", service: "Consulta", vet: "MP", status: "CONFIRMADA", color: "#1D9E75" },
  { day: 0, time: "09:00", dur: 30, pet: "Luna", service: "Vacuna", vet: "MP", status: "CONFIRMADA", color: "#1D9E75" },
  { day: 0, time: "09:30", dur: 60, pet: "Rocky", service: "Control", vet: "MP", status: "PENDIENTE", color: "#EF9F27" },
  { day: 0, time: "15:30", dur: 90, pet: "Thor", service: "Baño", vet: "CV", status: "EN CONSULTA", color: "#378ADD" },
  { day: 0, time: "16:30", dur: 30, pet: "Mia", service: "Desparas", vet: "MP", status: "PENDIENTE", color: "#EF9F27" },
  { day: 1, time: "08:00", dur: 60, pet: "Rex", service: "Consulta", vet: "AM", status: "CONFIRMADA", color: "#EF9F27" },
  { day: 1, time: "10:00", dur: 30, pet: "Bella", service: "Vacuna", vet: "MP", status: "CONFIRMADA", color: "#1D9E75" },
  { day: 2, time: "09:00", dur: 60, pet: "Simba", service: "Control", vet: "CV", status: "PENDIENTE", color: "#378ADD" },
  { day: 3, time: "08:30", dur: 60, pet: "Max", service: "Seguimiento", vet: "MP", status: "CONFIRMADA", color: "#1D9E75" },
  { day: 4, time: "09:00", dur: 30, pet: "Coco", service: "Desparas", vet: "AM", status: "CONFIRMADA", color: "#EF9F27" },
];
const getPos = (time) => { const [h, m] = time.split(":").map(Number); return ((h - 7) * 60 + m) * 1.2; };
const getStatusBg = (s) => ({ "CONFIRMADA": "var(--primary-light)", "PENDIENTE": "var(--amber-bg)", "EN CONSULTA": "var(--blue-bg)" }[s] || "var(--gray-bg)");

function Agenda() {
  const [view, setView] = useState("week");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Controls */}
      <Card style={{ padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid var(--border)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={15} /></button>
            <span style={{ fontWeight: 500, fontSize: 14 }}>24 – 30 mar 2026</span>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid var(--border)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={15} /></button>
            <Btn variant="outline" style={{ height: 30 }}>Hoy</Btn>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", border: "1px solid var(--border)", borderRadius: 7, overflow: "hidden" }}>
              {["day", "week", "month"].map(v => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: "6px 12px", fontSize: 12, fontWeight: 500, background: view === v ? "var(--primary)" : "#fff", color: view === v ? "#fff" : "var(--text-primary)", border: "none", cursor: "pointer" }}>
                  {v === "day" ? "Día" : v === "week" ? "Semana" : "Mes"}
                </button>
              ))}
            </div>
            <select style={{ height: 32, padding: "0 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, background: "#fff" }}>
              <option>Todos los veterinarios</option>
              <option>Dra. María Pérez</option>
              <option>Dr. Carlos Vega</option>
            </select>
            <Btn><Plus size={14} /> Nueva cita</Btn>
          </div>
        </div>
      </Card>

      {/* Grid */}
      <Card style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 860 }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "52px repeat(6,1fr)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ padding: 10 }} />
              {weekDays.map((d, i) => (
                <div key={i} style={{ padding: "10px 8px", textAlign: "center", background: i === 0 ? "var(--primary-light)" : "none" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{d.day}</div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{d.count} citas</div>
                </div>
              ))}
            </div>

            {/* Body */}
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "52px repeat(6,1fr)", height: `${13 * 72}px` }}>
              {/* Time labels */}
              <div>
                {timeSlots.map((t, i) => (
                  <div key={i} style={{ height: 72, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingRight: 6, paddingTop: 4 }}>
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((_, di) => (
                <div key={di} style={{ position: "relative", background: di === 0 ? "rgba(225,245,238,0.3)" : "none" }}>
                  {timeSlots.map((_, ti) => (
                    <div key={ti} style={{ height: 72, borderBottom: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }} />
                  ))}
                  {agendaAppts.filter(a => a.day === di).map((apt, ai) => {
                    const top = getPos(apt.time);
                    const height = Math.max(apt.dur * 1.2, 28);
                    return (
                      <div key={ai} style={{ position: "absolute", left: 3, right: 3, top, height, background: getStatusBg(apt.status), borderLeft: `3px solid ${apt.color}`, borderRadius: 6, padding: "4px 6px", cursor: "pointer", overflow: "hidden" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{apt.pet}</div>
                        <div style={{ fontSize: 10, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{apt.service}</div>
                        <div style={{ fontSize: 10, background: "rgba(255,255,255,0.6)", borderRadius: 3, display: "inline-block", padding: "0 3px", marginTop: 2 }}>{apt.vet}</div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Current time line */}
              <div style={{ position: "absolute", left: 52, right: 0, height: 2, background: "var(--primary-mid)", top: getPos("15:30"), pointerEvents: "none", zIndex: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary-mid)", position: "absolute", left: -4, top: -3 }} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── PACIENTES ─────────────────────────────────────────────
const patientsData = [
  { id: 1, name: "Max", emoji: "🐕", breed: "Golden Retriever", owner: "Carlos Mora", vet: "Dra. Pérez", lastVisit: "24/03/2026", alert: null },
  { id: 2, name: "Luna", emoji: "🐱", breed: "Gato Persa", owner: "Ana Quesada", vet: "Dra. Pérez", lastVisit: "18/03/2026", alert: { text: "Vacuna 5 días", type: "amber" } },
  { id: 3, name: "Rocky", emoji: "🐕", breed: "Bulldog Francés", owner: "Luis Jiménez", vet: "Dra. Pérez", lastVisit: "15/03/2026", alert: null },
  { id: 4, name: "Thor", emoji: "🐕", breed: "Labrador", owner: "Marco Solano", vet: "Dr. Vega", lastVisit: "24/03/2026", alert: { text: "Desparas. vencida", type: "amber" } },
  { id: 5, name: "Mia", emoji: "🐕", breed: "Chihuahua", owner: "Sofía Castro", vet: "Dra. Pérez", lastVisit: "10/03/2026", alert: null },
  { id: 6, name: "Simba", emoji: "🐱", breed: "Gato Doméstico", owner: "Valentina Mora", vet: "Dr. Vega", lastVisit: "05/03/2026", alert: { text: "Vacuna vencida", type: "red" } },
  { id: 7, name: "Bella", emoji: "🐕", breed: "Schnauzer", owner: "Patricia Rojas", vet: "Dra. Pérez", lastVisit: "01/03/2026", alert: null },
  { id: 8, name: "Rex", emoji: "🐕", breed: "Pastor Alemán", owner: "Pedro Vargas", vet: "Dr. Mora", lastVisit: "28/02/2026", alert: { text: "Rabia 2 días", type: "red" } },
];

function Pacientes({ setActive, setDetailPet }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Pacientes</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>247 registrados</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
            <input placeholder="Nombre, microchip, raza, dueño..." style={{ height: 34, width: 280, paddingLeft: 30, paddingRight: 10, border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, outline: "none" }} />
          </div>
          <Btn><Plus size={14} /> Nuevo paciente</Btn>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[["Todos", 247], ["Perros", 168], ["Gatos", 61], ["Otros", 18]].map(([label, count], i) => (
            <button key={i} style={{ height: 32, padding: "0 12px", borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer", background: i === 0 ? "var(--primary)" : "#fff", color: i === 0 ? "#fff" : "var(--text-primary)", border: `1px solid ${i === 0 ? "var(--primary)" : "var(--border)"}` }}>
              {label} {count}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select style={{ height: 32, padding: "0 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, background: "#fff" }}>
            <option>Última visita</option><option>Nombre A-Z</option>
          </select>
          <label style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
            <input type="checkbox" /> Solo con alertas
          </label>
        </div>
      </div>

      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--page-bg)" }}>
              {["Paciente", "Raza", "Dueño", "Vet. Tratante", "Última visita", "Alertas", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patientsData.map((p, i) => (
              <tr key={i} style={{ borderBottom: i < patientsData.length - 1 ? "1px solid var(--border)" : "none" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{p.emoji}</div>
                    <span style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{p.breed}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{p.owner}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{p.vet}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{p.lastVisit}</td>
                <td style={{ padding: "12px 16px" }}>
                  {p.alert ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: p.alert.type === "red" ? "var(--red-text)" : "var(--amber-text)" }}>
                      <AlertTriangle size={13} />{p.alert.text}
                    </span>
                  ) : <span style={{ color: "var(--text-tertiary)", fontSize: 12 }}>—</span>}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <Btn variant="outline" style={{ height: 28, fontSize: 11 }} onClick={() => { setDetailPet(p); setActive("fichadetalle"); }}>
                    <Eye size={13} /> Ver
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Mostrando 1–8 de 247 · Sede Central</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["←", "1", "2", "3", "...", "31", "→"].map((p, i) => (
              <button key={i} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${p === "1" ? "var(--primary)" : "var(--border)"}`, background: p === "1" ? "var(--primary)" : "#fff", color: p === "1" ? "#fff" : "var(--text-primary)", fontSize: 12, cursor: "pointer" }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── FICHA PACIENTE (V2 layout) ────────────────────────────
const weightData = [
  { date: "Ene 2025", weight: 26.2 },
  { date: "Jun 2025", weight: 27.8 },
  { date: "Mar 2026", weight: 28.5 },
];
const historyEntries = [
  { date: "20/03/2026", type: "Consulta general", vet: "Dra. María Pérez", branch: "Sede Central",
    details: { Motivo: "Revisión anual de rutina", Signos: "Paciente alerta, hidratado", Diagnóstico: "Estado general bueno. Leve sarro.", Tratamiento: "Limpieza dental programada", Medicamentos: "Ninguno" } },
  { date: "15/01/2026", type: "Vacunación", vet: "Dra. María Pérez", branch: "Sede Central",
    details: { Vacuna: "Nobivac DHPPi", Lote: "A2024-089", "Próxima dosis": "15/01/2027", Estado: "Al día" } },
  { date: "05/09/2025", type: "Cirugía menor", vet: "Dr. Carlos Vega", branch: "Sede Central",
    details: { Diagnóstico: "Quiste sebáceo benigno zona dorsal", Tratamiento: "Extracción quirúrgica exitosa", Medicamentos: "Amoxicilina 500mg · 1c/12h · 7 días" } },
];
const vaccinations = [
  { name: "Rabia", date: "10/03/2025", product: "Rabisin", lote: "B45", vet: "Dra. Pérez", nextDose: "10/03/2026", status: "VENCIDA" },
  { name: "Polivalente", date: "15/01/2026", product: "Nobivac", lote: "A089", vet: "Dra. Pérez", nextDose: "15/01/2027", status: "AL DÍA" },
  { name: "Bordetella", date: "20/06/2025", product: "Bronchi", lote: "C12", vet: "Dra. Pérez", nextDose: "20/06/2026", status: "87 DÍAS" },
];

function FichaPaciente({ pet, onBack }) {
  const [tab, setTab] = useState("historial");
  const p = pet || { name: "Max", emoji: "🐕", breed: "Golden Retriever", owner: "Carlos Mora" };
  const tabs = ["historial", "vacunas", "desparasitación", "peso", "archivos", "notas"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 7, border: "1px solid var(--border)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Pacientes / {p.name}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn><Calendar size={14} /> Nueva cita para {p.name}</Btn>
          <Btn variant="outline"><Edit size={14} /> Editar</Btn>
          <Btn variant="outline" style={{ width: 34, padding: 0, justifyContent: "center" }}><MoreVertical size={14} /></Btn>
        </div>
      </div>

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, alignItems: "start" }}>

        {/* LEFT PANEL */}
        <Card style={{ padding: 18 }}>
          {/* Avatar + name */}
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 10px" }}>{p.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 3 }}>{p.breed} · Macho</div>
            <span style={{ display: "inline-block", marginTop: 8, background: "#dcfce7", color: "#166534", borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 500 }}>Activo</span>
          </div>

          {/* Microchip */}
          <div style={{ background: "var(--page-bg)", borderRadius: 7, padding: "10px 12px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 3 }}>Microchip</div>
            <div style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--mono)" }}>#985112004567890</div>
          </div>

          {/* Data */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {[["Nacimiento", "15/06/2020"], ["Edad", "5 años 9 meses"], ["Peso actual", "28.5 kg"], ["Color", "Dorado"], ["Esterilizado", "No"]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{k}</div>
                <div style={{ fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Owner */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Dueño</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>CM</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.owner}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>8845-2211</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>carlos.mora@gmail.com</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[[MessageCircle, "WhatsApp"], [Phone, "Llamar"], [Mail, "Email"]].map(([Icon, label], i) => (
                <button key={i} style={{ flex: 1, height: 34, border: "1px solid var(--border)", borderRadius: 7, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} color="var(--primary-mid)" />
                </button>
              ))}
            </div>
            <button style={{ marginTop: 10, background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer", width: "100%", textAlign: "left" }}>Ver perfil completo →</button>
          </div>

          {/* Next appointment */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Próxima cita</div>
            <div style={{ background: "var(--primary-light)", borderRadius: 7, padding: "10px 12px" }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Consulta general</div>
              <div style={{ fontSize: 12, color: "var(--primary-text)", marginTop: 3 }}>Mié 26 mar · 09:00 AM</div>
              <div style={{ fontSize: 12, color: "var(--primary-text)" }}>Dra. María Pérez</div>
            </div>
          </div>
        </Card>

        {/* RIGHT PANEL — tabs */}
        <Card style={{ padding: 18 }}>
          {/* Tabs */}
          <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 18, display: "flex", gap: 18 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: "0 0 12px", fontSize: 13, background: "none", border: "none", cursor: "pointer", color: tab === t ? "var(--primary-mid)" : "var(--text-secondary)", fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? "2px solid var(--primary-mid)" : "2px solid transparent", textTransform: "capitalize", transition: "all 0.15s" }}>
                {t}
              </button>
            ))}
          </div>

          {/* HISTORIAL */}
          {tab === "historial" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {historyEntries.map((e, i) => (
                <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 9, padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{e.date} · {e.type}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{e.vet} · {e.branch}</div>
                    </div>
                    <button style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer" }}>expandir</button>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                    {Object.entries(e.details).map(([k, v]) => (
                      <div key={k} style={{ fontSize: 13 }}>
                        <span style={{ color: "var(--text-secondary)" }}>{k}: </span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", gap: 12 }}>
                    <button style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <FileText size={13} /> Ver receta PDF
                    </button>
                    {e.type === "Cirugía menor" && <button style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer" }}>2 adjuntos</button>}
                  </div>
                </div>
              ))}
              <button style={{ width: "100%", padding: "11px 0", border: "1px solid var(--border)", borderRadius: 8, background: "#fff", fontSize: 12, color: "var(--text-secondary)", cursor: "pointer" }}>
                Cargar más consultas
              </button>
            </div>
          )}

          {/* VACUNAS */}
          {tab === "vacunas" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "var(--red-bg)", border: "1px solid #f5c0c0", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <AlertTriangle size={17} color="var(--red-text)" style={{ marginTop: 1 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "var(--red-text)" }}>La vacuna antirrábica de {p.name} venció el 10/03/2026. Contactar al dueño.</div>
                  <button style={{ marginTop: 8, padding: "5px 12px", background: "#fff", border: "1px solid var(--red-text)", color: "var(--red-text)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Contactar por WhatsApp</button>
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Vacuna", "Fecha aplic.", "Producto · Lote", "Vet.", "Próxima dosis", "Estado"].map((h, i) => (
                      <th key={i} style={{ padding: "8px 0", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vaccinations.map((v, i) => (
                    <tr key={i} style={{ borderBottom: i < vaccinations.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "10px 0", fontSize: 13, fontWeight: 500 }}>{v.name}</td>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "var(--text-secondary)" }}>{v.date}</td>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "var(--text-secondary)" }}>{v.product} · {v.lote}</td>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "var(--text-secondary)" }}>{v.vet}</td>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "var(--text-secondary)" }}>{v.nextDose}</td>
                      <td style={{ padding: "10px 0" }}>
                        <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4, color: v.status === "VENCIDA" ? "var(--red-text)" : v.status === "AL DÍA" ? "#16a34a" : "var(--amber-text)" }}>
                          {v.status === "VENCIDA" ? "🔴" : v.status === "AL DÍA" ? "✓" : "⚠"} {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Btn style={{ width: "100%", justifyContent: "center" }}><Plus size={14} /> Registrar vacuna</Btn>
            </div>
          )}

          {/* PESO */}
          {tab === "peso" && (
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Evolución del peso</div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis domain={[24, 32]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="var(--primary-mid)" strokeWidth={2} dot={{ fill: "var(--primary-mid)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-secondary)", margin: "8px 0 14px" }}>
                Rango saludable para Golden Retriever: 25–34 kg
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 14px" }}>
                <span style={{ fontSize: 13, color: "#166534" }}><strong>BCS: 5/9</strong> — Peso ideal (Body Condition Score)</span>
              </div>
            </div>
          )}

          {/* OTHER TABS */}
          {(tab === "desparasitación" || tab === "archivos" || tab === "notas") && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <FileText size={36} color="var(--text-tertiary)" style={{ margin: "0 auto 10px" }} />
              <div style={{ fontWeight: 600, marginBottom: 4, textTransform: "capitalize" }}>{tab}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Sección disponible próximamente</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── CLIENTES ──────────────────────────────────────────────
const clientsData = [
  { id: 1, name: "Carlos Mora", phone: "+506 8888-9999", email: "cmora@email.com", address: "San José, Escazú", pets: 1, lastVisit: "24/03/2026" },
  { id: 2, name: "Ana Quesada", phone: "+506 7777-8888", email: "aquesada@email.com", address: "San José, Curridabat", pets: 1, lastVisit: "24/03/2026" },
  { id: 3, name: "Luis Jiménez", phone: "+506 6666-7777", email: "ljimenez@email.com", address: "Heredia, Centro", pets: 2, lastVisit: "24/03/2026" },
  { id: 4, name: "Sofía Castro", phone: "+506 5555-6666", email: "scastro@email.com", address: "Cartago, Centro", pets: 1, lastVisit: "24/03/2026" },
  { id: 5, name: "Marco Solano", phone: "+506 4444-5555", email: "msolano@email.com", address: "Alajuela, Centro", pets: 1, lastVisit: "24/03/2026" },
  { id: 6, name: "Carmen Rodríguez", phone: "+506 3333-4444", email: "crodriguez@email.com", address: "San José, Desamparados", pets: 2, lastVisit: "20/03/2026" },
  { id: 7, name: "Pedro Vargas", phone: "+506 2222-3333", email: "pvargas@email.com", address: "San José, Tibás", pets: 1, lastVisit: "18/03/2026" },
];
function Clientes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={{ fontSize: 18, fontWeight: 600 }}>Clientes</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Gestiona la información de los dueños</div></div>
        <Btn><Plus size={14} /> Nuevo cliente</Btn>
      </div>
      <Card>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
            <input placeholder="Buscar por nombre, teléfono o correo..." style={{ width: "100%", height: 34, paddingLeft: 30, paddingRight: 10, border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, outline: "none" }} />
          </div>
          <Btn variant="outline"><Filter size={14} /> Filtros</Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--page-bg)", borderBottom: "1px solid var(--border)" }}>
              {["Cliente", "Contacto", "Dirección", "Mascotas", "Última visita", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientsData.map((c, i) => (
              <tr key={i} style={{ borderBottom: i < clientsData.length - 1 ? "1px solid var(--border)" : "none" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--page-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}><Phone size={11} />{c.phone}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5 }}><Mail size={11} />{c.email}</div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{c.address}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: "var(--primary-light)", color: "var(--primary-text)", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500 }}>{c.pets} {c.pets === 1 ? "mascota" : "mascotas"}</span>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{c.lastVisit}</td>
                <td style={{ padding: "12px 16px" }}><button style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>Ver detalles</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Mostrando 1–7 de 89 clientes</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["Anterior", "1", "2", "Siguiente"].map((p, i) => (
              <button key={i} style={{ height: 30, padding: "0 10px", borderRadius: 6, border: `1px solid ${p === "1" ? "var(--primary)" : "var(--border)"}`, background: p === "1" ? "var(--primary)" : "#fff", color: p === "1" ? "#fff" : "var(--text-primary)", fontSize: 12, cursor: "pointer" }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── INVENTARIO ────────────────────────────────────────────
const invData = [
  { name: "Vacuna Rabia", cat: "Medicamentos", stock: 45, min: 20, unit: "dosis", price: "₡12,500", status: "ok" },
  { name: "Vacuna Parvovirus", cat: "Medicamentos", stock: 38, min: 20, unit: "dosis", price: "₡15,000", status: "ok" },
  { name: "Antibiótico Amoxicilina", cat: "Medicamentos", stock: 12, min: 15, unit: "cajas", price: "₡8,500", status: "bajo" },
  { name: "Desparasitante interno", cat: "Medicamentos", stock: 67, min: 30, unit: "tabletas", price: "₡3,200", status: "ok" },
  { name: "Alimento Premium Perro", cat: "Alimentos", stock: 8, min: 10, unit: "sacos", price: "₡28,000", status: "bajo" },
  { name: "Jeringas 5ml", cat: "Material médico", stock: 150, min: 100, unit: "unidades", price: "₡450", status: "ok" },
  { name: "Guantes latex M", cat: "Material médico", stock: 5, min: 20, unit: "cajas", price: "₡6,200", status: "critico" },
  { name: "Collar antipulgas", cat: "Accesorios", stock: 23, min: 15, unit: "unidades", price: "₡7,800", status: "ok" },
];
function Inventario() {
  const crit = invData.filter(i => i.status === "critico").length;
  const bajo = invData.filter(i => i.status === "bajo").length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={{ fontSize: 18, fontWeight: 600 }}>Inventario</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Productos y medicamentos</div></div>
        <Btn><Plus size={14} /> Agregar producto</Btn>
      </div>
      {(crit > 0 || bajo > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: crit > 0 && bajo > 0 ? "1fr 1fr" : "1fr", gap: 10 }}>
          {crit > 0 && <div style={{ background: "var(--red-bg)", border: "1px solid #f5c0c0", borderRadius: 9, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <AlertTriangle size={18} color="var(--red-text)" />
            <div><div style={{ fontWeight: 600, fontSize: 13, color: "var(--red-text)" }}>Stock crítico</div><div style={{ fontSize: 12, color: "var(--red-text)" }}>{crit} producto(s) necesita(n) reposición urgente</div></div>
          </div>}
          {bajo > 0 && <div style={{ background: "var(--amber-bg)", border: "1px solid #f0d090", borderRadius: 9, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <Package size={18} color="var(--amber-border)" />
            <div><div style={{ fontWeight: 600, fontSize: 13, color: "var(--amber-text)" }}>Stock bajo</div><div style={{ fontSize: 12, color: "var(--amber-text)" }}>{bajo} producto(s) por debajo del mínimo</div></div>
          </div>}
        </div>
      )}
      <Card>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
            <input placeholder="Buscar productos..." style={{ width: "100%", height: 34, paddingLeft: 30, paddingRight: 10, border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, outline: "none" }} />
          </div>
          {["Todas las categorías", "Todos los estados"].map((p, i) => (
            <select key={i} style={{ height: 34, padding: "0 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, background: "#fff" }}><option>{p}</option></select>
          ))}
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--page-bg)", borderBottom: "1px solid var(--border)" }}>
              {["Producto", "Categoría", "Stock actual", "Stock mínimo", "Precio", "Estado", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invData.map((item, i) => (
              <tr key={i} style={{ borderBottom: i < invData.length - 1 ? "1px solid var(--border)" : "none" }}>
                <td style={{ padding: "11px 16px", fontWeight: 500, fontSize: 13 }}>{item.name}</td>
                <td style={{ padding: "11px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{item.cat}</td>
                <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 500 }}>{item.stock} {item.unit}</td>
                <td style={{ padding: "11px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{item.min} {item.unit}</td>
                <td style={{ padding: "11px 16px", fontSize: 13 }}>{item.price}</td>
                <td style={{ padding: "11px 16px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500, background: item.status === "ok" ? "#dcfce7" : item.status === "bajo" ? "var(--amber-bg)" : "var(--red-bg)", color: item.status === "ok" ? "#166534" : item.status === "bajo" ? "var(--amber-text)" : "var(--red-text)" }}>
                    {item.status === "ok" ? "Normal" : item.status === "bajo" ? "Bajo" : "Crítico"}
                  </span>
                </td>
                <td style={{ padding: "11px 16px" }}><button style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── FACTURACIÓN ───────────────────────────────────────────
const factsData = [
  { id: "FAC-2026-001", client: "Carlos Mora", patient: "Max", date: "24/03/2026", amount: "₡18,500", status: "Pagada", method: "Tarjeta" },
  { id: "FAC-2026-002", client: "Ana Quesada", patient: "Luna", date: "24/03/2026", amount: "₡15,000", status: "Pagada", method: "Efectivo" },
  { id: "FAC-2026-003", client: "Luis Jiménez", patient: "Rocky", date: "24/03/2026", amount: "₡45,000", status: "Pendiente", method: "Transferencia" },
  { id: "FAC-2026-004", client: "Sofía Castro", patient: "Mia", date: "24/03/2026", amount: "₡12,000", status: "Pagada", method: "SINPE Móvil" },
  { id: "FAC-2026-005", client: "Marco Solano", patient: "Thor", date: "24/03/2026", amount: "₡22,500", status: "Pagada", method: "Tarjeta" },
  { id: "FAC-2026-006", client: "Carmen Rodríguez", patient: "Bella", date: "20/03/2026", amount: "₡35,000", status: "Vencida", method: "Transferencia" },
  { id: "FAC-2025-087", client: "Pedro Vargas", patient: "Rex", date: "18/03/2026", amount: "₡15,000", status: "Pagada", method: "Efectivo" },
];
function Facturacion() {
  const statusColor = (s) => s === "Pagada" ? { bg: "#dcfce7", text: "#166534" } : s === "Pendiente" ? { bg: "var(--amber-bg)", text: "var(--amber-text)" } : { bg: "var(--red-bg)", text: "var(--red-text)" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={{ fontSize: 18, fontWeight: 600 }}>Facturación</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Gestiona facturas y pagos</div></div>
        <Btn><Plus size={14} /> Nueva factura</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[["Total mes", "₡163,000", CreditCard, "var(--primary-mid)"], ["Pagadas", "5", FileText, "#16a34a"], ["Pendientes", "1", Clock, "var(--amber-border)"], ["Vencidas", "1", AlertTriangle, "var(--red-text)"]].map(([label, val, Icon, color], i) => (
          <Card key={i} style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Icon size={16} color={color} /><span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{val}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
            <input placeholder="Buscar por número, cliente o paciente..." style={{ width: "100%", height: 34, paddingLeft: 30, paddingRight: 10, border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, outline: "none" }} />
          </div>
          {["Todos los estados", "Este mes"].map((p, i) => (
            <select key={i} style={{ height: 34, padding: "0 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, background: "#fff" }}><option>{p}</option></select>
          ))}
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--page-bg)", borderBottom: "1px solid var(--border)" }}>
              {["Nº Factura", "Cliente", "Paciente", "Fecha", "Monto", "Método", "Estado", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {factsData.map((f, i) => {
              const sc = statusColor(f.status);
              return (
                <tr key={i} style={{ borderBottom: i < factsData.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "11px 16px", fontFamily: "var(--mono)", fontSize: 12 }}>{f.id}</td>
                  <td style={{ padding: "11px 16px", fontSize: 13 }}>{f.client}</td>
                  <td style={{ padding: "11px 16px", fontSize: 13 }}>{f.patient}</td>
                  <td style={{ padding: "11px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{f.date}</td>
                  <td style={{ padding: "11px 16px", fontWeight: 600, fontSize: 13 }}>{f.amount}</td>
                  <td style={{ padding: "11px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{f.method}</td>
                  <td style={{ padding: "11px 16px" }}><span style={{ background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500 }}>{f.status}</span></td>
                  <td style={{ padding: "11px 16px" }}><button style={{ background: "none", border: "none", color: "var(--primary-mid)", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>Ver PDF</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── REPORTES ──────────────────────────────────────────────
const revData = [
  { month: "Ene", central: 312000, escazu: 85000, santaAna: 55000 },
  { month: "Feb", central: 398000, escazu: 92000, santaAna: 62000 },
  { month: "Mar", central: 487000, escazu: 98000, santaAna: 69000 },
];
const piePay = [
  { name: "SINPE Móvil", value: 65, color: "#1D9E75" },
  { name: "Efectivo", value: 22, color: "#888780" },
  { name: "Tarjeta", value: 13, color: "#378ADD" },
];
const topSvcs = [
  { service: "Cirugías", amount: 340000 }, { service: "Consulta general", amount: 268000 },
  { service: "Vacunación", amount: 189000 }, { service: "Hospitalización", amount: 145000 },
  { service: "Baño y corte", amount: 98000 },
];
const vaccAlerts = [
  { pet: "Rex", species: "Perro", owner: "Pedro Vargas", phone: "8840-1122", vaccine: "Rabia", expiry: "10/03/2026", days: "VENCIDA", type: "red" },
  { pet: "Simba", species: "Gato", owner: "Valentina Mora", phone: "7788-3344", vaccine: "Polivalente", expiry: "08/03/2026", days: "VENCIDA", type: "red" },
  { pet: "Kira", species: "Perro", owner: "Patricia Rojas", phone: "6677-8899", vaccine: "Rabia", expiry: "05/04/2026", days: "12 días", type: "amber" },
  { pet: "Coco", species: "Gato", owner: "Ana Quesada", phone: "7012-3344", vaccine: "Bordetella", expiry: "11/04/2026", days: "18 días", type: "amber" },
];
function Reportes() {
  const [tab, setTab] = useState("ingresos");
  const tabs = ["ingresos", "citas", "pacientes", "vacunas", "rendimiento"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={{ fontSize: 18, fontWeight: 600 }}>Reportes avanzados</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Análisis y métricas</div></div>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ height: 34, padding: "0 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, background: "#fff" }}><option>Ene – Mar 2026</option></select>
          <select style={{ height: 34, padding: "0 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 12, background: "#fff" }}><option>Todas las sedes</option></select>
          <Btn variant="outline"><Download size={14} /> PDF</Btn>
          <Btn variant="outline"><Download size={14} /> Excel</Btn>
        </div>
      </div>
      <Card>
        <div style={{ borderBottom: "1px solid var(--border)", padding: "0 16px", display: "flex", gap: 20 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "12px 0", fontSize: 13, background: "none", border: "none", cursor: "pointer", color: tab === t ? "var(--primary-mid)" : "var(--text-secondary)", fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? "2px solid var(--primary-mid)" : "2px solid transparent", textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ padding: 20 }}>
          {tab === "ingresos" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[["Ingresos totales", "₡1,197,000", "↑ 18% vs Q1 2025"], ["Ticket promedio", "₡13,450", "por cita"], ["Mejor mes", "Marzo", "₡487,000"]].map(([l, v, s], i) => (
                  <div key={i} style={{ background: "var(--page-bg)", borderRadius: 9, padding: 16 }}>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>{l}</div>
                    <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{v}</div>
                    <div style={{ fontSize: 12, color: i === 0 ? "#16a34a" : "var(--text-secondary)" }}>{s}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Ingresos por mes y sede</div>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={revData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="central" stroke="#1D9E75" strokeWidth={2} name="Sede Central" />
                    <Line type="monotone" dataKey="escazu" stroke="#378ADD" strokeWidth={2} name="Sede Escazú" />
                    <Line type="monotone" dataKey="santaAna" stroke="#EF9F27" strokeWidth={2} name="Sede Santa Ana" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Por método de pago</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart><Pie data={piePay} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" label={e => `${e.name} ${e.value}%`}>
                      {piePay.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie><Tooltip /></PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Top servicios</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={topSvcs} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                      <XAxis type="number" tick={{ fontSize: 10 }} />
                      <YAxis dataKey="service" type="category" tick={{ fontSize: 10 }} width={100} />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#1D9E75" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {tab === "vacunas" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "var(--red-bg)", border: "1px solid #f5c0c0", borderRadius: 9, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <AlertTriangle size={22} color="var(--red-text)" />
                  <div><div style={{ fontSize: 22, fontWeight: 600, color: "var(--red-text)" }}>12 vacunas vencidas</div><div style={{ fontSize: 12, color: "var(--red-text)" }}>Acción requerida</div></div>
                </div>
                <div style={{ background: "var(--amber-bg)", border: "1px solid #f0d090", borderRadius: 9, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <AlertTriangle size={22} color="var(--amber-border)" />
                  <div><div style={{ fontSize: 22, fontWeight: 600, color: "var(--amber-text)" }}>35 vacunas</div><div style={{ fontSize: 12, color: "var(--amber-text)" }}>Vencen en próximos 30 días</div></div>
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Mascota", "Especie", "Dueño", "Teléfono", "Vacuna", "Vencimiento", "Días", ""].map((h, i) => (
                      <th key={i} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vaccAlerts.map((a, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 500, fontSize: 13 }}>{a.pet}</td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "var(--text-secondary)" }}>{a.species}</td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "var(--text-secondary)" }}>{a.owner}</td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "var(--text-secondary)" }}>{a.phone}</td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "var(--text-secondary)" }}>{a.vaccine}</td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "var(--text-secondary)" }}>{a.expiry}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ background: a.type === "red" ? "var(--red-bg)" : "var(--amber-bg)", color: a.type === "red" ? "var(--red-text)" : "var(--amber-text)", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500 }}>{a.days}</span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <Btn variant="outline" style={{ height: 28, fontSize: 11 }}><MessageCircle size={12} color="var(--primary-mid)" /> WhatsApp</Btn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {(tab === "citas" || tab === "pacientes" || tab === "rendimiento") && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <FileText size={40} color="var(--text-tertiary)" style={{ margin: "0 auto 12px" }} />
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Reporte en desarrollo</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Disponible próximamente</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// ─── CONFIGURACIÓN ─────────────────────────────────────────
function Configuracion() {
  const [section, setSection] = useState("general");
  const secs = [
    { id: "general", label: "Información general", icon: Building2 },
    { id: "usuarios", label: "Usuarios y permisos", icon: Users },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
    { id: "seguridad", label: "Seguridad", icon: Lock },
    { id: "facturacion", label: "Facturación", icon: CreditCard },
  ];
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
      <Card style={{ padding: 8 }}>
        {secs.map(s => {
          const Icon = s.icon;
          return (
            <button key={s.id} onClick={() => setSection(s.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 7, background: section === s.id ? "var(--primary-light)" : "none", border: "none", color: section === s.id ? "var(--primary-text)" : "var(--text-primary)", fontSize: 13, cursor: "pointer", fontWeight: section === s.id ? 500 : 400, marginBottom: 2 }}>
              <Icon size={16} />{s.label}
            </button>
          );
        })}
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {section === "general" && (
          <>
            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Información general de la clínica</div>
              {[["Nombre de la clínica", "text", "Clínica Veterinaria San José"], ["Teléfono principal", "tel", "+506 2222-3333"], ["Correo electrónico", "email", "info@clinicavetsj.com"], ["Cédula jurídica", "text", "3-101-123456"]].map(([label, type, val], i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{label}</label>
                  <input type={type} defaultValue={val} style={{ width: "100%", height: 36, padding: "0 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 13, outline: "none" }} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Dirección</label>
                <textarea rows={3} defaultValue={"San José, Costa Rica\nAvenida Central, Calle 10\n100 metros norte de la plaza"} style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--border)", borderRadius: 7, fontSize: 13, outline: "none", resize: "vertical" }} />
              </div>
            </Card>
            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Horario de atención</div>
              {days.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ width: 80, fontSize: 13, fontWeight: 500 }}>{d}</span>
                  {i < 5 ? (<><input type="time" defaultValue="08:00" style={{ padding: "5px 8px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} /><span style={{ color: "var(--text-tertiary)", fontSize: 12 }}>a</span><input type="time" defaultValue="18:00" style={{ padding: "5px 8px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} /></>)
                    : i === 5 ? (<><input type="time" defaultValue="09:00" style={{ padding: "5px 8px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} /><span style={{ color: "var(--text-tertiary)", fontSize: 12 }}>a</span><input type="time" defaultValue="13:00" style={{ padding: "5px 8px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} /></>)
                    : <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Cerrado</span>}
                </div>
              ))}
            </Card>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Btn><Save size={14} /> Guardar cambios</Btn>
            </div>
          </>
        )}
        {section !== "general" && (
          <Card style={{ padding: 40, textAlign: "center" }}>
            <Settings size={40} color="var(--text-tertiary)" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{secs.find(s => s.id === section)?.label}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Sección disponible próximamente</div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── APP ROOT ──────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [detailPet, setDetailPet] = useState(null);

  const renderPage = () => {
    if (active === "fichadetalle") return <FichaPaciente pet={detailPet} onBack={() => setActive("pacientes")} />;
    switch (active) {
      case "dashboard": return <Dashboard setActive={setActive} />;
      case "agenda": return <Agenda />;
      case "pacientes": return <Pacientes setActive={setActive} setDetailPet={setDetailPet} />;
      case "clientes": return <Clientes />;
      case "inventario": return <Inventario />;
      case "facturacion": return <Facturacion />;
      case "reportes": return <Reportes />;
      case "configuracion": return <Configuracion />;
      default: return <Dashboard setActive={setActive} />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar active={active === "fichadetalle" ? "pacientes" : active} setActive={setActive} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Topbar active={active === "fichadetalle" ? "pacientes" : active} setActive={setActive} />
          <main style={{ flex: 1, overflowY: "auto", padding: 20, background: "var(--page-bg)" }}>
            {renderPage()}
          </main>
        </div>
      </div>
    </>
  );
}