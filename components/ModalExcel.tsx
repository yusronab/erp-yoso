"use client";

import { useState } from 'react';
import * as XLSX from 'xlsx';

const ModalExcel = () => {
    const [showModal, setShowModal] = useState(false);
    
    const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);
    const [excelData, setExcelData] = useState<Array<any> | null>(null);
    
    const handleModal = () => {
        setShowModal(!showModal);
        setExcelFile(null);
        setTypeError(null);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
        ];
        let selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target?.result as ArrayBuffer);
                };
            } else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        } else {
            console.log('Please select your file');
        }
    };

    const handleFileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10));
        }
    };

    return (
        <div>
            <button
                onClick={handleModal}
                className="btn btn-neutral capitalize"
            >
                Import Excel
            </button>

            <div className={showModal ? 'modal modal-open' : 'modal'}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <form className="flex gap-3" onSubmit={handleFileSubmit}>
                        <input
                            type="file"
                            className="file-input file-input-bordered"
                            required
                            onChange={handleFile} />
                        <button type="submit" className="btn btn-success capitalize">
                            UPLOAD
                        </button>
                        {typeError && (
                            <div className="alert alert-error" role="alert">
                                {typeError}
                            </div>
                        )}
                    </form>

                    {/* view data */}
                    <div className="viewer">
                        {excelData ? (
                            <div>
                                <table className="table">
                                    <thead className="bg-[#4e73df] text-white">
                                        <tr>
                                            {Object.keys(excelData[0]).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {excelData.map((individualExcelData, index) => (
                                            <tr key={index}>
                                                {Object.keys(individualExcelData).map((key) => (
                                                    <td key={key}>{individualExcelData[key]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>No File is uploaded yet!</div>
                        )}
                    </div>
                    <div className="modal-action">
                        <button onClick={handleModal} className="btn">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalExcel