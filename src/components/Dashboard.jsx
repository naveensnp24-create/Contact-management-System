import { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [recentCalls, setRecentCalls] = useState([]);
    const [bloodGroupStats, setBloodGroupStats] = useState([]);
    const [callFrequency, setCallFrequency] = useState([]);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const [callsRes, statsRes, freqRes] = await Promise.all([
                contactAPI.getRecentCalls(),
                contactAPI.getBloodGroupStats(),
                contactAPI.getCallFrequency()
            ]);
            setRecentCalls(callsRes.data);
            setBloodGroupStats(statsRes.data);
            setCallFrequency(freqRes.data);
        } catch (error) {
            toast.error('Failed to fetch analytics');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">Analytics Dashboard</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Recent Calls */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Recent Calls</h2>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {recentCalls.map((call, index) => (
                                <div key={index} className="bg-gray-700 p-3 rounded">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-white font-medium">{call.contactName}</p>
                                            <p className="text-gray-400 text-sm">{call.phone}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-300 text-sm">{formatDate(call.date)}</p>
                                            <p className="text-green-400 text-sm">{formatDuration(call.duration)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Blood Group Distribution */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Blood Group Distribution</h2>
                        <div className="space-y-2">
                            {bloodGroupStats.map((stat) => (
                                <div key={stat._id} className="flex justify-between items-center">
                                    <span className="text-white">{stat._id}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 bg-gray-700 rounded-full h-2">
                                            <div 
                                                className="bg-red-600 h-2 rounded-full"
                                                style={{ width: `${(stat.count / Math.max(...bloodGroupStats.map(s => s.count))) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-gray-300 text-sm w-8">{stat.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call Frequency */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Call Frequency</h2>
                    <div className="grid gap-3">
                        {callFrequency.slice(0, 10).map((contact, index) => (
                            <div key={index} className="bg-gray-700 p-3 rounded flex justify-between items-center">
                                <div>
                                    <p className="text-white font-medium">{contact.name}</p>
                                    <p className="text-gray-400 text-sm">
                                        Last call: {contact.lastCall ? formatDate(contact.lastCall) : 'Never'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-blue-400 font-semibold">{contact.callCount} calls</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;