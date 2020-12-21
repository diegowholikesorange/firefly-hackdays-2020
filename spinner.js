document.addEventListener('DOMContentLoaded', function () {
    console.log('document is ready. I can sleep now');
    document.getElementById("spinnerButton")
        .addEventListener('click', selectRandomMember);
});

function selectRandomMember() {

    var team = ["Aria", "Anand", "Diego", "Dipika", "Georgin", "Tim", "Tony"];

    var index = (Math.round(Math.random() * (team.length - 1)));
    var luckyOne = team[index];
    console.log("Selected " + luckyOne);
    document.getElementById("selectedPerson").value = luckyOne
}
