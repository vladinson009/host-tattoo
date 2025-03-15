export default function SelectFormField({ name, artists, labelName }) {

    return (
        <div className="mb-4">
            <label htmlFor={name} className="text-2xl text-white">{labelName}</label>
            <select
                id={name}
                name={name}
                required
                defaultValue=""
                className="text-2xl md:text-3xl mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"

            >
                <option value="" disabled></option>
                {artists.length > 0 && artists.map(artist => <option key={artist.objectId} value={artist.objectId}>{artist.name}</option>)}
            </select>
        </div>
    )
}