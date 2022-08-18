class AddAdminCourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {coursecode: ''};
        this.state = {coursename: ''};
        this.state={courseabbrev:''};
        
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3=this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange1(event) {
        this.setState({coursecode: event.target.value});
    }
    handleChange2(event) {
        this.setState({coursename: event.target.value});
    }

    handleChange3(event) {
        this.setState({courseabbrev: event.target.value});
    }
  
    handleSubmit(event) {
      alert(  this.state.coursename);
      const a=this.state.coursecode;
      const b=this.state.coursename;
      const c=this.state.courseabbrev;
      const data={
        coursecode: a,
                coursename: b,
                courseabbrev:c
                
      }
      const headers =  { 'Content-Type': 'application/json' };
      axios.post('http://localhost:3000/Course', data, { headers })
      .then((response) => 
      
      {if (response.status === 201) {
                        console.log("Success!");
                        alert("success");
                        location.reload();
    
                    } else {
                        alert("error");
                    }
                }
      );
      event.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p class="h1 text-center">Add Course:</p>
                <div class="form-group">
          <label>
            coursecode:
            <input type="text" value={this.state.coursecode} onChange={this.handleChange1} />
          </label>
          </div>
          <div class="form-group">
          <label>
            coursename:
            <input type="text" value={this.state.coursename} onChange={this.handleChange2} />
          </label>
          </div>
        <div class="form-group">
          <label>
          courseabbrev:
            <input type="text" value={this.state.courseabbrev} onChange={this.handleChange3} />
          </label>
          </div>
          <div class="form-group">
          <input class="bg-success" type="submit" value="Submit" />
          </div>
        </form>
      );
    }
}




class DisplayAdminCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: []
        };
    }
    getCourseinfo() {
        axios
            .get(`http://localhost:3000/Course`, {})
            .then(res => {
                const data = res.data
                console.log(data)
                const mystyle = {
                    transition: "0.3s",
                    width: "40%",
                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)",
                    "border-radius": "5px"
                }


                var id = sessionStorage.getItem("userid")


                var courses = data.result.map(c =>
                    <tr>                     
                    <td>{c.coursecode}</td>                     
                    <td>{c.coursename}</td>                     
                    <td>{c.courseabbrev}</td>  
                    <td>
                    <button class="bg-success" onClick={(e) => this.UpdateRow(c.courseid, e)}>Update</button>                       
                    </td>                 
                    <td>                       
                    <button  class="bg-danger" onClick={(e) => this.deleteRow(c.courseid, e)}>delete</button>                   
                    </td>                   
                    </tr>

                )
                this.setState({
                    courses
                })

            })
            .catch((error) => {
                console.log(error)
            })

    }

    deleteRow(courseid, e) {
        axios.delete(`http://localhost:3000/Course/${courseid}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("Successfully Deleted Courseinfo!");
                        alert("successfully Deleted Courseinfo");
                location.reload();
           })

     }

     UpdateRow(courseid,e) {
        axios.put(`http://localhost:3000/Course/${courseid}`) 
        .then(res => {
            console.log(res);
            console.log(res.data);
            console.log("Successfully Updated Courseinfo!");
                    alert("successfully Updated Courseinfo");
            location.reload();
       })

     }

    componentDidMount() {
        this.getCourseinfo()
    }
    render() {

        return (
            <div>  
                <table className="table table-dark">               
                <thead>                 
                    <tr>                     
                        <th>coursecode</th>                      
                        <th>coursename</th>                     
                        <th>courseabbrev</th>
                        <th>Update</th>                   
                        <th>Delete</th>                 
                        </tr>               
                        </thead>                    
                        <tbody>  
                {this.state.courses}
                </tbody>
                </table>
                </div>
        )
    }
}
    class Footer extends React.Component {
    
        render(){
            return(
                <div>
                <h3>Singapore Polytechnic</h3>
                <p>500 Dover Road Singapore 139651</p>
                </div>
                )
            }
            
            
        }  

window.addEventListener('DOMContentLoaded', function () {

    const root = ReactDOM.createRoot(document.getElementById('root-admincourse'));
    const root2=ReactDOM.createRoot(document.getElementById('addadmincourseform'));
    const root3=ReactDOM.createRoot(document.getElementById('footer'));
    const element = <DisplayAdminCourse />;
    const element2=<AddAdminCourseForm/>;
    const element3=<Footer/>
    root.render(element);
    root2.render(element2);
    root3.render(element3);

});

