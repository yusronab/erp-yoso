const FormInput = ({
    label, placeholder, required, name, value, onChange
}: {
    label: string,
    placeholder: string,
    required?: boolean
    name: string,
    value: string,
    onChange: (e: any) => void,
}) => {
    return (
        <div className="form-control mb-4">
            <label className="capitalize">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                required={required ?? true}
                name={name}
                autoComplete="off"
                value={value}
                onChange={onChange}
                className="input input-bordered"
            />
        </div>
    )
}

export default FormInput;