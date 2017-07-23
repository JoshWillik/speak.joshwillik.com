const say = require('say')
const util = require('util')
const express = require('express')
const body_parser = require('body-parser')
let speak = (text, voice) => util.promisify(say.speak.bind(say))(text, voice, 1)
let voice_options = [
  'voice_rab_diphone',
  'voice_kal_diphone',
  'voice_cmu_us_awb_cg',
  'voice_cmu_us_slt_cg',
  'voice_cmu_us_rms_cg',
]
let voice = voice_options[4]

express()
.use(body_parser.json())
.post('/', (req, res) => {
  speak(req.body.text).then(() => {
    res.json({status: 'ok'})
  }).catch(e => {
    console.error(e)
    res.status(500).json({status: 'error'})
  })
})
.listen(8888, () => console.log('listening on :8888'))
