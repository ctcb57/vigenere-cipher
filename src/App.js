import React, { useState, useEffect } from "react";
import ErrorMessage from "../src/components/ErrorMessage";

import "./App.css";
import "uikit/dist/css/uikit.css";
import "uikit/dist/js/uikit.js";

function App() {
  const [messageInput, setMessageInput] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [encryptedOutput, setEncryptedOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //-- Function which handles the encryption on the button click --//
  const handleEncryption = (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");
    //-- Verify that the inputs of the message and key are the same --//
    if (messageInput.length !== keyInput.length) {
      setIsError(true);
      setErrorMessage("Message length must be the same length as the key.");
    }
    //-- Verify that there is a message input --//
    if (messageInput.length === 0) {
      setIsError(true);
      setErrorMessage("You must enter a message.");
      return;
    }

    //-- Convert the key input into an array of character codes based on UTF-16 codes --//
    let keyInputArray = modifyKeyInput(keyInput);

    //-- Verify the array output of the key character conversion is greater than 0--//
    if (keyInputArray.length === 0) {
      setIsError(true);
      setErrorMessage("You must enter a key.");
      return;
    }

    //--Encrypt the message based upon the outcome of the key array--//
    let encryptedMessage = encrypt(messageInput, keyInputArray);
    setEncryptedOutput(encryptedMessage);
  };

  //-- Function which converts the key input into an array of UTF-16 codes --//
  const modifyKeyInput = (input) => {
    let result = [];
    for (let i = 0; i < input.length; i++) {
      let char = input.charCodeAt(i);
      if (checkIfLetter(char)) {
        result.push((char - 65) % 32);
      }
    }
    return result;
  };

  //-- Function which takes the message input and key array and generates the encrypted output--//
  const encrypt = (input, key) => {
    let result = "";
    for (let i = 0, j = 0; i < input.length; i++) {
      let char = input.charCodeAt(i);
      //-- Check to see if the character is uppercase and if so, convert to code--//
      if (checkIfUppercase(char)) {
        result += String.fromCharCode(
          ((char - 65 + key[j % key.length]) % 26) + 65
        );
        j++;
      }
      //-- Check to see if the character is lowercase and if so, conver to code --//
      else if (checkIfLowercase(char)) {
        result += String.fromCharCode(
          ((char - 97 + key[j % key.length]) % 26) + 97
        );
        j++;
      }
      //-- If message contains special characters or numbers, return an error--//
      else {
        setIsError(true);
        setErrorMessage(
          "Message cannot contain numbers or special characters."
        );
        return;
      }
    }
    return result;
  };

  //-- Helper function to check if the charater is upper or lower case --//
  const checkIfLetter = (character) => {
    return checkIfUppercase(character) || checkIfLowercase(character);
  };

  //-- Helper function to check if the character is uppercase --//
  const checkIfUppercase = (character) => {
    return 65 <= character && character <= 90;
  };

  //-- Helper function to check if the character is lowercase --//
  const checkIfLowercase = (character) => {
    return 97 <= character && character <= 122;
  };

  return (
    <>
      <div className="app-header">
        <h1>Vigenere Cipher</h1>
      </div>
      <div>
        <fieldset className="uk-fieldset uk-margin-left uk-margin-right">
          <form>
            <legend className="uk-legend">Inputs</legend>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder="Message Input"
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </div>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder="Key Input"
                onChange={(e) => setKeyInput(e.target.value)}
              />
            </div>
            <button
              className="uk-button uk-button-primary"
              type="submit"
              onClick={(e) => handleEncryption(e)}
            >
              Encrypt
            </button>
          </form>
        </fieldset>
      </div>
      <div className="uk-margin-top uk-margin-left uk-margin-right">
        <ErrorMessage isError={isError} errorMessage={errorMessage} />
      </div>
      <div className="uk-margin-top uk-margin-left uk-margin-right">
        <legend className="uk-legend">Output: {encryptedOutput}</legend>
      </div>
    </>
  );
}

export default App;
