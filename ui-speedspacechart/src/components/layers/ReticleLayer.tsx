import React, { useEffect, useRef, useState } from 'react';
import type { TrainDetails, Store } from '../../types/chartTypes';
import { drawCursor } from '../helpers/drawElements/reticle';
import DetailsBox from '../common/DetailsBox';

type ReticleLayerProps = {
  width: number;
  height: number;
  store: Store;
  showDetailsBox: boolean;
  setShowDetailsBox: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReticleLayer = ({
  width,
  height,
  store,
  showDetailsBox,
  setShowDetailsBox,
}: ReticleLayerProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const detailsBox = useRef<TrainDetails>();

  useEffect(() => {
    const currentCanvas = canvas.current as HTMLCanvasElement;
    const ctx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
    detailsBox.current = drawCursor(ctx, width, height, store);
  }, [width, height, store]);

  const [debouncedDetailsBox, setDebouncedDetailsBox] = useState<TrainDetails | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedDetailsBox(detailsBox.current!);
      setShowDetailsBox(true);
    }, 50);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsBox.current]);

  return (
    <>
      <canvas id="cursor-layer" className="absolute" ref={canvas} width={width} height={height} />
      {showDetailsBox && debouncedDetailsBox && (
        <DetailsBox width={width} height={height} {...debouncedDetailsBox} />
      )}
    </>
  );
};

export default ReticleLayer;
