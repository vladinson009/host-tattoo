export default function ContactSection() {
    return (
        <div className="opacity-75 min-h-screen flex flex-col items-center justify-center text-red-600 text-center p-6">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            type="password"
                            id="message"
                            name="message"
                            required
                            className="w-full h-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="bg-black text-white hover:bg-red-600 hover:text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer bg-black text-white hover:bg-red-600 py-3 px-6 rounded-lg">
                            Send email
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}