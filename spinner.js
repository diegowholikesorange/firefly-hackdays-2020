document.addEventListener('DOMContentLoaded', function () {
    createTeamList();
    document.getElementById("spinnerButton")
        .addEventListener('click', selectRandomMember);
});

let team = ["Aria", "Anand", "Diego", "Dipika", "Georgin", "Tim", "Tony"];


function createTeamList() {
    let teamList =  document.getElementById("team-list");
    team.forEach((teamMember) => {
        let li = document.createElement('li');

        li.innerHTML = `<label>\n` +
            `<input type=\"checkbox\" id="${teamMember}-checkbox" checked>\n` +
            `${teamMember}\n` +
            `</label>`;

        teamList.appendChild(li);
    })
}

function selectRandomMember() {
    let teamMemberList = []

    team.forEach((teamMember) => {
        let inputElement = document.getElementById(`${teamMember}-checkbox`);
        if (inputElement.checked) {
            teamMemberList.push(teamMember);
        }
    });

    let index = (Math.round(Math.random() * (teamMemberList.length - 1)));
    document.getElementById("selectedPerson").innerText = teamMemberList[index]
}
