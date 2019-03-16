// define UI vars
const form=document.querySelector("#task-form");
const taskList=document.querySelector(".collection");
const clearBtn= document.querySelector(".clear-tasks");
const filter =document.querySelector("#filter");
const taskInput=document.querySelector("#task");

// load all event listeners
    loadEventListeners();

// DOM load event
    document.addEventListener("DOMContentLoaded",getTasks)

// load all event listeners
    function loadEventListeners(){

// add task event
    form.addEventListener("submit",addTask);

// remove task event 
    taskList.addEventListener("click",removeTask);

// clear all task
    clearBtn.addEventListener("click",clearTask);

// filter tasks event
    filter.addEventListener("keyup",filterTasks);
};

// add task
    function addTask(e){
if(taskInput.value===""){
alert("add something");
}

// create li element
    const li=document.createElement("li");

// add class 
    li.className= "collection-item";

// create text node and append child
    li.appendChild(document.createTextNode(taskInput.value));

// create new link  element
    const link= document.createElement("a");

// add a class
    link.className="delete-item secondary-content";

// add icon html
    link.innerHTML='<i class="fa fa-remove"></i>'

// append the link to li
    li.appendChild(link);

//append li to ul
    taskList.appendChild(li);

// store in local storage
    storeTaskLocalStorage(taskInput.value);

//clear input
    taskInput.value="";

// prevent it from reload
    e.preventDefault()
}

// get tasks from local storage to DOM
    function getTasks(){
        let tasks;
        if(localStorage.getItem("tasks")===null){
            tasks=[];
        }else{
            tasks=JSON.parse(localStorage.getItem("tasks"))
        }

        tasks.forEach(function(task){
            const li=document.createElement("li");

            // add class 
                li.className= "collection-item";
            
            // create text node and append child
                li.appendChild(document.createTextNode(task));
            
            // create new link  element
                const link= document.createElement("a");
            
            // add a class
                link.className="delete-item secondary-content";
            
            // add icon html
                link.innerHTML='<i class="fa fa-remove"></i>'
            
            // append the link to li
                li.appendChild(link);
            
            //append li to ul
                taskList.appendChild(li);
        })
    }

// store task to local storage
    function storeTaskLocalStorage(task){
        let tasks;
        if(localStorage.getItem("tasks")===null){
            tasks=[];
        }else{
            tasks=JSON.parse(localStorage.getItem("tasks"))
        }
        tasks.push(task);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

// remove task
    function removeTask(e){
        if(e.target.parentElement.classList.contains("delete-item")){
            if(confirm("Are you sure?")){ 
            e.target.parentElement.parentElement.remove();
        
            // remove from the local storage
                removeTaskFromLocalStorage(e.target.parentElement.parentElement)
            }
        }
    };

// remove from local storage function
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem("tasks")===null){
            tasks=[];
        }else{
            tasks=JSON.parse(localStorage.getItem("tasks"))
        }

        tasks.forEach(function(task,index){
            if(taskItem.textContent===task){
                tasks.splice(index,1)
            }
        })
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }

// clear all task function
    function clearTask(){
    // this one way of doing it 
            //taskList.innerHTML=" ";
        
    // this is the best way to do it cause its faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // clear from all from local storage
    clearTasksFromLocalStorage();
    }

// clear tasks from all local storage
    function clearTasksFromLocalStorage(){
        localStorage.clear();
    }

// filter task
    function filterTasks(e){
        const text= e.target.value.toLowerCase();

        document.querySelectorAll(".collection-item").forEach(
            function(task){
                const item= task.firstChild.textContent;
                if(item.toLowerCase().indexOf(text)!==-1){
                    task.style.display='block';
                }else{
                    task.style.display="none"
                }
            }
        )
    }
