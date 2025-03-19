import React from 'react';

function MessageCard({ messageData }) {
    const { message, topic, customerId, artistId, createdAt } = messageData;
    const { objectId } = customerId;

    return (
        <div className="max-w-3xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg mb-6 p-6">
            <div className="flex items-center space-x-4">
                <div>
                    <h2 className="text-xl font-semibold text-red-600">User ID: {objectId}</h2>
                    <p className="text-sm text-gray-400">Topic: {topic}</p>
                </div>
            </div>
            <div className="mt-4 text-lg text-gray-300">
                <p>{message}</p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                <p>
                    <span className="font-semibold text-gray-300">Artist ID:</span> {artistId.objectId}
                </p>
                <p className="text-gray-400">Message Sent on: {new Date(createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};
export default function MessagesList({ messages }) {
    return (
        <div className="space-y-6 pt-5">
            {messages.map((messageData) => (
                <MessageCard key={messageData.objectId} messageData={messageData} />
            ))}
        </div>
    );
};


