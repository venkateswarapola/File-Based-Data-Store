const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const args = process.argv.slice(2);
if(args[0] == 'unitTest.js')
{
    path = process.cwd() + "/TestDataBase";
}
else{
    path = args[0];
}
if (args[0] == null) {
  path = process.cwd() + "/DataBase";
}

const createFile = (filePath) => {
  fs.writeFile(path + "/database.json", JSON.stringify({}), (error) => {
    if (error) {
      console.error("Error While Creating directory", error);
    } else {
      console.log("File Created Successfully");
    }
  });
};

const createdir = (dirPath) => {
  console.log(dirPath);
  fs.mkdir(dirPath, { recursive: true }, (error) => {
    if (error) {
      console.error("Error While Creating directory", error);
    } else {
      console.log("Directory Created at Selected location");
    }
  });
  createFile(path);
};

if (fs.existsSync(path)) {
  console.log("Path Exists");
  if (fs.existsSync(path + "/database.json")) {
    console.log("File Exists");
  } else {
    createFile(path);
  }
} else {
  createdir(path);
}

const create = async (key, val, ttl = null) => {
  let value = {};
  const timenow = new Date();
  let expiry = 0;
  if (ttl == null) {
    expiry = null;
  } else {
    expiry = timenow.getTime() + ttl;
  }
  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  if (IsJsonString(val)) {
    value = JSON.parse(val);
  } else {
    value = val;
  }
  return new Promise(async (resolve, reject) => {
    let data = {};
    await fs.readFile(
      path + "/database.json",
      "utf8",
      async (error, filedata) => {
        if (error) {
          resolve("Error while reading File" + error);
        } else {
          data = JSON.parse(filedata);
          const valSize = Buffer.byteLength(JSON.stringify(value)) / 1024; // Size in KiloBytes
          if (key.length > 32) {
            resolve(
              "Key lenght is capped at 32 Characters, Invalid Length of Key"
            );
          } else if (valSize > 16) {
            resolve("Value Size is capped at 16KB, Invalid Size of Value");
          } else if (Object.keys(data).includes(key)) {
            resolve("Key already Exists, Invalid Query");
          } else if (typeof key != "string") {
            resolve("Key type should be string, Invlid key type");
          } else if (typeof value != "object") {
            resolve("Value type should be Object, Invlid value type");
          } else if (value == null || key == null) {
            resolve(" Invaild Null size of Value or Key");
          } else {
            const item = {
              value: value,
              expiry: expiry,
            };
            data[key] = item;
            if (Buffer.byteLength(JSON.stringify(data)) / 1024 / 1024 > 1) {
              resolve("Size of DB should be less then 1 GB, DB limit exceeded");
            } else {
              await fs.writeFile(
                path + "/database.json",
                JSON.stringify(data),
                (error) => {
                  if (error) {
                    resolve("Error while writing to DB" + error);
                  } else {
                    resolve("Key-Value pair successfully inserted");
                  }
                }
              );
            }
          }
        }
      }
    );
  });
};
const read = async (key) => {
  return new Promise(async (resolve, reject) => {
    let data = {};
    await fs.readFile(path + "/database.json", "utf8", (error, filedata) => {
      if (error) {
        resolve("Error while reading File" + error);
      } else {
        data = JSON.parse(filedata);
        if (Object.keys(data).includes(key)) {
          const item = data[key];
          if (item.expiry == null) {
            resolve(item.value);
          } else {
            const timenow = new Date();
            if (timenow.getTime() > item.expiry) {
              resolve(
                "Key Expired , You cannot perform Read or Delete Operations."
              );
            } else {
              resolve(item.value);
            }
          }
        } else {
          resolve("Key entered does not exist");
        }
      }
    });
  });
};

const del = async (key) => {
  return new Promise(async (resolve, reject) => {
    let data = {};
    await fs.readFile(
      path + "/database.json",
      "utf8",
      async (error, filedata) => {
        if (error) {
          resolve("Error while reading File" + error);
        } else {
          data = JSON.parse(filedata);
          if (Object.keys(data).includes(key)) {
            const item = data[key];
            if (item.expiry == null) {
                delete data[key];
            }
            else {
                const timenow = new Date();
                if (timenow.getTime() > item.expiry) {
                  resolve(
                    "Key Expired , You cannot perform Read or Delete Operations."
                  );
                } else {
                    delete data[key];
                }
            }
            await fs.writeFile(
              path + "/database.json",
              JSON.stringify(data),
              (error) => {
                if (error) {
                  resolve("Error while writing to DB" + error);
                } else {
                  resolve("Key-Value pair successfully Deleted");
                }
              }
            );
          } else {
            resolve("Key entered does not exist");
          }
        }
      }
    );
  });
};
const clearDB = async()=>{
    return new Promise(async (resolve, reject) => {
        await fs.writeFile(
            path + "/database.json",
            "{}",
            (error) => {
              if (error) {
                resolve("Error while writing to DB" + error);
              } else {
                resolve("DB Cleared");
              }
            }
          );
    });
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.post("/create/:key/:value/:ttl?", async (req, res) => {
  let key = req.params.key;
  let value = req.params.value;
  let ttl = req.params.ttl;
  if(ttl == undefined){
    create(key, value).then((response) => {
        console.log(response);
        res.send(response);
      });
  }
  else{
    timettl = parseInt(ttl)
    timettl = timettl*1000
    create(key, value, timettl).then((response) => {
        console.log(response);
        res.send(response);
      });
  }
 
});
app.get("/read/:key", async (req, res) => {
  let key = req.params.key;
  read(key).then((response) => {
    console.log(response);
    res.send(response);
  });
});
app.post("/delete/:key", async (req, res) => {
  let key = req.params.key;
  del(key).then((response) => {
    console.log(response);
    res.send(response);
  });
});
app.post("/clearDB", async (req, res) => {
    clearDB().then((response) =>{
        res.send(response);
    });
  });
app.use("*", (req, res) => {
  res.send(
    "Invalid Route<br> Valid Routes are: <br> 1.POST /create/key/value <br> 2.GET /read/key <br> 3.POST /delete/key"
  );
});

module.exports = app.listen(3000);
