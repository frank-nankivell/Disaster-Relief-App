// function to get url for the load of the disaster relief icons 
var getDisasterIcon = function(input) {
    var y, theIcons;
    theIcons = {
    'Drought': '/images/icons/drought_icon1.png',
    'Earthquake' : '/images/icons/earthquake_icon1.png',
    'Flood' : '/images/icons/flood_icon1.png',
    'Forest Fire' : '/images/icons/forestFire_icon1.png',
    'Landslide' : '/images/icons/landslide_icon1.png',
    'Other' : '/images/icons/other_icon1.png',
    'Storm' : '/images/icons/typhoon_icon1.png',
    'Volcanic Eruption' : '/images/icons/volcano_icon1.png',
    'Lightning' : ''
    };
    if (theIcons.hasOwnProperty(input)) {
    y = theIcons[input];
    console.log(y);
    } else { 
      (err)
      console.log("wrong value"+ err)
    }
    return y;
  };
  