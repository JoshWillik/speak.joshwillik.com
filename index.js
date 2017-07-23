const say = require('say')
const util = require('util')
const express = require('express')
const body_parser = require('body-parser')
let speak = (text, voice) => util.promisify(say.speak.bind(say))(text, voice, 1)
let port = 3677
let voice = 'rab_diphone'

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
.listen(port, () => console.log(`listening on :${port}`))
