import React from 'react'
import { useNavigate } from 'react-router-dom'
import { reRerender } from 'src/App';
import { Stage, getPoints, setPoints, setStage } from 'src/Game';
import ButtonV1 from 'src/components/ButtonV1/ButtonV1'

export default function MenuPage() {
  return (
    <div className='bg flex justify-start items-center flex-col bg-gradient-to-t from-blue-950 to-sky-600 w-[100vw] h-[100vh]'>
      <div className="w-full h-44 relative">
        <img className="w-full h-full object-cover left-0 top-0 absolute" src={require('src/assets/images/v1/bg1.png')} />
        <div className="flex flex-col ml-8 mb-6 bottom-0 absolute">
          <div className="flex flex-col">
            <div className="text-white text-xs text-left font-semibold font-['Gilroy'] uppercase">equilíbrio</div>
            <div className='flex flex-row items-center'>
              <img className="w-4 h-4 mr-1" src={require('src/assets/images/v1/coin.png')} />
              <div className="text-white text-lg font-['Gilroy'] uppercase">{getPoints().toLocaleString("us-US")}</div>
            </div>
          </div>
          <div className='mt-6'>
            <ButtonV1 onClick={(e) => {
              setPoints(30000);
              reRerender();
            }} caption='Redefinir pontos' />
          </div>
        </div>
      </div>
      <div className='grow w-full relative'>
        <div className="bg-sky-600 py-1 text-center text-white text-lg font-black font-['Gilroy'] uppercase">menu</div>
        <div className='flex flex-col mt-10 gap-3 w-full px-8'>
          <ButtonV1 onClick={(e) => setStage(Stage.FIRST_HALF)} caption='faça uma aposta' />
          <ButtonV1 onClick={(e) => setStage(Stage.TEAMS)} caption='lista de equipes' />
          <ButtonV1 onClick={(e) => setStage(Stage.HELP)} caption='formação' />
        </div>
      </div>
      <div className="text-center text-white font-black mb-10 text-lg font-['Gilroy'] uppercase">Sport <br/>Simulador Betting <br/>em futebol</div>
    </div>
  )
}
