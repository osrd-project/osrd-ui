import {
  clearCanvas,
  drawLinearLayerBackground,
  drawSeparatorLinearLayer,
  maxPositionValues,
  positionOnGraphScale,
} from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { LINEAR_LAYERS_BACKGROUND_COLOR, MARGINS } from '../../const';

export const drawElectricalProfile = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { electricalProfiles, ratioX, leftOffset, cursor } = store;

  if (!electricalProfiles) return;
  clearCanvas(ctx, width, height);

  ctx.save();
  ctx.translate(leftOffset, 0);
  const { maxPosition } = maxPositionValues(store);
  const { values, boundaries } = electricalProfiles;
  const { MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT, CURVE_MARGIN_SIDES } = MARGINS;

  drawLinearLayerBackground(
    ctx,
    LINEAR_LAYERS_BACKGROUND_COLOR.FIRST,
    MARGINS,
    width,
    height,
    store.layersDisplay
  );

  values.forEach((data, index) => {
    const x =
      index === 0
        ? MARGIN_LEFT + CURVE_MARGIN_SIDES / 2
        : positionOnGraphScale(boundaries[index - 1], maxPosition, width, ratioX, MARGINS);

    let startHeight = height - MARGIN_BOTTOM + 8;

    const profileWidth =
      index === values.length - 1
        ? positionOnGraphScale(boundaries[index], maxPosition, width, ratioX, MARGINS) - x
        : positionOnGraphScale(boundaries[index], maxPosition, width, ratioX, MARGINS) - x;

    if ('profile' in data) {
      const { profile, profileColor, heightLevel } = data;
      const heightLevelMax = heightLevel > 7 ? 7 : heightLevel;
      ctx.fillStyle = profileColor;

      if (profile === 'incompatible') {
        // Incompatible profile
        ctx.beginPath();
        for (let i = 0; i < 9; i++) {
          ctx.fillRect(x, startHeight + 15 + i * 3, profileWidth, 1);
        }
        ctx.stroke();
      } else {
        ctx.beginPath();

        startHeight += heightLevelMax * 4;

        const profileHeight = 40 - heightLevelMax * 4;

        ctx.fillRect(x, startHeight, profileWidth, profileHeight);
        ctx.stroke();

        // Draw only if cursor hover a profile
        if (
          cursor.y &&
          cursor.x &&
          cursor.y <= height - MARGIN_BOTTOM + MARGIN_TOP &&
          cursor.y >= height - MARGIN_BOTTOM + MARGIN_TOP - 56 &&
          cursor.x - leftOffset >= x - MARGIN_LEFT &&
          cursor.x - leftOffset <= x + profileWidth - MARGIN_LEFT
        ) {
          ctx.beginPath();
          ctx.globalAlpha = 0.2;
          ctx.fillRect(x, MARGIN_TOP, profileWidth, height - 30);
          ctx.globalAlpha = 1;
          ctx.stroke();
          // Find how to make the box shadow work
          // ctx.shadowOffsetY = 1;
          // ctx.shadowBlur = 2;
          // ctx.shadowColor = 'rgba(0, 0, 0, 0.19)';
          // ctx.shadowOffsetY = 4;
          // ctx.shadowBlur = 9;
          // ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';

          ctx.beginPath();
          ctx.strokeStyle = '#FFF';
          ctx.lineWidth = 2;
          ctx.strokeRect(x - 1, startHeight - 1, profileWidth + 2, profileHeight + 2);
          ctx.stroke();

          // Draw profile name
          if (profileWidth > 50) {
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.font = '600 14px IBM Plex Sans';
            ctx.textAlign = 'center';
            ctx.fillText(`${profile}`, x + profileWidth / 2, height / 2, profileWidth - 10);
            ctx.stroke();
          }

          // Draw begin and end position
          ctx.beginPath();
          ctx.fillStyle = 'rgb(49, 46, 43)';
          ctx.font = '400 14px IBM Plex Sans';
          ctx.textAlign = 'right';
          ctx.fillText(`${x.toFixed(1)}`, x - 12, height / 2);
          ctx.textAlign = 'left';
          ctx.fillText(`${(x + profileWidth).toFixed(1)}`, x + profileWidth + 12, height / 2);
          ctx.stroke();
        }
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = '#1F1B17';
      ctx.fillRect(x, startHeight + 28, profileWidth, 9);
      ctx.clearRect(x, startHeight + 31, profileWidth, 3);
      ctx.stroke();
    }
  });

  drawSeparatorLinearLayer(ctx, 'rgba(0,0,0,0.1)', MARGINS, width, height + 1);

  ctx.restore();

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, MARGIN_LEFT, height);
  ctx.clearRect(width - MARGIN_RIGHT, 0, MARGIN_RIGHT, height);
};
