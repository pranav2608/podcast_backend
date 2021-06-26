const express = require("express")
const axios = require('axios').default
const bodyParser = require("body-parser")
const parseString = require("xml2js").parseString

const router = express.Router()


router.get("/feed",async (req,res,next)=>{
  const url = req.query.url
  const {data} = await axios({
    url,
    method:"get"
  })
  parseString(data, (err,json)=>{
    if(err){
      console.log(err)
      return
    }
    const {rss} = json
    const {channel} = rss
    const payload = channel[0]
    res.json(payload)

  })
})


router.post("/search",async (req,res,next)=>{
  const searchTerm = req.body.title
 
  var options = {
    method: 'GET',
    url: 'https://listennotes.p.rapidapi.com/api/v1/search',
    params: {
      q: `${searchTerm}`,
      sort_by_date: '0',
      offset: '0',
      only_in: 'title',
      type: 'episode',
      safe_mode: '0'
    },
    headers: {
      'x-rapidapi-key': '',
      'x-rapidapi-host': ''
    }
  };
  
  axios.request(options).then(function (response) {
    const results=response.data.results

    const podcasts = results.map(podcast =>{
      return{
        id: podcast.id,
        name: podcast.publisher_original,
        trackName: podcast.title_original,
        icon: podcast.image,
        feed: podcast.audio,
        rss:podcast.rss,
        al: podcast.audio_length

      }
    })
    res.json({podcasts})


  }).catch(function (error) {
    console.error(error);
  });
})



module.exports = router