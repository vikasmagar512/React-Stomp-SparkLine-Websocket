export const newState = (state,data) => {
	if(state.prices[data.name]){
		return {
			...state,
			prices:
				{
					...state.prices,
				    [data.name]:
				        {...data,
				        	'values':setValue(state.prices[data.name],data)
				        }
				}
				
			}
	}else{
		return{
			...state,
            prices:
                {
                	...state.prices,
                    [data.name]:
	                    {...data,
	                        'values':[((data.bestBid + data.bestAsk) / 2)]
	                    }
                }
        }
	}
}
export const setValue = (statePrices,data)=>{
  if(statePrices.values.length >= 30 ){
      statePrices.values.splice(0,1)
  }
  statePrices.values.push((data.bestBid + data.bestAsk) / 2)
  return statePrices.values
}