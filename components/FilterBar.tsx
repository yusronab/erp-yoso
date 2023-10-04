import Select from "react-select";

const FilterSelect = ({
    options, onSelectFilter, table
}: {
    options: { id: number; name: string }[];
    onSelectFilter: (selected: { id: number; name: string } | null, table: string) => void;
    table: string
}) => {
    return (
        <Select
            options={options.map((item) => ({
                value: item.id,
                label: item.name,
            }))}
            onChange={(selectedOption) =>
                onSelectFilter(
                    selectedOption ? { id: selectedOption.value, name: selectedOption.label } : null, table
                )
            }
            placeholder={`Pilih ${table} . . .`}
        />
    );
};

export default FilterSelect;