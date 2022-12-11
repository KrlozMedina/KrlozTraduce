// https://mymemory.translated.net/

import languages from "./lenguajes.js";

const selectFirst = document.querySelector(".first")
const selectSecond = document.querySelector(".second")
const translate = document.querySelector(".translate")
const fromText = document.querySelector(".fromText")
const toText = document.querySelector(".toText")
const change =  document.getElementById("change")
const reader = document.querySelectorAll(".read")
const listen = document.querySelector(".listen")
const title = document.getElementById('title')
const language1 = "es-ES"
const language2 = "en-GB"

for(const i in languages){
    const key = Object.keys(languages[i]).toString()
    const value = Object.values(languages[i]).toString()
    selectFirst.innerHTML += `<option value=${key}>${value}</option>`
    selectSecond.innerHTML += `<option value=${key}>${value}</option>`
}

selectFirst.value = language1
selectSecond.value = language2

change.addEventListener("click",_=>{
    const selectFirstValue = selectFirst.value
    selectFirst.value = selectSecond.value
    selectSecond.value = selectFirstValue

    if(!toText.value) return
    const fromTextValue = fromText.value
    fromText.value = toText.value
    toText.value = fromTextValue
})

translate.addEventListener("click", _=>{
    console.log(title.textContent)
    if(!fromText.value) return
        fetch(`https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${selectFirst.value}|${selectSecond.value}`)
            .then(res => res.json())
            .then(data => {toText.value = data.responseData.translatedText})
})

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()

reader.forEach((read,index)=>{
    read.addEventListener("click",_=>{
        const textToRead = index == 0 ? fromText.value : toText.value
        if(!textToRead) return
        speechSynthesis.speak(new SpeechSynthesisUtterance(textToRead))
    })
});

recognition.onresult = (event)=>{
    fromText.value = event.results[0][0].transcript
}

listen.addEventListener("click",_=>{
    recognition.start()
})