import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";

const CreateUserForm = () => {

    const [formHidden, setFormHidden] = useState(false);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [userNameErr, setUserNameErr] = useState('')
    // React Hook Form Submit Function For Create User _________________________
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setUserNameErr('')
        setLoading(true)
        axios.post('http://localhost:5000/api/v1/users', data).then(res => {
            if(res.status == 200){
                if(res.data.message === 'This User Name all ready exist!'){
                    setUserNameErr(res.data.message)
                    setLoading(false);
                }else{
                    setMessage(res.data.message);
                    setUserEmail(res.data.email)
                    setUserId(res.data.data.insertedId);
                    setLoading(false);
                    setFormHidden(true);
                    reset();
                }
            }
            
        })
    };

    const handleFormDiv = () => {
        setFormHidden(false)
    }


    return (
        <>
            <form onClick={handleFormDiv} method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h2 className='text-lg font-bold'>Create a new User</h2>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider mt-0"></div>
            </div>
            {
                formHidden == false ? <form onSubmit={handleSubmit(onSubmit)}>

                        <p className="mt-3 text-sm font-semibold text-slate-500">Select Role <span className="text-red-500">*</span></p>
                        <select className="select select-sm select-bordered w-full" {...register("roll", { required: true})}>
                            <option>User</option>
                            <option>Admin</option>
                        </select>
                        {errors.roll && <span className='text-red-600 pt-2 block'>Please Select Role</span>}

                        <input type="text" placeholder="Enter User name" className="mt-2 input input-sm input-bordered rounded-full w-full" {...register("userName", { required: true})}/>
                        {errors.userName && <span className='text-red-600 pt-2 block'>Please Fill User Name</span>}
                        {userNameErr && <span className='text-red-600 pt-2 block'>{userNameErr}</span>}

                        <input type="email" placeholder="Enter User Email" className="input input-sm input-bordered rounded-full mt-2 w-full" {...register("email", { required: true})}/>
                        {errors.email && <span className='text-red-600 pt-2 block'>Please Fill Email</span>}
                        {
                            loading && <LoadingComponentsInsidePage/>
                        }
                        <input className='btn btn-neutral btn-sm rounded-full mt-4' type="submit" value={'Create User'}/>
                    </form> : <div>
                        <div className="py-2"> 
                            <h3 className="px-4 text-2xl font-semibold text-green-500 italic text-center py-2">🎉Congratulations🎉</h3>
                            <p>You Create A New User. Please Copy the link and send to the User. Now user Can set her Password and Brand Name</p>
                        </div>
                        {
                            message &&  <p className="font-bold">{message} <span className="text-green-500 font-bold">{userEmail}</span></p>
                        }
                        <div className="flex justify-between items-center">
                            <span className="font-sm bg-slate-200 p-2 rounded-md">http://localhost:5173/set-password/{userId}</span>
                        </div>
                    </div>
            }
            
        </>
    );
};

export default CreateUserForm;