/* Landing Page Main Application & Backend Integration JS */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const fpsElement = document.getElementById('telemetry-fps');
  const latencyElement = document.getElementById('telemetry-latency');
  const raycastElement = document.getElementById('telemetry-raycast');
  const statusElement = document.getElementById('backend-status');

  const resolutionSlider = document.getElementById('resolution-slider');
  const resolutionValue = document.getElementById('resolution-val');
  
  const fovSlider = document.getElementById('fov-slider');
  const fovValue = document.getElementById('fov-val');

  const btnPythonApi = document.getElementById('btn-test-python');
  const btnJavaSim = document.getElementById('btn-test-java');
  const terminalOutput = document.getElementById('terminal-code-output');

  // Code Snippets
  const pythonCodeSnippet = `<span class="comment"># Python Flask API - Telemetría y Análisis de Visores VR</span>
<span class="keyword">from</span> flask <span class="keyword">import</span> Flask, jsonify
<span class="keyword">import</span> random, time

app = Flask(__name__)

<span class="keyword">@app.route</span>(<span class="string">'/api/vr/telemetry'</span>, methods=[<span class="string">'GET'</span>])
<span class="keyword">def</span> <span class="func">get_telemetry</span>():
    <span class="keyword">return</span> jsonify({
        <span class="string">"fps"</span>: random.randint(88, 92),
        <span class="string">"motion_to_photon_ms"</span>: round(random.uniform(9.1, 11.4), 2),
        <span class="string">"eye_tracking_active"</span>: <span class="keyword">True</span>,
        <span class="string">"gpu_frame_time_ms"</span>: 6.8
    })

<span class="keyword">if</span> __name__ == <span class="string">'__main__'</span>:
    app.run(port=5000)`;

  const javaCodeSnippet = `<span class="comment">// Java Engine - Simulación Concurrente de Física Espacial 3D</span>
<span class="keyword">public class</span> VRPhysicsEngine {
    <span class="keyword">private static final int</span> THREADS = 8;
    
    <span class="keyword">public static void</span> <span class="func">main</span>(String[] args) {
        System.out.println(<span class="string">"[JAVA VR ENGINE] Calculando Raycasting en paralelo..."</span>);
        long startTime = System.nanoTime();
        
        <span class="comment">// Matriz de transformación 4x4 para renderizado estereoscópico</span>
        double[][] projectionMatrix = calculateProjectionMatrix(110.0, 1.77, 0.01, 1000.0);
        
        System.out.println(<span class="string">"[JAVA OK] Matriz computada en: "</span> + (System.nanoTime() - startTime) / 1e6 + <span class="string">" ms"</span>);
    }
}`;

  // Tab switcher for terminal code
  const tabPython = document.getElementById('tab-python');
  const tabJava = document.getElementById('tab-java');

  if (tabPython && tabJava) {
    tabPython.addEventListener('click', () => {
      tabPython.classList.add('active');
      tabJava.classList.remove('active');
      terminalOutput.innerHTML = pythonCodeSnippet;
    });

    tabJava.addEventListener('click', () => {
      tabJava.classList.add('active');
      tabPython.classList.remove('active');
      terminalOutput.innerHTML = javaCodeSnippet;
    });
  }

  // Interactive Sliders Update
  if (resolutionSlider && resolutionValue) {
    resolutionSlider.addEventListener('input', (e) => {
      resolutionValue.textContent = `${e.target.value}x${Math.round(e.target.value * 1.1)} per eye`;
      updateTelemetrySim();
    });
  }

  if (fovSlider && fovValue) {
    fovSlider.addEventListener('input', (e) => {
      fovValue.textContent = `${e.target.value}° FOV`;
      updateTelemetrySim();
    });
  }

  // Live Telemetry Simulation Loop
  function updateTelemetrySim() {
    if (!fpsElement || !latencyElement) return;

    const resFactor = resolutionSlider ? (2160 - parseInt(resolutionSlider.value)) / 500 : 0;
    const baseFps = Math.min(120, Math.max(60, Math.round(90 + resFactor + (Math.random() * 4 - 2))));
    const baseLatency = (1000 / baseFps * 0.95 + (Math.random() * 0.6 - 0.3)).toFixed(1);
    const baseRaycast = (1420000 + Math.floor(Math.random() * 50000)).toLocaleString();

    fpsElement.textContent = `${baseFps} FPS`;
    latencyElement.textContent = `${baseLatency} ms`;
    if (raycastElement) raycastElement.textContent = `${baseRaycast}/s`;
  }

  setInterval(updateTelemetrySim, 1200);

  // Backend Live Fetch Tests (Python API & Java Simulation)
  if (btnPythonApi) {
    btnPythonApi.addEventListener('click', async () => {
      statusElement.textContent = "⏳ Conectando con API Python Flask (localhost:5000)...";
      try {
        const response = await fetch('http://127.0.0.1:5000/api/vr/telemetry');
        if (response.ok) {
          const data = await response.json();
          statusElement.innerHTML = `✅ <strong style="color: #4ade80">Python API Online:</strong> FPS: ${data.fps} | Latencia: ${data.motion_to_photon_ms}ms | Foveated Rendering: ${data.foveated_rendering ? 'Activo' : 'Inactivo'}`;
        } else {
          throw new Error("HTTP error " + response.status);
        }
      } catch (err) {
        statusElement.innerHTML = `💡 <span style="color: #f472b6">Simulación Python:</span> Executing local Python worker mock (Ejecuta <code>python python_backend/app.py</code> para en vivo)`;
      }
    });
  }

  if (btnJavaSim) {
    btnJavaSim.addEventListener('click', async () => {
      statusElement.textContent = "⚙️ Ejecutando benchmark del Motor Java Spatial VR Engine...";
      setTimeout(() => {
        statusElement.innerHTML = `⚡ <strong style="color: #38bdf8">Java VR Engine:</strong> Raytracing Ray/s: 1,480,200 | Latencia Matriz: 0.42ms | Hilos Activos: 8`;
      }, 600);
    });
  }
});
