import Image from "next/image"
import { HomeIcon } from "@heroicons/react/solid";
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink"

const Sidebar = () => {
    return (
        <div className="hidden sm:flex flex-col items-center xl:w-[340px]
        p-2 fixed h-full">
            <div className="flex items-center justify-center w-14 h-14
            hoverAnimation p-0 xl:ml-24">
                <Image src="https://rb.gy/ogau5a" width={30} height={30}/>
            </div>

            <div className="space-y-0 mt-2 mb-2.5 xl:ml-24">
                <SidebarLink text="Home" Icon={HomeIcon} active />
                <SidebarLink text="Explore" Icon={HashtagIcon} />
                <SidebarLink text="Notifications" Icon={BellIcon} />
                <SidebarLink text="Messages" Icon={InboxIcon} />
                <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
                <SidebarLink text="Lists" Icon={ClipboardListIcon} />
                <SidebarLink text="Profile" Icon={UserIcon} />
                <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
            </div>

            <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white
            rounded-full w-56 h-[52px] text-lg font-bold">Tweet</button>
        
            <div className="text-[#d9d9d9] flex items-center justify-center
            hoverAnimation xl:ml-20  mt-auto">
                <img className="bg-white w-10 h-10 rounded-full xl:mr-2.5" src="https://icon-library.com/images/facebook-f-icon-png/facebook-f-icon-png-19.jpg" alt="" />
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">tanzeel</h4>
                    <p className="text-[#6e767d]">tanzeel</p>
                </div>
                <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
            </div>
        
        </div>
    )
}

export default Sidebar