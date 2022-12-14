/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')

exports.data = {
  name: 'hello',
  type: 1,
  description: 'replies with hello world.'
}

const action = async (body) => {
  // May do something here with body
  // Body contains Discord command details
  let response = {
    "content": "Hello! How may I help you?"
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
