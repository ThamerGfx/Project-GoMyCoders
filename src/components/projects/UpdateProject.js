import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
//components
import ProjectListToUpdate from './ProjectListToUpdate';
import { Link, withRouter } from 'react-router-dom';

import { updateStudent } from '../../store/actions/studentActions'

class UpdateProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: !this.props._id ? "" : this.props._id,
      name: !this.props.name ? "" : this.props.name,
      email: !this.props.email ? "" : this.props.email,
      phone: !this.props.phone ? "" : this.props.phone,
      cash: !this.props.cash ? "" : this.props.cash,
      level: !this.props.level ? "" : this.props.level,
      time: !this.props.time ? "" : this.props.time,
      allStudents: [],
      loadDisplay: 'none',
      buttonDisplay: 'block'
    };
 }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.allStudents !== prevProps.allStudents) {
        this.setState({
            allStudents: this.props.allStudents
        })
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  updateStudent = (e, item) => {
    e.preventDefault()
    this.setState({
      loadDisplay: 'block',
      buttonDisplay: 'none'
    })
    this.props.updateStudent(this.state)
    this.setState({
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      level: '',
      time: '',
      updateClicked: true
    })
      setTimeout(() => {
        this.setState({
          loadDisplay: 'none',
          buttonDisplay: 'block'
        })
        this.props.history.push("/");
      }, 1000);
  }

  cancelUpdate = () => {
    this.setState({
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      level: '',
      time: '',
      updateClicked: true
    })
  }

  receiveData = (data) => {
    this.setState({
      ...data
    })
  }


  render() {
    return (
      <div className = "container">
        <form className = "white"  component={Paper}>
          <h5 className = "grey-text text-darken-3"> Update a Student </h5>
          <div className = "input-field">
            {/* <label htmlFor = "name" > Student Name </label> */}
              <input 
                type = "text" 
                id = "name"
                value = { this.state.name } 
                onChange = { this.handleChange } 
              />
          </div>
          <div className = "input-field" >
            <input 
              type = "email"
              id = "email" 
              value = { this.state.email }
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "email" > Student Email </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              id = "phone" 
              value = { this.state.phone } 
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "phone" > Student Phone </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              id = "cash" 
              value = { this.state.cash } 
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "cash" > Cash DTN </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              id = "level"  
              value = { this.state.level }
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "finished" > Student Situation </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              id = "time"  
              value = { this.state.time }
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "finished" > Student Situation </label> */}
          </div>
          <div className = "input-field" style= {{display: 'flex'}}>
            <button 
              style={{display: this.state.buttonDisplay, marginRight: '10px'}}
              className = "btn blue lighten-1" 
              onClick = { this.updateStudent }
              component = {Link} to = "/"
            >              
              Update
            </button>
            <button 
              style={{display: this.state.buttonDisplay}}
              className = "btn grey lighten-3" 
              onClick = { this.cancelUpdate }
              component = {Link} to = "/update"
            >              
              Cancel
            </button>
          </div>
          <div style={{display: this.state.loadDisplay}}>
            <ReactLoading  type={"balls"} color={'grey'} height={80} width={50} />
          </div>
        </form>
        <div className = "col s12 m6">
            <ProjectListToUpdate 
              receive = { this.receiveData }
                updatedItem = {{
                  _id: this.state._id,
                  name: this.state.name,
                  email: this.state.email,
                  phone: this.state.phone,
                  cash: this.state.cash,
                  level: this.state.level,
                  time: this.state.time,
                }}
            />
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allStudents: state.studentReducer.allStudents,
    studentItem: state.studentReducer.studentItem
  }
}

export default withRouter(connect(mapStateToProps, { updateStudent })(UpdateProject))