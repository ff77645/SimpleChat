import {Image,Avatar} from '@nextui-org/react'



export default function ImageMsg({data,align}){

    return (
        <div className={`mx-3 mt-2 flex ${align === 'right' ? 'flex-row-reverse' : 'flex-row'} flex-nowrap gap-2 p-2`}>
            <Avatar className="flex-none" size="lg" src={data.avatar} name={data.nickname}></Avatar>
            <div className={`flex-1  ${align === 'right' && 'text-right'}`}>
                <div className="text-gray-600 text-xs pt-2 w-auto">{data.nickname}</div>
                <div className="rounded p-2 text-black mt-2 inline-block min-h-[40px]">
                    <Image
                        width={300}
                        height={200}
                        isZoomed
                        loading="lazy"
                        src={data.value}
                        fallbackSrc="https://via.placeholder.com/300x200"
                        alt="NextUI Image with fallback"
                    />
                </div>
            </div>
        </div>
    )
}
