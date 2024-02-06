import React from 'react'
import { TEAMS } from 'src/Teams'
import ButtonV1 from 'src/components/ButtonV1/ButtonV1'
import PointsBarV1 from 'src/components/PointsBarV1/PointsBarV1'
import { CoefficientItem, ITeamInfo, InfoItem } from './FirstTimePage'
import { useNavigate } from 'react-router-dom'
import { Bet, IPair, Stage, getBetNameByType, getPoints, loadPointsBefore, loadState, setStage } from 'src/Game'

export default function ResultPage() {
    return (
        <div className='bg-blue-950 flex flex-col justify-start items-center w-[100vw] min-h-[100vh]'>
            <div className="w-full h-44 relative">
                <img className="w-full h-full object-cover absolute" src={require('src/assets/images/v1/bg4.png')} />
                <div className='ml-8 mb-6 bottom-0 absolute'>
                    <p className="text-white font-black text-lg font-['Gilroy'] uppercase">resultado <br />do segundo tempo</p>
                </div>
            </div>
            <PointsBarV1 />

            <div className='w-full'>
                <Match teams={loadState().match.teams} bet={loadState().match.bet} />
            </div>
            <div className='w-full my-10 px-7 flex flex-col gap-2'>
                <ButtonV1 onClick={(e) => setStage(Stage.FIRST_HALF)} caption='jogar novamente' />
                <ButtonV1 onClick={(e) => setStage(Stage.MENU)} caption='retornar ao menu' />
            </div>

        </div>
    )
}

function Match({ teams }: IPair) {
    const income = Math.round((getPoints() - loadPointsBefore()) * 100) / 100;
    const bg = income > 0 ? "bg-green-400" : income < 0 ? "bg-red-600" : "bg-gray-700";
    const postfix1 = loadState().income1 > 0 ? "+" : loadState().bet1.type != Bet.NONE ? '-' : '';
    const postfix2 = loadState().income2 > 0 ? "+" : loadState().bet2.type != Bet.NONE ? '-' : '';
    const prefx = income > 0 ? "+" : "";

    return <div className="bg-indigo-50 flex flex-col box-border mt-3 pb-7 px-4 pt-3 mx-2">
        <div className='flex divider-v justify-between'>
            <TeamInfo team={teams[0]} winner={(teams[0].count as number) > (teams[1].count as number)} />
            <TeamInfo team={teams[1]} winner={(teams[0].count as number) < (teams[1].count as number)} isReversed />
        </div>
        <p className="text-center pt-5 text-indigo-900 text-xs font-semibold font-['Gilroy'] uppercase">
            {getBetNameByType(loadState().bet1)} {postfix1} <br />
            {getBetNameByType(loadState().bet2)} {postfix2}
        </p>
        <div className='w-full flex justify-center pt-2'>
            <div className={`w-[45%] py-2 rounded ${bg}`}>
                <p className="text-center font-black text-white text-sm font-['Gilroy'] uppercase">{prefx}{income.toLocaleString("us-US")}</p>
            </div>
        </div>
    </div>
}

function TeamInfo(props: ITeamInfo) {
    const { team, isReversed, winner } = props;
    const flexDirection = isReversed ? 'row-reverse' : 'row';
    const winnerPosition = isReversed ? 'right-0 scale-x-[-1]' : 'left-0';

    return (
        <div className={`flex flex-col gap-1 items-${isReversed ? 'end' : 'start'}`}>
            <p className={`text-indigo-900 font-black text-sm font-['Gilroy'] uppercase ${isReversed ? 'text-right' : ''}`}>{team.name}</p>
            <div className={`flex flex-${flexDirection} relative items-center gap-3`}>
                <img className='w-32 aspect-[107/74] object-cover' src={team.img} alt="" />
                {winner && <img className={`w-16 aspect-square bottom-0 absolute object-cover ${winnerPosition}`} src={require("src/assets/images/v1/winner.png")} alt="" />}
                <p className="text-center text-red-600 text-4xl font-black font-['Gilroy'] uppercase">{team.count}</p>
            </div>
            <div className={`mt-3 flex gap-1 flex-col items-${isReversed ? 'end' : 'start'}`}>
                <InfoItem isReversed={isReversed} img='cards' label="Número de cartões:" value={team.cards} />
                <InfoItem isReversed={isReversed} img='eliminations' label="Eliminação:" value={team.eliminations} />
                <InfoItem isReversed={isReversed} img='angles' label="Angular:" value={team.angles} />
                <InfoItem isReversed={isReversed} img='pressure' label="Pressão:" value={team.pressure} />
                <InfoItem isReversed={isReversed} img='fatigue' label="Fadiga:" value={team.fatigueT} />
            </div>
        </div>
    );
}