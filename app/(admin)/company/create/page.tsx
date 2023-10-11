"use client";

import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../../api/uploadthing/core";
import FormInput from "@/components/FormInput";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState({
        name: '',
        address: '',
        city: '',
        phone: '',
        image: '',
    });

    const router = useRouter();

    const handleSubmit = (e: SyntheticEvent) => {
        setIsLoading(true);
        e.preventDefault();

        axios.post('/api/company', {
            ...body,
            fax: body.phone,
        })
            .then(res => {
                console.log(res.data);
                router.push('/company');
            })
            .catch(err => console.log(err.response.data.message ?? 'Axios post error'))
            .finally(() => setIsLoading(false));
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
                        placeholder="blur"
                        loading="lazy"
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", height: "100px" }}
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

                <button
                    className="btn btn-primary capitalize mt-5"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <span className="loading loading-spinner text-white"></span>
                        : 'simpan'}
                </button>
            </form>
        </div>
    );
};

export default CreatePage;