"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import FilterSelect from "@/components/FilterBar";
import { rupiah } from "@/utils/helper";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import FormInput from "@/components/FormInput";

const FormOrder = ({
    code, product: data, customer
}: {
    code: string, product: any[], customer: any[]
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
    const [selectedCus, setSelectedCus] = useState<any>({});
    const [selectedTab, setSelectedTab] = useState(1);
    const [otherData, setOtherData] = useState({
        poc: '',
        reciver: '',
        tempo: '',
        tenor: '',
        paymentMethod: '',
    })

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageIndex: number) => setCurrentPage(pageIndex);

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

    useEffect(() => setFilteredData(data), [data, selectedCus]);

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
            customerId: Number(selectedCus.id),
            detail: JSON.stringify(items),
            total: totalPrice,
            tempo: Number(otherData.tempo),
            tenor: otherData.paymentMethod === '1' ? totalPrice : Number(otherData.tenor),
            poc: otherData.poc,
            reciver: otherData.reciver,
            paymentMethod: Number(otherData.paymentMethod),
        };

        axios.post('/api/order', body)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'Error saat POST berlangsung'))
            .finally(() => {
                setIsLoading(false);
                // router.push('/order');
            });
    };

    const handleFilter = (selected: { id: number; name: string } | null, table: string) => {
        const filtered = customer.find((item) => item.id === selected?.id);

        setSelectedCus(filtered);
    };

    const handleChange = (e: any) => {
        setOtherData({ ...otherData, [e.target.name]: e.target.value });
    };

    const handleNumber = (e: any) => {
        setOtherData({ ...otherData, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') });
    };

    return (
        <div className="p-3 border">
            <div className="grid grid-cols-2 gap-4">
                <FilterSelect
                    options={customer}
                    onSelectFilter={handleFilter}
                    table="suplier"
                />
                <div className="form-control mb-4">
                    <label>Nomor SO</label>
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
                <div className="form-control mb-4">
                    <label>Mata Uang</label>
                    <input
                        type="text"
                        value="(IDR) Rupiah"
                        readOnly
                        className="input input-bordered input-disabled"
                    />
                </div>
                <FormInput
                    label="po customer"
                    name="poc"
                    placeholder="Ketik disini . . ."
                    value={otherData.poc}
                    onChange={handleChange}
                />
                <FormInput
                    label="penerima"
                    name="reciver"
                    placeholder="Ketik disini . . ."
                    value={otherData.reciver}
                    onChange={handleChange}
                />
                <div className="form-control mb-4">
                    <label>Telepon</label>
                    <input
                        type="text"
                        value={selectedCus.phone ?? ''}
                        readOnly
                        className="input input-bordered input-disabled"
                    />
                </div>
                <div className="form-control mb-4">
                    <label>Alamat</label>
                    <input
                        type="text"
                        value={selectedCus.address ?? ''}
                        readOnly
                        className="input input-bordered input-disabled"
                    />
                </div>
                <div className="form-control mb-4">
                    <label>Kota</label>
                    <input
                        type="text"
                        value={selectedCus.city ?? ''}
                        readOnly
                        className="input input-bordered input-disabled"
                    />
                </div>
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
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Jenis Pembayaran</td>
                        <td className="bg-warning">
                            <select
                                name="paymentMethod"
                                value={otherData.paymentMethod}
                                onChange={handleChange}
                                className="select select-bordered"
                                required
                            >
                                <option value="" disabled>Pilih jenis</option>
                                <option value="1">Cash</option>
                                <option value="2">Dp</option>
                                <option value="3">Piutang</option>
                            </select>
                        </td>
                    </tr>
                    {otherData.paymentMethod && otherData.paymentMethod !== '1' && (
                        <tr>
                            <td colSpan={3} className="text-right">Tempo</td>
                            <td>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="tempo"
                                        placeholder="Masukan tempo . . ."
                                        onChange={handleNumber}
                                        value={otherData.tempo}
                                        className="input input-bordered w-full"
                                    />
                                    <span className="absolute text-gray-500 top-1/2 transform
                                        -translate-y-1/2 mr-4 right-0">
                                        Hari
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )}
                    {otherData.paymentMethod === '2' && (
                        <tr>
                            <td colSpan={3} className="text-right">Uang muka</td>
                            <td>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="tenor"
                                        placeholder="Masukan DP . . ."
                                        onChange={handleNumber}
                                        value={otherData.tenor}
                                        className="input input-bordered w-full"
                                    />
                                    <span className="absolute text-gray-500 top-1/2 transform -translate-y-1/2
                                    mr-4 right-0">
                                        Rupiah
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )}
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