var fs = window.webkitRequestFileSystem;

fs(window.TEMPORARY, 100, (fs) => {
    return;
}, (fs) => {
    console.log('%cI know you\'re in incognito mode', "color: grey; font-size: x-large");
});