"use client"

import HeadingDetail from "@/components/HeadingDetail";
import type { Role } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlus, BsArrowLeft } from "react-icons/bs";
import Form from "./form";
import Table from "./table";

const MainPage = () => {
    const [listData, setListData] = useState<Role[]>([]);
    const [pageCreate, setPageCreate] = useState(false);

    useEffect(() => {
        axios.get('/api/user-roles')
            .then((res) => setListData(res.data))
            .catch(error => console.log('error get', error.message));
    }, []);

    const dataExist = listData.filter(item => item.deletedAt === null);
    const dataDeleted = listData.filter(item => item.deletedAt !== null);

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li className="text-[#4e73df]">User Role</li>
                </ul>
            </div>

            {listData.length === 0 ? (
                <div className="flex justify-center items-center py-5">
                    <span className="loading loading-spinner loading-lg text-[#3b57ab]"></span>
                </div>
            ) : (
                <div className="flex justify-between items-center bg-gray-100 rounded-md p-3">
                    <HeadingDetail
                        exist={listData.length}
                        deleted={dataDeleted.length}
                    />
                    <button
                        onClick={() => setPageCreate(!pageCreate)}
                        className="text-[#4e73df] p-2 border rounded-md border-[#4e73df] cursor-pointer"
                    >
                        {pageCreate ? <BsArrowLeft size={24} /> : <BsPlus size={24} />}
                    </button>
                </div>
            )}
            {pageCreate ? (
                <Form />
            ) : (
                <Table data={dataExist} />
            )}
        </div>
    )
}

export default MainPage;