import Text from "./Text"
import ImageMsg from "./Image"
import Music from "./Music"
import { ASSET_PREFIX } from '../../config/config'

export default function Message({data,...props}){
    
    data.avatar = data.avatar.startsWith('http') ? data.avatar : ASSET_PREFIX + data.avatar
    
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