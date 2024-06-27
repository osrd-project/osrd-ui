import { Store } from '../../../types/chartTypes';
import { clearCanvas, maxPositionValues } from '../../utils';
import { LAYERS_HEIGHTS, MARGINS } from '../../const';

const { CURVE_MARGIN_SIDES, MARGIN_LEFT, MARGIN_TOP, MARGIN_BOTTOM } = MARGINS;

export const drawSpeedLimitTags = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const {
    speedLimitTags,
    ratioX,
    leftOffset,
    linearDisplay: { speedLimitTags: displaySpeedLimitTags },
  } = store;

  const dynamicHeight = displaySpeedLimitTags ? height - 40 : height;

  const { MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT } = MARGINS;

  if (!speedLimitTags) return;
  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const { maxPosition } = maxPositionValues(store);

  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 1;

  // speedLimitTags.position.forEach((pos, index) => {
  //   const tag = speedLimitTags.values[index];
  //   if (tag.speed_limit_tags_type === 'profile') {
  //     const xStart =
  //       pos * ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX + CURVE_MARGIN_SIDES / 2;
  //     const nextPos = speedLimitTags.position[index + 1] || maxPosition;
  //     const xEnd =
  //       nextPos * ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX + CURVE_MARGIN_SIDES / 2;
  //     const rectWidth = xEnd - xStart;
  //     const rectHeight = LAYERS_HEIGHTS.SPEED_LIMIT_TAGS;
  //     const yPosition = height - rectHeight - MARGIN_BOTTOM;

  //     ctx.fillStyle = tag.color;
  //     ctx.strokeStyle = tag.color;

  //     ctx.beginPath();
  //     ctx.rect(xStart + MARGIN_LEFT, yPosition, rectWidth, rectHeight);
  //     ctx.fill();
  //     ctx.closePath();
  //     ctx.stroke();

  //     ctx.fillStyle = tag.color;
  //     const textBackgroundWidth = ctx.measureText(tag.profile).width + 10;
  //     ctx.fillRect(xStart + MARGIN_LEFT, yPosition, textBackgroundWidth, rectHeight);

  //     if (tag.color === '#216482') {
  //       ctx.fillStyle = '#E5F7FF';
  //     } else {
  //       ctx.fillStyle = '#ffffff';
  //     }
  //     ctx.fillRect(
  //       xStart + MARGIN_LEFT + textBackgroundWidth,
  //       yPosition,
  //       rectWidth - textBackgroundWidth,
  //       rectHeight
  //     );

  //     ctx.fillStyle = 'white';
  //     ctx.font = '600 12px "IBM Plex Sans" line-height: 16px';
  //     ctx.textAlign = 'center';
  //     ctx.textBaseline = 'middle';
  //     ctx.fillText(tag.profile, xStart + MARGIN_LEFT + rectWidth / 2, yPosition + rectHeight / 2);
  //   }
  // });

  // ctx.restore();

  speedLimitTags.position.forEach((pos, index) => {
    const tag = speedLimitTags.values[index];
    if (tag.speed_limit_tags_type === 'tag') {
      const xStart =
        pos * ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX + CURVE_MARGIN_SIDES / 2;
      const nextPos = speedLimitTags.position[index + 1] || maxPosition;
      const xEnd =
        nextPos * ((width - CURVE_MARGIN_SIDES) / maxPosition) * ratioX + CURVE_MARGIN_SIDES / 2;
      const rectWidth = xEnd - xStart;
      const rectHeight = LAYERS_HEIGHTS.SPEED_LIMIT_TAGS;
      const yPosition = height - rectHeight - MARGIN_BOTTOM;

      ctx.fillStyle = tag.color;
      ctx.strokeStyle = tag.color;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.rect(xStart + MARGIN_LEFT, yPosition, rectWidth, rectHeight);
      ctx.closePath();
      ctx.stroke();

      ctx.fillRect(xStart + MARGIN_LEFT, yPosition, rectWidth, rectHeight);

      // Text background-color
      ctx.fillStyle = tag.color;
      const textWidth = ctx.measureText(tag.tag_name).width + 10;
      ctx.fillRect(xStart + MARGIN_LEFT, yPosition, textWidth, rectHeight);

      // Fill the second rectangle with a different color
      if (tag.color === '#216482') {
        ctx.fillStyle = '#E5F7FF';
      } else if (tag.color === '#494641') {
        ctx.fillStyle = '#F2F0E4';
      } else {
        ctx.fillStyle = tag.color;
      }
      ctx.fillRect(xStart + MARGIN_LEFT + textWidth, yPosition, rectWidth - textWidth, rectHeight);

      ctx.fillStyle = 'white';
      ctx.font = '600 12px "IBM Plex Sans"';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(tag.tag_name, xStart + MARGIN_LEFT + 5, yPosition + rectHeight / 2);
    }
  });

  ctx.restore();
};
