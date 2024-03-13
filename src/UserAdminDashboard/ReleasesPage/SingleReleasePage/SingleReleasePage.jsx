import { ChatBubbleBottomCenterTextIcon, ClockIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";

const SingleReleasePage = () => {

    const {id} = useParams();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState()

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/v1/release/single/${id}`)
            .then( res => {
              if(res.status == 200){
                setLoading(false);
                setData(res.data.data[0]);
              }
            })
            .catch(er => console.log(er));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNavigate = (id) => {
        const link = `/releases/edit/first-step/${id}`
        navigate(link)
    }


    return (
        <div className="md:flex md:h-full">
            <div className='h-full md:basis-3/4 overflow-y-auto md:border-r p-2'>
                {
                  loading ? <LoadingComponentsInsidePage/> :
                  <div>
                    <div className="md:flex p-4 bg-neutral rounded-lg">
                        <div>
                            <Image
                                width={200}
                                height={200}
                                className="rounded-lg"
                                src={data?.imgUrl}
                                preview={true}
                                alt="artist-image"
                            />
                        </div>
                        <div className="md:ps-4 grow">
                            <div className="md:flex justify-between">
                                <div>
                                    <h2 className="text-white font-bold text-lg">{data?.releaseTitle}</h2>
                                    <p className="text-white text-sm">ID: {data?._id}</p>
                                </div>
                                <div>
                                    <div className="flex items-center p-1 bg-amber-500 rounded-md shadow">
                                        <ClockIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">{data?.status}</p>
                                    </div>
                                    <div style={{cursor: 'pointer'}} onClick={() => handleNavigate(data?._id)} className="flex items-center p-1 mt-2 bg-cyan-500 rounded-md shadow">
                                        <PencilIcon className="h-3 w-3 text-white me-1"/>
                                        <p className="text-xs font-semibold text-white">Edit</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md my-2">
                                <p className="text-xs font-bold">Author</p>
                                <p>{data?.author}</p>
                        </div> 
                    </div>                                 
                  </div>

                    <div className="p-2 bg-gradient-to-r from-[#EF4136] to-[#fff] rounded-md my-2 shadow">
                        <p className="text-sm pb-2 font-bold">Audio</p>
                        <audio controls src={data?.audioUrl}></audio>
                    </div> 

                    <div className="border p-2 rounded-lg my-4 shadow">
                        <div className="my-3">
                            <p className="text-xs font-bold border-b">Artist Details</p>
                            <h2 className="font-bold">{data?.artistName}</h2>
                            <p className="text-xs">ID: {data?.artistId}</p>
                        </div>
                        <div className="my-3">
                            <p className="text-xs font-bold border-b">Labels Details</p>
                            <h2 className="font-bold">{data?.labelName ? data.labelName : 'label name'}</h2>
                            <p className="text-xs">ID: {data?.labelId ? data.labelId : 'Label id'}</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <p className="font-bold border-b">Other Details</p>
                        <table className="table table-zebra">
                            <tbody>
                                {/* row 1 */}
                                <tr><td>Album Name:</td><td>{data?.albumName}</td></tr>
                                {/* row 2 */}
                                <tr><td>Genre:</td><td>{data?.Genre}</td></tr>
                                {/* row 3 */}
                                <tr><td>P Line:</td><td>{data?.pLine}</td></tr>
                                {/* row 4 */}
                                <tr><td>C Line:</td><td>{data?.cLine}</td></tr>
                                {/* row 5 */}
                                <tr><td>Composer:</td><td>{data?.composer}</td></tr>
                                {/* row 6 */}
                                <tr><td>Format:</td><td>{data?.format}</td></tr>
                                {/* row 7 */}
                                <tr><td>Lyrics Language:</td><td>{data?.lyricsLanguage}</td></tr>
                                {/* row 8 */}
                                <tr><td>Release Date:</td><td>{data?.releaseDate}</td></tr>
                                {/* row 9 */}
                                <tr><td>UPC:</td><td>{data?.UPC}</td></tr>
                                {/* row 10 */}
                                <tr><td>ISRC:</td><td>{data?.ISRC}</td></tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                }
            </div>


            {/* Sideber Div  _______________________________*/}
            <div className="md:basis-1/4">
                <div className='p-2 border-b'>
                    <h4 className='flex items-center font-bold text-slate-500'> <ChatBubbleBottomCenterTextIcon className='w-5 h-5 me-2 text-slate-500'/>Notice</h4>
                </div>
            </div>
        </div>
    );
};

export default SingleReleasePage;