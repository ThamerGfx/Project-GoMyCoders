import axios from 'axios'

let allStudents = []

export const createStudent = (student) => { 
  return (dispatch) => { 
      axios.post('http://localhost:5000/addone', student)
        .then((res) => {
          if (res.status === 200) {
              return {
                ...student,
                allStudents: [...allStudents, {...student}]
              }
          }
          console.log("student added success")
        })
        .then(() => {
          dispatch({
            type: "add_student",
            payload: { student }
          })
        })
        .catch((err) => console.log('error from add: ', err))
    }
}

export const removeStudent = (_id) => {
  return (dispatch) => {
    axios.delete('http://localhost:5000/deleteone/' + _id)
    .then(() => {
      dispatch({
        type: "REMOVE_STUDENT",
        payload: { _id }
      })
    })
    .catch((err) => console.log('error from delete: ',err))
  }
}

export const selectStudent = (student) => {
  return {
    type: "EDIT_STUDENT_ITEM",
    payload: { student }
  }
}

export const updateStudent = (student) => {
  return (dispatch) => {
    axios.put(`http://localhost:5000/modifyone/${student._id}`, { ...student })
    .then(() => {
      dispatch({
        type: "UPDATE_STUDENT",
        payload : { student }
      })
    })
    .catch((err) => console.log(err))
  }
}

export const getAllStudents = () => {
  return (dispatch) => {
    fetch("http://localhost:5000/getall")
    .then((res) => 
      res.json()
    )
    .then((res) => {
      console.log('allStudents:::', res)
      dispatch(getAllStudentsSuccess(res))
      return allStudents
    })
    .catch((err) => console.log("error adding student: ", err))
  }
}
export const getAllStudentsSuccess = (allStudents) => (
  {
    type:'GET_ALL_STUDENTS_SUCCESS',
    payload: allStudents
  }
)
