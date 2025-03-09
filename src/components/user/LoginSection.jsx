export default function LoginSection() {

    return (
        <div className="opacity-75 min-h-screen flex flex-col items-center justify-center text-red-600 text-center p-6">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="bg-black text-white hover:bg-red-600 hover:text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer bg-black text-white hover:bg-red-600 py-3 px-6 rounded-lg">
                            Login
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm">
                            Don't have an account? <a href="/signup" className="text-red-600 font-semibold hover:text-red-800 hover:underline hover:shadow-md transition-all duration-300 ease-in-out">Register here</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}