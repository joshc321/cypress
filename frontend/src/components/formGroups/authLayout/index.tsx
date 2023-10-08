import {AuthLayoutSpec} from "@/components/formGroups/authLayout/authLayout.spec";
import ButtonBase from "@/components/baseComponents/buttonBase";
import PrimaryButton from "@/components/formComponents/primaryButton";

export default function AuthFormLayout(
    {
        onSubmit,
        formLabel,
        primaryText="Cypress",
        buttonText="Submit",
        children
    } : AuthLayoutSpec) {
    return (
        <div className="flex justify-center p-2">
            <div className="flex flex-col gap-4 pt-32 w-full md:w-2/3 lg:w-2/5 relative">
                <div>
                    <h2 className="text-base font-normal text-secondary-dark">{formLabel}</h2>
                </div>
                <div className="flex items-center flex-col gap-20">
                    <h1 className="text-7xl font-semibold text-secondary-dark">{primaryText}</h1>
                    <form noValidate onSubmit={onSubmit} className="flex w-full flex-col gap-4 justify-between">
                        {children}
                        <PrimaryButton text={buttonText} />
                    </form>
                </div>
            </div>
        </div>
    )
}