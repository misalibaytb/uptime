const fs = require("fs");
const fetch = require("node-fetch")
const vannila = {
  uptime: 0,
  total: 0,
  percente: 0,
  percente_back: 0,
};
fs.readdir(`${__dirname}/urls/users`, (error, files) => {
  files.forEach((user) => {
    var user_data = JSON.parse(
      fs.readFileSync(__dirname + "/urls/users/" + user)
    );
    var urls = user_data.urls;
    urls.forEach((url) => {
      var time = 60;
      var file_dir = __dirname + "/urls/urls/" + url.name + ".json";
      if (!fs.existsSync(file_dir))
          fs.writeFileSync(file_dir, JSON.stringify(vannila));
      var data = JSON.parse(fs.readFileSync(file_dir));
      function repeat() {
        time = url.time;
        if (!fs.existsSync(file_dir))
          fs.writeFileSync(file_dir, JSON.stringify(vannila));
        fetch(`${url.secure ? "https://": "http://"}${url.name}`).then(res => {
            data.total += 1
            data.uptime += 1
            data.percente = ((data.uptime / data.total) * 100)
            if(data.percente > 99.90 && data.percente < 100){
                data.percente_back += 1
                if(data.percente_back >= 10){
                    data.uptime = data.total
                    data.percente = ((data.uptime / data.total) * 100)
                    data.percente_back = 0
                }
            }else{
                data.percente_back = 0    
            }
        }).catch(e => {
            data.total += 1
            data.percente_back = 0
            data.percente = ((data.uptime / data.total) * 100)
        })
        fs.writeFileSync(__dirname + "/urls/urls/" + url.name + ".json", JSON.stringify(data))


        setTimeout(() => repeat(), time * 60000);
        
      }
      repeat();
    });
  });
});
