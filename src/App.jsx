import { lazy, useState, Suspense, useEffect, useRef } from "react";
import ImprovedHeader from "./components/ImprovedHeader";
import LazyLoadedImage from "./components/LazyLoadedImage";
import SectionArticle from "./components/SectionArticle";
import UltimateFooter from "./components/NewFooter";

/* Add SecNav to the actual header instead of under it
   Fix the spacing across all elements, perhaps assing a different file to hold different spacing variables
   need to deal with the image not sizing correctly on screen width increasing
   I used the margin classes of mx and my with 12 and 16 in a lot of places, but now if I wanna fit it, I will most probably have to change it everywhere, so I better use a varaible for that
   and also figure out spacing of elements before I start a project
   all the sections and the articles in them could have simply used a component function and the strings could have been stored in a different file altogether.
*/

/*https://ableton-production.imgix.net/about/header.jpg?auto=format&fit=crop&fm=jpg&h=234&ixjsv=1.1.3&w=375*/

const LazyImage = lazy(() => import("./components/LazyLoadedImage.jsx"));

function App() {
    const [state, setState] = useState(false);

    const [moreState, setMore] = useState(false);

    const [language, setLanguage] = useState("English");

    const [country, setCountry] = useState("Bangladesh");

    const [scrollCount, setScrollCount] = useState(0);

    const [scrollingUp, setScrollUp] = useState(false);

    const [bgImageUrl, setBgImageUrl] = useState("");

    const [windowHeightWidth, setWindowHeightWidth] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    function handleScroll() {
        const yValue = window.scrollY;
        setScrollUp(scrollCount > yValue);
        setScrollCount(yValue);
    }

    const bgDiv = useRef(null);
    const bgDivOne = useRef(null);
    const bgDivTwo = useRef(null);
    const bgDivThree = useRef(null);
    const bgDivFour = useRef(null);
    const bgDivFive = useRef(null);

    function intersectionObserverCb(entries, observer) {
        entries.forEach((item) => {
            console.log("intersected");
            const className = item.target.classList;
            let target = item.target;
            let dataUrl = target.dataset.src;
            let url = "";

            if (className.contains("bgDiv")) {
                target.style.cssText = `background-image: url('${bgImageUrl}'), url('${dataUrl}');`;
            } 
            
            let height = target.dataset.height;
            let width = target.dataset.width;

             if (className.contains("bgDivOne")) {
                url = `https://ableton-production.imgix.net/about/photo-1.jpg?fit=crop&h=${height}&ixjsv=1.1.3&w=${width}`;
                target.style.cssText = `background-image: url('${url}'), url('${dataUrl}');`;
            } else if (className.contains("bgDivTwo")) {
                url = `https://ableton-production.imgix.net/about/photo-2.jpg?fit=crop&h=${height}&ixjsv=1.1.3&w=${width}`;
                target.style.cssText = `background-image: url('${url}'), url('${dataUrl}');`;
            }
             else if (className.contains("bgDivThree")) {
                url = `https://ableton-production.imgix.net/about/photo-3.jpg?fit=crop&h=${height}&ixjsv=1.1.3&w=${width}`;
                target.style.width=`${width}`;
                target.style.height=`${height}`;
                target.style.backgroundImage = `url('${url}'), url('${dataUrl}')`;
            }
             else if (className.contains("bgDivFour")) {
                url = `https://ableton-production.imgix.net/about/photo-4.jpg?fit=crop&h=${height}&ixjsv=1.1.3&w=${width}`;
                target.style.width=`${width}`;
                target.style.height=`${height}`;
                target.style.backgroundImage = `url('${url}'), url('${dataUrl}')`;
            }
            else if (className.contains("bgDivFive")) {
                url =  `https://ableton-production.imgix.net/about/photo-5.jpg?fit=crop&h=${height}&ixjsv=1.1.3&w=${width}`;
                target.style.width=`${width}`;
                target.style.height=`${height}`;
                target.style.backgroundImage = `url('${url}'), url('${dataUrl}')`;
            }

        });
    }

    function setObserver() {
        let intersectionObserver = new IntersectionObserver(
            intersectionObserverCb,
            { root: null, threshold: 0.01 }
        );

        let observer = new ResizeObserver((entries) => {
            console.log("Resized");
            let entry = entries[0];
            setBgImageUrl(
                `https://ableton-production.imgix.net/about/header.jpg?auto=format&fit=crop&fm=jpg&h=${entry.contentRect.height}&ixjsv=1.1.3&w=${entry.contentRect.width}`
            );
            let dataUrl = entry.target.dataset.src;
            entry.target.style.cssText = `background-image: url('https://ableton-production.imgix.net/about/header.jpg?auto=format&fit=crop&fm=jpg&h=${entry.contentRect.height}&ixjsv=1.1.3&w=${entry.contentRect.width}'), url('${dataUrl}');`;
        });

        if (bgDiv.current && bgDiv.current instanceof Element) {
            observer.observe(bgDiv.current);
            intersectionObserver.observe(bgDiv.current);
            intersectionObserver.observe(bgDivOne.current);
            intersectionObserver.observe(bgDivTwo.current);
            intersectionObserver.observe(bgDivThree.current);
            intersectionObserver.observe(bgDivFour.current);
            intersectionObserver.observe(bgDivFive.current);
        }

        return () => {
            intersectionObserver.disconnect();
            observer.disconnect();
        };
    }

    useEffect(setObserver, []);

    useEffect(() => {
        window.onresize = () => {
            setWindowHeightWidth([window.innerWidth, window.innerHeight]);
        };

        return () => {
            window.onresize = null;
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollCount, scrollingUp]);

    function handleSelection(selection) {
        setLanguage(selection);
    }

    function handleSelectionCountry(countryN) {
        setCountry(countryN);
    }

    function handleClick() {
        setState(!state);
    }

    function moreHandle() {
        setMore(!moreState);
    }

    return (
        <>
            <ImprovedHeader
                clicked={state}
                menuClicked={handleClick}
                moreClicked={moreState}
                moreClickedHandler={moreHandle}
                scrollUp={scrollingUp}
                count={scrollCount}
            />
            <FirstSection url={bgImageUrl} refToRef={bgDiv} />
            <SecondSection
                wh={windowHeightWidth}
                refOne={bgDivOne}
                refTwo={bgDivTwo}
            />
            <ThirdSection />
            <FourthSection windowDimensions={windowHeightWidth} refOne={bgDivThree} refTwo={bgDivFour} refThree={bgDivFive}/>
            <FifthSection />
            <SixthSection />
            <SeventhSection />
            <UltimateFooter
                selec={handleSelection}
                lang={language}
                count={handleSelectionCountry}
                countryName={country}
            />
        </>
    );
}

function FirstSection({ url, refToRef }) {
    let bgUrl =
        "https://ableton-production.imgix.net/about/header.jpg?fit=crop&auto=format&fm=jpg";

    return (
        <section>
            <div
                ref={refToRef}
                className={`ml-12 mr-12 h-[450px] bg-center dynamic-image flex justify-center items-center bg-no-repeat bg-cover bgDiv`}
                data-src="https://ableton-production.imgix.net/about/header.jpg?fit=crop&auto=format&fm=jpg"
                /*style={{ backgroundImage: `url('${url}'), url('${bgUrl}')` }}*/
            >
                <AbletonTextLogo extras="h-14" />
            </div>
            <SectionArticle number="one" />
        </section>
    );
}

function SecondSection({ wh, refOne, refTwo }) {
    let widthOne = Math.round((wh[0] / 100) * 41);
    let widthTwo = Math.round((wh[0] / 100) * 33.3);
    let heightTwo = Math.round((widthTwo / 100) * 75);
    let mainHeight = Math.round((wh[0] / 100) * 58);
    const urlOne = `https://ableton-production.imgix.net/about/photo-1.jpg?fit=crop&h=${widthOne}&ixjsv=1.1.3&w=${widthOne}`;
    const urlTwo = `https://ableton-production.imgix.net/about/photo-2.jpg?fit=crop&h=${heightTwo}&ixjsv=1.1.3&w=${widthTwo}`;
    const bgUrlOne =
        "https://ableton-production.imgix.net/about/photo-1.jpg?fit=crop";
    const bgUrlTwo =
        "https://ableton-production.imgix.net/about/photo-2.jpg?fit=crop";

    return (
        <section>
            <div
                className={`flex items-center justify-evenly gradiented-div w-full aspect-[100/58]`}
            >
                <div
                    ref={refOne}
                    className="bg-no-repeat bg-cover bg-center w-[41%] aspect-[1/1] bgDivOne"
                    data-src="https://ableton-production.imgix.net/about/photo-1.jpg?fit=crop"
                    data-height={`${widthOne}`}
                    data-width={`${widthOne}`}
                    /* style={{
                        backgroundImage: `url('${urlOne}'), url('${bgUrlOne}')`}}*/
                ></div>
                <div
                    ref={refTwo}
                    className="bg-no-repeat bg-cover bg-center w-[33%] aspect-[4/3] bgDivTwo"
                    data-src="https://ableton-production.imgix.net/about/photo-2.jpg?fit=crop"
                    data-width={`${widthTwo}`}
                    data-height={`${heightTwo}`}
                    /*
                    style={{
                        backgroundImage: `url('${urlTwo}'), url('${bgUrlTwo}')`
                    }}*/
                ></div>
            </div>
        </section>
    );
}

function ThirdSection() {
    return (
        <section>
            <SectionArticle number="two" />
            <div className="ml-12 mr-12 mt-16 mb-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
                <LazyLoadedImage />
                {/*<Suspense fallback={<div>Loading...</div>}>
                    <LazyImage />
                </Suspense>*/}
            </div>
        </section>
    );
}

function FourthSection({ windowDimensions, refOne, refTwo, refThree }) {
    const calcDimensions = (toBeDivided, percentage) => {
        return Math.round((toBeDivided / 100) * percentage);
    };

    const width = calcDimensions(windowDimensions[0], 59);
    const height = calcDimensions(width, 128);
    const widthTwo = calcDimensions(windowDimensions[0], 33);
    const heightTwo = calcDimensions(widthTwo, 75);
    const widthOne = calcDimensions(windowDimensions[0], 42);
    const heightOne = widthOne;

  

    return (
        <section>
            <SectionArticle number="three" />
            <div className="gradiented-div-three w-full flex items-center justify-evenly aspect-[1068/806]">
                <div className="flex flex-col items-center justify-evenly flex-wrap h-full">
                    <div ref={refOne}
                        className="bg-center bg-cover bg-no-repeat bgDivThree"
                        data-src="https://ableton-production.imgix.net/about/photo-3.jpg?fit=crop"
                        data-width={`${widthTwo}`}
                        data-height={`${heightTwo}`}
                        style={{
                            height: `${heightTwo}px`,
                            width: `${widthTwo}px`,
                        }}
                    ></div>
                    <div ref={refTwo}
                        className="bg-center bg-cover bg-no-repeat bgDivFour"
                        data-src="https://ableton-production.imgix.net/about/photo-4.jpg?fit=crop"
                        data-width={`${widthTwo}`}
                        data-height={`${heightTwo}`}
                        style={{
                            height: `${heightTwo}px`,
                            width: `${widthTwo}px`,
                        }}
                    ></div>
                </div>
                <div ref={refThree}
                    className="bg-center bg-cover bg-no-repeat bgDivFive"
                    data-src="https://ableton-production.imgix.net/about/photo-5.jpg?fit=crop"
                    data-width={`${widthOne}`}
                    data-height={`${heightOne}`}
                    style={{
                        height: `${heightOne}px`,
                        width: `${widthOne}px`,
                    }}
                ></div>
            </div>
        </section>
    );
}

function SixthSection() {
    return (
        <section>
            <SectionArticle number="five" />
            <div className="gradiented-div-four flex items-center justify-end w-full aspect-[1366/797]">
                <img
                    loading="lazy"
                    src="https://ableton-production.imgix.net/about/photo-6-a.jpg?fit=crop&h=342&ixjsv=1.1.3&w=455"
                    className="object-cover w-[33%] aspect-[456/342] ml-[10%] mr-[14%]"
                />
                <img
                    loading="lazy"
                    src="https://ableton-production.imgix.net/about/photo-7.jpg?fit=crop&h=569&ixjsv=1.1.3&w=569"
                    className="object-cover w-[42%] aspect-[1/1]"
                />
            </div>
        </section>
    );
}

function SeventhSection() {
    return (
        <section className="w-full mb-16">
            <SectionArticle number="six" />
            <div className="bg-[#B1C5FF] w-[84%] aspect-[860/798] xl:aspect-[2/1] xl:flex xl:flex-row xl:items-center mx-auto">
                <img
                    loading="lazy"
                    src="https://ableton-production.imgix.net/about/photo-8.jpg?crop=right&fit=crop&h=238&ixjsv=1.1.3&w=397"
                    className="object-cover w-full aspect-[375/225] xl:w-[50%] xl:aspect-[1/1] xl:inline-block"
                />
                <article className="w-full aspect-[860/282] flex flex-col items-center justify-center xl:w-[50%] xl:aspect-[1/1] xl:inline-flex">
                    <div className="w-[78%] xl:aspect-[1/1] md:aspect-[668/110] flex flex-col justify-center">
                        <p className="font-normal text-lg xl:text-3xl mb-[1%]">
                            We’re really proud of the work we’ve done so far.
                            But there’s so much more to come. If you’d like to
                            be a part of it, please join us.
                        </p>
                        <a
                            className="text-[#0000ff] block no-underline font-bold text-lg xl:text-3xl mt-[1%]"
                            href="#"
                        >
                            See latest jobs
                            <i className="fas fa-angle-right text-sm"></i>
                        </a>
                    </div>
                </article>
            </div>
        </section>
    );
}

function FifthSection() {
    return (
        <section className="w-full">
            <SectionArticle number="four" />
            <div className="w-full flex items-center justify-evenly">
                <img
                    loading="lazy"
                    src="https://ableton-production.imgix.net/about/poster-meet-the-makers.jpg?auto=format&fit=crop&fm=jpg&ixjsv=1.1.3&w=1138"
                    className="aspect-[100/57] w-[83%]"
                />
            </div>
        </section>
    );
}

function AbletonTextLogo({ extras }) {
    return (
        <svg height="104" className={extras} viewBox="0 0 430 104">
            <g fill="#FD5948">
                <path d="M32.62 65.175l14.936-33.396 14.948 33.396H32.62zm61.242 34.957c-7.275-15.869-14.884-32.405-22.49-48.944a37586.933 37586.933 0 01-22.49-48.945c-.25-.449-.727-.724-1.274-.724-.554 0-1.075.282-1.395.757L1.245 100.157c-.157.477-.109.964.144 1.31.247.34.665.527 1.181.527h12.637c.485 0 .936-.305 1.34-.92l10.363-22.75h41.305l.066.145a1035.68 1035.68 0 004.444 9.718c1.976 4.292 4.023 8.728 5.867 12.922.386.586.826.885 1.323.885h12.63c.519 0 .94-.186 1.185-.526.253-.352.301-.839.132-1.336zm38.128-8.457c-10.99 0-16.743-9.896-16.743-19.67 0-9.352 5.87-19.29 16.743-19.29 10.24 0 17.392 7.932 17.392 19.29 0 9.792-5.38 19.67-17.392 19.67zm2.707-51.333c-7.1 0-13.242 2.742-18.251 8.155l-.425.459V2.526c0-.515-.672-1.167-1.426-1.167h-11.22c-.759 0-1.434.652-1.434 1.167v98.172c0 .73.632 1.296 1.434 1.296h11.086c.804 0 1.43-.566 1.43-1.296v-5.234l.424.432c4.97 5.105 11.488 8.028 17.871 8.028 19.848 0 28.885-16.676 28.885-32.176 0-15.226-9.943-31.406-28.374-31.406zM184.66 1.36h-11.086c-.759 0-1.432.652-1.432 1.167v98.172c0 .73.629 1.296 1.432 1.296h11.086c.627 0 1.298-.518 1.298-1.296V2.526c0-.49-.653-1.167-1.298-1.167zm25.805 63.816l.09-.312c1.766-6.164 7.281-12.404 14.411-12.404 8.025 0 12.644 6.408 14.29 12.404l.082.312h-28.873zm14.501-24.833c-18.053 0-29.263 12.328-29.263 32.179 0 18.489 12.14 31.403 29.528 31.403 11.763 0 21.743-5.999 27.37-16.463l.093-.182c.06-.416-.201-.837-.807-1.317l-9.377-5.251c-.704-.403-1.244-.317-1.748.32-3.738 6.024-7.259 10.644-15.407 10.644-8.809 0-15.176-5.88-15.84-14.634l-.02-.263h42.546c.69 0 1.43-.366 1.43-1.172V73.81c0-15.44-7.461-33.468-28.505-33.468zm72.869 1.798h-13.782V26.454c0-.721-.498-1.167-1.306-1.167h-11.081c-.711 0-1.43.358-1.43 1.167v6.567c0 2.958 0 9.119-8.239 9.119h-2.32c-.76 0-1.434.655-1.434 1.175v10.422c0 .965 1.097 1.038 1.434 1.038h10.558v25.29c0 16.254 6.066 23.82 19.092 23.82 3.787 0 6.806-.458 8.977-1.366l-.006-.05c.519-.1.964-.762.964-1.044V90.492c0-.638-.653-1.176-1.427-1.176-.28 0-.773.172-.943.241-1.576.626-3.204 1.278-5.54 1.278-.533 0-1.094-.033-1.67-.102-5.684-1.263-5.65-8.723-5.629-13.657V54.775h13.782c.334 0 1.427-.073 1.427-1.038V43.315c0-.52-.673-1.175-1.427-1.175zm39.283 48.77c-10.015 0-18.164-8.428-18.164-18.78 0-10.275 8.149-18.64 18.164-18.64 10.155 0 18.42 8.365 18.42 18.64 0 10.352-8.265 18.78-18.42 18.78zm0-50.568c-18.005 0-32.107 13.96-32.107 31.788s14.102 31.794 32.107 31.794c18.006 0 32.11-13.966 32.11-31.794 0-17.827-14.104-31.788-32.11-31.788zm70.505 0c-5.953 0-11.767 2.328-15.547 6.23l-.396.41-.15-3.665c0-.525-.675-1.177-1.437-1.177h-11.084c-.76 0-1.431.652-1.431 1.167v57.391c0 .73.629 1.296 1.43 1.296h11.085c.805 0 1.437-.566 1.437-1.296V74.451c0-9.682 0-21.733 12.743-21.733 10.477 0 11.33 6.87 11.33 15.173v32.807c0 .73.629 1.296 1.43 1.296h11.088c.768 0 1.302-.53 1.302-1.296V66.471c0-18.071-6.723-26.129-21.8-26.129z"></path>
            </g>
        </svg>
    );
}

export default App;
