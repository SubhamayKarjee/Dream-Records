import { ClockIcon } from "@heroicons/react/24/solid";
// import { Badge } from "antd";
import demoImage from '../../assets/side-view-.jpg'

const PendingMusicComponent = () => {


    const pendingItems = [
        {id: 1, img: `${demoImage}`, text: 'Demo Text', status: 'pending'},
        {id: 2, img: `${demoImage}`, text: 'Demo Text', status: 'pending'},
        {id: 3, img: `${demoImage}`, text: 'Demo Text', status: 'pending'},
        {id: 4, img: `${demoImage}`, text: 'Demo Text', status: 'pending'},
        {id: 5, img: `${demoImage}`, text: 'Demo Text', status: 'pending'},
    ]
    const data = [
        {id: 1, img: `${demoImage}`, text: 'Demo Text', status: 'pending', artist: [{artistId: '1', artistName: 'mehedi', aritstImg: 'demo.jpg', key: 'key' }, {artistId: '2', artistName: 'basar', aritstImg: 'demo.jpg', key: 'key' }] },
        {id: 2, img: `${demoImage}`, text: 'Demo Text', status: 'pending', artist: [{artistId: '1', artistName: 'mehedi', aritstImg: 'demo.jpg', key: 'key' }, {artistId: '2', artistName: 'new', aritstImg: 'demo.jpg', key: 'key' }] },
        {id: 3, img: `${demoImage}`, text: 'Demo Text', status: 'pending', artist: [{artistId: '1', artistName: 'shohug', aritstImg: 'demo.jpg', key: 'key' }, {artistId: '2', artistName: 'basar', aritstImg: 'demo.jpg', key: 'key' }] },
        {id: 4, img: `${demoImage}`, text: 'Demo Text', status: 'pending', artist: [{artistId: '1', artistName: 'shohug', aritstImg: 'demo.jpg', key: 'key' }, {artistId: '2', artistName: 'new', aritstImg: 'demo.jpg', key: 'key' }] },
        {id: 5, img: `${demoImage}`, text: 'Demo Text', status: 'pending', artist: [{artistId: '1', artistName: 'shohug', aritstImg: 'demo.jpg', key: 'key' }, {artistId: '2', artistName: 'fatema', aritstImg: 'demo.jpg', key: 'key' }] },
    ]

    const mehediData = data.filter(item => item.artist.some(artist => artist.artistName === 'mehedi'));
    console.log('mehedi Data =', mehediData)


    return (
        <div className="pb-2">
            <div className="flex items-center pb-2">
                <ClockIcon className="h-5 w-5 text-slate-500 me-2"/>
                <p className="text-sm font-semibold text-slate-500">Pending</p>
            </div>

            <div className="grid cols md:grid-cols-3 sm:grid-cols-2 gap-3">
                {
                    pendingItems && pendingItems.map(i => 
                        <div key={i.id} className="card_parent_div">
                            <img src={i.img} alt="" />
                            <div className="card_child_div">
                                <div className="card_content">
                                    <h3 className="text-sm font-semibold text-white">ID: {i.id}</h3>
                                    <p className="font-bold text-white">{i.text}</p>
                                </div>
                            </div>
                                {/* Status  */}
                                <div className="flex items-center p-1 music_status bg-amber-500 rounded-md shadow">
                                    <ClockIcon className="h-3 w-3 text-white me-1"/>
                                    <p className="text-xs font-semibold text-white">Pending</p>
                                </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PendingMusicComponent;