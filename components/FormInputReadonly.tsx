const FormInputReadonly = ({
    label, readonly, value
}: {
    label: string,
    readonly?: boolean
    value: string,
}) => {
    return (
        <div className="form-control mb-4">
            <label className="capitalize">{label}</label>
            <input
                type="text"
                readOnly={readonly}
                autoComplete="off"
                value={value}
                className="input input-bordered input-disabled"
            />
        </div>
    )
}

export default FormInputReadonly;