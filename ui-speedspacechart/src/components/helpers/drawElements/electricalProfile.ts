import { clearCanvas, maxPositionValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';

const positionOnGraphScale = (
  position: number,
  maxPosition: number,
  width: number,
  ratioX: number
) => {
  return (
    ((width - MARGINS.CURVE_MARGIN_SIDES - MARGINS.MARGIN_LEFT - MARGINS.MARGIN_RIGHT) /
      maxPosition) *
      position *
      ratioX +
    MARGINS.MARGIN_LEFT +
    MARGINS.CURVE_MARGIN_SIDES / 2
  );
};

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

  values.forEach((data, index) => {
    const x =
      index === 0
        ? MARGIN_LEFT + CURVE_MARGIN_SIDES / 2
        : positionOnGraphScale(boundaries[index - 1], maxPosition, width, ratioX);

    let startHeight = height - MARGIN_BOTTOM + 8;

    const profileWidth =
      index === values.length - 1
        ? positionOnGraphScale(boundaries[index], maxPosition, width, ratioX) - x
        : positionOnGraphScale(boundaries[index], maxPosition, width, ratioX) - x;

    if ('profile' in data) {
      const { profile, profileColor, heightLevel } = data;
      if (profile === 'incompatible') {
        // Imcompatible profile
        ctx.beginPath();
        ctx.fillStyle = profileColor;
        for (let i = 0; i < 9; i++) {
          ctx.fillRect(x, startHeight + 15 + i * 3, profileWidth, 1);
        }
        ctx.stroke();
      } else {
        ctx.beginPath();

        ctx.fillStyle = profileColor;

        startHeight += heightLevel * 4;

        const profileHeight = 40 - heightLevel * 4;

        ctx.fillRect(x, startHeight, profileWidth, profileHeight);

        if (
          cursor.y &&
          cursor.x &&
          cursor.y <= height - MARGIN_BOTTOM + MARGIN_TOP &&
          cursor.y >= height - MARGIN_BOTTOM + MARGIN_TOP - 56 &&
          cursor.x - leftOffset >= x - MARGIN_LEFT &&
          cursor.x - leftOffset <= x + profileWidth - MARGIN_LEFT
        ) {
          ctx.beginPath();
          ctx.fillStyle = profileColor;
          ctx.globalAlpha = 0.2;
          ctx.fillRect(x, MARGIN_TOP, profileWidth, height);
          ctx.globalAlpha = 1;

          ctx.fillStyle = '#1F1B17';
          ctx.font = 'bold 32px IBM Plex Sans';
          ctx.textAlign = 'center';
          ctx.fillText(`${profile}`, x + profileWidth / 2, height / 2, profileWidth - 10);
        }
        ctx.stroke();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = '#1F1B17';
      ctx.fillRect(x, startHeight + 28, profileWidth, 9);
      ctx.clearRect(x, startHeight + 31, profileWidth, 3);
      ctx.stroke();
    }
  });

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 1;
  ctx.moveTo(MARGIN_LEFT, height - MARGIN_BOTTOM);
  ctx.lineTo(width - MARGIN_RIGHT, height - MARGIN_BOTTOM);
  ctx.stroke();

  ctx.restore();

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, MARGIN_LEFT, height);
  ctx.clearRect(width - MARGIN_RIGHT, 0, MARGIN_RIGHT, height);
};
