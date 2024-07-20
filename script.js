document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  let circleRadius = 100;
  let targetRadius = 100;
  const maxRadius = 200;
  const growthRate = 20;
  const shrinkRate = 5;

  function drawDarkLine(x, y) {
    context.strokeStyle = "rgba(255, 255, 255, 1)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x, y + 100);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  function drawCircle(x, y, radius) {
    context.strokeStyle = "rgba(255, 255, 255, 1)";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();
  }

  function draw(x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawDarkLine(x, y);
    drawCircle(x, y, circleRadius);
  }

  function updateRadius() {
    if (circleRadius < targetRadius) {
      circleRadius = Math.min(circleRadius + growthRate, targetRadius);
    } else if (circleRadius > targetRadius) {
      circleRadius = Math.max(circleRadius - shrinkRate, targetRadius);
    }
  }

  function animate() {
    mouseX += (targetX - mouseX) * 0.04;
    mouseY += (targetY - mouseY) * 0.04;

    updateRadius();

    draw(mouseX, mouseY);
    requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  document.addEventListener("click", () => {
    targetRadius = maxRadius;
    setTimeout(() => {
      targetRadius = 100;
    }, 200);
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  animate();
});
