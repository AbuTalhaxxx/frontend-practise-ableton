import { useState } from 'react'

/* Add SecNav to the actual header instead of under it
   Fix the spacing across all elements, perhaps assing a different file to hold different spacing variables
*/

function App() {

    const [state, setState] = useState(false);

    function handleClick() {
        setState(!state);
    }


    return (<><HeaderComp state={state}><Navbar st={state} cb={handleClick}/>
        </HeaderComp>
        <SecNav />         
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        </>);
}

function FirstSection(){

    return (<section>
        <div className="ml-12 mr-12 h-[450px] bg-center flex justify-center items-center bg-no-repeat bg-cover bg-[url('https://ableton-production.imgix.net/about/header.jpg?fit=crop&auto=format&fm=jpg')]"><AbletonTextLogo extras="h-14"/></div>
        <article className="ml-12 mr-12 mt-16 mb-16">
        <p className="font-bold text-lg">We make <span className="text-[#0000ff]">Live</span>, <span className="text-[#0000ff]">Push</span> and <span className="text-[#0000ff]">Link</span> — unique software and hardware for music creation and performance. With these products, our community of users creates amazing things.</p>       
        <p className="text-sm mt-5">Ableton was founded in 1999 and released the first version of Live in 2001. Our products are used by a community of dedicated musicians, sound designers, and artists from across the world.</p>
        </article> 
        </section>);  
}

function SecondSection(){

   return (<section>
    <div className="flex items-center justify-evenly gradiented-div w-full h-[310px]">
    <img src="https://ableton-production.imgix.net/about/photo-1.jpg?fit=crop" className="w-[45%] h-[55%] cover" />
    <img src="https://ableton-production.imgix.net/about/photo-2.jpg?fit=crop" className="w-[30%] h-[35%] cover" />
    </div>
    </section>);

}

function ThirdSection(){

    return (<section>
        <article className="ml-12 mr-12 mt-16 mb-16">
        <p className="font-bold text-lg">Making music isn’t easy. It takes time, effort, and learning. But when you’re in the flow, it’s incredibly rewarding.</p>       
        <p className="text-sm mt-5">We feel the same way about making Ableton products. The driving force behind Ableton is our passion for what we make, and the people we make it for.</p>
        </article>
        <figure>
            <figcaption>
            
            <figcaption/>
        </figure> 
        </section>);

}

function AbletonTextLogo({extras}){

    return (
    <svg
      height="104"
      className={extras}
      viewBox="0 0 430 104"
    >
      <g fill="#FD5948">
        <path d="M32.62 65.175l14.936-33.396 14.948 33.396H32.62zm61.242 34.957c-7.275-15.869-14.884-32.405-22.49-48.944a37586.933 37586.933 0 01-22.49-48.945c-.25-.449-.727-.724-1.274-.724-.554 0-1.075.282-1.395.757L1.245 100.157c-.157.477-.109.964.144 1.31.247.34.665.527 1.181.527h12.637c.485 0 .936-.305 1.34-.92l10.363-22.75h41.305l.066.145a1035.68 1035.68 0 004.444 9.718c1.976 4.292 4.023 8.728 5.867 12.922.386.586.826.885 1.323.885h12.63c.519 0 .94-.186 1.185-.526.253-.352.301-.839.132-1.336zm38.128-8.457c-10.99 0-16.743-9.896-16.743-19.67 0-9.352 5.87-19.29 16.743-19.29 10.24 0 17.392 7.932 17.392 19.29 0 9.792-5.38 19.67-17.392 19.67zm2.707-51.333c-7.1 0-13.242 2.742-18.251 8.155l-.425.459V2.526c0-.515-.672-1.167-1.426-1.167h-11.22c-.759 0-1.434.652-1.434 1.167v98.172c0 .73.632 1.296 1.434 1.296h11.086c.804 0 1.43-.566 1.43-1.296v-5.234l.424.432c4.97 5.105 11.488 8.028 17.871 8.028 19.848 0 28.885-16.676 28.885-32.176 0-15.226-9.943-31.406-28.374-31.406zM184.66 1.36h-11.086c-.759 0-1.432.652-1.432 1.167v98.172c0 .73.629 1.296 1.432 1.296h11.086c.627 0 1.298-.518 1.298-1.296V2.526c0-.49-.653-1.167-1.298-1.167zm25.805 63.816l.09-.312c1.766-6.164 7.281-12.404 14.411-12.404 8.025 0 12.644 6.408 14.29 12.404l.082.312h-28.873zm14.501-24.833c-18.053 0-29.263 12.328-29.263 32.179 0 18.489 12.14 31.403 29.528 31.403 11.763 0 21.743-5.999 27.37-16.463l.093-.182c.06-.416-.201-.837-.807-1.317l-9.377-5.251c-.704-.403-1.244-.317-1.748.32-3.738 6.024-7.259 10.644-15.407 10.644-8.809 0-15.176-5.88-15.84-14.634l-.02-.263h42.546c.69 0 1.43-.366 1.43-1.172V73.81c0-15.44-7.461-33.468-28.505-33.468zm72.869 1.798h-13.782V26.454c0-.721-.498-1.167-1.306-1.167h-11.081c-.711 0-1.43.358-1.43 1.167v6.567c0 2.958 0 9.119-8.239 9.119h-2.32c-.76 0-1.434.655-1.434 1.175v10.422c0 .965 1.097 1.038 1.434 1.038h10.558v25.29c0 16.254 6.066 23.82 19.092 23.82 3.787 0 6.806-.458 8.977-1.366l-.006-.05c.519-.1.964-.762.964-1.044V90.492c0-.638-.653-1.176-1.427-1.176-.28 0-.773.172-.943.241-1.576.626-3.204 1.278-5.54 1.278-.533 0-1.094-.033-1.67-.102-5.684-1.263-5.65-8.723-5.629-13.657V54.775h13.782c.334 0 1.427-.073 1.427-1.038V43.315c0-.52-.673-1.175-1.427-1.175zm39.283 48.77c-10.015 0-18.164-8.428-18.164-18.78 0-10.275 8.149-18.64 18.164-18.64 10.155 0 18.42 8.365 18.42 18.64 0 10.352-8.265 18.78-18.42 18.78zm0-50.568c-18.005 0-32.107 13.96-32.107 31.788s14.102 31.794 32.107 31.794c18.006 0 32.11-13.966 32.11-31.794 0-17.827-14.104-31.788-32.11-31.788zm70.505 0c-5.953 0-11.767 2.328-15.547 6.23l-.396.41-.15-3.665c0-.525-.675-1.177-1.437-1.177h-11.084c-.76 0-1.431.652-1.431 1.167v57.391c0 .73.629 1.296 1.43 1.296h11.085c.805 0 1.437-.566 1.437-1.296V74.451c0-9.682 0-21.733 12.743-21.733 10.477 0 11.33 6.87 11.33 15.173v32.807c0 .73.629 1.296 1.43 1.296h11.088c.768 0 1.302-.53 1.302-1.296V66.471c0-18.071-6.723-26.129-21.8-26.129z"></path>
      </g>
    </svg>
  );

}

function HeaderComp(props) {

    const headerBlue = (<header className="pt-5 pb-5 bg-[#0000ff]">{props.children}</header>);

    const headerNormal = (<header className="pt-5 pb-5 border-[#eee] border-solid border-[2px]">{props.children}</header>);

    return (props.state ? headerBlue : headerNormal);

}

function SecNav(){
    return <ul className="flex ml-6 font-normal mt-5 mb-5 text-sm">
           <li><a href="#" className="no-underline text-[#FF764D] mr-3">About</a></li>
           <li><a href="#" className="no-underline ml-3 mr-3">Jobs</a></li>
           <li><a href="#" className="no-underline ml-3 mr-3">Apprenticeships</a></li>
           </ul>
}

function Navbar({ st, cb }) {

    const bar = (<nav className="w-full flex items-center justify-start">
         <NavigationLogo state={st}/>
         <Megadrop state={st} onSquareClick={cb}/>         
         </nav>);

    const barWithDiv = ( < > <nav className="w-full flex items-center justify-start">
         <NavigationLogo state={st}/>
         <Megadrop state={st} onSquareClick={cb}/>   
         </nav> < div className = "bg-[#0000ff]" > <PageLinks state={st} /><MoreOnAb state={st}/> <MoreFromAb state={st}/>< /div></ > );

    return st ? barWithDiv : bar;
}

function Megadrop({ state, onSquareClick }) {

    const clickedButton = (<button className="font-bold text-xl ml-4 text-[#ffffff]" onClick={onSquareClick}>
          Menu&nbsp;<i className="fa fa-caret-up text-xs"></i>
          </button>);

    const unclickedButton = (<button className="font-bold text-xl ml-4" onClick={onSquareClick}>
          Menu&nbsp;<i className="fa fa-caret-down text-xs"></i>
          </button>);
    return (state ? clickedButton : unclickedButton);
}



function NavigationLogo({ state }) {

    const fillColor = state ? "fill-white" : "fill-black";

    return (
        <a href="#" className="no-underline ml-6 mr-3" alt="Main logo for Ableton">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="28"
      aria-labelledby="logo"
      className={fillColor}
      viewBox="0 0 45 21"
    >
      <path d="M0 0h3v21H0zm6 0h3v21H6zm6 0h3v21h-3zm6 0h3v21h-3zm6 18h21v3H24zm0-6h21v3H24zm0-6h21v3H24zm0-6h21v3H24z"></path>
    </svg>
    </a>
    );
}

function PageLinks({ state }) {

    const colors = state ? "text-white" : "text-black";



    return (<ul className="flex flex-col flex-wrap mt-5 ml-5">
  <Link pName="Live" otherprops={colors} spacing="mb-3"/>
  <Link pName="Push" otherprops={colors} spacing="mb-3 mt-3"/>
  <Link pName="Note" otherprops={colors} spacing="mb-3 mt-3"/>
  <Link pName="Link" otherprops={colors} spacing="mb-3 mt-3"/>
  <Link pName="Shop" otherprops={colors} spacing="mb-3 mt-3"/>
  <Link pName="Packs" otherprops={colors} spacing="mb-3 mt-3"/>
  <Link pName="Help" otherprops={colors} spacing="mb-3 mt-3"/>
  <Link pName="Try Live for free" otherprops={colors} spacing="mb-3 mt-3" />
  <Link pName="Log in or register" otherprops={`text-xs ${colors}`} spacing="mb-3 mt-3" />
</ul>);

}

function Link({ pName, otherprops, spacing }) {
    return (<li className={spacing}><a href="#" alt="Other web pages on ableton" className={`no-underline font-bold ${otherprops}`}>{pName}</a></li>);
}

function MoreOnAb({state}){
    
    const colors = state ? "text-white" : "text-black";

    const pages=["More on Ableton.com:", "Blog","Ableton for the Classroom", "Ableton for Colleges and Universities", "Certified Training", "About Ableton", "Jobs", "Apprenticeships"];

    return (
  <ul className={`flex ml-5 mt-3 mb-3 flex-col flex-wrap font-bold ${colors}`}>
    {pages[0]}
    {pages
      .filter((item) => item !== "More on Ableton.com:")
      .map((item, index) => {

        if(item==="About Ableton"){
        return (
          <li key={index} className="font-medium mt-3 mb-3 text-xs text-[#FF764D]">
            {item}
          </li>);                    
        }

        return (
          <li key={index} className={`font-medium mt-3 mb-3 text-xs ${colors}`}>
            {item}
          </li>
        );
      }) /* <-- Add closing parenthesis here */
    }
  </ul>
);
}

function MoreFromAb({state}){

const colors = state ? "text-white" : "text-black";

const listTexts=["More from Ableton:","Loop", "Watch Talks, Performances and Features from Ableton's Summit for Music Makers","Learning Music","Learn the fundamentals of music making right in your browser.",
 "Learning Synths","Get started with synthesis using a web-based synth and accompanying lessons.","Making Music","Some tips from 74 Creative Strategies for Electronic Producers."];

 return (
  <>
  <h3 className={`${colors} font-bold ml-5 mt-3 mb-3`}>{listTexts[0]}</h3>  
  <ul className={`flex ml-5 mt-3 mb-3 flex-row font-bold ${colors} overflow-x-scroll`}>
   <EachItem headingText={listTexts[1]} paraText={listTexts[2]} textColor={colors} extras="ml-0 mr-3 w-[25%] min-w-[180px]"/>
   <EachItem headingText={listTexts[3]} paraText={listTexts[4]} textColor={colors} extras="ml-3 mr-3 w-[25%] min-w-[180px]"/>
   <EachItem headingText={listTexts[5]} paraText={listTexts[6]} textColor={colors} extras="ml-3 mr-3 w-[25%] min-w-[180px]"/>
   <EachItem headingText={listTexts[7]} paraText={listTexts[8]} textColor={colors} extras="ml-3 mr-3 w-[25%] min-w-[180px]"/> 
  </ul>
  </>
);
}

function EachItem({headingText, paraText, textColor, extras}){

return (<li className={extras}>
    <h4>{headingText}</h4>
    <p className={`font-normal text-xs ${textColor}`}>{paraText}</p>   
   </li>);

}


export default App;