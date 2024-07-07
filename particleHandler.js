class ParticleHandler {
  constructor(ParticleManager, ctx) {
    this.particleManager = ParticleManager;
    this.ctx = ctx;
  }
  drawLinks(points, maxRange, color) {
    for (let i = 0; i < points.length; i++) {
      for (let y = i; y < points.length; y++) {
        if (i === y) continue;
        let distance = distance2d(
          points[i].x,
          points[i].y,
          points[y].x,
          points[y].y
        );
        if (distance < maxRange) {
          const alpha = Math.pow(1 - distance / maxRange, 2);
          this.#drawLink(
            points[i].x,
            points[i].y,
            points[y].x,
            points[y].y,
            alpha,
            color
          );
        }
      }
      let distance = this.particleManager.mousePosition
        ? distance2d(
            points[i].x,
            points[i].y,
            this.particleManager.mousePosition.x,
            this.particleManager.mousePosition.y
          )
        : null;
      if (distance && distance < maxRange) {
        const alpha = Math.pow(1 - distance / maxRange, 2);
        this.#drawLink(
          points[i].x,
          points[i].y,
          this.particleManager.mousePosition.x,
          this.particleManager.mousePosition.y,
          alpha,
          color
        );
      }
    }
  }
  #drawLink(x1, y1, x2, y2, globalAlpha, color) {
    this.ctx.strokeStyle = hexToRgb(color, globalAlpha);
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }
  drawCircle(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }
}
