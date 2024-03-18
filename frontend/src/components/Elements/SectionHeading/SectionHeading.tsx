import Link from "next/link"
import { Divider } from "@/components/Elements"

export type SectionHeadingProps = {
    text: string,
    to?: string,
}

export const SectionHeading = (
    {
        text,
        to,
    }: SectionHeadingProps
    ) => {
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between p-2">
                <h3 className="text-2xl font-semibold">{text}</h3>
                {to && <Link className="font-light" href={to}>Edit</Link>}
            </div>
            <Divider />
        </div>
    )
}