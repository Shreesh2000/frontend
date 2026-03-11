import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { SettingsPanel } from './SettingsPanel';

function App() {
  return (
    <div className="app-container">
      <SettingsPanel />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
