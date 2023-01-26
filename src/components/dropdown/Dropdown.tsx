import React, { ReactNode, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface dropdownProps {
    children: ReactNode
    bgColor?: string
    name: any
    color?: string
    size?: string
    border?:string
    className?:string
}

export default function DropDown(props: dropdownProps) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dropdown isOpen={isOpen} toggle={() => { setIsOpen(!isOpen) }} size= {props.size}>
            <DropdownToggle className={props.className} style={{ backgroundColor: props.bgColor, color: props.color, border: props.border, boxShadow: 'none'}}>
                {props.name} <i className="fa fa-caret-down" />
            </DropdownToggle>
            <DropdownMenu style={{zIndex: '1030'}}>
                {props.children}
            </DropdownMenu>
        </Dropdown>
    )
}