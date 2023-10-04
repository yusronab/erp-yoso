const HeadingDetail = ({
    exist, deleted
}: {
    exist: number, deleted: number
}) => {
    return (
        <div>
            <p className="text-lg font-bold">Data Status</p>
            <div className="flex divide-x-2">
                <span className="pr-4 text-info">
                    Jumlah<div className="ms-2 badge badge-info text-white">{exist}</div>
                </span>
                <span className="pl-4 text-error">
                    Sampah<div className="ms-2 badge badge-error text-white">{deleted}</div>
                </span>
            </div>
        </div>
    )
}

export default HeadingDetail;