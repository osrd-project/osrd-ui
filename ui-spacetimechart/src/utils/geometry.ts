import { Point } from '../lib/types';
import { inRange } from 'lodash';

/**
 * This function helps to find if two segments do intersect.
 */
export function intersectsSegments(s1From: Point, s1To: Point, s2From: Point, s2To: Point) {
  const crossProduct = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
  const subtract = (a: Point, b: Point) => ({ x: a.x - b.x, y: a.y - b.y });

  const d1 = subtract(s1To, s1From);
  const d2 = subtract(s2To, s2From);
  const delta = subtract(s2From, s1From);

  const crossD1D2 = crossProduct(d1, d2);
  if (crossD1D2 === 0) return false; // Parallel lines

  const t = crossProduct(delta, d2) / crossD1D2;
  const u = crossProduct(delta, d1) / crossD1D2;

  return inRange(t, 0, 1) && inRange(u, 0, 1);
}

/**
 * This functions helps to find if a segment intersects with a stage of width x height pixels.
 */
export function isSegmentOnScreen(width: number, height: number, from: Point, to: Point) {
  const isWithinBounds = ({ x, y }: Point) => inRange(x, 0, width) && inRange(y, 0, height);

  if (isWithinBounds(from) || isWithinBounds(to)) {
    return true;
  }

  const topLeft: Point = { x: 0, y: 0 };
  const topRight: Point = { x: width, y: 0 };
  const bottomLeft: Point = { x: 0, y: height };
  const bottomRight: Point = { x: width, y: height };

  return (
    intersectsSegments(from, to, topLeft, topRight) || // Top edge
    intersectsSegments(from, to, topLeft, bottomLeft) || // Left edge
    intersectsSegments(from, to, bottomLeft, bottomRight) || // Bottom edge
    intersectsSegments(from, to, topRight, bottomRight) // Right edge
  );
}

/**
 * This functions helps to find if a path intersects with a stage of width x height pixels.
 */
export function isPathOnScreen(width: number, height: number, points: Point[]) {
  // No point: No intersection
  if (!points.length) return false;

  // One point: Check the point
  if (points.length === 1) {
    const { x, y } = points[0];
    return inRange(x, 0, width) && inRange(y, 0, height);
  }

  // More points: Check each segment
  const segments = points.slice(0, -1).map((p, i) => [p, points[i + 1]]);
  return segments.some(([from, to]) => isSegmentOnScreen(width, height, from, to));
}
