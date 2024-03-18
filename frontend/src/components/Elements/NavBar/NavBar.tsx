'use client';

import { MdHome, MdCalendarMonth, MdQrCodeScanner, MdCalendarToday, MdAccountCircle } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons";
import { UrlObject } from "url";

export type NavBarComponentProps = {

}

export type NavBarElementComponentProps = {
    href: string | UrlObject,
    Icon: IconType,
    text: string,
}

export const  NavBarComponent =({}: NavBarComponentProps) => {
    return (
        <nav
            className="fixed bottom-0 left-0 z-50 w-full h-16 border-t border-secondary-light bg-white">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                <NavElement href={"/"} Icon={MdHome} text={"Home"} />
                <NavElement href={"/calendar"} Icon={MdCalendarMonth} text={"Calendar"} />
                <NavElement href={"/scan"} Icon={MdQrCodeScanner} text={"Scan"} />
                <NavElement href={"/upcoming"} Icon={MdCalendarToday} text={"Upcoming"} />
                <NavElement href={"/account"} Icon={MdAccountCircle} text={"Account"} />
            </div>
        </nav>
    )
}

/**
 * NavElement
 *
 * @param props.href - the href of the link
 * @param props.Icon - the icon to display
 * @param props.text - the text to display
 * @returns a React function component
 */
const NavElement = (
    {
        href,
        Icon,
        text,
    }: NavBarElementComponentProps
) => {
    const pathName = usePathname();
    if(pathName === href) {
        return (
            <Link href={href} type="button"
                  className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                <Icon className="w-6 h-6 mb-1 text-primary group-hover:text-secondary-dark" />
                <span
                    className="text-sm text-primary group-hover:text-secondary-dark">{text}</span>
            </Link>
        )
    }
    return (
        <Link href={href} type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <Icon className="w-6 h-6 mb-1 text-secondary group-hover:text-secondary-dark" />
            <span
                className="text-sm text-secondary group-hover:text-secondary-dark">{text}</span>
        </Link>
    )
}