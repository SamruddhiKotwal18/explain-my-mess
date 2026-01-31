import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { Bot, Sparkles } from 'lucide-react';

interface ExplanationDisplayProps {
    markdown: string;
    loading?: boolean;
}

export function ExplanationDisplay({ markdown, loading }: ExplanationDisplayProps) {
    if (loading) {
        return (
            <div className="w-full p-6 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col items-center justify-center min-h-[200px] space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                    <div className="relative p-3 bg-blue-50 rounded-full">
                        <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
                    </div>
                </div>
                <p className="text-sm text-gray-500 animate-pulse font-medium">Analyzing your mess...</p>
            </div>
        );
    }

    if (!markdown) {
        return null;
    }

    return (
        <div className="w-full border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <h2 className="text-sm font-semibold text-gray-900">Explanation</h2>
            </div>
            <div className="p-6 prose prose-blue max-w-none">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2" {...props} />,
                        p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-5 mb-4 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-1" {...props} />,
                        code: ({ node, inline, className, children, ...props }: any) => {
                            return inline ? (
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono">
                                    <code {...props}>{children}</code>
                                </pre>
                            );
                        },
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-blue-200 pl-4 py-1 italic text-gray-600 bg-blue-50/50 my-4 rounded-r" {...props} />
                        )
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
}
