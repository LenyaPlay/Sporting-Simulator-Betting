import React, { useEffect, useState } from 'react'
import { TEAMS } from 'src/Teams'
import ButtonV1 from 'src/components/ButtonV1/ButtonV1'
import PointsBarV1 from 'src/components/PointsBarV1/PointsBarV1'
import { CoefficientItem, ITeamInfo, InfoItem } from './FirstTimePage'
import { useNavigate } from 'react-router-dom'
import { Bet, IPair, Stage, getPoints, loadState, saveState, setStage } from 'src/Game'
import { resetSubscribers } from 'src/App'

export default function SecondTimePage() {
    const navigate = useNavigate();

    return (
    <div className='bg-blue-950 flex flex-col justify-start items-center w-[100vw] min-h-[100vh]'>
            <div className="w-full h-44 relative">
                <img className="w-full h-full object-cover absolute" src={require('src/assets/images/v1/bg5.png')} />
                <div className='ml-8 mb-6 bottom-0 absolute'>
                    <p className="text-white font-black text-lg font-['Gilroy'] uppercase">resultados<br />do primeiro tempo</p>
                </div>
            </div>
            <PointsBarV1 />

            <div className='w-full'>
                <Match teams={loadState().match.teams} bet={loadState().match.bet}/>
            </div>
            <div className='w-full my-10 px-7'>
                <ButtonV1 onClick={(e) => setStage(Stage.LOAD_RESULT)} caption='descobrir o resultado'/>
            </div>

        </div>
  )
}

function Match({ teams }: IPair) {
    let state = loadState();
    const [inputText, setInputText] = useState(state.match.bet.money == 0 ? '' : state.match.bet.money + '');
    const [attempts, setAttempts] = useState(0);


    useEffect(() => {
        resetSubscribers.push(() => {
            state = loadState();
            setInputText(state.match.bet.money == 0 ? '' : state.match.bet.money + '');
        });
    }, []);

    const onChangeInput = (event: any) => {
        let input = event.currentTarget.value;
        let value = parseInt(event.currentTarget.value);

        if (input == '') {
            setInputText('');
            state.match.bet.money = 0;
            saveState(state);
            return;
        }
        
        if(value > getPoints()) {
            setAttempts(prev => prev + 1);
            if(attempts >= 3) {
                value = getPoints();
                input = value;
            }
        }
        
        if(isNaN(value) || value != input || value > getPoints()){
            return;
        }

        setAttempts(0);

        state.match.bet.money = value;
        saveState(state);
        setInputText(input);
    }

    
    return <div className="bg-indigo-50 flex flex-col box-border mt-3 px-4 pt-3 mx-2">
        <div className='flex divider-v justify-between'>
            <TeamInfo team={teams[0]} />
            <TeamInfo team={teams[1]} isReversed />
        </div>
        <div className='divider-h h-10'></div>
            <div className='w-[100%] gap-1 flex flex-col items-center'>
                <CoefficientItem bet={Bet.WIN1} text="ganha 1" coefficient={state.k1} />
                <CoefficientItem bet={Bet.WIN2} text="ganha 2" coefficient={state.k2} />
                <CoefficientItem bet={Bet.DRAW} text="empate 1" coefficient={state.k3} />
                <CoefficientItem bet={Bet.WIN1DRAW} text="ganhar 1 ou empatar" coefficient={state.k4} />
                <CoefficientItem bet={Bet.WIN2DRAW} text="ganhar 2 ou empatar" coefficient={state.k5} />
        </div>
        <div className='w-full relative mt-5 mb-3 '>
            <img className="w-4 h-4 right-1 top-0 bottom-0 m-auto absolute" src={require('src/assets/images/v1/coin.png')} />
            <input onChange={onChangeInput} value={inputText} className="w-full [&:not(:placeholder-shown)]:text-indigo-900 rounded bg-white p-1 pl-3 text-slate-300 text-sm font-semibold font-['Gilroy'] uppercase" type="text" placeholder='Insira o valor da aposta...' />
        </div>
    </div>
}

function TeamInfo({ team, isReversed }: ITeamInfo) {
    const flexDirection = isReversed ? 'row-reverse' : 'row';

    return (
        <div className={`flex flex-col gap-1 items-${isReversed ? 'end' : 'start'}`}>
            <p className={`text-indigo-900 font-black text-sm font-['Gilroy'] uppercase ${isReversed ? 'text-right' : ''}`}>{team.name}</p>
            <div className={`flex flex-${flexDirection} items-center gap-3`}>
                <img className='w-32 aspect-[107/74] object-cover' src={team.img} alt="" />
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