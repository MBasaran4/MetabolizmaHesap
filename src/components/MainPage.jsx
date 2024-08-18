import React, { useState, useEffect } from 'react';
import './MainPage.css'; 
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny} from "react-icons/md";


function MainPage() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState(''); 
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');

  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // URL'deki tema parametresini al ve localStorage'a kaydet
  const getThemeFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    if (theme) {
      localStorage.setItem('theme', theme);
      return theme;
    }
    return localStorage.getItem('theme') || 'light'; // Default tema açık mod
  };

  const [isLightMode, setIsLightMode] = useState(getThemeFromURL() === 'light');

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode);
    document.body.classList.toggle('dark-mode', !isLightMode);
  }, [isLightMode]);

  const handleThemeChange = () => {
    const newTheme = !isLightMode ? 'light' : 'dark';
    setIsLightMode(!isLightMode);
    localStorage.setItem('theme', newTheme);
    
    // URL'i güncelle ve tema parametresini ekle
    const url = new URL(window.location);
    url.searchParams.set('theme', newTheme);
    window.history.replaceState({}, '', url);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  const hesapla = async () => {
    setResult('');
    setLoading(true);

    const ageValue = parseFloat(age);
    if(ageValue <= 0 || ageValue > 150 || isNaN(ageValue)){
      setResult('Lütfen geçerli değerler giriniz');
      setLoading(false);
      return;
    }

    const heiValue = parseFloat(height);
    if(heiValue <= 0 || heiValue > 300 || isNaN(heiValue)){
      setResult('Lütfen geçerli değerler giriniz');
      setLoading(false);
      return;
    }

    const weiValue = parseFloat(weight);
    if(weiValue <= 0 || weiValue > 300 || isNaN(weiValue)){
      setResult('Lütfen geçerli değerler giriniz');
      setLoading(false);
      return;
    } 

    if(gender === 'male'){
      const rsltValue = 66.47 + (13.75 * weiValue) + (5 * heiValue) - (6.76 * ageValue);
      await pause(1000);
      setResult('Günlük minimum ihtiyacınız ' + rsltValue.toFixed(2) + ' kalori');
    } else if(gender === 'female'){
      const rsltValue = 655.1 + (9.563 * weiValue) + (1.85 * heiValue) - (4.68 * ageValue);
      await pause(1000);
      setResult('Günlük minimum ihtiyacınız ' + rsltValue.toFixed(2) + ' kalori');
    } else {
      setResult("Lütfen cinsiyet seçiniz");
    }

    setLoading(false);
  }

  return (
    <div>
      <div className='navBar'>
        <a href="https://hesap-kitap.vercel.app"><h1>Hesap<span className='kitap'>Kitap</span></h1></a>
        <div className='menu'>
          <li>
            <a className='title'>Sağlık</a>
            <div className='nalt'>
              <a href="https://boy-kilo-endeks.vercel.app">Boy Kilo Endeksi Hesap</a>
              <a href="https://metabolizma-hesap.vercel.app">Metobalizma Hızı Hesap</a>
            </div>
          </li>
          <li>
            <a className='title'>Matematik</a>
            <div className='nalt'>
              <a href="">Yakında..</a> 
            </div>
          </li>
        </div>
        <div className="theme-switch">
          <input
            type="checkbox"
            id="theme-checkbox"
            checked={isLightMode}
            onChange={handleThemeChange}
          />
          <label htmlFor="theme-checkbox">
            <div></div>
            <span>
              <MdOutlineWbSunny/>
            </span>
            <span>
              <FaMoon/>
            </span>
          </label>
        </div>
      </div>
      <h1 className='title'>METABOLİZMA HESAPLAMA</h1>
      <form id='mhForm'>
        <div className='gender-selection'>
          <label>
            <input 
              type='radio' 
              name='gender' 
              value='male' 
              checked={gender === 'male'} 
              onChange={handleGenderChange}
              required/>
            Erkek
          </label>
          <label>
            <input 
              type='radio' 
              name='gender' 
              value='female' 
              checked={gender === 'female'} 
              onChange={handleGenderChange}
              required
            />
            Kadın
          </label>
        </div>
        <div className='form'>
          <input 
            className='input' 
            placeholder='Yaşınız' 
            type="number" 
            min='1'
            max='150'
            step="1" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required 
          />
          <span className='input-border'></span>
        </div>
        <div className='form'>
          <input 
            className='input' 
            placeholder='Boy (cm)' 
            type="number" 
            min='1'
            max='300'
            step="1" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            required 
          />
          <span className='input-border'></span>
        </div>
        <div className='form'>
          <input 
            className='input' 
            placeholder='Kilo (kg)' 
            type="number" 
            min='1'
            max='300'
            step="0.1" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            required 
          />
          <span className='input-border'></span>
        </div>
        <button 
          className="button" 
          type="button" 
          onClick={hesapla} 
          disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : ('Hesapla')}
        </button>
      </form>
      {loading && <div className="loader"></div>}
      <div className="sonuc">
        <div id="sonuc">{result}</div>
      </div>
    </div>
  );
}

export default MainPage;
