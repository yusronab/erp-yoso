const PaginationBar = ({
    currentPage, totalPages, onPageChange
}: {
    currentPage: number, totalPages: number, onPageChange: (pageIndex: number) => void
}) => {
    return (
        <div className="flex">
            <button
                className="py-2 px-4 btn rounded-none rounded-l-md bg-[#4e73df] text-white
                hover:bg-[#3b57ab]"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <div key={index}>
                    {index === 0 || index === totalPages - 1 || Math.abs(index - currentPage) <= 1 ? (
                        <button
                            className={`${index === currentPage
                                ? 'bg-[#4e73df] text-white hover:bg-[#3b57ab]'
                                : 'text-black'} py-2 px-4 btn rounded-none`}
                            onClick={() => onPageChange(index)}
                        >
                            {index + 1}
                        </button>
                    ) : currentPage === index + 2 ? (
                        <span key={index} className="btn rounded-none">...</span>
                    ): currentPage === index - 2 && (
                        <span key={index} className="btn rounded-none">...</span>
                    ) }
                </div>
            ))}
            <button
                className="py-2 px-4 btn rounded-none rounded-r-md bg-[#4e73df] text-white
                hover:bg-[#3b57ab]"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                {'>'}
            </button>
        </div>
    )
}

export default PaginationBar;