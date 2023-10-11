import moment from "moment";
import Image from "next/image";
import 'moment/locale/id';
import { BiSolidEdit } from "react-icons/bi";

const ListComponent = ({ datas }: { datas: any[] }) => {
    return (
        <div className="grid grid-cols-3">
            {datas.length !== 0 ? (
                datas.map((item, i) => (
                    <div className="relative group">
                        <div key={i} className="p-3 rounded-md border border-gray-300 hover:shadow-lg">
                            <div className="flex">
                                <div className="avatar">
                                    <div className="w-8 h-8 rounded-full bg-gray-300">
                                        <Image src={item.image} alt="logo" style={{ objectFit: "cover" }} />
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm text-gray-500 capitalize">{item.city}</p>
                                </div>
                            </div>
                            <p className="mt-8">
                                {`Diperbarui : ${moment(item.updatedAt).startOf('hour').fromNow()}`}
                            </p>
                        </div>
                        <button className="hidden absolute top-0 right-0 p-2 mt-2 mr-2 bg-blue-500
                        text-white rounded-full group-hover:block">
                            <BiSolidEdit size={16} />
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center col-span-3 bg-gray-200 rounded-md py-3">
                    Belum ada data
                </p>
            )}
        </div>
    );
};

export default ListComponent;