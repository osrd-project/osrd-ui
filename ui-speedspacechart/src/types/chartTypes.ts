import type {
  ConsolidatedPositionSpeedTime,
  ElectrificationRange,
  GradientPosition,
  OsrdSimulationState,
  Slope,
  Stop,
} from './simulationTypes';

export type Store = {
  speed: ConsolidatedPositionSpeedTime[];
  stops: Stop[];
  electrification: ElectrificationRange[];
  slopes: GradientPosition[] | Slope[];
  electricalProfiles?: OsrdSimulationState['electricalProfiles'];
  ratioX: number;
  leftOffset: number;
  cursor: {
    x: number | null;
    y: number | null;
  };
  detailsBoxDisplay: {
    energySource: boolean;
    tractionStatus: boolean;
    eletricalProfiles: boolean;
    powerRestrictions: boolean;
    gradient: boolean;
  };
  linearDisplay: {
    fastestDrive: boolean;
    speedLimits: boolean;
    speedAnomalies: boolean;
    electricalProfiles: boolean;
    powerRestrictions: boolean;
    declivities: boolean;
    speedLimitTags: boolean;
    signals: boolean;
    steps: boolean;
  };
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
