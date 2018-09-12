import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Questions extends Component {
    state = {
      questions: null,
    };
  

 async componentDidMount(){
    const questions = ( await axios.get('http://localhost:8080/')).data;
    this.setState({
      questions,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <Link to="/new-question">
              <div className="card-body">
                <h4 className="card-title">Ask a Question</h4>
                <p className="card-text">Someone will help you shortly!</p>
              </div>
          </Link>
          </div>
          {this.state.questions === null && <p>Loading questions...</p>}
          {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Answers: {question.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
