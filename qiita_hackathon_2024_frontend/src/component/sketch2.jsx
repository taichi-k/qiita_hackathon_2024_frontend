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
      p5.noStroke();
      p5.frameRate(60);
    };
  
    const draw = (p5) => {
      const accel = data.data.sensordata.accel
      p5.fill(accel.z * 500, accel.z * 100, accel.z * 100, 0.3)
      p5.rect(0, 0, p5.width, p5.height)
      p5.fill(255, 0, 255)
      p5.text(accel.z, p5.width / 2, p5.height / 2)
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
  