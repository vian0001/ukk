import React from 'react';
import { Cloud, Server, Monitor, Laptop, ArrowRight, Wifi } from 'lucide-react';
import { ROUTER_CONFIGS } from '../constants';

const TopologyView: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white">Topologi Jaringan Sekolah (Daisy Chain)</h2>
      
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 overflow-x-auto">
        <div className="flex flex-col items-center min-w-[800px]">
            
            {/* Internet Cloud */}
            <div className="flex flex-col items-center mb-8 animate-pulse">
                <Cloud size={64} className="text-blue-400" />
                <span className="text-blue-200 font-semibold mt-2">INTERNET</span>
                <div className="h-8 w-0.5 bg-blue-500 mt-2"></div>
            </div>

            {/* R1 Core */}
            <div className="relative flex flex-col items-center mb-8 w-full max-w-2xl">
                <div className="flex items-center justify-center gap-4 w-full">
                    <div className="bg-indigo-900 p-4 rounded-lg border-2 border-indigo-500 shadow-lg shadow-indigo-900/50 z-10 flex flex-col items-center w-48">
                        <Server size={32} className="text-indigo-300 mb-2" />
                        <span className="font-bold text-white">R1 - CORE</span>
                        <span className="text-xs text-indigo-200">172.16.0.1/30</span>
                    </div>
                </div>
                <div className="h-8 w-0.5 bg-gray-500 mt-0"></div>
            </div>

            {/* Zone Routers Chain */}
            <div className="flex flex-col gap-6 w-full max-w-3xl">
                {ROUTER_CONFIGS.slice(1).map((router, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="flex items-center w-full gap-4">
                            {/* Connector Line Vertical */}
                            {index > 0 && <div className="absolute h-6 w-0.5 bg-gray-600 -mt-6 left-1/2 transform -translate-x-1/2"></div>}
                            
                            {/* Router Node */}
                            <div className="flex-1 bg-gray-700 p-4 rounded-lg border border-gray-600 flex items-center justify-between relative group hover:border-blue-500 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-800 p-2 rounded-full">
                                        <Server size={24} className="text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{router.name}</h3>
                                        <p className="text-xs text-gray-400">IP: {router.ip}</p>
                                    </div>
                                </div>
                                
                                {/* WiFi Info */}
                                <div className="flex flex-col items-end text-right">
                                    <div className="flex items-center gap-2 text-yellow-400">
                                        <span className="text-xs font-mono">{router.ssid}</span>
                                        <Wifi size={16} />
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">Pass: {router.pass}</span>
                                </div>

                                {/* Link to next visual */}
                                {index < ROUTER_CONFIGS.length - 2 && (
                                     <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-gray-600"></div>
                                )}
                            </div>
                        </div>
                        
                        {/* Special Case: R10 connects to Admin PC */}
                        {router.name.includes('R10') && (
                            <div className="mt-8 flex flex-col items-center">
                                <div className="h-8 w-0.5 bg-gray-500"></div>
                                <div className="bg-gray-900 p-4 rounded-lg border border-red-500 flex items-center gap-3">
                                    <Monitor size={24} className="text-red-400" />
                                    <div className="text-center">
                                        <span className="block font-bold text-white">ADMIN PC</span>
                                        <span className="text-xs text-gray-400">Connected to EtherX</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TopologyView;