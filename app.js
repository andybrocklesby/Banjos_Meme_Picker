import { boxerData } from './data.js'

const locationToAppendRadio = document.getElementById('emotions-display')
const getImageBtn = document.getElementById('get-image-btn')
const isGifCheckbox = document.getElementById('is-gif-checkbox')
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('modal-close-btn')
const locationToAppendImage = document.getElementById('image-container')
const emotionRadios = document.getElementById('emotions-display')

emotionRadios.addEventListener('change', function(e){
    const radiosArray = document.getElementsByClassName('radio')

    for(let radio of radiosArray){
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
})


getImageBtn.addEventListener('click', renderImageInModal)
closeModalBtn.addEventListener('click', function(){
    modal.style.display = 'none';
})

function getEmotionsArray(boxers){

    let emotionArray = []

    for(let boxer of boxers){
        for(let emotion of boxer.emotionTags){
            if(!emotionArray.includes(emotion)){
                emotionArray.push(emotion);

            }
        }
    }

    return emotionArray

}

function getSelectedEmotionsArray(){

    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
    const isGif = isGifCheckbox.checked;

    const selectedEmotionArray = boxerData.filter(function(boxer){
        if(isGif){
            return boxer.emotionTags.includes(selectedEmotion) && boxer.isGif
        }
        else{
            return boxer.emotionTags.includes(selectedEmotion)
        }
    })
    return selectedEmotionArray
}

function getSingleEmotionForRender(){
    
    const matchingArray = getSelectedEmotionsArray(boxerData);
    let randomBoxer = Math.floor(Math.random() * matchingArray.length);

    return matchingArray[randomBoxer];
}

function renderImageInModal(){

    if(document.querySelector('input[type="radio"]:checked')){
        const boxer = getSingleEmotionForRender(boxerData)

        modal.style.display = 'block'

        locationToAppendImage.innerHTML = `
            <img
                class="rendered-image"
                src="./images/${boxer.image}"
                alt="${boxer.alt}">
        `
    }

}

function renderEmotionRadios(){

    const emotionArray = getEmotionsArray(boxerData);
    let newEmotionRadio = ''

    for(let emotion of emotionArray){
        newEmotionRadio += `
            <div class="radio flex-row">
            <label class="emotion-label" for="${emotion}">${emotion}</label>
            <input 
                class="emotion-radio"
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotion">
            </div> 
        `
    }

    locationToAppendRadio.innerHTML = newEmotionRadio

}

renderEmotionRadios()