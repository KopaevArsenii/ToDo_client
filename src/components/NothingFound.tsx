import { FC } from "react"

import cute from "../icons/cute.png"

interface NothingFoundProps {
    text: string
}

const NothingFound: FC<NothingFoundProps> = ({
    text = " К сожалению, ничего не найдено =(",
}) => {
    return (
        <div className="py-[100px] flex flex-col gap-[40px] mx-auto">
            <img className="w-[370px]" src={cute} alt={"cute"} />
            <div className="font-bold text-[22px]">{text}</div>
        </div>
    )
}

export default NothingFound
