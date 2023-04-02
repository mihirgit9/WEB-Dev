const theme = document.querySelector(".theme");
const themeName = document.querySelector(".themeName");
const themeImg = document.querySelector(".themeImg");
const input = document.querySelector(".input");
const inputBtn = document.querySelector(".inputBtn");
const heroImg = document.querySelector(".heroImg");
const heroName = document.querySelector(".heroName");
const heroJoin = document.querySelector(".heroJoin");
const gitID = document.querySelector(".gitID");
const gitBio = document.querySelector(".gitBio");
const repos = document.querySelector(".repos");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const address = document.querySelector(".address");
const website = document.querySelector(".website");
const twitter =  document.querySelector(".twitter");
const job = document.querySelector(".job");
const notFound = document.querySelector(".notFound");

let themeNameDiaplay;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function appInit(){
    themeNameDiaplay="Light";
    themeName.innerHTML=themeNameDiaplay;
    themeImg.src="./images/sun-icon.svg";
    fetchGitInfo("mihirgit9");
}
appInit();

theme.addEventListener("click", switchTheme);
function switchTheme(){
    if(themeNameDiaplay=="Light"){
        lightTheme();
    }
    else{
        darkTheme();
    }
}

const title = document.querySelector(".title");
const wrapper = document.querySelector(".wrapper")
const searchID = document.querySelector(".searchID");
const hero = document.querySelector(".hero");
const details = document.querySelector(".details");
const detailName = document.querySelectorAll(".detailName");
const detail = document.querySelectorAll(".detail");
const contact = document.querySelectorAll(".contact");

function lightTheme(){
    themeNameDiaplay="Dark";
    themeName.innerHTML=themeNameDiaplay;
    themeImg.src="./images/moon-icon.svg";
    wrapper.classList.add("wrapperLight");
    title.classList.add("titleLight");
    themeName.classList.add("themeNameLight");
    searchID.classList.add("searchIDLight");
    input.classList.add("inputLight");
    hero.classList.add("heroLight");
    heroName.classList.add("heroNameLight");
    heroJoin.classList.add("heroJoinLight");
    gitBio.classList.add("gitBioLight");
    details.classList.add("detailsLight");

    detailName.forEach((box)=>{
        box.classList.add("detailNameLight");
    });

    detail.forEach((box)=>{
        box.classList.add("detailLight");
    });

    contact.forEach((box)=>{
        box.classList.add("contactLight");
    })
}

function darkTheme(){
    themeNameDiaplay="Light";
    themeName.innerHTML=themeNameDiaplay;
    themeImg.src="./images/sun-icon.svg";
    wrapper.classList.remove("wrapperLight");
    title.classList.remove("titleLight");
    themeName.classList.remove("themeNameLight");
    searchID.classList.remove("searchIDLight");
    input.classList.remove("inputLight");
    hero.classList.remove("heroLight");
    heroName.classList.remove("heroNameLight");
    heroJoin.classList.remove("heroJoinLight");
    gitBio.classList.remove("gitBioLight");
    details.classList.remove("detailsLight");

    detailName.forEach((box)=>{
        box.classList.remove("detailNameLight");
    });

    detail.forEach((box)=>{
        box.classList.remove("detailLight");
    })

    contact.forEach((box)=>{
        box.classList.remove("contactLight");
    })
}

input.addEventListener("click", ()=>{
    notFound.style.display="none";
});

input.addEventListener("keydown", (e)=>{
    if(e.key=="Enter"){
        fetchGitInfo(input.value);
    }
});

inputBtn.addEventListener("click", ()=>{
    if(input.value){
        fetchGitInfo(input.value);
    }
    else{
        alert("Enter a git ID");
    }
});

async function fetchGitInfo(id){
    try{
        const response = await fetch(`https://api.github.com/users/${id}`);
        const data = await response.json();
        renderInfo(data);
    }
    catch(e){
        alert("an error occured");
    }
}

function renderInfo(data){
    if(data?.message!=="Not Found"){
        notFound.style.display="none";
        let month=Number(data?.created_at[5] + data?.created_at[6]);
        let day = Number(data?.created_at[8] + data?.created_at[9]);
        let year =Number(data?.created_at[0] + data?.created_at[1] +data?.created_at[2] + data?.created_at[3]);
        heroImg.src=data?.avatar_url;
        heroName.innerHTML=data?.name;
        heroJoin.innerHTML = `Joined  ${day}  ${months[month-1]}  ${year}`;
        gitID.innerHTML=`@${data?.login}`;
        gitID.href=data?.html_url;
        gitBio.innerHTML=data?.bio;
        repos.innerHTML=data?.public_repos;
        followers.innerHTML=data?.followers;
        following.innerHTML=data?.following;
        //location
        if(data.location){
            address.innerHTML= data?.location;
        }
        else{
            address.innerHTML= "Not Available";
        }
        //website
        if(data.blog){
            website.innerHTML=data?.blog;
        }
        else{
            website.innerHTML="Not Available";
        }
        //twitter
        if(data.twitter_username){
            twitter.innerHTML=data?.twitter_username;
            twitter.href=`https://twitter.com/${data?.twitter_username}`
        }
        else{
            twitter.innerHTML="Not Available";
        }
        //job
        if(data.company){
            job.innerHTML=data?.company;
        }
        else{
            job.innerHTML="Not Available";
        }
    }
    else{
        notFound.style.display="block";
    }
}
