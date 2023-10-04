"use client";

import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (searchValue: string) => void }) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        onSearch(keyword);
    };

    return (
        <div className="flex gap-3 items-center">
            <p>Search</p>
            <input
                type="text"
                placeholder="Ketik disini . . ."
                value={searchKeyword}
                onChange={handleSearch}
                className="input p-2 input-bordered"
            />
        </div>
    )
}

export default SearchBar;