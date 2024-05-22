import cx from 'classnames';
import React, { FC, useState } from 'react';
import type { Meta } from '@storybook/react';

import { OPERATIONAL_POINTS, PATHS } from './assets/paths';
import { SpaceTimeChart, PathLayer } from '../';
import { DataPoint, Point } from '../lib/types';
import { getDiff } from '../utils/vectors';
import { X_ZOOM_LEVEL, Y_ZOOM_LEVEL, zoom } from './utils';
import { MouseTracker } from './components';

/**
 * This story aims at showcasing how to measure times and distances in a SpaceTimeChart.
 */
const Wrapper: FC<{
  spaceScaleType: 'linear' | 'proportional';
  enableSnapping: boolean;
}> = ({ spaceScaleType, enableSnapping }) => {
  const [state, setState] = useState<{
    xOffset: number;
    yOffset: number;
    xZoomLevel: number;
    yZoomLevel: number;
    panTarget: null | { type: 'stage'; initialOffset: Point };
    mark: null | { data: DataPoint; pathId?: string };
  }>({
    xOffset: 0,
    yOffset: 0,
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    panTarget: null,
    mark: null,
  });

  return (
    <div className="inset-0">
      <SpaceTimeChart
        className={cx(
          'inset-0 absolute overflow-hidden p-0 m-0',
          state.panTarget && 'cursor-grabbing'
        )}
        enableSnapping={enableSnapping}
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
        onClick={({ data }) => {
          if (!state.panTarget) setState({ ...state, mark: state.mark ? null : { data } });
        }}
        onPan={({ initialPosition, position, isPanning }) => {
          const { panTarget } = state;
          const diff = getDiff(initialPosition, position);

          // Stop panning:
          if (!isPanning) {
            setState((state) => ({
              ...state,
              panTarget: null,
            }));
          }
          // Start panning stage
          else if (!panTarget) {
            setState((state) => ({
              ...state,
              panTarget: {
                type: 'stage',
                initialOffset: {
                  x: state.xOffset,
                  y: state.yOffset,
                },
              },
            }));
          }
          // Keep panning stage:
          else if (panTarget.type === 'stage') {
            const xOffset = panTarget.initialOffset.x + diff.x;
            const yOffset = panTarget.initialOffset.y + diff.y;

            setState((state) => ({
              ...state,
              xOffset,
              yOffset,
            }));
          }
        }}
        onZoom={(payload) => {
          setState((state) => ({
            ...state,
            ...zoom(state, payload),
          }));
        }}
      >
        {PATHS.map((path) => (
          <PathLayer key={path.id} path={path} color={path.color} />
        ))}
        <MouseTracker reference={state.mark?.data} />
      </SpaceTimeChart>
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Measuring times and distances',
  component: Wrapper,
  argTypes: {
    spaceScaleType: {
      name: 'Space scaling type',
      options: ['linear', 'proportional'],
      defaultValue: 'linear',
      control: { type: 'radio' },
    },
    enableSnapping: {
      name: 'Enable snapping to closest points?',
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof Wrapper>;

export const DefaultArgs = {
  name: 'Default arguments',
  args: {
    spaceScaleType: 'linear',
    enableSnapping: true,
  },
};
