import React from 'react'

export default function Blob({ size, type, fromX, fromY, rotate, standing }) {
    return (
        <span className='rounded-full absolute aspect-square inline-block' style={{
            height: size ? `${size}px` : "80px",
            background: type === "light" ? "linear-gradient(180deg, #BC24BC -22.02%, #F45F8C 30.58%, #FCAEC6 77.98%)" : "linear-gradient(168.68deg, #000000 5.98%, #131313 91.66%)",
            top: fromY ? `${fromY}px` : "100px",
            left: fromX ? `${fromX}px` : "100px",
            rotate: rotate ? `${rotate}deg` : "0deg",
            zIndex: standing != undefined ? standing : -30
        }}>
        </span>
    )
}
