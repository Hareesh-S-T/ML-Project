const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');

// let imgPath;
// let imgName;

function loadImage(e) {
  const file = e.target.files[0];

  if (!isFileImage(file)) {
    console.log('Please select an image file');
    return;
  }

  form.style.display = 'block';
  filename.innerText = file.name;
  // imgPath = file.path;
  // imgName = file.name;
  // console.log(imgPath)

}

// Send image to main process
function detectDisease(e) {
  e.preventDefault();
  const imgPath = img.files[0].path;
  const imgName = img.files[0].name;

  console.log(imgPath)
  if (!img.files[0]) {
    console.log('Please upload an image');

  }
  //Send to main using ipcRenderer
  ipcRenderer.send('image:detect', {
    imgPath,
    imgName
  });
}

//When done, show result

ipcRenderer.on('image:done', (leaf_health) => {
  // console.log(args)
  if (leaf_health == true) {
    result.innerText = "Diseased";
  }

  if (leaf_health == false) {
    result.innerText = "Healthy";
  }
});


//Make Sure File is image 
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return file && acceptedImageTypes.includes(file['type'])
}

img.addEventListener('change', loadImage);
form.addEventListener('submit', detectDisease);
