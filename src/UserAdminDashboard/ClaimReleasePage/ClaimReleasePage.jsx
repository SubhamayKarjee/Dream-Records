import { BellAlertIcon } from '@heroicons/react/24/solid';


const ClaimReleasePage = () => {
    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                <h2 className='font-bold text-slate-500 my-2'>Claim Release</h2>
                <form>
                    
                </form>
                  

            </div>

            {/* Blog Post Div  _______________________________*/}
            <div className="md:basis-1/4 overflow-y-auto">
                <div className='p-2'>
                    <h4 className='flex items-center font-bold text-md text-slate-500'> <BellAlertIcon className='w-5 h-5 me-2 text-slate-500'/> Notification</h4>
                </div>
                {/*  */}
            </div>
        </div>
    );
};

export default ClaimReleasePage;