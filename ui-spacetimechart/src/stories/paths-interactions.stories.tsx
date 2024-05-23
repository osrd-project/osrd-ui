import cx from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import type { Meta } from '@storybook/react';

import { OPERATIONAL_POINTS, PATHS } from './lib/paths';
import { SpaceTimeChart, PathLayer } from '../';
import { HoveredItem, PathData, Point } from '../lib/types';
import { getDiff } from '../utils/vectors';
import { X_ZOOM_LEVEL, Y_ZOOM_LEVEL, zoom } from './lib/utils';

import './lib/tailwind-mockup.css';
import { keyBy } from 'lodash';

function delayPath<T extends PathData>(path: T, newTimeOrigin: number): T {
  const delay = newTimeOrigin - path.points[0].time;
  return {
    ...path,
    points: path.points.map((point) => ({ ...point, time: point.time + delay })),
  };
}

/**
 * This story aims at showcasing how to manipulate paths in a SpaceTimeChart.
 */
const Wrapper: FC<{
  enableDragPaths: boolean;
  enableMultiSelection: boolean;
  spaceScaleType: 'linear' | 'proportional';
  pickingTolerance: number;
}> = ({ enableDragPaths, pickingTolerance, enableMultiSelection, spaceScaleType }) => {
  const [paths, setPaths] = useState(PATHS);
  const pathsDict = useMemo(() => keyBy(paths, 'id'), [paths]);
  const [state, setState] = useState<{
    xOffset: number;
    yOffset: number;
    xZoomLevel: number;
    yZoomLevel: number;
    selection: Set<string> | null;
    panTarget:
      | null
      | { type: 'stage'; initialOffset: Point }
      | { type: 'items'; initialTimeOrigins: Record<string, number> };
    hoveredPath: HoveredItem | null;
  }>({
    xOffset: 0,
    yOffset: 0,
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    selection: null,
    panTarget: null,
    hoveredPath: null,
  });

  return (
    <div className="inset-0">
      <SpaceTimeChart
        className={cx(
          'inset-0 absolute p-0 m-0',
          state.panTarget && 'cursor-grabbing',
          state.hoveredPath && 'cursor-pointer'
        )}
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
        onClick={({ event }) => {
          const { hoveredPath, selected, panTarget } = state;

          // Skip events when something is being dragged or panned:
          if (panTarget) return;

          // Unselect everything when clicking stage (unless multi-selection is enabled and the ctrl key is down):
          if (!hoveredPath) {
            if (!enableMultiSelection || !event.ctrlKey)
              setState((state) => ({ ...state, selected: null }));
          }
          // Select item when nothing is selected:
          else if (!selected) {
            setState({
              ...state,
              selected: new Set([hoveredPath.element.path]),
            });
          }
          // Handle single selection:
          else if (!enableMultiSelection || !event.ctrlKey) {
            setState({
              ...state,
              selected: selected.has(hoveredPath.element.path)
                ? null
                : new Set([hoveredPath.element.path]),
            });
          }
          // Handle multi selection:
          else {
            const newSelection = new Set(selected);

            if (newSelection.has(hoveredPath.element.path))
              newSelection.delete(hoveredPath.element.path);
            else newSelection.add(hoveredPath.element.path);

            setState({ ...state, selected: newSelection.size ? newSelection : null });
          }
        }}
        onHoveredChildUpdate={({ item }) => {
          setState((state) => ({ ...state, hoveredPath: item }));
        }}
        onPan={({ initialPosition, position, initialData, data, isPanning }) => {
          const { panTarget, hoveredPath, selected } = state;
          const diff = getDiff(initialPosition, position);

          // Stop dragging or panning:
          if (!isPanning) {
            setState((state) => ({
              ...state,
              panTarget: null,
            }));
          }
          // Start dragging selection
          else if (!panTarget && enableDragPaths && hoveredPath) {
            const newSelection = selected?.has(hoveredPath.element.path)
              ? selected
              : new Set([hoveredPath.element.path]);
            setState((state) => ({
              ...state,
              selected: newSelection,
              panTarget: {
                type: 'items',
                initialTimeOrigins: Array.from(newSelection).reduce(
                  (iter, id) => ({
                    ...iter,
                    [id]: pathsDict[id].points[0].time,
                  }),
                  {}
                ),
              },
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
          // Keep panning selection:
          else if (panTarget.type === 'items') {
            const { initialTimeOrigins } = panTarget;
            const timeDiff = data.time - initialData.time;
            setPaths((paths) =>
              paths.map((path) =>
                initialTimeOrigins[path.id]
                  ? delayPath(path, initialTimeOrigins[path.id] + timeDiff)
                  : path
              )
            );
          }
        }}
        onZoom={(payload) => {
          setState((state) => ({
            ...state,
            ...zoom(state, payload),
          }));
        }}
      >
        {paths.map((path) => (
          <PathLayer
            key={path.id}
            path={path}
            color={path.color}
            pickingTolerance={pickingTolerance}
            level={
              state.panTarget?.type === 'items'
                ? state.selected?.has(path.id)
                  ? 1
                  : 4
                : state.selected?.has(path.id)
                  ? 1
                  : state.hoveredPath?.element.path === path.id
                    ? 1
                    : state.selected?.size
                      ? 3
                      : 2
            }
          />
        ))}
      </SpaceTimeChart>
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Paths interactions',
  component: Wrapper,
  argTypes: {
    enableDragPaths: {
      name: 'Enable dragging paths?',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    enableMultiSelection: {
      name: 'Multi-selection?',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    spaceScaleType: {
      name: 'Space scaling type',
      options: ['linear', 'proportional'],
      defaultValue: 'linear',
      control: { type: 'radio' },
    },
    pickingTolerance: {
      name: 'Picking tolerance',
      description: '(in pixels)',
      defaultValue: 5,
      control: { type: 'number', step: 1, min: 0, max: 30 },
    },
  },
} as Meta<typeof Wrapper>;

export const DefaultArgs = {
  name: 'Default arguments',
  args: {
    enableDragPaths: true,
    enableMultiSelection: true,
    spaceScaleType: 'linear',
    pickingTolerance: 5,
  },
};
