async function getCountryInfo() {
    const countryName = document.getElementById('countryName').value;
    const countryInfo = document.getElementById('countryInfo');
    const neighbouringCountries = document.getElementById('neighbouringCountries');

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) throw new Error('Country not found or API request failed. Please try again!');

        const [data] = await response.json();

        if (data.name.common === 'Israel') throw new Error('Country not found. Please try again!');

        countryInfo.innerHTML = `
            <h2 style="font-weight: bold;">${data.name.common}</h2>
            <p>Capital: ${data.capital}</p>
            <p>Population: ${data.population}</p>
            <p>Region: ${data.region}</p>
            <img src="${data.flags.svg}" alt="${data.name.common} Flag" width="250px"/>
        `;
        
        countryInfo.style.fontFamily = 'Arial, sans-serif';
        neighbouringCountries.style.fontFamily = 'Arial, sans-serif';
        

        neighbouringCountries.innerHTML = '<h2 style="font-weight: bold;">Bordering Countries</h2>';
        
        for (const border of data.borders) {
            const neighbourResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const [neighbourData] = await neighbourResponse.json();
            if (neighbourData.name.common === 'Israel') continue;
            
            neighbouringCountries.innerHTML += `
                <section style="display: flex; justify-content: space-between;">
                <p>${neighbourData.name.common} </p>
                <img src="${neighbourData.flags.svg}" alt="${neighbourData.name.common} Flag" width="50px"/>
                </section>
            `;
        }

        // Reset the input box
        document.getElementById('countryName').value = '';
        
    } catch (error) {
        alert(error.message);
    }
}
