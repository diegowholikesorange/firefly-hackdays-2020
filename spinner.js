document.addEventListener('DOMContentLoaded', function () {
    createTeamList();
    document.getElementById("spinnerButton")
        .addEventListener('click', spin);
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

async function spin() {
    for (var i = 0; i < 20; i++) {
        selectRandomMember();
        await sleep(100);
    }

    selectRandomMember();
    await sleep(300);

    selectRandomMember();
    await sleep(300);

    selectRandomMember();
    await sleep(300);

    selectRandomMember();
    await sleep(400);

    selectRandomMember();
    await sleep(500);

    selectRandomMember();
    await sleep(650);

    selectRandomMember(true);
}

function selectRandomMember(isFinalSelection) {
    let teamMemberList = []

    team.forEach((teamMember) => {
        let inputElement = document.getElementById(`${teamMember}-checkbox`);
        if (inputElement.checked) {
            teamMemberList.push(teamMember);
        }
    });

    let index = (Math.round(Math.random() * (teamMemberList.length - 1)));
    let memberText = teamMemberList[index];
    document.getElementById("selectedPerson").innerText = isFinalSelection ? memberText + "!!!" : memberText
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
