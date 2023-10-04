"use client";

import { rupiah } from "@/utils/helper";
import axios from "axios";
import { useState } from "react";

const ModalUpdate = ({
    data, showData, tableName, paymentMethod
}: {
    data: any;
    showData: { [key: string]: string };
    tableName: string;
    paymentMethod: JSX.Element;
}) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nominal, setNominal] = useState('');

    const handleModal = () => setIsModalShow(!isModalShow);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sisa = data.total - data.tenor;
        const input = Number(e.target.value);

        if (input <= sisa) setNominal(e.target.value.replace(/[^0-9]/g, ''));
    }

    const handleSubmit = () => {
        setIsLoading(true);
        
        axios.patch(`/api/${tableName}/${data.id}`, {
            tenor: Number(nominal),
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'Error patch process'))
            .finally(() => {
                setIsLoading(false);
                setIsModalShow(false);
                setNominal('');
            })
    };

    return (
        <div>
            <button
                onClick={handleModal}
                className="btn btn-outline btn-primary btn-sm capitalize text-sm"
            >
                update
            </button>

            <div className={isModalShow ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <p className="font-bold mb-5">Data Pembelian</p>
                    <table>
                        <tbody>
                            {Object.entries(showData).map(([key, val], i) => (
                                <tr key={i}>
                                    <td className="text-right">{val} :</td>
                                    <td>
                                        {key === 'createdAt' ? new Date(data[key]).toLocaleDateString()
                                            : key === 'total' ? rupiah(data[key]): data[key]}
                                    </td>
                                </tr>
                            ))}
                            <tr>{paymentMethod}</tr>
                            <tr>
                                <td className="text-right">Customer :</td>
                                <td>{data.customer ? data.customer.name : '-'}</td>
                            </tr>
                            <tr>
                                <td className="text-right">Telepon :</td>
                                <td>{data.customer ? data.customer.phone : '-'}</td>
                            </tr>
                            <tr>
                                <td className="text-right">Alamat :</td>
                                <td>{data.customer ? data.customer.address : '-'}</td>
                            </tr>
                            <tr>
                                <td className="text-right">Nama User :</td>
                                <td>{data.user.name}</td>
                            </tr>
                            <tr>
                                <td className="text-right text-error font-bold">Sisa pembayaran :</td>
                                <td>{rupiah((data.total - data.tenor) - Number(nominal))}</td>
                            </tr>
                            <tr>
                                <td>Nominal cicilan :</td>
                                <td>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        placeholder="Ketik disini . . ."
                                        value={nominal}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="modal-action">
                        <button onClick={handleModal} className="btn capitalize">tutup</button>
                        <button
                            className="btn btn-primary capitalize"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="loading loading-spinner text-white"></span>
                                : 'update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalUpdate;