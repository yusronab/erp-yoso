"use client";

import DashboardCard from "@/components/DashboardCard";
import PrintView from "@/components/PrintView";
import ReportFilter from "@/components/ReportFilter";
import { rupiah } from "@/utils/helper";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Print from "./print";
import Table from "./table";

const Content = ({ data, style }: { data: any[]; style: any[] }) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [currentData, setCurrentData] = useState<any[]>([]);
    const [filterDatas, setFilterDatas] = useState('');
    const [options, setOptions] = useState<{ month: string[]; year: string[] }>({ month: [], year: [] });
    const [showReport, setShowReport] = useState(false);

    useEffect(() => {
        const uniqueMonths = new Set<string>();
        const uniqueYears = new Set<string>();

        data.forEach((item) => {
            const createdAtDate = new Date(item.createdAt);

            const month = format(createdAtDate, 'MMMM yyyy');
            const year = format(createdAtDate, 'yyyy');

            uniqueMonths.add(month);
            uniqueYears.add(year);
        });

        const monthArray = Array.from<string>(uniqueMonths);
        const yearArray = Array.from<string>(uniqueYears);

        setOptions({ month: monthArray, year: yearArray })

    }, [data])

    const handleFilter = () => {
        let temp: any[] = [];

        if (selectedTab === 1) {
            const filteredData = data.filter((item) => {
                const createdAtDate = new Date(item.createdAt).toISOString().split('T')[0];

                return createdAtDate === filterDatas;
            });

            temp = [...filteredData];
        };
        if (selectedTab === 2) {
            const filteredData = data.filter((item) => {
                const createdAtDate = new Date(item.createdAt);
                const monthYear = createdAtDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                return monthYear === filterDatas;
            });

            temp = [...filteredData];
        };

        if (selectedTab === 3) {
            const filteredData = data.filter((item) => {
                const createdAtDate = new Date(item.createdAt);

                const year = createdAtDate.getFullYear().toString();

                return year === filterDatas;
            });

            temp = [...filteredData];
        };

        setCurrentData(temp);
        setShowReport(true);
    }

    return (
        <div>
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li
                        className={showReport ? '' : 'text-[#4e73df]'}
                        onClick={() => setShowReport(false)}
                    >
                        Pembelian Barang Subcont
                    </li>
                    {showReport && <li className="text-[#4e73df]">Laporan</li>}
                </ul>
            </div>
            {showReport ? (
                <>
                    <div className="grid grid-cols-3 gap-5 mb-5">
                        <DashboardCard
                            title="Total Pembelian Barang"
                            total={rupiah(currentData.reduce((acc, item) => acc += item.total, 0))}
                            color="blue"
                        />
                        <DashboardCard
                            title="Total Dibayarkan"
                            total={rupiah(currentData.reduce((acc, item) => acc += item.tenor, 0))}
                            color="green"
                        />
                        <DashboardCard
                            title="Total Utang"
                            total={
                                rupiah(currentData.reduce((acc, item) => acc += (item.total - item.tenor), 0))
                            }
                            color="yellow"
                        />
                    </div>
                    <PrintView
                        buttonText="cetak"
                        docTitle="print-report-subcont"
                        contentComponent={
                            <Print
                                data={currentData}
                                selected={selectedTab}
                                selectedValue={filterDatas}
                            />
                        }
                    />
                    <Table data={currentData} style={style} />
                </>
            ) : (
                <ReportFilter
                    selectedTab={selectedTab}
                    filterDatas={filterDatas}
                    setSelectedTab={setSelectedTab}
                    setFilterDatas={setFilterDatas}
                    options={options}
                    onClick={handleFilter}
                />
            )}
        </div>
    );
};

export default Content;