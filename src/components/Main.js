import React, { Component } from 'react';
import Timer from './Timer';
// import Digits from './Digits';



class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 3,
            numberOfDigits: 4,
            min: 0,
            max: 0,
            message: "Memorize this series of digits",
            currentNumber: "",
            digitsArr: [],
            numberByUser: "",
            digitsArrByUser: [],
            currDigitIndex: 0,
            showInput: false,
            startTimer: false,
            showResult: false,
            // showNextButton: true,
            digitShowTime: 1000,
        }

        this.showCurrentDigit = this.showCurrentDigit.bind(this);
        this.countDown = this.countDown.bind(this);
        this.handleUserNumberChange = this.handleUserNumberChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        // this.handleNextButton = this.handleNextButton.bind(this);
    }

    handleUserSubmit() {
        clearInterval(this.timer);

        const numberByUser = this.state.numberByUser;
        const currentNumber = this.state.currentNumber;
        let numberOfDigits = this.state.numberOfDigits;

        if (numberByUser === currentNumber) {
            // this.timer = setInterval(this.showCurrentDigit, this.state.digitShowTime);
            this.setState({
                numberOfDigits: numberOfDigits + 1,
                // showNextButton: true,
            });
        }

        this.setState({
            showInput: false,
            startTimer: false,
            showResult: true,
        });

        setTimeout(() => {
            this.setState({
                time: 3,
                showResult: false
            });
            this.startNewRound();
        }, 2000);
    }

    handleUserNumberChange(event) {
        let numberByUser = parseInt(event.target.value);
        let digitsArrByUser = [];

        for (let i = 0; i < String(numberByUser).length; i++) {
            digitsArrByUser.push(String(numberByUser)[i]);
        }

        if (event.target.value.length === 0) {
            numberByUser = "";
        }

        this.setState({
            numberByUser: numberByUser,
            digitsArrByUser: digitsArrByUser,
        });
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.handleUserSubmit();
        }
    }

    digitIsCorrect = (digit, index) => {
        const numberByUser = this.state.numberByUser;

        let digitsArrByUser = [];

        for (let i = 0; i < String(numberByUser).length; i++) {
            digitsArrByUser.push(String(numberByUser)[i]);
        }

        if (index < this.state.digitsArr.length) {
            return digitsArrByUser[index] === digit;
        } else {
            return false;
        }
    }

    // handleNextButton () {
    //     this.setState({
    //         showResult: false,
    //         showNextButton: false,
    //     })
    // }

    countDown() {
        let time = this.state.time;

        if (time === 0) {
            clearInterval(this.timer);
            this.setState({
                showInput: false,
                showResult: true,
            });

            this.handleUserSubmit();
        } else {
            this.setState({
                time: time - 1
            });
        }
    }

    showCurrentDigit() {
        let currDigitIndex = this.state.currDigitIndex;
        let digitsArr = this.state.digitsArr;

        if (currDigitIndex < digitsArr.length - 1) {
            this.setState({
                currDigitIndex: currDigitIndex + 1
            });
        } else {
            clearInterval(this.timer);
            this.setState({
                showInput: true,
                startTimer: true,
            });

            this.timer = setInterval(this.countDown, 1000);
        }
    }

    startNewRound() {
        function randInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        let numberOfDigits = this.state.numberOfDigits;

        const min = Math.pow(10, numberOfDigits - 1);
        const max = parseInt('9'.repeat(numberOfDigits));

        let randomNumber = randInt(min, max);

        let digitsArr = [];
        let currentNumber = randomNumber;

        for (let i = 0; i < String(currentNumber).length; i++) {
            digitsArr.push(String(currentNumber)[i]);
        }

        console.log(digitsArr);

        this.setState({
            time: numberOfDigits * 2,
            currentNumber: randomNumber,
            currDigitIndex: 0,
            digitsArr: digitsArr,
            numberByUser: "",
        });

        if (true) {
            this.timer = setInterval(this.showCurrentDigit, this.state.digitShowTime);
        }
    }

    componentDidMount() {
        this.startNewRound();
    }

    render() {
        let digitsArr = this.state.digitsArr;
        let currDigitIndex = this.state.currDigitIndex;
        let showInput = this.state.showInput;
        let showResult = this.state.showResult;
        // let showNextButton = this.state.showNextButton;

        const UserInput = <input
            type="number"
            value={this.state.numberByUser}
            onChange={this.handleUserNumberChange}
            onKeyPress={this.handleKeyPress}
            autoFocus
            className="form-control-lg"
        />;
        const CurrentDigit = <h1 style={{ fontSize: "80px" }} className="digit">{digitsArr[currDigitIndex]}</h1>;
        const Result = () => {
            const digits = digitsArr.map((digit, index) =>
                <span
                    key={index}
                    className={this.digitIsCorrect(digit, index) ? "text-success" : "text-danger"}
                >
                    {digit}
                </span>
            );

            return (
                <div>
                    <h1 style={{ fontSize: "80px" }}>{digits}</h1>
                </div>
            );
        }

        // const NextButton = <button
        //     className="btn btn-lg btn-primary"
        //     onClick={this.handleNextButton}
        // >Next</button>

        return (
            <div className="main">
                <div className="d-flex justify-content-between">
                    <div className="border-end border-bottom p-4">
                        <h4>Number of digits : {this.state.numberOfDigits}</h4>
                    </div>

                    <div className="border-start border-bottom p-4">
                        <Timer
                            time={this.state.time}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="p-4">
                        <h4>{this.state.message}</h4>
                    </div>
                </div>

                <div className="d-flex justify-content-center" style={{ height: "50vh" }}>
                    <div className="my-auto">
                        <div className="d-flex justify-content-center">
                            <div className="p-4">
                                {
                                    showResult ? <Result /> : (showInput ? UserInput : CurrentDigit)
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="d-flex justify-content-center">
                    <div className="p-4">
                        {showNextButton ? NextButton : ""}
                    </div>
                </div> */}

            </div>
        );
    }
}


export default Main;
