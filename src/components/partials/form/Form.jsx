export default function Form({ name, error, action, children }) {

    return (
        <div className="opacity-75 min-h-[calc(100vh-4rem-4rem)] flex flex-col items-center justify-center text-red-600 text-center p-6">
            <div className="w-full max-w-md bg-[rgba(31,41,55,0.8)] p-6 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold mb-4 text-center">{name}</h2>
                {error && <p className="error">{error}</p>}
                <form action={action}>
                    {children}
                </form>
            </div>
        </div>
    )
}