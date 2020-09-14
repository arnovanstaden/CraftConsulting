// ----------------------------------------
// PROJECTS

// Load All Projects

const loadAllProjects = () => {
    axios({
            method: "get",
            url: "../../assets/js/projects.json"
        })
        .then(result => {
            projects = result.data;

            projects.forEach(project => {
                let projectGrid = project.type.toLowerCase().replace(" ", "-") + "-grid";
                let projectLocation = project.location;
                projectLocation = projectLocation.substring(projectLocation.indexOf(", ") + 2);
                $(`#${projectGrid}`).append(`
                    <div class="project" style="background-image: url('./assets/images/projects/${project.type}/${project.name}/${project.name} (1).jpg');">
                        <a class="project-inner" href="./projects.html#${project.name}">
                            <h3>${project.name}</h3>
                            <div class="divider-line"></div>
                            <p> <i class="material-icons">room</i>
                                ${projectLocation}</p>
                        </a>
                    </div>
                `)
            })
        })
        .catch(err => {
            console.log(err)
        })
}

loadAllProjects();


// Project Modal
let currentHash = window.location.hash;

const closeProjectModal = () => {
    $(".project-modal").fadeOut(1000)
    $("html, body").removeClass("no-scroll");
    location.hash = ""
}

const loadProject = () => {
    $(".project-modal").fadeIn(1000);
    $("html, body").addClass("no-scroll");

    axios({
            method: "get",
            url: "../../assets/js/projects.json"
        })
        .then(result => {
            projects = result.data;

            currentHash = window.location.hash;
            let projectNameToLoad = currentHash.replace("#", "");
            projectNameToLoad = projectNameToLoad.replace(/%20/g, " ");

            const project = projects.find(project => project.name === projectNameToLoad);

            if (project === undefined) {
                return closeProjectModal()
            }

            // Insert Data
            $(".project-name").html(project.name)
            $(".project-type span").html(project.type)
            $(".project-date span").html(project.date)
            $(".project-location span").html(project.location);

            // Insert Logos
            $(".project-logos").empty();
            project.association.forEach(image => {
                $(".project-logos").append(
                    `
                    <img src="./assets/images/project-logos/${image}.png" alt="${image}" title="${image}">
                    `
                )
            })

            // Insert Project Images
            $(".project-modal .project-images-grid").empty();

            for (let i = 1; i <= project.images; i++) {
                $(".project-modal .project-images-grid").append(`
                <div class="project-image">
                <img src='./assets/images/projects/${project.type}/${project.name}/${project.name} (${i}).jpg'>  
                </div>
                `)
            }

            // Insert Project Construction Images
            $(".project-modal .project-images-construction-grid").empty();
            if (project.construction) {
                $(".project-modal .project-images-construction").show();

                for (let i = 1; i <= project.construction; i++) {
                    $(".project-modal .project-images-construction-grid").append(`
                    <div class="project-image">
                    <img src='./assets/images/projects/${project.type}/${project.name}/Construction/${project.name} (${i}).jpg'>  
                    </div>
                    `)
                }

            } else {
                $(".project-modal .project-images-construction").hide()
            }

        })
        .catch(err => {
            console.log(err)
        })
}

if (currentHash !== "") {
    console.log(true)
    loadProject()
}

$(document).on("click", ".project-grid .project-inner", () => {
    loadProject();
})


$(window).on("hashchange", () => {
    currentHash = window.location.hash;
    if (currentHash !== "") {
        loadProject()
    }
})


// Project Image Modal

$(document).on("click", ".project-images .project-image img", function () {
    let imageUrl = $(this).attr("src")
    console.log(imageUrl)
    $(".project-image-modal").addClass("active");

    // Insert Image
    $(".project-image-modal .image img").attr("src", imageUrl)
});

const closeProjectImageModal = () => {
    $(".project-image-modal").removeClass("active");
}