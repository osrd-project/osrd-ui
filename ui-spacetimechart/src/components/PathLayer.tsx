import { inRange, last } from 'lodash';
import { FC, useCallback } from 'react';

import {
  DataPoint,
  DEFAULT_PATH_END,
  DrawingFunction,
  PathData,
  PickingDrawingFunction,
  Point,
  SpaceTimeChartContextType,
} from '../lib/types';
import { getSpaceBreakpoints } from '../utils/scales';
import { indexToColor, hexToRgb } from '../utils/colors';
import { drawAliasedLine, drawPathExtremity } from '../utils/canvas';
import { FONT_SIZE, WHITE_75 } from '../lib/consts';
import { useDraw, usePicking } from '../hooks/useCanvas';

function getDirection({ points }: PathData, reverse?: boolean): 'up' | 'down' {
  if (points.length < 2) return 'down';

  if (!reverse) {
    for (let i = 1, l = Math.min(3, points.length); i < l; i++) {
      const diff = points[i].position - points[i - 1].position;
      if (diff > 0) return 'up';
      if (diff < 0) return 'down';
    }
  } else {
    for (let i = points.length - 2, l = Math.max(points.length - 4, points.length); i > l; i--) {
      const diff = points[i].position - points[i + 1].position;
      if (diff > 0) return 'up';
      if (diff < 0) return 'down';
    }
  }

  return 'down';
}

const DEFAULT_PICKING_TOLERANCE = 5;
const PAUSE_THICKNESS = 7;
const PAUSE_OPACITY = 0.2;

type PathStyle = {
  width: number;
  endWidth: number;
  dashArray?: number[];
  opacity?: number;
  lineCap?: CanvasLineCap;
};
export type PathLevel = 1 | 2 | 3 | 4;
const STYLES: Record<PathLevel, PathStyle> = {
  1: {
    width: 1.5,
    endWidth: 1.5,
  },
  2: {
    width: 1,
    endWidth: 1,
  },
  3: {
    width: 1,
    endWidth: 1,
    dashArray: [5, 5],
    lineCap: 'square',
  },
  4: {
    width: 1.5,
    endWidth: 1,
    dashArray: [0, 4],
    lineCap: 'round',
  },
} as const;
export const DEFAULT_LEVEL: PathLevel = 2;

export type PathLayerProps = {
  index: number;
  path: PathData;
  // Style:
  color: string;
  pickingTolerance?: number;
  level?: PathLevel;
};

/**
 * This component handles drawing a Path inside a SpaceTimeChart. It renders:
 * - The path itself
 * - The pauses
 * - The "picking" shape (to handle interactions)
 */
export const PathLayer: FC<PathLayerProps> = ({
  index,
  path,
  color,
  level = DEFAULT_LEVEL,
  pickingTolerance = DEFAULT_PICKING_TOLERANCE,
}) => {
  /**
   * This function returns the list of points to join to draw the path. It will be both used to
   * render the visible path, and the segments on the picking layer.
   */
  const getPathSegments = useCallback(
    ({ getX, getY, spaceScaleTree }: SpaceTimeChartContextType): Point[] => {
      const res: Point[] = [];
      path.points.forEach(({ position, time }, i, a) => {
        if (!i) {
          res.push({ x: getX(time), y: getY(position) as number });
        } else {
          const { position: prevPosition, time: prevTime } = a[i - 1];
          const spaceBreakPoints = getSpaceBreakpoints(prevPosition, position, spaceScaleTree);
          spaceBreakPoints.forEach((p) => {
            const t =
              prevTime + ((p - prevPosition) / (position - prevPosition)) * (time - prevTime);
            res.push({ x: getX(t), y: getY(p) as number });
          });
          res.push({ x: getX(time), y: getY(position) as number });
        }
      });
      return res;
    },
    [path]
  );

  /**
   * This function draws the stops of the path on the operational points.
   */
  const drawPauses = useCallback<DrawingFunction>(
    (ctx, { getX, getY, operationalPoints }) => {
      const stopPositions = new Set(operationalPoints.map((p) => p.position));
      path.points.forEach(({ position, time }, i, a) => {
        if (i) {
          const { position: prevPosition, time: prevTime } = a[i - 1];
          if (prevPosition === position && stopPositions.has(position)) {
            const y = getY(position) as number;
            ctx.beginPath();
            ctx.moveTo(getX(prevTime), y);
            ctx.lineTo(getX(time), y);
            ctx.stroke();
          }
        }
      });
    },
    [path]
  );

  /**
   * This function draws the label of the path.
   */
  const drawLabel = useCallback(
    (ctx: CanvasRenderingContext2D, label: string, color: string, points: Point[]) => {
      if (!label) return;

      const width = ctx.canvas.width;
      const height = ctx.canvas.height;

      const firstPointOnScreenIndex = points.findIndex(
        ({ x, y }) => inRange(x, 0, width) && inRange(y, 0, height)
      );

      if (firstPointOnScreenIndex < 0) return;

      const prev = points[firstPointOnScreenIndex - 1];
      const curr = points[firstPointOnScreenIndex];
      const next = points[firstPointOnScreenIndex + 1];

      let position: Point = curr;
      let angle = 0;

      if (firstPointOnScreenIndex === 0) {
        if (next) angle = Math.atan2(next.y - curr.y, next.x - curr.x);
      } else {
        // Find first point with a positive x:
        position = {
          x: 0,
          y: curr.y - (curr.x * (curr.y - prev.y)) / (curr.x - prev.x),
        };

        angle = Math.atan2(curr.y - position.y, curr.x - position.x);
      }

      // Finally, draw label:
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(angle);
      ctx.font = `${FONT_SIZE}px IBM Plex Mono`;
      ctx.textAlign = 'start';

      const dx = 5;
      const dy = angle >= 0 ? -5 : 15;
      const padding = 2;
      const measure = ctx.measureText(label);
      const w = measure.width + 2 * padding;
      const h = FONT_SIZE + 2 * padding;
      ctx.fillStyle = WHITE_75;
      ctx.fillRect(dx - padding, dy - h + padding, w, h);
      ctx.fillStyle = color;
      ctx.fillText(label, dx, dy - FONT_SIZE / 4);
      ctx.restore();
    },
    []
  );

  /**
   * This function draws the extremities of the path.
   */
  const drawExtremities = useCallback<DrawingFunction>(
    (ctx, { getX, getY }) => {
      const pathDirection = getDirection(path);
      const from = path.points[0];
      const fromEnd = path.fromEnd || DEFAULT_PATH_END;
      const to = last(path.points) as DataPoint;
      const toEnd = path.toEnd || DEFAULT_PATH_END;

      drawPathExtremity(ctx, getX(from.time), getY(from.position), 'from', pathDirection, fromEnd);
      drawPathExtremity(ctx, getX(to.time), getY(to.position), 'to', pathDirection, toEnd);
    },
    [path]
  );

  const drawAll = useCallback<DrawingFunction>(
    (ctx, stcContext) => {
      // Draw stops:
      ctx.strokeStyle = color;
      ctx.lineWidth = PAUSE_THICKNESS;
      ctx.globalAlpha = PAUSE_OPACITY;
      ctx.lineCap = 'round';
      drawPauses(ctx, stcContext);

      const style = STYLES[level];

      // Draw main path:
      ctx.strokeStyle = color;
      ctx.lineWidth = style.width;
      ctx.setLineDash(style.dashArray || []);
      ctx.globalAlpha = style.opacity || 1;
      ctx.lineCap = style.lineCap || 'square';
      ctx.beginPath();
      const segments = getPathSegments(stcContext);
      segments.forEach(({ x, y }, i) => {
        if (!i) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw extremities:
      ctx.setLineDash([]);
      ctx.lineWidth = style.endWidth;
      drawExtremities(ctx, stcContext);

      // Draw label:
      drawLabel(ctx, path.label, color, segments);
    },
    [color, drawPauses, level, getPathSegments, drawExtremities, drawLabel, path.label]
  );
  useDraw('paths', drawAll);

  const drawPicking = useCallback<PickingDrawingFunction>(
    (imageData, stcContext) => {
      const color = hexToRgb(indexToColor(index));
      getPathSegments(stcContext).forEach((point, i, a) => {
        if (i) {
          const previousPoint = a[i - 1];
          drawAliasedLine(
            imageData,
            previousPoint,
            point,
            color,
            STYLES[level].width + pickingTolerance
          );
        }
      });
    },
    [index, getPathSegments, level, pickingTolerance]
  );
  usePicking('paths', drawPicking);

  return null;
};

export default PathLayer;
