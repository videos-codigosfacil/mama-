document.addEventListener("DOMContentLoaded", () => {
  const surpriseBtn = document.getElementById("btnSorpresa");
  const mensajeBtn = document.getElementById("btnMensaje");
  const letraBtn = document.getElementById("btnLetra");
  const surpriseDiv = document.getElementById("surprise");
  const mensajeDiv = document.getElementById("mensajeEspecial");
  const letraDiv = document.getElementById("letraCancion");

  const bgAudio = document.getElementById("bgAudio");
  const coldeAudio = document.getElementById("coldeAudio");

  let isSurpriseVisible = false;
  let isMessageVisible = false;
  let isTyping = false;
  let isLetraVisible = false;
  let typingInterval = null;

  // BOTÓN SORPRESA
  surpriseBtn.addEventListener("click", () => {
    surpriseDiv.classList.toggle("hidden");
    isSurpriseVisible = !isSurpriseVisible;
    surpriseBtn.textContent = isSurpriseVisible ? "Cerrar Sorpresa 🎁" : "Ver Sorpresa 🎁";
  });

  // BOTÓN MENSAJE
  mensajeBtn.addEventListener("click", () => {
    if (isTyping) return;

    if (isMessageVisible) {
      clearInterval(typingInterval);
      mensajeDiv.textContent = "";
      mensajeDiv.classList.add("hidden");
      mensajeBtn.textContent = "Leer Mensaje Especial 💌";
      isMessageVisible = false;
      isTyping = false;
    } else {
      const mensaje = `Querida Mamá:\n\nGracias por tu amor infinito,\npor cada abrazo, cada palabra, cada sacrificio.\nEres el corazón de esta familia.\n\n¡Te amo con todo mi corazón! 💖`;
      mensajeDiv.textContent = "";
      mensajeDiv.classList.remove("hidden");
      mensajeBtn.textContent = "Cerrar Mensaje 💌";
      isTyping = true;
      let index = 0;

      typingInterval = setInterval(() => {
        mensajeDiv.textContent += mensaje[index];
        index++;
        if (index >= mensaje.length) {
          clearInterval(typingInterval);
          isTyping = false;
          isMessageVisible = true;
        }
      }, 40);
    }
  });

  // BOTÓN LETRA DE CANCIÓN
  letraBtn.addEventListener("click", () => {
    if (isLetraVisible) {
      letraDiv.classList.add("hidden");
      letraBtn.textContent = "Ver Letra de la Canción 🎶";
      isLetraVisible = false;
      coldeAudio.pause();
      coldeAudio.currentTime = 0;
      bgAudio.play();
    } else {
      letraDiv.classList.remove("hidden");
      letraBtn.textContent = "Cerrar Letra 🎶";
      isLetraVisible = true;
      bgAudio.pause();
      coldeAudio.play();
    }
  });

  // ANIMACIÓN DE ESTRELLAS + LLUVIA + FUGACES
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext('2d');
  const stars = [], rain = [], shootingStars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }

  for (let i = 0; i < 150; i++) {
    rain.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 5 + 5
    });
  }

  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 10 + 6,
      angle: Math.PI / 4,
      opacity: 1
    });
    setTimeout(() => shootingStars.shift(), 1000);
  }

  setInterval(() => {
    if (shootingStars.length < 2) {
      createShootingStar();
    }
  }, 3000 + Math.random() * 3000);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(173,216,230,0.6)";
    ctx.lineWidth = 1.2;
    for (let drop of rain) {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();
      drop.y += drop.speed;
      if (drop.y > canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
    }

    for (let star of shootingStars) {
      const dx = Math.cos(star.angle) * star.length;
      const dy = Math.sin(star.angle) * star.length;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x + dx, star.y + dy);
      ctx.strokeStyle = `rgba(255,255,255,${star.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.opacity -= 0.02;
    }

    requestAnimationFrame(animate);
  }

  animate();

  // SINCRONIZACIÓN DE LETRA CON AUDIO
  const letraSincronizada = [
    { tiempo: 14, texto: "Como una estrella\nJust like a star" },
    { tiempo: 24, texto: "Me quedo aquí por mucho tiempo\nI stay here for long" },
    { tiempo: 34, texto: "Mientras todo cambia\nWhile everything is changed" },
    { tiempo: 40, texto: "Simplemente no puedo evitar quedarme, oh\nI just cannot help but stay, oh" },
    { tiempo: 46, texto: "Como una estrella\nJust like a star" },
    { tiempo: 48, texto: "Ni siquiera me veo envejecer\nI don't even see myself get old" },
    { tiempo: 50, texto: "Es difícil de explicar\nIt's hard to be explained" },
    { tiempo: 54, texto: "Quiero escapar\nI wanna break away" },
    { tiempo: 60, texto: "Sigo orando\nI keep on praying\n¿Oh, por qué?\nOh, why?" },
    { tiempo: 64, texto: "Si mis lágrimas caen\nIf my tears fall" },
    { tiempo: 70, texto: "Abajo en mi universo\nDown in my universe" },
    { tiempo: 74, texto: "Se convierte en un nuevo mundo\nTurns into a new world" },
    { tiempo: 79, texto: "Es hora de encontrar mi camino de regreso a casa\nTime to find my way back home" },
    { tiempo: 83, texto: "Mil años pasados\nThousand years gone" },
    { tiempo: 87, texto: "Ya no siento nada\nI don't feel nothing no more" },
    { tiempo: 94, texto: "Tú eres el que anhelo\nYou're the one I long for" },
    { tiempo: 99, texto: "Ahora es el momento de ir\nNow it's time to go" },
    { tiempo: 104, texto: "Floto como una estrella\nI hover like a star" }
  ];

  let lineaActual = 0;

  coldeAudio.addEventListener("timeupdate", () => {
    if (lineaActual < letraSincronizada.length) {
      if (coldeAudio.currentTime >= letraSincronizada[lineaActual].tiempo) {
        letraDiv.textContent = letraSincronizada[lineaActual].texto;
        lineaActual++;
      }
    }
  });

  coldeAudio.addEventListener("play", () => {
    lineaActual = 0;
    letraDiv.textContent = "";
  });
});
const letraSincronizada = [
    { tiempo: 0, texto: "Como una estrella\nJust like a star" },
    { tiempo: 5, texto: "Me quedo aquí por mucho tiempo\nI stay here for long" },
    { tiempo: 10, texto: "Mientras todo cambia\nWhile everything is changed" },
    { tiempo: 15, texto: "Simplemente no puedo evitar quedarme, oh\nI just cannot help but stay, oh" },
    { tiempo: 22, texto: "Como una estrella\nJust like a star" },
    { tiempo: 28, texto: "Ni siquiera me veo envejecer\nI don't even see myself get old" },
    { tiempo: 34, texto: "Es difícil de explicar\nIt's hard to be explained" },
    { tiempo: 40, texto: "Quiero escapar\nI wanna break away" },
    { tiempo: 44, texto: "Sigo orando\nI keep on praying\n¿Oh, por qué?\nOh, why?" },
    { tiempo: 50, texto: "Si mis lágrimas caen\nIf my tears fall" },
    { tiempo: 55, texto: "Abajo en mi universo\nDown in my universe" },
    { tiempo: 60, texto: "Se convierte en un nuevo mundo\nTurns into a new world" },
    { tiempo: 66, texto: "Es hora de encontrar mi camino de regreso a casa\nTime to find my way back home" },
    { tiempo: 73, texto: "Mil años pasados\nThousand years gone" },
    { tiempo: 78, texto: "Ya no siento nada\nI don't feel nothing no more" },
    { tiempo: 83, texto: "Tú eres el que anhelo\nYou're the one I long for" },
    { tiempo: 88, texto: "Ahora es el momento de ir\nNow it's time to go" },
    { tiempo: 92, texto: "Floto como una estrella\nI hover like a star" }
];
let lineaActual = 0;

coldeAudio.addEventListener("timeupdate", () => {
    // Verifica si el tiempo actual ha pasado el tiempo de la línea que se debe mostrar
    if (lineaActual < letraSincronizada.length) {
        if (coldeAudio.currentTime >= letraSincronizada[lineaActual].tiempo) {
            // Muestra la letra de la línea actual
            letraDiv.textContent = letraSincronizada[lineaActual].texto;
            // Aumenta el índice para la siguiente línea
            lineaActual++;
        }
    }
});
coldeAudio.addEventListener("play", () => {
    lineaActual = 0;  // Reinicia el índice cuando la canción comienza
    letraDiv.textContent = "";  // Limpia la letra
});
letraBtn.addEventListener("click", () => {
  if (isLetraVisible) {
    // Oculta la letra y detiene la canción de Colde
    letraDiv.classList.add("hidden");
    letraBtn.textContent = "Ver Letra de la Canción 🎶";
    isLetraVisible = false;

    // Detiene y reinicia el audio de Colde
    coldeAudio.pause();
    coldeAudio.currentTime = 0;

    // Reanuda el audio de fondo
    bgAudio.play();

  } else {
    // Muestra la letra y reproduce la canción de Colde
    letraDiv.classList.remove("hidden");
    letraBtn.textContent = "Cerrar Letra 🎶";
    isLetraVisible = true;

    // Pausa el audio de fondo
    bgAudio.pause();

    // Reproduce el audio de Colde
    coldeAudio.play();
  }
});
coldeAudio.addEventListener("play", () => {
  bgAudio.pause(); // Pausar audio de fondo cuando el de Colde se reproduce
});
coldeAudio.addEventListener("ended", () => {
  bgAudio.play(); // Reanuda el audio de fondo cuando termina el de Colde
});
coldeAudio.addEventListener("play", () => {
  bgAudio.volume = 0; // lo silencia completamente
});

coldeAudio.addEventListener("pause", () => {
  bgAudio.volume = 1; // vuelve al volumen normal
});

coldeAudio.addEventListener("ended", () => {
  bgAudio.volume = 1;
});
document.addEventListener("DOMContentLoaded", () => {
  const btnColde = document.getElementById("btnColde");
  const letraDiv = document.getElementById("letraCancion");
  const coldeAudio = document.getElementById("coldeAudio");
  const bgAudio = document.getElementById("bgAudio");

  const letraSincronizada = [
    { tiempo: 0, texto: "Como una estrella\nJust like a star" },
    { tiempo: 5, texto: "Me quedo aquí por mucho tiempo\nI stay here for long" },
    { tiempo: 10, texto: "Mientras todo cambia\nWhile everything is changed" },
    { tiempo: 15, texto: "Simplemente no puedo evitar quedarme, oh\nI just cannot help but stay, oh" },
    { tiempo: 22, texto: "Como una estrella\nJust like a star" },
    { tiempo: 28, texto: "Ni siquiera me veo envejecer\nI don't even see myself get old" },
    { tiempo: 34, texto: "Es difícil de explicar\nIt's hard to be explained" },
    { tiempo: 40, texto: "Quiero escapar\nI wanna break away" },
    { tiempo: 44, texto: "Sigo orando\nI keep on praying\n¿Oh, por qué?\nOh, why?" },
    { tiempo: 50, texto: "Si mis lágrimas caen\nIf my tears fall" },
    { tiempo: 55, texto: "Abajo en mi universo\nDown in my universe" },
    { tiempo: 60, texto: "Se convierte en un nuevo mundo\nTurns into a new world" },
    { tiempo: 66, texto: "Es hora de encontrar mi camino de regreso a casa\nTime to find my way back home" },
    { tiempo: 73, texto: "Mil años pasados\nThousand years gone" },
    { tiempo: 78, texto: "Ya no siento nada\nI don't feel nothing no more" },
    { tiempo: 83, texto: "Tú eres el que anhelo\nYou're the one I long for" },
    { tiempo: 88, texto: "Ahora es el momento de ir\nNow it's time to go" },
    { tiempo: 92, texto: "Floto como una estrella\nI hover like a star" }
  ];

  let lineaActual = 0;

  btnColde.addEventListener("click", () => {
    bgAudio.pause();
    coldeAudio.currentTime = 0;
    letraDiv.classList.remove("hidden");
    letraDiv.textContent = "";
    coldeAudio.play();
  });

  coldeAudio.addEventListener("timeupdate", () => {
    if (lineaActual < letraSincronizada.length) {
      if (coldeAudio.currentTime >= letraSincronizada[lineaActual].tiempo) {
        letraDiv.textContent = letraSincronizada[lineaActual].texto;
        lineaActual++;
      }
    }
  });

  coldeAudio.addEventListener("play", () => {
    lineaActual = 0;
    letraDiv.textContent = "";
  });

  coldeAudio.addEventListener("ended", () => {
    bgAudio.play();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const btnLetraYMusica = document.getElementById("btnLetraYMusica");
  const letraDiv = document.getElementById("letraCancion");
  const coldeAudio = document.getElementById("coldeAudio");
  const bgAudio = document.getElementById("bgAudio");

  const letraSincronizada = [
    { tiempo: 0, texto: "Como una estrella\nJust like a star" },
    { tiempo: 5, texto: "Me quedo aquí por mucho tiempo\nI stay here for long" },
    { tiempo: 10, texto: "Mientras todo cambia\nWhile everything is changed" },
    { tiempo: 15, texto: "Simplemente no puedo evitar quedarme, oh\nI just cannot help but stay, oh" },
    { tiempo: 22, texto: "Como una estrella\nJust like a star" },
    { tiempo: 28, texto: "Ni siquiera me veo envejecer\nI don't even see myself get old" },
    { tiempo: 34, texto: "Es difícil de explicar\nIt's hard to be explained" },
    { tiempo: 40, texto: "Quiero escapar\nI wanna break away" },
    { tiempo: 44, texto: "Sigo orando\nI keep on praying\n¿Oh, por qué?\nOh, why?" },
    { tiempo: 50, texto: "Si mis lágrimas caen\nIf my tears fall" },
    { tiempo: 55, texto: "Abajo en mi universo\nDown in my universe" },
    { tiempo: 60, texto: "Se convierte en un nuevo mundo\nTurns into a new world" },
    { tiempo: 66, texto: "Es hora de encontrar mi camino de regreso a casa\nTime to find my way back home" },
    { tiempo: 73, texto: "Mil años pasados\nThousand years gone" },
    { tiempo: 78, texto: "Ya no siento nada\nI don't feel nothing no more" },
    { tiempo: 83, texto: "Tú eres el que anhelo\nYou're the one I long for" },
    { tiempo: 88, texto: "Ahora es el momento de ir\nNow it's time to go" },
    { tiempo: 92, texto: "Floto como una estrella\nI hover like a star" }
  ];

  let letraVisible = false;
  let lineaActual = 0;

  btnLetraYMusica.addEventListener("click", () => {
    if (letraVisible) {
      letraDiv.classList.add("hidden");
      btnLetraYMusica.textContent = "Ver Letra y Escuchar Canción 🎶";
      coldeAudio.pause();
      coldeAudio.currentTime = 0;
      bgAudio.play();
      letraVisible = false;
    } else {
      bgAudio.pause();
      coldeAudio.currentTime = 0;
      letraDiv.classList.remove("hidden");
      btnLetraYMusica.textContent = "Ocultar Letra y Pausar Canción ❌";
      coldeAudio.play();
      letraVisible = true;
    }
  });

  coldeAudio.addEventListener("play", () => {
    lineaActual = 0;
    letraDiv.textContent = "";
  });

  coldeAudio.addEventListener("timeupdate", () => {
    if (lineaActual < letraSincronizada.length) {
      if (coldeAudio.currentTime >= letraSincronizada[lineaActual].tiempo) {
        letraDiv.textContent = letraSincronizada[lineaActual].texto;
        lineaActual++;
      }
    }
  });

  coldeAudio.addEventListener("ended", () => {
    letraDiv.classList.add("hidden");
    btnLetraYMusica.textContent = "Ver Letra y Escuchar Canción 🎶";
    bgAudio.play();
    letraVisible = false;
  });
});
