import { lazy, useState, Suspense, useEffect, useRef } from "react";
import { useFormik } from "formik";
import ImprovedHeader from "./components/ImprovedHeader";
import LazyLoadedImage from './components/LazyLoadedImage';

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

    function setObserver() {
        let observer = new ResizeObserver((entries) => {
            let entry = entries[0];
            setBgImageUrl(
                `https://ableton-production.imgix.net/about/header.jpg?auto=format&fit=crop&fm=jpg&h=${entry.contentRect.height}&ixjsv=1.1.3&w=${entry.contentRect.width}`
            );
        });

        if (bgDiv.current && bgDiv.current instanceof Element) {
            observer.observe(bgDiv.current);
        }

        return () => {
            observer.disconnect();
        };
    }

    useEffect(setObserver, [bgImageUrl, bgDiv]);

    useEffect(() => {
        window.onresize = () => {
            setWindowHeightWidth([window.innerWidth, window.innerHeight]);
        };

        return ()=>{window.onresize = null;};
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
            {/*<HeaderComp state={state}>
                <Navbar st={state} cb={handleClick} />
            </HeaderComp>
            <SecNav />*/}
            <FirstSection url={bgImageUrl} refToRef={bgDiv} />
            <SecondSection wh={windowHeightWidth} />
            <ThirdSection />
            <FourthSection windowDimensions={windowHeightWidth}/>
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

function FormItem() {
    return (
        <ul className="my-5">
            <li className="my-2">
                <h4 className="text-sm font-semibold">
                    Sign up to our newsletter
                </h4>
            </li>
            <li className="my-2">
                <p className="text-sm">
                    Enter your email address to stay up to date with the latest
                    offers, tutorials, downloads, surveys and more.
                </p>
            </li>
            <li className="my-2">
                <NewsLetterForm />
            </li>
        </ul>
    );
}

function NewsLetterForm() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="text-sm w-[250px] p-2 h-10 bg-slate-200"
            />

            <button
                type="submit"
                className="text-sm text-white bg-[#0000ff] h-10 w-[80px] font-bold"
            >
                Sign Up
            </button>
        </form>
    );
}

function FirstSection({ url, refToRef }) {
    let bgUrl =
        "https://ableton-production.imgix.net/about/header.jpg?fit=crop&auto=format&fm=jpg";

    return (
        <section>
            <div
                ref={refToRef}
                className={`ml-12 mr-12 h-[450px] bg-center dynamic-image flex justify-center items-center bg-no-repeat bg-cover`}
                style={{ backgroundImage: `url('${url}'), url('${bgUrl}')` }}
            >
                <AbletonTextLogo extras="h-14" />
            </div>
            <article className="ml-12 mr-12 mt-16 mb-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
                <p className="font-bold text-lg lg:text-3xl">
                    We make <span className="text-[#0000ff]">Live</span>,{" "}
                    <span className="text-[#0000ff]">Push</span> and{" "}
                    <span className="text-[#0000ff]">Link</span> — unique
                    software and hardware for music creation and performance.
                    With these products, our community of users creates amazing
                    things.
                </p>
                <p className="text-sm mt-5 lg:text-base">
                    Ableton was founded in 1999 and released the first version
                    of Live in 2001. Our products are used by a community of
                    dedicated musicians, sound designers, and artists from
                    across the world.
                </p>
            </article>
        </section>
    );
}

function SecondSection({ wh }) {
    let widthOne = Math.round((wh[0] / 100) * 41);
    let widthTwo = Math.round((wh[0] / 100) * 33.3);
    let heightTwo = Math.round((widthTwo / 100) * 75);
    let mainHeight = Math.round((wh[0]/100)*58);
    const urlOne = `https://ableton-production.imgix.net/about/photo-1.jpg?fit=crop&h=${widthOne}&ixjsv=1.1.3&w=${widthOne}`;
    const urlTwo = `https://ableton-production.imgix.net/about/photo-2.jpg?fit=crop&h=${heightTwo}&ixjsv=1.1.3&w=${widthTwo}`;
    const bgUrlOne =
        "https://ableton-production.imgix.net/about/photo-1.jpg?fit=crop";
    const bgUrlTwo =
        "https://ableton-production.imgix.net/about/photo-2.jpg?fit=crop";

    return (
        <section>
            <div className={`flex items-center justify-evenly gradiented-div w-full`} style={{height: `${mainHeight}px`}}>
                <div
                    className="bg-no-repeat bg-cover bg-center"
                    style={{
                        width: `${widthOne}px`,
                        height: `${widthOne}px`,
                        backgroundImage: `url('${urlOne}'), url('${bgUrlOne}')`}}
                ></div>
                <div
                    className="bg-no-repeat bg-cover bg-center"
                    style={{
                        width: `${widthTwo}px`,
                        height: `${heightTwo}px`,
                        backgroundImage: `url('${urlTwo}'), url('${bgUrlTwo}')`
                    }}
                ></div>
            </div>
        </section>
    );
}



function ThirdSection() {
    return (
        <section>
            <article className="ml-12 mr-12 mt-16 mb-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
                <p className="font-bold text-lg lg:text-3xl">
                    Making music isn’t easy. It takes time, effort, and
                    learning. But when you’re in the flow, it’s incredibly
                    rewarding.
                </p>
                <p className="text-sm mt-5 lg:text-base">
                    We feel the same way about making Ableton products. The
                    driving force behind Ableton is our passion for what we
                    make, and the people we make it for.
                </p>
            </article>
            <div className="ml-12 mr-12 mt-16 mb-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
            <LazyLoadedImage />
                {/*<Suspense fallback={<div>Loading...</div>}>
                    <LazyImage />
                </Suspense>*/}
            </div>
        </section>
    );
}

function UltimateFooter({ selec, lang, count, countryName }) {
    const eduList = [
        "Education",
        "Offers for students and teachers",
        "Ableton for Classroom",
        "Ableton for Colleges and Universities",
    ];

    const comList = [
        "Community",
        "Find Ableton User Groups",
        "Find Certified Training",
        "Become a certified Trainer",
    ];

    const disList = ["Distributors", "Find Distributors", "Try Push in-store"];

    const logosList = ["Register Live or Push", "About Ableton", "Jobs"];

    return (
        <footer className="mx-12">
            <AbletonTextLogoBlack extras="h-8" />
            <ul>
                <FormItem />
                <Logos names={logosList} />
                <FooterItem names={eduList} useCase={1} />
                <FooterItem names={comList} useCase={1} />
                <FooterItem names={disList} useCase={1} />
                <CountryDropdown
                    cb={selec}
                    language={lang}
                    country={count}
                    cname={countryName}
                />
                <FooterItemLegal />
            </ul>
        </footer>
    );
}

function FooterItemLegal() {
    const legal = [
        "Contact Us",
        "Press Resources",
        "Legal Info",
        "Privacy Policy",
        "Cookie Settings",
        "Imprint",
    ];

    const listItems = legal.map(useCaseLast);

    function useCaseLast(item, index) {
        return (
            <li key={index}>
                <a
                    href="#"
                    title="meh"
                    className="no-underline text-xs font-bold"
                >
                    {item}
                </a>
            </li>
        );
    }

    return (
        <ul className="my-5">
            {listItems}
            <li className="mt-12">
                <div className="block">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="28"
                        aria-labelledby="logo"
                        className="fill-black inline-block h-16 w-16"
                        viewBox="0 0 45 21"
                    >
                        <path d="M0 0h3v21H0zm6 0h3v21H6zm6 0h3v21h-3zm6 0h3v21h-3zm6 18h21v3H24zm0-6h21v3H24zm0-6h21v3H24zm0-6h21v3H24z"></path>
                    </svg>
                    <span className="inline-block text-xs ml-3 font-bold">
                        Made in Berlin
                    </span>
                </div>
            </li>
        </ul>
    );
}

function CountryDropdown({ cb, language, country, cname }) {
    let classProps = "hover:bg-blue-400";
    return (
        <div>
            <h4>Language and Location</h4>
            <div className="inline-block pl-3 relative text-xs font-bold group bg-slate-300 cursor-pointer min-w-[95px] h-6 leading-6 my-2">
                {language}
                <i className="fa fa-caret-down text-xs float-right leading-6 mr-2"></i>
                <div className="hidden absolute bg-slate-800 min-w-[95px] group-hover:block text-white ">
                    <ul>
                        <li
                            className={classProps}
                            onClick={() => {
                                cb("English");
                            }}
                        >
                            English
                        </li>
                        <li
                            className={classProps}
                            onClick={() => {
                                cb("Bangla");
                            }}
                        >
                            Bangla
                        </li>
                        <li
                            className={classProps}
                            onClick={() => {
                                cb("Hindi");
                            }}
                        >
                            Hindi
                        </li>
                    </ul>
                </div>
            </div>
            <div className="inline-block ml-2 pl-3 relative text-xs font-bold group bg-slate-300 cursor-pointer min-w-[125px] h-6 leading-6 my-2">
                {cname}
                <i className="fa fa-caret-down text-xs float-right leading-6 mr-2"></i>
                <div className="hidden absolute bg-slate-800 min-w-[125px] group-hover:block text-white ">
                    <ul>
                        <li
                            className={classProps}
                            onClick={() => {
                                country("Bangladesh");
                            }}
                        ></li>
                        <li
                            className={classProps}
                            onClick={() => {
                                country("India");
                            }}
                        >
                            India
                        </li>
                        <li
                            className={classProps}
                            onClick={() => {
                                country("Pakistan");
                            }}
                        >
                            Pakistan
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function FooterItem({ names, useCase }) {
    let listItems = null;

    switch (useCase) {
        case 1:
            listItems = names.map(useCaseOne);
            break;
        case 3:
            listItems = names.map(useCaseLast);
            break;
        default:
            listItems = names.map(useCaseOne);
    }

    function useCaseOne(item, index) {
        const compItem =
            index === 0 ? (
                <li key={index} className="font-semibold text-sm">
                    {item}
                </li>
            ) : (
                <li key={index} className="text-sm my-2">
                    <a href="#" title="meh" className="no-underline">
                        {item}&nbsp;<i className="fas fa-angle-right"></i>
                    </a>
                </li>
            );
        return compItem;
    }

    function useCaseLast(item, index) {
        return (
            <li key={index}>
                <a
                    href="#"
                    title="meh"
                    className="no-underline text-xs font-bold"
                >
                    {item}
                </a>
            </li>
        );
    }

    return <ul className="my-5">{listItems}</ul>;
}

function Logos({ names }) {
    return (
        <ul>
            {names.map((item, index) => {
                return (
                    <li key={index} className="text-sm my-2">
                        <a href="#" title="meh" className="no-underline">
                            {item}&nbsp;<i className="fas fa-angle-right"></i>
                        </a>
                    </li>
                );
            })}
            <li key="logos" className="flex flex-start items-center">
                <a href="#" title="Fb" className="bg-[#4267B2] h-8 w-8 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                        <path
                            fill="#fff"
                            d="M33.334 20a13.333 13.333 0 10-15.417 13.167v-9.312h-3.385V20h3.385v-2.933c0-3.342 1.991-5.187 5.036-5.187a20.5 20.5 0 012.985.26v3.277h-1.681a1.927 1.927 0 00-2.173 2.082v2.5h3.7l-.591 3.854h-3.109v9.314A13.337 13.337 0 0033.334 20z"
                        ></path>
                        <path
                            fill="#3477f2"
                            d="M25.19 23.854L25.781 20h-3.7v-2.5a1.927 1.927 0 012.173-2.082h1.681v-3.283a20.5 20.5 0 00-2.985-.26c-3.046 0-5.036 1.846-5.036 5.188v2.938h-3.383v3.854h3.385v9.32a13.473 13.473 0 004.167 0v-9.317z"
                        ></path>
                    </svg>
                </a>
                <a
                    href="#"
                    title="twitter"
                    className="bg-[#1DA1F2] h-8 w-8 mr-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                        <path
                            fill="#fff"
                            d="M15.362 30.159a14.5 14.5 0 0014.594-14.594c0-.222 0-.443-.015-.663a10.436 10.436 0 002.559-2.655 10.238 10.238 0 01-2.946.807 5.147 5.147 0 002.255-2.837 10.279 10.279 0 01-3.257 1.245 5.134 5.134 0 00-8.741 4.678A14.562 14.562 0 019.24 10.781a5.133 5.133 0 001.588 6.847 5.091 5.091 0 01-2.328-.642v.065a5.131 5.131 0 004.115 5.028 5.121 5.121 0 01-2.316.088 5.135 5.135 0 004.792 3.562 10.292 10.292 0 01-6.37 2.2 10.441 10.441 0 01-1.221-.074 14.521 14.521 0 007.862 2.3"
                        ></path>
                    </svg>
                </a>
                <a
                    href="#"
                    title="Youtube"
                    className="bg-[#ff0000] h-8 w-8 mr-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                        <path
                            fill="#fff"
                            d="M32.776 13.601a3.351 3.351 0 00-2.358-2.373C28.339 10.667 20 10.667 20 10.667s-8.339 0-10.418.561a3.351 3.351 0 00-2.358 2.373 35.146 35.146 0 00-.557 6.46 35.146 35.146 0 00.557 6.46 3.351 3.351 0 002.358 2.373c2.08.561 10.418.561 10.418.561s8.339 0 10.418-.561a3.351 3.351 0 002.358-2.373 35.146 35.146 0 00.557-6.46 35.146 35.146 0 00-.557-6.46z"
                        ></path>
                        <path
                            fill="#ff001d"
                            d="M17.273 24.025l6.97-3.961-6.97-3.969z"
                        ></path>
                    </svg>
                </a>
                <a
                    href="#"
                    title="Instagram"
                    className="bg-[#fa7e1e] h-8 w-8 mr-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                        <g fill="#fff" transform="translate(-336 -285)">
                            <path d="M356 294.069c3.56 0 3.982.014 5.388.078a7.38 7.38 0 012.476.459 4.416 4.416 0 012.53 2.53 7.38 7.38 0 01.459 2.476c.064 1.406.078 1.828.078 5.388s-.014 3.982-.078 5.388a7.38 7.38 0 01-.459 2.476 4.416 4.416 0 01-2.53 2.53 7.38 7.38 0 01-2.476.459c-1.406.064-1.827.078-5.388.078s-3.982-.014-5.388-.078a7.38 7.38 0 01-2.476-.459 4.416 4.416 0 01-2.53-2.53 7.38 7.38 0 01-.459-2.476c-.064-1.406-.078-1.828-.078-5.388s.014-3.982.078-5.388a7.38 7.38 0 01.459-2.476 4.416 4.416 0 012.53-2.53 7.38 7.38 0 012.476-.459c1.406-.064 1.828-.078 5.388-.078m0-2.4c-3.621 0-4.075.015-5.5.08a9.787 9.787 0 00-3.237.62 6.818 6.818 0 00-3.9 3.9 9.787 9.787 0 00-.62 3.237c-.065 1.422-.08 1.876-.08 5.5s.015 4.075.08 5.5a9.787 9.787 0 00.62 3.237 6.818 6.818 0 003.9 3.9 9.787 9.787 0 003.237.62c1.422.065 1.876.08 5.5.08s4.075-.015 5.5-.08a9.787 9.787 0 003.237-.62 6.818 6.818 0 003.9-3.9 9.787 9.787 0 00.62-3.237c.065-1.422.08-1.876.08-5.5s-.015-4.075-.08-5.5a9.787 9.787 0 00-.62-3.237 6.818 6.818 0 00-3.9-3.9 9.787 9.787 0 00-3.237-.62c-1.422-.065-1.876-.08-5.5-.08z"></path>
                            <path d="M356 298.153a6.847 6.847 0 106.847 6.847 6.847 6.847 0 00-6.847-6.847zm0 11.291a4.444 4.444 0 114.444-4.444 4.444 4.444 0 01-4.444 4.444z"></path>
                            <circle
                                cx="1.6"
                                cy="1.6"
                                r="1.6"
                                transform="translate(361.517 296.283)"
                            ></circle>
                        </g>
                    </svg>
                </a>
            </li>
        </ul>
    );
}

function FourthSection({windowDimensions}) {

    const calcDimensions = (toBeDivided, percentage)=>{
        return Math.round((toBeDivided/100)*percentage);
    };

    const width = calcDimensions(windowDimensions[0], 59);
    const height = calcDimensions(width, 128);
    const widthTwo = calcDimensions(windowDimensions[0], 33);
    const heightTwo = calcDimensions(widthTwo, 75);
    const widthOne = calcDimensions(windowDimensions[0], 42);
    const heightOne = widthOne;
    
    const bgUrlOne = `https://ableton-production.imgix.net/about/photo-3.jpg?fit=crop&h=${heightTwo}&ixjsv=1.1.3&w=${widthTwo}`;
    const bgUrlTwo = `https://ableton-production.imgix.net/about/photo-4.jpg?fit=crop&h=${heightTwo}&ixjsv=1.1.3&w=${widthTwo}`;
    const bgUrlThree = `https://ableton-production.imgix.net/about/photo-5.jpg?fit=crop&h=${heightOne}&ixjsv=1.1.3&w=${widthOne}`;


    return (
        <section>
            <article className="mx-12 my-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
                <p className="font-bold text-lg lg:text-3xl">
                    We are more than 350 people from 30 different countries
                    divided between our headquarters in Berlin and our offices
                    in Los Angeles and Tokyo.
                </p>
                <p className="text-sm mt-5 lg:text-base">
                    Most of us are active musicians, producers, and DJs, and
                    many of us use Live and Push every day. We come from a wide
                    range of cultural and professional backgrounds. Some of us
                    have PhDs, some are self-taught, and most of us are
                    somewhere in between. What connects us is the shared belief
                    that each of us has the skills and knowledge to contribute
                    to something big: helping to shape the future of music
                    culture.
                </p>
            </article>
            <div className="gradiented-div-three w-full flex items-center justify-evenly" style={{
                height: `${height}px`}}>
               <div className="flex flex-col items-center justify-evenly flex-wrap h-full">
               <div className="bg-center bg-cover bg-no-repeat" style={{
               height: `${heightTwo}px`,
               width: `${widthTwo}px`,
               backgroundImage: `url('https://ableton-production.imgix.net/about/photo-3.jpg?fit=crop'), url('${bgUrlOne}')`
               }}>
                   
               </div>
                <div className="bg-center bg-cover bg-no-repeat" style={{
               height: `${heightTwo}px`,
               width: `${widthTwo}px`,
               backgroundImage: `url('https://ableton-production.imgix.net/about/photo-4.jpg?fit=crop'), url('${bgUrlTwo}')`
               }}> 
               </div>
               </div>
                <div className="bg-center bg-cover bg-no-repeat" style={{
               height: `${heightOne}px`,
               width: `${widthOne}px`,
               backgroundImage: `url('https://ableton-production.imgix.net/about/photo-5.jpg?fit=crop'), url('${bgUrlThree}')`
               }}>
                   
               </div>
                {/*
                <img
                    src="https://ableton-production.imgix.net/about/photo-3.jpg?fit=crop"
                    className="h-[33%] w-[36%] object-cover absolute top-[15%] left-[7%]"
                />
                <img
                    src="https://ableton-production.imgix.net/about/photo-4.jpg?fit=crop"
                    className="h-[33%] w-[36%] object-cover absolute left-[7%] top-[60%]"
                />
                <img
                    src="https://ableton-production.imgix.net/about/photo-5.jpg?fit=crop"
                    className="h-[55%] w-[40%] object-cover absolute top-[30%] left-[50%]"
                />*/}
            </div>
        </section>
    );
}

function SixthSection() {
    return (
        <section>
            <article className="mx-12 my-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
                <p className="font-bold text-lg lg:text-3xl">
                    We’re passionate about what we do, but we’re equally
                    passionate about improving who we are.
                </p>
                <p className="text-sm mt-5 lg:text-base">
                    We work hard to foster an environment where people can grow
                    both personally and professionally, and we strive to create
                    a wealth of opportunities to learn from and with each other.
                    Alongside an internal training program, employees are
                    actively supported in acquiring new knowledge and skills,
                    and coached on applying these in their daily work. In
                    addition, staff-organized development and music salons are a
                    chance to discuss new technologies, production techniques
                    and best practices.
                </p>
                <p className="text-sm mt-5 lg:text-base">
                    Alongside an internal training program, employees are
                    actively supported in acquiring new knowledge and skills,
                    and coached on applying these in their daily work. In
                    addition, staff-organized development and music salons are a
                    chance to discuss new technologies, production techniques
                    and best practices
                </p>
            </article>
            <div className="gradiented-div-four flex items-center justify-end w-full aspect-[1366/797]">
                <img
                    src="https://ableton-production.imgix.net/about/photo-6-a.jpg?fit=crop&h=342&ixjsv=1.1.3&w=455"
                    className="object-cover w-[33%] aspect-[456/342] ml-[10%] mr-[14%]"
                />
                <img
                    src="https://ableton-production.imgix.net/about/photo-7.jpg?fit=crop&h=569&ixjsv=1.1.3&w=569"
                    className="object-cover w-[42%] aspect-[1/1]"
                />
            </div>
        </section>
    );
}

function SeventhSection() {
    return (
        <section className="w-full">
            <article className="mx-12 my-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
                <p className="font-bold text-lg lg:text-3xl">
                    We want our employees to love it here. Since we’re looking
                    for exceptional talent from around the world, we will do
                    everything we can to make your transition as easy as
                    possible.
                </p>
                <p className="text-sm mt-5 lg:text-base">
                    If you're joining us in Berlin, we'll help with relocation
                    and paperwork. We’ll even provide you with free German or
                    English lessons. Plus, working in Germany means you can
                    expect comprehensive health insurance for you and your
                    family, as well as generous maternity and paternity leave.
                    Office hours are flexible, but it’s not all work; we have
                    several company and team outings throughout the year as well
                    as a variety of fun, informal small-group activities.
                </p>
            </article>
            <div className="bg-[#B1C5FF] w-full aspect-[100/57] flex items-center">
                <img
                    src="https://ableton-production.imgix.net/about/photo-8.jpg?crop=right&fit=crop&h=238&ixjsv=1.1.3&w=397"
                    className="object-cover w-[84%] aspect-[100/57]"
                />
                <article>
                    <p className="font-normal text-lg mx-7 my-7">
                        We’re really proud of the work we’ve done so far. But
                        there’s so much more to come. If you’d like to be a part
                        of it, please join us.
                    </p>
                    <a className="text-[#0000ff] inline-block no-underline font-bold text-lg mx-7 mb-7">
                        See latest jobs<i className="fas fa-angle-right"></i>
                    </a>
                </article>
            </div>
        </section>
    );
}

function FifthSection() {
    return (
        <section className="w-full">
            <article className="mx-12 my-16 md:mx-44 md:my-24 xl:mx-80 xl:my-28">
                <p className="font-bold text-lg lg:text-3xl">
                    We believe it takes focus to create truly outstanding
                    instruments. We only work on a few products and we strive to
                    make them great.
                </p>
                <p className="text-sm mt-5 lg:text-base">
                    Rather than having a one-size-fits-all process, we try to
                    give our people what they need to work their magic and grow.
                    We’ve learned that achieving the best results comes from
                    building teams that are richly diverse, and thus able to
                    explore problems from a wider set of perspectives. We don’t
                    always agree with each other, but opinion and debate are
                    valued and openly encouraged.
                </p>
            </article>
            <div className="w-full flex items-center justify-evenly">
                <img src="https://ableton-production.imgix.net/about/poster-meet-the-makers.jpg?auto=format&fit=crop&fm=jpg&ixjsv=1.1.3&w=1138" className="aspect-[100/57] w-[83%]" />
            </div>
        </section>
    );
}


function AbletonTextLogoBlack({ extras }) {
    return (
        <svg height="104" className={extras} viewBox="0 0 430 104">
            <g fill="#000000">
                <path d="M32.62 65.175l14.936-33.396 14.948 33.396H32.62zm61.242 34.957c-7.275-15.869-14.884-32.405-22.49-48.944a37586.933 37586.933 0 01-22.49-48.945c-.25-.449-.727-.724-1.274-.724-.554 0-1.075.282-1.395.757L1.245 100.157c-.157.477-.109.964.144 1.31.247.34.665.527 1.181.527h12.637c.485 0 .936-.305 1.34-.92l10.363-22.75h41.305l.066.145a1035.68 1035.68 0 004.444 9.718c1.976 4.292 4.023 8.728 5.867 12.922.386.586.826.885 1.323.885h12.63c.519 0 .94-.186 1.185-.526.253-.352.301-.839.132-1.336zm38.128-8.457c-10.99 0-16.743-9.896-16.743-19.67 0-9.352 5.87-19.29 16.743-19.29 10.24 0 17.392 7.932 17.392 19.29 0 9.792-5.38 19.67-17.392 19.67zm2.707-51.333c-7.1 0-13.242 2.742-18.251 8.155l-.425.459V2.526c0-.515-.672-1.167-1.426-1.167h-11.22c-.759 0-1.434.652-1.434 1.167v98.172c0 .73.632 1.296 1.434 1.296h11.086c.804 0 1.43-.566 1.43-1.296v-5.234l.424.432c4.97 5.105 11.488 8.028 17.871 8.028 19.848 0 28.885-16.676 28.885-32.176 0-15.226-9.943-31.406-28.374-31.406zM184.66 1.36h-11.086c-.759 0-1.432.652-1.432 1.167v98.172c0 .73.629 1.296 1.432 1.296h11.086c.627 0 1.298-.518 1.298-1.296V2.526c0-.49-.653-1.167-1.298-1.167zm25.805 63.816l.09-.312c1.766-6.164 7.281-12.404 14.411-12.404 8.025 0 12.644 6.408 14.29 12.404l.082.312h-28.873zm14.501-24.833c-18.053 0-29.263 12.328-29.263 32.179 0 18.489 12.14 31.403 29.528 31.403 11.763 0 21.743-5.999 27.37-16.463l.093-.182c.06-.416-.201-.837-.807-1.317l-9.377-5.251c-.704-.403-1.244-.317-1.748.32-3.738 6.024-7.259 10.644-15.407 10.644-8.809 0-15.176-5.88-15.84-14.634l-.02-.263h42.546c.69 0 1.43-.366 1.43-1.172V73.81c0-15.44-7.461-33.468-28.505-33.468zm72.869 1.798h-13.782V26.454c0-.721-.498-1.167-1.306-1.167h-11.081c-.711 0-1.43.358-1.43 1.167v6.567c0 2.958 0 9.119-8.239 9.119h-2.32c-.76 0-1.434.655-1.434 1.175v10.422c0 .965 1.097 1.038 1.434 1.038h10.558v25.29c0 16.254 6.066 23.82 19.092 23.82 3.787 0 6.806-.458 8.977-1.366l-.006-.05c.519-.1.964-.762.964-1.044V90.492c0-.638-.653-1.176-1.427-1.176-.28 0-.773.172-.943.241-1.576.626-3.204 1.278-5.54 1.278-.533 0-1.094-.033-1.67-.102-5.684-1.263-5.65-8.723-5.629-13.657V54.775h13.782c.334 0 1.427-.073 1.427-1.038V43.315c0-.52-.673-1.175-1.427-1.175zm39.283 48.77c-10.015 0-18.164-8.428-18.164-18.78 0-10.275 8.149-18.64 18.164-18.64 10.155 0 18.42 8.365 18.42 18.64 0 10.352-8.265 18.78-18.42 18.78zm0-50.568c-18.005 0-32.107 13.96-32.107 31.788s14.102 31.794 32.107 31.794c18.006 0 32.11-13.966 32.11-31.794 0-17.827-14.104-31.788-32.11-31.788zm70.505 0c-5.953 0-11.767 2.328-15.547 6.23l-.396.41-.15-3.665c0-.525-.675-1.177-1.437-1.177h-11.084c-.76 0-1.431.652-1.431 1.167v57.391c0 .73.629 1.296 1.43 1.296h11.085c.805 0 1.437-.566 1.437-1.296V74.451c0-9.682 0-21.733 12.743-21.733 10.477 0 11.33 6.87 11.33 15.173v32.807c0 .73.629 1.296 1.43 1.296h11.088c.768 0 1.302-.53 1.302-1.296V66.471c0-18.071-6.723-26.129-21.8-26.129z"></path>
            </g>
        </svg>
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

function HeaderComp(props) {
    const headerBlue = (
        <header className="pt-5 pb-5 bg-[#0000ff]">{props.children}</header>
    );

    const headerNormal = (
        <header className="pt-5 pb-5 border-[#eee] border-solid border-[2px]">
            {props.children}
        </header>
    );

    return props.state ? headerBlue : headerNormal;
}

function SecNav() {
    return (
        <ul className="flex ml-6 font-normal mt-5 mb-5 text-sm">
            <li>
                <a href="#" className="no-underline text-[#FF764D] mr-3">
                    About
                </a>
            </li>
            <li>
                <a href="#" className="no-underline ml-3 mr-3">
                    Jobs
                </a>
            </li>
            <li>
                <a href="#" className="no-underline ml-3 mr-3">
                    Apprenticeships
                </a>
            </li>
        </ul>
    );
}

function Navbar({ st, cb }) {
    const bar = (
        <nav className="w-full flex items-center justify-start">
            <NavigationLogo state={st} />
            <Megadrop state={st} onSquareClick={cb} />
        </nav>
    );

    const barWithDiv = (
        <>
            {" "}
            <nav className="w-full flex items-center justify-start">
                <NavigationLogo state={st} />
                <Megadrop state={st} onSquareClick={cb} />
            </nav>{" "}
            <div className="bg-[#0000ff]">
                {" "}
                <PageLinks state={st} />
                <MoreOnAb state={st} /> <MoreFromAb state={st} />
            </div>
        </>
    );

    return st ? barWithDiv : bar;
}

function Megadrop({ state, onSquareClick }) {
    const clickedButton = (
        <button
            className="font-bold text-xl ml-4 text-[#ffffff]"
            onClick={onSquareClick}
        >
            Menu&nbsp;<i className="fa fa-caret-up text-xs"></i>
        </button>
    );

    const unclickedButton = (
        <button
            className="font-bold text-xl ml-4 lg:hidden"
            onClick={onSquareClick}
        >
            Menu&nbsp;<i className="fa fa-caret-down text-xs"></i>
        </button>
    );
    return state ? clickedButton : unclickedButton;
}

function NavigationLogo({ state }) {
    const fillColor = state ? "fill-white" : "fill-black";

    return (
        <a
            href="#"
            className="no-underline ml-6 mr-3"
            alt="Main logo for Ableton"
        >
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

    return (
        <ul className="flex flex-col flex-wrap mt-5 ml-5">
            <Link pName="Live" otherprops={colors} spacing="mb-3" />
            <Link pName="Push" otherprops={colors} spacing="mb-3 mt-3" />
            <Link pName="Note" otherprops={colors} spacing="mb-3 mt-3" />
            <Link pName="Link" otherprops={colors} spacing="mb-3 mt-3" />
            <Link pName="Shop" otherprops={colors} spacing="mb-3 mt-3" />
            <Link pName="Packs" otherprops={colors} spacing="mb-3 mt-3" />
            <Link pName="Help" otherprops={colors} spacing="mb-3 mt-3" />
            {/*  <Link
                pName="Try Live for free"
                otherprops={colors}
                spacing="mb-3 mt-3"
            />
            <Link
                pName="Log in or register"
                otherprops={`text-xs ${colors}`}
                spacing="mb-3 mt-3"
            />*/}
        </ul>
    );
}

function Link({ pName, otherprops, spacing }) {
    return (
        <li className={spacing}>
            <a
                href="#"
                alt="Other web pages on ableton"
                className={`no-underline font-bold ${otherprops}`}
            >
                {pName}
            </a>
        </li>
    );
}

function MoreOnAb({ state }) {
    const colors = state ? "text-white" : "text-black";

    const pages = [
        "More on Ableton.com:",
        "Blog",
        "Ableton for the Classroom",
        "Ableton for Colleges and Universities",
        "Certified Training",
        "About Ableton",
        "Jobs",
        "Apprenticeships",
    ];

    return (
        <ul
            className={`flex ml-5 mt-3 mb-3 flex-col flex-wrap font-bold ${colors}`}
        >
            {pages[0]}
            {
                pages
                    .filter((item) => item !== "More on Ableton.com:")
                    .map((item, index) => {
                        if (item === "About Ableton") {
                            return (
                                <li
                                    key={index}
                                    className="font-medium mt-3 mb-3 text-xs text-[#FF764D]"
                                >
                                    {item}
                                </li>
                            );
                        }

                        return (
                            <li
                                key={index}
                                className={`font-medium mt-3 mb-3 text-xs ${colors}`}
                            >
                                {item}
                            </li>
                        );
                    }) /* <-- Add closing parenthesis here */
            }
        </ul>
    );
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
                className={`flex ml-5 mt-3 mb-3 flex-row font-bold ${colors} overflow-x-scroll`}
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
                    extras="ml-3 mr-3 w-[25%] min-w-[180px]"
                />
                <EachItem
                    headingText={listTexts[5]}
                    paraText={listTexts[6]}
                    textColor={colors}
                    extras="ml-3 mr-3 w-[25%] min-w-[180px]"
                />
                <EachItem
                    headingText={listTexts[7]}
                    paraText={listTexts[8]}
                    textColor={colors}
                    extras="ml-3 mr-3 w-[25%] min-w-[180px]"
                />
            </ul>
        </>
    );
}

function EachItem({ headingText, paraText, textColor, extras }) {
    return (
        <li className={extras}>
            <h4>{headingText}</h4>
            <p className={`font-normal text-xs ${textColor}`}>{paraText}</p>
        </li>
    );
}

export default App;
