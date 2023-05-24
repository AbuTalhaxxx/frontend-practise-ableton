import {mainLinks} from './../constants';

function MainlinksList(props){
	
    return (<ul className={props.className}>
    	{mainLinks.map((item, index)=>{return (<li className="text-sm mb-3 mt-3 lg:my-0 lg:mx-1.5" key={index}><a href="#" className={`no-underline font-[550] text-${props.colors}`}>{item}</a></li>);})}
    </ul>);

}

export default MainlinksList;