import vars from '../_vars.js'
import '../vendor/lightbox.js'

const {bodyEl, galleries} = vars;

galleries && galleries.forEach((item) => {
  lightGallery(item, {
    speed: 500,
    download: false,
  });
})



