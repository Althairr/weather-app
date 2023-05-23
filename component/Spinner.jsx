import React from "react";
import Image from "next/image";
import spinner from '@/Public/loading.gif';

const Spinner = () => {

    return (
            <div>
                <Image 
                className="w-[200px] m-auto block" 
                src={spinner} 
                alt="loading.."
                />
            </div>
        )
}

export default Spinner