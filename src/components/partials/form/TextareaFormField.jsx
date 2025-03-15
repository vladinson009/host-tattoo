export default function TextareaFormField({ name, labelName, value }) {

    return (
        <>
            <div className="mb-4">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{labelName}</label>
                <textarea

                    id={name}
                    name={name}
                    required
                    defaultValue={value}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            {/* <div className="mb-4">
                <label htmlFor="description" className="text-xl">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full h-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                /> */}
            {/* </div > */}
        </>
    )

}