import { Page } from "@/components";
import React from "react";

const NotFound = () => {
    return (
        <Page title="">
            <div className="not-found">
                <h1>
                    Desculpe não conseguimos encontra essa pagina...
                </h1>
                <a href="/home">Clique aqui para volta para tela inicial</a>
            </div>
        </Page>
    )
}
export default NotFound