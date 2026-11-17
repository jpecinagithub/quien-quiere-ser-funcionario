# ¿QUIÉN QUIERE SER FUNCIONARIO!! 🎓🏆

Concurso de cultura general por equipos: 20 preguntas difíciles de Ciencia, Arte e Historia. Equipo A contra Equipo B, con temporizador, rebote, puntos y música de concurso generada con Web Audio API.

## Cómo correr

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # build de producción (salida en dist/)
npm run preview  # sirve el build local
```

## Reglas del juego

- **Turnos alternos**: la pregunta 1 la responde el Equipo A, la 2 el B, la 3 el A…
- **60 segundos** para responder la pregunta inicial.
- Si fallan o se acaba el tiempo: **rebote de 30 segundos** para el otro equipo.
- **Acierto inicial: 50 puntos** · **Acierto de rebote: 75 puntos** · Fallo en rebote: 0.
- Después de cada pregunta se muestra la clasificación actualizada (marcador, barras y quién va ganando).
- Al final de las 20 preguntas: pantalla de ganador con trofeo y botón «Jugar de nuevo».

## Detalles

- Las 20 preguntas y sus imágenes están en `src/data/questions.ts`. En cada partida se barajan tanto el orden de las preguntas como el de las opciones.
- Cada pregunta tiene imagen (Wikimedia/Unsplash) con fallback a emoji si la imagen no carga.
- Música de fondo y efectos (acierto, fallo, tick, fanfarria) sintetizados con Web Audio API en `src/audio.ts`. No hay archivos de audio externos. Botón 🔊/🔇 para silenciar.
- Confeti al acertar (canvas-confetti).
- Solo frontend estático, sin backend ni login. Listo para desplegar en Vercel (`npm run build` → `dist/`).
- UI íntegramente en español, responsive (móvil y escritorio).
