const tbl = document.getElementById('table-wrapper');
const tblContent = document.getElementById('table');
const rowWithError = tblContent.querySelectorAll('.error');
const errorMarkers = tblContent.querySelectorAll('.error-marker');
const errorMarkersLeft = tblContent.querySelectorAll('.error-marker-first');
let headrHeight = document.querySelector('.table-filters').offsetHeight;
let footerHeight = document.querySelector('.table-footer').offsetHeight;

let headerFooterHeight = parseInt(headrHeight) + parseInt(footerHeight);

tbl.style.height = 'calc(100% - ' + headerFooterHeight + 'px)';

function rnd(value) {
  return Math.round(parseFloat(value) * 100) / 100;
}

rowWithError.forEach(function (el) {
  let cell = el.querySelector('.highlighted');
  let errorMarker = el.querySelector('.error-marker');
  let errorMarkersLeft = el.querySelector('.error-marker-first');

  errorMarker.setAttribute('data-top', rnd(cell.getBoundingClientRect().top));
  errorMarker.style.top = rnd(cell.getBoundingClientRect().top) + 'px';

  errorMarkersLeft.setAttribute('data-top-left', rnd(cell.getBoundingClientRect().top));
  errorMarkersLeft.style.top = rnd(cell.getBoundingClientRect().top) + 'px';
});

tbl.addEventListener('scroll', function () {
  let offsetY = rnd(tblContent.getBoundingClientRect().top);
  
  errorMarkers.forEach(function(el){
    el.style.top = ( rnd( el.getAttribute('data-top') ) + offsetY - headrHeight) + 'px';
  });

  errorMarkersLeft.forEach(function(el){
    el.style.top = ( rnd( el.getAttribute('data-top-left') ) + offsetY - headrHeight) + 'px';
  });
});

tbl.addEventListener('scroll', function(){
  rowWithError.forEach(function(row){
    let last = row.querySelectorAll('.highlighted');
    let elm = last[last.length - 1];
    let elFirst = last[0];
    let hasErrorLeft = false;
    let hasErrorRight = true;
    if  (rnd(elm.getBoundingClientRect().left) - window.innerWidth <= 0) {
      hasErrorRight = false;
    }

    if (rnd(elFirst.getBoundingClientRect().left) + elFirst.offsetWidth <= 0) {
      hasErrorLeft = true;
    }

    if (hasErrorRight && !row.classList.contains('error')) {
      row.classList.add('error');
    } else if (!hasErrorRight) {
      row.classList.remove('error');
    }

    if (hasErrorLeft && !row.classList.contains('screen-scrolled')) {
      row.classList.add('screen-scrolled');
    } else if (!hasErrorLeft) {
      row.classList.remove('screen-scrolled');
    }

  });
});