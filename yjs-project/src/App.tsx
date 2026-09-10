import './App.css';
import { Header } from './components/header/Header';
import { Editor } from './components/editor/Editor.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { CollaborationProvider } from './providers/CollaborationProvider.tsx';

function App() {
  return (
    <div className="layout">
      <CollaborationProvider>
        <Header />
        <div className="container">
          <Editor />
          <Footer />
        </div>
      </CollaborationProvider>
    </div>
  );
}

export default App;
