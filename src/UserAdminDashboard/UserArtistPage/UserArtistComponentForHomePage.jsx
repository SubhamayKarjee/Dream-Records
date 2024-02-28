import { PlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


const UserArtistComponentForHomePage = () => {

    const images = [
        {id: 1, img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'},
        {id: 2, img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'},
        {id: 3, img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'},
    ]
    return (
        <div className="py-3">
            <div className="flex items-center">
                <UsersIcon className="h-5 w-5 text-slate-500 me-2"/>
                <p className="text-sm font-semibold text-slate-500">Artists</p>
            </div>
            <div className="flex gap-4 flex-wrap py-3">
                <Link className="w-12 h-12 outline-dashed outline-1 outline-slate-500 rounded-full flex items-center justify-center"><PlusIcon className="w-6 h-6 text-slate-500"/></Link>

                {
                    images && images.map((image) =>{
                        return <>
                            <div key={image.id} className="avatar">
                                <div className="w-12 rounded-full outline outline-1 outline-offset-2 outline-[#EF4136]">
                                    <img src={image.img} />
                                </div>
                            </div>
                        </>
                    })
                }

                
            </div>
        </div>
    );
};

export default UserArtistComponentForHomePage;