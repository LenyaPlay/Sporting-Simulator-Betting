import React from 'react'
import { Stage, setStage } from 'src/Game'
import ButtonV1 from 'src/components/ButtonV1/ButtonV1'

export default function HelpPage() {
    return (
        <div className='flex-col px-5 py-5 flex w-[100vw] min-h-[100vh] bg-gradient-to-t from-blue-950 to-sky-600'>
            <div className='flex flex-col items-center '>
                <p className="text-left mt-2 font-semibold text-white text-3xl mb-5 font-['Gilroy']">Formação</p>
                <div className='w-full divider-h'></div>
                <p className="text-left mt-2 text-white text-lg font-['Gilroy'] ">
                    Após iniciar o aplicativo, você verá um menu onde existem botões clicando nos quais
                    você poderá ver o treino, onde já está, a lista de times e ir para o
                    início do torneio.
                </p>
                <img className='border mt-5' src={require("src/assets/images/v1/help/1.png")} alt="" />
                <div className='w-full divider-h  mt-2'></div>

                <div className='w-full divider-h mt-10'></div>
                <p className=" mt-2 text-left text-white text-lg font-['Gilroy'] ">
                    Também no menu você pode ver a quantidade de pontos e se ficar
                    sem eles pode zerá-los clicando no botão apropriado.
                </p>
                <img className='border mt-5' src={require("src/assets/images/v1/help/2.png")} alt="" />
                <div className='w-full divider-h  mt-2'></div>

                <div className='w-full divider-h  mt-10'></div>
                <p className="text-left text-white text-lg font-['Gilroy'] ">
                    A maior força da equipe aumenta a probabilidade de vitória em 15 a 30%.
                    A maior força do técnico aumenta em 5-10% a probabilidade de vitória da equipe.
                    O fato de uma equipe ter um time da casa aumenta em 2 a 5% a probabilidade de a equipe vencer.
                    Mais lesões reduzem em 2 a 5% a probabilidade de vitória da equipe.
                    O parâmetro de fadiga aumenta em 2 a 5% a probabilidade de vitória da equipe.
                    O estilo de jogo determina a probabilidade de vitória de uma equipe em 2 a 5%.
                    O clima afeta a probabilidade de vitória da equipe em 2 a 5%.
                </p>
                <img className='border mt-5' src={require("src/assets/images/v1/help/5.png")} alt="" />
                <div className='w-full divider-h  mt-2'></div>

                <div className='w-full divider-h  mt-10'></div>
                <p className="text-left text-white text-lg font-['Gilroy'] ">
                    O vencedor do primeiro tempo tem uma probabilidade 10 a 20% maior de vitória da equipe.
                    Mais cartões reduzem em 2 a 5% a probabilidade de uma equipe vencer.
                    Os pênaltis reduzem em 3 a 7% a probabilidade de vitória do jogo.
                    O parâmetro de fadiga após o primeiro tempo aumenta em 7 a 15% a probabilidade de a equipe vencer.
                    A pressão depende da probabilidade de vitória da equipe em 3-6%
                </p>
                <img className='border mt-5' src={require("src/assets/images/v1/help/3.png")} alt="" />
                <div className='w-full divider-h mt-2'></div>

                <div className='w-full divider-h  mt-10'></div>
                <p className="text-left text-white text-lg font-['Gilroy'] ">
                    Após o término dos dois tempos, você verá o resultado das apostas e receberá seu dinheiro
                </p>
                <img className='border mt-5' src={require("src/assets/images/v1/help/4.png")} alt="" />
                <div className='w-full divider-h mt-2'></div>

                <div className='w-full divider-h  mt-10'></div>
                <p className="text-left text-white text-lg font-['Gilroy'] ">
                    Lista de todos os comandos
                </p>
                <img className='border mt-5' src={require("src/assets/images/v1/help/6.png")} alt="" />
                <div className='w-full divider-h mt-2'></div>
            </div>
            <div className='px-10 my-10 w-full'>
                <ButtonV1 onClick={(e) => setStage(Stage.MENU)} caption='Atrás' />
            </div>
        </div>
    )
}
