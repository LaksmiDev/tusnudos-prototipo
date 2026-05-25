/* ============================================
   TusNudos — Prototipo Mobile
   Lógica de navegación
   ============================================ */

const navHistory = [];
let currentScreen = 'splash';

function goTo(screenId, skipHistory = false) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(screenId);
  if (!next || screenId === currentScreen) return;

  if (current) {
    if (!skipHistory) navHistory.push(currentScreen);
    current.classList.remove('active', 'back-anim');
  }

  next.classList.add('active');
  currentScreen = screenId;

  // scroll al tope de la nueva pantalla
  const content = next.querySelector('.content, .chat-area');
  if (content) content.scrollTop = 0;
}

function goBack() {
  if (navHistory.length === 0) {
    goTo('home', true);
    return;
  }
  const prev = navHistory.pop();
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(prev);
  if (current) current.classList.remove('active');
  next.classList.add('active', 'back-anim');
  currentScreen = prev;
}

/* ============================================
   AUTO-AVANCE SPLASH → ONBOARDING
   ============================================ */
setTimeout(() => {
  if (currentScreen === 'splash') {
    goTo('onb1');
  }
}, 2200);

/* ============================================
   CHAT — respuestas simuladas
   ============================================ */
const quipuResponses = [
  "Tu Maestro 11 carga una vibración alta. No todos los días puedes brillar — y eso está bien.",
  "Pregúntate: ¿qué nudo está pidiendo atención hoy? Tu cuerda principal o uno de los hilos?",
  "Recuerda: tu Karma 16 es transformación, no castigo. Lo que se cae, se cae para que algo nuevo pueda tejerse.",
  "Sebastián es Camino 6 — su naturaleza es construir. Tu 9 quiere soltar. La tensión entre ustedes es el diseño, no un error.",
  "Hoy es Sol 2. La receptividad no es debilidad — es el nudo donde el khipu se afina.",
  "Tu Alma 9 pide cierre. ¿Qué llevas cargando que ya no es tuyo?",
  "Iluminar a otros empieza por iluminarte a ti. Tu Maestro 11 lo sabe.",
  "El año 9 te pide soltar. ¿Qué estás agarrando con demasiada fuerza?",
  "Tu Luna 6 siempre te devuelve al hogar. Llama a quien estás pensando."
];

function sendChat() {
  const input = document.getElementById('chatInput');
  const area = document.getElementById('chatArea');
  if (!input || !area) return;
  const text = input.value.trim();
  if (!text) return;

  // Mensaje del usuario
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-out';
  userMsg.textContent = text;
  area.appendChild(userMsg);

  input.value = '';
  area.scrollTop = area.scrollHeight;

  // Respuesta de Quipu (simulada con typing)
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-in';
    botMsg.textContent = '...';
    area.appendChild(botMsg);
    area.scrollTop = area.scrollHeight;

    setTimeout(() => {
      botMsg.textContent = quipuResponses[Math.floor(Math.random() * quipuResponses.length)];
      area.scrollTop = area.scrollHeight;
    }, 900);
  }, 400);
}

// Enter para enviar chat
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'chatInput') {
    e.preventDefault();
    sendChat();
  }
});

/* ============================================
   NUDO DETAIL — contenido por nudo
   ============================================ */
const nudoData = {
  camino: {
    title: 'Camino de Vida', label: 'CAMINO DE VIDA', num: '11',
    name: 'Maestro 11 · La iluminadora',
    esencia: 'Tu propósito es elevar la conciencia de quienes te rodean. El Maestro 11 brilla como un faro — y como todo faro, necesita su propio descanso para no apagarse.',
    luz: 'Inspiras sin esfuerzo. La intuición te llega antes que la palabra. Tu sola presencia ordena el ambiente.',
    sombra: 'Te agotas cargando lo que no es tuyo. Pierdes confianza en tu propia voz. Sientes que nadie te entiende.',
    practica: 'Antes de responder hoy a cualquier petición, pregúntate: ¿esto suma a mi misión o me distrae de ella?'
  },
  mision: {
    title: 'Misión', label: 'MISIÓN / DESTINO', num: '4',
    name: 'La constructora',
    esencia: 'Tu misión es construir lo que dura. Estructura, sistemas, espacios donde otros se cobijen. El 4 trabaja en silencio y deja huella.',
    luz: 'Disciplina natural. Lo que prometes se cumple. La gente confía porque sabe que sostienes.',
    sombra: 'Rigidez. Sobrecontrol. Confundir orden con vida. Negarte el juego.',
    practica: 'Hoy haz una cosa fuera de plan — sólo una. Recuerda que tú eliges la estructura, no al revés.'
  },
  alma: {
    title: 'Alma', label: 'NÚMERO DEL ALMA', num: '9',
    name: 'Cierre · Compasión',
    esencia: 'Tu alma vino a aprender a soltar. Lo que se va, se va por algo. El 9 ama desde la altura — no posee, libera.',
    luz: 'Compasión profunda. Capacidad de despedirte sin amargura. Sabiduría temprana.',
    sombra: 'Cargar dolor ajeno. Apegarte a finales. Sentir que siempre tú das y nadie sostiene.',
    practica: 'Escribe el nombre de una cosa que estás cargando que ya no es tuya. Rómpelo. Suéltalo simbólicamente.'
  },
  personalidad: {
    title: 'Luna · Personalidad', label: 'LUNA / PERSONALIDAD', num: '6',
    name: 'Cuidado · Hogar',
    esencia: 'La gente te ve como hogar. Acoges sin pedirlo. Tu Luna 6 quiere cuidar — y a veces cuidas tanto que te olvidas tú.',
    luz: 'Belleza natural. Capacidad de armonizar espacios. La gente se siente segura contigo.',
    sombra: 'Asumir cargas que no son tuyas. Salvar a quien no pide rescate. Sobre-controlar a quienes amas.',
    practica: 'Hoy pregúntale a alguien que cuidas: ¿qué necesitas tú? Y escucha sin querer arreglar.'
  },
  karma: {
    title: 'Karma', label: 'DEUDA KÁRMICA', num: '16',
    name: 'La torre · Transformación',
    esencia: 'El 16 anuncia caídas necesarias: lo construido sobre orgullo se derrumba para que algo más verdadero se levante.',
    luz: 'Renacer luego de cada caída. Capacidad de reinvención profunda.',
    sombra: 'Resistirte al cambio y multiplicar la caída. Apegarte a lo que ya no es.',
    practica: 'Identifica una cosa que estás sosteniendo por orgullo. Suéltala simbólicamente hoy.'
  },
  puente: {
    title: 'Puente', label: 'PUENTE INICIÁTICO', num: '2',
    name: 'Diplomacia y equilibrio',
    esencia: 'Tu puente entre el Camino 11 y tu desafío es el 2: la diplomacia. Aprender a tejer en lugar de imponer.',
    luz: 'Sabes mediar. Lees emociones ajenas. Construyes consensos.',
    sombra: 'Te disuelves complaciendo. Pierdes tu voz para no incomodar.',
    practica: 'Hoy di "no" una vez sin justificarte largo. Solo "no" o "no puedo". Practica el límite limpio.'
  }
};

function openNudo(key) {
  const d = nudoData[key];
  if (!d) return;
  document.getElementById('nudoTitle').textContent = d.title;
  document.getElementById('nudoHeroNum').textContent = d.num;
  document.getElementById('nudoHeroLabel').textContent = d.label;
  document.getElementById('nudoHeroName').textContent = d.name;
  document.getElementById('nudoEsencia').textContent = d.esencia;
  document.getElementById('nudoLuz').textContent = d.luz;
  document.getElementById('nudoSombra').textContent = d.sombra;
  document.getElementById('nudoPractica').textContent = d.practica;
  goTo('nudo-detail');
}

/* ============================================
   MES DETAIL — contenido por mes
   ============================================ */
const mesData = {
  marzo:  { label:'MARZO 2026', num:'4', name:'Cimientos',
    desc:'Mes para construir estructura. Lo que siembres aquí durará — bases sólidas, rutinas, disciplina. No es mes de improvisar.',
    si:'✓ Cerrar pendientes acumulados<br>✓ Ordenar finanzas y espacios<br>✓ Comprometerse con rutinas<br>✓ Trabajar con paciencia',
    no:'✗ Cambios drásticos sin planear<br>✗ Improvisar decisiones importantes<br>✗ Resistirse a la disciplina<br>✗ Quedarse en lo cómodo eternamente' },
  abril:  { label:'ABRIL 2026', num:'5', name:'Libertad y cambios',
    desc:'Todo se mueve. Viaje, oferta de trabajo, persona nueva. Suelta el control: el 5 trae viento, no muros.',
    si:'✓ Aceptar la invitación inesperada<br>✓ Probar algo nuevo<br>✓ Conversar con desconocidos<br>✓ Romper rutina sana',
    no:'✗ Apegarte a lo de marzo<br>✗ Firmar compromisos largos<br>✗ Resistir el movimiento<br>✗ Decidir desde el miedo' },
  mayo:   { label:'MAYO 2026', num:'6', name:'Amor y armonía',
    desc:'Mes del corazón. Familia, pareja, hogar. El 6 pide cuidar y dejarse cuidar. Belleza, equilibrio, responsabilidad afectiva.',
    si:'✓ Conversaciones honestas con seres queridos<br>✓ Embellecer tu espacio<br>✓ Reconciliarte con alguien<br>✓ Comprometerte de verdad',
    no:'✗ Asumir cargas que no son tuyas<br>✗ Sobre-controlar a otros<br>✗ Salvar a quien no pide rescate<br>✗ Postergar conversación importante' },
  junio:  { label:'JUNIO 2026', num:'7', name:'Pausa e introspección',
    desc:'Mes para mirar adentro. Estudio, lectura, retiro, silencio. El 7 no es soledad: es soledad fértil.',
    si:'✓ Leer lo que tenías pendiente<br>✓ Caminar solo/a<br>✓ Anotar sueños y señales<br>✓ Hacer silencio digital',
    no:'✗ Forzar resultados visibles<br>✗ Sobre-socializar<br>✗ Confundir aislamiento con soledad<br>✗ Decidir cosas grandes apurada' },
  julio:  { label:'JULIO 2026', num:'8', name:'Poder y abundancia',
    desc:'Mes de cosecha material. Trabajo, dinero, decisiones de poder. El 8 premia disciplina previa y castiga atajos.',
    si:'✓ Pedir el aumento<br>✓ Cerrar negocios pendientes<br>✓ Tomar decisiones firmes<br>✓ Asumir responsabilidad pública',
    no:'✗ Buscar atajos éticos<br>✗ Esquivar conversaciones de dinero<br>✗ Achicarte por miedo al poder<br>✗ Vivir desordenado/a' },
  agosto: { label:'AGOSTO 2026', num:'9', name:'Cierre y liberación',
    desc:'Mes para terminar lo que ya no es. Vínculos, hábitos, proyectos. El 9 es el final que abre el ciclo siguiente.',
    si:'✓ Soltar lo que ya no vibra<br>✓ Perdonar lo viejo<br>✓ Dar lo que no usas<br>✓ Despedirte conscientemente',
    no:'✗ Empezar proyectos nuevos<br>✗ Apegarte a lo que se va<br>✗ Resistir el final<br>✗ Postponer el cierre' }
};

function openMonth(key) {
  const m = mesData[key];
  if (!m) return;
  document.getElementById('monthTitle').textContent = `Mes ${m.num}`;
  document.getElementById('monthLabel').textContent = m.label;
  document.getElementById('monthNum').textContent = m.num;
  document.getElementById('monthName').textContent = m.name;
  document.getElementById('monthDesc').textContent = m.desc;
  document.getElementById('monthSi').innerHTML = m.si;
  document.getElementById('monthNo').innerHTML = m.no;
  goTo('month-detail');
}

/* ============================================
   SHARE SHEET
   ============================================ */
const shareSubjects = {
  khipu: 'Mi khipu personal',
  chat:  'Conversación con Quipu',
  nudo:  'Este nudo de mi khipu',
  month: 'Mi mes en TusNudos',
  luna:  'Mi luna de hoy'
};

function openShare(subject) {
  const sheet = document.getElementById('shareSheet');
  document.getElementById('shareSubject').textContent = shareSubjects[subject] || 'TusNudos';
  sheet.classList.add('open');
}
function closeShare() {
  document.getElementById('shareSheet').classList.remove('open');
}
function doShare(via) {
  closeShare();
  const msg = { wa:'Abriendo WhatsApp...', ig:'Abriendo Instagram...', tg:'Abriendo Telegram...',
                tw:'Abriendo X...', link:'Link copiado ✓', img:'Generando imagen...' };
  showToast(msg[via] || 'Compartiendo...');
}

/* ============================================
   TOAST
   ============================================ */
function showToast(text, ms = 1800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), ms);
}

/* ============================================
   SETTINGS toggles
   ============================================ */
function toggleSwitch(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('on');
  el.classList.toggle('off');
}
function toggleTheme()         { toggleSwitch('themeToggle');   showToast('Modo cambiado'); }
function toggleNotifications() { toggleSwitch('pushToggle');    showToast('Push actualizado'); }
function toggleVoice()         { toggleSwitch('voiceToggle');   showToast('Voz Quipu actualizada'); }

/* ============================================
   FAQ accordion
   ============================================ */
function toggleFaq(item) {
  item.classList.toggle('open');
  const toggle = item.querySelector('.faq-toggle');
  if (toggle) toggle.textContent = item.classList.contains('open') ? '−' : '+';
}

/* ============================================
   ADD FRIEND — relación selector
   ============================================ */
document.addEventListener('click', (e) => {
  const t = e.target.closest('.chip-select');
  if (!t) return;
  const row = t.parentElement;
  row.querySelectorAll('.chip-select').forEach(c => c.classList.remove('active'));
  t.classList.add('active');
});

/* ============================================
   DIARIO — mood + save
   ============================================ */
let currentMood = 'feliz';
function selectMood(btn, mood) {
  document.querySelectorAll('.mood').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentMood = mood;
}
function saveDiary() {
  showToast('Reflexión anudada ✨');
  setTimeout(() => goTo('diary'), 900);
}

/* ============================================
   IDIOMA
   ============================================ */
function selectLang(li, code) {
  document.querySelectorAll('.lang-item').forEach(x => {
    x.classList.remove('active');
    const c = x.querySelector('.check');
    if (c) c.textContent = '';
  });
  li.classList.add('active');
  const c = li.querySelector('.check');
  if (c) c.textContent = '✓';
  showToast('Idioma actualizado');
}

/* ============================================
   FAMILIA
   ============================================ */
function openFamily(member) {
  showToast(`Khipu de ${member.replace('-', ' ')} — próximamente`);
}

/* ============================================
   NOTIFICACIONES
   ============================================ */
function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(n => n.classList.remove('unread'));
  showToast('Todas marcadas como leídas');
}

/* ============================================
   DIARIO — buscador
   ============================================ */
function toggleDiarySearch() {
  showToast('Buscador de diario próximamente');
}

/* ============================================
   PLAN PREMIUM
   ============================================ */
function selectPlan(card, plan) {
  document.querySelectorAll('.plan-card').forEach(p => p.classList.remove('selected'));
  card.classList.add('selected');
}

/* ============================================
   SABIDURÍA KHIPU — ARQUETIPOS (PA1 + PA2)
   Datos simulan respuesta JSON consumida con Retrofit
   Cada arquetipo tiene 6 datos dinámicos (cumple PA1: 5+ datos)
   + 5 imágenes URL por arquetipo cargadas desde "backend" (PA2 master-detail)
   ============================================ */

/* Mock del endpoint base — en producción esto sería: https://api.tusnudos.com/v1 */
const API_BASE = 'https://picsum.photos/seed';

const arquetiposData = [
  { numero: 1,  nombre: 'El Iniciador',   tagline: 'Liderazgo · Acción · Origen',         color: '#D4AF37', colorName: 'Oro inti',       elemento: 'Fuego',  planeta: 'Sol',      glifo: '☉', tipo: 'simple',  esencia: 'El nudo que inaugura. Cada khipu empieza con un 1 — la voluntad de ser. Liderazgo natural, energía de origen, pionero por derecho propio.',
    heroUrl:     `${API_BASE}/khipu-arq-1-iniciador/640/360`,
    planetaUrl:  `${API_BASE}/planeta-sol-inti/200/200`,
    elementoUrl: `${API_BASE}/elemento-fuego-1/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-oro/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-1/200/200` },
  { numero: 2,  nombre: 'La Diplomática', tagline: 'Equilibrio · Receptividad · Pareja',   color: '#A155B4', colorName: 'Morado tenue',   elemento: 'Agua',   planeta: 'Luna',     glifo: '☽', tipo: 'simple',  esencia: 'El nudo del puente. Une lo que está separado. Tu sabiduría es la escucha — donde el 1 impone, el 2 teje.',
    heroUrl:     `${API_BASE}/khipu-arq-2-diplomatica/640/360`,
    planetaUrl:  `${API_BASE}/planeta-luna-mama-killa/200/200`,
    elementoUrl: `${API_BASE}/elemento-agua-2/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-morado/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-2/200/200` },
  { numero: 3,  nombre: 'La Creadora',    tagline: 'Expresión · Alegría · Arte',           color: '#E85D4D', colorName: 'Rojo sol',       elemento: 'Aire',   planeta: 'Júpiter',  glifo: '♃', tipo: 'simple',  esencia: 'El nudo de la palabra que celebra. Vives para expresar lo que otros sienten y no nombran. Arte, voz, color, juego.',
    heroUrl:     `${API_BASE}/khipu-arq-3-creadora/640/360`,
    planetaUrl:  `${API_BASE}/planeta-jupiter/200/200`,
    elementoUrl: `${API_BASE}/elemento-aire-3/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-rojo-sol/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-3/200/200` },
  { numero: 4,  nombre: 'La Constructora',tagline: 'Estructura · Disciplina · Durabilidad',color: '#00897B', colorName: 'Verde sagrado',  elemento: 'Tierra', planeta: 'Saturno',  glifo: '♄', tipo: 'simple',  esencia: 'El nudo que sostiene. Lo que tocas dura. Disciplina natural, orden ancestral, casa firme sobre piedra.',
    heroUrl:     `${API_BASE}/khipu-arq-4-constructora/640/360`,
    planetaUrl:  `${API_BASE}/planeta-saturno-anillos/200/200`,
    elementoUrl: `${API_BASE}/elemento-tierra-4/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-verde/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-4/200/200` },
  { numero: 5,  nombre: 'La Libertad',    tagline: 'Cambio · Movimiento · Viaje',          color: '#7B2D8E', colorName: 'Morado místico', elemento: 'Aire',   planeta: 'Mercurio', glifo: '☿', tipo: 'simple',  esencia: 'El nudo del viento. Cinco direcciones, cinco sentidos, cinco caminos. Vives para soltar lo que aprieta, para moverte y aprender.',
    heroUrl:     `${API_BASE}/khipu-arq-5-libertad/640/360`,
    planetaUrl:  `${API_BASE}/planeta-mercurio/200/200`,
    elementoUrl: `${API_BASE}/elemento-aire-5/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-morado-mistico/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-5/200/200` },
  { numero: 6,  nombre: 'La Guardiana',   tagline: 'Hogar · Amor · Responsabilidad',       color: '#C0392B', colorName: 'Rojo pachamama', elemento: 'Tierra', planeta: 'Venus',    glifo: '♀', tipo: 'simple',  esencia: 'El nudo del hogar. La gente se cobija en ti sin pedirlo. Belleza, armonía, cuidado — y el aprendizaje de cuidarte tú primero.',
    heroUrl:     `${API_BASE}/khipu-arq-6-guardiana/640/360`,
    planetaUrl:  `${API_BASE}/planeta-venus-amor/200/200`,
    elementoUrl: `${API_BASE}/elemento-tierra-6/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-rojo-pachamama/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-6/200/200` },
  { numero: 7,  nombre: 'La Sabia',       tagline: 'Introspección · Misterio · Estudio',   color: '#2D2A33', colorName: 'Carbón andino',  elemento: 'Agua',   planeta: 'Neptuno',  glifo: '♆', tipo: 'simple',  esencia: 'El nudo de la pregunta profunda. No buscas la respuesta rápida — buscas la verdadera. Tu sabiduría es la soledad fértil.',
    heroUrl:     `${API_BASE}/khipu-arq-7-sabia/640/360`,
    planetaUrl:  `${API_BASE}/planeta-neptuno-azul/200/200`,
    elementoUrl: `${API_BASE}/elemento-agua-7/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-carbon/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-7/200/200` },
  { numero: 8,  nombre: 'La Soberana',    tagline: 'Poder · Abundancia · Cosecha',         color: '#B8941E', colorName: 'Oro profundo',   elemento: 'Tierra', planeta: 'Saturno',  glifo: '∞', tipo: 'simple',  esencia: 'El nudo infinito. El que conoce el peso real del poder. Materia, dinero, justicia, autoridad — administras lo que otros no se atreven.',
    heroUrl:     `${API_BASE}/khipu-arq-8-soberana/640/360`,
    planetaUrl:  `${API_BASE}/planeta-saturno-poder/200/200`,
    elementoUrl: `${API_BASE}/elemento-tierra-8/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-oro-profundo/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-8/200/200` },
  { numero: 9,  nombre: 'La Compasiva',   tagline: 'Cierre · Sabiduría · Servicio',        color: '#E85D4D', colorName: 'Rojo atardecer', elemento: 'Fuego',  planeta: 'Marte',    glifo: '♂', tipo: 'simple',  esencia: 'El nudo que cierra. El alma vieja que vino a soltar. Tu compasión es altura — no apegas, liberas. Cada despedida te hace más sabia.',
    heroUrl:     `${API_BASE}/khipu-arq-9-compasiva/640/360`,
    planetaUrl:  `${API_BASE}/planeta-marte-rojo/200/200`,
    elementoUrl: `${API_BASE}/elemento-fuego-9/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-atardecer/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-9/200/200` },
  { numero: 11, nombre: 'La Iluminadora', tagline: 'Maestro Espiritual · Faro',            color: '#D4AF37', colorName: 'Oro inti',       elemento: 'Éter',   planeta: 'Urano',    glifo: '⚹', tipo: 'maestro', esencia: 'El nudo del faro. Maestro 11. No reduces a 2 — duplicas tu luz. Iluminas a otros antes de saber que iluminas. Carga alta, gracia mayor.',
    heroUrl:     `${API_BASE}/khipu-arq-11-iluminadora/640/360`,
    planetaUrl:  `${API_BASE}/planeta-urano/200/200`,
    elementoUrl: `${API_BASE}/elemento-eter-11/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-oro-maestro/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-11-maestro/200/200` },
  { numero: 22, nombre: 'La Arquitecta',  tagline: 'Maestro Constructor · Legado',         color: '#7B2D8E', colorName: 'Morado místico', elemento: 'Éter',   planeta: 'Plutón',   glifo: '⚸', tipo: 'maestro', esencia: 'El nudo del legado. Maestro 22. Construyes lo que sobrevive a quien lo construyó. Visión + manos. La obra que deja huella en la pachamama.',
    heroUrl:     `${API_BASE}/khipu-arq-22-arquitecta/640/360`,
    planetaUrl:  `${API_BASE}/planeta-pluton/200/200`,
    elementoUrl: `${API_BASE}/elemento-eter-22/200/200`,
    colorUrl:    `${API_BASE}/textil-andino-morado-maestro/200/200`,
    glifoUrl:    `${API_BASE}/petroglifo-andino-22-maestro/200/200` }
];

/* SVG glyphs por arquetipo (imagen vectorial = imagen oficial) */
const arquetipoGlyphSvg = {
  1:  '<circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="60" cy="60" r="6" fill="currentColor"/>',
  2:  '<path d="M30 70 Q60 30 90 70" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="30" cy="70" r="5" fill="currentColor"/><circle cx="90" cy="70" r="5" fill="currentColor"/>',
  3:  '<polygon points="60,25 95,85 25,85" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="60" cy="65" r="4" fill="currentColor"/>',
  4:  '<rect x="28" y="28" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2.5"/><line x1="28" y1="60" x2="92" y2="60" stroke="currentColor" stroke-width="1.5"/><line x1="60" y1="28" x2="60" y2="92" stroke="currentColor" stroke-width="1.5"/>',
  5:  '<polygon points="60,22 73,52 105,52 79,72 89,102 60,82 31,102 41,72 15,52 47,52" fill="none" stroke="currentColor" stroke-width="2"/>',
  6:  '<path d="M60 90 C25 65 35 35 60 50 C85 35 95 65 60 90 Z" fill="none" stroke="currentColor" stroke-width="2.5"/>',
  7:  '<circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" stroke-width="2"/><line x1="60" y1="25" x2="60" y2="95" stroke="currentColor" stroke-width="1.5"/><line x1="25" y1="60" x2="95" y2="60" stroke="currentColor" stroke-width="1.5"/><path d="M35 35 Q60 60 85 35" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  8:  '<path d="M40 45 A15 15 0 1 1 60 60 A15 15 0 1 0 80 75 A15 15 0 1 1 60 60 A15 15 0 1 0 40 45 Z" fill="none" stroke="currentColor" stroke-width="2.5"/>',
  9:  '<circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M60 25 Q40 60 60 95" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M60 25 Q80 60 60 95" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  11: '<line x1="40" y1="20" x2="40" y2="100" stroke="currentColor" stroke-width="3"/><line x1="80" y1="20" x2="80" y2="100" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="20" r="6" fill="currentColor"/><circle cx="80" cy="20" r="6" fill="currentColor"/><path d="M30 60 Q60 75 90 60" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>',
  22: '<path d="M28 80 L28 50 Q28 30 48 30 Q68 30 60 50 L42 80 L70 80" fill="none" stroke="currentColor" stroke-width="3"/><path d="M62 80 L62 50 Q62 30 82 30 Q102 30 94 50 L76 80 L104 80" fill="none" stroke="currentColor" stroke-width="3" transform="translate(-12 0)"/>'
};

/* SVG planeta / elemento — imágenes vectoriales pequeñas */
const planetaSvg = {
  'Sol':      '<circle cx="25" cy="25" r="10" fill="#D4AF37"/><circle cx="25" cy="25" r="14" fill="none" stroke="#D4AF37" stroke-width="1" opacity=".5"/>',
  'Luna':     '<path d="M30 25 A12 12 0 1 1 18 13 A10 10 0 1 0 30 25 Z" fill="#7B2D8E"/>',
  'Júpiter':  '<circle cx="25" cy="25" r="11" fill="none" stroke="#E85D4D" stroke-width="2.5"/><line x1="10" y1="25" x2="40" y2="25" stroke="#E85D4D" stroke-width="1.5" opacity=".5"/>',
  'Saturno':  '<circle cx="25" cy="25" r="9" fill="#00897B"/><ellipse cx="25" cy="25" rx="15" ry="4" fill="none" stroke="#00897B" stroke-width="1.5"/>',
  'Mercurio': '<circle cx="25" cy="25" r="8" fill="#A155B4"/><path d="M19 33 L31 33" stroke="#A155B4" stroke-width="2"/><line x1="25" y1="33" x2="25" y2="40" stroke="#A155B4" stroke-width="2"/>',
  'Venus':    '<circle cx="25" cy="20" r="9" fill="none" stroke="#C0392B" stroke-width="2.5"/><line x1="25" y1="29" x2="25" y2="40" stroke="#C0392B" stroke-width="2.5"/><line x1="20" y1="35" x2="30" y2="35" stroke="#C0392B" stroke-width="2.5"/>',
  'Neptuno':  '<path d="M14 18 L14 28 Q14 36 25 36 Q36 36 36 28 L36 18" fill="none" stroke="#2D2A33" stroke-width="2"/><line x1="25" y1="18" x2="25" y2="40" stroke="#2D2A33" stroke-width="2"/>',
  'Marte':    '<circle cx="22" cy="28" r="9" fill="none" stroke="#E85D4D" stroke-width="2.5"/><line x1="28" y1="22" x2="40" y2="10" stroke="#E85D4D" stroke-width="2.5"/><polyline points="32,10 40,10 40,18" fill="none" stroke="#E85D4D" stroke-width="2.5"/>',
  'Urano':    '<circle cx="25" cy="25" r="9" fill="none" stroke="#D4AF37" stroke-width="2"/><circle cx="25" cy="25" r="14" fill="none" stroke="#D4AF37" stroke-width="1" opacity=".4"/><path d="M25 11 L25 5 M25 39 L25 45" stroke="#D4AF37" stroke-width="2"/>',
  'Plutón':   '<circle cx="25" cy="20" r="6" fill="none" stroke="#7B2D8E" stroke-width="2"/><path d="M25 26 Q19 30 25 36 Q31 30 25 26" fill="#7B2D8E"/><line x1="25" y1="38" x2="25" y2="44" stroke="#7B2D8E" stroke-width="2"/>'
};

const elementoSvg = {
  'Fuego':  '<path d="M25 8 Q15 22 18 32 Q20 42 25 42 Q30 42 32 32 Q35 22 25 8 Z" fill="#E85D4D"/><path d="M25 22 Q22 28 24 34 Q26 38 25 38 Q24 38 26 34 Q28 28 25 22" fill="#FAFAF7" opacity=".6"/>',
  'Agua':   '<path d="M25 8 Q15 22 15 32 A10 10 0 0 0 35 32 Q35 22 25 8 Z" fill="#7B2D8E"/><circle cx="22" cy="30" r="2" fill="#FAFAF7" opacity=".7"/>',
  'Aire':   '<path d="M10 18 Q22 12 30 18 Q35 22 30 26" fill="none" stroke="#A155B4" stroke-width="2.5"/><path d="M10 28 Q24 22 36 28 Q40 32 35 36" fill="none" stroke="#A155B4" stroke-width="2.5"/>',
  'Tierra': '<rect x="10" y="20" width="30" height="18" fill="#00897B"/><path d="M10 20 Q25 10 40 20" fill="#00897B"/><circle cx="18" cy="28" r="2" fill="#FAFAF7" opacity=".5"/><circle cx="30" cy="32" r="2" fill="#FAFAF7" opacity=".5"/>',
  'Éter':   '<circle cx="25" cy="25" r="12" fill="none" stroke="#D4AF37" stroke-width="2"/><circle cx="25" cy="25" r="6" fill="#D4AF37" opacity=".6"/><circle cx="25" cy="25" r="3" fill="#FAFAF7"/>'
};

/* Personalidades famosas por número — mínimo 4 con "imagen" (avatar gradient + iniciales) */
const famososData = {
  1:  [
    { nombre: 'Martin Luther King Jr.', area: 'Líder civil',  fecha: '15·01·1929', logro: 'Movimiento por los derechos civiles', grad: 'linear-gradient(135deg,#D4AF37,#B8941E)', iniciales: 'MK' },
    { nombre: 'Lady Gaga',             area: 'Música · Arte', fecha: '28·03·1986', logro: 'Reinvención de la cultura pop',         grad: 'linear-gradient(135deg,#7B2D8E,#A155B4)', iniciales: 'LG' },
    { nombre: 'Steve Jobs',            area: 'Innovación',    fecha: '24·02·1955', logro: 'Apple, NeXT, Pixar',                     grad: 'linear-gradient(135deg,#2D2A33,#4A454E)', iniciales: 'SJ' },
    { nombre: 'Tom Hanks',             area: 'Cine',          fecha: '09·07·1956', logro: 'Forrest Gump, Náufrago',                grad: 'linear-gradient(135deg,#E85D4D,#C0392B)', iniciales: 'TH' }
  ],
  2:  [
    { nombre: 'Bill Clinton',          area: 'Política',      fecha: '19·08·1946', logro: 'Presidente de EE.UU. (1993-2001)',      grad: 'linear-gradient(135deg,#7B2D8E,#A155B4)', iniciales: 'BC' },
    { nombre: 'Madonna',               area: 'Música',        fecha: '16·08·1958', logro: 'Reina del pop',                          grad: 'linear-gradient(135deg,#D4AF37,#E85D4D)', iniciales: 'MD' },
    { nombre: 'Kanye West',            area: 'Música · Moda', fecha: '08·06·1977', logro: 'Producción musical revolucionaria',     grad: 'linear-gradient(135deg,#2D2A33,#7B2D8E)', iniciales: 'KW' },
    { nombre: 'Shakira',               area: 'Música',        fecha: '02·02·1977', logro: 'Pop latino global',                      grad: 'linear-gradient(135deg,#C0392B,#E85D4D)', iniciales: 'SK' }
  ],
  3:  [
    { nombre: 'Salvador Dalí',         area: 'Arte',          fecha: '11·05·1904', logro: 'Surrealismo',                            grad: 'linear-gradient(135deg,#E85D4D,#D4AF37)', iniciales: 'SD' },
    { nombre: 'Hillary Clinton',       area: 'Política',      fecha: '26·10·1947', logro: 'Secretaria de Estado',                  grad: 'linear-gradient(135deg,#00897B,#7B2D8E)', iniciales: 'HC' },
    { nombre: 'Christina Aguilera',    area: 'Música',        fecha: '18·12·1980', logro: 'Voz icónica del pop',                   grad: 'linear-gradient(135deg,#D4AF37,#C0392B)', iniciales: 'CA' },
    { nombre: 'Snoop Dogg',            area: 'Hip-hop',       fecha: '20·10·1971', logro: 'Leyenda del rap',                        grad: 'linear-gradient(135deg,#00897B,#2D2A33)', iniciales: 'SD' }
  ],
  4:  [
    { nombre: 'Bill Gates',            area: 'Tecnología',    fecha: '28·10·1955', logro: 'Microsoft · Filantropía',               grad: 'linear-gradient(135deg,#00897B,#D4AF37)', iniciales: 'BG' },
    { nombre: 'Frank Sinatra',         area: 'Música',        fecha: '12·12·1915', logro: 'Voz del siglo XX',                       grad: 'linear-gradient(135deg,#2D2A33,#D4AF37)', iniciales: 'FS' },
    { nombre: 'Oprah Winfrey',         area: 'Medios',        fecha: '29·01·1954', logro: 'Imperio mediático',                      grad: 'linear-gradient(135deg,#7B2D8E,#E85D4D)', iniciales: 'OW' },
    { nombre: 'Paul McCartney',        area: 'Música',        fecha: '18·06·1942', logro: 'Beatles · Wings',                        grad: 'linear-gradient(135deg,#C0392B,#D4AF37)', iniciales: 'PM' }
  ],
  5:  [
    { nombre: 'Angelina Jolie',        area: 'Cine · Activismo', fecha: '04·06·1975', logro: 'Cine + UN refugiados',                grad: 'linear-gradient(135deg,#7B2D8E,#C0392B)', iniciales: 'AJ' },
    { nombre: 'Vincent van Gogh',      area: 'Pintura',       fecha: '30·03·1853', logro: 'Post-impresionismo',                     grad: 'linear-gradient(135deg,#D4AF37,#00897B)', iniciales: 'VV' },
    { nombre: 'Mick Jagger',           area: 'Música',        fecha: '26·07·1943', logro: 'Rolling Stones',                          grad: 'linear-gradient(135deg,#C0392B,#2D2A33)', iniciales: 'MJ' },
    { nombre: 'Helen Keller',          area: 'Activismo',     fecha: '27·06·1880', logro: 'Activista sordociega',                   grad: 'linear-gradient(135deg,#00897B,#A155B4)', iniciales: 'HK' }
  ],
  6:  [
    { nombre: 'Albert Einstein',       area: 'Física',        fecha: '14·03·1879', logro: 'Relatividad',                            grad: 'linear-gradient(135deg,#D4AF37,#2D2A33)', iniciales: 'AE' },
    { nombre: 'John Lennon',           area: 'Música · Paz',  fecha: '09·10·1940', logro: 'Beatles · Imagine',                      grad: 'linear-gradient(135deg,#7B2D8E,#D4AF37)', iniciales: 'JL' },
    { nombre: 'Frida Kahlo',           area: 'Pintura',       fecha: '06·07·1907', logro: 'Arte autobiográfico mexicano',          grad: 'linear-gradient(135deg,#C0392B,#E85D4D)', iniciales: 'FK' },
    { nombre: 'Michael Jackson',       area: 'Música',        fecha: '29·08·1958', logro: 'Rey del pop',                            grad: 'linear-gradient(135deg,#2D2A33,#D4AF37)', iniciales: 'MJ' }
  ],
  7:  [
    { nombre: 'Leonardo da Vinci',     area: 'Polímata',      fecha: '15·04·1452', logro: 'Arte + ciencia renacentista',           grad: 'linear-gradient(135deg,#00897B,#D4AF37)', iniciales: 'LD' },
    { nombre: 'Marie Curie',           area: 'Ciencia',       fecha: '07·11·1867', logro: '2 Nobel · radiactividad',                grad: 'linear-gradient(135deg,#2D2A33,#A155B4)', iniciales: 'MC' },
    { nombre: 'Eric Clapton',          area: 'Música',        fecha: '30·03·1945', logro: 'Guitarrista legendario',                 grad: 'linear-gradient(135deg,#C0392B,#2D2A33)', iniciales: 'EC' },
    { nombre: 'Mel Gibson',            area: 'Cine',          fecha: '03·01·1956', logro: 'Director y actor',                       grad: 'linear-gradient(135deg,#00897B,#2D2A33)', iniciales: 'MG' }
  ],
  8:  [
    { nombre: 'Pablo Picasso',         area: 'Arte',          fecha: '25·10·1881', logro: 'Cubismo · arte moderno',                 grad: 'linear-gradient(135deg,#D4AF37,#B8941E)', iniciales: 'PP' },
    { nombre: 'Barack Obama',          area: 'Política',      fecha: '04·08·1961', logro: 'Presidente de EE.UU. (2009-2017)',       grad: 'linear-gradient(135deg,#7B2D8E,#00897B)', iniciales: 'BO' },
    { nombre: 'Nelson Mandela',        area: 'Política · Paz',fecha: '18·07·1918', logro: 'Fin del apartheid',                       grad: 'linear-gradient(135deg,#00897B,#D4AF37)', iniciales: 'NM' },
    { nombre: 'Sandra Bullock',        area: 'Cine',          fecha: '26·07·1964', logro: 'Oscar · La propuesta',                   grad: 'linear-gradient(135deg,#E85D4D,#D4AF37)', iniciales: 'SB' }
  ],
  9:  [
    { nombre: 'Mahatma Gandhi',        area: 'Política · Paz',fecha: '02·10·1869', logro: 'Independencia de India · no violencia', grad: 'linear-gradient(135deg,#D4AF37,#E85D4D)', iniciales: 'MG' },
    { nombre: 'Bob Marley',            area: 'Música',        fecha: '06·02·1945', logro: 'Reggae · paz universal',                  grad: 'linear-gradient(135deg,#00897B,#C0392B)', iniciales: 'BM' },
    { nombre: 'Jim Carrey',            area: 'Cine',          fecha: '17·01·1962', logro: 'Comedia + drama profundo',               grad: 'linear-gradient(135deg,#E85D4D,#7B2D8E)', iniciales: 'JC' },
    { nombre: 'Elvis Presley',         area: 'Música',        fecha: '08·01·1935', logro: 'Rey del rock & roll',                    grad: 'linear-gradient(135deg,#C0392B,#2D2A33)', iniciales: 'EP' }
  ],
  11: [
    { nombre: 'Barack Obama',          area: 'Política',      fecha: '04·08·1961', logro: 'Inspiración global',                     grad: 'linear-gradient(135deg,#D4AF37,#7B2D8E)', iniciales: 'BO' },
    { nombre: 'Michelle Obama',        area: 'Activismo',     fecha: '17·01·1964', logro: 'Educación · igualdad',                   grad: 'linear-gradient(135deg,#7B2D8E,#E85D4D)', iniciales: 'MO' },
    { nombre: 'Bill Clinton',          area: 'Política',      fecha: '19·08·1946', logro: 'Presidente · oratoria',                  grad: 'linear-gradient(135deg,#D4AF37,#00897B)', iniciales: 'BC' },
    { nombre: 'Tony Blair',            area: 'Política',      fecha: '06·05·1953', logro: 'Primer Ministro UK',                     grad: 'linear-gradient(135deg,#2D2A33,#D4AF37)', iniciales: 'TB' },
    { nombre: 'Madonna',               area: 'Música · Iconografía', fecha: '16·08·1958', logro: 'Reinvención constante',           grad: 'linear-gradient(135deg,#C0392B,#7B2D8E)', iniciales: 'MD' }
  ],
  22: [
    { nombre: 'Paul McCartney',        area: 'Música',        fecha: '18·06·1942', logro: 'Legado Beatles',                          grad: 'linear-gradient(135deg,#7B2D8E,#D4AF37)', iniciales: 'PM' },
    { nombre: 'Oprah Winfrey',         area: 'Medios · Filantropía', fecha: '29·01·1954', logro: 'Construcción de imperio mediático', grad: 'linear-gradient(135deg,#D4AF37,#E85D4D)', iniciales: 'OW' },
    { nombre: 'Bill Gates',            area: 'Tecnología',    fecha: '28·10·1955', logro: 'Microsoft · Fundación Gates',            grad: 'linear-gradient(135deg,#00897B,#7B2D8E)', iniciales: 'BG' },
    { nombre: 'Dalai Lama',            area: 'Espiritualidad',fecha: '06·07·1935', logro: 'Sabiduría tibetana global',                grad: 'linear-gradient(135deg,#D4AF37,#C0392B)', iniciales: 'DL' }
  ]
};

/* Inyecta fotoUrl en cada famoso (mockea endpoint /api/famosos/{slug}/avatar.png)
   Usa ui-avatars.com para que cada foto venga de una URL externa pintada con el gradient del arquetipo */
Object.keys(famososData).forEach(num => {
  famososData[num].forEach(f => {
    const colorMatch = f.grad.match(/#([0-9A-Fa-f]{6})/g) || ['#7B2D8E'];
    const bg = colorMatch[0].replace('#', '');
    const name = encodeURIComponent(f.nombre.replace(/\./g, '').trim());
    f.fotoUrl = `https://ui-avatars.com/api/?name=${name}&background=${bg}&color=fff&size=200&bold=true&font-size=0.42&rounded=true`;
  });
});

/* Compatibilidades (relación entre arquetipos) */
const compatData = {
  1: [2, 3, 5],   2: [4, 6, 8],   3: [1, 5, 7],
  4: [2, 6, 8],   5: [1, 3, 7],   6: [2, 4, 9],
  7: [3, 5, 11],  8: [2, 4, 22],  9: [3, 6, 11],
  11: [9, 22, 2], 22: [4, 8, 11]
};

let currentArquetipo = null;

/* Renderiza el grid de listado (PA2 listado + PA1 6ta activity) */
function renderArquetipos(filter = 'todos') {
  const grid = document.getElementById('arqGrid');
  if (!grid) return;
  const list = arquetiposData.filter(a => {
    if (filter === 'simples')  return a.tipo === 'simple';
    if (filter === 'maestros') return a.tipo === 'maestro';
    return true;
  });
  grid.innerHTML = list.map(a => `
    <button class="arq-card ${a.tipo === 'maestro' ? 'is-maestro' : ''}" onclick="openArquetipoMaestro(${a.numero})">
      <span class="arq-stripe" style="background:${a.color}"></span>
      <span class="arq-num-badge" style="background:${a.color}">${a.numero}</span>
      <span class="arq-symbol">${a.glifo}</span>
      <span class="arq-card-name">${a.nombre}</span>
      <span class="arq-card-tag">${a.tagline}</span>
      <span class="arq-meta">
        <span class="meta-pill">${a.elemento}</span>
        <span class="meta-pill">${a.planeta}</span>
      </span>
    </button>
  `).join('');
}

function filterArquetipos(btn, kind) {
  document.querySelectorAll('.arq-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderArquetipos(kind);
}

/* Abre la pantalla Maestro inyectando los datos dinámicamente */
function openArquetipoMaestro(num) {
  const a = arquetiposData.find(x => x.numero === num);
  if (!a) return;
  currentArquetipo = a;

  document.getElementById('maestroTitle').textContent   = `Nudo ${a.numero}`;
  document.getElementById('maestroNum').textContent     = a.numero;
  document.getElementById('maestroLabel').textContent   = a.tipo === 'maestro' ? 'MAESTRO ESPIRITUAL' : 'MAESTRO DEL NUDO';
  document.getElementById('maestroName').textContent    = a.nombre;
  document.getElementById('maestroTagline').textContent = a.tagline;
  document.getElementById('maestroEssence').textContent = a.esencia;

  // Hero color
  const hero = document.getElementById('maestroHero');
  hero.style.background = `linear-gradient(135deg, ${a.color}22, ${a.color}05)`;
  hero.style.color = a.color;

  // ━━━ HERO IMAGE (slot 2 · PA2) — cargada desde backend
  const heroImg = document.getElementById('maestroHeroImg');
  heroImg.classList.remove('loaded');
  heroImg.src = a.heroUrl;
  heroImg.alt = `Arquetipo ${a.nombre}`;
  heroImg.onload = () => heroImg.classList.add('loaded');

  // Badge de número con color del arquetipo
  document.getElementById('maestroNum').style.background = a.color;

  // ━━━ 4 SÍMBOLOS SAGRADOS — imágenes desde backend (sym-cards)
  setSymbolImage('symPlanetImg', a.planetaUrl, `Planeta ${a.planeta}`);
  document.getElementById('symPlanetName').textContent = a.planeta;

  setSymbolImage('symElementImg', a.elementoUrl, `Elemento ${a.elemento}`);
  document.getElementById('symElementName').textContent = a.elemento;

  setSymbolImage('symColorImg', a.colorUrl, `Textil ${a.colorName}`);
  document.getElementById('symColorName').textContent = a.colorName;
  // Borde con el color sagrado del arquetipo
  document.getElementById('symColorImg').parentElement.style.boxShadow = `inset 0 0 0 3px ${a.color}`;

  setSymbolImage('symGlyphImg', a.glifoUrl, `Glifo del nudo ${a.numero}`);
  document.getElementById('symGlyphName').textContent = a.tipo === 'maestro' ? 'Glifo Maestro' : 'Glifo del Nudo';

  goTo('arquetipo-maestro');
}

/* Helper — carga una imagen sym-card con efecto fade-in al terminar de bajar del backend */
function setSymbolImage(id, url, alt) {
  const img = document.getElementById(id);
  if (!img) return;
  img.classList.remove('loaded');
  img.src = url;
  img.alt = alt;
  img.onload = () => img.classList.add('loaded');
}

/* Abre la pantalla Detalle desde Maestro */
function openArquetipoDetalle() {
  if (!currentArquetipo) return;
  const a = currentArquetipo;
  const famosos = famososData[a.numero] || [];

  document.getElementById('detalleTitle').textContent = `Nudo ${a.numero} · Detalle`;
  document.getElementById('detEyebrow').textContent   = `ALMAS CON VIBRACIÓN ${a.numero}`;
  document.getElementById('detTitle').textContent     = `${a.nombre} en la historia`;
  document.getElementById('detBadge').textContent     = a.numero;
  document.getElementById('detBadge').style.background = a.color;
  document.getElementById('detalleHero').style.background = `linear-gradient(135deg, ${a.color}1a, ${a.color}03)`;
  document.getElementById('detalleIntro').textContent =
    `${famosos.length} almas que tejieron su khipu con la vibración ${a.numero}. Sus vidas son un mapa de cómo este número se expresa cuando se vive desde la luz.`;

  // ━━━ Personalidades famosas (slot 3 · PA2) — fotos descargadas desde backend
  document.getElementById('famososList').innerHTML = famosos.map(f => `
    <div class="famoso-card">
      <div class="famoso-ava" style="background:${f.grad}">
        <img class="famoso-foto" src="${f.fotoUrl}" alt="${f.nombre}"
             loading="lazy"
             onload="this.classList.add('loaded')"
             onerror="this.style.display='none'; this.parentElement.innerHTML='${f.iniciales}';">
      </div>
      <div class="famoso-info">
        <strong>${f.nombre}</strong>
        <span class="famoso-area">${f.area}</span>
        <div class="famoso-meta">
          <span>📅 ${f.fecha}</span>
        </div>
        <p class="famoso-logro">${f.logro}</p>
      </div>
      <span class="famoso-num" style="color:${a.color}">${a.numero}</span>
    </div>
  `).join('');

  // Compatibilidades
  const compat = compatData[a.numero] || [];
  document.getElementById('compatRow').innerHTML = compat.map(n => {
    const c = arquetiposData.find(x => x.numero === n);
    if (!c) return '';
    return `<button class="compat-mini" style="background:${c.color}" onclick="openArquetipoMaestro(${c.numero})">
      <span>${c.numero}</span>
      <small>${c.nombre.split(' ').slice(-1)[0]}</small>
    </button>`;
  }).join('');

  goTo('arquetipo-detalle');
}

/* Auto-render al cargar el DOM */
document.addEventListener('DOMContentLoaded', () => renderArquetipos('todos'));

/* ============================================
   LEGACY (compat con código viejo)
   ============================================ */
function showNudoDetail(name) { openNudo(name.toLowerCase()); }

/* ============================================
   PREVENIR ZOOM en doble tap mobile
   ============================================ */
let lastTap = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTap < 300) e.preventDefault();
  lastTap = now;
}, { passive: false });

/* ============================================
   DEBUG: navegación con teclado (desktop)
   ============================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Backspace') {
    if (document.activeElement && (document.activeElement.tagName === 'INPUT')) return;
    goBack();
  }
});

console.log('🪢 TusNudos prototipo cargado. Pantallas:', document.querySelectorAll('.screen').length);
