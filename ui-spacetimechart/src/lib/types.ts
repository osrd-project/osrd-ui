import { HTMLProps, ReactNode } from 'react';

// GLOBAL UTILITY TYPES:
export type Point = {
  x: number;
  y: number;
};

export type Handler<P extends object> = (payload: P) => void;

export type RGBAColor = [number, number, number, number];
export type RGBColor = [number, number, number];

// TIME AND SPACE SCALE UTILITY TYPES:
export type SpaceScale = {
  // End point (in meters):
  to: number;
} & (
  | {
      // Coefficient (in meters/px):
      coefficient: number;
    }
  | {
      // Size (in px):
      size: number;
    }
);

export type BinaryTreeNode<T> =
  | T
  | {
      // "limit", "from" and "to" in meters:
      limit: number;
      from: number;
      to: number;
      // "limit", "from" and "to" in screen pixels:
      pixelFrom: number;
      pixelTo: number;
      pixelLimit: number;
      // children:
      left: BinaryTreeNode<T>;
      right: BinaryTreeNode<T>;
    };

export type NormalizedScale = {
  coefficient: number;
  // "from" and "to" in meters:
  from: number;
  to: number;
  // "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  // siblings:
  previous?: NormalizedScale;
  next?: NormalizedScale;
};

export type NormalizedScaleTree = BinaryTreeNode<NormalizedScale>;

// BUSINESS SPECIFIC TYPES:
export type DataPoint = {
  time: number;
  position: number;
};

export type PathEnd = 'stop' | 'out';
export const DEFAULT_PATH_END = 'stop';
export type PathData = {
  id: string;
  label: string;
  points: DataPoint[];
  fromEnd?: PathEnd;
  toEnd?: PathEnd;
};

export type OperationalPoint = {
  id: string;
  label: string;
  position: number;
  importanceLevel?: number; // Lower is better. If null, the point won't be displayed.
};

// DATA TRANSLATION TYPES:
export type TimeToPixel = (time: number) => number;
export type SpaceToPixel = (position: number) => number;
export type PixelToTime = (x: number) => number;
export type PixelToSpace = (y: number) => number;
export type PointToData = (point: Point) => DataPoint;
export type DataToPoint = (data: DataPoint) => Point;

// CANVAS SPECIFIC TYPES:
export type HoveredItem = { layer: PickingLayerType; index: number };

export const PICKING_LAYERS = ['paths'] as const;
export type PickingLayerType = (typeof PICKING_LAYERS)[number];
export const LAYERS = ['graduations', 'paths', 'captions', 'overlay'] as const;
export type LayerType = (typeof LAYERS)[number];

export type DrawingFunction = (
  canvasContext: CanvasRenderingContext2D,
  stcContext: SpaceTimeChartContextType
) => void;

export type PickingDrawingFunction = (
  imageData: ImageData,
  stcContext: SpaceTimeChartContextType
) => void;

export type DrawingFunctionHandler = (
  arg:
    | { type: 'picking'; layer: PickingLayerType; fn: PickingDrawingFunction }
    | { type: 'rendering'; layer: LayerType; fn: DrawingFunction }
) => void;

export type CanvasContextType = {
  register: DrawingFunctionHandler;
  unregister: DrawingFunctionHandler;
};

// MOUSE CONTEXT:
export type MouseState = {
  down?: { ctrl?: boolean; shift?: boolean };
  position: Point;
  isHover: boolean;
};

export type MouseContextType = MouseState & {
  data: DataPoint;
};

// CORE COMPONENT MAIN TYPES:
export type SpaceTimeChartProps = {
  children?: ReactNode[];

  operationalPoints: OperationalPoint[];

  // The space origin (i.e. the space value for the most top point)
  spaceOrigin: number;
  // The space scales:
  spaceScales: SpaceScale[];

  // The time origin (i.e. the time value for the most left point)
  timeOrigin: number;
  // The timescale (in ms/px)
  timeScale: number;

  // In addition to the time and space origins, it is possible to add offsets (in pixels)
  xOffset?: number;
  yOffset?: number;

  // Event handlers:
  onPan?: Handler<{
    isPanning: boolean;
    initialPosition: Point;
    position: Point;
    initialData: DataPoint;
    data: DataPoint;
  }>;
  onZoom?: Handler<{ delta: number; position: Point; event: WheelEvent }>;
  onClick?: Handler<{ position: Point; data: DataPoint; event: MouseEvent }>;
  onMouseMove?: Handler<{ position: Point; data: DataPoint; isHover: boolean; event: MouseEvent }>;
  onHoveredChildUpdate?: Handler<{ item: HoveredItem | null }>;
} & Omit<HTMLProps<HTMLDivElement>, 'onClick' | 'onMouseMove'>;

export type SpaceTimeChartContextType = {
  width: number;
  height: number;

  // This string is designed to be unique to each rendering:
  fingerprint: string;

  // Scales:
  xOffset: number;
  yOffset: number;
  timeOrigin: number;
  timeScale: number;
  spaceOrigin: number;
  spaceScaleTree: NormalizedScaleTree;

  // Translation helpers:
  getX: TimeToPixel;
  getY: SpaceToPixel;
  getPoint: DataToPoint;
  getTime: PixelToTime;
  getSpace: PixelToSpace;
  getData: PointToData;

  // Useful data:
  operationalPoints: OperationalPoint[];
};
