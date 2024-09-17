/* eslint-disable */

import dynamic from "next/dynamic";

const Sketch = dynamic(import("react-p5"), {
    loading: () => <></>,
    ssr: false,
  });

export const SketchComponent = ( data ) => {
    const preload = (p5) => {
    };
  
    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
      p5.colorMode(p5.HSB, p5.width, p5.height, 100);
      p5.fill(255, 0, 255)
      p5.rect(0, 0, p5.width, p5.height)
      p5.noStroke();
      p5.frameRate(60);
    };
  
    const draw = (p5) => {
        p5.fill(0, 0, 0, 1)

        const touch = data.data.sensordata.touch.length != 0 ? data.data.sensordata.touch[0] : {x: 0, y: 0}
        const offsetX = touch.x * 300
        const offsetY = touch.y * 300

        if (!(offsetX == 0 && offsetY == 0)) {
            p5.ellipse(p5.width / 2 + offsetX, p5.height / 2 + offsetY, 10, 10)
        }
    };
  
    const windowResized = (p5) => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  
    return (
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    );
  };
  
  export default SketchComponent;
  