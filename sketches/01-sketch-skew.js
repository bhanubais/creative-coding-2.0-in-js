// Import the library
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 1080, 1080 ]
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  let x, y, w, h;
  let angle, rx, ry;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.6;
    h = height * 0.1;

    context.save();
    context.translate(x, y);
    context.strokeStyle = 'blue';

    drawSkewedRect({ context });
    context.stroke();

    context.restore();
  };
};

const drawSkewedRect = ({ context, w = 600, h = 200, degree = -45 }) => {
  const angle = math.degToRad(degree);
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
