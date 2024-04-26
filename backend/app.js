require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to youtube mp3 converter!");
});

app.post("/convert", async (req, res) => {
  const videoID = req.body.videoID;
  if (videoID == "") {
    res.status(400).send("Please enter a video URL");
  } else {
    const fetchingData = await fetch(
      `https://youtube-mp315.p.rapidapi.com/?url=${videoID}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": process.env.API_HOST,
        },
      }
    );

    await fetchingData.json().then((response) => {
      const data = response.result[0];
      if (data.url == null) {
        res.status(400).send("Invalid link");
      } else {
        res.status(200).send(data);
      }
    });
  }
});
