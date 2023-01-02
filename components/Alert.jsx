import React, { useEffect } from 'react'
import { useStateContext } from '../context/StateContext'

export default function Alert() {
    const { setAlert, alert: { message, type, duration, isShow } } = useStateContext()
    useEffect(() => {
        let timer
        if (duration) {
            timer = setTimeout(() => {
                setAlert({ ...alert, isShow: false, })
            }, duration);
        }
        return () => clearTimeout(timer)

    }, [duration])
    const color = type === "error" ? "357deg,47%" : type === "info" ? "141,50%" : "41,99%"
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    return (
        <>
            <div className="border-l-4 p-4 m-4 fixed top-0 left-0 right-0 z-[70]" role="alert" style={{
                transform: isShow ? 'translateY(0%)' : "translateY(-150%)",
                transition: 'transform 0.25s',
                backgroundColor: `hsl(${color},88%)`,
                color: `hsl(${color},48%)`,
                borderColor: `hsl(${color},48%)`,
            }} >
                <p className="font-bold">{type && capitalizeFirstLetter(type)}</p>
                <p>{message}</p>
            </div>
        </>
    )
}

