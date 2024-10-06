import { Result } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { WalletPageContext } from "./WalletPage";

const BankAccountCreateForm = () => {

    const {userNameIdRoll, reFetchBankInfo, setReFetchBankInfo} = useContext(WalletPageContext);

    const {register, handleSubmit, formState: { errors } } = useForm();
    const [accountNumberMatchErr, setAccountNumberMatchErr] = useState('');
    const [loading, setLoading] = useState(false)
    const [addBnakSuccess, setAddBankSuccess] = useState(false)
    const onSubmit = (data) =>{
        setAccountNumberMatchErr('')
        setLoading(true)
        if(data.account_number === data.match_account_number){
            const formData = {...data, masterUserId: userNameIdRoll[1]}
            axios.post('https://shark-app-65c5t.ondigitalocean.app/api/v1/bank-info', formData)
            .then(res => {
                if(res.status === 200){
                    setAddBankSuccess(true)
                    const reFetch = reFetchBankInfo + 1;
                    setReFetchBankInfo(reFetch);
                    setLoading(false);
                }
            })
        }else{
            setAccountNumberMatchErr('Banck Account Number Not Match')
            setLoading(false)
        }
    }

    const inputStyle = {
        height: '36px',
        border: '1px solid #E2E8F0',
    }

    return (
        <div>
            {
                addBnakSuccess === false && 
                <div>
                    <h3 className="font-bold text-lg">Add Bank Account</h3>
                    <div className=" md:pt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className="mt-3 text-sm font-semibold text-[#09090B]">Account Holder Name <span className="text-red-500">*</span></p>
                            <input type="text" style={{inputStyle}} className="mt-1 input input-sm w-full border-[#E2E8F0]" placeholder="Enter Account Holder Name" {...register("account_holder_name", { required: true})}/>
                            {errors.account_holder_name && <span className='text-red-600 pt-2 block text-sm'>Account Holder Name Required</span>}

                            <p className="mt-3 text-sm font-semibold text-[#09090B]">Account Number <span className="text-red-500">*</span></p>
                            <input type="text" style={{inputStyle}} className="mt-1 input input-sm w-full border-[#E2E8F0]" placeholder="Enter Account Number" {...register("account_number", { required: true})}/>
                            {errors.account_number && <span className='text-red-600 pt-2 block text-sm'>Account Number Required</span>}
                            {
                                accountNumberMatchErr && <span className='text-red-600 pt-2 block text-sm'>{accountNumberMatchErr}</span>
                            }
                            <p className="mt-3 text-sm font-semibold text-[#09090B]">Retype Account Number <span className="text-red-500">*</span></p>
                            <input type="text" style={{inputStyle}} className="mt-1 input input-sm w-full border-[#E2E8F0]" placeholder="Enter Retype Account Number" {...register("match_account_number", { required: true})}/>
                            {errors.match_account_number && <span className='text-red-600 pt-2 block text-sm'>Account Number Required</span>}

                            <p className="mt-3 text-sm font-semibold text-[#09090B]">Bank Name <span className="text-red-500">*</span></p>
                            <input type="text" style={{inputStyle}} className="mt-1 input input-sm w-full border-[#E2E8F0]" placeholder="Enter Bank Name" {...register("bank_name", { required: true})}/>
                            {errors.bank_name && <span className='text-red-600 pt-2 block text-sm'>Bank Name Required</span>}

                            <p className="mt-3 text-sm font-semibold text-[#09090B]">IFSC</p>
                            <input type="text" style={{inputStyle}} className="mt-1 input input-sm w-full border-[#E2E8F0]" placeholder="Enter IFSC" {...register("IFSC")}/>

                            <p className="mt-3 text-sm font-semibold text-[#09090B]">Branch Name <span className="text-red-500">*</span></p>
                            <input type="text" style={{inputStyle}} className="mt-1 input input-sm w-full border-[#E2E8F0]" placeholder="Enter Branch Name" {...register("branch_name", { required: true})}/>
                            {errors.branch_name && <span className='text-red-600 pt-2 block text-sm'>Branch Name Required</span>}

                            <p className="mt-3 text-sm font-semibold text-[#09090B]">Swift Code <span className="text-red-500">*</span></p>
                            <input type="text" style={{inputStyle}} className="mt-1 input input-sm w-full border-[#E2E8F0]" placeholder="Enter Swift Code" {...register("swift_code")}/>
                            <div className="flex items-center my-4">
                                {
                                    loading && <span className="block loading loading-spinner loading-md me-2"></span>
                                }
                                <input type="submit" value="Add Account" className="btn btn-sm btn-neutral mt-2"/>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {
                addBnakSuccess === true && 
                <div>
                    <Result
                        status="success"
                        title="Successfully Bank Added!"
                        subTitle=""
                        extra={[]}
                    />
                </div>
            }
        </div>
    );
};

export default BankAccountCreateForm;