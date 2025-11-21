import React from 'react';
import { ViewState } from '../types';
import { Network, Shield, BookOpen, LayoutDashboard, MessageSquare } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.TOPOLOGY, label: 'Visualisasi Topologi', icon: Network },
    { id: ViewState.MODULE_1, label: 'Modul 1: Analisis', icon: BookOpen },
    { id: ViewState.MODULE_2, label: 'Modul 2: Core R1', icon: BookOpen },
    { id: ViewState.MODULE_3, label: 'Modul 3: Router Zona', icon: BookOpen },
    { id: ViewState.MODULE_4, label: 'Modul 4: Keamanan', icon: Shield },
    { id: ViewState.CHAT, label: 'AI Tutor', icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 h-screen flex flex-col sticky top-0 hidden md:flex">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Network className="text-blue-500" />
          UKK TJKT 2025
        </h1>
        <p className="text-xs text-gray-400 mt-1">SMK Dwija Bhakti 1</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-900 p-3 rounded text-xs text-gray-500">
            <p>IP Utama: 172.16.0.0/20</p>
            <p>Durasi: 8 Jam</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;