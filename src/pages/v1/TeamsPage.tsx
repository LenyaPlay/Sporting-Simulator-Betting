import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Stage, setStage } from 'src/Game';
import ButtonV1 from 'src/components/ButtonV1/ButtonV1';
import PointsBarV1 from 'src/components/PointsBarV1/PointsBarV1';

interface ITeam {
    name: string,
    img: string,
}

interface IPair {
    teams: ITeam[],
}


const TEAMS: ITeam[] = [
    { name: "Argentina", img: require("src/assets/images/v1/flags/flag1.png"), },
    { name: "França", img: require("src/assets/images/v1/flags/flag9.png"), },
    { name: "Brasil", img: require("src/assets/images/v1/flags/flag2.png"), },
    { name: "Inglaterra", img: require("src/assets/images/v1/flags/flag10.png"), },
    { name: "Bélgica", img: require("src/assets/images/v1/flags/flag3.png"), },
    { name: "Portugal", img: require("src/assets/images/v1/flags/flag11.png"), },
    { name: "Países Baixos", img: require("src/assets/images/v1/flags/flag4.png"), },
    { name: "Espanha", img: require("src/assets/images/v1/flags/flag12.png"), },
    { name: "Itália", img: require("src/assets/images/v1/flags/flag5.png"), },
    { name: "Croácia", img: require("src/assets/images/v1/flags/flag13.png"), },
    { name: "EUA", img: require("src/assets/images/v1/flags/flag6.png"), },
    { name: "México", img: require("src/assets/images/v1/flags/flag14.png"), },
    { name: "Marrocos", img: require("src/assets/images/v1/flags/flag7.png"), },
    { name: "Suíça", img: require("src/assets/images/v1/flags/flag15.png"), },
    { name: "Uruguai", img: require("src/assets/images/v1/flags/flag8.png"), },
    { name: "Alemanha", img: require("src/assets/images/v1/flags/flag16.png"), },
]


export default function TeamsPage() {
    const selection = [];
    const navigate = useNavigate();

    for (let i = 0; i < TEAMS.length; i += 2) {
        selection.push([TEAMS[i], TEAMS[i + 1]])
    }

    return (
        <div className='flex flex-col w-[100vw] min-h-[100vh] bg-blue-950'>
            <div className="w-full h-44 relative">
                <img className="w-full h-full object-cover absolute" src={require("src/assets/images/v1/bg2.png")} />
                <div className="ml-8 mb-6 font-black text-white bottom-0 text-lg font-['Gilroy'] uppercase absolute">equipes <br/>nacionais</div>
            </div>
            <PointsBarV1/>
            {selection.map(v => <Pair teams={v} />)}
            <div className='px-10 my-10'>
                <ButtonV1 onClick={(e) => setStage(Stage.MENU)} caption='Atrás' />
            </div>
        </div>
    )
}


function Pair(props: IPair) {
    return <div className="flex flex-row box-border justify-between mt-3 p-4 pt-3 bg-indigo-50 mx-2">
        <div className='flex flex-col gap-1'>
            <p className="text-indigo-900 font-black text-sm font-['Gilroy'] uppercase">{props.teams[0].name}</p>
            <img className='w-32 aspect-[107/74] object-cover' src={props.teams[0].img} alt="" />
        </div>
        <div className='flex flex-col gap-1'>
            <p className="text-right text-indigo-900 font-black text-sm font-['Gilroy'] uppercase">{props.teams[1].name}</p>
            <img className='w-32 aspect-[107/74] object-cover' src={props.teams[1].img} alt="" />
        </div>
    </div>
}
