/* Three.js 3D Background Canvas - VR Visor & Cyber Particles */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070913, 0.035);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x6366f1, 3, 20);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xa855f7, 3, 20);
  pointLight2.position.set(-5, -5, 2);
  scene.add(pointLight2);

  // 1. Interactive VR Headset 3D Geometry Group
  const vrGroup = new THREE.Group();

  // Visor Main Body
  const visorGeo = new THREE.BoxGeometry(2.4, 1.2, 1.1, 4, 4, 4);
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f172a,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.2,
    transparent: true,
    opacity: 0.95
  });
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  vrGroup.add(visorMesh);

  // Visor Front Curved Glass Plate
  const glassGeo = new THREE.BoxGeometry(2.35, 1.15, 0.1);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.25,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.85
  });
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  glassMesh.position.z = 0.56;
  vrGroup.add(glassMesh);

  // Side Straps
  const strapMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  
  const strapLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 2.2), strapMat);
  strapLeft.position.set(-1.25, 0, -0.6);
  vrGroup.add(strapLeft);

  const strapRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 2.2), strapMat);
  strapRight.position.set(1.25, 0, -0.6);
  vrGroup.add(strapRight);

  // Glowing Cyber Ring Around VR Visor
  const ringGeo = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 3;
  vrGroup.add(ringMesh);

  const ringGeo2 = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.5 });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.rotation.y = Math.PI / 4;
  vrGroup.add(ringMesh2);

  scene.add(vrGroup);

  // 2. Floating Cyber Particles Grid
  const particlesCount = 800;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const colorPalette = [
    new THREE.Color(0x6366f1),
    new THREE.Color(0xa855f7),
    new THREE.Color(0x06b6d4),
    new THREE.Color(0xec4899)
  ];

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 35;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleSystem);

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) * 0.001;
    mouseY = (e.clientY - windowHalfY) * 0.001;
  });

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth rotation towards mouse
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    vrGroup.rotation.y = elapsedTime * 0.3 + targetX * 2;
    vrGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1 + targetY * 2;
    vrGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.2;

    ringMesh.rotation.z = elapsedTime * 0.6;
    ringMesh2.rotation.x = -elapsedTime * 0.4;

    particleSystem.rotation.y = elapsedTime * 0.05;
    particleSystem.rotation.x = elapsedTime * 0.03;

    renderer.render(scene, camera);
  }

  animate();
});
