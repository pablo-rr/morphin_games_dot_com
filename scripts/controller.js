let gameSwitchingLocked = false;
let activeProject = 0;
let projects = ["scale-tale", "nightmare-run", "glass-jungle", "robo-crack"];
let inIndex;

function tr(langTo) {
    let urlSplit = window.location.href.split("/");
    let langFrom = "/" + urlSplit[urlSplit.length - 2] + "/";

    if(langTo == langFrom){ return; }

    let urlEndFrom = urlSplit[urlSplit.length - 1].split(".")[0];
    let trUrl = window.location.href.replace(langFrom, langTo);

    if(urlEndFrom == "team") {
        trUrl = trUrl.replace("team", "equipo");
    } else if(urlEndFrom == "contact") {
        trUrl = trUrl.replace("contact", "contacto");
    } else if(urlEndFrom == "equipo") {
        trUrl = trUrl.replace("equipo", "team");
    } else if(urlEndFrom == "contacto") {
        trUrl = trUrl.replace("contacto", "contact");
    }

    window.open(trUrl, "_self");
}

function projectClicked(project) {
    if(gameSwitchingLocked) { return; }

    if(inIndex) {
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
                if(screen.width <= 1024){
                    closeMenu();
                    projectsClicked();
                }
                return;
            }
        }
    } else {
        window.open("index#" + project.replace("-", "_"), "_self");
    }

}

function nextProject() {
    let proj = activeProject;
    proj += 1;
    if(proj >= projects.length) {
        proj = 0;
    }
    projectClicked(projects[proj]);
}

function previousProject() {
    let proj = activeProject;
    proj -= 1;
    if(proj < 0) {
        proj = projects.length - 1;
    }
    projectClicked(projects[proj]);
}

function projectsClicked() {
    document.getElementById("main-menu-projects").classList.toggle("main-menu-projects-separator")
    for(let i = 0; i < document.getElementById("main-menu-projects").children.length; i++){
        document.getElementById("main-menu-projects").children[i].classList.toggle("main-menu-project-uncollapsed")
        document.getElementById("main-menu-projects").children[i].classList.toggle("main-menu-project-collapsed")
    }
}

function closeMenu() {
    document.getElementById("index-main-menu").style.left = "-100%"
    document.getElementById("index-main-menu").style.right = "100%"
    document.getElementById("sandwich-container").style.left = "0px"
    document.getElementById("sandwich-container").style.right = "0px"
    
}

function openMenu() {
    document.getElementById("index-main-menu").style.left = "0px"
    document.getElementById("index-main-menu").style.right = "0px"
    document.getElementById("sandwich-container").style.left = "100%"
    document.getElementById("sandwich-container").style.right = "-100%"
}

window.onload = () => {
    let split = window.location.href.split("/");
    let href = split[split.length - 1];
    inIndex = href.split(".")[0] == "index" || split[split.length - 1] == "";

    if(!inIndex) { return; }

    if(window.location.href.split("#").length > 1){
        let projectTarget = window.location.href.split("#")[1].replace("_", "-");
        projectClicked(projectTarget);
    }

    addEventListener("wheel", (ev) => {
        if(gameSwitchingLocked || !inIndex) { return; }

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
        if(!inIndex) { return; }

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