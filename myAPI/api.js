const client = require('./connection.js')
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const tmp = require('tmp');

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



async function uploadFile(tempFilePath, userId){
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
            body: fs.createReadStream(tempFilePath)
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
async function uploadAudio(tempFilePath, userId) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive']
    });

    const driveService = google.drive({
      version: 'v3',
      auth
    });

    const fileMetaData = {
      'name': userId + '.mp3', // or any other suitable audio file extension
      'parents': [GOOGLE_API_FOLDER_ID]
    };

    const media = {
      mimeType: 'audio/mp3', // or the appropriate MIME type for your audio file
      body: fs.createReadStream(tempFilePath)
    };

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: 'id' // use 'fields' instead of 'field'
    });

    return response.data.id;
  } catch (err) {
    console.log('Upload file error', err);
  }
}


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
  
    const loginQuery = `SELECT * FROM children WHERE code = '${code}' `;
  
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
              console.log("TOKEEEN ", updateTokenQuery)
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
  

  app.post('/uploadChild', upload.single('profile'), (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const token = authorizationHeader.replace('Bearer ', '');
  
    // Verify and decode the token
    jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Invalid token');
        return;
      }
  
      const profileImage = req.file.buffer; // Access the uploaded image buffer
      const userId = decoded.userId;
      if (profileImage) {
        // Create a temporary file
        tmp.file({ postfix: '.jpg' }, (err, tempFilePath, fd, cleanupCallback) => {
          if (err) {
            console.error('Error creating temporary file:', err);
            res.status(500).send('Error uploading image');
            return;
          }
  
          // Save the profileImage buffer to the temporary file
          fs.writeFile(tempFilePath, profileImage, (err) => {
            if (err) {
              console.error('Error writing to temporary file:', err);
              res.status(500).send('Error uploading image');
              return;
            }
              let imageID = null;
            
            // Upload the temporary file
            uploadFile(tempFilePath, userId)
              .then((data) => {
                  // Insert the profile image into the database
                let insertQuery = 'UPDATE children SET profile_image = $1 WHERE id = $2';
          
                client.query(insertQuery, [data, userId], (err, result) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    res.status(500).send('Error uploading image');
                } else {
                console.log('Image uploaded successfully');
                res.send('Image uploaded successfully');
            }
        });
                // https://drive.google.com/uc?export=view&id=
              })
              .catch((err) => {
                console.error('Error uploading file:', err);
              })
              .finally(() => {
                // Delete the temporary file
                cleanupCallback();
              });
          });
        });
      }
  
   
    });
  });
  

  

  app.post('/uploadChild', upload.single('profile'), (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const token = authorizationHeader.replace('Bearer ', '');
  
    // Verify and decode the token
    jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Invalid token');
        return;
      }
  
      const profileImage = req.file.buffer; 
      // Access the uploaded image buffer
      const userId = decoded.userId;
      if (profileImage) {
        // Create a temporary file
        tmp.file({ postfix: '.jpg' }, (err, tempFilePath, fd, cleanupCallback) => {
          if (err) {
            console.error('Error creating temporary file:', err);
            res.status(500).send('Error uploading image');
            return;
          }
  
          // Save the profileImage buffer to the temporary file
          fs.writeFile(tempFilePath, profileImage, (err) => {
            if (err) {
              console.error('Error writing to temporary file:', err);
              res.status(500).send('Error uploading image');
              return;
            }
              let imageID = null;
            
            // Upload the temporary file
            uploadFile(tempFilePath, userId)
              .then((data) => {
                  // Insert the profile image into the database
                let insertQuery = 'UPDATE children SET profile_image = $1 WHERE id = $2';
          
                client.query(insertQuery, [data, userId], (err, result) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    res.status(500).send('Error uploading image');
                } else {
                console.log('Image uploaded successfully');
                res.send('Image uploaded successfully');
            }
        });
                // https://drive.google.com/uc?export=view&id=
              })
              .catch((err) => {
                console.error('Error uploading file:', err);
              })
              .finally(() => {
                // Delete the temporary file
                cleanupCallback();
              });
          });
        });
      }
  
   
    });
  });
  

  app.post('/uploadParent', upload.single('profile'), (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const token = authorizationHeader.replace('Bearer ', '');
  
    // Verify and decode the token
    jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Invalid token');
        return;
      }
  
      const profileImage = req.file.buffer; // Access the uploaded image buffer
      console.log("Nestooo", req.file.buffer)
      const userId = decoded.userId;
      if (profileImage) {
        // Create a temporary file
        tmp.file({ postfix: '.jpg' }, (err, tempFilePath, fd, cleanupCallback) => {
          if (err) {
            console.error('Error creating temporary file:', err);
            res.status(500).send('Error uploading image');
            return;
          }
  
          // Save the profileImage buffer to the temporary file
          fs.writeFile(tempFilePath, profileImage, (err) => {
            if (err) {
              console.error('Error writing to temporary file:', err);
              res.status(500).send('Error uploading image');
              return;
            }
              let imageID = null;
            
            // Upload the temporary file
            uploadFile(tempFilePath, userId)
              .then((data) => {
                  // Insert the profile image into the database
                let insertQuery = 'UPDATE users SET profile_image = $1 WHERE id = $2';
          
                client.query(insertQuery, [data, userId], (err, result) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    res.status(500).send('Error uploading image');
                } else {
                console.log('Image uploaded successfully');
                res.send('Image uploaded successfully');
            }
        });
                // https://drive.google.com/uc?export=view&id=
              })
              .catch((err) => {
                console.error('Error uploading file:', err);
              })
              .finally(() => {
                // Delete the temporary file
                cleanupCallback();
              });
          });
        });
      }
  
   
    });
  });

  app.post('/uploadTaskImage/:id', upload.single('task'), (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const token = authorizationHeader.replace('Bearer ', '');
  
    // Verify and decode the token
    jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Invalid token');
        return;
      }
  
      const taskImage = req.file.buffer; // Access the uploaded image buffer
      const task_id= req.params.id


        // Create a temporary file
        tmp.file({ postfix: '.jpg' }, (err, tempFilePath, fd, cleanupCallback) => {
          if (err) {
            console.error('Error creating temporary file:', err);
            res.status(500).send('Error uploading image');
            return;
          }
  
          // Save the profileImage buffer to the temporary file
          fs.writeFile(tempFilePath, taskImage, (err) => {
            if (err) {
              console.error('Error writing to temporary file:', err);
              res.status(500).send('Error uploading image');
              return;
            }
              let imageID = null;
            
            // Upload the temporary file
            uploadFile(tempFilePath, "task"+task_id)
              .then((data) => {
                  // Insert the profile image into the database
                let insertQuery = 'UPDATE tasks SET task_image = $1 WHERE task_id = $2';
          
                client.query(insertQuery, [data, task_id], (err, result) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    res.status(500).send('Error uploading image');
                } else {
                console.log('Image uploaded successfully');
                res.send('Image uploaded successfully');
            }
        });
                // https://drive.google.com/uc?export=view&id=
              })
              .catch((err) => {
                console.error('Error uploading file:', err);
              })
              .finally(() => {
                // Delete the temporary file
                cleanupCallback();
              });
          });
        });
      
  
   
    });
  });
  
  app.post('/uploadTaskAudio/:id', upload.single('audio'), (req, res) => {
    console.log("EVO ME U RUTIIII")
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const token = authorizationHeader.replace('Bearer ', '');
  
    // Verify and decode the token
    jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Invalid token');
        return;
      }
  
      const taskAudio = req.file.buffer; // Access the uploaded image buffer
      const task_id= req.params.id


        // Create a temporary file
        tmp.file({ postfix: '.mp3' }, (err, tempFilePath, fd, cleanupCallback) => {
          if (err) {
            console.error('Error creating temporary file:', err);
            res.status(500).send('Error uploading image');
            return;
          }
  
          // Save the profileImage buffer to the temporary file
          fs.writeFile(tempFilePath, taskAudio, (err) => {
            if (err) {
              console.error('Error writing to temporary file:', err);
              res.status(500).send('Error uploading image');
              return;
            }
            
            // Upload the temporary file
            uploadAudio(tempFilePath, "taskAudio"+task_id)
              .then((data) => {
                  // Insert the profile image into the database
                let insertQuery = 'UPDATE tasks SET task_audio = $1 WHERE task_id = $2';
          
                client.query(insertQuery, [data, task_id], (err, result) => {
                if (err) {
                    console.error('Error uploading audio:', err);
                    res.status(500).send('Error uploading audio');
                } else {
                console.log('Audio uploaded successfully');
                res.send('Audio uploaded successfully');
            }
        });
                // https://drive.google.com/uc?export=view&id=
              })
              .catch((err) => {
                console.error('Error uploading file:', err);
              })
              .finally(() => {
                // Delete the temporary file
                cleanupCallback();
              });
          });
        });
      
  
   
    });
  });
  

  app.post('/addTask', (req, res)=> {
    const authorizationHeader = req.headers.authorization;
    const task = req.body;
    console.log("taskovi", task);
    if (!authorizationHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const token = authorizationHeader.replace('Bearer ', '');
  
    // Verify and decode the token
    jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Invalid token');
        return;
      }
  
      const parentId = decoded.userId;
      console.log("PARENT ID:", parentId)
       let childIDQuery = `select id from children where parentid='${parentId}'`
       let childID = undefined
       client.query(childIDQuery, (err, result) =>{
        if(!err){
          childID=result.rows
          console.log("childID:", childID)
          let insertQuery = `INSERT INTO tasks (task_name, child_id, description, deadline, category, important, audio_duration) 
                   VALUES ('${task.task_name}', '${childID[0].id}', '${task.description}', '${task.deadline}', '${task.category}', '${task.important}', '${task.audio_duration}' )
                   RETURNING task_id`;

   
       client.query(insertQuery, (err, result)=>{
           if(!err){
            const taskID = result.rows[0].task_id;
            // Send the task_id as the response
            res.status(200).json({ task_id: taskID });
           }
           else{ console.log(err.message) }
       })
        }else{
          console.log(err.message)
        }
       })

      })
})

app.post('/addSubtasks/:id', (req, res) => {
  const authorizationHeader = req.headers.authorization;
  const subtasks = req.body;
  const taskId = req.params.id;

  if (!authorizationHeader) {
    res.status(401).send('Unauthorized');
    return;
  }

  const token = authorizationHeader.replace('Bearer ', '');

  // Verify and decode the token
  jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
    if (err) {
      console.log(err.message);
      res.status(401).send('Invalid token');
      return;
    }

    // Iterate over the subtasks array and insert each subtask
    subtasks.forEach((subtask) => {
      const { task_name, description, done } = subtask;
      
      const insertQuery = `INSERT INTO subtasks (name, description, done, task_id) 
                           VALUES ('${task_name}', '${description}', '${done}', '${taskId}')`;
      
      client.query(insertQuery, (err, result) => {
        if (!err) {
          console.log("Subtask added successfully")
        } else {
          console.log(err.message);
        }
      });
    });

    res.status(200).send('Subtasks added successfully!');
  });
});


app.get('/tasks', (req, res)=>{
  const isParent = req.body.isParent
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).send('Unauthorized');
    return;
  }
  const token = authorizationHeader.replace('Bearer ', '');
  jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
    if (err) {
      console.log(err.message);
      res.status(401).send('Invalid token');
      return;
    }
    const userId = decoded.userId;
    if(isParent){
      let childIDQuery = `select id from children where parentid='${userId}'`
      let childID = undefined
      client.query(childIDQuery, (err, result) =>{
       if(!err){
         childID=result.rows
         client.query(`Select * from tasks where child_id='${childID}'`, (err, result)=>{
          if(!err){
              res.send(result.rows);
          }else{
              console.log(err.message)
          }
      });
       }else{
        console.log(err.message)
       }
      })
    }else{
      client.query(`Select * from tasks where child_id='${userId}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }else{
            console.log(err.message)
        }
    });
    }
  });
})

app.get('/subtasks/:id', (req, res) => {
  const task_id = req.params.id;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).send('Unauthorized');
    return;
  }

  const token = authorizationHeader.replace('Bearer ', '');

  jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
    if (err) {
      console.log(err.message);
      res.status(401).send('Invalid token');
      return;
    }

    client.query(`SELECT * FROM subtasks WHERE task_id='${task_id}'`, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
        res.status(500).send('Internal server error');
      }
    });
  });
});


app.post('/subtaskdone/:id', (req, res) => {
  const subtask_id = req.params.id;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).send('Unauthorized');
    return;
  }

  const token = authorizationHeader.replace('Bearer ', '');

  jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
    if (err) {
      console.log(err.message);
      res.status(401).send('Invalid token');
      return;
    }

    const query = 'UPDATE subtasks SET done = $1 WHERE subtask_id = $2';
    const values = [true, subtask_id];

    client.query(query, values, (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).send('Internal server error');
        return;
      }

      res.send('Successfully changed');
    });
  });
});


app.post('/taskdone/:id', (req, res) => {
  const task_id = req.params.id;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).send('Unauthorized');
    return;
  }

  const token = authorizationHeader.replace('Bearer ', '');

  jwt.verify(token, 'tajna_za_potpisivanje', (err, decoded) => {
    if (err) {
      console.log(err.message);
      res.status(401).send('Invalid token');
      return;
    }

    const query = 'UPDATE tasks SET done = $1 WHERE task_id = $2';
    const values = [true, task_id];

    client.query(query, values, (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).send('Internal server error');
        return;
      }

      res.send('Successfully changed');
    });
  });
});