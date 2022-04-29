//Async function to fetch the weather information
const callOpenWeather = async (url) => {
    try {
        let callJson = await fetch(url, {mode: 'cors',});
        let loadJson = await callJson.json();
        console.log(loadJson);
        
        // If the place name is not valid, OpenWeather API provides
        // message. This is how invalid place name is detected here.
        if (loadJson.message) {
            return "Type a valid place name!";
        } else {
            return loadJson.main.feels_like;
        }
    
    } catch(error) {
        return error;
    }
}

// DOM function to get the data from input and
// use checkWeather function to get the data displayed.
const displayWeather = () => {
    
    // DOM elements for the submit button, input field 
    // and the output box.
    const submitButton = document.getElementById('button');
    const inputValue = document.getElementById('search');
    const infoBox = document.getElementById('info-box');

    // Eventlistener's click event callback is an async function
    // so that you don't have to wrap a separate async function 
    // around the else part.
    submitButton.addEventListener('click', async () => {
        
        // If part checks for missing value.
        // Else part calls OpenWeather API
        if(inputValue.validity.valueMissing) {
        
            inputValue.setCustomValidity('Please type a valid place to search for!');
            inputValue.style.borderRadius = '3px';
            inputValue.style.boxShadow = '0 0 0 2px red';
        
        } else {
                
            // infoBox.style.display = 'grid';
            let temperature = parseInt(await callOpenWeather(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&APPID=${apiKey}&units=metric`));
            infoBox.innerText = temperature + '°C';

            if (temperature <= 15 ) {
                infoBox.style.backgroundColor = 'aliceblue';
                infoBox.style.color = 'black';
            } else if(temperature > 15 && temperature <= 25 ) {
                infoBox.style.backgroundColor = '#FF7276';
                infoBox.style.color = 'whitesmoke';
            }  else if(temperature > 25) {
                infoBox.style.backgroundColor = '#ed1d24';
                infoBox.style.color = 'whitesmoke';
            } else {
                infoBox.style.backgroundColor = 'whitesmoke';
                infoBox.innerText = 'Something went wrong!';
                infoBox.style.color = 'black';
                console.log('Something went wrong!')
            }
        }
    });
}

displayWeather();
