/**
 * CONVÉRTICA — ORQUESTRADOR DE MOVIMENTO (NOOMO REVERSE MOTION ENGINE)
 * Controla Lenis Smooth Scroll, transições de capítulos do Storytelling e Áudio Web
 */

(function () {
  'use strict';

  // 1. VERIFICAÇÃO DE PREFERS-REDUCED-MOTION
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. ELEMENTOS DO DOM
  const heroStage = document.getElementById('heroStage');
  const scrollExplore = document.getElementById('scrollExplore');
  const cinematicFooter = document.getElementById('cinematicFooter');

  const chapters = [
    { id: 'ch1', start: 0.04, end: 0.09 },
    { id: 'ch2', start: 0.09, end: 0.15 },
    { id: 'ch3', start: 0.15, end: 0.21 },
    { id: 'ch4', start: 0.21, end: 0.27 },
    { id: 'ch5', start: 0.27, end: 0.33 },
    { id: 'ch6', start: 0.33, end: 0.39 },
    { id: 'ch7', start: 0.39, end: 0.45 },
    { id: 'chBig1', start: 0.45, end: 0.51 },
    { id: 'chBig2', start: 0.51, end: 0.57 },
    { id: 'chBig3', start: 0.57, end: 0.63 },
    { id: 'chBig4', start: 0.63, end: 0.69 },
    { id: 'ch12', start: 0.69, end: 0.74 },
    { id: 'ch13', start: 0.74, end: 0.79 },
    { id: 'ch14', start: 0.79, end: 0.84 },
    { id: 'ch15', start: 0.84, end: 0.89 },
    { id: 'ch16', start: 0.89, end: 0.94 },
    { id: 'ch17', start: 0.94, end: 0.97 }
  ];

  const chapterElements = chapters.map(ch => ({
    ...ch,
    el: document.getElementById(ch.id)
  }));

  // 3. INICIALIZAÇÃO DO LENIS SMOOTH SCROLL (60–120 FPS)
  let lenisInstance = null;

  function initLenis() {
    if (typeof Lenis === 'undefined') {
      console.warn('[CONVÉRTICA Motion] Lenis não encontrado.');
      return;
    }

    lenisInstance = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave da Noomo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
      infinite: false
    });

    lenisInstance.on('scroll', ({ scroll, limit }) => {
      const progress = limit > 0 ? scroll / limit : 0;
      onScrollUpdate(progress);
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    console.log('[CONVÉRTICA Motion] Lenis Smooth Scroll operando a 60–120 FPS.');
  }

  // 4. ATUALIZAÇÃO DO STORYTELLING E TRANSIÇÕES POR PROGRESSO DE SCROLL
  function onScrollUpdate(p) {
    // A) Enviar progresso para a Câmera 3D Three.js
    if (typeof window.update3DCameraScroll === 'function') {
      window.update3DCameraScroll(p);
    }

    // B) Transição do Hero Stage (p: 0.00 a 0.04)
    if (heroStage) {
      if (p <= 0.04) {
        const heroAlpha = 1 - (p / 0.04);
        heroStage.style.opacity = heroAlpha;
        heroStage.style.transform = `translateY(${-p * 800}px)`;
        heroStage.style.pointerEvents = heroAlpha > 0.1 ? 'auto' : 'none';
      } else {
        heroStage.style.opacity = 0;
        heroStage.style.pointerEvents = 'none';
      }
    }

    // C) Indicador Scroll to explore desaparece após 2% de rolagem
    if (scrollExplore) {
      scrollExplore.style.opacity = p > 0.02 ? 0 : 0.8;
    }

    // D) Transição de cada capítulo de Storytelling
    chapterElements.forEach(ch => {
      if (!ch.el) return;
      if (p >= ch.start && p <= ch.end) {
        // Cálculo de fade in e fade out dentro do intervalo
        const mid = (ch.start + ch.end) / 2;
        const halfSpan = (ch.end - ch.start) / 2;
        const dist = Math.abs(p - mid);
        const factor = Math.max(0, 1 - (dist / halfSpan));
        // Efeito sutil de elevação e desfoque
        ch.el.style.display = 'block';
        ch.el.style.opacity = factor;
        ch.el.style.filter = `blur(${(1 - factor) * 8}px)`;
        ch.el.style.transform = `translateY(${(1 - factor) * 20}px)`;
      } else {
        ch.el.style.display = 'none';
        ch.el.style.opacity = 0;
      }
    });

    // E) Transição do Footer Cinematográfico (p: 0.97 a 1.00)
    if (cinematicFooter) {
      if (p >= 0.97) {
        cinematicFooter.classList.add('active');
        const footAlpha = (p - 0.97) / 0.03;
        cinematicFooter.style.opacity = footAlpha;
      } else {
        cinematicFooter.classList.remove('active');
        cinematicFooter.style.opacity = 0;
      }
    }
  }

  // 5. NAVEGAÇÃO SUAVE DE ÂNCORAS DO MENU
  const btnMetodo = document.getElementById('btnNavMetodo');
  const btnPilares = document.getElementById('btnNavPilares');

  if (btnMetodo) {
    btnMetodo.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenisInstance) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        lenisInstance.scrollTo(total * 0.45, { duration: 1.5 });
      }
    });
  }

  if (btnPilares) {
    btnPilares.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenisInstance) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        lenisInstance.scrollTo(total * 0.74, { duration: 1.5 });
      }
    });
  }

  // 6. CURSOR LIQUID GLASS INTERATIVO
  const cursorEl = document.getElementById('liquidGlassCursor');
  if (cursorEl && window.innerWidth >= 1024) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      curX += (mouseX - curX) * 0.16;
      curY += (mouseY - curY) * 0.16;
      cursorEl.style.left = `${curX}px`;
      cursorEl.style.top = `${curY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  // 7. SINTETIZADOR DE ÁUDIO WEB PARA O BOTÃO EQUALIZADOR
  const soundBtn = document.getElementById('soundBtn');
  let audioCtx = null;
  let isSoundActive = false;
  let ambientOsc1 = null;
  let ambientOsc2 = null;
  let ambientGain = null;

  function toggleSound() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!isSoundActive) {
      // Iniciar acorde atmosférico sutil (432Hz e 540Hz)
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 1.2);
      ambientGain.connect(audioCtx.destination);

      ambientOsc1 = audioCtx.createOscillator();
      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(432, audioCtx.currentTime);
      ambientOsc1.connect(ambientGain);
      ambientOsc1.start();

      ambientOsc2 = audioCtx.createOscillator();
      ambientOsc2.type = 'sine';
      ambientOsc2.frequency.setValueAtTime(540, audioCtx.currentTime);
      ambientOsc2.connect(ambientGain);
      ambientOsc2.start();

      isSoundActive = true;
      if (soundBtn) soundBtn.classList.add('active');
    } else {
      if (ambientGain) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          if (ambientOsc1) ambientOsc1.stop();
          if (ambientOsc2) ambientOsc2.stop();
        }, 500);
      }
      isSoundActive = false;
      if (soundBtn) soundBtn.classList.remove('active');
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', toggleSound);
  }

  // 8. MODAL DE DIAGNÓSTICO RÁPIDO
  const modal = document.getElementById('diagnosticModal');
  const btnOpenHeader = document.getElementById('btnOpenModalHeader');
  const btnOpenBottom = document.getElementById('btnOpenModalBottom');
  const btnOpenFooter = document.getElementById('btnOpenModalFooter');
  const btnClose = document.getElementById('btnCloseModal');

  function openModal() {
    if (modal) modal.classList.add('open');
  }

  function closeModal() {
    if (modal) modal.classList.remove('open');
  }

  [btnOpenHeader, btnOpenBottom, btnOpenFooter].forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (btnClose) btnClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 9. INICIALIZAÇÃO
  function init() {
    initLenis();
    onScrollUpdate(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
