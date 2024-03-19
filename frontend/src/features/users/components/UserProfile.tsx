import { TopBar, DataListItem, Divider } from "@/components/Elements";
import { AuthUser } from "@/features/auth"
import { MdEmail, MdPermContactCalendar } from "react-icons/md";



export type UserProfileProps = {
    user?: AuthUser;
}

export const UserProfile = ({ user }: UserProfileProps) => {
    return (
        <div>
            <TopBar primaryText="User Profile" secondaryText={(user?.first || '') + ' ' + (user?.last || '')} to={`/user/edit?id=${user?.id}`} />
            <div className="pt-56">
                <ul>
                    <DataListItem text={user?.email || ''} icon={<MdEmail className="w-6 h-6 text-gray" />} />
                    <DataListItem text={user?.role || ''} icon={<MdPermContactCalendar className="w-6 h-6 text-gray" />}/>
                    <Divider />
                </ul>
            </div>
        </div>
    );
}