import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading';

import { createStudent } from '../../store/actions/studentActions'

class CreateProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      level: '',
      time: '',
      loadDisplay: 'none',
      buttonDisplay: 'block'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loadDisplay: 'block',
      buttonDisplay: 'none'
    })
    const {name, email, phone, cash, level, time} = this.state
    if(name !== null && email !== null && phone !== null && cash !== null && level !== null && time !== null) {
      this.props.createStudent(this.state)
      this.setState({
        _id: "",
        name: "",
        email: "",
        phone: "",
        cash: "",
        level: "",
        time: ""
      })
      setTimeout(() => {
        this.setState({
          loadDisplay: 'none',
          buttonDisplay: 'block'
        })
        this.props.history.push("/");
      }, 2000);
    }
  }

  render() {
    // console.log('this.props: ', this.props)

    return (
      <div className  ="container">
        <form className = "white">
          <h5 className = "grey-text text-darken-3"> Create a Student </h5>
          <div className = "input-field">
            <input 
              type = "text" 
              value = { this.state.name }
              id = "name" 
              onChange = { this.handleChange } 
            />
            <label htmlFor = "name" > Student Name </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "email"
              value = { this.state.email }
              id = "email" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "email" > Student Email </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              value = { this.state.phone }
              id = "phone"  
              onChange = { this.handleChange }
            />
            <label htmlFor = "phone" > Student Phone </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              value = { this.state.cash }
              id = "cash" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "cash" > Cash DTN </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              value = { this.state.level }
              id = "level" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "finished" > Student's Level </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              value = { this.state.time }
              id = "time" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "finished" > Student's Time </label>
          </div>
          <div className = "input-field">
            <button 
              style={{display: this.state.buttonDisplay}}
              className = "btn green lighten-1" 
              onClick = {(e) => {
                this.handleSubmit(e)
              }}
            component = {Link} to = {'/'}
            >
              Create
            </button>
            <div style={{display: this.state.loadDisplay}}>
              <ReactLoading  type={"balls"} color={'grey'} height={80} width={50} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    allStudents: state.studentReducer.allStudents,
    studentItem: state.studentReducer.studentItem
  }
}

export default withRouter(connect(mapStateToProps, { createStudent })(CreateProject))