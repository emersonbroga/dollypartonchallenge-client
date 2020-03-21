import React, { useRef, useState } from "react";
import "./App.css";

const API_URL = `http://localhost:3001/`;

function App() {
  const linkedInInput = useRef(null);
  const facebookInput = useRef(null);
  const instagramInput = useRef(null);
  const tinderInput = useRef(null);

  const [imageUrl, setImageUrl] = useState(null);

  const [inputs] = useState({
    linkedin: linkedInInput,
    facebook: facebookInput,
    instagram: instagramInput,
    tinder: tinderInput,
  });

  const [backgrounds, setBackgrounds] = useState({
    linkedin: null,
    facebook: null,
    instagram: null,
    tinder: null,
  });

  const triggerInputFile = ref => {
    ref.current.click();
  };

  const displayPreview = (e, key) => {
    if (!inputs || !inputs[key]) return;

    const input = inputs[key].current;
    const reader = new FileReader();
    reader.onload = function(e) {
      setBackgrounds({ ...backgrounds, [key]: e.target.result });
    };
    reader.readAsDataURL(input.files[0]);
  };

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("/generate", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        const url = `${API_URL}images/${data.name}`;
        setImageUrl(url);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (imageUrl) {
    return (
      <div className="container">
        <h1>Dolly Parton Challenge</h1>
        <small>#dollypartonchallenge</small>
        <div className="result">
          <img src={imageUrl} alt="#dollypartonchallenge" />
        </div>
        <a
          className="download"
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dolly Parton Challenge</h1>
      <small>#dollypartonchallenge</small>

      <form onSubmit={submitHandler}>
        <div
          className="item linkedin"
          onClick={() => triggerInputFile(inputs.linkedin)}
        >
          {backgrounds.linkedin ? (
            <div
              className="preview"
              style={{ backgroundImage: `url(${backgrounds.linkedin})` }}
            />
          ) : (
            <span>LinkedIn</span>
          )}

          <input
            ref={inputs.linkedin}
            type="file"
            name="linkedin"
            accept=".png,.jpg"
            onChange={e => displayPreview(e, "linkedin")}
          />
        </div>
        <div
          className="item facebook"
          onClick={() => triggerInputFile(inputs.facebook)}
        >
          {backgrounds.facebook ? (
            <div
              className="preview"
              style={{ backgroundImage: `url(${backgrounds.facebook})` }}
            />
          ) : (
            <span>Facebook</span>
          )}
          <input
            ref={inputs.facebook}
            type="file"
            name="facebook"
            accept=".png,.jpg"
            onChange={e => displayPreview(e, "facebook")}
          />
        </div>
        <div
          className="item instagram"
          onClick={() => triggerInputFile(inputs.instagram)}
        >
          {backgrounds.instagram ? (
            <div
              className="preview"
              style={{ backgroundImage: `url(${backgrounds.instagram})` }}
            />
          ) : (
            <span>Instagram</span>
          )}
          <input
            ref={inputs.instagram}
            type="file"
            name="instagram"
            accept=".png,.jpg"
            onChange={e => displayPreview(e, "instagram")}
          />
        </div>
        <div
          className="item tinder"
          onClick={() => triggerInputFile(inputs.tinder)}
        >
          {backgrounds.tinder ? (
            <div
              className="preview"
              style={{ backgroundImage: `url(${backgrounds.tinder})` }}
            />
          ) : (
            <span>Tinder</span>
          )}
          <input
            ref={inputs.tinder}
            type="file"
            name="tinder"
            accept=".png,.jpg"
            onChange={e => displayPreview(e, "tinder")}
          />
        </div>

        <div className="submit">
          <button type="submit">Gerar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
