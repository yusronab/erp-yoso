import Link from "next/link"

const CompanyPage = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="font-bold">Perusahaan yang dimiliki</h2>
        <Link href="/company/create" className="btn btn-primary capitalize">tambah data</Link>
      </div>
    </div>
  );
};

export default CompanyPage;