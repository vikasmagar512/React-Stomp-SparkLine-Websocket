/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
    require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
/*global.DEBUG = false
const values =[]
const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
  var subscription = client.subscribe("/fx/prices", messageCallback);
}

client.connect({}, connectCallback, function(error) {
  console.log(error.headers.message)
})

const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])

const exampleSparkline2 = document.getElementById('example-sparkline2')
// Sparkline.draw(exampleSparkline2, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])

var messageCallback = function(message) {
	if (message.body) {
	  console.log("got message with body " + message.body)
        let data= JSON.parse(message.body)
        if(values.length >= 30 ){
	      values.splice(0,1)
        }
        values.push((data.bestBid + data.bestAsk) / 2)
        Sparkline.draw(exampleSparkline2, values)
    } else {
	  console.log("got empty message");
	}
};
*/// client.disconnect(function() {
    // alert("client disconnected. See you next time!");
//     console.log('client disconnected. See you next time!')
// });

var React = require('react');
var ReactDOM = require('react-dom');
// require('./site/app/App.css');
import {App} from './site/app/App'
var  mountNode = document.getElementById('root')
ReactDOM.render(<App/>, mountNode );
