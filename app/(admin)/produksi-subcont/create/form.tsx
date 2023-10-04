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
import FormInputReadonly from "@/components/FormInputReadonly";
import { table } from "@/utils/table";

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
    const [otherData, setOtherData] = useState({
        tempo: '',
        tenor: '',
        pricePerItem: '',
        paymentMethod: '',
    })

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

    const startEntry = startIndex + 1;
    const endEntry = Math.min(endIndex, filteredData.length);
    const totalData = filtering ? data.length : filteredData.length;
    const showingText = filtering
        ? `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} 
        data (difilter berdasarkan ${data.length} total data)`
        : `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} data`;

    useEffect(() => setFilteredData(data), [data]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [prices, setPrices] = useState<{ [key: number]: string }>({});

    const handlePriceChange = (itemId: number, value: string) => {
        setPrices((prevPrices) => ({
            ...prevPrices,
            [itemId]: value,
        }));
    };

    useEffect(() => {
        let total = 0;

        selectedItems.forEach((item) => {
            const productId = item.id;
            const productPrice = item.qty;
            const productJumlah = Number(prices[productId]) || 1;

            total += productPrice * productJumlah;
        })

        setTotalPrice(total)
    }, [prices]);

    const router = useRouter();

    const handleSubmit = () => {
        setIsLoading(true);

        const items = selectedItems.map((item) => {
            const amount = Number(prices[item.id]);

            return {
                productId: item.id,
                productName: item.name,
                qty: item.qty,
                bayar: amount,
                subtotal: Number(item.qty * amount),
                satuan: 'pc',
            };
        });

        const body = {
            code: code,
            userId: Number(session?.user.id),
            subcontId: Number(selectedCus.id),
            total: totalPrice,
            tempo: Number(otherData.tempo),
            tenor: otherData.paymentMethod === '1' ? totalPrice : Number(otherData.tenor),
            paymentMethod: Number(otherData.paymentMethod),
            detail: items,
        };

        axios.post('/api/produksi-subcont', body)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'Error saat POST berlangsung'))
            .finally(() => {
                setIsLoading(false);
                // router.push('/order');
            });
    };

    const handleFilter = (selected: { id: number; name: string } | null) => {
        const filtered = customer.find((item) => item.id === selected?.id);

        setSelectedCus(filtered);
    };

    const handleChange = (e: any) => {
        setOtherData({ ...otherData, [e.target.name]: e.target.value });
    };

    const numberChange = (e: any) => {
        setOtherData({ ...otherData, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') });
    };

    return (
        <div className="p-3 border">
            <div className="flex flex-col sm:flex-row gap-7">
                <div className="flex-1">
                    <div className="form-control mb-4">
                        <label>Kontroktor</label>
                        <FilterSelect
                            options={customer}
                            onSelectFilter={handleFilter}
                            table="suplier"
                        />
                    </div>
                    <FormInputReadonly
                        label="telepon"
                        value={selectedCus.phone ?? ''}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="fax"
                        value={selectedCus.fax ?? ''}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="alamat"
                        value={selectedCus.address ?? ''}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="kota"
                        value={selectedCus.city ?? ''}
                        readonly={true}
                    />
                </div>
                <div className="flex-1">
                    <FormInputReadonly
                        label="Nomor BSTJ"
                        value={code}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="tanggal"
                        value={new Date().toLocaleString()}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="mata uang"
                        value="(IDR) Rupiah"
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
                                    onChange={numberChange}
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
                                    onChange={numberChange}
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
                        <th>Kode Produksi</th>
                        <th>Produk Item</th>
                        <th>Total</th>
                        <th>Bayar Satuan</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length !== 0 ?
                        selectedItems.map((row, index) => (
                            <tr key={index}>
                                <td>{row.code ?? 'Kosong'}</td>
                                <td>{row.name}</td>
                                <td>{row.qty}</td>
                                <td>
                                    <FormInput
                                        label=""
                                        name="price"
                                        placeholder="Masukan harga . . ."
                                        value={row.price}
                                        onChange={(e) => handlePriceChange(row.id, e.target.value)}
                                    />
                                </td>
                                <td>{rupiah(Number(prices[row.id]) * Number(row.qty))}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-gray-500 text-center">
                                    Belum ada produk terpilih
                                </td>
                            </tr>
                        )}
                    <tr>
                        <td colSpan={4} className="font-bold text-right">Diskon</td>
                        <td className="bg-[#4e73df] text-white">0</td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="font-bold text-right">Total</td>
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
                    <h3 className="font-bold capitalize mb-5">antrian barang setengah jadi</h3>
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
                                <th>Nomor produk</th>
                                <th>Nama produk</th>
                                <th>Jumlah</th>
                                <th>Satuan</th>
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
                                    <td>{row.code ?? 'Kosong'}</td>
                                    <td>{row.name}</td>
                                    <td>{row.qty}</td>
                                    <td>Pc</td>
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