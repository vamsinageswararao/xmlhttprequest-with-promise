//xml with promise
function countriesApi(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('Get', url,true);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.response)
            }
            else if(this.readyState==4 && this.status !==200){
                reject(this.status);;
            }
        }
        xhr.send();
    })
}
let url="https://restcountries.eu/rest/v2/all";
countriesApi(url)
.then(function(data){
    var data=JSON.parse(data);
    console.log(data)

    //function for creating div elements with argument class name
    function creatediv(className){
        var element=document.createElement('div');
        element.setAttribute('class',className);
        return element;
    }
    
    var container=creatediv('container');
    document.body.append(container);
    var row = creatediv('row');
    container.append(row);

    //for loop for creating card for each data with their details
    for(let i in data){
        var column = creatediv('col-3');
        row.append(column);
        
        var card = creatediv('card');
        column.append(card);

        //country name
        var title = creatediv('title');
        title.innerHTML=data[i].name;

        //country flag
        var img = document.createElement("img");
        img.setAttribute("class","card-img-top");
        img.setAttribute("src",data[i].flag);
    
        var cardbody = creatediv('card-body');

        //capital
        var cap= creatediv('cap');
        cap.innerHTML="Capital: "+(data[i].capital).bold();

        //country code
        var code= creatediv('code');
        code.innerHTML= "Country Codes: "+(data[i].alpha2Code+","+data[i].alpha3Code).bold();

        //region
        var regi = creatediv('regi');
        regi.innerHTML="Region: "+(data[i].region).bold();

        //latitude & longitude
        var latlong = creatediv('latlong')
        latlong.innerHTML = "Lat,Long: "+(data[i].latlng[0]+","+data[i].latlng[1]).bold();

        //appending all to card
        card.append(title,img,cardbody);
        cardbody.append(cap,code,regi,latlong);
    }
})
.catch(function(err){
    console.error(err)
})



