import Link from "next/link";


export default function NotFound() {
    return(
        <div>
            <h1>Woops! Page not found!</h1>
            <Link href={"/"}>Back to safety</Link>
        </div>
    )
}