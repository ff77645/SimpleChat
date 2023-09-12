import Text from "./Text"



export default function Message({data,...props}){
    


    return (
        <>
            <Text data={data} {...props}></Text>
        </>
    )
}