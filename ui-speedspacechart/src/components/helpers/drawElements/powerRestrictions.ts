import { Store } from '../../../types/chartTypes';
import { clearCanvas, maxPositionValues, positionOnGraphScale } from '../../utils';
import { LINEAR_LAYERS_HEIGHTS, MARGINS } from '../../const';

const { MARGIN_LEFT, MARGIN_RIGHT } = MARGINS;

export const drawPowerRestrictions = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const {
    powerRestrictions,
    ratioX,
    leftOffset,
    linearDisplay: { electricalProfiles },
  } = store;

  const dynamicHeight = electricalProfiles
    ? height + LINEAR_LAYERS_HEIGHTS.ELECTRICAL_PROFILES
    : height;

  console.log('dynamicHeight', dynamicHeight);

  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const { maxPosition } = maxPositionValues(store);

  ctx.font = 'normal 12px IBM Plex Sans';
  ctx.fillStyle = 'rgb(121, 118, 113)';
  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.lineWidth = 1;
  ctx.textAlign = 'center';

  console.log('width', width, MARGIN_RIGHT);

  // Draw white rect : height 40px, width of the chart, bg rgb(250, 249, 245)
  // Revoir la logique pour le rectangle contenant le linéaire
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0.25 * 16;
  ctx.shadowBlur = 0.5625 * 16;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
  ctx.fillStyle = 'rgb(250, 249, 245)';
  ctx.strokeStyle = 'rgb(121, 118, 113)';
  ctx.rect(
    MARGIN_LEFT,
    dynamicHeight - LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS - 10,
    width - MARGIN_LEFT - MARGIN_RIGHT,
    40
  );
  ctx.fill();

  powerRestrictions.forEach((range) => {
    if (range.handled) {
      ctx.strokeStyle = 'rgb(121, 118, 113)';
      ctx.fillStyle = 'rgb(121, 118, 113)';
    } else {
      ctx.strokeStyle = 'rgb(217, 28, 28)';
      ctx.fillStyle = 'rgb(217, 28, 28)';
    }
    // Draw vertical line
    const startX = positionOnGraphScale(range.start, maxPosition, width, ratioX, MARGINS);
    const verticalStartY = dynamicHeight - LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS - 10 + 8;
    ctx.beginPath();
    ctx.moveTo(startX, verticalStartY);
    ctx.lineTo(startX, verticalStartY + 24);

    // Draw horizontal line around text
    const textWidth = Math.floor(ctx.measureText(range.code).width);
    const paddingHorizontal = 2;
    const horizontalEndX = positionOnGraphScale(range.stop, maxPosition, width, ratioX, MARGINS);
    const horizontalY = verticalStartY + 11;

    if (horizontalEndX - startX < textWidth + paddingHorizontal * 2 + 4) {
      // Hide text if line is too short
      ctx.moveTo(startX, horizontalY);
      ctx.lineTo(horizontalEndX - 2, horizontalY);
    } else {
      const textStartX = (startX + horizontalEndX) / 2 - textWidth / 2 - paddingHorizontal; // Comment sont gérés les demi pixels ?
      const textEndX = (startX + horizontalEndX) / 2 + textWidth / 2 + paddingHorizontal;

      ctx.moveTo(startX, horizontalY);
      ctx.lineTo(textStartX - paddingHorizontal, horizontalY);
      ctx.moveTo(textEndX + paddingHorizontal, horizontalY);
      ctx.lineTo(horizontalEndX - 2, horizontalY);

      const textX = (startX + horizontalEndX) / 2;
      ctx.fillText(range.code, textX, horizontalY + 3);
    }

    // Draw vertical line
    const verticalEndY = dynamicHeight - LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS - 10 + 14;
    ctx.moveTo(horizontalEndX - 2, verticalEndY);
    ctx.lineTo(horizontalEndX - 2, verticalEndY + 12);

    ctx.stroke();
  });

  ctx.restore();

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, MARGIN_LEFT, height);
  ctx.clearRect(width - MARGIN_RIGHT, 0, MARGIN_RIGHT, height);
};
