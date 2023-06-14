const client = require('./connection.js')
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const fs = require('fs')
const { google } = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1eYRHZXGCJYvZMHdcsJ5lrjdKcB7Obfft'


// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})
client.connect();



async function uploadFile(profileImage, userId){
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const driveService = google.drive({
            version: 'v3',
            auth
        })

        const fileMetaData = {
            'name': userId+'.jpg',
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream(profileImage)
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        return response.data.id

    }catch(err){
        console.log('Upload file error', err)
    }
}

// uploadFile().then(data => {
//     console.log(data)
//     // https://drive.google.com/uc?export=view&id=
// })

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }else{
            res.send("GRESKA");
        }
    });
    client.end;
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, name, email, password) 
                       values(${user.id}, '${user.name}', '${user.email}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set name = '${user.name}',
                       email = '${user.email}',
                       password = '${user.password}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    const loginQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  
    client.query(loginQuery, (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          // Generisanje access tokena
          const user = result.rows[0];
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            "tajna_za_potpisivanje",
            { expiresIn: "1h" } // Token će isteći za 1 sat
          );
  
          // Sačuvaj access token u bazi podataka za datog korisnika
          const updateTokenQuery = `UPDATE users SET access_token = '${token}' WHERE id = ${user.id}`;
  
          client.query(updateTokenQuery, (err, result) => {
            if (!err) {
              // Remove the password field from the user object
              delete user.password;
              res.send({ user, token });
            } else {
              console.log(err.message);
              res.status(500).send("Error saving access token");
            }
          });
        } else {
          res.status(401).send("Invalid email or password");
        }
      } else {
        console.log(err.message);
        res.status(500).send("Error logging in");
      }
    });
  });

  
  app.post("/loginChild", (req, res) => {
    const { code } = req.body;
  
    const loginQuery = `SELECT id, name, profile_image FROM children WHERE code = '${code}' `;
  
    client.query(loginQuery, (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          // Generisanje access tokena
          const user = result.rows[0];
          if(user.profile_image){
            const base64Image = user.profile_image.toString("base64");

          // Set the base64 string as the src attribute of the <img> tag
          user.profile_image = `data:image/jpeg;base64,${base64Image}`;
          }
          
          console.log(user)
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            "tajna_za_potpisivanje",
            { expiresIn: "1h" } // Token će isteći za 1 sat
          );
  
          // Sačuvaj access token u bazi podataka za datog korisnika
          const updateTokenQuery = `UPDATE children SET access_token = '${token}' WHERE id = ${user.id}`;
  
          client.query(updateTokenQuery, (err, result) => {
            if (!err) {
              // Remove the password field from the user object
              delete user.password;
              res.send({ user, token });
            } else {
              console.log(err.message);
              res.status(500).send("Error saving access token");
            }
          });
        } else {
          res.status(401).send("Invalid email or password");
        }
      } else {
        console.log(err.message);
        res.status(500).send("Error logging in");
      }
    });
  });

  app.post("/logout", (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send("Unauthorized");
      return;
    }
  
    const token = authorizationHeader.replace("Bearer ", "");
    const isParent = req.body.isParent; // Fetch the isParent value from the request body
  
    // Verify and decode the token
    jwt.verify(token, "tajna_za_potpisivanje", (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send("Invalid token");
        return;
      }
  
      const userId = decoded.userId;
      if(isParent){
              // Clear the access token for the user in the database
      const clearTokenQuery = `UPDATE users SET access_token = NULL WHERE id = ${userId}`;
  
      client.query(clearTokenQuery, (err, result) => {
        if (!err) {
          res.send("Logout successful");
          // Use the isParent value as needed in the server-side logic
        } else {
          console.log(err.message);
          res.status(500).send("Error logging out");
        }
      });
      }else{
        const clearTokenQuery = `UPDATE children SET access_token = NULL WHERE id = ${userId}`;
  
        client.query(clearTokenQuery, (err, result) => {
          if (!err) {
            res.send("Logout successful");
            // Use the isParent value as needed in the server-side logic
          } else {
            console.log(err.message);
            res.status(500).send("Error logging out");
          }
        });
      }

    });
  });
  

  app.post('/upload', upload.single('profile'), (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const token = authorizationHeader.replace('Bearer ', '');
    console.log(token)
   
   
    // Verify and decode the token
    jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Invalid token');
        return;
      }
         //const userId = req.body.userId;
    const profileImage = req.file.buffer; // Access the uploaded image buffer
    const imageID = null
          const userId = decoded.userId;
          if(profileImage){
            uploadFile(profileImage, userId).then(data => {
                console.log(data)
                imageID=data
                // https://drive.google.com/uc?export=view&id=
            })
          }
          
      

      
      // Insert the profile image into the database
      const insertQuery = 'UPDATE children SET profile_image = $1 WHERE id = $2';
  
      client.query(insertQuery, [imageID, userId], (err, result) => {
        if (err) {
          console.error('Error uploading image:', err);
          res.status(500).send('Error uploading image');
        } else {
          console.log('Image uploaded successfully');
          res.send('Image uploaded successfully');
        }
      });
    });
  });

