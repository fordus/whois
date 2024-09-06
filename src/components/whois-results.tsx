import React from "react";
import Card from "./card";

interface WhoisData {
    domain?: string;
    expires_at?: string;
}

interface WhoisResultsProps {
    results: WhoisData;
}

const WhoisResults: React.FC<WhoisResultsProps> = ({ results }) => (
    <Card>
        <div className="p-6">
            <div className="mb-4">
                <span className="font-semibold text-gray-700">NAME:</span>
                <span className="ml-2 text-gray-900">
                    {results.domain ?? "N/A"}
                </span>
            </div>
            <div>
                <span className="font-semibold text-gray-700">EXPIRE:</span>
                <span className="ml-2 text-gray-900">
                    {results.expires_at ?? "N/A"}
                </span>
            </div>
            <div className="mt-6">
                <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg border border-gray-300 text-gray-800">
                    {JSON.stringify(results, null, 2)}
                </pre>
            </div>
        </div>
    </Card>
);

export default WhoisResults;