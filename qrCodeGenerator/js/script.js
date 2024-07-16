//step1 - Query main elements:
const container = document.querySelector(".container");
const generateBtn = document.querySelector(".generate-btn");
const qrInputArray = document.querySelector(".qr-input-array");
const qrImg = document.querySelector(".qr-image");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const header1 = document.querySelector(".header-1");

//step2 set the counter
let i = 0;

//step3  when button is clicked start execution
generateBtn.onclick = function () {
  //cler any previous input first
  clearUI();

  //get the text form with input into array of strings
  const transformToArray = Array.from(qrInputArray.value.split(","));

  //Prev Button Logic
  prevBtn.onclick = function () {
    if (i <= 0) {
      i = transformToArray.length;
    }
    i--;
    return setQrCode();
  };

  //Next Button Logic
  nextBtn.onclick = function () {
    if (i >= transformToArray.length - 1) {
      i = -1;
    }
    i++;
    return setQrCode();
  };

  //Calll the Api with current value from array and get QR Code
  function setQrCode() {
    return (qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      transformToArray[i]);
  }

  //if nothing is specified in the input raise error
  if (transformToArray[i] === "") {
    alert("Please enter valid value");
  }

  //if only 1 value is specified instead of array don't show prev/next buttons
  else if (transformToArray.length == 1) {
    generateBtn.innerText = "Generating QR code...";
    qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      transformToArray[0];
    qrImg.onload = function () {
      container.classList.add("active");
      generateBtn.innerText = "Generate QR Code";
    };
  }
  //if at least 2 values are in array generate prev/next button info paragraph
  else {
    generateBtn.innerText = "Generating QR code...";
    prevBtn.classList.add("active");
    nextBtn.classList.add("active");
    header1.classList.add("active");
    qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      transformToArray[0];
    qrImg.onload = function () {
      container.classList.add("active");
      generateBtn.innerText = "Generate QR Code";
    };
  }
};

//for clear ui for now just remove/hide buttons and custom line
const clearUI = () => {
  prevBtn.classList.remove("active");
  nextBtn.classList.remove("active");
  header1.classList.remove("active");
};
