import './App.css';
import {useEffect, useState} from "react";
import {BsWhatsapp} from "react-icons/bs";
import {BiSend} from  "react-icons/bi";
import CountryCodeSelector from "./CountryCodeSelector";


// 192.168.1.47:3000

const App =() => {
    const [number, setNumber] = useState();
    const [countryCode, setcountryCode] = useState();
    const whatsapp_url = 'https://wa.me/';
    const startClicked = () => {
        let newPageUrl = `${whatsapp_url}+${countryCode}${number}`
        window.open(newPageUrl, "_blank")
    };

    const handleInput = (event) => {
        setNumber(event.target.value)
    };

    const getCountryCode = (data) => {
        setcountryCode(data)
    };

    useEffect(() => {
        if (countryCode === undefined) {
            return
        }
    }, [countryCode])

    return (
      <div className='App'>
          <div className='titleDiv'>
            <h1 className='titleBar'>Whatsapp.Me <BsWhatsapp className={'whatsapp-logo'}/> </h1>
          </div>
          <h2 className='Instructions'>Enter phone number to open a conversation</h2>
          <div>
              <div className={'phone-input'}>
                  <CountryCodeSelector getCountryCode={getCountryCode}/>
                  <input
                      placeholder='Enter phone number'
                      value={number} onChange={handleInput}
                      type={'tel'}/>
              </div>
              <button onClick={startClicked}>
                  Start conversation <BiSend className='send-icon'/>
              </button>


          </div>


      </div>
  );
}

export default App;
