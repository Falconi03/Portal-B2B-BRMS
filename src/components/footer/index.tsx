import strings from "@/constants/strings";
import React from "react";

const Footer = () => {
    return (
        <div className="app-footer">
            <a href="/politicas-privacidade">Politica de privacidade</a>
            <p className="px-3">|</p>
            <p>{strings.general.reserved}</p>
        </div>
    )
}
export default Footer