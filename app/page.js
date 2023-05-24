'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Weather from '@/component/weather';
import Spinner from '@/component/Spinner';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const API_endpoint = `http://api.openweathermap.org/geo/1.0/reverse?`;

  const fetchWeather = (url) => {
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      setLoading(false);
    });
  };

  const fetchWeatherData = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    fetchWeather(url);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    fetchWeather(url);
    setCity('');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        () => {
          setLocationEnabled(false);
        }
      );
    } else {
      setLocationEnabled(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {/* Overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 z-[1]' />

        {/* Background Image */}
        <Image
          src='https://images.unsplash.com/photo-1517495306984-f84210f9daa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
          fill='layout'
          className='object-fit'
        />

        {/* Search */}
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto  pt-4 text-white z-10'>
          <form
            onSubmit={handleSearch}
            className='flex justify-between items-center w-full m-auto  p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
          >
            <div>
              <input
                className='bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-white'
                onChange={(e) => setCity(e.target.value)}
                type='text'
                placeholder='Search City'
              />
            </div>
            <button type='submit'>
              <BsSearch size={20} />
            </button>

          </form>
        </div>

        {/* Weather */}
        {weather.main ? (
          <Weather data={weather} />
        ) : (
          !locationEnabled && <p>Sorry, we couldn't find your location. Have you enabled location services?</p>
        )}
      </div>
    );
  }
}

