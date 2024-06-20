import React from 'react';
import type { Store } from '../../types/chartTypes';
import { useCanvas } from '../hooks';
import { drawPowerRestrictions } from '../helpers/drawElements/powerRestrictions';

type PowerRestrictionsLayerProps = {
  width: number;
  height: number;
  store: Store;
};

const PowerRestrictionsLayer = ({ width, height, store }: PowerRestrictionsLayerProps) => {
  const canvas = useCanvas(drawPowerRestrictions, width, height, store);

  return (
    <canvas
      id="power-restrictions-layer"
      className="absolute rounded-t-xl"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default PowerRestrictionsLayer;
