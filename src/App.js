import {useState, useEffect} from "react";
//?Импорт хуков
import './App.css';
 
import pathIconC from './icons/icon-c.png'
import pathIconCss from './icons/icon-css.png'
import pathIconHashtag from './icons/icon-hashtag.png'
import pathIconHTML5 from './icons/icon-html-5.png'
import pathIconJS from './icons/icon-js.png'
import pathIconPython from './icons/icon-python.png'
import pathIconQuestion from './icons/icon-question.png'
//!Импорт картинок

const initialArrayCards = [
  {id: 1, img: pathIconC, count:0}, 
  {id: 2, img: pathIconCss, count:0},
  {id: 3, img: pathIconHashtag, count:0},
  {id: 4, img: pathIconHTML5,count:0},
  {id: 5, img: pathIconJS, count:0},
  {id: 6, img: pathIconPython, count:0},
]//массив карточек с id


const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]//поле

const App = () => {

  const [arrayCards , setArrayCards] = useState([])//обновление всего на экране
  const [openedCards , setOpenedCards] = useState([])//масив отрытых карточек
  const [matchedCards , setMatched] = useState([])//массив совпадения
  const [moves , setMoves] = useState(0)//отслеживание шагов

  
useEffect(()=>{
if( matchedCards.length===6)
{
  alert("Вы выиграли, поздравляем. Чтобы сыграть еще раз нажмите кнопку «Начать заново.")
}
},[  {matchedCards}])
  const shuffa = (array) => {
    let currentIndex = array.length,
    temporaryValue,
    randomIndex

    while(currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex)//!перетусовка карточек
      currentIndex -= 1

      temporaryValue=array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }
 
  useEffect(()=>{
    setArrayCards(shuffa(pairOfArrayCards))
  },[])// хук для выхова компонента, вызывается один раз

  const flipCard = (index) => () => {
    setOpenedCards(opened => [...opened,index])
    setMoves(prevMove => prevMove + 1)
  }//!в массив дпоисывает индекс карточки и увеличивает на 1 ша при нажатии

  useEffect(() =>{
    if (openedCards < 2) return
    const firstMatched = arrayCards[openedCards[0]];
    const secondMatched = arrayCards[openedCards[1]]
    if (secondMatched && firstMatched.id === secondMatched.id){
      setMatched([...matchedCards, firstMatched.id])


    }  
    if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 800)
  },[openedCards])

  const handleGameRestart = () => { 
    setOpenedCards([])
    setMatched([])
    setMoves(0)
    setArrayCards(shuffa(pairOfArrayCards))
  }//?обнуление массивов для кнопки


  return (
     
    <div className="container">
      <h1>Игра «Найти пары карточек»</h1>
      <p className="number-of-strokes">Сделано ходов:{moves}</p>  
      <div className="cards">
        {arrayCards.map((item , index) =>{
          let isFlipped = false;
          if (openedCards.includes(index)) isFlipped = true
          if (matchedCards.includes(item.id)) isFlipped = true
          return (
            <div key={index} className={`card ${isFlipped ? 'flipped' : ' ' }`}
              onClick={flipCard(index)}
              onDoubleClick={()=>{
                return false;
              }}>
              <div className="inner">
                <div className="front">
                  <img src={item.img} width="100" alt="front-card" />
                </div>
                <div className="back">
                  <img src ={pathIconQuestion} width="100" alt="question mark"/>
                </div>
              </div>
            </div>
          )
        })}
        </div>
        <button className="button-restart" onClick={handleGameRestart}>Начать заново</button> 
    </div>
  );
}

export default App;

