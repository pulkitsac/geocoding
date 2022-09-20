
function coordinate(lat, longt) {
  this.lat = lat;
  this.longt = longt;
}


const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


var fs = require('fs');

var data = fs.readFileSync('input.txt', 'utf8');

var city = data.split('\n');

// console.log(city);

var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'openstreetmap',
    httpAdapter: 'https',
    apiKey: ' ',
    formatter: 'json'
    };
        

let geocoder = NodeGeocoder(options);

const geo = async () => {
  for ( let i = 0; i < city.length; i++){
      let c = city[i];
      console.log(c);
      if ( !myCache.has(c)){
        console.log("Handling miss");
        await geocoder.geocode(c)
        .then((res)=> {
            console.log(res[0].latitude);
            let lat = res[0].latitude;
            let longt = res[0].longitude;
            const cityCoordinate = new coordinate(lat,longt);
            console.log(cityCoordinate);
            try{
              myCache.set(c,cityCoordinate);
            }
            catch(err){
              console.log("Set error",err);
            }
            // console.log(c);


            fs.appendFile('output.txt', c + ":" +lat+","+longt+"\n", err => {
                if (err) {
                    console.error(err);
                }
            // file written successfully
                });
            
            })
        .catch((err)=> {
          console.log(err);
        });
      }
      else{
        console.log("Cache hit");
        const cityCoordinate = myCache.get(c);
        let lat = cityCoordinate.lat;
        let longt = cityCoordinate.longt;

        fs.appendFile('output.txt', c + ":" +lat+","+longt+"\n", err => {
            if (err) {
                console.error(err);
            }
        // file written successfully
            });
      }
      
  }

}

geo();


 











