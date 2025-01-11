interface CountProps {
    data: string
}
export default function Counting({ data }: CountProps) {
    console.log(data)
    return (
        <>
            <div className="text-[#FFFFFF] font-semibold text-[24px]">Total Blogs : {data}</div>
        </>
    )
}
