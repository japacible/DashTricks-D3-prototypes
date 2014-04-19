var map = new Datamap({
  scope: 'world',
  element: document.getElementById('container'),
  projection: 'mercator',
    
  fills: {
    defaultFill: '#0c0b20',
    highlight: '#325297'
  }, 
  data: {
    PAK: {fillKey: 'highlight' }
  },
  bubbleConfig: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    popupOnHover: true,
    highlightOnHover: true,
    highlightFillCover: '#b0e5e3',
    highlightBorderColor: '#b0e5e3',
    highlightBorderWidth: 2,
    highlightFillOpacity: 0.85
  }
});
