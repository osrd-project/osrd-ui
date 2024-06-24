import CurveLayer from './layers/CurveLayer';
import FrontInteractivityLayer from './layers/FrontInteractivityLayer';
import { type ConsolidatedPositionSpeedTime, OsrdSimulationState } from '../types/simulationTypes';
import React, { useEffect, useState } from 'react';
import type { Store } from '../types/chartTypes';
import AxisLayerX from './layers/AxisLayerX';
import AxisLayerY from './layers/AxisLayerY';
import TickLayerX from './layers/TickLayerX';
import TickLayerY from './layers/TickLayerY';
import MajorGridY from './layers/MajorGridY';
import StepLayer from './layers/StepLayer';
import ReticleLayer from './layers/ReticleLayer';
import { resetZoom } from './helpers/layersManager';
import StepNamesLayer from './layers/StepNamesLayer';
import { getGraphOffsets, getHeightWithLayers } from './utils';
import ElectricalProfileLayer from './layers/ElectricalProfileLayer';

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  backgroundColor: string;
  data: OsrdSimulationState;
};

const SpeedSpaceChart = ({ width, height, backgroundColor, data }: SpeedSpaceChartProps) => {
  const [store, setStore] = useState<Store>({
    speed: [],
    stops: [],
    electrification: [],
    slopes: [],
    electricalProfiles: {
      boundaries: [],
      values: [],
    },
    ratioX: 1,
    leftOffset: 0,
    cursor: {
      x: null,
      y: null,
    },
    detailsBoxDisplay: {
      energySource: true,
      tractionStatus: true,
      eletricalProfiles: true,
      powerRestrictions: true,
      gradient: true,
    },
    linearDisplay: {
      fastestDrive: true,
      speedLimits: false,
      speedAnomalies: false,
      electricalProfiles: true,
      powerRestrictions: false,
      declivities: false,
      speedLimitTags: false,
      signals: false,
      steps: true,
    },
  });

  const { WIDTH_OFFSET, HEIGHT_OFFSET } = getGraphOffsets(width, height);
  const dynamicHeight = getHeightWithLayers(height, store.linearDisplay);
  const dynamicHeightOffset = getHeightWithLayers(HEIGHT_OFFSET, store.linearDisplay);

  const [showDetailsBox, setShowDetailsBox] = useState(false);

  const reset = () => {
    setStore((prev) => ({
      ...prev,
      ratioX: 1,
      leftOffset: 0,
    }));
    resetZoom();
  };

  useEffect(() => {
    const storeData = {
      speed: (data.consolidatedSimulation[0].speed as ConsolidatedPositionSpeedTime[]) || [],
      stops: data.simulation.present.trains[0].base.stops || [],
      electrification: data.simulation.present.trains[0].electrification_ranges || [],
      slopes: data.simulation.present.trains[0].slopes || [],
      electricalProfiles: data.electricalProfiles,
    };

    if (
      storeData.speed &&
      storeData.stops &&
      storeData.electrification &&
      storeData.slopes &&
      storeData.electricalProfiles
    ) {
      setStore((prev) => ({
        ...prev,
        speed: storeData.speed,
        stops: storeData.stops,
        electrification: storeData.electrification,
        slopes: storeData.slopes,
        electricalProfiles: storeData.electricalProfiles,
      }));
    }
  }, [data]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${dynamicHeight}px`,
        backgroundColor: `${backgroundColor}`,
      }}
      tabIndex={0}
    >
      <div className="flex justify-end absolute mt-8 ml-2" style={{ width: width }}>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white-100 p-1 mr-6 z-10 rounded-full w-8 h-8"
          onClick={() => reset()}
        >
          &#8617;
        </button>
      </div>
      <CurveLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <ElectricalProfileLayer width={width} height={height} store={store} />
      <AxisLayerY width={width} height={height} store={store} />
      <MajorGridY width={width} height={height} store={store} />
      <AxisLayerX width={width} height={height} store={store} />
      <StepLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <StepNamesLayer key={stop.name} width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <TickLayerY width={width} height={height} store={store} />
      <TickLayerX width={width} height={dynamicHeight} store={store} />
      <ReticleLayer
        width={width}
        height={dynamicHeight}
        store={store}
        showDetailsBox={showDetailsBox}
        setShowDetailsBox={setShowDetailsBox}
      />
      <FrontInteractivityLayer
        width={WIDTH_OFFSET}
        height={dynamicHeightOffset}
        store={store}
        setStore={setStore}
        setShowDetailsBox={setShowDetailsBox}
      />
    </div>
  );
};

export default SpeedSpaceChart;
