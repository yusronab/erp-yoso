"use client";

import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../../api/uploadthing/core";
import FormInput from "@/components/FormInput";
import { SyntheticEvent, useState } from "react";

const CreatePage = () => {
    const [body, setBody] = useState({
        name: '',
        address: '',
        city: '',
        phone: '',
    })

    const [images, setImages] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        console.log({
            ...body,
            fax: body.phone,
            image: images.map(item => item.fileUrl)
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

                <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        if (res) {
                            setImages(res)
                            const json = JSON.stringify(res)
                            // Do something with the response
                            console.log(json);
                        }
                    }}
                    onUploadError={(error: Error) => {
                        console.log(`ERROR! ${error.message}`);
                    }}
                />

                <button className="btn btn-primary capitalize" type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default CreatePage;