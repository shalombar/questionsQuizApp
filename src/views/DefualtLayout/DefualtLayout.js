import React, { useEffect } from 'react'
import { Button } from 'reactstrap'
import './DefualtLayout.scss'
import { connect } from 'react-redux';

const DefualtLayout = (props) => {

    useEffect(() => {
        if (props.isFinisedTest) {
            props.history.push('/summary')
        }
    }, [])
    
    const _buttonHadling = () => {
        props.history.push('/questanire')
    }

    return (
        <div className='defualtLayout'>
            <h1>Quiz</h1>
            <h3>The quiz includes 10 questions. Good luck !!! </h3>
            <Button color='info' onClick={() => _buttonHadling()}>Click here to start</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    isFinisedTest: state.general.isFinisedTest,
})

export default connect(mapStateToProps)(DefualtLayout)