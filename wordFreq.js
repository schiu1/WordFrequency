document.getElementById('calcButton').addEventListener('click', WordFrequency);

function WordFrequency(){
    const text = document.getElementById('inputText').value.toLowerCase();
    const noPunc = text.replace(/[\,\.\!\?]/g,""); //regex means any characters that are , . ! or ?
    const words = noPunc.split(" ");
    const wordMap = new Map();
    for(const word of words){
        let keys = [...wordMap.keys()];
        if(keys.includes(word)){
            wordMap.set(word, wordMap.get(word) + 1);
        }
        else {
            wordMap.set(word, 1);
        }
    }
    console.log(wordMap);


}