document.addEventListener('DOMContentLoaded', function () {
    createTeamList();
    document.getElementById("spinnerButton")
        .addEventListener('click', spinWithCurve);
    document.getElementById("playMusicButton")
        .addEventListener('click', playMusic);
    document.getElementById("stopMusicButton")
        .addEventListener('click', stopMusic);
});

let team = ["Aria", "Anand", "Chari", "Diego", "Dipika", "Georgin", "Swapna", "Tim", "Tony"];


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

const startFreq = 44;
const endFreq = 880;
const volume = 0.05;
const minSleep = 100;
const maxSleep = 400;
const numSpinValues = 20;
let oscillator;
let gainNode;

const lerp = (x, y, a) => x * (1 - a) + y * a;
async function spinWithCurve() {

    setupAudio();

    for (var i = 0; i < numSpinValues; i++) {
        let interpolation = (i*i)/(numSpinValues*numSpinValues);
        selectRandomMember();
        playNote(interpolation);

        let sleepTime = lerp(minSleep,maxSleep,interpolation);
        await sleep(sleepTime);
    }
    selectRandomMember(true);
    oscillator.stop();
}

function setupAudio() {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = volume;
    oscillator = audioCtx.createOscillator();
    oscillator.type = "square";
    oscillator.connect(gainNode);
    oscillator.start(0);
}

function playNote(interpolation) {
    oscillator.frequency.value = startFreq + interpolation*(endFreq-startFreq);
}

function playMusic() {
    const songFiles = ['ghostbusters', 'finalCountdown', 'aladin', 'VivaLaVida', 'LegendOfZeldaOverworld', 'Numb', 'BeatIt'];
    let index = (Math.round(Math.random() * (songFiles.length - 1)));
    let selectedMidiFile =  'midis/'+songFiles[index]+'.mid';
    console.log("Playing music from MIDI file " + selectedMidiFile);
    MIDIjs.play(selectedMidiFile);

    document.getElementById("songLabel").innerText = "Now playing: " + songFiles[index];
}

function stopMusic() {
    console.log("Stopping music")
    MIDIjs.stop();
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

    if (isFinalSelection) {
        console.log("Selected member " + memberText);
    }
    document.getElementById("selectedPerson").innerText = isFinalSelection ? memberText + "!!!" : memberText
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
