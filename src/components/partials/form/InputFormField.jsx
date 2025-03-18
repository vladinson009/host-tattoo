export default function InputFormField({ labelName, type, name, value }) {

    return (
        <div className="mb-4">
            <label htmlFor={name} className="text-2xl text-white">{labelName}</label>
            <input
                type={type}
                id={name}
                name={name}
                required
                defaultValue={value}
                className="text-1xl md:text-2xl mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    )
}