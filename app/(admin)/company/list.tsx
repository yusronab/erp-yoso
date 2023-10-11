import moment from "moment";
import Image from "next/image";
import 'moment/locale/id';

const ListComponent = ({ datas }: { datas: any[] }) => {
    return (
        <div className="grid grid-cols-3">
            {datas.length !== 0 ? (
                datas.map((item, i) => (
                    <div key={i} className="bordered p-3 rounded-md">
                        <div className="flex">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100
                                ring-offset-2">
                                    <Image src={item.image} alt="logo" />
                                </div>
                            </div>
                            <div>
                                <p>{item.name}</p>
                                <p className="text-sm text-gray-700 capitalize">{item.city}</p>
                            </div>
                        </div>
                        <p className="mt-5">Update :
                            {moment(item.createdAt).startOf('day').fromNow()}
                        </p>
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