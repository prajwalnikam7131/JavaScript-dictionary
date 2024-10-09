const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', () => {
    const input = document.getElementById('input');
    const inputValue = input.value;

    if (input.value == "") {
        alert("There is no word written !");
    } else {
        getword(inputValue);
    }
    // input.value = " "

    async function getword(inputValue) {

        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

        const response = await fetch(url + inputValue);
        const data = await response.json();
        console.log(data[0]);

        const word = document.getElementById('word');
        // word.innerHTML = "<strong>Word &colon;</strong> " + data[0].word;

        try {
            if (data[0].word) {
                word.innerHTML = "<strong>Word &colon;</strong> " + data[0].word;
            }
        } catch (err) {
            alert("Wrong word !");
        }


        // add Event Listener to audio button:
        const audioFile = document.getElementById('audio');
        audioFile.addEventListener('click', () => {

            playAudio(data);

            function playAudio(data) {
                const audioUrl = data[0]?.phonetics[0]?.audio;

                if (audioUrl) {
                    const audio = new Audio(audioUrl);
                    audio.play();
                }
                else {
                    alert(`Audio not found`);
                }

            }
        })


        const partOfSpeech = document.querySelector('.part-of-speech');
        partOfSpeech.innerHTML = "<strong>Part of Speech &colon;</strong> " + data[0].meanings[0].partOfSpeech;


        const meaning = document.querySelector('.meaning');
        meaning.innerHTML = "<strong>Meaning &colon;</strong> " + data[0].meanings[0].definitions[0].definition;

        // add all synonyms(related word) word:
        const synonymsword = document.querySelector('.synonyms-word');
        let synonyms = data[0].meanings[0].synonyms

        let synonymText = "";

        synonyms.forEach(element => {
            synonymText = synonymText + element + ", ";
        });

        // console.log(synonymText);
        synonymsword.innerHTML = "<strong>Synonyms &colon;</strong> " + synonymText.slice(0, -2); // slice(0,-2) --> remove space and comma.


        // add all Antonyms(opposite word) word:
        const antonymsword = document.querySelector('.antonyms-word');

        let antonyms = data[0].meanings[0].antonyms;

        let antonymsText = "";

        antonyms.forEach(element => {
            antonymsText = antonymsText + element + ", ";
        });


        antonymsword.innerHTML = "<strong>Antonyms &colon;</strong> " + antonymsText.slice(0, -2);


        const example = document.querySelector('.example');
        if (data[0].meanings[0].definitions[0].example === undefined) {
            example.innerHTML = "<strong>Example &colon;</strong> " + "Not Found"
        } else {
            example.innerHTML = "<strong>Example &colon;</strong> " + data[0].meanings[0].definitions[0].example
        }


        const readMore = document.querySelector('.read-more');
        readMore.href = data[0].sourceUrls[0];

        let result = document.querySelector('.result');
        result.style.opacity = "1";

    }
})


function darkMode() {

    let faMoon = document.querySelector('.fa-moon');

    faMoon.classList.toggle('dark-mode');

}