//createGarden Form elements
const titleBox = document.getElementById('newTitle');
const descriptionBox = document.getElementById('newDesc');
const shapeBox = document.getElementById('newShape');
const sunLevelBox = document.getElementById('newSun');
const title = titleBox.value;
const description = descriptionBox.value;
const plantChoice = document.querySelectorAll('.plantChoice');
const sunLevel = sunLevelBox.value;
const vegList = document.getElementById('plantBox').value;
const newFormSubmit = document.getElementById('getGarden');

//createGarden measurement collection label elements
const measQuesBox = document.getElementById('measQues');
const squareLabel = document.getElementById('square');
const rectShortSideLabel = document.getElementById('rectShort');
const rectLongSideLabel = document.getElementById('rectLong');
// const circleDiamLabel = document.getElementById('circle');

// for(let i=0; i<plantChoice.length; i++){
//     console.log(plantChoice[i].value)
// }

//createGarden measurement value collection boxes
const len = document.getElementById('len');
const wid = document.getElementById('wid');


const show = (el) => {
    el.style.display = 'inline';
}

const hide = (el) => {
    el.style.display = 'none';
}

//ensures a clear form at the beginning.
const init = () => {
    hide(measQuesBox)
    hide(squareLabel)
    hide(rectShortSideLabel)
    hide(rectLongSideLabel)
    // hide(circleDiamLabel)
    hide(wid)

    titleBox.innerHTML = '';
    descriptionBox.innerHTML = '';
    shapeBox.value = '';
    sunLevelBox.value = '';
}

//shows/hides appropriate boxes to collect bed measurements
const getMeasurements = () =>{
    // if(shapeBox.value==='circle'){
    //     show(measQuesBox)
    //     hide(squareLabel)
    //     hide(rectShortSideLabel)
    //     hide(rectLongSideLabel)
    //     // show(circleDiamLabel)
    //     hide(wid)
    // }
    if(shapeBox.value==='square'){
        show(measQuesBox)
        show(squareLabel)
        hide(rectShortSideLabel)
        hide(rectLongSideLabel)
        // hide(circleDiamLabel)
        hide(wid)
    }
    if(shapeBox.value==='rectangle'){
        show(measQuesBox)
        hide(squareLabel)
        show(rectShortSideLabel)
        show(rectLongSideLabel)
        // hide(circleDiamLabel)
        show(wid)
    }
}

const sendGarden = () => {}

//Goes to view garden output page popped with new garden
const seeGarden = async (title) => {
    const response = await fetch(`/dashboard/gardens/new/${title}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        if (response.ok) {
            console.log(response);
            document.location.replace(`/dashboard/gardens/new/${title}`);
        } else {
        alert(response.statusText);
        }
}


//Posts the garden obj and sqitches to the garden output page
const saveGarden = async (obj) => {
    const response = await fetch(`/api/garden`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
  });
  if (response.ok) {
      console.log(obj);
      seeGarden(obj.title);
          } else {
        
            alert('Something went wrong!');
          }
}

//builds the garden obj
const buildNewGarden= (e) => {
    e.preventDefault();
    const plantArr = [];
    plantChoice.forEach(plant => {
        if(plant.checked===true){
            plantArr.push(plant.value)
        }
    });
    console.log(plantArr);
    const newGarden = {
        title: titleBox.value,
        description: descriptionBox.value,
        shape: shapeBox.value,
        length: len.value,
        width: wid.value,
        sunLevel: sunLevelBox.value,
        plantIds: plantArr
    }
    console.log(newGarden)
    saveGarden(newGarden);
}

//measurement collection boxes will appear once the user has chosen a shape
shapeBox.addEventListener('change', getMeasurements)

//initiates obj build after form submission
document.querySelector('#newGarden').addEventListener('submit', buildNewGarden);

init();