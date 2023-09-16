import Text from "./Text"
import ImageMsg from "./Image"
import Music from "./Music"

export default function Message({data,...props}){
    

    const currentMsg = ()=>{
        if(data.type === 'text'){
            return <Text data={data} {...props} />
        }else if(data.type === 'image'){
            return <ImageMsg data={data} {...props} />
        }else if(data.type === 'music'){
            return <Music data={data} {...props} />
        }
    }

    return (
        <>
            {currentMsg()}
        </>
    )
}