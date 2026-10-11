/**
 * CONVÉRTICA — 3D CRYSTAL SCENE (Three.js r128)
 * Reprodução fiel da ambientação 3D da Noomo Agency (storytelling.noomoagency.com)
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('[CONVÉRTICA 3D] Three.js não encontrado.');
    return;
  }

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // 1. CONFIGURAÇÃO DO RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. CENA & CÂMERA
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x040814, 0.018);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 16);

  // 3. ILUMINAÇÃO DE ELITE (CYAN, COBALT & VIOLET GLOW)
  const ambientLight = new THREE.AmbientLight(0x0b1736, 1.2);
  scene.add(ambientLight);

  const lightCyan = new THREE.PointLight(0x00f2fe, 3.5, 45);
  lightCyan.position.set(-8, 5, 10);
  scene.add(lightCyan);

  const lightViolet = new THREE.PointLight(0x8b5cf6, 3.0, 45);
  lightViolet.position.set(8, -5, 5);
  scene.add(lightViolet);

  const lightBlue = new THREE.PointLight(0x4facfe, 2.5, 60);
  lightBlue.position.set(0, 10, -15);
  scene.add(lightBlue);

  // 4. CRISTAIS FACETADOS FLUTUANTES (IGUAIS AOS CRISTAIS DO NOOMO)
  const crystals = [];
  const crystalGroup = new THREE.Group();
  scene.add(crystalGroup);

  const crystalConfigs = [
    { x: -5.5, y: -2.0, z: 6, size: 2.2, rotSpeed: 0.006, type: 'ico' },
    { x: 5.8, y: 3.2, z: 2, size: 2.8, rotSpeed: -0.005, type: 'octa' },
    { x: -4.0, y: 4.5, z: -12, size: 3.2, rotSpeed: 0.004, type: 'ico' },
    { x: 6.2, y: -3.8, z: -20, size: 3.5, rotSpeed: -0.007, type: 'octa' },
    { x: -3.0, y: -1.5, z: -35, size: 4.0, rotSpeed: 0.005, type: 'ico' },
    { x: 4.5, y: 2.0, z: -50, size: 4.8, rotSpeed: -0.004, type: 'octa' },
    { x: 0.0, y: -2.0, z: -68, size: 5.5, rotSpeed: 0.006, type: 'ico' },
    { x: -5.0, y: 3.5, z: -85, size: 6.0, rotSpeed: -0.005, type: 'octa' }
  ];

  crystalConfigs.forEach((cfg) => {
    let geom;
    if (cfg.type === 'octa') {
      geom = new THREE.OctahedronGeometry(cfg.size, 0);
    } else {
      geom = new THREE.IcosahedronGeometry(cfg.size, 0);
    }

    // Material de vidro/cristal lapidado com reflexão
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true,
      wireframe: false,
      transparent: true,
      opacity: 0.88
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    // Borda wireframe sutil brilhante em volta do cristal
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireMesh = new THREE.Mesh(geom, wireMat);
    wireMesh.scale.set(1.002, 1.002, 1.002);
    mesh.add(wireMesh);

    crystalGroup.add(mesh);
    crystals.push({
      mesh: mesh,
      baseX: cfg.x,
      baseY: cfg.y,
      baseZ: cfg.z,
      rotSpeed: cfg.rotSpeed
    });
  });

  // 5. CAMPO DE POEIRA CÓSMICA / ESTRELAS DE PROFUNDIDADE
  const particleCount = 1800;
  const particleGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colCyan = new THREE.Color(0x00f2fe);
  const colViolet = new THREE.Color(0x8b5cf6);
  const colWhite = new THREE.Color(0xffffff);

  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;
    positions[idx] = (Math.random() - 0.5) * 60;
    positions[idx + 1] = (Math.random() - 0.5) * 60;
    positions[idx + 2] = Math.random() * -120 + 20;

    let c = colWhite;
    const r = Math.random();
    if (r < 0.45) c = colCyan;
    else if (r < 0.85) c = colViolet;

    colors[idx] = c.r;
    colors[idx + 1] = c.g;
    colors[idx + 2] = c.b;
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  const particleSystem = new THREE.Points(particleGeom, particleMat);
  scene.add(particleSystem);

  // 6. INTEGRAÇÃO COM SCROLL & PARALLAX DO MOUSE
  let scrollProgress = 0;
  let targetCameraZ = 16;
  let currentCameraZ = 16;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Função exportada para ser chamada pelo motion.js conforme o scroll ocorre
  window.update3DCameraScroll = function (progress) {
    scrollProgress = Math.max(0, Math.min(1, progress));
    // A câmera viaja de Z = 16 até Z = -85
    targetCameraZ = 16 - scrollProgress * 105;
  };

  // 7. LOOP DE RENDERIZAÇÃO A 60–120 FPS
  function animate() {
    requestAnimationFrame(animate);

    // Interpolação suave de câmera (LERP)
    currentCameraZ += (targetCameraZ - currentCameraZ) * 0.08;
    camera.position.z = currentCameraZ;

    // Parallax do mouse
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    camera.position.x = mouseX * 1.5;
    camera.position.y = -mouseY * 1.2;
    camera.lookAt(mouseX * 0.5, -mouseY * 0.5, currentCameraZ - 20);

    // Rotação contínua dos cristais
    crystals.forEach((c) => {
      c.mesh.rotation.x += c.rotSpeed;
      c.mesh.rotation.y += c.rotSpeed * 1.3;
      c.mesh.rotation.z += c.rotSpeed * 0.5;
    });

    // Rotação suave da poeira cósmica
    particleSystem.rotation.z += 0.0003;

    renderer.render(scene, camera);
  }
  animate();

  // 8. RESIZE RESPONSIVO
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  console.log('[CONVÉRTICA 3D] Cena Three.js (Cristais e Profundidade) ativa.');
})();
