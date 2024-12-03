import { types } from "util";
import { legalDocstypes } from "../constants/types";
import { error } from "console";

// Function to extract type, location, and language from the file name
export const getFileInfoFromName = (fileName: string) => {
    const nameWithoutExtension = fileName
    .replace('FINAL-','')
    .replace('.pdf', '');
    
    console.debug(`name without extension: ${nameWithoutExtension}`);

    const [ , , , , country] = nameWithoutExtension.split(' ');    
    
    let type = '';
    if (nameWithoutExtension.includes('TC')) {
      type = legalDocstypes.terms_and_conditions;
    } else if (nameWithoutExtension.includes('PN')) {
      type = legalDocstypes.privacy_notice;
    }
  
    const { location, language } = getLocationAndLanguage(country);
    console.debug(`country : ${country}, location: ${location}, language: ${language}`);      
     
    return { type, location, language };
  };



  const getLocationAndLanguage = (country: string) => {
    let location = '';
    let language = '';
  
    switch (country) {
      case 'Argentina':
        location = 'AR';
        language = 'es';
        break;  
      case 'Brazil':
        location = 'BR';
        language = 'pt-BR';
        break;
      case 'Bolivia':
      case 'Colombia':
      case 'Chile':
      case 'Panama':
      case 'Paraguay':
      case 'Peru':
      case 'Uruguay':
        location = country === 'Bolivia' ? 'BO' : 
                   country === 'Colombia' ? 'CO' : 
                   country === 'Chile' ? 'CL' :
                   country === 'Panama' ? 'PA' :
                   country === 'Paraguay' ? 'PY' :
                   country === 'Peru' ? 'PE' : 
                   'UY';
        language = 'es';
        break;      
      case 'Austria':
      case 'Germany':
        location = country === 'Austria' ? 'AT' : 'DE';
        language = 'de';
        break;      
      case 'Belarus':
      case 'Russia':
        location = country === 'Belarus' ? 'BY' : 'RU';
        language = 'ru';
        break;      
      case 'Belgium':
        location = 'BE';
        language = 'fr';
        break;      
      case 'Bulgaria':
        location = 'BG';
        language = 'bg';
        break;      
      case 'Canada':
        location = 'CA'
        language = 'fr';
        break;
      case 'Croatia':
        location = 'HR';
        language = 'hr';
        break;      
      case 'Czechia':
        location = 'CZ';
        language = 'cs';
        break;  
      case 'Denmark':
        location = 'DK';
        language = 'da';
        break;      
      case 'Egypt':
        location = 'EG';
        language = 'ar';
        break;  
      case 'Estonia':
        location = 'EE';
        language = 'et';
        break;
  
      case 'France':
        location = 'FR';
        language = 'fr';
        break;
  
      case 'Georgia':
        location = 'GE';
        language = 'ka';
        break;
      case 'Greece':
        location = 'GR';
        language = 'el';
        break;
      case 'Hungary':
        location = 'HU';
        language = 'hu';
        break;
      case 'Ireland':
      case 'UK':
      case 'South_Africa':
      case 'New_Zealand':
      case 'Zambia':
      case 'Zimbabwe':
        location = country === 'Ireland' ? 'IE' :
                   country === 'UK' ? 'GB' :
                   country === 'South_Africa' ? 'ZA' :
                   country === 'New_Zealand' ? 'NZ' :
                   country === 'Zambia' ? 'ZM' : 
                   'ZW';
        language = 'en';
        break;
      case 'Italy':
        location = 'IT';
        language = 'it';
        break;
      case 'Kazakhstan':
        location = 'KZ';
        language = 'kk';
        break;
      case 'Latvia':
        location = 'LV';
        language = 'lv';
        break;
      case 'Lithuania':
        location = 'LT';
        language = 'lt';
        break;
      case 'Mexico':
        location = 'MX';
        language = 'es';
        break;
      case 'Moldova':
        location = 'MD';
        language = 'ro';
        break;
      case 'Mozambique':
        location = 'MZ';
        language = 'pt';
        break;
      case 'Netherlands':
        location = 'NL';
        language = 'nl';
        break;
      case 'Poland':
        location = 'PL';
        language = 'pl';
        break;
      case 'Portugal':
        location = 'PT';
        language = 'pt';
        break;      
      case 'Romania':
        location = 'RO';
        language = 'ro';
        break;  
      case 'Rwanda': 
        location = 'RW';
        language = 'rw';
        break;
      case 'Slovakia':
        location = 'SK';
        language = 'sk';
        break;
      case 'Slovenia':
        location = 'SI';
        language = 'sl';
        break;  
      case 'Spain':
        location = 'ES';
        language = 'es';
        break;
      case 'Sweden':
        location = 'SE';
        language = 'sv';
        break;
      case 'Turkey':
        location = 'TR';
        language = 'tr';
        break;
      case 'Ukraine':
        location = 'UA';
        language = 'uk';
        break;
      case 'USA' :
        location = 'US';
        language = 'en';
        break;
      case 'Uzbekistan':
        location = 'UZ';
        language = 'uz';
        break;  
      default:
        location = 'UNKNOWN';
        language = 'UNKNOWN';
    }
  
    
    console.log(`country: ${country}`);
    console.log(`language: ${language}`);
    console.log(`location: ${location}`);
    
    return { location, language };    
  };
