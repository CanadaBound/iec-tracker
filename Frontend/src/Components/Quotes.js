import { useState } from 'react';
import '../CSS/Quotes.css';
import QuoteList from '../Assets/Data/QuoteList';
import {useInterval} from '../HelperFunctions';
function Quotes(){

	const [index, setIndex] = useState(0);

	//This is a custom hook that will take time in milliseconds and run the code within it every x milliseconds.
	//The code within simply increases the index value up to the max value within the QuoteList array. This index is then used
	//to display a quote under that index.
	useInterval(()=>{
		if(index < QuoteList.length-1){
			setIndex(prev=>prev+1);
		}else{
			setIndex(0);
		}
	},15000);
	return(
		<div className="Quotes-Container">
			<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="-2015 -2000 4030 4030">
				<path fill="#f00" d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"/>
			</svg>
			<blockquote className="Quote">
			Fun  Fact: {QuoteList[index]} 
			</blockquote>
		</div>
	);

}
export default Quotes;