"use client";

import CheckPage from "./cek"
import { useFormState } from "./context";
import ResetPage from "./reset"

const CurrentPage = ({ step }: { step: number }) => {
  switch (step) {
    case 1:
      return <CheckPage />
    case 2:
      return <ResetPage />
    case 3:
      return <p>Done</p>
    default:
      return null;
  }
}

const PasswordPage = () => {
  const { step } = useFormState();

  return (
    <div className="p-5">
      <div className="card card-compact shadow-xl">
        <div className="card-body">
          <div className="card-title bg-slate-100 p-2 rounded-lg">
            Ubah Password
          </div>
          <ul className="steps my-5">
            <li
              data-content={step > 1 ? '✓' : 1}
              className={`step ${step >= 1 && 'step-success'}`}
            >
              Check Password
            </li>
            <li
              data-content={step > 2 ? '✓' : 2}
              className={`step ${step >= 2 && 'step-success'}`}
            >
              Reset Password
            </li>
            <li
              data-content={step === 3 ? '✓' : 3}
              className={`step ${step === 3 && 'step-success'}`}
            >
              Selesai
            </li>
          </ul>
          <div className="space-y-6">
            <CurrentPage step={step} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordPage;