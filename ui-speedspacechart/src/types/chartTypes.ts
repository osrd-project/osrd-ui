import type {
  ConsolidatedPositionSpeedTime,
  ElectrificationRange,
  GradientPosition,
  Slope,
  Stop,
} from './simulationTypes';

export type Store = {
  speed: ConsolidatedPositionSpeedTime[];
  stops: Stop[];
  electrification: ElectrificationRange[];
  slopes: GradientPosition[] | Slope[];
  ratioX: number;
  leftOffset: number;
  cursor: {
    x: number | null;
    y: number | null;
  };
  detailsBoxDisplay: {
    [key: string]: boolean;
    energySource: boolean;
    tractionStatus: boolean;
    declivities: boolean;
    eletricalProfiles: boolean;
    powerRestrictions: boolean;
  };
  layersDisplay: {
    [key: string]: boolean;
    steps: boolean;
    declivities: boolean;
    speedLimits: boolean;
    temporarySpeedLimits: boolean;
    electricalProfiles: boolean;
    powerRestrictions: boolean;
    speedLimitTags: boolean;
  };
  isSettingsPanelOpened: boolean;
};

export type TrainDetails = {
  curveX: number;
  curveY: number;
  marecoSpeedText: string;
  effortText: string;
  electricalProfileText: string;
  previousGradientText: number;
  modeText: string;
};
