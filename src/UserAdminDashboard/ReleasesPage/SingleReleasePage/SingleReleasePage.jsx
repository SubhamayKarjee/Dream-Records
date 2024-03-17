import { ChatBubbleBottomCenterTextIcon, CheckBadgeIcon, ClockIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponentsInsidePage from "../../../LoadingComponents/LoadingComponentsInsidePage";
import fallbackImage from "../../../assets/fallbackImage.jpg"

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
        const link = `/releases/edit/${id}`
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
                                    {
                                        data?.status === 'Pending' &&
                                        <span className="bg-yellow-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {data?.status}</span>
                                    }
                                    {
                                        data?.status === 'Approved' &&
                                        <span className="bg-green-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><CheckBadgeIcon className="w-4 h-4 me-1"/> {data?.status}</span>
                                    }
                                    {
                                        data?.status === 'Rejected' &&
                                        <span className="bg-red-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><XCircleIcon className="w-4 h-4 me-1"/> {data?.status}</span>
                                    }
                                    {
                                        data?.status === 'Action Required' && 
                                        <div>
                                            <span className="bg-red-500 my-3 py-1 px-2 rounded-md text-sm me-2 font-bold flex items-center"><XCircleIcon className="w-4 h-4 me-1"/> {data?.status}</span>
                                            <div style={{cursor: 'pointer'}} onClick={() => handleNavigate(data?._id)} className="flex items-center p-1 mt-2 bg-cyan-500 rounded-md shadow">
                                                <PencilIcon className="h-3 w-3 text-white me-1"/>
                                                <p className="text-xs font-semibold text-white">Edit</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>                                 
                  </div>

                    <div className="p-2 bg-gradient-to-r from-[#EF4136] to-[#fff] rounded-md my-2 shadow">
                        <p className="text-sm pb-2 font-bold">Audio</p>
                        <audio controls src={data?.audioUrl}></audio>
                    </div> 

                    <div className="border p-2 rounded-lg my-4 shadow">
                        <div className="my-3">
                            <p className="text-xs font-bold">Artist Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    data?.artist.map(a => 
                                        <div key={a._id} className="flex my-2">
                                            <div>
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    className="rounded-md"
                                                    src={a?.imgUrl}
                                                    preview={true}
                                                    fallback={fallbackImage}
                                                    alt={a.artistName}
                                                />
                                            </div>
                                            <div className="ms-2">
                                                <h2 className="font-bold">{a?.artistName}</h2>
                                                <p className="text-xs">ID: {a?._id}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="my-3">
                            <p className="text-xs font-bold">Labels Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    data?.labels.map(l => 
                                        <div key={l._id} className="flex my-2">
                                            <div>
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    className="rounded-md"
                                                    src={l?.imgUrl}
                                                    preview={true}
                                                    fallback={fallbackImage}
                                                    alt={l.labelName}
                                                />
                                            </div>
                                            <div className="ms-2">
                                                <h2 className="font-bold">{l?.labelName}</h2>
                                                <p className="text-xs">ID: {l?._id}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="my-3">
                            <p className="text-xs font-bold">Featuring Details</p>
                            <div className=" p-2 bg-slate-100 rounded-md">
                                {
                                    data?.featuring?.map(f => 
                                        <div key={f._id} className="flex my-2">
                                            <div>
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    className="rounded-md"
                                                    src={f?.imgUrl}
                                                    preview={true}
                                                    fallback={fallbackImage}
                                                    alt={f.artistName}
                                                />
                                            </div>
                                            <div className="ms-2">
                                                <h2 className="font-bold">{f?.artistName}</h2>
                                                <p className="text-xs">ID: {f?._id}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <p className="font-bold border-b">Other Details</p>
                        <table className="table table-zebra">
                            <tbody>
                                {/* row 0 */}
                                <tr>
                                    <td>Authors Name:</td>
                                    <td>
                                        {
                                            data?.authors.map((a, index)=> <span className="mx-1 px-2 py-1 bg-slate-200 rounded-md" key={index}>{a}</span>)
                                        }
                                    </td>
                                </tr>
                                {/* row 1 */}
                                <tr><td>Album Name:</td><td>{data?.albumName}</td></tr>
                                {/* row 2 */}
                                <tr><td>Genre:</td><td>{data?.genre}</td></tr>
                                {/* row 3 */}
                                <tr><td>P Line:</td><td>{data?.pLine}</td></tr>
                                {/* row 4 */}
                                <tr><td>C Line:</td><td>{data?.cLine}</td></tr>
                                {/* row 5 */}
                                <tr>
                                    <td>Composer Name:</td>
                                    <td>
                                        {
                                            data?.composer?.map((c, index)=> <span className="mx-1 px-2 py-1 bg-slate-200 rounded-md" key={index}>{c}</span>)
                                        }
                                    </td>
                                </tr>
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