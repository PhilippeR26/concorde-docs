function padG(chiff, nb) {
  let textpage = chiff.toString();
  let textpad = "";
  while (textpad.length < (nb - textpage.length)) { textpad = textpad + "0"; }
  textpad = textpad + textpage;
  return textpad;
}
function updatePage(root) { // mise à jour suite à appui bouton
  document.getElementById('titreHaut').innerHTML = pageCur;
  switch (pageCur) {
    case 1:
      //console.log('premiere');
      document.getElementById('bouton_prem').style.visibility = 'hidden';
      document.getElementById('bouton_prec').style.visibility = 'hidden';
      document.getElementById('bouton_suiv').style.visibility = 'visible';
      document.getElementById('bouton_der').style.visibility = 'visible';
      break;
    case pageMax:
      //console.log('derniere');
      document.getElementById('bouton_prem').style.visibility = 'visible';
      document.getElementById('bouton_prec').style.visibility = 'visible';
      document.getElementById('bouton_suiv').style.visibility = 'hidden';
      document.getElementById('bouton_der').style.visibility = 'hidden';
      break;
    default:
      //console.log('interm');
      document.getElementById('bouton_prem').style.visibility = 'visible';
      document.getElementById('bouton_prec').style.visibility = 'visible';
      document.getElementById('bouton_suiv').style.visibility = 'visible';
      document.getElementById('bouton_der').style.visibility = 'visible';
      break;
  }
  imaG = padG(pageCur * 2 - 1, 3);
  imaD = padG(pageCur * 2, 3);
  document.getElementById('image1').src = root + imaG + ".jpg";
  document.getElementById('image2').src = root + imaD + ".jpg";

}

function updatePage3images(root) { // mise à jour suite à appui bouton
  document.getElementById('titreHaut').innerHTML = pageCur;
  switch (pageCur) {
    case 1:
      //console.log('premiere');
      document.getElementById('bouton_prem').style.visibility = 'hidden';
      document.getElementById('bouton_prec').style.visibility = 'hidden';
      document.getElementById('bouton_suiv').style.visibility = 'visible';
      document.getElementById('bouton_der').style.visibility = 'visible';
      break;
    case pageMax:
      //console.log('derniere');
      document.getElementById('bouton_prem').style.visibility = 'visible';
      document.getElementById('bouton_prec').style.visibility = 'visible';
      document.getElementById('bouton_suiv').style.visibility = 'hidden';
      document.getElementById('bouton_der').style.visibility = 'hidden';
      break;
    default:
      //console.log('interm');
      document.getElementById('bouton_prem').style.visibility = 'visible';
      document.getElementById('bouton_prec').style.visibility = 'visible';
      document.getElementById('bouton_suiv').style.visibility = 'visible';
      document.getElementById('bouton_der').style.visibility = 'visible';
      break;
  }
  imaG = padG(pageCur * 2 - 1, 3);
  imaD = padG(pageCur * 2, 3);
  let spiral;
  switch (pageCur) {
    case 1:
      spiral = "Images/Spirale600DPI-G";
      break;
    case pageMax:
      spiral = "Images/Spirale600DPI-D";
      break;
    default:
      spiral = "Images/Spirale600DPI";
      break;

  }
  document.getElementById('image1').src = root + imaG + ".jpg";
  document.getElementById('image1b').src = spiral + ".jpg";
  document.getElementById('image2').src = root + imaD + ".jpg";

}