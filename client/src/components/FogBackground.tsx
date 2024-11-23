import React, { useEffect } from "react";

const FogBackground: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById("fogCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    console.log("FogBackground mounted");
    console.log("Canvas:", document.getElementById("fogCanvas"));

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fogParticles: {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      fogParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + 80,
        speedX: Math.random() * 0.3 - 0.4,
        speedY: Math.random() * 0.3 - 0.2,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    function drawFog() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fogParticles.forEach((p) => {
        const distanceFromEdge = Math.min(
          p.x,
          canvas.width - p.x,
          p.y,
          canvas.height - p.y
        );
        const edgeFadeBuffer = 150;
      
        const opacity = Math.max(
          p.opacity * Math.min(distanceFromEdge / edgeFadeBuffer, 1),
          0
        );
      
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      });

      const buffer = 100;
      fogParticles.forEach((p) => {
        if (p.x > canvas.width + buffer) p.x = -buffer;
        if (p.x < -buffer) p.x = canvas.width + buffer;
        if (p.y > canvas.height + buffer) p.y = -buffer;
        if (p.y < -buffer) p.y = canvas.height + buffer;
      });

      requestAnimationFrame(drawFog);
    }

    drawFog();

    const resizeHandler = () => {
      canvas.width = window.innerWidth + 200;
      canvas.height = window.innerHeight + 200;
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return <canvas id="fogCanvas"></canvas>;
};

export default FogBackground;
