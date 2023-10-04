"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { rupiah } from "@/utils/helper";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const FormOrder = ({
    code, product: data
}: {
    code: string, product: any[]
}) => {
    const { data: session } = useSession();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState(1);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    const tabChangeHandler = (tab: number) => setSelectedTab(tab);

    const handleSearch = (keyword: string) => {
        const filtered = data.filter(item =>
            item.name?.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(filtered);

        if (!keyword) setFiltering(false);
        if (keyword) setFiltering(true);
    };


    const handleItemPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(0);
    };

    const handleCheckboxChange = (selectedRow: any) => {
        if (selectedItems.includes(selectedRow)) {
            setSelectedItems(selectedItems.filter((row) => row !== selectedRow));
        } else {
            setSelectedItems([...selectedItems, selectedRow]);
        }
    };

    const tabData = filteredData.filter((item) => {
        if (selectedTab === 1) {
            return item.productType === 1;
        } else if (selectedTab === 2) {
            return item.productType === 2;
        }
        return true;
    });

    const startEntry = startIndex + 1;
    const endEntry = Math.min(endIndex, tabData.length);
    const totalData = filtering ? data.length : tabData.length;
    const showingText = filtering
        ? `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} 
        data (difilter berdasarkan ${data.length} total data)`
        : `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} data`;

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const [itemStocks, setItemStocks] = useState<any>({});

    useEffect(() => {
        const initialItemStocks: { [key: number]: number } = {};
        selectedItems.forEach((item) => {
            initialItemStocks[item.id] = 1;
        });
        setItemStocks(initialItemStocks);
    }, [selectedItems]);

    const handleIncrement = (itemId: number) => {
        setItemStocks((prevItemStocks: any) => {
            const a = prevItemStocks[itemId] + 1;
            return { ...prevItemStocks, [itemId]: a };
        });
    };

    const handleDecrement = (itemId: number) => {
        if (itemStocks[itemId] > 1) {
            setItemStocks((prevItemStocks: any) => ({
                ...prevItemStocks,
                [itemId]: prevItemStocks[itemId] - 1
            }));
        }
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;

        selectedItems.forEach((item) => {
            const productId = item.id;
            const productPrice = item.price;
            const productJumlah = itemStocks[productId] || 1;

            total += productPrice * productJumlah;
        })

        setTotalPrice(total)
    }, [itemStocks]);

    const router = useRouter();

    const handleSubmit = () => {
        setIsLoading(true);

        const items = selectedItems.map((item) => {
            const amount = itemStocks[item.id];

            return {
                code: item.code,
                name: item.name,
                qty: amount,
                pricePerItem: item.price,
                satuan: item.satuan.name,
            };
        });

        const body = {
            code: code,
            userId: Number(session?.user.id),
            detail: JSON.stringify(items),
            total: totalPrice,
        };

        axios.post('/api/order', body)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'Error saat POST berlangsung'))
            .finally(() => {
                setIsLoading(false);
                router.push('/order');
            });
    };

    return (
        <div className="p-3 border">
            <div className="form-control mb-4">
                <label>Nomor YM</label>
                <input
                    type="text"
                    name="code"
                    value={code}
                    readOnly
                    className="input input-bordered input-disabled"
                />
            </div>
            <div className="form-control mb-4">
                <label>Tanggal</label>
                <input
                    type="text"
                    value={new Date().toLocaleString()}
                    readOnly
                    className="input input-bordered input-disabled"
                />
            </div>
            <button
                className="btn btn-outline btn-primary capitalize mb-4"
                onClick={modalHandler}
            >
                Pilih produk
            </button>
            <table className="table bordered">
                <thead className="bg-[#4e73df] text-white">
                    <tr>
                        <th>Kode</th>
                        <th>Nama Produk</th>
                        <th>Satuan</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length !== 0 ?
                        selectedItems.map((row, index) => (
                            <tr key={index}>
                                <td>{row.code ?? 'Kosong'}</td>
                                <td>{row.name}</td>
                                <td className="capitalize flex flex-row">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleDecrement(row.id)}
                                    >-
                                    </button>
                                    <p className="text-error font-bold">
                                        {itemStocks[row.id] !== undefined ? itemStocks[row.id] : 0}
                                        - {row.satuan.name}
                                    </p>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleIncrement(row.id)}
                                    >+
                                    </button>
                                </td>
                                <td>{rupiah(row.price * itemStocks[row.id] ?? row.price)}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-gray-500 text-center">
                                    Belum ada produk terpilih
                                </td>
                            </tr>
                        )}
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Subtotal</td>
                        <td className="bg-[#4e73df] text-white">
                            {rupiah(totalPrice)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Diskon</td>
                        <td className="bg-[#4e73df] text-white">0</td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Total</td>
                        <td className="bg-[#4e73df] text-white">
                            {rupiah(totalPrice)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-between mt-5">
                <p>Nama sales: {session?.user.name}</p>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="btn btn-success capitalize mr-3"
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="loading loading-spinner text-white"></span>
                            : 'simpan'}
                    </button>
                    <button className="btn btn-error capitalize">reset</button>
                </div>
            </div>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold capitalize mb-5">katalog</h3>
                    <div className="tabs">
                        <a
                            className={`tab tab-lifted ${selectedTab === 1 && 'tab-active text-[#4e73df]'}`}
                            onClick={() => tabChangeHandler(1)}
                        >
                            Produk item
                        </a>
                        <a
                            className={`tab tab-lifted ${selectedTab === 2 && 'tab-active text-[#4e73df]'}`}
                            onClick={() => tabChangeHandler(2)}
                        >
                            Produk utama
                        </a>
                    </div>

                    <div className="flex justify-between my-10">
                        <PerPageSelect
                            options={[10, 20, 30, 40]}
                            defaultValue={itemsPerPage}
                            onChange={handleItemPerPageChange}
                        />
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <table className="table bordered">
                        <thead className="text-[#4e73df]">
                            <tr>
                                <th>Pilih</th>
                                <th>Kode</th>
                                <th>Nama produk</th>
                                <th>Satuan</th>
                                <th>Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabData.slice(startIndex, endIndex).map((row, index) => (
                                <tr key={index} className="hover">
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectedItems.includes(row)}
                                            onChange={() => handleCheckboxChange(row)}
                                        />
                                    </td>
                                    <td>{row.code ?? 'Kosong'}</td>
                                    <td>{row.name}</td>
                                    <td className="capitalize">{row.satuan.name}</td>
                                    <td>{rupiah(row.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between my-5">
                        <p className="my-5">{showingText}</p>
                        <PaginationBar
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>

                    <div className="modal-action">
                        <div onClick={modalHandler} className="btn capitalize">tutup</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormOrder;