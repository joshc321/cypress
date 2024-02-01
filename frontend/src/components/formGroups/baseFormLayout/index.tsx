import {AuthLayoutSpec} from "@/components/formGroups/authLayout/authLayout.spec";
import PrimaryButton from "@/components/formComponents/primaryButton";
import Link from 'next/link';

export default function BaseFormLayout(
    {
        onSubmit,
        formLabel,
        buttonText="Submit",
        footerText=null,
        footerHref=null,
        children
    } : AuthLayoutSpec) {
    return (
        <div className="flex justify-center p-2">
            <div className="flex flex-col gap-4 pt-2 w-full md:w-2/3 lg:w-2/5 relative">
                <div>
                    <h2 className="text-base font-normal text-secondary-dark">{formLabel}</h2>
                </div>
                <div className="flex items-center flex-col gap-20">
                    <form noValidate onSubmit={onSubmit} className="flex w-full flex-col gap-4 justify-between">
                        {children}
                        <PrimaryButton text={buttonText} />
                        {footerText !== null &&
                            <Link className="text-center hover:underline" href={{pathname: footerHref}}>{footerText}</Link>
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}