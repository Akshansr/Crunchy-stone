import React, { Component } from 'react';
var firebase = require("firebase")
var uuid = require("uuid")

var config = {
    apiKey: "AIzaSyDtG1ov5X1wVPLcxObFkT2CKQqgLn7KTaw",
    authDomain: "surveyapp-8965e.firebaseapp.com",
    databaseURL: "https://surveyapp-8965e.firebaseio.com",
    projectId: "surveyapp-8965e",
    storageBucket: "surveyapp-8965e.appspot.com",
    messagingSenderId: "240418629328"
  };
  firebase.initializeApp(config);


class Survey extends Component {

    takeName(event){

        var customerName = this.refs.name.value;
        this.setState({
            customerName: customerName

        }, () => console.log(this.state))


    }
    answerStore(event){
        
  
       var answers = this.state.answers;
            if( event.target.name === 'answer1'){
                answers.answer1 = event.target.value;

            }
            else if( event.target.name === 'answer2'){
                answers.answer2 = event.target.value;

            }
            else if( event.target.name === 'answer3'){
                answers.answer3 = event.target.value;

            }
            this.setState({
                answers: answers
    
            }, () => console.log(this.state))
    }

    callData(event){

        firebase.database().ref('surveyapp/' + this.state.uid).set({

                customerName: this.state.customerName,
                answers: this.state.answers

        })
        this.setState({isSubmitted: true}, () => console.log(this.state));
    }
    constructor(props) {
        super(props);
        this.state = { 
            customerName: '',
            uid: uuid.v1(),
            answers: {

                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false

         };
         this.takeName = this.takeName.bind(this);
         this.answerStore = this.answerStore.bind(this)
         this.callData = this.callData.bind(this)
    }
    render() {
        var customerName;
        var questions;
        if(this.state.customerName === '' && this.state.isSubmitted === false){

            customerName = <div><h1>
            Hey please let us know your name:
            </h1>
            <form onSubmit={this.takeName} >
            <input className= 'namu' type='text' placeholder='enter ur name' ref='name' />            
            </form>
            </div>;
            questions = ''
        }
        else if(this.state.customerName !== '' && this.state.isSubmitted === false){
            customerName = <div><h1>
                        hi {this.state.customerName}, welcome to crunchy stone survey
                            </h1>
                            </div> ;
            questions = <div className = 'bod'>
                        <div>
                            <form className= 'formu'>
                            <label className = 'questions'>
                            which flavour do you like the most ? <br/>
                            </label>
                            <input type='radio' className = 'options' name='answer1' value='Death by Chocolate'
                            onChange={this.answerStore} /> Death by Chocolate
                            <input type='radio'  name='answer1' value='Brownie delight'
                            onChange={this.answerStore} /> Brownie delight
                            <input type='radio'  name='answer1'
                            onChange={this.answerStore} value='Vanilla delight' /> Vanilla delight
                            
                            </form>
                        </div>
                        <div>
                            <form className= 'formu'>
                            <label className = 'questions'>
                            How you got to know about us ?  <br/>
                            </label>
                            <input type='radio'  name='answer2' value = 'facebook'
                            onChange={this.answerStore} /> facebook
                            <input type='radio'  name='answer2' value = 'friends'
                            onChange={this.answerStore} /> friends
                            <input type='radio'  name='answer2' value = 'others'
                            onChange={this.answerStore} /> others
                        
                                </form>
                                </div>
                        <div>
                                <form className= 'formu'>
                                <label className = 'questions'>
                                Rate your experience <br/>
                                </label>
                                <input type='radio'  name='answer3' value= 'Good'
                                onChange={this.answerStore} /> Good
                                <input type='radio'  name='answer3' value = 'Great'
                                onChange={this.answerStore} /> Great 
                                <input type='radio'  name='answer3' value = 'Needs improvement'
                                onChange={this.answerStore} /> Needs improvement
                                
                                </form>
                        </div>
                        <input  className='submitu' type='submit' value='submit' onClick={this.callData}/>

                    </div>


        }
        return (

            <div>
            {customerName}

            ----------------------------------------------<br/>

            {questions}
            
            </div>
            
        );
    }
}

export default Survey;