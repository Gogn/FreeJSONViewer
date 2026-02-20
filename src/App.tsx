import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useSettings } from './hooks/useSettings';
import { useJsonParser } from './hooks/useJsonParser';
import Header from './components/Header';
import ErrorDisplay from './components/ErrorDisplay';
import SettingsModal from './components/SettingsModal';
import AboutModal from './components/AboutModal';
import SupportModal from './components/SupportModal.tsx';
import RawText from './components/RawText/RawText';
import TreeViewer from './components/TreeViewer/TreeViewer';
import { ActiveTab } from './types';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { settings, save: saveSettings } = useSettings();

  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('raw');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [supportOpen, setsupportOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const { data, error } = useJsonParser(input);

  const showBanner =
    !!error &&
    !bannerDismissed &&
    (settings.errorMode === 'banner' || settings.errorMode === 'both');

  const handleInputChange = (value: string) => {
    setInput(value);
    setBannerDismissed(false);
  };

  return (
    <div className="app">
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        onSettingsOpen={() => setSettingsOpen(true)}
        onAboutOpen={() => setAboutOpen(true)}
        onSupportOpen={() => setsupportOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasError={!!error}
        errorMode={settings.errorMode}
      />

      {showBanner && <ErrorDisplay error={error!} onDismiss={() => setBannerDismissed(true)} />}

      <div className="content">
        {activeTab === 'raw' && (
          <RawText
            value={input}
            onChange={handleInputChange}
            error={error}
            errorMode={settings.errorMode}
          />
        )}
        {activeTab === 'tree' && <TreeViewer data={data} isEmpty={!input.trim()} />}
      </div>

      {settingsOpen && (
        <SettingsModal
          settings={settings}
          onSave={saveSettings}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {supportOpen && <SupportModal onClose={() => setsupportOpen(false)} />}
    </div>
  );
}
