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
      type = 'terms_and_conditions';
    } else if (nameWithoutExtension.includes('PN')) {
      type = 'privacy_notice';
    }
  
    let country = '';
    let language = '';
    switch (location) {
      case 'Argentina':
        country = 'AR';
        language = 'es';
        break;
      case 'Brazil':
        country = 'BR';
        language = 'pt-BR';
        break;
      case 'Bolivia':        
        country = 'BO';
        language = 'es';
        break;
      case 'Colombia':              
        country = 'CO';
        language = 'es';
        break;
      case 'USA':
        country = 'US';
        break;
      case 'Canada':
        country = 'CA';
        break;
      default:
        country = 'UNKNOWN';
        language = 'en';
    }
  
    
    return { type, location: country, language };
  };
  