import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ModuleContent from './components/ModuleContent';
import TopologyView from './components/TopologyView';
import ChatTutor from './components/ChatTutor';
import { ViewState } from './types';
import { EXAM_MODULES } from './constants';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
      case ViewState.TOPOLOGY:
        return <TopologyView />;
      case ViewState.MODULE_1:
        return <ModuleContent module={EXAM_MODULES[0]} />;
      case ViewState.MODULE_2:
        return <ModuleContent module={EXAM_MODULES[1]} />;
      case ViewState.MODULE_3:
        return <ModuleContent module={EXAM_MODULES[2]} />;
      case ViewState.MODULE_4:
        return <ModuleContent module={EXAM_MODULES[3]} />;
      case ViewState.CHAT:
        return <ChatTutor />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex font-sans">
      {/* Sidebar Desktop */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Mobile Header & Menu Overlay */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 z-50 border-b border-gray-700 px-4 py-3 flex justify-between items-center">
        <span className="text-white font-bold">UKK TJKT</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-40 pt-16 px-4 md:hidden">
             <div className="flex flex-col gap-2">
                 <button onClick={() => { setCurrentView(ViewState.DASHBOARD); setIsMobileMenuOpen(false); }} className="p-3 bg-gray-800 rounded text-white text-left">Dashboard</button>
                 <button onClick={() => { setCurrentView(ViewState.TOPOLOGY); setIsMobileMenuOpen(false); }} className="p-3 bg-gray-800 rounded text-white text-left">Topologi</button>
                 <button onClick={() => { setCurrentView(ViewState.MODULE_1); setIsMobileMenuOpen(false); }} className="p-3 bg-gray-800 rounded text-white text-left">Modul 1</button>
                 <button onClick={() => { setCurrentView(ViewState.MODULE_2); setIsMobileMenuOpen(false); }} className="p-3 bg-gray-800 rounded text-white text-left">Modul 2</button>
                 <button onClick={() => { setCurrentView(ViewState.MODULE_3); setIsMobileMenuOpen(false); }} className="p-3 bg-gray-800 rounded text-white text-left">Modul 3</button>
                 <button onClick={() => { setCurrentView(ViewState.MODULE_4); setIsMobileMenuOpen(false); }} className="p-3 bg-gray-800 rounded text-white text-left">Modul 4</button>
                 <button onClick={() => { setCurrentView(ViewState.CHAT); setIsMobileMenuOpen(false); }} className="p-3 bg-blue-700 rounded text-white text-left">AI Tutor</button>
             </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen pt-16 md:pt-0 relative scrollbar-thin">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;