import { useState } from 'react';
import axios from 'axios';
import { Send, AlertCircle } from 'lucide-react';
import { Layout } from './components/Layout';
import { FileUpload } from './components/FileUpload';
import { ExplanationDisplay } from './components/ExplanationDisplay';

function App() {
    const [textContext, setTextContext] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!textContext.trim() && !selectedFile) {
            setError('Please provide some text context or upload an image.');
            return;
        }

        setLoading(true);
        setError('');
        setExplanation('');

        try {
            const formData = new FormData();
            formData.append('text', textContext);
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            // Using axios directly for now, usually we'd have an api client wrapper
            const response = await axios.post('/api/explain', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.explanation) {
                setExplanation(response.data.explanation);
            }
        } catch (err) {
            console.error('Explanation request failed', err);
            setError('Failed to get an explanation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Input Context</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                                    Describe your mess or paste code
                                </label>
                                <textarea
                                    id="context"
                                    rows={6}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border resize-none"
                                    placeholder="e.g., 'What is wrong with this function?' or 'How do I organize this room?'"
                                    value={textContext}
                                    onChange={(e) => setTextContext(e.target.value)}
                                />
                            </div>

                            <FileUpload
                                onFileSelect={setSelectedFile}
                                selectedFile={selectedFile}
                            />

                            {error && (
                                <div className="rounded-md bg-red-50 p-4 border border-red-200 flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || (!textContext && !selectedFile)}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Analyzing...' : (
                                    <>
                                        Explain It <Send className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    <ExplanationDisplay markdown={explanation} loading={loading} />

                    {!explanation && !loading && (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Send className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-lg font-medium text-gray-500">Ready to explain!</p>
                            <p className="text-sm">Submit your inputs to get an AI-powered explanation.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default App;
