let gameSwitchingLocked = false;
let activeProject = 0;
let projects = ["scale-tale", "nightmare-run", "glass-jungle"];

function projectClicked(project) {
    if(gameSwitchingLocked) { return; }
    for(let i = 0; i < projects.length; i++){
        if(projects[i] == project && activeProject != i) {
            gameSwitchingLocked = true;
            document.getElementById("dark-screen").classList.toggle("dark-bg");
            document.getElementById("dark-screen").classList.toggle("black-bg");
            document.getElementById(projects[activeProject]).classList.toggle("game-showing");
            document.getElementById(projects[activeProject]).classList.toggle("game-hidden");
            document.getElementById(project).classList.toggle("game-showing");
            document.getElementById(project).classList.toggle("game-hidden");
            activeProject = projects.indexOf(project);
            return;
        }
    }
}

function projectsClicked() {
    /*
    let ddown = document.getElementById("projects-dropdown").textContent.split(" ");
    console.log(ddown);
    if(ddown[1] == "➕"){
        document.getElementById("projects-dropdown").textContent = ddown[0] + " ➖";
    } else {
        document.getElementById("projects-dropdown").textContent = ddown[0] + " ➕";
    }
    */

    for(let i = 0; i < document.getElementById("main-menu-projects").children.length; i++){
        document.getElementById("main-menu-projects").children[i].classList.toggle("main-menu-project-uncollapsed")
        document.getElementById("main-menu-projects").children[i].classList.toggle("main-menu-project-collapsed")
    }
}

window.onload = () => {
    if(window.location.href.split("#").length > 1){
        let projectTarget = window.location.href.split("#")[1].replace("_", "-");
        projectClicked(projectTarget);
    }

    addEventListener("wheel", (ev) => {
        if(gameSwitchingLocked) { return; }

        gameSwitchingLocked = true;
        document.getElementById(projects[activeProject]).classList.toggle("game-showing");
        document.getElementById(projects[activeProject]).classList.toggle("game-hidden");

        document.getElementById("dark-screen").classList.toggle("dark-bg");
        document.getElementById("dark-screen").classList.toggle("black-bg");

        if(ev.deltaY > 0){
            activeProject += 1;
            if(activeProject >= projects.length){
                activeProject = 0;
            }
        } else {
            activeProject -= 1;
            if(activeProject < 0){
                activeProject = projects.length - 1;
            }
        }

        document.getElementById(projects[activeProject]).classList.toggle("game-showing");
        document.getElementById(projects[activeProject]).classList.toggle("game-hidden");      
    });

    addEventListener("transitionend", (ev) => {
        if(ev.target.classList.contains("game-showing")){
            gameSwitchingLocked = false;
        } else if(ev.target.classList.contains("black-bg")){
            document.getElementById("dark-screen").classList.toggle("dark-bg");
            document.getElementById("dark-screen").classList.toggle("black-bg");
            document.getElementById("video-source").src = '../videos/' + projects[activeProject] + '.mp4'
            document.getElementById("background-video").load();
            document.getElementById("background-video").play();
        }
    })
}