const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const pointColorInput = document.getElementById("pointsColor");
const lineColorInput = document.getElementById("linkColor");
const backgroundColorInput = document.getElementById("backgroundColor");
const PointCountInput = document.getElementById("pointsCount");
const linkLengthInput = document.getElementById("linkLength");
const speedInput = document.getElementById("speed");

const pointsCountField = document.getElementById("pointsCountField");
const linkLengthField = document.getElementById("linkLengthField");
const speedField = document.getElementById("speedField");
pointsCountField.innerText = PointCountInput.value;
linkLengthField.innerText = linkLengthInput.value;
speedField.innerText = speedInput.value;

const particleManager = new ParticleManager(
  PointCountInput.value,
  linkLengthInput.value,
  speedInput.value,
  pointColorInput.value,
  lineColorInput.value,
  backgroundColorInput.value,
  width,
  height
);
const particleHandler = new ParticleHandler(particleManager, ctx);
function getMousePosition(event) {
  // Get the bounding rectangle of the canvas
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
  const scaleY = canvas.height / rect.height;
  console.log((event.clientX - rect.left) * scaleX);
  particleManager.updateMousePosition({
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  });
}

pointColorInput.addEventListener("input", function () {
  particleManager.pointsColor = this.value;
});
lineColorInput.addEventListener("input", function () {
  particleManager.lineColor = this.value;
});
backgroundColorInput.addEventListener("input", function () {
  particleManager.backgroundColor = this.value;
});
PointCountInput.addEventListener("input", function () {
  particleManager.addParticles(this.value);
  pointsCountField.innerText = this.value;
});
linkLengthInput.addEventListener("input", function () {
  particleManager.linkLength = this.value;
  linkLengthField.innerText = this.value;
});
speedInput.addEventListener("input", function () {
  particleManager.speed = this.value;
  speedField.innerText = this.value;
});

// Add an event listener for mouse movement
canvas.addEventListener("mousemove", getMousePosition);
canvas.addEventListener("mouseout", () => {
  particleManager.updateMousePosition(null);
});

setInterval(() => {
  ctx.fillStyle = particleManager.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particleHandler.drawLinks(
    particleManager.particles,
    particleManager.linkLength,
    particleManager.lineColor
  );
  for (let i = 0; i < particleManager.particles.length; i++) {
    particleHandler.drawCircle(
      particleManager.particles[i].x,
      particleManager.particles[i].y,
      particleManager.pointsColor
    );
    particleManager.upgradeCoordinate(particleManager.particles[i]);
  }
}, 10);
