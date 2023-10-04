const PerPageSelect = ({
    options, defaultValue, onChange
}: {
    options: number[], defaultValue: number, onChange: (value: number) => void
}) => {
    return (
        <div>
            <label htmlFor="itemsPerPage" className="mr-2">Menampilkan:</label>
            <select
                id="itemsPerPage"
                value={defaultValue}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                className="select bg-slate-200 select-bordered"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <label className="ml-2">data</label>
        </div>
    )
}

export default PerPageSelect