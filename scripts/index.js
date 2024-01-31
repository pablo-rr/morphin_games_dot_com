let gameSwitching = false;
let activeGame = 0;
let projects = ["scale-tale", "nightmare-run", "glass-jungle"];

function projectClicked(project) {
    for(let i = 0; i < projects.length; i++){
        if(projects[i] == project) {
            document.getElementById(projects[activeGame]).classList.toggle("game-showing");
            document.getElementById(projects[activeGame]).classList.toggle("game-hidden");
            document.getElementById(project).classList.toggle("game-showing");
            document.getElementById(project).classList.toggle("game-hidden");
            activeGame = projects.indexOf(project);
            return;
        }
    }
}

function projectsClicked() {
    // document.getElementById("main-menu-projects").classList.toggle("main-menu-projects-hidden");
    // document.getElementById("main-menu-projects").classList.toggle("main-menu-projects-show");
    document.getElementById("main-menu-projects").classList.toggle("collapsed");
}

window.onload = () => {
    addEventListener("wheel", (ev) => {
        document.getElementById(projects[activeGame]).classList.toggle("game-showing");
        document.getElementById(projects[activeGame]).classList.toggle("game-hidden");

        if(ev.deltaY > 0){
            activeGame += 1;
            if(activeGame >= projects.length){
                activeGame = 0;
            }
        } else {
            activeGame -= 1;
            if(activeGame < 0){
                activeGame = projects.length - 1;
            }
        }

        document.getElementById(projects[activeGame]).classList.toggle("game-showing");
        document.getElementById(projects[activeGame]).classList.toggle("game-hidden");      
    })
}