import type { Store } from '../types/chartTypes';
import { LAYERS_HEIGHTS, MARGINS } from './const';

type SpeedRangeValues = {
  minSpeed: number;
  maxSpeed: number;
  speedRange: number;
};

type MaxPositionValues = {
  maxPosition: number;
  RoundMaxPosition: number;
  intermediateTicksPosition: number;
};

export const getGraphOffsets = (width: number, height: number) => {
  const WIDTH_OFFSET = width - 60;
  const HEIGHT_OFFSET = height - 80;
  return { WIDTH_OFFSET, HEIGHT_OFFSET };
};

/**
 * /**
 * Given a store including a list of speed data, return the minSpeed, maxSpeed and speedRange
 * @param store
 */
export const speedRangeValues = (store: Store): SpeedRangeValues => {
  const speed = store.speed;
  const minSpeed = Math.min(...speed.map((data) => data.speed));
  const maxSpeed = Math.max(...speed.map((data) => data.speed));
  const speedRange = maxSpeed - minSpeed;
  return { minSpeed, maxSpeed, speedRange };
};

/**
 * Given a  store including a list of speed data and a ratio value, return the max position, the rounded max position and the intermediate ticks position
 * @param store
 */
export const maxPositionValues = (store: Store): MaxPositionValues => {
  if (store.speed.length === 0) {
    return { maxPosition: 0, RoundMaxPosition: 0, intermediateTicksPosition: 0 };
  }
  const maxPosition = store.speed[store.speed.length - 1].position;
  const RoundMaxPosition = Math.floor(maxPosition / (Math.ceil(store.ratioX) * 20));
  const intermediateTicksPosition = Math.floor(maxPosition / (Math.ceil(store.ratioX) * 40));

  return { maxPosition, RoundMaxPosition, intermediateTicksPosition };
};

export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
};

/**
 * Calculates the adaptive height based on the height supplied and the lineaires displayed.
 * @param height - The initial height value.
 * @param layersDisplay - The linear display options.
 * @param isAddLayers - A flag to add or remove layers. Default is true.
 * @returns The calculated adaptive height.
 */
export const getAdaptiveHeight = (
  height: number,
  layersDisplay: Store['layersDisplay'],
  isAddLayers: boolean = true
): number => {
  let currentHeight = height;
  const { electricalProfiles, powerRestrictions, speedLimitTags } = layersDisplay;
  if (electricalProfiles) {
    isAddLayers
      ? (currentHeight += LAYERS_HEIGHTS.ELECTRICAL_PROFILES)
      : (currentHeight -= LAYERS_HEIGHTS.ELECTRICAL_PROFILES);
  }
  if (powerRestrictions) {
    isAddLayers
      ? (currentHeight += LAYERS_HEIGHTS.POWER_RESTRICTIONS)
      : (currentHeight -= LAYERS_HEIGHTS.POWER_RESTRICTIONS);
  }
  if (speedLimitTags) {
    isAddLayers
      ? (currentHeight += LAYERS_HEIGHTS.SPEED_LIMIT_TAGS)
      : (currentHeight -= LAYERS_HEIGHTS.SPEED_LIMIT_TAGS);
  }
  return currentHeight;
};

/**
 * Calculates the position on the graph scale based on the given parameters.
 * @param position - The current position.
 * @param maxPosition - The maximum position.
 * @param width - The width of the graph.
 * @param ratioX - The X-axis ratio.
 * @param margins - The margins of the graph.
 * @returns The calculated position on the graph scale.
 */
export const positionOnGraphScale = (
  position: number,
  maxPosition: number,
  width: number,
  ratioX: number,
  margins: typeof MARGINS
) => {
  return (
    ((width - margins.CURVE_MARGIN_SIDES - margins.MARGIN_LEFT - margins.MARGIN_RIGHT) /
      maxPosition) *
      position *
      ratioX +
    margins.MARGIN_LEFT +
    margins.CURVE_MARGIN_SIDES / 2
  );
};

/**
 * Draws a separator line on a canvas context.
 *
 * @param ctx - The canvas rendering context.
 * @param separatorColor - The color of the separator line.
 * @param margins - The margins of the canvas.
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 */
export const drawSeparatorLinearLayer = (
  ctx: CanvasRenderingContext2D,
  separatorColor: string,
  margins: typeof MARGINS,
  width: number,
  height: number
) => {
  const { MARGIN_LEFT, MARGIN_BOTTOM, MARGIN_RIGHT } = margins;
  ctx.beginPath();
  ctx.strokeStyle = separatorColor;
  ctx.lineWidth = 1;
  ctx.moveTo(MARGIN_LEFT, height - MARGIN_BOTTOM);
  ctx.lineTo(width - MARGIN_RIGHT, height - MARGIN_BOTTOM);
  ctx.stroke();
};
