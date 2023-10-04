import { SidebarItemProps } from "@/types";
import {
    MdDashboard,
    MdSettings,
    MdInventory,
    MdShoppingCart,
    MdWorkHistory,
    MdShoppingBasket,
    MdDiscount,
    MdTask,
    MdShoppingCartCheckout,
    MdScheduleSend,
    MdOutlineFactCheck,
    MdPerson,
    MdOutlineHomeWork,
    MdPeopleAlt,
    MdRocketLaunch,
    MdOutlineDiversity3,
    MdAddShoppingCart,
    MdKeyboardDoubleArrowRight,
    MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

import {
    RiPencilRuler2Fill,
    RiTruckFill,
    RiInformationFill,
    RiToolsFill,
    RiFileReduceFill,
} from "react-icons/ri";

import {
    FaUserCog,
    FaUserFriends,
    FaTruckLoading,
    FaBoxOpen,
    FaBox,
    FaRecycle,
    FaTable,
} from "react-icons/fa";

import { CgFormatText, CgFormatUppercase } from "react-icons/cg";
import {
    BsClipboardData,
    BsEnvelopePaper,
    BsFileEarmarkPlus,
    BsFillClipboardCheckFill,
    BsFillFileEarmarkPlusFill,
    BsGraphUpArrow,
} from "react-icons/bs";

import {
    TbReportAnalytics,
    TbReportMoney,
} from "react-icons/tb";

const sidebar: SidebarItemProps[] = [
    {
        path: '/dashboard',
        icon: <MdDashboard />,
        name: 'Dashboard',
    },
    {
        path: '',
        icon: <MdSettings />,
        name: 'Data Master',
        submenu: [
            {
                path: '/satuan-ukuran',
                icon: <RiPencilRuler2Fill />,
                name: 'Ukuran',
            },
            {
                path: '/customer',
                icon: <MdPeopleAlt />,
                name: 'Pelanggan',
            },
            {
                path: '/suplier',
                icon: <RiTruckFill />,
                name: 'Pemasok',
            },
            {
                path: '/subcont',
                icon: <MdRocketLaunch />,
                name: 'Subcont',
            },
            {
                path: '/divisi',
                icon: <MdOutlineDiversity3 />,
                name: 'Divisi',
            }
        ]
    },
    {
        path: '',
        icon: <MdInventory />,
        name: 'Inventori',
        submenu: [
            {
                path: '/material',
                icon: <FaTruckLoading />,
                name: 'Material'
            },
            {
                path: '/barang-setengah-jadi',
                icon: <FaBoxOpen />,
                name: 'Barang Setengah Jadi'
            },
            {
                path: '/barang-jadi',
                icon: <FaBox />,
                name: 'Barang Jadi'
            },
            {
                path: '/tools',
                icon: <RiToolsFill />,
                name: 'Peralatan'
            },
            {
                path: '/reduksi-tools',
                icon: <RiFileReduceFill />,
                name: 'Pengurangan Peralatan'
            },
            {
                path: '/limbah',
                icon: <FaRecycle />,
                name: 'Limbah'
            },
            {
                path: '/product',
                icon: <FaTable />,
                name: 'Produk'
            },
            {
                path: '/formula-item',
                icon: <CgFormatText />,
                name: 'Formula Item'
            },
            {
                path: '/formula-utama',
                icon: <CgFormatUppercase />,
                name: 'Formula Utama'
            }
        ]
    },
    {
        path: '/sell',
        icon: <MdShoppingCart />,
        name: 'Penjualan',
        submenu: [
            {
                path: '/order/create',
                icon: <BsFileEarmarkPlus />,
                name: 'Tambah Penjualan'
            },
            {
                path: '/order/ym',
                icon: <BsFillFileEarmarkPlusFill />,
                name: 'Tambah Order YM'
            },
            {
                path: '/order',
                icon: <BsClipboardData />,
                name: 'Data Penjualan'
            },
            {
                path: '/order/sjso',
                icon: <BsEnvelopePaper />,
                name: 'Surat Jalan'
            }
        ]
    },
    {
        path: '',
        icon: <MdWorkHistory />,
        name: 'Produksi',
        submenu: [
            {
                path: '/cek-permintaan',
                icon: <BsFillClipboardCheckFill />,
                name: 'Permintaan Produksi'
            },
            {
                path: '/produksi',
                icon: <BsGraphUpArrow />,
                name: 'Proses Produksi'
            },
            {
                path: '/produksi-subcont',
                icon: <BsEnvelopePaper />,
                name: 'Surat Jalan Subcont'
            },
        ]
    },
    {
        path: '/',
        icon: <MdShoppingBasket />,
        name: 'Pembelian',
        submenu: [
            {
                path: '/purchase/create',
                icon: <MdAddShoppingCart />,
                name: 'Beli Material'
            },
            {
                path: '/purchase',
                icon: <MdShoppingCart />,
                name: 'Data Pemb. Material'
            },
            {
                path: '/permintaan-material',
                icon: <MdShoppingCartCheckout />,
                name: 'Permintaan Material'
            },
            {
                path: '/material-masuk',
                icon: <MdKeyboardDoubleArrowRight />,
                name: 'Material Masuk'
            },
            {
                path: '/material-keluar',
                icon: <MdKeyboardDoubleArrowLeft />,
                name: 'Material Keluar'
            },
            {
                path: '/purchase-tools/create',
                icon: <MdAddShoppingCart />,
                name: 'Beli Alat'
            },
            {
                path: '/purchase-tools',
                icon: <MdShoppingCart />,
                name: 'Pembelian Alat'
            },
        ]
    },
    {
        path: '/',
        icon: <MdDiscount />,
        name: 'Angsuran',
        submenu: [
            {
                path: '/pelunasan-so',
                icon: <TbReportMoney />,
                name: 'Pelunasan SO'
            },
            {
                path: '/pelunasan-po',
                icon: <TbReportMoney />,
                name: 'Pelunasan PO'
            },
            {
                path: '/pelunasan-pt',
                icon: <TbReportMoney />,
                name: 'Pelunasan PT'
            },
            {
                path: '/pelunasan-subcont',
                icon: <TbReportMoney />,
                name: 'Pelunasan Subcont'
            },
        ]
    },
    {
        path: '/',
        icon: <MdTask />,
        name: 'Laporan',
        submenu: [
            {
                path: '/report-penjualan',
                icon: <TbReportAnalytics />,
                name: 'Penjualan'
            },
            {
                path: '/report-produksi',
                icon: <TbReportAnalytics />,
                name: 'Produksi'
            },
            {
                path: '/report-material',
                icon: <TbReportAnalytics />,
                name: 'Pembelian Material'
            },
            {
                path: '/report-tools',
                icon: <TbReportAnalytics />,
                name: 'Pembelian Alat'
            },
        ]
    },
    {
        path: '/req-ship',
        icon: <MdShoppingCartCheckout />,
        name: 'Permintaan Pengiriman',
    },
    {
        path: '/req-product',
        icon: <MdWorkHistory />,
        name: 'Permintaan Produksi',
    },
    {
        path: '/req-po',
        icon: <MdScheduleSend />,
        name: 'Permintaan Pre-order',
    },
    {
        path: '/check-item',
        icon: <MdOutlineFactCheck />,
        name: 'Cek Item',
    },
    {
        path: '',
        icon: <MdPerson />,
        name: 'Manajemen Pengguna',
        submenu: [
            {
                path: '/user-roles',
                icon: <FaUserCog />,
                name: 'Aturan Pengguna',
            },
            {
                path: '/users',
                icon: <FaUserFriends />,
                name: 'Data Pengguna',
            },
        ]
    },
    {
        path: '',
        icon: <MdSettings />,
        name: 'Konfigurasi',
        submenu: [
            {
                path: '/status',
                icon: <RiInformationFill />,
                name: 'Status'
            }
        ]
    },
    {
        path: '/company',
        icon: <MdOutlineHomeWork />,
        name: 'Profil Perusahaan',
    },
];

export default sidebar;