let infos =  document.querySelectorAll('.info');

function showLevels(){

    let achivements = {
        novice: [1000,"hey congrats you've reached the novice level"],
        beginner: [5000, "Congratulations you are a beginner"],
        middle :[10000, "Keep it up you are in middle level"],
        master: [50000,"Such a cool guy. You are a master"],
        international_master : [100000,"Woow people all around the world now know your name and skills."],
        legend: [1000000, "You know what! You are a billionare and live legend!!!"],
    }
    levels = ['novice','beginner','middle','master','international_master','legend']

    for (let i=0;i<infos.length-1;i++){
        if (localStorage.getItem('paperclips')>achivements[levels[i]][0] && localStorage.getItem('paperclips')< achivements[levels[i+1]][0]){
            for (let k=0;k<infos.length;k++){
                if (infos[k].classList[1] == "last"){
                    infos[k].innerHTML = "> "+achivements[levels[i]][1];
                }
            }
            
        }
    }

    setTimeout(showLevels,3000);
}
showLevels();