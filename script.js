document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderDevelopers(data.employees);
    })
    .catch(function (error) {
      console.log("Error fetching JSON data:", error);
    });

  function renderDevelopers(employees) {
    var developersContainer = document.getElementById("developers-container");

    developersContainer.innerHTML = "";

    employees.forEach(function (developer) {
      var developerCard = document.createElement("div");
      developerCard.classList.add("developer-card");

      var nameHeading = document.createElement("h2");
      nameHeading.textContent = developer.name || "N/A";
      developerCard.appendChild(nameHeading);

      var designationPara = document.createElement("p");
      designationPara.textContent =
        "Designation: " + (developer.designation || "N/A");
      developerCard.appendChild(designationPara);

      var skillsList = document.createElement("ul");
      skillsList.classList.add("skill-list");

      developer.skills.forEach(function (skill) {
        var skillItem = document.createElement("li");
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
      });

      developerCard.appendChild(skillsList);

      developersContainer.appendChild(developerCard);
    });
  }

  document.getElementById("search-name").addEventListener("keyup", function () {
    var searchValue = this.value.toLowerCase();
    var filterSkills = document.getElementById("filter-skills").value;

    var developers = Array.from(document.querySelectorAll(".developer-card"));

    developers.forEach(function (developer) {
      var name = developer.querySelector("h2").textContent.toLowerCase();
      var skills = Array.from(developer.querySelectorAll(".skill-list li")).map(
        function (skill) {
          return skill.textContent;
        }
      );

      if (
        (name.includes(searchValue) || searchValue === "") &&
        (filterSkills === "" || skills.includes(filterSkills))
      ) {
        developer.style.display = "block";
      } else {
        developer.style.display = "none";
      }
    });
  });

  document
    .getElementById("filter-skills")
    .addEventListener("change", function () {
      var searchValue = document
        .getElementById("search-name")
        .value.toLowerCase();
      var filterSkills = this.value;

      var developers = Array.from(document.querySelectorAll(".developer-card"));

      developers.forEach(function (developer) {
        var name = developer.querySelector("h2").textContent.toLowerCase();
        var skills = Array.from(
          developer.querySelectorAll(".skill-list li")
        ).map(function (skill) {
          return skill.textContent;
        });

        if (
          (name.includes(searchValue) || searchValue === "") &&
          (filterSkills === "" || skills.includes(filterSkills))
        ) {
          developer.style.display = "block";
        } else {
          developer.style.display = "none";
        }
      });
    });
});
