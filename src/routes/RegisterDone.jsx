// import React from 'react'
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

const RegisterDone = () => {
    // const height = window.screen.height;
    // const width = window.screen.width;
    const { width, height } = useWindowSize()
    return (
        <>
            <div className='flex items-center justify-center w-full'>
                <h1 className='mt-60 text-lg md:text-[40px] font-[600] text-red-400 animate-bounce'>
                    Merci de vous enregistrer !! 🙏😊
                </h1>
                <Confetti width={width} height={height} />
            </div>
        </>
    )
}

export default RegisterDone