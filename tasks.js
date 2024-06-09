const create_btn = document.querySelector(".create-btn");
const main = document.querySelector(".main");
const close_btn = document.querySelector(".close-btn");
const add_task_btn = document.querySelector(".add-btn");
const text_input = document.querySelector(".task-input");
const display = document.querySelector(".display");
const corrector = document.querySelector(".corrector");
const delete_wrap = document.querySelector(".delete-wrap");
const yes_btn = document.querySelector(".yes-btn");
const no_btn = document.querySelector(".no-btn");


display_tasks()

let parent = undefined;
text_input.focus()

main.classList.add("hide");
delete_wrap.classList.add("hide");

create_btn.onclick = ()=>{
    main.classList.remove("hide");
}

close_btn.onclick = ()=>{
    main.classList.add("hide");
}

yes_btn.onclick = ()=>{
    no_btn.disabled = true;
    delete_wrap.firstElementChild.textContent = "Bet";
    setTimeout(()=>{
        parent.remove();
        localStorage.removeItem(parent.id)
        delete_wrap.classList.add("hide");
        parent = null;
        delete_wrap.firstElementChild.textContent = "Are you sure want to delete this Task ?";
        no_btn.disabled = false;
    },1000)
}

no_btn.onclick = ()=>{
    delete_wrap.classList.add("hide");
    parent = null;
}

add_task_btn.onclick = ()=>{
   const task = text_input.value;
   const max_tasks = 15;

   if(localStorage.length == max_tasks){
        corrector.textContent = "! Complete some tasks before adding more !".toUpperCase()
        return;
   }

   if(task.trim() == ""){
    corrector.textContent = "! Must type something !".toUpperCase()
    return;
   }

   if(task.length > 150){
        corrector.textContent = "! Must be < 150 characters !".toUpperCase()
        return;
   }else if(task.length < 10){
    corrector.textContent = "! Must be 10 characters or more!".toUpperCase()
    return;
   }

   const id  = save_task(task);
   const TASK = localStorage.getItem(id);

   structure_html(TASK, id)

    text_input.value = ""
    corrector.textContent = ""
    main.classList.add("hide");
    delete_task()
}

delete_task();

function delete_task(){

    const btns = document.querySelectorAll(".done-btn");
    btns.forEach(btn=>{
        btn.onclick = (e)=>{
            delete_wrap.classList.remove("hide");
            const Parent = e.target.parentElement;
            parent = Parent;
        }
    })
}

function create_element(elem, cls){
  const el = document.createElement(elem);
  el.classList.add(cls)
   return el;
}

function save_task(task){
    const r1 = String( random(task));
    const r2 = String(random(task));
    const id = r1+r2;
    if(localStorage.key(id)){
        save_task(task);
    }
    localStorage.setItem(id, task);
    return id;
}   

function random(task){
    const random = Math.floor(Math.random()* 100 * task.length);
    return random;
}

function display_tasks(){
     const n = localStorage.length;

     for(let i = 0; i< n; i++){
        const ID = localStorage.key(i);
        const task = localStorage.getItem(ID);

        structure_html(task ,ID);
        
     }
}

function structure_html(task, id){
    const div = create_element("div", "single-task");
        div.id = id;
        const task_div = create_element("div", "task");
        const done_btn = create_element("button", "done-btn");
     
        task_div.textContent = task;
        done_btn.textContent = "Done";
     
        div.appendChild(task_div);
        div.appendChild(done_btn);
     
        display.appendChild(div);
}


