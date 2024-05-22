import Link from "next/link"

export const SearchList = ({ id, title }: {
    id: string,
    title: string
}) => {
    return <Link
        href={`/item/${id}`}
    >
        <div className="text-center z-30 h-fit bg-white rounded-sm p-1 border-b">
            {title}
        </div>
    </Link>
}