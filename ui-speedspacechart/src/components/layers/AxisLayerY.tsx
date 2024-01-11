import type { Store } from "../../types/chartTypes";
import { drawGridY } from "../helpers/drawElements";
import { useCanvas } from "../hooks";

type AxisLayerYProps = {
  width: number;
  height: number;
  store: Store;
};

const AxisLayerY = ({ width, height, store }: AxisLayerYProps) => {
  const canvas = useCanvas(drawGridY, width, height, store);

  return (
    <canvas
      id="axis-layer-y"
      className="absolute"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default AxisLayerY;