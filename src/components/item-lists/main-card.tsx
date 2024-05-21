import DetailsCard from "./detail-card";

export const ProductCard = ({title, description, handleClick}:{
    title : string,
    description : string | null
    handleClick : ()=> {}
})=> {
    return  <div>
        <div className="flex flex-row w-full mx-12 overflow-hidden p-1 text-start">
        <div
        className="
         border-x border-black
        w-[350px] h-[300px]"
        >
            Image
        </div>
            <DetailsCard title={title} description={description} handleClick={handleClick}/>
        </div>
        <hr className="flex-grow border border-black mx-14"/>
    </div>

}
