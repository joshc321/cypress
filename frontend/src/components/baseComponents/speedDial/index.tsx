import { SpeedDialSpec, SpeedDialActionSpec } from "@/components/baseComponents/speedDial/speedDial.spec";



export function SpeedDial (
    {
        children
    } : SpeedDialSpec
    
) {


    return (
        <div
            className="fixed end-6 bottom-20 group/speeddial">
            
            <div className="transition-all duration-200 flex flex-col items-center mb-4 space-y-2 invisible opacity-0 scale-0 group-hover/speeddial:visible group-hover/speeddial:scale-100 group-hover/speeddial:opacity-100">
                {children}
            </div>
                
            
            <button 
                type="button" 
                className="flex items-center justify-center text-white bg-primary rounded-full w-14 h-14 hover:bg-primary-dark  focus:ring-4 focus:ring-blue-300 focus:outline-none group/speeddialbtn">
                <svg className="w-5 h-5 transition-transform group-hover/speeddialbtn:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    )
}


export function SpeedDialAction({label, icon, onClick}: SpeedDialActionSpec) {
    return (
        <div className="group/speedialaction relative">
            <button onClick={onClick} type="button" className="flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-xl hover:bg-gray-light">
                {icon}
                <span className="sr-only">{label}</span>
            </button>
            <div role="tooltip" className="absolute z-10 inline-block w-auto py-1 px-2 text-xs font-light text-white transition-opacity duration-300 bg-secondary rounded-lg shadow-sm opacity-0 group-hover/speedialaction:opacity-100 invisible group-hover/speedialaction:visible bottom-0 right-0 -translate-x-11 -translate-y-2">
                {label}
            </div>
        </div>
    )
} 