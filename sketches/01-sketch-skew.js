// Import the library
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 1080, 1080 ],
  // animate: true,
  // fps: 1,
  // playbackRate: "throttle"
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  const n = 20;
  const degrees = -30;
  const rects = [];

  for (let i = 0; i < n; i++) {
    const x = width * random.range(0, 0.8);
    const y = height * random.range(0, 0.9);
    const w = width * random.range(0.2, 0.6);
    const h = height * random.range(0.1, 0.4);

    rects.push({ x, y, w, h });
  }

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    rects.forEach(rect => {
      const { x, y, w, h } = rect;
      
      context.save();
      context.translate(x, y);
      context.strokeStyle = 'blue';

      drawSkewedRect({ context, w, h, degrees });
      context.stroke();

      context.restore();
    });

  };
};

const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -45 }) => {
  const angle = math.degToRad(degrees);
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();
  context.translate(-rx * 0.5, -(ry + h) * 0.5);
  
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();

  context.restore();
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
