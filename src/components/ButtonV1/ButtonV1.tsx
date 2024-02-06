import React, { MouseEventHandler } from 'react'

interface ButtonV1Props {
    caption? : string,
    onClick? : MouseEventHandler;
}

export default function ButtonV1(props: ButtonV1Props) {
    return (
        <button onClick={props.onClick} className="w-[100%] bg-white text-center hover:opacity-80 hover:bg-gray-200 py-2 px-4 text-indigo-900 text-lg font-black font-['Gilroy'] uppercase">
            {props.caption ? props.caption : "Button"}
        </button>
    )
}
