import {useState, useEffect} from 'react';
import GenericLinkTag from './GenericLinkTag';

function MasteredHeader(){

	const [menuButtonClicked, setMenuButtonClicked] = useState(false);
    const [moreButtonClicked, setMoreButtonClicked] = useState(false);
    
    function onMenuButtonClick(){
    	setMenuButtonClicked(!menuButtonClicked);
    }

    function onMoreButtonClick(){
    	setMoreButtonClicked(!moreButtonClicked);
    }

    function getNavBorderAndBg(){

    return `border-solid border-[2px] ${moreButtonClicked ? "lg:border-[#fff]": "lg:border-[#eee]"} ${menuButtonClicked ? "border-[#0000ff] bg-[#0000ff]" : "border-[#eee] bg-white"} lg:bg-white`;
    
    }   

    function getVisibility(buttonName){
    	return (buttonName === "menu") ? (`${menuButtonClicked ? "block" : "hidden"}`):(${moreButtonClicked ? "block": "hidden"});
    }

    function getFillColor(){
        return menuButtonClicked ? "white":"black";
    }

    function getCaretIcon(){
        const caretText = menuButtonClicked ? "up":"down";
        return (<i className={`fa fa-caret-${caretText} ml-1 text-xs`}></i>);
    }

    return (<header>
    <nav className={`${getNavBorderAndBg()} flex pt-5 pb-3 lg:py-5`}>
        <GenericLinkTag>
            <AbletonLogo className={`fill-${getFillColor()} lg:fill-black`}/>
        </GenericLinkTag>
         <button
                    className={`font-semibold text-xl ml-2.5 text-${getFillColor()} lg:hidden relative group`}
                    onClick={onMenuButtonClick}>
                    Menu{getCaretIcon()}
                </button>
    </nav>
    <nav>
        
    </nav>
    <nav>
        
    </nav>
    <nav>
        
    </nav>
    </header>);

}



export default MasteredHeader;