import { getPoints } from "src/Game";

export default function PointsBarV1() {
    return (
        <div className='bg-sky-600 w-full py-2 pr-2 flex flex-row items-center justify-end gap-2'>
            <p className="font-black  text-right text-white text-sm font-['Gilroy'] uppercase">{getPoints().toLocaleString("us-US")} pontos</p>
            <img className="w-4 h-4 mr-1" src={require('src/assets/images/v1/coin.png')} />
        </div>
    )
}
