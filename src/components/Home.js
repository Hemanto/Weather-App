import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import gif from '../weather_dribbble_size.gif.gif'


const Home = () => {
    const URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API = '4e8c3801b28b71e7875c5f4e757ff952'

    const [Coords, setCords] = useState({})
    const [City, setCity] = useState('')

    const fetchgeolocation = async (lat, lon) => {
        const { data } = await Axios.get(URL, {
            params: {
                lat: lat,
                lon: lon,
                units: 'metric',
                APPID: API,
            }
        })
        return data
    }

    const fetchbysearch = async(city)=>{
        const{data}= await Axios.get(URL,{
            params:{
                q:city,
                units:'metric',
                APPID:API,
            }
        })
        return data
    }

    const search = async () => {
        // const data = 
        await fetchbysearch(City)
         .then((data) => {
            setCords(data);
            setCity('');
          })
          .catch((err) => {
            alert(err.message);
            console.error(err.message);
          });
      }

    useEffect(() => {
        if (window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (p) => {
                    const lat = p.coords.latitude
                    const lon = p.coords.longitude
                    const data = await fetchgeolocation(lat, lon)
                    setCords(data)

                }
            )

        }
    }, [])

    return (
        <div className='background-image'>
            <input onChange={(e)=>{setCity(e.target.value)}} placeholder="Enter City Name" value={City} />
            <button onClick={search} >Search</button>
            {Coords.main ? <div>
                <h1>
                    <span>{Coords.name}</span>
                    <sup>{Coords.sys.country}</sup>
                </h1>
                <p>
                   Temp: {Math.round( Coords.main.temp)}
                   <sup>&deg;C</sup>
                </p>
                <img
                        className="city-icon"
                        src={`https://openweathermap.org/img/wn/${Coords.weather[0].icon}@2x.png`}
                        alt={Coords.weather[0].description}
                    />
                <p>
                    Description: {Coords.weather[0].description}
                </p>
                </div> : <div>
                    <h1>Loading...</h1>
                    <img src={gif} alt="logo" width="200" />
                </div>}

        </div>
    )
}

export default Home
