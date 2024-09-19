// Function to extract type, location, and language from the file name
export const getFileInfoFromName = (fileName: string) => {
    const nameWithoutExtension = fileName
    .replace('FINAL-','')
    .replace('.pdf', '');
    
    console.debug(`name without extension: ${nameWithoutExtension}`);

    const [year, global, cw, pn, location] = nameWithoutExtension.split(' ');    
    console.log(year, global, cw, pn, location);
    console.debug(`location : ${location}`);
  
    let type = '';
    if (nameWithoutExtension.includes('TC')) {
      type = 'TERMS_AND_CONDITIONS';
    } else if (nameWithoutExtension.includes('PN')) {
      type = 'PRIVACY_NOTICE';
    }
  
    let country = '';
    switch (location) {
      case 'Brazil':
        country = 'BR';
        break;
      case 'USA':
        country = 'US';
        break;
      case 'Canada':
        country = 'CA';
        break;
      default:
        country = 'UNKNOWN';
    }
  
    let language = '';
    if (location === 'Brazil') {
      language = 'pt';
    } else if (location === 'USA' || location === 'Canada') {
      language = 'en';
    }
  
    console.debug(language);
    console.debug(location);
    console.debug(country);

    return { type, location: country, language };
  };
  