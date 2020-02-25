import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from 'react-mdl';
import { removeStudent, selectStudent, getAllStudents } from '../../store/actions/studentActions'
import { connect } from 'react-redux';
import { Alert } from 'reactstrap'

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 15,
    },
}))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);

const styles = makeStyles({
    table: {
      minWidth: 1500,
    },
});

class ProjectListToUpdate extends Component {

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
            allStudents: this.props.allStudents,
            visible: false
        }
    }

    componentDidMount() {
        this.props.getAllStudents();
        this.setState({allStudents: this.props.allStudents})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allStudents !== prevProps.allStudents) {
            this.setState({
                allStudents: this.props.allStudents
            })
        }
    }

    toggle = () => {
        this.setState({
            visible: ! this.state.visible
        })
        setTimeout(() => {
          this.setState({
            visible: ! this.state.visible
          })
        }, 1000);
    }

    deleteStudent = (item) => {
        console.log(item);
        console.log('this.state: ', this.state)
        this.props.removeStudent(item._id)
    }
    handleUpdate = (student) => {
        console.log(student)
        const myData = {
            name : student.name,
            number : student.number,
            email : student.email,
            phone : student.phone,
            cash : student.cash,
            level : student.level,
            time : student.time,
            _id: student._id
          };
        this.props.receive(myData);
    }

    render () {
        const studentsFetched = this.props.allStudents
        console.log('studentsFetched:: ', studentsFetched)
        console.log(this.state)
            return (
                <div>
                    <Alert isOpen = { this.state.visible } toggle = { this.toggle.bind(this) }>Student Deleted !</Alert>
                    <TableContainer component={Paper} className = {styles}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left"><b>Name</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Email</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Phone</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Cash</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Level</b></StyledTableCell>
                            <StyledTableCell align="left"><b>Time</b></StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.allStudents.map((student, index) => (
                                <StyledTableRow key={index} hover>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {student.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{student.email}</StyledTableCell>
                                    <StyledTableCell align="left">{student.phone}</StyledTableCell>
                                    <StyledTableCell align="left">{student.cash}</StyledTableCell>
                                    <StyledTableCell align="left">{student.level}</StyledTableCell>
                                    <StyledTableCell align="left">{student.time}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Button
                                            type="button" 
                                            className = "btn blue lighten-1"
                                            onClick = { () => this.handleUpdate(student) }
                                        >
                                            UPDATE
                                        </Button>
                                        <Button
                                            type="button" 
                                            className = "btn red lighten-1"
                                            onClick = { () => {
                                                this.deleteStudent(student)
                                                this.toggle() 
                                                }
                                            }
                                        >
                                            DELETE
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        allStudents: state.studentReducer.allStudents
    }
}

export default connect(mapStateToProps, { removeStudent, selectStudent, getAllStudents })(ProjectListToUpdate)