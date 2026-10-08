const C = CONFIG;
const D = {
  nome: C.nome, nomeCurto: C.nomeCurto, bairro: C.bairro, cidade: C.cidade,
  enderecoLinha: `${C.endereco} — ${C.bairro}`,
  cidadeUf: `${C.cidade} — ${C.uf}`,
  local: `${C.bairro} — ${C.cidade}/${C.uf}`,
  enderecoCompleto: `${C.endereco} — ${C.bairro}, ${C.cidade}/${C.uf}`,
  ano: new Date().getFullYear(),
  msgSaber: `Olá! Vi o site do ${C.nome} e gostaria de saber mais sobre a aula experimental.`
};
const MSG = {
  agendar: `Olá! Vi o site do ${C.nome} e gostaria de agendar uma aula experimental.`,
  saber: D.msgSaber
};
document.documentElement.classList.add("js");
document.querySelectorAll("[data-cfg]").forEach(el => { el.textContent = D[el.dataset.cfg]; });

// Modalidades e FAQ (vêm do config.js; aceitam {nome}, {nomeCurto}, {bairro}, {cidade}, {enderecoCompleto})
const fill = t => String(t).replace(/\{(\w+)\}/g, (m, k) => (k in D ? D[k] : m));
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const ml = document.getElementById("modalidades-lista");
(C.modalidades || []).forEach((m, i) => {
  const card = el("article", "card rv");
  const btn = el("a", "btn ghost sm", "Quero conhecer");
  btn.dataset.wa = "agendar"; btn.href = "https://wa.me/";
  card.append(el("span", "num", String(i + 1).padStart(2, "0")), el("h3", null, fill(m.titulo)), el("p", null, fill(m.descricao)), btn);
  ml.append(card);
});
const fl = document.getElementById("faq-lista");
(C.faq || []).forEach((f, i) => {
  const q = el("div", "q"), b = el("button"), ans = el("div", "ans"), box = document.createElement("div");
  b.id = "b" + (i + 1); b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", "a" + (i + 1));
  const ic = el("span", "i"); ic.setAttribute("aria-hidden", "true");
  b.append(el("span", "n", String(i + 1).padStart(2, "0")), el("span", "t", fill(f.pergunta)), ic);
  ans.id = "a" + (i + 1); ans.setAttribute("role", "region"); ans.setAttribute("aria-labelledby", b.id);
  box.append(el("p", null, fill(f.resposta)));
  if (f.mapa) { const m = el("a", "btn ghost sm", "Abrir no Google Maps"); m.dataset.maps = ""; m.href = "https://www.google.com/maps"; m.target = "_blank"; m.rel = "noopener"; box.append(m); }
  ans.append(box); q.append(b, ans); fl.append(q);
});

// WhatsApp
const num = String(C.whatsapp || "").replace(/\D/g, "");
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = "https://wa.me/" + num + "?text=" + encodeURIComponent(MSG[a.dataset.wa]);
  a.target = "_blank"; a.rel = "noopener";
});
// Google Maps
const MAPS = C.maps || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(D.enderecoCompleto);
document.querySelectorAll("[data-maps]").forEach(a => a.href = MAPS);

// Logo, SEO e favicon
const logo = document.getElementById("logo");
const up = C.nome.toUpperCase(), cu = (C.nomeCurto || "").toUpperCase(), pos = cu ? up.lastIndexOf(cu) : -1;
logo.textContent = "";
if (pos >= 0) { const b = document.createElement("b"); b.textContent = cu; logo.append(up.slice(0, pos), b, up.slice(pos + cu.length)); }
else logo.textContent = up;
logo.setAttribute("aria-label", C.nome + " — início");
const titulo = `${C.nome} | ${C.bairro} — ${C.cidade}`;
const desc = `Conheça o ${C.nome} em ${C.bairro}, ${C.cidade}. Treinos, comunidade e evolução. Entre em contato e agende sua aula experimental.`;
document.title = titulo;
document.querySelector('meta[name="description"]').content = desc;
document.querySelector('meta[property="og:title"]').content = titulo;
document.querySelector('meta[property="og:description"]').content = desc;
document.getElementById("ld").textContent = JSON.stringify({
  "@context": "https://schema.org", "@type": "SportsActivityLocation", name: C.nome,
  address: { "@type": "PostalAddress", streetAddress: C.endereco, addressLocality: C.cidade, addressRegion: C.uf, addressCountry: "BR", description: C.bairro }
});
const ini = (C.nomeCurto || C.nome).split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
document.querySelector('link[rel="icon"]').href = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#080808"/><text x="50" y="68" font-size="54" font-weight="900" text-anchor="middle" fill="#ff4416" font-family="Arial">${ini}</text></svg>`);

// header
const hd = document.getElementById("top-h");
const onScroll = () => hd.classList.toggle("solid", scrollY > 40);
onScroll(); addEventListener("scroll", onScroll, {passive:true});
// menu
const bg = document.getElementById("burger"), mn = document.getElementById("menu");
bg.addEventListener("click", () => { const o = mn.classList.toggle("open"); bg.setAttribute("aria-expanded", o); hd.classList.add("solid"); });
mn.addEventListener("click", e => { if (e.target.tagName === "A") { mn.classList.remove("open"); bg.setAttribute("aria-expanded","false"); } });
// faq
document.querySelectorAll(".q button").forEach(b => b.addEventListener("click", () => {
  b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") !== "true");
}));
// reveal
const els = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
  els.forEach(el => io.observe(el));
} else els.forEach(el => el.classList.add("in"));
