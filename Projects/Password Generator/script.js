const lengthDisplay=document.querySelector(".lengthDisplay");
const slider=document.querySelector(".slider");
let passwordLength=10;
function handleSlider(){
    slider.value=passwordLength;
    lengthDisplay.innerHTML=passwordLength;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
handleSlider();
slider.addEventListener("input", ()=>{
    passwordLength=slider.value;
    handleSlider();
});


function getRandom(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateNumbers(){
    return getRandom(0, 9);
}

function generateUpper(){
    return String.fromCharCode(getRandom(65,91));
}

function generateLower(){
    return String.fromCharCode(getRandom(97,123));
}

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateSymbols(){
    const randNum = getRandom(0, symbols.length);
    return symbols.charAt(randNum);
}


const upperCheck = document.querySelector("#upper");
const lowerCheck = document.querySelector("#lower");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

upperCheck.checked=true;
let checkCount=1;
function checkBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    //special case
    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change", checkBoxChange);
});

// Generate Password
const passwordDisplay=document.querySelector(".passwordDisplay");
const generateButton=document.querySelector(".generateButton");

function generatePassword(){
    let funcArr=[];
    let password="";
    if(checkCount==0){
        passwordDisplay.value="";
        return;
    }
    if(upperCheck.checked){
        funcArr.push(generateUpper);
    }
    if(lowerCheck.checked){
        funcArr.push(generateLower);
    }
    if(numbersCheck.checked){
        funcArr.push(generateNumbers);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbols);
    }
    
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex=getRandom(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    passwordDisplay.value = shufflePassword(Array.from(password));

    calcStrength();
}
generateButton.addEventListener("click", generatePassword);

// Shuffle Password

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// Copy Password

const copyBtn= document.querySelector(".copyButton");
const copyMsg= document.querySelector(".copyMsg");
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active")

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },1000);
}

copyBtn.addEventListener("click", ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

// Strength
const indicator=document.querySelector(".indicator");
const display=document.querySelector(".display");
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCheck.checked) hasUpper = true;
    if (lowerCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    display.style.borderBottomColor=color;
}
