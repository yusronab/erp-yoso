const ReportFilter = ({
    selectedTab,
    filterDatas,
    setSelectedTab,
    setFilterDatas,
    options,
    onClick,
}: {
    selectedTab: number;
    filterDatas: string;
    setSelectedTab: (num: number) => void;
    setFilterDatas: (s: string) => void;
    options: { month: string[], year: string[] },
    onClick: () => void;
}) => {
    return (
        <div>
            <div className="tabs tabs-boxed mb-5">
                <a
                    className={`tab ${selectedTab === 1 && 'tab-active'}`}
                    onClick={() => setSelectedTab(1)}
                >
                    Harian
                </a>
                <a
                    className={`tab ${selectedTab === 2 && 'tab-active'}`}
                    onClick={() => setSelectedTab(2)}
                >
                    Bulanan
                </a>
                <a
                    className={`tab ${selectedTab === 3 && 'tab-active'}`}
                    onClick={() => setSelectedTab(3)}
                >
                    Tahunan
                </a>
            </div>

            <div>
                {selectedTab === 1 && (
                    <div>
                        <label>Pertanggal</label>
                        <input
                            type="date"
                            name="filterDatas"
                            value={filterDatas}
                            onChange={(e) => setFilterDatas(e.target.value)}
                            className="input input-bordered ms-3"
                        />
                    </div>
                )}
                {selectedTab === 2 && (
                    <div>
                        <label>Bulan</label>
                        <select
                            name="filterDatas"
                            value={filterDatas}
                            onChange={(e) => setFilterDatas(e.target.value)}
                            className="select select-bordered ms-3"
                        >
                            <option value="">Pilih bulan</option>
                            {options.month.length !== 0 && options.month.map((item, i) => (
                                <option value={item} key={i}>{item}</option>
                            ))}
                        </select>
                    </div>
                )}
                {selectedTab === 3 && (
                    <div>
                        <label>Tahun</label>
                        <select
                            name="filterDatas"
                            value={filterDatas}
                            onChange={(e) => setFilterDatas(e.target.value)}
                            className="select select-bordered ms-3"
                        >
                            <option value="">Pilih tahun</option>
                            {options.year.length !== 0 && options.year.map((item, i) => (
                                <option value={item} key={i}>{item}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary capitalize" onClick={onClick}>lihat laporan</button>
                </div>
            </div>
        </div>
    );
};

export default ReportFilter;