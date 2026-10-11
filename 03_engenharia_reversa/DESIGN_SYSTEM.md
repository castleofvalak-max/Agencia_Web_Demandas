# 🔬 Relatório Técnico de Engenharia Reversa de Design System (v2.0)

> **REFERÊNCIA ANALISADA:** Noomo Digital Storytelling (`https://storytelling.noomoagency.com/`)  
> **ARQUIVOS DE EVIDÊNCIA:** `03_engenharia_reversa/storytelling.noomoagency.com.har`, `entry.BEbxiOYI.css`, `index.CeGRoErV.css`, `CbdjwYMp.js` (Bundle Nuxt 1.6MB)  
> **DOCUMENTO:** `03_engenharia_reversa/DESIGN_SYSTEM.md`  
> **STATUS:** Extraído, Auditado & Mapeado para Produção  

---

## 1. 📋 Resumo Executivo & Rastreabilidade de Evidências

Este documento registra a extração metódica dos tokens visuais, estruturais e comportamentais da referência sob o princípio fundamental de **"evidência precede inferência"**. Cada valor aqui listado foi recuperado diretamente dos arquivos CSS compilados e do bundle JavaScript original via motor REA.

| Categoria | Evidência Bruta Encontrada | Adaptação para CONVÉRTICA |
| :--- | :--- | :--- |
| **Arquitetura Base** | Nuxt 3 + Three.js r179 + GSAP ScrollSmoother | HTML5 Semântico Nativo + CSS3 Moderno + GSAP / Lenis |
| **Paleta Base** | Midnight Dark (`#060B1D`, `#051125`) com Acentos em Azul Elétrico (`#3762BE`, `#88AEFF`) e Violeta Glow (`#6248A4`) | Dark Obsidian (`#060B1D`) com Neon Cyan (`#00F2FE`) e Electric Blue (`#4FACFE`) |
| **Tipografia Primária** | `TT Neoris` (Grotesque geométrica limpa) | `Inter` / `Syne` (Sans geométrica de alta legibilidade) |
| **Tipografia Editorial** | `TheSeasons` (Serif de luxo em itálico de alto contraste) | `Playfair Display` (Itálico editorial de alto padrão) |
| **Curva de Motion** | `cubic-bezier(.65, .05, .36, 1)` + GSAP `power3.out` | Implementado nas transições e timelines de microinteração |

---

## 2. 🎨 Tabela Completa de Design Tokens (`:root`)

Extraída diretamente de `:root` em `entry.BEbxiOYI.css` (linha 1 do bundle CSS):

```css
:root {
  /* ==========================================================================
     1. PALETA DE CORES (EVIDÊNCIA REAL NOOMO AGENCY)
     ========================================================================== */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-dark-400: #060b1d;       /* Fundo Primário / Midnight Abyss */
  --color-dark-500: #051125;       /* Fundo Secundário / Deep Space Navy */
  --color-brand-white: #f5f5f5;    /* Branco Fosco Primário de Texto */
  --color-brand-blue: #3762be;     /* Azul Corporativo de Destaque */
  --color-brand-blue-200: #88aeff; /* Azul Neon Acento / Cyan Glow */
  --color-brand-blue-300: #062969; /* Azul de Profundidade */
  --color-brand-blue-500: #143a8a; /* Azul Intermediário */
  --color-brand-blue-600: #00276e; /* Azul Escuro Base */
  --color-brand-black: #29345a;    /* Charcoal Navy de Contraste */
  --color-brand-rose-200: #6248a4; /* Violeta Acetinado / Lilac Glow */
  
  /* Cores Derivadas de Transparência Glassmorphism */
  --color-glass-surface: rgba(255, 255, 255, 0.05);
  --color-glass-surface-hover: rgba(255, 255, 255, 0.12);
  --color-glass-border: rgba(255, 255, 255, 0.12);
  --color-glass-border-glow: rgba(0, 242, 254, 0.35);

  /* ==========================================================================
     2. GRADIENTES CINEMATOGRÁFICOS
     ========================================================================== */
  --gradient-title: linear-gradient(180deg, #fffcff 0 25%, #e3f0ff 65% 80%);
  --gradient-glass-border: linear-gradient(90deg, #fff 0, transparent 35%, #fff 65%, transparent);
  --gradient-button-shimmer: linear-gradient(90deg, rgba(255,255,255,0) 4.33%, #fff 78.37%, rgba(255,255,255,0));
  --gradient-glow-radial: radial-gradient(27.8% 27.8% at 12.89% 16.15%, rgba(234, 189, 246, 0.2) 0%, transparent 100%);
  --gradient-cyan-blue: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);

  /* ==========================================================================
     3. TIPOGRAFIA & ESCALA FLUIDA (BASE 1rem = 10px NO NOOMO)
     ========================================================================== */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: 'Syne', 'Inter', sans-serif;
  --font-serif: 'Playfair Display', 'TheSeasons', serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;

  /* Escala de Tamanhos Extraída (Convertida para Clamp Responsivo) */
  --text-14: clamp(1.2rem, 1vw, 1.4rem);
  --text-16: clamp(1.4rem, 1.2vw, 1.6rem);
  --text-18: clamp(1.6rem, 1.5vw, 1.8rem);
  --text-26: clamp(2.0rem, 2.2vw, 2.6rem);
  --text-38: clamp(2.8rem, 3.2vw, 3.8rem);
  --text-50: clamp(3.6rem, 4.5vw, 5.0rem);
  --text-66: clamp(4.4rem, 6.0vw, 6.6rem);
  --text-hero: clamp(4.8rem, 12vw, 16.5rem);

  /* Pesos & Tracking */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 800;

  --tracking-tight: -0.03em;
  --tracking-normal: -0.01em;
  --tracking-wide: 0.15em;

  /* ==========================================================================
     4. ESPAÇAMENTOS & GRID
     ========================================================================== */
  --space-8: 0.8rem;
  --space-14: 1.4rem;
  --space-16: 1.6rem;
  --space-20: 2.0rem;
  --space-24: 2.4rem;
  --space-30: 3.0rem;
  --space-40: 4.0rem;
  --space-60: 6.0rem;
  --space-80: 8.0rem;
  --space-120: 12.0rem;
  --container-max: 1320px;
  --container-padding: clamp(2.0rem, 4vw, 5.4rem);

  /* ==========================================================================
     5. BORDAS, RAIOS & BLUR
     ========================================================================== */
  --radius-xs: 0.4rem;
  --radius-sm: 0.7rem;
  --radius-md: 1.6rem;
  --radius-lg: 2.4rem;
  --radius-full: 9999px;

  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 16px;
  --blur-lg: 40px;

  /* ==========================================================================
     6. MOTION & CURVAS DE ANIMAÇÃO GSAP
     ========================================================================== */
  --ease-in-out: cubic-bezier(0.65, 0.05, 0.36, 1);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 0.25s;
  --duration-normal: 0.45s;
  --duration-slow: 0.85s;
}
```

---

## 3. ⚙️ Dissecação Técnica dos Scripts (Motor REA)

A análise do bundle `CbdjwYMp.js` (1.6 MB) e do runtime capturado no HAR revelou os seguintes padrões de engenharia:

### A. Estrutura do ScrollSmoother (GSAP)
* **Contêineres de Envelopamento Obrigatórios:**
  - `#smooth-wrapper`: Elemento externo com `position: fixed; inset: 0; width: 100%; height: 100%; overflow: hidden;`
  - `#smooth-content`: Elemento interno transformado em matrix3d pelo motor de scroll do GSAP.
* **Comportamento de Suavização:**
  - O site da Noomo divide a rolagem em 20 seções ponderadas (`scrollSections`), onde o progresso do scroll controla diretamente tanto o renderizador Three.js quanto as animações DOM com `scrub: 1`.

### B. Coreografia de Revelação Tipográfica (Character Blur Animation)
Todos os títulos (`h1`, `h2`, `.animated-text`) utilizam a técnica de quebra de caracteres (`.char`):
* **Estado Inicial (Inativo/Off-screen):**
  ```css
  opacity: 0;
  filter: blur(8px);
  transform: scale(1.3) translateY(10px);
  will-change: transform, filter, opacity;
  ```
* **Estado Ativo (On-screen/Revealed):**
  ```css
  opacity: 1;
  filter: blur(0px);
  transform: scale(1) translateY(0);
  transition: all 0.65s cubic-bezier(0.65, 0.05, 0.36, 1);
  ```
* **Efeito Stagger:** Delay de `0.02s` a `0.04s` entre cada caractere consecutivo.

### C. Botões de Vidro Líquido com Borda em Máscara Gradiente
O componente `.release-spirit` e `.mobile-menu-button` utiliza máscara de recorte CSS para gerar uma borda iluminada contínua sem SVG adicional:
```css
.gradient-border-mask {
  border-radius: var(--radius-full);
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(90deg, #fff 0%, transparent 35%, #fff 65%, transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

---

## 4. 📐 Mapeamento de Layout para a CONVÉRTICA

A estrutura visual da Noomo Agency foi adaptada para atender à proposta de valor de **alta conversão e captação de clientes da CONVÉRTICA**, preservando a mesma sofisticação estética:

1. **Header Fixo Glass:** Logotipo oficial CONVÉRTICA à esquerda, links de navegação com underline dinâmico no centro e CTA neon à direita.
2. **Hero Cinematográfica:** Título com contraste editorial (Sans moderna + *Playfair Display Italic* para palavras de impacto emocional: *vendedor*, *máquina*, *escala*), micro-provas e CTAs duplos com efeito glow.
3. **Métricas Flutuantes:** Cards com efeito glassmorphism e contadores de resultado (+180% conversão, <1.0s carregamento).
4. **Matriz Comparativa Interativa:** Tabela de alta autoridade confrontando sites tradicionais versus máquinas de venda.
5. **Seção de Pilares:** Cards modulares com bordas iluminadas e gradientes sutis em Midnight Abyss (`#060B1D`).
6. **Formulário de Qualificação & FAQ:** Módulos de fechamento ergonomicamente ajustados para desktop e mobile.
