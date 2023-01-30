const listDataHolder = {
	main: {
		hasColorDependencies: true,
		textContent: [
			"Live",
			"Link",
			"Push",
			"Note",
			"Link",
			"Shop",
			"Packs",
			"Help",
		],
		spacing: "mb-3 mt-3 lg:my-0 lg:mx-1.5",
		textSizing: "text-sm",
		fontWeight: "font-500",
		color: function (visibility) {
			if (this.hasColorDependencies) {
				return visibility ? "text-white" : "text-black";
			} else {
				return "text-black";
			}
		},
	},
	more: {
		
	},
	moreFrom: {},
	sticky: {},
	signUp: {},
	socials: {},
	education: {},
	community: {},
	distributors: {},
	languageAndLocation: {},
};

const spacing = {
	navMenu: {
		spacing: "pt-5 pb-3",
		logo: "",
		listItem: "",
	},
};

const sizing = {};

const textSizing = {};
