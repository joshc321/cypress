import { FormSpacing } from '@/components/Form'

type LayoutProps = {
    formLabel: string;
    primaryText?: string;
    children: React.ReactNode;
};

export const Layout = ({
    formLabel,
    primaryText="Cypress",
    children 
}: LayoutProps) => {
    return (
        <FormSpacing className='pt-32'>
            <div>
                <h2 className="text-base font-normal text-secondary-dark">{formLabel}</h2>
            </div>
            <div className="flex items-center flex-col gap-20">
                <h1 className="text-7xl font-semibold text-secondary-dark">
                    {primaryText}
                </h1>
                {children}
            </div>
        </FormSpacing>
    )
}
