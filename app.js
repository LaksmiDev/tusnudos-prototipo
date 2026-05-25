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
  "Diego es Camino 5 — su naturaleza es moverse. Tu 4 quiere construir. La tensión entre ustedes es el diseño, no un error.",
  "Hoy es día 7. La introspección no es debilidad — es el nudo donde el khipu se afina.",
  "Tu Alma 3 quiere expresarse. ¿Qué llevas guardado que necesita salir hoy?",
  "Iluminar a otros empieza por iluminarte a ti. Tu Maestro 11 lo sabe.",
  "El año 5 te pide soltar el control. ¿Qué estás agarrando con demasiada fuerza?"
];

function sendChat() {
  const input = document.getElementById('chatInput');
  const area = document.getElementById('chatArea');
  if (!input || !area) return;
  const text = input.value.trim();
  if (!text) return;

  // Mensaje del usuario
  const userMsg = document.createElement('div');
  userMsg.className = 'msg msg-user';
  userMsg.textContent = text;
  area.appendChild(userMsg);

  input.value = '';
  area.scrollTop = area.scrollHeight;

  // Respuesta de Quipu (simulada con typing)
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'msg msg-bot';
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
    title: 'Misión', label: 'MISIÓN / DESTINO', num: '7',
    name: 'El sabio buscador',
    esencia: 'Tu misión es investigar lo que otros aceptan sin preguntar. Tu mente es bisturí: corta donde otros suponen.',
    luz: 'Profundidad analítica. Encuentras la pregunta correcta antes que la respuesta. Sabes esperar.',
    sombra: 'Te aíslas demasiado. Sobre-analizas hasta paralizar. Desconfías por defecto.',
    practica: 'Hoy haz una pregunta a alguien sin necesitar tener tú la respuesta. Solo escucha.'
  },
  alma: {
    title: 'Alma', label: 'NÚMERO DEL ALMA', num: '3',
    name: 'La expresión creativa',
    esencia: 'En lo más íntimo, tu alma quiere CREAR. Palabras, imágenes, color, conversación — necesitas un canal de salida o te enfermas.',
    luz: 'Alegría contagiosa. Capacidad de poner luz en lo pesado. Comunicación viva.',
    sombra: 'Dispersión. Hablar mucho y sentir poco. Esconder dolor con humor.',
    practica: 'Escribe, dibuja o graba algo hoy — aunque nadie lo vea. Tu alma necesita la salida.'
  },
  personalidad: {
    title: 'Personalidad', label: 'PERSONALIDAD', num: '4',
    name: 'La constructora',
    esencia: 'La gente te ve sólida, confiable, ordenada. Eres la que sostiene. La estructura visible de tu khipu.',
    luz: 'Disciplina, lealtad, palabra que se cumple. Construyes lo que otros sueñan.',
    sombra: 'Rigidez. Dificultad para soltar el control. Te falta espacio para jugar.',
    practica: 'Rompe una rutina hoy — solo una. Para recordarte que tú eliges la estructura.'
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
