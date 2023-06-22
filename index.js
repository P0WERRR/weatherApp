const form = document.querySelector("#search-form")
const input = document.querySelector("#search-term") 
const msg = document.querySelector(".form-msg")
const list = document.querySelector(".cities")

const apiKey = '4d8fb5b93d4af21d66a2948710284366'

 

form.addEventListener('submit', e =>{
    e.preventDefault()
    msg.textContent= ''
    msg.classList.remove ('visible')
    let inputVal = input.value
    
    const listItemArray = Array.from(list.querySelectorAll('.cities li'))
    
    if(listItemArray.length>0){
        const filteredArray = listItemArray.filter(el =>{
            let content = ''
            let cityName = el.querySelector('.city-name').textContent.toLowerCase()
            let cityCountry = el.querySelector('.city-country').textContent.toLowerCase()
            
        if(inputVal.includes(',')){
            if(inputVal.split(',')[1],length > 2){
                inputVal =input.split(',')[0]
                
                content = cityName
            }else{
                content = `${cityName},${cityCountry}`
            }
        }else{
            content = cityName
        } 
        return content== inputVal.toLowerCase() 
        
        
    })
    if(filteredArray.length>0){
        msg.textContent = `You already know the weather for ${filteredArray[0]
            .querySelector('.city-name').textContent} 
            ...otherwise be more specific by providing  the country code as well`;
            msg.classList.add('visible')

            form.reset()
            input.focus()
            
            return
        }
        
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        if(data.cod =='404'){
            throw new Error(`${data.cod},${data.message}`)
        }

        const {main, name, sys, weather} = data

        const icon =`img/weather/${weather[0]['icon']}.svg`

        const li = document.createElement('li')

        const markup = `
        <figure>
            <img src="${icon}" alt="${weather[0]['description']}">
        </figure>
        <div>
            <h2>${Math.round(main.temp)} <sup>°C</sup></h2>
            <p class="city-condition">${weather[0]['description'].toUpperCase()}</p>
            <h3><span class="city-name" >${name}</span><span class ="city-country">${sys.country}</span></h3>
        </div>`
            
        li.innerHTML = markup
        list.appendChild(li)


        
    })
    .catch(()=>{
        msg.textContent = 'Please enter valid country name'
        msg.classList.add('visible')
    })
})