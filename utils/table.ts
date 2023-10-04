export const table = {
    handleSearch: (
        keyword: string,
        data: any[],
        setFilteredData: React.Dispatch<React.SetStateAction<any[]>>,
        setFiltering: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const filtered = data.filter(item =>
            item.name?.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(filtered);

        if (!keyword) setFiltering(false);
        if (keyword) setFiltering(true);
    },

    generateShowingText: (
        startEntry: number,
        endEntry: number,
        totalData: number,
        filtering: boolean,
        dataLength: number
    ) => {
        if (filtering) {
            return `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} data (difilter berdasarkan ${dataLength} total data)`;
        } else {
            return `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} data`;
        }
    },

    getStyle: (module: string, key: string, styleStatus: any[]) => {
        const filteredStyles = styleStatus.filter((item) => item.module === module);
        const foundStyle = filteredStyles.find((item) => item.fkey === key);

        if (foundStyle) {
            return {
                name: foundStyle.name,
                style: {
                    background: foundStyle.bgColor,
                    color: foundStyle.fontColor,
                }
            };
        } else {
            return {
                name: 'kosong',
                style: {
                    background: '#ffffff',
                    color: '#000000',
                }
            };
        }
    },
};