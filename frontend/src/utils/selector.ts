
/*
  This function is used to open the maps app on the user's device.
  It uses the user agent to determine if it's an iOS device or not.
  If it's an iOS device, it will open the Apple Maps app, otherwise it will open the Google Maps app.
*/
export const mapsSelector = (search: string): void => {
    let searchEncode = encodeURIComponent(search);
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.userAgent.indexOf("iPhone") !== -1) || 
       (navigator.userAgent.indexOf("iPod") !== -1) || 
       (navigator.userAgent.indexOf("iPad") !== -1))
      window.open(`maps://maps.google.com/maps/search/?daddr=${searchEncode}`);
  
    else /* else use Google */
      window.open(`https://maps.google.com/maps/search/?api=1&query=${searchEncode}`);
}