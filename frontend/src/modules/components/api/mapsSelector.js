function MapsSelector(search) {
    let searchEncode = encodeURIComponent(search)
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.userAgent.indexOf("iPhone") !== -1) || 
       (navigator.userAgent.indexOf("iPod") !== -1) || 
       (navigator.userAgent.indexOf("iPad") !== -1))
      window.open(`maps://maps.google.com/maps/search/?daddr=${searchEncode}`);
  
    else /* else use Google */
      window.open(`https://maps.google.com/maps/search/?api=1&query=${searchEncode}`);
  }

  export default MapsSelector