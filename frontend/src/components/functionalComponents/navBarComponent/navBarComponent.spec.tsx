import {IconType} from "react-icons";
import {UrlObject} from "url";

export interface NavBarComponentSpec {

}

export interface NavBarElementComponentSpec {
    href: string | UrlObject,
    Icon: IconType,
    text: string,
}