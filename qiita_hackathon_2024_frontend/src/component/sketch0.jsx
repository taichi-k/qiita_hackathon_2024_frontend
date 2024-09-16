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

    const barWidth = 20;
    let lastBar = -1;
  
    const draw = (p5) => {
      let whichBar = p5.mouseX / barWidth;
      if (whichBar !== lastBar) {
        let barX = whichBar * barWidth;
        p5.fill(barX, p5.mouseY, 66);
        p5.rect(barX, 0, barWidth, p5.height);
        lastBar = whichBar;
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
  