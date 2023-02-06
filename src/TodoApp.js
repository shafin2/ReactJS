import './Todo.css';
import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:{
                list:[],
                checkIndexes:[]
            },
            newTask:'',
        };
    }
    removeElement(i){
        let ls=document.getElementsByClassName("allTasks")
        if(this.state.tasks.checkIndexes[i+1]){
            ls[i].classList.add("checked");
        }
        console.log("Clcike")
        let mylist1=this.state.tasks.list.slice();
        console.log(mylist1)
        let mylist = mylist1.filter(x => x !== mylist1[i]);
        console.log(mylist)
        let check1=this.state.tasks.checkIndexes.slice();
        let check = check1.filter(x => x !== check1[i]);
        this.setState({
            tasks:{
                list:mylist,
                checkIndexes:check,
            },
        });
    }
    newElement(){
        let a=document.getElementById("myInput").value;
        if(a!=""){
            let norepeat=true;
            for(let i=0;i<this.state.tasks.list.length;i++){
                if(this.state.tasks.list[i]===a){
                    norepeat=false;
                }
            }
            if(norepeat){
                let mylist=this.state.tasks.list.slice();
                mylist.push(a);
                let check=this.state.tasks.checkIndexes.slice();
                check.push(false);
                this.setState({
                    tasks:{
                        list:mylist,
                        checkIndexes:check,
                    },
                });
            }
            else{
                alert("Task already exist!");
            }
            
        }
        
    }
    taskClick(i){
        this.state.tasks.checkIndexes[i]=this.state.tasks.checkIndexes[i
        ]?false:true;
        let ls=document.getElementsByClassName("allTasks")
        if(this.state.tasks.checkIndexes[i]){
            ls[i].classList.add("checked");
        }
        else{
            ls[i].classList.remove("checked");
        }
    }
    render(){
        return (
            <>
            <div className="container">
                <div id="myDIV" className="header">
                    <h2>My To Do List</h2>
                    <input type="text"  id="myInput" placeholder="Title..." />
                    <span onClick={() => this.newElement()} className="addBtn">Add</span>
                </div>
                    <ul id="myUL">
                        {
                            this.state.tasks.list.map((todo, index) => (
                                
                                <li key={index}  className="allTasks">
                                    <span onClick={()=>{this.taskClick(index)}}>{todo}</span>
                                    <span onClick={() => this.removeElement(index)} className="close">x</span>
                                </li>
                            ))
                        }
                    </ul>
            </div>
            </>
        );
    }
}

export default App;