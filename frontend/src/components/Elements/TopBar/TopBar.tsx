'use client';

import { IconButton } from "@/components/Elements/Button";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SectionHeading } from "@/components/Elements";


export type TopBarParams = {
    primaryText: string,
    secondaryText?: string,
    to?: string,
    variant?: 'primary' | 'secondary'
}

export const TopBar = (
    {
        primaryText,
        to,
        secondaryText,
        variant = 'primary'
    } : TopBarParams
) => {

    const router = useRouter();

    if (variant === 'primary') {
        return (
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="relative h-40 bg-secondary-dark flex items-center justify-center">
                    {/* add a back button in this div in the top left of this */}
                    <div className="absolute top-0 left-0 p-6">
                        <IconButton 
                            onClick={router.back} 
                            variant="inverse"
                            >
                            <MdArrowBackIos className="w-6 h-6" />
                        </IconButton>
                    </div>

                    <h2 className="text-white text-4xl font-medium truncate">{primaryText}</h2>
                </div>
                {(secondaryText) && 
                    <SectionHeading 
                        text={secondaryText} 
                        to={to}
                    />
                }
            </div>
        )
    }
    else {
        return (
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="relative h-56 bg-primary-dark flex items-center justify-center flex-col ">
                    <h2 className="text-white text-7xl font-semibold">{primaryText}</h2>
                    <h4 className="text-white pt-4 text-lg">{secondaryText}</h4>
                </div>
            </div>
        )
    }
}