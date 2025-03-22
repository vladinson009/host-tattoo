import { SearchIcon } from 'lucide-react';
export default function SearchBar({ onSearch, query, setQuery }) {

    // simple search bar component searching by tattoo name
    return (
        <div className="flex justify-center mb-6">
            <div className="relative w-full sm:w-1/2 lg:w-1/3 border border-red-800 rounded-lg">
                <input
                    type="text"
                    className="w-full p-3 pl-10 pr-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Search by Tattoo name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}

                />
                <button
                    onClick={() => onSearch(query)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white text-lg"
                >
                    <SearchIcon className='hover:animate-bounce hover:cursor-pointer hover:text-red-500' size={24} />
                </button>
            </div>
        </div>
    );
}
