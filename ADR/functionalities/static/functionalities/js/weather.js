const form = document.querySelector(".top-banner  form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");


form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;

    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //athens,gr
            if (inputVal.includes(",")) {
                //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el.querySelector(".city-name span").textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //athens
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent
                } ...otherwise be more specific by providing the country code as well 😉`;
            form.reset();
            input.focus();
            return;
        }
    }

    // ajax here
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputVal}&aqi=no&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { location, current } = data;
            const { name, country } = location;
            const { temp_c, condition } = current;
            const icon = condition.icon;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
                <h2 class="city-name" data-name="${name},${country}">
                    <span>${name}</span>
                    <sup>${country}</sup>
                </h2>
                <div class="city-temp">${temp_c}<sup>°C</sup></div>
                <figure>
                    <img class="city-icon" src=${icon} alt=${condition.text}>
                    <figcaption>${condition.text}</figcaption>
                </figure>
            `;
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});

