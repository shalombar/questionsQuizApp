import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/general.act';
import { checkApiFailed } from '../../functions/functions';
import Question from '../../components/Question/Question';
import './QuestanirePage.scss'

const QuestanirePage = (props) => {
    const [state, setState] = useState({
        questionsCount: 0,
        questionsList: [],
        loading: true,
        currentQuestion: 0,
        answers: {},
        isDone: false
    })

    useEffect(() => {
        if (props.isFinisedTest) {
            props.history.push('/summary')
        }

        if (_isQuestionsListEmpty()) {
            _get_questions_api()
        }
        else {
            _get_questions_from_redux()
        }
    }, [])

    useEffect(() => {
        if (_isDoneClicked()) {
            props.setAnswers(state.answers)
            props.history.push('/summary')
        }
    }, [state.isDone])

    const _isQuestionsListEmpty = () => {
        if (props.questions.length === 0) {
            return true
        }
        return false
    }

    const _get_questions_api = () => {
        props.get_questions((res) => {
            if (checkApiFailed(res)) {
                setState({ ...state, errorMsg: 'Error !!!' })
                return;
            }
            let questions = res.data.questions;
            let questionsCount = questions.length;

            setState({ ...state, questionsCount, questionsList: questions, loading: false })
            props.setQuestions(questions)
        })
    }

    const _get_questions_from_redux = () => {
        let questions = props.questions;
        let questionsCount = questions.length;

        setState({ ...state, questionsCount, questionsList: questions, loading: false })
    }

    const _isDoneClicked = () => {
        if (state.isDone) {
            return true
        }
        return false
    }

    const _renderQuestions = () => {
        let { questionsList, questionsCount, currentQuestion } = state;

        return questionsList.map((question, idx) =>
            <Question
                key={idx}
                index={idx}
                questionObject={question}
                questionsCount={questionsCount}
                currentQuestion={currentQuestion}
                setCurrentQuestion={_setCurrentQuestion}
                updateAnswers={_updateAnswers}
            />)
    }

    const _setCurrentQuestion = (value) => {
        setState({ ...state, currentQuestion: value })
    }

    const _updateAnswers = (index, questionId, value, isDone) => {
        let { answers } = state

        answers[questionId] = value
        setState({ ...state, answers, currentQuestion: (index + 1), isDone })
    }

    return (
        <div className='questanirePage'>
            {_renderQuestions()}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_questions: (callback) => { dispatch(actions.get_questions(callback)); },
        setAnswers: (data) => { dispatch(actions.setAnswers(data)); },
        setQuestions: (data) => { dispatch(actions.setQuestions(data)); },
    }
};

const mapStateToProps = state => ({
    questions: state.general.questions,
    isFinisedTest: state.general.isFinisedTest,
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestanirePage)