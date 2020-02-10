export const logoLinks = {
  "ANA": 'https://d2p3bygnnzw9w3.cloudfront.net/req/202001161/tlogo/hr/ANA.png',
  "Arizona": 'https://d2p3bygnnzw9w3.cloudfront.net/req/202001161/tlogo/hr/PHX.png'
}

export const teamLogo = abbr => {
  if (!abbr) {
    return null;
  }
  let finalAbbr = abbr;
  switch (finalAbbr) {
    case "ARI":
      finalAbbr = "PHX";
      break;
    case "VGK":
      finalAbbr = "VEG";
      break
    default:
      break;
  }
  return `https://d2p3bygnnzw9w3.cloudfront.net/req/202001161/tlogo/hr/${finalAbbr}.png`
}
