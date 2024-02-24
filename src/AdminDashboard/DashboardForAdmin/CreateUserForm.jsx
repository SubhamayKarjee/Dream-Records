import { useForm } from "react-hook-form";
import axios from 'axios';
// import { 
//     LinkIcon, 
//  } from '@heroicons/react/24/solid'
import { useState } from "react";
import LoadingComponentsInsidePage from "../../LoadingComponents/LoadingComponentsInsidePage";

const CreateUserForm = () => {

    const [formHidden, setFormHidden] = useState(false)
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    // React Hook Form Submit Function For Create User _________________________
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        setLoading(true)
        axios.post('http://localhost:5000/api/v1/users', data).then(res => {
            if(res.status == 200){
                setMessage(res.data.message);
                setUserEmail(res.data.email)
                setUserId(res.data.data.insertedId);
                setLoading(false);
                setFormHidden(true);
                reset();
                console.log(res.data)
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
                                            <input type="email" placeholder="Enter User Email" className="input input-bordered w-full" {...register("email", { required: true})}/>
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
                                                <span>http://localhost:5173/set-password/{userId}</span>
                                                {/* <span style={{cursor: 'pointer'}} className="pointer bg-slate-100 rounded-md p-2"><LinkIcon className='w-4 h-4'/></span> */}
                                            </div>
                                        </div>
            }
            
        </>
    );
};

export default CreateUserForm;