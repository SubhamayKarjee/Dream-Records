import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const UserEmailUpdateComponent = () => {
    return (
        <div>
            <div className="my-4">
                <button><Link className="px-2 py-1 font-semibold text-sm text-slate-500 flex items-center inline bg-slate-200 rounded-md" to={'/account'}><ChevronLeftIcon className="w-4 h-4 me-1 font-bold"/>Back</Link></button>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-slate-500 px-2">Update your Email</h2>
                <div className="p-3 border mt-2 rounded-lg">
                    <p className="my-1 text-sm font-semibold text-slate-500 ms-2">New Email</p>
                    <input type="text" placeholder="New Email" className="input rounded-full input-bordered w-full"/>
                    {/* <input type="text" placeholder="Last Name" className="input rounded-full input-bordered w-full" {...register("nick_name", { required: true})}/> */}
                    {/* {errors.nick_name && <span className='text-red-600 pt-2 block'>Nick/Display Name Required</span>} */}
                    <input type="submit" value={'Update'} className="btn btn-sm my-4 px-6 btn-accent rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default UserEmailUpdateComponent;