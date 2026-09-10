"""
Python Flask Backend API - VR Telemetry & Analytics Service
Proyecto: Realidad Virtual & Ingeniería Informática
"""

from flask import Flask, jsonify, request
import random
import time

app = Flask(__name__)

# Middleware CORS manual para permitir peticiones desde la Landing Page HTML
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
    return response

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "service": "Python VR Telemetry & Analytics API",
        "status": "online",
        "version": "1.0.0",
        "career": "Ingeniería Informática",
        "endpoints": [
            "/api/vr/telemetry",
            "/api/vr/analytics"
        ]
    })

@app.route('/api/vr/telemetry', methods=['GET'])
def get_telemetry():
    """
    Simula la recolección de datos de sensores y renderizado de un visor VR en tiempo real.
    """
    fps = random.randint(88, 92)
    latency_ms = round(random.uniform(8.5, 11.8), 2)
    gpu_usage = round(random.uniform(72.0, 88.5), 1)
    
    return jsonify({
        "timestamp": time.time(),
        "fps": fps,
        "motion_to_photon_ms": latency_ms,
        "foveated_rendering": True,
        "gpu_usage_percent": gpu_usage,
        "eye_tracking_active": True,
        "spatial_anchors": 14,
        "status": "OPTIMAL" if latency_ms < 12 else "WARNING"
    })

@app.route('/api/vr/analytics', methods=['GET'])
def get_analytics():
    """
    Devuelve información analítica sobre la relación de la Realidad Virtual con la Ingeniería Informática.
    """
    return jsonify({
        "career": "Ingeniería Informática",
        "core_domains_in_vr": {
            "computer_graphics": "Renderizado esteroscópico 3D y Shaders HLSL/GLSL",
            "realtime_systems": "Optimización de latencia Motion-to-Photon (<20ms)",
            "artificial_intelligence": "Foveated rendering guiado por Eye-Tracking e IA",
            "human_computer_interaction": "Interfaces espaciales (Spatial UI) y Hand Tracking 3D",
            "game_engines": "Desarrollo de pipelines en Unreal Engine, Unity y WebXR"
        },
        "performance_metrics": {
            "target_refresh_rate_hz": 90,
            "max_tolerable_latency_ms": 20.0,
            "raycasting_operations_per_sec": "1,450,000+"
        }
    })

if __name__ == '__main__':
    print("🚀 Servidor API Python VR iniciado en http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000, debug=True)
