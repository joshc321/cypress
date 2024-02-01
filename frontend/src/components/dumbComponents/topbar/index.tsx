import IconButton from "@/components/baseComponents/iconButton";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TopBarSpec } from "@/components/dumbComponents/topbar/topBar.spec";

export default function TopBar(
    {
        primaryText,
        to,
        secondaryText,
    } : TopBarSpec 
) {

    const router = useRouter();

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="relative h-40 bg-secondary-dark flex items-center justify-center">
                {/* add a back button in this div in the top left of this */}
                <div className="absolute top-0 left-0 p-6">
                    <IconButton 
                        icon={<MdArrowBackIos className="w-6 h-6 text-white" />} 
                        onClick={router.back} 
                        className="hover:bg-opacity-0"
                        />
                </div>

                <h2 className="text-white text-4xl font-medium truncate">{primaryText}</h2>
            </div>
            {(secondaryText) && 
                <div className="bg-white">
                    <div className="flex items-center justify-between p-2">
                        <h3 className="text-2xl font-semibold">{secondaryText}</h3>
                        {to && <Link className="font-light" href={to}>Edit</Link>}
                    </div>
                    <hr className={"border-secondary-light border-2"} />
                </div>
            }
        </div>
    )
}