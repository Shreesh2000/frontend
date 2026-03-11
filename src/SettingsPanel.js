// SettingsPanel.js
import React, { useState } from 'react';
import { useStore } from './store';

export const SettingsPanel = () => {
  const { apiKeys, setApiKeys } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
      <button className="settings-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '⚙️'}
      </button>
      
      {isOpen && (
        <div className="settings-content">
          <h3>API Configuration</h3>
          <div className="setting-item">
            <label>OpenAI API Key</label>
            <input 
              type="password" 
              placeholder="sk-..." 
              value={apiKeys.openai}
              onChange={(e) => setApiKeys({ openai: e.target.value })}
            />
          </div>
          <div className="setting-item">
            <label>Gemini API Key</label>
            <input 
              type="password" 
              placeholder="AIza..." 
              value={apiKeys.gemini}
              onChange={(e) => setApiKeys({ gemini: e.target.value })}
            />
          </div>
          <p className="setting-hint">Keys are only stored in memory for this session.</p>
        </div>
      )}
    </div>
  );
};
