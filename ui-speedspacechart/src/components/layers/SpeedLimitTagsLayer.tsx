import { Store } from '../../types/chartTypes';
import { useCanvas } from '../hooks';
import { drawSpeedLimitTags } from '../helpers/drawElements/speedLimitTags';
import React from 'react';

type SpeedLimitTagsLayerProps = {
  width: number;
  height: number;
  store: Store;
};

const SpeedLimitTagsLayer = ({ width, height, store }: SpeedLimitTagsLayerProps) => {
  const canvas = useCanvas(drawSpeedLimitTags, width, height, store);

  return (
    <canvas
      id="speed-limit-tags-layer"
      className="absolute rounded-t-xl"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default SpeedLimitTagsLayer;
