package java_backend;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * VRPhysicsEngine.java
 * Motor de Simulación Concurrente de Física Espacial y Matriz de Transformación 3D para VR.
 * Demuestra el uso de la Ingeniería Informática (Sistemas Concurrentes y Computación Gráfica) en Realidad Virtual.
 */
public class VRPhysicsEngine {

    private static final int THREAD_COUNT = 8;
    private static final int RAYCAST_OPERATIONS = 1_000_000;

    public static void main(String[] args) {
        System.out.println("==================================================================");
        System.out.println("☕ [JAVA VR ENGINE] Motor de Simulación Espacial - Ing. Informática");
        System.out.println("==================================================================");

        long startTime = System.currentTimeMillis();

        // 1. Cálculo de Matriz de Proyección Estereoscópica (Ojo Izquierdo y Derecho)
        System.out.println("\n[1/3] Calculando Matrices de Proyección 4x4 Estereoscópicas...");
        double[][] leftEyeMatrix = createProjectionMatrix(110.0, 1.77, 0.01, 1000.0, -0.032);
        double[][] rightEyeMatrix = createProjectionMatrix(110.0, 1.77, 0.01, 1000.0, 0.032);
        
        printMatrix("Matriz Vista Ojo Izquierdo", leftEyeMatrix);

        // 2. Simulación de Raycasting Concurrente Multi-hilo
        System.out.println("\n[2/3] Iniciando Benchmark de Raycasting Concurrente (" + THREAD_COUNT + " Hilos)...");
        ExecutorService executor = Executors.newFixedThreadPool(THREAD_COUNT);

        for (int i = 0; i < THREAD_COUNT; i++) {
            final int threadId = i;
            executor.submit(() -> simulateRaycastingWorker(threadId, RAYCAST_OPERATIONS / THREAD_COUNT));
        }

        executor.shutdown();
        try {
            if (executor.awaitTermination(5, TimeUnit.SECONDS)) {
                System.out.println("✅ Raycasting completado con éxito en los " + THREAD_COUNT + " hilos.");
            }
        } catch (InterruptedException e) {
            System.err.println("❌ Error en la ejecución de hilos: " + e.getMessage());
        }

        // 3. Resultado de Métricas y Benchmark
        long elapsedTime = System.currentTimeMillis() - startTime;
        double raysPerSecond = (RAYCAST_OPERATIONS / (elapsedTime / 1000.0));

        System.out.println("\n==================================================================");
        System.out.println("📊 RESUMEN DE RENDIMIENTO (MOTOR JAVA VR)");
        System.out.println("==================================================================");
        System.out.println(" • Rayos Calculados Totales : " + String.format("%,d", RAYCAST_OPERATIONS));
        System.out.println(" • Tiempo Total Procesamiento: " + elapsedTime + " ms");
        System.out.println(" • Capacidad de Raycast/seg  : " + String.format("%,.0f", raysPerSecond) + " ops/sec");
        System.out.println(" • Latencia por Frame 3D     : " + String.format("%.2f", (elapsedTime / 90.0)) + " ms/frame (Objetivo: < 11.1ms)");
        System.out.println("==================================================================\n");
    }

    /**
     * Crea una Matriz de Proyección Perspectiva 4x4 con Offset Estereoscópico (IPD)
     */
    private static double[][] createProjectionMatrix(double fovY, double aspect, double zNear, double zFar, double ipdOffset) {
        double[][] m = new double[4][4];
        double tanHalfFov = Math.tan(Math.toRadians(fovY / 2.0));

        m[0][0] = 1.0 / (aspect * tanHalfFov);
        m[1][1] = 1.0 / tanHalfFov;
        m[2][2] = -(zFar + zNear) / (zFar - zNear);
        m[2][3] = -1.0;
        m[3][2] = -(2.0 * zFar * zNear) / (zFar - zNear);
        m[0][3] = ipdOffset; // Offset de Distancia Interpupilar (IPD)

        return m;
    }

    /**
     * Simula la intersección de rayos 3D en el espacio para física o detección de colisiones.
     */
    private static void simulateRaycastingWorker(int workerId, int count) {
        double dummyResult = 0.0;
        for (int i = 0; i < count; i++) {
            double originX = Math.sin(i * 0.01) * 10.0;
            double dirX = Math.cos(i * 0.01);
            dummyResult += Math.sqrt(originX * originX + dirX * dirX);
        }
    }

    /**
     * Imprime una matriz 4x4 formateada
     */
    private static void printMatrix(String title, double[][] m) {
        System.out.println("--- " + title + " ---");
        for (int i = 0; i < 4; i++) {
            System.out.print("  [ ");
            for (int j = 0; j < 4; j++) {
                System.out.printf("%8.3f ", m[i][j]);
            }
            System.out.println("]");
        }
    }
}
