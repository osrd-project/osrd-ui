import type {
  ConsolidatedPositionSpeedTime,
  ElectrificationRange,
  GradientPosition,
  SimulationPowerRestrictionRange,
  Slope,
  Stop,
} from './simulationTypes';

export type Store = {
  speed: ConsolidatedPositionSpeedTime[];
  stops: Stop[];
  electrification: ElectrificationRange[];
  powerRestrictions: SimulationPowerRestrictionRange[];
  slopes: GradientPosition[] | Slope[];
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
