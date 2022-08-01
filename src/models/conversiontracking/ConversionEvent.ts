import { CommonConversionData } from './CommonConversionData';
import { ConversionDetails } from './ConversionDetails';

/**
 * An event representing a Conversion
 *
 * @public
 */
export interface ConversionEvent extends CommonConversionData, ConversionDetails {
}