/**
 * Location and Route Validation Utility
 * Detects identical departure and destination locations, handles airport codes,
 * and validates trip route parameters.
 */

// Known major cities, states, and pilgrimage nodes in India
const INDIAN_CITIES = [
  'delhi', 'mumbai', 'bengaluru', 'bangalore', 'chennai', 'kolkata',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'goa', 'varanasi', 'kashi',
  'amritsar', 'agra', 'rishikesh', 'haridwar', 'kedarnath', 'badrinath',
  'gangotri', 'yamunotri', 'ujjain', 'omkareshwar', 'somnath', 'dwarka',
  'rameshwaram', 'madurai', 'srisailam', 'trimbakeshwar', 'shirdi',
  'bhimashankar', 'puri', 'tirupati', 'vaishno devi', 'katra', 'hampi',
  'udaipur', 'mysore', 'andaman', 'gokarna', 'kanyakumari', 'mahabaleshwar',
  'leh', 'ladakh', 'manali', 'darjeeling', 'coorg', 'munnar', 'ooty',
  'shimla', 'nainital', 'srinagar', 'guwahati', 'shillong', 'gangtok',
  'thanjavur', 'khajuraho', 'chittorgarh', 'dehradun', 'lucknow', 'patna',
  'bhopal', 'indore', 'chandigarh', 'vadodara', 'surat', 'nagpur', 'nashik'
];

/**
 * Cleans string of airport codes (e.g. DEL, BOM), parentheses, and special chars
 */
function cleanLocation(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/\([a-z0-9\s]+\)/g, ' ') // remove (DEL), (BOM), etc.
    .replace(/[^a-z0-9\s]/g, ' ')      // remove punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if departure and destination point to the same location
 * @param {string} departure 
 * @param {string} destination 
 * @returns {{ isSame: boolean, locationName?: string, errorMessage?: string }}
 */
export function checkSameDepartureAndDestination(departure, destination) {
  if (!departure || !destination) {
    return { isSame: false };
  }

  const cleanDep = cleanLocation(departure);
  const cleanDest = cleanLocation(destination);

  if (!cleanDep || !cleanDest) {
    return { isSame: false };
  }

  // Exact match
  if (cleanDep === cleanDest) {
    const displayName = departure.trim();
    return {
      isSame: true,
      locationName: displayName,
      errorMessage: `Error: Departure and destination cannot be the same (${displayName}). Please select a different destination.`,
    };
  }

  // Check known Indian cities / destinations overlap
  for (const city of INDIAN_CITIES) {
    const depHasCity = cleanDep.includes(city);
    const destHasCity = cleanDest.includes(city);
    if (depHasCity && destHasCity) {
      const capCity = city.charAt(0).toUpperCase() + city.slice(1);
      return {
        isSame: true,
        locationName: capCity,
        errorMessage: `Error: Departure location and destination cannot be the same (${capCity}). Please choose a different destination for your trip.`,
      };
    }
  }

  // Check token intersection for words of length >= 4 (ignoring common fillers)
  const ignoredWords = new Set(['temple', 'trail', 'tour', 'hills', 'fort', 'caves', 'gate', 'view', 'point', 'beach', 'lake']);
  const depTokens = cleanDep.split(' ').filter((w) => w.length >= 4 && !ignoredWords.has(w));
  const destTokens = cleanDest.split(' ').filter((w) => w.length >= 4 && !ignoredWords.has(w));

  for (const token of depTokens) {
    if (destTokens.includes(token)) {
      const capToken = token.charAt(0).toUpperCase() + token.slice(1);
      return {
        isSame: true,
        locationName: capToken,
        errorMessage: `Error: Departure and destination cannot be the same (${capToken}). Please select a different destination.`,
      };
    }
  }

  return { isSame: false };
}

/**
 * Checks if departure and return dates are valid
 */
export function checkDateValidation(departureDate, returnDate) {
  if (!departureDate || !returnDate) {
    return { isValid: false, error: 'Please select both departure and return dates.' };
  }
  if (departureDate === returnDate) {
    return {
      isValid: false,
      isSameDate: true,
      error: 'Error: Return date cannot be the same as departure date. Please choose a return date after departure date.',
    };
  }
  const dDep = new Date(departureDate);
  const dRet = new Date(returnDate);
  if (dRet < dDep) {
    return {
      isValid: false,
      isBefore: true,
      error: 'Error: Return date cannot be earlier than departure date.',
    };
  }
  return { isValid: true, error: '' };
}

/**
 * Comprehensive route validator
 */
export function validateTripRoute(fromLocation, destination, departureDate, returnDate) {
  const from = (fromLocation || '').trim();
  const dest = (destination || '').trim();

  if (!from && !dest) {
    return {
      isValid: false,
      error: 'Please specify both departure location and destination.',
    };
  }

  if (!from) {
    return {
      isValid: false,
      error: 'Please enter your departure / starting location.',
    };
  }

  if (!dest) {
    return {
      isValid: false,
      error: 'Please specify your travel destination.',
    };
  }

  const sameCheck = checkSameDepartureAndDestination(from, dest);
  if (sameCheck.isSame) {
    return {
      isValid: false,
      error: sameCheck.errorMessage || 'Error: Departure and destination cannot be the same.',
    };
  }

  if (departureDate && returnDate) {
    const dateCheck = checkDateValidation(departureDate, returnDate);
    if (!dateCheck.isValid) {
      return {
        isValid: false,
        error: dateCheck.error,
      };
    }
  }

  return { isValid: true, error: '' };
}
