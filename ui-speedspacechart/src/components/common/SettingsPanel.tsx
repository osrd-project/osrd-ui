import React from 'react';
import type { Store } from '../../types/chartTypes';
import { DETAILS_BOX_SELECTION, LAYERS_SELECTION } from '../const';
import { X } from '../../../../ui-icons/src/components/X';

type SettingsPanelProps = {
  color: string;
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
};

const SettingsPanel = ({ color, store, setStore }: SettingsPanelProps) => {
  const closeSettingsPanel = () => {
    setStore((prev) => ({
      ...prev,
      isSettingsPanelOpened: false,
    }));
  };

  return (
    <div
      id="settings-panel"
      style={{ background: `rgba(${color.substring(4, color.length - 1)}, 0.4)` }}
    >
      <div style={{ width: '227px', marginLeft: '32px', marginTop: '29px' }}>
        <div className="settings-panel-section font-sans">
          <span>Context</span>
        </div>
        {LAYERS_SELECTION.map((selection) => (
          <div key={selection} className="selection">
            <input
              type="checkbox"
              id={`layers-selection-${selection}`}
              name={`layers-selection-${selection}`}
              className="selection-checkbox"
              checked={store.layersDisplay[selection]}
              onChange={() => {
                setStore((prev) => ({
                  ...prev,
                  layersDisplay: {
                    ...prev.layersDisplay,
                    [selection]: !prev.layersDisplay[selection],
                  },
                }));
              }}
            />
            <label htmlFor={`layers-selection-${selection}`} className="selection-label">
              {selection}
            </label>
          </div>
        ))}
      </div>
      <div style={{ width: '227px', marginLeft: '16px', marginTop: '29px' }}>
        <div className="settings-panel-section">
          <span>Reticle infos</span>
        </div>
        {DETAILS_BOX_SELECTION.map((selection) => (
          <div key={selection} className="selection">
            {/* TODO: replace with ui-core checkbox */}
            <input
              type="checkbox"
              id={`details-box-selection-${selection}`}
              name={`details-box-selection-${selection}`}
              className="selection-checkbox"
              checked={store.detailsBoxDisplay[selection]}
              onChange={() => {
                setStore((prev) => ({
                  ...prev,
                  detailsBoxDisplay: {
                    ...prev.detailsBoxDisplay,
                    [selection]: !prev.detailsBoxDisplay[selection],
                  },
                }));
              }}
            />
            <label htmlFor={`details-box-selection-${selection}`} className="selection-label">
              {selection}
            </label>
          </div>
        ))}
      </div>
      <button id="close-settings-panel" onClick={() => closeSettingsPanel()}>
        <span>
          <X />
        </span>
      </button>
    </div>
  );
};

export default SettingsPanel;
