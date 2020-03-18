const config = {
  defaultQuery: {
    searchQuery: "",
    limit: 25,
    offset: 0,
    rating: "G",
    lang: "en"
  } as SearchRequest,
  constants: {
    GIPHY_API_KEY: process.env.REACT_APP_GIPHY_KEY || "",
    GIPHY_API_SEARCH: "https://api.giphy.com/v1/gifs/search",
    AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN || "",
    AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
    AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE || "",
    HTTP_REQUEST_TIMEOUT: Number.parseInt(
      process.env.REACT_APP_HTTP_REQUEST_TIMEOUT || "1000"
    )
  },
  interface: {
    searchPlaceholder: "What to experience?"
  }
};

export default config;
