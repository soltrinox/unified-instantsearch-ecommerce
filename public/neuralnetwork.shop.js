'use strict';


// Polyfill required for aws-sdk to work with vite.
if (typeof window.global === 'undefined') {
    window.global = window
}

AWS.config.region = 'us-west-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:61e93130-bc46-4876-b48c-aceb78ac2786'
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function goToURL(destURL) {
    window.location.href = destURL;
}

var isPlayingAudio = false;

function speakText() {
    var speakThis = document.getElementById('textEntry').value
    SpeakAudio(speakThis)
}

function SpeakAudio(speakThis, dURL) {
    var speechParams = {
        OutputFormat: 'mp3',
        SampleRate: '16000',
        Text: '',
        TextType: 'text',
        VoiceId: 'Matthew'
    }
    speechParams.Text = speakThis

    var polly = new AWS.Polly({ apiVersion: '2016-06-10' })
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    const isPlayingPromise = new Promise((resolve, reject) => {
        function stopTimer(ix) {
            clearInterval(ix)
        }
        const timm = setInterval((timm) => {
            if (!nvuai.isPlayingAudio) {
                stopTimer(timm);

                resolve(true);
            }
        }, 2500);
    });

    // Create presigned URL of synthesized speech file
    return signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
        if (error) {
            console.log('ERROR : ' + error)
        } else {

            var audioFrame = document.querySelector('#audioFrame')
            removeAllChildNodes(audioFrame)

            var isound = document.createElement('audio');
            isound.id = 'isound'
            isound.autoplay = 'autoplay'

            var isource = document.createElement('source')
            isource.id = 'isource'
            isource.src = url
            isource.type = 'audio/mpeg'

            audioFrame.appendChild(isound)
            var iiSound = audioFrame.querySelector('#isound')
            iiSound.appendChild(isource)
            var iiSource = audioFrame.querySelector('#isource')
            iiSound.play();

            isPlayingPromise
                .then((ret) => {
                    if (ret) {
                        if (dURL != null || dURL != undefined) {
                          // goToURL(dURL);
                          $('.ais-SearchBox-submit').click();
                        }
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                });
        }
    })
}

const currDomain = '//localhost:9000/'; 
//  const currDomain =  '//elektra.rowzzy.org/search/';

if (nvuai) {
    var hello = function () {
        SpeakAudio('Welcome to Coco A.i. to start searching please simply say Search for ... followed by your search query.');
    }
    var prodSearch = function (searchTerm) {
        console.log("\n $$$$$$$$$ \n TERM : " + searchTerm);
        $('.ais-SearchBox-input').val(searchTerm);
        // $('.ais-SearchBox-input').val(searchTerm);
        // $('input.ais-SearchBox-input').val(searchTerm);

        var SpokenResp = "Searching for  " + searchTerm + " . ";

        $('.ais-SearchBox-input').on('change', function () {
            console.log('\n#####\nSpokenResp: ' + SpokenResp);
            var dURL = '' + currDomain + '?query=' + searchTerm;
            SpeakAudio(SpokenResp, dURL);
        });

        var e = jQuery.Event("change");
        e.which = 32;
        $(".ais-SearchBox-input").focus().val(searchTerm).trigger(e);
    }

    var showTPS = function (type) {
        $('#tpsreport').show().animate({ bottom: '-100px' }).delay('2000').animate({ bottom: '-500px' })
    }

    var getStarted = function () {
        window.location.href = '' + currDomain; //'https://www.rowzzy.com/'
    }


    var CARDINALNUMBERS = {
        INT1: 'one',
        INT2: 'two',
        INT2A: 'to',
        INT3: 'three',
        INT4: 'four',
        INT4A: 'for',
        INT5: 'five',
        INT6: 'six',
        INT7: 'seven'
    }

    var detailPosition = function (position) {

        console.log("\n$$$$$$$$$$$ \n SELETED POS] "+position);

        var productAttributes = [];
        productAttributes = _.toArray(document.getElementsByClassName("productForm"));

        var SpokenResp = "";

        var selPosObj = {};
        switch (position) {
            case CARDINALNUMBERS.INT1  : {
                selPosObj = productAttributes[0];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[0], null, 4) + 'one')
                break;
            }
            case CARDINALNUMBERS.INT2: {
                selPosObj = productAttributes[1];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[1], null, 4) + 'two')
                break;
            }
            case CARDINALNUMBERS.INT2A: {
                selPosObj = productAttributes[1];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[1], null, 4) + 'tO')
                break;
            }
            case CARDINALNUMBERS.INT3: {
                selPosObj = productAttributes[2];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[2], null, 4) + 'three')
                break;
            }
            case CARDINALNUMBERS.INT4: {
                selPosObj = productAttributes[3];
                console.log('\n  ####### ITEM]\n' + JSON.stringify(productAttributes[3], null, 4) + 'four')
                break;
            }
            case CARDINALNUMBERS.INT4A: {
                selPosObj = productAttributes[3];
                console.log('\n  ####### ITEM]\n' + JSON.stringify(productAttributes[3], null, 4) + 'four')
                break;
            }
            case CARDINALNUMBERS.INT5: {
                selPosObj = productAttributes[4];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[4], null, 4) + 'five')
                break;
            }
            case CARDINALNUMBERS.INT6: {
                selPosObj = productAttributes[5];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[5], null, 4) + 'six')
                break;
            }
            case CARDINALNUMBERS.INT7: {
                selPosObj = productAttributes[6];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[6], null, 4) + 'seven')
                break;
            }
            default: {
                selPosObj = productAttributes[position];
                console.log('\n  ######## ITEM]\n' + JSON.stringify(productAttributes[position], null, 4) + "\n" + _.toString(position))
                break;
            }
        }

        if(!_.isUndefined(selPosObj) && !_.isEmpty(selPosObj) ){
            console.log('\n  ######## ITEM]\n' + JSON.stringify(selPosObj, null, 4) + 'zero' + position)
            var tieRefObj = {
                "0": {
                    "Class": "prodMeta  pid2",
                    "_value": "5588602"
                },
                "1": {
                    "Class": "prodMeta  itemIndex2",
                    "_value": 2
                },
                "2": {
                    "Class": "prodMeta  prdprice2",
                    "_value": 499.99
                },
                "3": {
                    "Class": "prodMeta  prdurl2",
                    "_value": "https://api.bestbuy.com/click/-/5588602/pdp"
                },
                "4": {
                    "Class": "prodMeta  prdimg2",
                    "_value": "https://cdn-demo.algolia.com/bestbuy-0118/5588602_sb.jpg"
                },
                "5": {
                    "Class": "prodMeta  prdcats2",
                    "_value": [
                        "Computers & Tablets",
                        "Laptops"
                    ]
                },
                "6": {
                    "Class": "prodMeta  prdlcat1-2",
                    "_value": "Computers & Tablets"
                },
                "7": {
                    "Class": "prodMeta  prdlcat2-2",
                    "_value": "Computers & Tablets > Laptops"
                },
                "8": {
                    "Class": "prodMeta  prdbrand2",
                    "_value": "Dell"
                },
                "9": {
                    "Class": "prodMeta  prdpname2",
                    "_value": "Dell - Inspiron 15.6\" Touch-Screen Laptop - Intel Core i5 - 6GB Memory - 1TB Hard Drive - Black"
                },
                "10": {
                    "Class": "prodMeta  prddesc2",
                    "_value": "Dell Inspiron Laptop: Get speed and performance from this 15.6-inch Dell Inspiron laptop. Supported by an Intel Core i5-5200U processor and 6GB of DDR3L RAM, this slim touch screen laptop lets you run multiple applications without lag. The 1TB hard drive in this Dell Inspiron laptop lets you store multiple music, video and document files."
                },
                "11": {
                    "Class": "productData hidItem2"
                },
                "Class": "productForm form2"
            }
    
            var dev1 = _.size(selPosObj);
            var xFx = [];
            for (var i = 0; i < dev1; i++) {
    
                // _.find(users, function(o) { return o.age < 40; });
    
                var fTz = selPosObj[i]._value
                xFx.push(fTz);
                console.log(i+"] " + fTz);
            }
            SpokenResp = "Your selection number  " + position + " is a " + xFx[9] + " , and sells for  $" +  xFx[2] ;
        }else{
            SpokenResp = "The retailer can not access Your selection ITEM  " + position + ", PLEASE ASK FOR AN ALTERNATE PRODUCT OR START A NEW SEARCH. " ;
        }

        SpeakAudio(SpokenResp, null);
    }

    var commands = {
        'hello (there)': hello,
        'show me *searchTerm': prodSearch,
        'show me a *searchTerm': prodSearch,
        'search for *searchTerm': prodSearch,
        'search for a *searchTerm': prodSearch,
        'search for a few *searchTerm': prodSearch,
        'search for some *searchTerm': prodSearch,
        'show all *searchTerm': prodSearch,
        'find *searchTerm': prodSearch,
        'detail *position': detailPosition,
        'detail number *position': detailPosition,
        'tell me about *position': detailPosition,
        'read number *position': detailPosition,
        'select *position': detailPosition,
        'select number *position': detailPosition,
        'explain number *position': detailPosition,
        'detail *position': detailPosition,
        'detail number *position': detailPosition,
        'detail item *position': detailPosition,
        'speak *position': detailPosition,
        'read *position': detailPosition,
        'explain *position': detailPosition,
        "restart": getStarted
    }

    nvuai.debug()
    nvuai.addCommands(commands)
    nvuai.setLanguage('en')
    nvuai.start()
} else {
    $(document).ready(function () {
        // $('#unsupported').fadeIn('fast')
    })
}

var scrollTo = function (identifier, speed) {
    $('html, body').animate({
        scrollTop: $(identifier).offset().top
    }, speed || 1000)
}


//productData