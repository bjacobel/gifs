import * as aws from './AWS';
import * as goog from './google';

export const AWS = aws;
export const google = goog;
export const showDevTools = !process.env.production;
export const rootURL = 'https://gifs.bjacobel.com/';
export const thumbURL = 'https://gifthumbs.bjacobel.com/';
export const USER_EMAIL = 'bjacobel@gmail.com'
