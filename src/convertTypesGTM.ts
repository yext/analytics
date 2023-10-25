import { EventPayload } from './EventPayload';

// Define the list of possibly numerical properties to check and convert
const propertiesToCheck = [
  'versionNumber',
  'siteUid',
  'count',
  'entity',
  'amount',
  'latitude',
  'longitude',
  'timestamp',
  'bot',
  'internalUser',
  'isDirectAnswer'
];

export function convertTypesGTM(data: Record<string, unknown>): EventPayload {
  // Recursive function to traverse and convert nested objects
  function recursiveConversion(obj: Record<string, unknown>) {
    for (const property in obj) {
      if (
        obj.hasOwnProperty(property) &&
        propertiesToCheck.includes(property)
      ) {
        // Check if the property is in the list of properties to convert,
        // and if it's a string that represents a number, convert it to a number.
        // If it's a boolean string, convert it to a boolean.
        if (!isNaN(Number(obj[property]))) {
          obj[property] = Number(obj[property]);
        } else if (obj[property] === 'true' || obj[property] === 'false') {
          obj[property] = obj[property] === 'true';
        }
      }
      // If the property is an object, recursively call the function on it
      else if (typeof obj[property] === 'object') {
        recursiveConversion(obj[property] as Record<string, unknown>);
      }
    }
  }

  // Copy the input data to avoid modifying the original
  const result: Record<string, unknown> = { ...data };
  // Start the recursive conversion
  recursiveConversion(result);

  // Handle customValues separately as it's nested properties can have a user defined key name
  if (result.customValues && typeof result.customValues === 'object') {
    convertCustomValues(result.customValues as Record<string, unknown>);
  }

  // Return the modified result
  return {
    ...result,
    action: result.action as EventPayload['action']
  };
}

// Function to convert custom values within customValues object
function convertCustomValues(obj: Record<string, unknown>) {
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === 'string' &&
      !isNaN(Number(obj[key]))
    ) {
      obj[key] = Number(obj[key]);
    }
  }
}
