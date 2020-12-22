document.addEventListener('DOMContentLoaded', function () {
    createTeamList();
    document.getElementById("spinnerButton")
        .addEventListener('click', spinWithCurve);
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


const lerp = (x, y, a) => x * (1 - a) + y * a;
async function spinWithCurve() {

    MIDIjs.play('https://www.midiworld.com/download/2932');
    var minSleep = 100;
    var maxSleep = 650;
    var numSpinValues = 25;
    for (var i = 0; i < numSpinValues; i++) {
        selectRandomMember();
        await sleep(lerp(minSleep,maxSleep,(i*i)/(numSpinValues*numSpinValues)));
    }
    MIDIjs.stop();
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
