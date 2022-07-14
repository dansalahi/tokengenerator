export const GTM_ID = "GTM-MR3SSC9";

export const pageview = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
