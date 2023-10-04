"use client";

import { useEffect, useState } from "react"
import QRCode from 'react-qr-code';

const ModalQrcode = ({
    listItem
}: {
    listItem: any[]
}) => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any[]>([]);

    const handleModal = () => setShowModal(!showModal);

    useEffect(() => {
        setData(listItem)
    }, [listItem]);

    return (
        <div>
            <button
                onClick={handleModal}
                className="btn btn-accent capitalize"
            >
                Cetak QR
            </button>

            <div className={showModal ? 'modal modal-open' : 'modal'}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="grid grid-cols-3 gap-3 place-items-center">
                        {data && data.length >= 3 ? (
                            data.map((item, index) => (
                                <div key={index} className="border flex flex-col gap-3 justify-center
                                items-center py-3 px-5">
                                    <p>{item.name}</p>
                                    <QRCode
                                        value={"MTYM-" + item.id}
                                    />
                                    <p>{"MTYM-" + item.id}</p>
                                </div>
                            ))
                        ) : (
                            <p className="font-bold">Pilih minimal 3 item</p>
                        )}
                    </div>
                    <div className="modal-action">
                        <button onClick={handleModal} className="btn capitalize">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalQrcode