import { Button, IconButton } from "@/components/Elements";
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

export type CalendarHeaderProps = {
    onDateClick?: () => void;
    selectedDate: Date;
    onLeftArrowClick?: () => void;
    onRightArrowClick?: () => void;
    onTodayClick?: () => void;
    headerText?: string;
}


export const CalendarHeader = (
    {
        onDateClick,
        selectedDate,
        onLeftArrowClick,
        onRightArrowClick,
        onTodayClick,
        headerText,
    }: CalendarHeaderProps
    ) => {


    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="bg-primary-dark w-full h-[6.3rem]">
            <div className="flex flex-row justify-between px-4 pt-4 text-white items-center">
                <Button size='xs' variant="dark" onClick={onDateClick}>
                    <div className="flex items-center gap-1 w-20">
                        <h1 className="text-4xl">{selectedDate.getDate()}</h1>
                        <div className="flex flex-col justify-center items-start text-xs">
                            <h3>{monthNamesShort[selectedDate.getMonth()]}</h3>
                            <h3>{selectedDate.getFullYear()}</h3>
                        </div>
                    </div>
                </Button>
                <div className="hidden md:block">
                    <h1 className="text-2xl font-medium">
                        Calendar
                    </h1>
                </div>
                <div>
                    <Button size='auto' variant="secondary" onClick={onTodayClick}>Today</Button>
                </div>
            </div>
            <div className="flex items-center flex-row text-sm md:text-base text-gray-light py-2 px-2">
                <IconButton variant='inverse' onClick={onLeftArrowClick}>
                    <MdArrowBackIos />
                </IconButton>
                <h1>{headerText}</h1>
                <IconButton variant='inverse' onClick={onRightArrowClick}>
                    <MdArrowForwardIos className='text-gray-light' />
                </IconButton>
            </div>
        </div>
        
    )
}

export const CalendarHeaderSpacer = () => {
    return (
        <div className="block h-[6.3rem]"></div>
    )
}