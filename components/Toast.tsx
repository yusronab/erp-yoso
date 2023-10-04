"use client";

type ToastProps = {
    response: {
        error: boolean;
        message: string;
    };
};

const Toast = ({ response }: ToastProps) => {
    return (
        <div className="toast toast-start">
            <div className={`alert ${response.error ? 'alert-error' : 'alert-success'}`}>
                {response.error ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6"
                        fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 
                            1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 
                            1.732 3z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6"
                        fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
                <span>{response.message}.</span>
            </div>
        </div>
    )
}

export default Toast