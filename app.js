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
   NUDO DETAIL (modal simulado)
   ============================================ */
function showNudoDetail(name) {
  alert(`📿 ${name}\n\n(En la app real, aquí se abre la pantalla detalle con la lectura LLM en streaming del motor KHIPU)`);
}

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
