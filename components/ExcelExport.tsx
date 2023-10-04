"use client";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportToExcel = ({ apiData, fileName }: { apiData: any[], fileName: string }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData: any[], fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <button
            onClick={(e) => exportToCSV(apiData, fileName)}
            className="btn btn-secondary capitalize"
        >
            Export
        </button>
    );
};

export default ExportToExcel;