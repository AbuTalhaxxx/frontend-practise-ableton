import { useFormik } from "formik";
import AbletonTextLogoBlack from './AbletonTextLogoBlack';


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
        <footer className="mx-[6%]">
            <AbletonTextLogoBlack extras="h-8" />
            <ul lg:mx-auto>
                <div className="lg:grid lg:grid-cols-3 lg:gap-2">
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
                <FooterItemLegal extraValues="lg:col-span-3"/>
                </div>
            </ul>
        </footer>
    );
}

function FooterItemLegal({extraValues}) {
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
        <ul className={`my-5 ${extraValues} lg:flex lg:flex-row lg:items-center lg:justify-between lg:my-0`}>
            <li>
            <div className="lg:grid lg:grid-cols-6 lg:gap-2">
            {listItems}
            </div>
            </li>
            <li className="mt-12 lg:mt-0">
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
        <ul className="lg:my-5">
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
                <a href="#" title="Fb" className="bg-[#4267B2] h-7 w-7 mr-2 flex items-center justify-center">
                   <i class="fa-brands fa-facebook text-white"></i>
                </a>
                <a
                    href="#"
                    title="twitter"
                    className="bg-[#1DA1F2] h-7 w-7 mr-2 flex items-center justify-center"
                >
                    <i class="fa-brands fa-twitter text-white"></i>
                </a>
                <a
                    href="#"
                    title="Youtube"
                    className="bg-[#ff0000] h-7 w-7 mr-2 flex justify-center items-center"
                >
                      <i class="fa-brands fa-youtube text-white"></i>
                </a>
                <a
                    href="#"
                    title="Instagram"
                    className="bg-[#fa7e1e] h-7 w-7 mr-2 flex justify-center items-center"
                >
                     <i class="fa-brands fa-instagram text-white"></i>
                </a>
            </li>
        </ul>
    );
}


function FormItem() {
    return (
        <ul className="my-5 lg:order-[-1]">
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


export default UltimateFooter;