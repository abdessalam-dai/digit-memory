import React, { Component } from 'react';


class Timer extends Component {
    render () {
        return (
            <div>
                <h4>Countdown : { this.props.time }</h4>
            </div>
        );
    }
}


export default Timer;
