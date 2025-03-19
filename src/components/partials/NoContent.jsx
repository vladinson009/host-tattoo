export default function NoContent({ content }) {

    return (
        <div className="min-h-[calc(100vh-4rem-4rem)] flex flex-col items-center justify-center text-red-600 text-center p-6">
            <div className="max-w-2xl mx-auto py-8 space-y-6 pt-20">
                <h2 className="text-4xl font-black mb-6 drop-shadow-lg text-center">{content}</h2>
            </div>
        </div>
    )
}