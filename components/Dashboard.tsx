import React from 'react';
import { ViewState } from '../types';
import { ROUTER_CONFIGS } from '../constants';
import { Network, Clock, FileText, ShieldCheck } from 'lucide-react';

interface DashboardProps {
    onChangeView: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Persiapan Uji Kompetensi Keahlian
                </h1>
                <p className="text-xl text-gray-400">Teknik Jaringan Komputer dan Telekomunikasi - SMK Dwija Bhakti 1</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Total Routers</h3>
                        <Network className="text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-white">10 Units</p>
                    <p className="text-xs text-gray-500 mt-2">R1 Core + 9 Zone Routers</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Alokasi Waktu</h3>
                        <Clock className="text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-white">8 Jam</p>
                    <p className="text-xs text-gray-500 mt-2">Estimasi pengerjaan</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">IP Allocation</h3>
                        <FileText className="text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-white">4096 IPs</p>
                    <p className="text-xs text-gray-500 mt-2">172.16.0.0/20</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Security</h3>
                        <ShieldCheck className="text-red-500" />
                    </div>
                    <p className="text-3xl font-bold text-white">L7 & Filter</p>
                    <p className="text-xs text-gray-500 mt-2">Layer-7 Proto Blocking</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                        <h3 className="text-lg font-bold text-white">Quick Access Modules</h3>
                    </div>
                    <div className="p-6 grid gap-4">
                        <button onClick={() => onChangeView(ViewState.MODULE_1)} className="p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg flex items-center justify-between group transition-all">
                            <div>
                                <h4 className="font-semibold text-white group-hover:text-blue-400">Modul 1: Persiapan</h4>
                                <p className="text-sm text-gray-400">Analisis IP dan Topologi</p>
                            </div>
                            <ArrowRight className="text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                        </button>
                        <button onClick={() => onChangeView(ViewState.MODULE_4)} className="p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg flex items-center justify-between group transition-all">
                            <div>
                                <h4 className="font-semibold text-white group-hover:text-blue-400">Modul 4: Firewall</h4>
                                <p className="text-sm text-gray-400">Block Sosmed & Keamanan</p>
                            </div>
                            <ArrowRight className="text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                     <div className="p-6 border-b border-gray-700">
                        <h3 className="text-lg font-bold text-white">Daftar SSID</h3>
                    </div>
                    <div className="p-0 overflow-y-auto max-h-[300px] scrollbar-thin">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3">Router</th>
                                    <th className="px-6 py-3">SSID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ROUTER_CONFIGS.filter(r => r.role !== 'Core').map((r, i) => (
                                    <tr key={i} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                                        <td className="px-6 py-3 font-medium text-white">{r.name}</td>
                                        <td className="px-6 py-3 font-mono text-blue-400">{r.ssid}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { ArrowRight } from 'lucide-react'; // Added missing import
export default Dashboard;