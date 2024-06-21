import React from 'react';
import type { Store } from '../../types/chartTypes';

type SettingsPanelProps = {
  setStore: React.Dispatch<React.SetStateAction<Store>>;
};

const SettingsPanel = ({ setStore }: SettingsPanelProps) => {
  const closeSettingsPanel = () => {
    setStore((prev) => ({
      ...prev,
      isSettingsPanelOpened: false,
    }));
  };

  return (
    <>
      <div id="settings-panel">
        <div style={{ width: '45%', height: '90%' }}>yop</div>
        <div style={{ width: '45%', height: '90%' }}>re-yop</div>
        <button id="close-settings-panel" onClick={() => closeSettingsPanel()}>
          <span style={{ color: 'rgb(121, 118, 113)' }}>&#10006;</span>
        </button>
      </div>
    </>
  );
};

export default SettingsPanel;
