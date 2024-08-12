// import React, { useRef, useState } from "react";
// import './quiz.css'
// import { data } from "../../assets/data";

// const Quiz = () => {

//     let [index , setiindex] = useState(0);
//     let [question , setQuestion] = useState(data[index]);
//     let [lock , setlock] = useState(false);
//     let [score , setscore] = useState(0);

//     let option1 = useRef(null);
//     let option2 = useRef(null);
//     let option3 = useRef(null);
//     let option4 = useRef(null);

//     let option_array = [option1 , option2 , option3 , option4];

//     const checkans = (e, ans) => {
//         if(lock === false){
//             if(question.ans === ans){
//                 e.target.classList.add("correct");
//                 setlock(true);
//                 setscore(prev=>prev+1);
//             }
//             else{
//                 e.target.classList.add("wrong");
//                 setlock(true);
//                 option_array[question.ans -1].current.classList.add("correct");
//             }
//         }
//     }  

//     const next = ()=> {
//         if(lock === true){
//             setIndex(++index);
//             setQuestion(data[index]);
//             setlock(false);
//         }
//     } 

//   return (
//     <div className="container">
//         <h1> quiz app</h1>
//         <hr />
//         <h2>{index + 1}. {question.question}</h2>
//         <ul>
//             <li ref={option1} onClick={(e)=>{checkans(e,1)}}>{question.option1}</li>
//             <li ref={option2} onClick={(e)=>{checkans(e,2)}}>{question.option2}</li>
//             <li ref={option3} onClick={(e)=>{checkans(e,3)}}>{question.option3}</li>
//             <li ref={option4} onClick={(e)=>{checkans(e,4)}}>{question.option4}</li>
//         </ul>
//         <button onClick={next} >Next</button>
//         <div className="index">{index+1} of {data.length} questions</div>
//     </div>
//   )
// }

// export default Quiz

import React, { useRef, useState } from "react";
import './quiz.css';
import { data } from "../../assets/data";

const Quiz = () => {
    const [index, setiindex] = useState(0);
    const [lock, setlock] = useState(false);
    const [score, setscore] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const option_array = [option1, option2, option3, option4];

    const question = data[index];

    const checkans = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setscore((prev) => prev + 1);
            } else {
                e.target.classList.add("wrong");
                option_array[question.ans - 1].current.classList.add("correct");
            }
            setlock(true);
            setFlipped(true); // Flip the card to show explanation
        }
    };

    const next = () => {
        if (lock) {
            setiindex((prevIndex) => {
                const newIndex = prevIndex + 1;
                if (newIndex < data.length) {
                    return newIndex;
                } else {
                    // handle the end of the quiz, maybe reset or show results
                    return prevIndex; // or reset to 0 for a new start
                }
            });
            setlock(false);
            setFlipped(false); // Reset the flip for the next question
            option_array.forEach((option) => option.current.classList.remove("correct", "wrong"));
        }
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            <div className={`quiz-card ${flipped ? 'flipped' : ''}`}>
                <div className="quiz-card-inner">
                    <div className="quiz-card-front">
                        <h2>{index + 1}. {question.question}</h2>
                        <ul>
                            <li ref={option1} onClick={(e) => checkans(e, 1)}>{question.option1}</li>
                            <li ref={option2} onClick={(e) => checkans(e, 2)}>{question.option2}</li>
                            <li ref={option3} onClick={(e) => checkans(e, 3)}>{question.option3}</li>
                            <li ref={option4} onClick={(e) => checkans(e, 4)}>{question.option4}</li>
                        </ul>
                    </div>
                    <div className="quiz-card-back">
                        <h2>Explanation</h2>
                        <p>{question.explanation}</p> {/* Assuming your data has an explanation field */}
                    </div>
                </div>
            </div>
            <button onClick={next}>Next</button>
            <div className="index">{index + 1} of {data.length} questions</div>
            <div className="score">Score: {score}</div>
        </div>
    );
}

export default Quiz;
