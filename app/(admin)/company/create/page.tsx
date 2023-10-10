"use client";

import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../../api/uploadthing/core";
import FormInput from "@/components/FormInput";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";

const CreatePage = () => {
    const [body, setBody] = useState({
        name: '',
        address: '',
        city: '',
        phone: '',
        image: '',
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        console.log({
            ...body,
            fax: body.phone,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody({ ...body, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-5">
            <h2 className="font-bold mb-5">Tambah Data</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="nama perusahaan"
                    name="name"
                    placeholder="Ketik disini . . ."
                    value={body.name}
                    onChange={handleChange}
                />
                <FormInput
                    label="alamat"
                    name="address"
                    placeholder="Ketik disini . . ."
                    value={body.address}
                    onChange={handleChange}
                />
                <FormInput
                    label="kota"
                    name="city"
                    placeholder="Ketik disini . . ."
                    value={body.city}
                    onChange={handleChange}
                />
                <FormInput
                    label="telepon / fax"
                    name="phone"
                    placeholder="Ketik disini . . ."
                    value={body.phone}
                    onChange={handleChange}
                />

                <div className="flex flex-col justify-start items-start gap-1 bordered rounded-md">
                    <p>Logo perusahaan</p>
                    <Image
                        src={body.image}
                        alt="logo"
                        className="object-cover w-[100px] h-[100px] rounded-md"
                    />
                    <UploadButton<OurFileRouter>
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            if (res) {
                                setBody({ ...body, image: res[0].url })
                                console.log(res);
                            }
                        }}
                        onUploadError={(error: Error) => {
                            console.log(`ERROR! ${error}`);
                        }}
                    />
                </div>


                <button className="btn btn-primary capitalize" type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default CreatePage;