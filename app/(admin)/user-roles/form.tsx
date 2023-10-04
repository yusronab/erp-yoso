import axios from 'axios';
import { SyntheticEvent, useState } from 'react'

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        code: '',
        name: '',
        description: '',
        moduleAccess: '',
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()
        setLoading(true);

        console.log('body', state);
        await axios.post('/api/user-roles', state);

        setLoading(false);
        window.location.href = "/user-roles";
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="w-full flex flex-col justify-center items-center py-5 gap-5"
        >
            <div className="flex flex-col gap-1">
                <label>Code</label>
                <input
                    type="text"
                    placeholder="Ketik kode role disini . . ."
                    name="code"
                    autoComplete="off"
                    required
                    value={state.code}
                    onChange={onChangeHandler}
                    className="input input-bordered"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Ketik nama role disini . . ."
                    name="name"
                    autoComplete="off"
                    required
                    value={state.name}
                    onChange={onChangeHandler}
                    className="input input-bordered"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label>Description</label>
                <input
                    type="text"
                    placeholder="Ketik deskripsi disini . . ."
                    name="description"
                    autoComplete="off"
                    required
                    value={state.description}
                    onChange={onChangeHandler}
                    className="input input-bordered"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label>Module Access</label>
                <input
                    type="text"
                    placeholder="Ketik modul akses disini . . ."
                    name="moduleAccess"
                    required
                    value={state.moduleAccess}
                    onChange={onChangeHandler}
                    className="input input-bordered"
                />
            </div>
            <button
                type="submit"
                disabled={loading ? true : false}
                className="btn bg-[#4e73df] text-white hover:bg-[#3b57ab]"
            >
                {loading ? (
                    <span className="loading loading-spinner text-white"></span>
                ) : (
                    'Tambah Data'
                )}
            </button>
        </form>
    )
}

export default Form