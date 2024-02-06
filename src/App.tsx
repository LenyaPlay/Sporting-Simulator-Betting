import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/fonts/gilroy/gilroy.css'
import LoadingPage from './pages/v1/LoadingPage';
import ButtonV1 from './components/ButtonV1/ButtonV1';
import MenuPage from './pages/v1/MenuPage';
import TeamsPage from './pages/v1/TeamsPage';
import FirstTimePage from './pages/v1/FirstTimePage';
import SecondTimePage from './pages/v1/SecondTimePage';
import ResultPage from './pages/v1/ResultPage';
import { useEffect, useState } from 'react';
import { Stage, loadState, setStage } from './Game';
import HelpPage from './pages/v1/HelpPage';

export const resetSubscribers: (() => void)[] = [];

function App() {
  const [renders, setRenders] = useState(0);

  useEffect(() => {
    reRerender = () => {
      setRenders(prev => prev + 1);
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <LoadingPage>
            Sport<br />Simulador Betting<br /> em futebol
          </LoadingPage>
        }></Route>
        <Route path="/game" element={<MiniRouter />}></Route>
      </Routes>
    </HashRouter>
  );
}

export let reRerender: () => void;
export let resetStates: () => void = () => {
  resetSubscribers.forEach(v => v());
}

function MiniRouter() {
  const state = loadState();
  // console.log(state.match, state.stage, state);

  if (state.stage == Stage.LOAD_SECOND_HALF) {
    return <LoadingPage>
      O primeiro <br/>semestre está <br/>em andamento
    </LoadingPage>
  }
  if (state.stage == Stage.LOAD_RESULT) {
    return <LoadingPage>
      O segundo <br/>tempo está <br/>em andamento
    </LoadingPage>
  }
  if (state.stage == Stage.MENU) {
    return <MenuPage />;
  }
  if (state.stage == Stage.TEAMS) {
    return <TeamsPage />;
  }
  if (state.stage == Stage.FIRST_HALF) {
    return <FirstTimePage />;
  }
  if (state.stage == Stage.SECOND_HALF) {
    return <SecondTimePage />;
  }
  if (state.stage == Stage.RESULT) {
    return <ResultPage />;
  }
  if (state.stage == Stage.HELP) {
    return <HelpPage />;
  }

  return <div className='bg-blue-950 w-[100vw] h-[100vh] flex flex-col gap-5 justify-center'>
    <p className="text-white text-center text-lg font-['Gilroy'] uppercase">Not Found</p>
    <div className='px-10'>
      <ButtonV1 onClick={(e) => setStage(Stage.MENU)} caption='Atrás'/>
    </div>
  </div>
}


export default App;
