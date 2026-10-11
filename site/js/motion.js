/**
 * CONVÉRTICA — WEB & DEMAND ENGINE
 * Coreografia de Movimento de Elite (Motion Lab)
 * Baseado no Motor REA (Lenis Smooth Scroll + GSAP ScrollTrigger 60-120 FPS)
 */

(function () {
  'use strict';

  // 1. VERIFICAÇÃO DE PREFERS-REDUCED-MOTION
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. REGISTRO DE PLUGINS GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 3. INICIALIZAÇÃO DO LENIS SMOOTH SCROLL (60–120 FPS)
  let lenisInstance = null;

  function initLenis() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') {
      console.log('[CONVÉRTICA Motion] Lenis desativado por prefers-reduced-motion ou ausência da lib.');
      return;
    }

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave da Noomo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.6,
      infinite: false,
    });

    // Sincronização estrita de frame rate entre Lenis e ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll suave inteligente para todas as âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenisInstance.scrollTo(targetEl, {
              offset: -70,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        }
      });
    });

    console.log('[CONVÉRTICA Motion] Lenis Smooth Scroll operando a 60–120 FPS.');
  }

  // 4. ANIMAÇÕES GSAP SCROLLTRIGGER (REA TIMELINES)
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    if (prefersReducedMotion) {
      // Apresentação estática imediata para acessibilidade total
      gsap.set(['.hero-section *', '.metric-card', '.comparison-table tr', '.service-card', '.faq-item', '.cta-box'], {
        opacity: 1,
        y: 0,
        filter: 'none'
      });
      return;
    }

    // A) REVELAÇÃO DA HERO SECTION (TIMELINE CINEMATOGRÁFICA)
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.9 }
    });

    heroTl
      .fromTo('.header-glass', 
        { y: -30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7 }
      )
      .fromTo('.hero-section .badge-eyebrow',
        { y: 20, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
        '-=0.4'
      )
      .fromTo('.hero-title',
        { y: 35, opacity: 0, filter: 'blur(10px)', scale: 1.02 },
        { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.1, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        '-=0.6'
      )
      .fromTo('.hero-subtitle',
        { y: 25, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
        '-=0.7'
      )
      .fromTo('.hero-actions .btn-primary, .hero-actions .btn-secondary',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
        '-=0.5'
      )
      .fromTo('.micro-proofs .proof-item',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        '-=0.4'
      );

    // B) PAINEL DE MÉTRICAS COM CONTADOR ANIMADO
    ScrollTrigger.create({
      trigger: '.metrics-section',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo('.metric-card',
          { y: 35, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.12, duration: 0.8, ease: 'power2.out' }
        );

        // Contador de demanda (+380%)
        const demandCard = document.querySelector('.metric-card:nth-child(2) .metric-value');
        if (demandCard) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 380,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              demandCard.textContent = `+${Math.round(obj.val)}%`;
            }
          });
        }

        // Contador de retenção (98%)
        const retentionCard = document.querySelector('.metric-card:nth-child(3) .metric-value');
        if (retentionCard) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 98,
            duration: 2.0,
            ease: 'power2.out',
            onUpdate: () => {
              retentionCard.textContent = `${Math.round(obj.val)}%`;
            }
          });
        }
      }
    });

    // C) MATRIZ COMPARATIVA (FADE-UP STAGGERED)
    gsap.fromTo('.comparison-table tbody tr',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.comparison-table-wrapper',
          start: 'top 80%',
          once: true
        }
      }
    );

    // D) OS 5 PILARES DE CONVERSÃO (STAGGER ELEVATION)
    gsap.fromTo('#metodo .service-card',
      { y: 40, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.14,
        duration: 0.85,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: '#metodo .services-grid',
          start: 'top 82%',
          once: true
        }
      }
    );

    // E) MODELOS DE SOLUÇÕES (FORMATOS A, B, C)
    gsap.fromTo('#solucoes .service-card',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#solucoes .services-grid',
          start: 'top 80%',
          once: true
        }
      }
    );

    // F) DEPOIMENTOS & CASOS DE SUCESSO
    gsap.fromTo('#resultados .service-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#resultados .services-grid',
          start: 'top 80%',
          once: true
        }
      }
    );

    // G) FAQ ESTRATÉGICO
    gsap.fromTo('.faq-item',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          once: true
        }
      }
    );

    // H) FECHAMENTO MAGNÉTICO & FORMULÁRIO
    gsap.fromTo('.cta-box',
      { y: 45, opacity: 0, scale: 0.98, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.0,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 75%',
          once: true
        }
      }
    );
  }

  // 5. AMBIENT CURSOR GLOW (DESKTOP INTERACTIVE LANTERN)
  function initAmbientGlow() {
    if (window.innerWidth < 992 || prefersReducedMotion) return;

    const ambientLantern = document.createElement('div');
    ambientLantern.className = 'ambient-lantern';
    ambientLantern.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, rgba(139, 92, 246, 0.03) 40%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      will-change: transform;
      transition: opacity 0.4s ease;
      opacity: 0;
    `;
    document.body.appendChild(ambientLantern);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        ambientLantern.style.opacity = '1';
      }
    });

    function renderLantern() {
      // Interpolação linear suave (LERP) a 60 FPS
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      ambientLantern.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderLantern);
    }
    requestAnimationFrame(renderLantern);
  }

  // 6. GESTÃO DE CICLO DE VIDA & ANTI-LEAK
  function setupLifecycle() {
    // Pausar animações pesadas e RAF quando a aba estiver em segundo plano
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (lenisInstance) lenisInstance.stop();
      } else {
        if (lenisInstance) lenisInstance.start();
      }
    });

    // Cleanup global caso a página seja desmontada/recarregada
    window.addEventListener('beforeunload', () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    });
  }

  // 7. BOOTSTRAP DO MOTION LAB
  function init() {
    initLenis();
    initAnimations();
    initAmbientGlow();
    setupLifecycle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
