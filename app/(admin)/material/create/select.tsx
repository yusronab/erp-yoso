import Select from "react-select";

const SelectInput = ({
    listData, onChange, placeholder
}: {
    listData: any[], onChange: (e: any) => void, placeholder: string
}) => {
    return (
        <>
            {listData.length !== 0 && (
                <Select
                    options={listData.map(item => (
                        {
                            value: item.id,
                            label: item.name
                        }
                    ))}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
        </>
    )
}

export default SelectInput