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
import { getGraphOffsets } from './utils';
import SettingsPanel from './common/SettingsPanel';
import { Iterations } from '../../../ui-icons/src/components/Iterations';
import { Dash } from '../../../ui-icons/src/components/Dash';
import { Plus } from '../../../ui-icons/src/components/Plus';
import { KebabHorizontal } from '../../../ui-icons/src/components/KebabHorizontal';

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
    ratioX: 1,
    leftOffset: 0,
    cursor: {
      x: null,
      y: null,
    },
    detailsBoxDisplay: {
      energySource: true,
      tractionStatus: true,
      declivities: true,
      eletricalProfiles: true,
      powerRestrictions: true,
    },
    layersDisplay: {
      steps: true,
      declivities: false,
      speedLimits: false,
      temporarySpeedLimits: false,
      electricalProfiles: false,
      powerRestrictions: false,
      speedLimitTags: false,
    },
    isSettingsPanelOpened: false,
  });

  const { WIDTH_OFFSET, HEIGHT_OFFSET } = getGraphOffsets(width, height);

  const [showDetailsBox, setShowDetailsBox] = useState(false);

  const reset = () => {
    setStore((prev) => ({
      ...prev,
      ratioX: 1,
      leftOffset: 0,
    }));
    resetZoom();
  };

  const openSettingsPanel = () => {
    setStore((prev) => ({
      ...prev,
      isSettingsPanelOpened: true,
    }));
  };

  useEffect(() => {
    const storeData = {
      speed: (data.consolidatedSimulation[0].speed as ConsolidatedPositionSpeedTime[]) || [],
      stops: data.simulation.present.trains[0].base.stops || [],
      electrification: data.simulation.present.trains[0].electrification_ranges || [],
      slopes: data.simulation.present.trains[0].slopes || [],
    };

    if (storeData.speed && storeData.stops && storeData.electrification && storeData.slopes) {
      setStore((prev) => ({
        ...prev,
        speed: storeData.speed,
        stops: storeData.stops,
        electrification: storeData.electrification,
        slopes: storeData.slopes,
      }));
    }
  }, [data]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
      }}
      tabIndex={0}
    >
      <div className="flex justify-end absolute" style={{ width: width, marginTop: '27px' }}>
        <div id="interaction-button-container" className="z-10">
          <div className="zoom-buttons">
            <button className="interaction-button reset-button" onClick={() => reset()}>
              <Iterations />
            </button>
            <button className="interaction-button plus-button">
              <Plus />
            </button>
            <button className="interaction-button">
              <Dash />
            </button>
          </div>
          <button className="interaction-button elipsis-button" onClick={() => openSettingsPanel()}>
            <KebabHorizontal />
          </button>
        </div>
      </div>
      {store.isSettingsPanelOpened && (
        <div className="flex justify-end absolute ml-2" style={{ width: width, marginTop: 27 }}>
          <SettingsPanel color={backgroundColor} store={store} setStore={setStore} />
        </div>
      )}
      <CurveLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <AxisLayerY width={width} height={height} store={store} />
      <MajorGridY width={width} height={height} store={store} />
      <AxisLayerX width={width} height={height} store={store} />
      {store.layersDisplay.steps && (
        <>
          <StepLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
          <StepNamesLayer
            key={stop.name}
            width={WIDTH_OFFSET}
            height={HEIGHT_OFFSET}
            store={store}
          />
        </>
      )}
      <TickLayerY width={width} height={height} store={store} />
      <TickLayerX width={width} height={height} store={store} />
      <ReticleLayer
        width={width}
        height={height}
        store={store}
        showDetailsBox={showDetailsBox}
        setShowDetailsBox={setShowDetailsBox}
      />
      <FrontInteractivityLayer
        width={WIDTH_OFFSET}
        height={HEIGHT_OFFSET}
        store={store}
        setStore={setStore}
        setShowDetailsBox={setShowDetailsBox}
      />
    </div>
  );
};

export default SpeedSpaceChart;
