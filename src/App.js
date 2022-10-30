import './App.css';
import {useEffect, useState} from "react";
import {BsWhatsapp} from "react-icons/bs";
import {BiSend} from  "react-icons/bi";
import CountryCodeSelector from "./CountryCodeSelector";


// 192.168.1.47:3000

const App =() => {
    const [number, setNumber] = useState();
    const [countryCode, setcountryCode] = useState();
    const [userCode, setuserCode] = useState('')
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

    const getCountry = () => {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://api.ipdata.co/?api-key=5b03f9f4c02157ead3b935da191ec96621b9082184067a09b62deb8e');
        request.setRequestHeader('Accept', 'application/json');
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                let data = JSON.parse(this.responseText)
                setuserCode(data.calling_code)
                setcountryCode(data.calling_code)
            }
        };
        request.send();
    }

    useEffect(()=> {
        getCountry()
    }, [])


    return (
      <div className='App'>
          <div className='titleDiv'>
            <h1 className='titleBar'>Whatsapp.Me <BsWhatsapp className={'whatsapp-logo'}/> </h1>
          </div>
          <h2 className='Instructions'>Enter phone number to open a conversation</h2>
          <div>
              <div className={'phone-input'}>
                  <CountryCodeSelector getCountryCode={getCountryCode} default_code={userCode}/>
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
