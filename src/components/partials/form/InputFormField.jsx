export default function InputFormField({ labelName, type, name, value }) {

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{labelName}</label>
            <input
                type={type}
                id={name}
                name={name}
                required
                defaultValue={value}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    )
}