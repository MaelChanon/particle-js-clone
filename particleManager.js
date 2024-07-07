class ParticleManager {
  constructor(
    particlesCount,
    linkLength,
    speed,
    pointsColor,
    lineColor,
    backgroundColor,
    width,
    height
  ) {
    this.particles = [];
    this.pointsColor = pointsColor;
    this.linkLength = linkLength;
    this.speed = speed;
    this.lineColor = lineColor;
    this.backgroundColor = backgroundColor;
    this.width = width;
    this.height = height;
    this.mousePosition = null;
    for (let i = 0; i < particlesCount; i++) {
      this.addParticle();
    }
  }

  addParticle() {
    this.particles.push(
      ParticleManager.#getRandomCordinate(this.width, this.height)
    );
  }
  addParticles(particlesCount) {
    const newParticlesCount = particlesCount - this.particles.length;
    if (newParticlesCount > 0) {
      for (let i = 0; i < newParticlesCount; i++) {
        this.addParticle();
      }
    } else {
      for (let i = 0; i < -newParticlesCount; i++) {
        this.particles.pop();
      }
    }
  }

  updateMousePosition(position) {
    this.mousePosition = position;
  }
  upgradeCoordinate(coordinate) {
    coordinate.x += (coordinate.dx * this.speed) / 5;
    coordinate.y += (coordinate.dy * this.speed) / 5;
    if (coordinate.x > this.width) {
      coordinate.x = 0;
    }
    if (coordinate.x < 0) {
      coordinate.x = this.width;
    }
    if (coordinate.y > this.height) {
      coordinate.y = 0;
    }
    if (coordinate.y < 0) {
      coordinate.y = this.height;
    }
  }
  static #getRandomCordinate(maxX, maxY) {
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      dx: Math.cos(Math.random() * 2 * Math.PI),
      dy: Math.cos(Math.random() * 2 * Math.PI),
    };
  }
}
