import { Page } from "@/components";
import DragDrop from "@/components/dragNdrop/DragDrop";
import React from "react";

export default ()=>{

    const onFileChage = (files:[]) =>{
        console.log(files)
    }

    return(
        <Page title="Upload">
            <DragDrop
                onFileChange={(files:[]) => onFileChage(files)}
            />
        </Page>
    )
}