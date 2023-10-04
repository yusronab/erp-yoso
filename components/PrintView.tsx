"use client";

import { useRef } from "react";
import ReactToPrint from "react-to-print";

const PrintView = ({
    contentComponent, buttonText, docTitle
}: {
    contentComponent: JSX.Element;
    buttonText: string;
    docTitle: string;
}) => {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div style={{ display: "none" }}>
                <div ref={componentRef} className="p-5">
                    {contentComponent}
                </div>
            </div>

            <ReactToPrint
                trigger={() => <button className="btn btn-success capitalize">{buttonText}</button>}
                content={() => componentRef.current!}
                documentTitle={docTitle}
            />

        </>
    );
};

export default PrintView;