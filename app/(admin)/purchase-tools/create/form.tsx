"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { rupiah } from "@/utils/helper";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import FormInput from "@/components/FormInput";
import FormInputReadonly from "@/components/FormInputReadonly";
import { table } from "@/utils/table";
import moment from "moment";
import 'moment/locale/id';

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
    const [otherData, setOtherData] = useState({
        supplier: '',
        ppn: 0,
        ppnButton: false,
        total: 0,
        tempo: '',
        tenor: '',
        totalAfterPpn: 0,
        paymentMethod: '',
    });

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    const handleSearch = (keyword: string) => {
        table.handleSearch(keyword, data, setFilteredData, setFiltering);
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

    const showingText = table.generateShowingText(
        startIndex + 1,
        Math.min(endIndex, filteredData.length),
        filtering ? data.length : filteredData.length,
        filtering,
        data.length
    );

    useEffect(() => setFilteredData(data), [data]);

    const [itemStocks, setItemStocks] = useState<any[]>([]);

    useEffect(() => {
        const initialItemStocks: any[] = [];

        selectedItems.forEach((item) => {
            initialItemStocks.push({
                id: item.id,
                qty: 1,
                pricePerItem: '',
            });
        });

        setItemStocks(initialItemStocks);

    }, [selectedItems]);

    const handleIncrement = (itemId: number) => {
        const updatedItemStocks = [...itemStocks];
        const itemIndex = updatedItemStocks.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
            updatedItemStocks[itemIndex].qty += 1;
            setItemStocks(updatedItemStocks);
        }
    };

    const handleDecrement = (itemId: number) => {
        const updatedItemStocks = [...itemStocks];
        const itemIndex = updatedItemStocks.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1 && updatedItemStocks[itemIndex].qty > 1) {
            updatedItemStocks[itemIndex].qty -= 1;
            setItemStocks(updatedItemStocks);
        }
    };

    useEffect(() => {
        let newTotal = 0;
        let newPPN = 0;

        itemStocks.forEach((item) => {
            const productPrice = Number(item.pricePerItem);
            const productJumlah = Number(item.qty);

            newTotal += productPrice * productJumlah;
        })

        if (otherData.ppnButton) {
            newPPN = Number(newTotal * 11 / 100)
        }

        setOtherData({
            ...otherData,
            total: newTotal,
            ppn: newPPN,
            totalAfterPpn: newTotal + newPPN,
        });

    }, [itemStocks, otherData.ppnButton]);

    const handleChange = (e: any) => {
        setOtherData({ ...otherData, [e.target.name]: e.target.value });
    };

    const handleNumber = (e: any) => {
        setOtherData({ ...otherData, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newPrice = e.target.value;

        const updatedItem = { ...itemStocks[index] };
        updatedItem.pricePerItem = newPrice;

        const updatedItemStocks = [...itemStocks];
        updatedItemStocks[index] = updatedItem;

        setItemStocks(updatedItemStocks);
    };

    const router = useRouter();

    const handleSubmit = () => {
        setIsLoading(true);

        const items = selectedItems.map((item, index) => {
            return {
                toolsId: item.id,
                toolsName: item.name,
                toolsCode: item.code,
                qty: itemStocks[index].qty,
                pricePerItem: itemStocks[index].pricePerItem,
                subtotal: Number(itemStocks[index].qty) * Number(itemStocks[index].pricePerItem),
            };
        });

        const body = {
            code: code,
            supplier: otherData.supplier,
            userId: Number(session?.user.id),
            detail: JSON.stringify(items),
            ppn: otherData.ppn,
            tempo: Number(otherData.tempo),
            total: otherData.totalAfterPpn,
            tenor: otherData.paymentMethod === '1' ? otherData.totalAfterPpn : Number(otherData.tenor),
            paymentMethod: Number(otherData.paymentMethod),
        };
        
        axios.post('/api/purchase-tools', body)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'Error saat POST berlangsung'))
            .finally(() => {
                setIsLoading(false);
                // router.push('/order');
            });
    };

    return (
        <div className="p-3 border">
            <div className="grid grid-cols-2 gap-5">
                <FormInput
                    label="toko / pt"
                    name="supplier"
                    onChange={handleChange}
                    placeholder="Ketik disini . . ."
                    value={otherData.supplier}
                />
                <FormInputReadonly
                    label="Tanggal"
                    value={moment().locale('id').format('dddd, Do MMM YYYY, h:mm:ss a')}
                    readonly={true}
                />
                <FormInputReadonly
                    label="Nomor PT"
                    value={code}
                    readonly={true}
                />
                <div className="form-control mb-4">
                    <label>Jenis Pembayaran</label>
                    <select
                        name="paymentMethod"
                        value={otherData.paymentMethod}
                        onChange={handleChange}
                        className="select select-bordered"
                    >
                        <option value="" disabled>Pilih jenis</option>
                        <option value="1">Cash</option>
                        <option value="2">Dp</option>
                        <option value="3">Piutang</option>
                    </select>
                </div>
                {otherData.paymentMethod && otherData.paymentMethod !== '1' && (
                    <div className="form-control mb-4">
                        <label>Tempo</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="tempo"
                                placeholder="Masukan tempo . . ."
                                onChange={handleNumber}
                                value={otherData.tempo}
                                className="input input-bordered w-full"
                            />
                            <span className="absolute text-gray-500 top-1/2 transform -translate-y-1/2
                            mr-4 right-0">
                                Hari
                            </span>
                        </div>
                    </div>
                )}
                {otherData.paymentMethod === '2' && (
                    <div className="form-control mb-4">
                        <label>Uang muka</label>
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
                    </div>
                )}
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
                        <th>Nama Produk</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length !== 0 ?
                        selectedItems.map((row, index) => (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>
                                    <div className="flex flex-row items-center">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleDecrement(row.id)}
                                        >-
                                        </button>
                                        <p className="text-error font-bold mx-2">
                                            {itemStocks[index] ? itemStocks[index].qty : 0}
                                        </p>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleIncrement(row.id)}
                                        >+
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="pricePerItem"
                                            placeholder="Masukan harga . . ."
                                            onChange={(e) => handlePriceChange(e, index)}
                                            value={itemStocks[index] ? itemStocks[index].pricePerItem : 0}
                                            className="input input-bordered w-full"
                                        />
                                        <span className="absolute text-gray-500 top-1/2 transform
                                            -translate-y-1/2 mr-4 right-0">
                                            Rupiah
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    {rupiah(
                                        Number(
                                            itemStocks[index] ? itemStocks[index].qty : 0
                                        ) * Number(
                                            itemStocks[index] ? itemStocks[index].pricePerItem : 0
                                        )
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-gray-500 text-center">
                                    Belum ada produk terpilih
                                </td>
                            </tr>
                        )}
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Total</td>
                        <td className="bg-[#4e73df] text-white">
                            {rupiah(otherData.total)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className="flex justify-end items-center gap-2">
                                <p className="font-bold">Pajak Pertambahan Nilai (PPN) 11%</p>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={otherData.ppnButton}
                                    onChange={
                                        () => setOtherData({ ...otherData, ppnButton: !otherData.ppnButton })
                                    }
                                />
                            </div>
                        </td>
                        <td className="bg-warning">
                            {rupiah(otherData.ppn)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Total Bayar</td>
                        <td className="bg-[#4e73df] text-white">
                            {rupiah(otherData.totalAfterPpn)}
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
                <div className="modal-box">
                    <h3 className="font-bold capitalize mb-5">data peralatan</h3>
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
                                <td>Pilih</td>
                                <th>Nama</th>
                                <th>Ketersediaan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.slice(startIndex, endIndex).map((row, index) => (
                                <tr key={index} className="hover">
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectedItems.includes(row)}
                                            onChange={() => handleCheckboxChange(row)}
                                        />
                                    </td>
                                    <td>{row.name}</td>
                                    <td>{row.amount}</td>
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