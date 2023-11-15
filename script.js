let password="";
let password_length=10;

const length_indicator=document.querySelector("[length-indicator]");
const slider=document.querySelector("#length-slider");

function handle_slider()
{
    length_indicator.textContent=password_length;
    slider.value=password_length;
    // const min=slider.min;
    // const max=slider.max;
    // slider.style.backgroundSize=((password_length-min)*100/(max-min))+"% 100%";
}

handle_slider();

slider.addEventListener('input',(e)=>{
    password_length=e.target.value;
    length_indicator.textContent=password_length;
    // handle_slider();
});


const alltick=document.querySelectorAll("input[type=checkbox]");

let check_count=0;

function handlecheckboxchange()
{
    check_count=0;
    alltick.forEach((checkbox)=>{
        if(checkbox.checked)
        check_count++;
    });

    //boundry case
    if(password_length<check_count)
    {
        password_length=check_count;
        handle_slider();
    }
}

alltick.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
});

//copymessage

const copy_msg=document.querySelector("[copy-msg]");
const password_display=document.querySelector("#password-display");

async function copy()
{
    try
    {
        await navigator.clipboard.writeText(password_display.value);
         copy_msg.textContent='Copied';
    }
    catch(e){
        copy_msg.textContent='Failed';
    }

    copy_msg.classList.add("active");

    setTimeout(() => {
        copy_msg.classList.remove("active");
    }, 2000);
  
    
}

//copy-button
const copy_btn=document.querySelector("[copy-btn]");

copy_btn.addEventListener('click',()=>{
    if(password_display.value)
    copy();
});


//Generating Random Characters

function genRndNum(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}

function genNumber(){
    return genRndNum(0,10);
}

function genUppercase(){
    return String.fromCharCode(genRndNum(65,91));
}

function genLowercase(){
    return String.fromCharCode(genRndNum(97,123));
}

const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function genSymbol(){
    return symbol.charAt(genRndNum(0,symbol.length));
}

//strength indicator section
const strength_color=document.querySelector("[strength-color]");

// Strength Color Based on Password 
let indicator = document.querySelector('.indicator');

// Set Indicator 
function strengthColor(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

strengthColor("#ccc");

const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const numbers=document.querySelector("#numbers");
const symbols=document.querySelector("#symbols");

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && password_length >= 8) {
        strengthColor("#0f0");
    } 
    else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        password_length >= 6
    )
     {
        strengthColor("#ff0");
    } 
    else {
        strengthColor("#f00");
    }
}


//Generate password section

function shuffle(array) {
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

function genPass(){
    if(check_count<=0)
    return;

    if(password_length<check_count)
    {
        password_length=check_count;
        handle_slider();
    }
    password="";
    let funcArr=[];

    if(uppercase.checked)
        funcArr.push(genUppercase);
    if(lowercase.checked)
        funcArr.push(genLowercase);
    if(numbers.checked)
        funcArr.push(genNumber);
    if(symbols.checked)
        funcArr.push(genSymbol);

   for (let index = 0; index < check_count; index++) {
      password+=funcArr[index]();
    
   }
    // console.log(password)
    for(let i=0;i<password_length-check_count;i++)
    {
        password+=funcArr[genRndNum(0,funcArr.length)]();
    }


    password = shuffle(Array.from(password));
    password_display.value=password;
    calcStrength();

}

const gen_pass=document.querySelector("[generate-password");

gen_pass.addEventListener('click',genPass);




