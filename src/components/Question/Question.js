import React, { useState } from 'react'
import './Question.scss'
import { Button } from 'reactstrap'

const Question = (props) => {
    let { currentQuestion, index, questionsCount, questionObject, setCurrentQuestion, updateAnswers } = props;

    const [selectedOption, setSelectedOption] = useState(null)

    const _isDisplay = (index, currentQuestion) => {
        if (index === currentQuestion) {
            return 'question_block'
        }
        return 'question_block unVisible'
    }

    const _renderOptions = (options) => {
        return (
            <div className='options'>
                {options.map((option, idx) => _renderOption(option, idx))}
            </div>
        )
    }

    const _renderOption = (option, idx) => {
        let isChecked = _isChecked(option)
        return (
            <div className="radio" key={'option-' + idx}>
                <input type="radio" value={option} checked={isChecked} onChange={(e) => _handleOptionChange(e)} />
                <div className={'option option-' + idx}>{option}</div>
            </div>
        )
    }

    const _isChecked = (value) => {
        if (selectedOption == value) {
            return true
        }
        return false
    }

    const _handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
    }

    const _renderButtons = () => {
        return (
            <div className='action_buttons'>
                <Button color='primary' onClick={() => _onPrev()} disabled={(index === 0) ? true : false}>{'<-Prev'}</Button>
                {
                    index == (questionsCount - 1) ?
                        <Button color='primary' onClick={() => _onDone()}> Done</Button>
                        :
                        <Button color='primary' onClick={() => _onNext()}> {'Next->'}</Button>
                }
            </div >
        )
    }

    const _onPrev = () => {
        if(index!=0){
            setCurrentQuestion((currentQuestion - 1))
        }
    }
    const _onNext = () => {
        updateAnswers(currentQuestion, questionObject.id, selectedOption)
    }
    const _onDone = () => {
        let isDone = true;

        updateAnswers(currentQuestion, questionObject.id, selectedOption, isDone)
    }

    return (
        <div className={_isDisplay(index, currentQuestion)} >
            <h3>{`Question ${(index + 1)}/${questionsCount}`}</h3>
            <div className='question'>{questionObject.question}</div>
            {_renderOptions(questionObject.options)}
            {_renderButtons()}
        </div>
    )
}

export default (Question)