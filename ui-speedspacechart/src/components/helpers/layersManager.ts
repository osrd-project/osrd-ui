import * as d3 from 'd3';
import type { Store } from '../../types/chartTypes';
import { FRONT_INTERACTIVITY_LAYER_ID } from '../const';

export const zoom = (setStore: React.Dispatch<React.SetStateAction<Store>>) =>
  d3
    .zoom()
    .filter((event) => {
      return event.shiftKey;
    })
    .on('zoom', () => {
      const canvas = d3.select(FRONT_INTERACTIVITY_LAYER_ID) as d3.Selection<
        Element,
        unknown,
        HTMLCanvasElement,
        unknown
      >;

      const { k: ratioX, x: leftOffset } = d3.zoomTransform(canvas.node() as Element);

      if (ratioX >= 1) {
        setStore((prev) => ({
          ...prev,
          ratioX,
          leftOffset,
        }));
      } else {
        setStore((prev) => ({
          ...prev,
          ratioX: 1,
          leftOffset: 0,
        }));
        canvas.call(resetZoom);
      }
    });

export const resetZoom = () =>
  d3.zoom().transform(d3.select(FRONT_INTERACTIVITY_LAYER_ID), d3.zoomIdentity);
