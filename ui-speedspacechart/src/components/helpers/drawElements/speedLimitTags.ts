import { Store } from '../../../types/chartTypes';
import { clearCanvas, maxPositionValues } from '../../utils';
import { MARGINS } from '../../const';

// const { CURVE_MARGIN_SIDES, MARGIN_LEFT, MARGIN_TOP, MARGIN_BOTTOM } = MARGINS;

export const drawSpeedLimitTags = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const {
    ratioX,
    leftOffset,
    linearDisplay: { speedLimitTags: displaySpeedLimitTags },
  } = store;

  const dynamicHeight = displaySpeedLimitTags ? height - 40 : height;

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const { maxPosition } = maxPositionValues(store);

  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 1;

  // .forEach((tag) => {
  //   const x =
  //     tag.position * ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX + CURVE_MARGIN_SIDES / 2;
  //   ctx.beginPath();
  //   ctx.moveTo(x + MARGIN_LEFT, dynamicHeight - (dynamicHeight - MARGIN_TOP));
  //   ctx.lineTo(x + MARGIN_LEFT, dynamicHeight - MARGIN_BOTTOM);
  //   ctx.fill();
  //   ctx.closePath();
  //   ctx.stroke();
  // });

  // ctx.restore();
};
