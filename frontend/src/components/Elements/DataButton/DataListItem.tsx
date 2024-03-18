import clsx from "clsx";


export type DataListItemProps = {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
}

export const DataListItem = (
    {
        icon,
        text,
        onClick,
        className,
    } : DataListItemProps
) => {
    return (
        <li onClick={onClick} 
        className={clsx(
            'px-3 py-2 flex flex-row items-center', 
            onClick && 'hover:bg-gray-light',
            className
            )}>
            <div className="mr-4">
                {icon}
            </div>
            <div className="text-sm font-thin">
                {text}
            </div>
        </li>
    )
}