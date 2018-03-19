import React from 'react';
import { Sparklines, SparklinesLine, SparklinesBars, SparklinesSpots  } from 'react-sparklines';
import {newState} from '../../es6/myEs6code'
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        prices:{}
    }
    this.values = []
    this.pricesSubscription = null
    const url = "ws://localhost:8011/stomp"
    this.client = Stomp.client(url)
    this.client.debug = function(msg) {
      if (global.DEBUG) {
        console.info(msg)
      }
    }
    const exampleSparkline = document.getElementById('example-sparkline')
    Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])

    this.connectCallback = this.connectCallback.bind(this)
    this.messageCallback = this.messageCallback.bind(this)
  }
  
  componentDidMount() {
    this.client.connect({}, this.connectCallback, function(error) {
      console.log(error.headers.message)
    })
  }
  connectCallback() {
    document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
    this.pricesSubscription = this.client.subscribe("/fx/prices", this.messageCallback);
  }
  messageCallback(message) {
    if (message.body) {
      console.log("got message with body " + message.body)
      let data = JSON.parse(message.body)      
      this.setState(newState(this.state,data))
    } else {
      console.log("got empty message");
    }
  };
  render() {
    const getTable=(prices)=>{
        return Object.keys(prices).map(function(name,i){
          let data = prices[name]
          return (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.bestBid}</td>
                <td>{data.bestAsk}</td>
                <td>{data.openBid}</td>
                <td>{data.openAsk}</td>
                <td>{data.lastChangeAsk}</td>
                <td>{data.lastChangeBid}</td>
                <td>
                    <Sparklines data={data.values}>
                        <SparklinesLine color="blue" />
                    </Sparklines>
                </td>
              </tr>
          )
        })
    }
            
    return (
      <div>
          <table>
            <thead> 
                <tr>
                  <td>name</td>
                  <td>bestBid</td>
                  <td>bestAsk</td>
                  <td>openBid</td>
                  <td>openAsk</td>
                  <td>lastChangeAsk</td>
                  <td>lastChangeBid</td>
                  <td>sparkLine</td>
                </tr>
            </thead>
            <tbody>
              {getTable(this.state.prices)}
            </tbody>
        </table>
      </div>
    );
  }
}