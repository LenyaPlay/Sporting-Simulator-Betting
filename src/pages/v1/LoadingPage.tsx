import React, { PropsWithChildren, useEffect } from 'react'
import LoaderV1 from '../../components/loader_v1/LoaderV1'
import { useNavigate } from 'react-router-dom'

export default function LoadingPage(props: PropsWithChildren) {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/game');
        }, 1250 + Math.random() * 1200)
    }, []);

    return (
        <div className="bg flex justify-center items-center gap-[2rem] flex-col w-[100vw] h-[100vh] bg-gradient-to-t from-blue-950 to-sky-600" >
            <div className="text-center text-white text-3xl font-['Gilroy'] font-bold uppercase">
                {props.children}
            </div>
            <LoaderV1 />
        </div>
    )
}
