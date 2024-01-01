/* VENDOR */
import { FC } from "react"

/* APPLICATION */
import cute from "../icons/cute.png"

interface NothingFoundProps {
    text: string
}

const NothingFound: FC<NothingFoundProps> = ({
    text = " Nothing was found =(",
}) => {
    return (
        <div className="py-[100px] flex flex-col gap-[40px] mx-auto">
            <img className="w-[370px]" src={cute} alt={"cute"} />
            <div className="font-bold text-[22px] mx-auto">{text}</div>
        </div>
    )
}

export default NothingFound
