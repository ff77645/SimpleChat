
import {Avatar} from "@nextui-org/react";


export default function Text({data,align}){

    return (
        <div className={`mx-3 mt-2 flex ${align === 'right' ? 'flex-row-reverse' : 'flex-row'} flex-nowrap gap-2 p-2`}>
            <Avatar className="flex-none" size="lg" src={data.avatar} name={data.name}></Avatar>
            <div className={`flex-1  ${align === 'right' && 'text-right'}`}>
                <div className="text-gray-600 text-xs pt-2 w-auto">{data.name}</div>
                <div className="bg-white rounded p-2 text-black mt-2 inline-block min-h-[40px]">
                    {data.text}
                </div>
            </div>
        </div>
    )
}