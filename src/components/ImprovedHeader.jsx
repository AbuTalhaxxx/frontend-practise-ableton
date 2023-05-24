
import AbletonLogo from './AbletonLogo';
import MainlinksList from './MainlinksList';
import {moreOnLinks, moreFrom} from './../constants';

function ImprovedHeader({clicked, menuClicked, moreClicked, moreClickedHandler}){

        const fillColor = clicked ? ("white"):("black");
        const bgColor = clicked ? ("bg-[#0000ff]"):("bg-white");
        const visibility = clicked ? ("block"):("hidden");
        const moreVisibility = moreClicked ? ("block"):("hidden");

	return (
        <header>
        	<nav className={`${bgColor} flex pt-5 pb-3 lg:py-5 lg:border-b-[#eee] lg:border-solid lg:border-[2px] lg:bg-white`}>
        	    <a href="#" title="Home page link" className="no-underline ml-5 mr-2.5">
        			<AbletonLogo className={`fill-${fillColor} lg:fill-black`}/>
        	    </a>	
        		<button className={`font-semibold text-xl ml-2.5 text-${fillColor} lg:hidden relative group`} onClick={menuClicked}>
                Menu&nbsp;
                {clicked ? 
                (<i className="fa fa-caret-up text-xs"></i>):
                (<i className="fa fa-caret-down text-xs"></i>)}
                </button>
                <MainlinksList className="hidden lg:flex lg:flex-row lg:ml-2 lg:mr-1.5 lg:justify-start lg:items-center"/>
                <button className={`hidden lg:inline-block font-bold text-sm text-[#FF764D] mx-1.5`} onClick={moreClickedHandler}>
                More&nbsp;
                {moreClicked ? 
                (<i className="fa fa-minus"></i>): 
                (<i className="fa fa-plus"></i>)}         
                </button>
                <RegisterList className="hidden lg:flex lg:flex-row lg:ml-auto lg:mr-1.5 lg:justify-end lg:items-center" colorOne="#0000ff" colorTwo="black"/>
        	</nav>
                <nav>
                        <div className={`w-full hidden ${moreClicked ? "lg:block" : "lg:hidden"}`}>
                        <MoreOnList color="black"/>
                        <MoreFromAb state={false} />
                </div>
                </nav>
                <nav>
                <div className={`w-full bg-[#0000ff] ${visibility} lg:hidden`}>
                        <MainlinksList className="flex flex-col flex-wrap pt-0 pl-5" colors={fillColor}/>
                        <RegisterList className="flex flex-col pl-5 flex-wrap" colorOne="#ffffff" colorTwo="#ffffff"/>
                        <MoreOnList color={fillColor}/>
                        <MoreFromAb state={moreClicked} />
                </div>
                </nav>
        	<nav>
        		
        	</nav>
        </header>
		);
}

function RegisterList(props){
        return (<ul className={props.className}>
               <li className="text-xl lg:text-sm my-3 lg:my-0 lg:mx-1.5"><a href="#" className={`no-underline font-[550] text-[${props.colorOne}]`}>Try live for free</a></li> 
               <li className="text-sm mb-3 mt-3 lg:my-0 lg:mx-1.5"><a href="#" className={`no-underline font-[550] text-[${props.colorTwo}]`}>Log in or register</a></li>
        </ul>);
}

function MoreOnList(props){
        return (<>
                <h3 className={`pl-5 font-bold my-3 text-${props.color}`}>More on Ableton.com:</h3>
                <ul className="pl-5 flex flex-col flex-wrap lg:flex-row lg:justify-start lg:items-center">
               
               {moreOnLinks.filter((item) => item !== "More on Ableton.com:")
                    .map((item, index) => {
                        if (item === "About Ableton") {
                            return (
                                <li
                                    key={index}
                                    className="font-medium my-3 text-sm text-[#FF764D] lg:mx-3"
                                >
                                    <a href="#" title="meh">{item}</a>
                                </li>
                            );
                        }

                        return (
                            <li
                                key={index}
                                className={`lg:first:ml-0 lg:mx-3 font-medium my-3 text-sm text-${props.color}`}
                            >
                                <a href="#" title="meh">{item}</a>
                            </li>
                        );
                    })} 
        </ul>
        </>);
}

function MoreFromAb({ state }) {
    const colors = state ? "text-white" : "text-black";

    const listTexts = [
        "More from Ableton:",
        "Loop",
        "Watch Talks, Performances and Features from Ableton's Summit for Music Makers",
        "Learning Music",
        "Learn the fundamentals of music making right in your browser.",
        "Learning Synths",
        "Get started with synthesis using a web-based synth and accompanying lessons.",
        "Making Music",
        "Some tips from 74 Creative Strategies for Electronic Producers.",
    ];

    return (
        <>
            <h3 className={`${colors} font-bold ml-5 mt-3 mb-3`}>
                {listTexts[0]}
            </h3>
            <ul
                className={`flex ml-5 mt-3 pb-3 lg:pb-5 flex-row font-bold ${colors} overflow-x-scroll`}
            >
                <EachItem
                    headingText={listTexts[1]}
                    paraText={listTexts[2]}
                    textColor={colors}
                    extras="ml-0 mr-3 w-[25%] min-w-[180px]"
                />
                <EachItem
                    headingText={listTexts[3]}
                    paraText={listTexts[4]}
                    textColor={colors}
                    extras="mx-3 w-[25%] min-w-[180px]"
                />
                <EachItem
                    headingText={listTexts[5]}
                    paraText={listTexts[6]}
                    textColor={colors}
                    extras="mx-3 w-[25%] min-w-[180px]"
                />
                <EachItem
                    headingText={listTexts[7]}
                    paraText={listTexts[8]}
                    textColor={colors}
                    extras="mx-3 w-[25%] min-w-[180px]"
                />
            </ul>
        </>
    );
}

function EachItem({ headingText, paraText, textColor, extras }) {
    return (
        <li className={extras}>
            <h4>{headingText}</h4>
            <p className={`font-normal text-xs ${textColor} leading-6`}>{paraText}</p>
        </li>
    );
}

export default ImprovedHeader;