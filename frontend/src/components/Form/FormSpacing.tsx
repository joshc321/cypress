import clsx from "clsx";

export type FormSpacingProps = {
    children: React.ReactNode;
    className?: string;
};

export const FormSpacing = ({ children, className }: FormSpacingProps) => {
    return (
        <div className={clsx("flex justify-center p-2", className)}>
            <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-2/5 relative">
                {children}
            </div>
        </div>
    )
}