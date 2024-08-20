import React, { useState, useEffect } from 'react';
import './MainPage.css'; 
import Navbar from './Navbar';


function MainPage() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState(''); 
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');

  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      <Navbar/>
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
