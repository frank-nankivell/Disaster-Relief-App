var theImages = new Array() 

            theImages[1] = 'public/images/icons/drought_icon1.png'
            theImages[2] = 'public/images/icons/earthquake_icon.png'
            theImages[3] = 'public/images/icons/flood_icon1.png'
            theImages[4] = 'public/images/icons/forestFire_icon1.png'
            theImages[5] = 'public/images/icons/landslide.png'
            theImages[6] = 'public/images/icons/other_icon1.png'
            theImages[7] = 'public/images/icons/typhoon_icon1.png'
            theImages[8] = 'public/images/icons/volcano_icon1.png'
            var j = 0
            var p = theImages.length;
            var preBuffer = new Array()
            for (i = 0; i < p; i++){
        
                    preBuffer[i] = new Image()
                    preBuffer[i].src = theImages[i]
            }
            var whichImage = Math.round(Math.random()*(p-1));
            function showImage(){
                    document.write('<img src="images/'+theImages[whichImage]+'">');
                    console.log('script works');
            };
