const Support= () => {
    return (
        <div className="min-h-screen bg-slate-800 text-white p-4">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-white mb-6"> Support</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
                        <h2 className="text-3xl font-bold text-blue-500 mb-8">Contact Information</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-500 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Phone</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-500 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Email</h3>
                                    <p className="text-gray-400">support@contacts.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-500 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Address</h3>
                                    <p className="text-gray-400">123 Contact Street, Management City, MC 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
                        <h2 className="text-3xl font-bold text-blue-500 mb-8">Send Message</h2>
                        
                        <form className="space-y-6">
                            <div>
                                <label className="block text-white font-semibold mb-2">Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:border-blue-500 text-white"
                                    placeholder="Your Name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-white font-semibold mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:border-blue-500 text-white"
                                    placeholder="your@email.com"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-white font-semibold mb-2">Message</label>
                                <textarea 
                                    rows="5"
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:border-blue-500 text-white"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded font-semibold transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;