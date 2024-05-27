
export const share = ()=> {
    const navShare = navigator.share({
        title : "My First Scrappy Website",
        text : "Check this out",
        url :  window.location.href
    }).then(()=> console.log("Share Successful"))
    .catch(err=> console.error(err))
}