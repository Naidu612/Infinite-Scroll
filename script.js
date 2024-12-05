const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];
// unsplash api
const count=30;
const apiKey='2KU_2HPxQRp5XBj5n63l1envTL_eQPM3GxKhqQehwCs';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// check if all images are loaded
function imageLoaded()
{
    imagesLoaded++;
    if(imagesLoaded===totalImages)
    {   
        ready=true;
        loader.hidden=true;
    }
}
// helper function to set attribute on DOM elements
function setAttributes(element,attributes)
{
  for(const key in attributes)
  {
    element.setAttribute(key,attributes[key]);
  }
}
// create elements for links and photos and add to the DOM
function displayPhotos()
{    imagesLoaded=0;
     totalImages=photosArray.length;
    photosArray.forEach((photo)=>{ 
        // create <a> to link to unsplash
        const item=document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })
        // create <img> for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //event listener ,check when each is finished loading
        img.addEventListener('load',imageLoaded);
        // put <img> inside <a> , then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item); 
     }
    );
}
// get photos from unsplash api
async function getPhotos()
{
    try{
       const response=await fetch(apiUrl);
       photosArray=await response.json();
       displayPhotos();
    }
    catch(error)
    {
     // catch error here

    }
}
// check to see if scrolling near bottom of page , load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000&&ready)
    {   
        ready=false;
        getPhotos();
    }
})
// on load
getPhotos();