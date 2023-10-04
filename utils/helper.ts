import { InputDataMaterial } from "@/types";

export const getDataAsArray = (row: number, data: InputDataMaterial) => {
    const dataArray = Array.from({ length: row }, (_, rowIndex) => ({
        name: data.name[rowIndex],
        size: data.size[rowIndex],
        price: Number(data.price[rowIndex]),
        totalStock: Number(data.totalStock[rowIndex]),
        minPurchase: Number(data.minPurchase[rowIndex]),
        ukuranId: Number(data.ukuran[rowIndex]),
        suplierId: Number(data.suplier[rowIndex]),
        isStatus: Number(data.totalStock[rowIndex]) ? 1 : 0,
    }));

    return dataArray;
}

export const rupiah = (nominal: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(nominal);
}

export const generateCode = (digit: number, count: number, text: string) => {
    const digitString = count.toString().padStart(digit, '0');

    const result = `${text.toUpperCase()}-${digitString}`;

    return result;
}