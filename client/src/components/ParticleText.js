import { useEffect, useRef } from "react";

function ParticleText() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 250;
    canvas.height = 60;

    // Draw text (hidden)
    ctx.fillStyle = "white";
    ctx.font = "bold 30px Arial";
    ctx.fillText("Casual Wear 👕", 20, 55);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let particles = [];

    for (let y = 0; y < canvas.height; y += 3) {
      for (let x = 0; x < canvas.width; x += 3) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i + 3] > 150) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    }

    let forming = true;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        let targetX, targetY;

        if (forming) {
          targetX = p.baseX;
          targetY = p.baseY;
        } else {
          targetX = p.x + (Math.random() - 0.5) * 80;
          targetY = p.y + (Math.random() - 0.5) * 80;
        }

        // Smooth easing (premium feel)
        p.vx += (targetX - p.x) * 0.02;
        p.vy += (targetY - p.y) * 0.02;

        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.closePath();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Smooth loop timing
    const interval = setInterval(() => {
      forming = !forming;
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        background: "black",
      }}
    />
  );
}

export default ParticleText;