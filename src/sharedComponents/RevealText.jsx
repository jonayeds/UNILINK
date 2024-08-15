/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
const RevealText = ({text}) => {
    const duration = 0.1
    const stagger = 0.015 
  return (
    <div className="">
        <motion.p
       
         initial="initial"
         whileHover="hovered"
         className="relative block overflow-hidden whitespace-nowrap text-4xl font-semibold text-white cursor-default "
         style={{
            lineHeight:0.82
         }}
        >
            <div
            
            >
                {text.split("").map((l,i)=>{
                    return <motion.span
                    className="inline-block"
                    variants={{
                        initial:{y:0},
                        hovered:{y:"-100%"}
                    }}
                    transition={{
                        duration: duration,
                        ease: "easeInOut",
                        delay:stagger*i
                    }}
                    key={i} >{l}</motion.span>
                })}
            </div>
            <div
            className="absolute inset-0"
            
            >
                {text.split("").map((l,i)=>{
                    return <motion.span
                    className="inline-block"
                    variants={{
                        initial:{y:"100%"},
                        hovered:{y:0}
                    }}
                    transition={{
                        duration: duration,
                        ease: "easeInOut",
                        delay:stagger*i
                    }}
                    key={i} >{l}</motion.span>
                })}
            </div>
        </motion.p>
    </div>
  )
}


export default RevealText