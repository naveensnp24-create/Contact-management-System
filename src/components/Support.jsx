const Support = () => {
    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">Support</h1>
                
                <div className="grid gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                        <div className="space-y-3 text-gray-300">
                            <p><span className="font-medium">Email:</span> support@contactmanager.com</p>
                            <p><span className="font-medium">Phone:</span> +1 (555) 123-4567</p>
                            <p><span className="font-medium">Hours:</span> Monday - Friday, 9 AM - 6 PM EST</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-white">How do I add a new contact?</h3>
                                <p className="text-gray-400 text-sm">Click the "Add Contact" button and fill in the required information.</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-white">How do I filter contacts by blood group?</h3>
                                <p className="text-gray-400 text-sm">Use the dropdown menu to select a specific blood group.</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-white">How do I search for contacts?</h3>
                                <p className="text-gray-400 text-sm">Use the search box to find contacts by name or phone number.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="flex gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                Report Bug
                            </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                                Feature Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;