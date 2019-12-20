import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/general.act';
import './Summary.scss'
import { checkApiFailed, loading } from '../../functions/functions';

const Summary = (props) => {

    const [state, setState] = useState({ loading: true, answers: [] })

    useEffect(() => {
        if (_isAnswers(props.answers)) {
            props.finish()
            _get_answers_api()
        }
        else {
            props.history.push('/')
        }
    }, [props.answers])

    const _isAnswers = (answers) => {
        if (Object.keys(answers).length > 0) {
            return true
        }
        return false;
    }

    const _get_answers_api = () => {
        props.get_answers(res => {
            if (checkApiFailed(res)) {
                setState({ ...state, errorMsg: 'Error !!!', loading: false })
                return;
            }

            let answers = res.data.answers;
            let correctAnswers = _calculateCorrectAnswers(answers, props.answers)
            let percentage = _calculatePercentage(correctAnswers, answers.length)

            setState({ ...state, answers, loading: false, countOfQuestions: answers.length, percentage, correctAnswers })
        })
    }

    const _calculateCorrectAnswers = (correctAnswers, chosenAnswers) => {
        let countOfCorrectAnswers = 0;

        correctAnswers.forEach(correctAnswers => {
            let questionId = correctAnswers.id

            if (chosenAnswers[questionId] === correctAnswers.answer) {
                ++countOfCorrectAnswers;
            }
        })

        return countOfCorrectAnswers;
    }

    const _calculatePercentage = (correctAnswers, countOfQuestions) => {
        return (correctAnswers / countOfQuestions) * 100;
    }

    if (state.loading) {
        return loading()
    }



    return (
        <div className='summary'>
            <h1>Quiz Results:</h1>
            <h2>{`Your result: ${state.percentage} `}</h2>
            <h2>{`You answered ${(state.correctAnswers)}/${state.countOfQuestions} correctly.`}</h2>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_answers: (callback) => { dispatch(actions.get_answers(callback)); },
        finish: () => { dispatch(actions.finish()); },
    }
};

const mapStateToProps = state => ({
    answers: state.general.answers,
})

export default connect(mapStateToProps, mapDispatchToProps)(Summary)