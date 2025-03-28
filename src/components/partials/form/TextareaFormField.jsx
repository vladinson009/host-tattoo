export default function TextareaFormField({ name, labelName, value, placeholder }) {
    // reusable text area field component

    return (
        <div className="mb-4">
            <label htmlFor={name} className="text-2xl text-white">{labelName}</label>
            <textarea
                id={name}
                name={name}
                required
                defaultValue={value}
                className="text-1xl md:text-1xl mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder={placeholder}
            />
        </div>
    )

}