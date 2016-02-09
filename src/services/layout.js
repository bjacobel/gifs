import Packery from 'packery';

let pcky;

const packerize = () => {
  if (!pcky) {
    pcky = new Packery(document.querySelector('#gif-grid'), {  // eslint-disable-line no-new
      itemSelector: '.packery-item',
      gutter: document.querySelector('.gutter-sizer'),
      columnWidth: document.querySelector('.grid-sizer'),
      percentPosition: true
    });
  } else {
    pcky.layout();
  }
};

export default packerize;
