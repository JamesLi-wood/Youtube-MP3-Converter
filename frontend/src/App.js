import { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    videoID: "",
  });
  const [invalidForm, setInvalidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [videoData, setVideoData] = useState("");

  const handleChange = (e) => {
    setFormData({
      [e.target.name]: e.target.value,
    });
  };

  const loading = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json().then((data) => {
          setVideoData(data);
        });
        setInvalidForm(false);
      } else {
        await response.text().then((data) => {
          setErrorMessage(data);
        });
        setInvalidForm(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="banner"></div>
      <div className="container">
        <div className="title1">Youtube MP3 Converter</div>
        <div className="title2">Enter video url</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="videoID"
            onChange={handleChange}
            placeholder="Enter url"
          />
          <button className="submit" type="submit">
            Convert
          </button>
        </form>

        <div>
          {invalidForm && <div className="error">{errorMessage}</div>}
          {!invalidForm && videoData && (
            <div className="download-container">
              <img src={videoData.thumbnail} alt="image" />
              <div className="info-wrapper">
                <div>Title: {videoData.title}</div>
                <div>Channel: {videoData.channel}</div>
                <div>Duration: {videoData.duration}</div>
                <a className="download" href={videoData.url}>
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
