import cx from 'classnames';
import React, { FC, useState } from 'react';
import type { Meta } from '@storybook/react';

import { OPERATIONAL_POINTS, PATHS } from './assets/paths';
import { SpaceTimeChart, PathLayer } from '../';
import {
  MAX_X_ZOOM,
  MAX_Y_ZOOM,
  MIN_X_ZOOM,
  MIN_Y_ZOOM,
  X_ZOOM_LEVEL,
  Y_ZOOM_LEVEL,
} from './utils';
import { getDiff } from '../utils/vectors';
import { Point } from '../lib/types';

import './tailwind-mockup.css';

/**
 * This story aims at showcasing how to swap time and space axis in a SpaceTimeChart.
 */
const Wrapper: FC<{
  swapAxis: boolean;
  spaceScaleType: 'linear' | 'proportional';
}> = ({ swapAxis, spaceScaleType }) => {
  const [state, setState] = useState<{
    xOffset: number;
    yOffset: number;
    xZoomLevel: number;
    yZoomLevel: number;
    panning: null | { initialOffset: Point };
  }>({
    xOffset: 0,
    yOffset: 0,
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    panning: null,
  });

  return (
    <div className="inset-0">
      <SpaceTimeChart
        className={cx('inset-0 absolute p-0 m-0', state.panning && 'cursor-grabbing')}
        swapAxis={swapAxis}
        operationalPoints={OPERATIONAL_POINTS}
        spaceOrigin={0}
        spaceScales={OPERATIONAL_POINTS.slice(0, -1).map((point, i) => ({
          from: point.position,
          to: OPERATIONAL_POINTS[i + 1].position,
          ...(spaceScaleType === 'linear'
            ? { size: 50 * state.yZoomLevel }
            : { coefficient: 150 / state.yZoomLevel }),
        }))}
        timeOrigin={+new Date('2024/04/02')}
        timeScale={60000 / state.xZoomLevel}
        xOffset={state.xOffset}
        yOffset={state.yOffset}
        onPan={({ initialPosition, position, isPanning }) => {
          const diff = getDiff(initialPosition, position);
          setState((state) => {
            // Stop panning:
            if (!isPanning) {
              return { ...state, panning: null };
            }
            // Start panning:
            else if (!state.panning) {
              return {
                ...state,
                panning: {
                  initialOffset: {
                    x: state.xOffset,
                    y: state.yOffset,
                  },
                },
              };
            }
            // Keep panning:
            else {
              return {
                ...state,
                xOffset: state.panning.initialOffset.x + diff.x,
                yOffset: state.panning.initialOffset.y + diff.y,
              };
            }
          });
        }}
        onZoom={({ delta, position: { x, y } }) => {
          // The zoom is quite straightforward. The hardest part is to keep the zoom centered on the
          // mouse. There is a shorter version in ./utils.ts, used by the other stories.
          setState((state) => {
            const newState = {
              ...state,
            };
            newState.xZoomLevel = Math.min(
              Math.max(newState.xZoomLevel * (1 + delta / 10), MIN_X_ZOOM),
              MAX_X_ZOOM
            );
            // This line is to center the zoom on the mouse X position:
            newState.xOffset = x - ((x - state.xOffset) / state.xZoomLevel) * newState.xZoomLevel;
            newState.yZoomLevel = Math.min(
              Math.max(newState.yZoomLevel * (1 + delta / 10), MIN_Y_ZOOM),
              MAX_Y_ZOOM
            );
            // This line is to center the zoom on the mouse Y position:
            newState.yOffset = y - ((y - state.yOffset) / state.yZoomLevel) * newState.yZoomLevel;

            return newState;
          });
        }}
      >
        {PATHS.map((path) => (
          <PathLayer key={path.id} path={path} color={path.color} />
        ))}
      </SpaceTimeChart>
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Swap axis',
  component: Wrapper,
  argTypes: {
    swapAxis: {
      name: 'Swap time and space axis?',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    spaceScaleType: {
      name: 'Space scaling type',
      options: ['linear', 'proportional'],
      defaultValue: 'linear',
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Wrapper>;

export const DefaultArgs = {
  name: 'Default arguments',
  args: {
    swapAxis: true,
    spaceScaleType: 'linear',
  },
};
