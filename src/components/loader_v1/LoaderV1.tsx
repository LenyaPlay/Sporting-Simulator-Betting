import React from 'react'
import style from './style.module.css'

export default function LoaderV1() {
    const count = 5;
    return (
        <div className={style.component}>
            <div className='flex flex-row gap-2'>
                {new Array(count).fill(0).map((v, i) =>
                    <div style={{
                        animationDelay: i * (1000 / count) + 'ms',
                        opacity: 0.4,
                    }} className='w-4 h-4 bg-red-600 rounded'></div>)}
            </div>
        </div>

    )
}
