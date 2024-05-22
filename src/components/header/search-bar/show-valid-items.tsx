import { SearchList } from "@/components/items/search-list"
import { Item } from "@prisma/client"

export const ValidItems = ({ presentItems }: {
    presentItems: Item[]
}) => {
    console.log({ presentItems });
    return <div className="absolute w-full top-full h-fit z-30 flex flex-col">
        {presentItems.map((item, index) => {
            if (index > 6) return ;
            return <SearchList key={item.id} id={item.id} title={item.title} />
        }
        )}
    </div>
}