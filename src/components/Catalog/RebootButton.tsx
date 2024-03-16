import React from "react";
const RebootButton = ({message, callback}: {message: string, callback: React.MouseEventHandler}) => {
    return (
        <>
            <div className="text-center">
                <p>Что-то пошло не так: {message}</p>
                <button className="btn btn-outline-primary" onClick={callback}>
                    Попробовать ещё
                </button>
            </div>
        </>
    );
}
export default RebootButton;