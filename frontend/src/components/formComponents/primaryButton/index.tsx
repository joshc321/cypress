import ButtonBase from "@/components/baseComponents/buttonBase";
import {PrimaryButtonLayoutSpec} from "@/components/formComponents/primaryButton/primaryButtonLayout.spec";

export default function PrimaryButton({text}: PrimaryButtonLayoutSpec) {
    return (
        <ButtonBase
            className="rounded-lg p-3 bg-secondary-dark text-gray-light hover:opacity-95"
            type="submit"
        >
            {text}
        </ButtonBase>
    )
}