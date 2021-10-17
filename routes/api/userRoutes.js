const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = 'YesThisISsxndeuARandomKey';

const dbClient = require('./../../assets/scripts/pg-con');

module.exports = (app) => {

    app.post('/user/login', (req, res, next) => {

        const { body } = req;
        const { username } = body;
        const { password } = body;

        const queryIns = `
        SELECT 
            "Email", "ID", "Username","Password"
        FROM 
            public."Login"
        WHERE
            "Password" = '${password}' AND
            "Username" = '${username}'
        `;

        dbClient.query(queryIns, (err, result) => {
            if (!err) {
                if (result.rows.length > 0) {
                    //if user log in success, generate a JWT token for the user with a secret key
                    console.log(result.rows[0])
                    const user = {
                        'Username': username,
                        'Password': password,
                        'ID': result.rows[0].ID
                    }

                    jwt.sign({ user }, privateKey, { expiresIn: '1h' }, (err, token) => {
                        if (err) { console.log(err) }

                        res.json({
                            'token': token,
                            'status': 'success'
                        })

                    });
                } else {
                    res.json({
                        'status': 'error'
                    })
                }
            }
            else {
                res.json({
                    'Status': 'Error'
                })
            }
        });
        dbClient.end;
    })
    app.post('/user/updateProfileImage', (req, res, next) => {

        const { body } = req;
        const { UserID } = body;
        const { ImageType } = body;
        const { base64image } = body;
        var data =
            base64image
                .replace("data:", "")
                .replace(/^.+,/, "");

        // // let buff = new Buffer(data, 'base64');
        // const buff = Buffer.from(data, 'utf8');
        // fs.writeFileSync('stack-abuse-logo-out.png', buff);
        // console.log(data);

        // const queryIns = `
        // INSERT INTO public."ProfileImages"(
        //     "UserID", "ImageType", "Base64Image")
        //     VALUES ('`+ UserID + `','` + ImageType + `',decode('`+data+`, 'base64')');
        // `;
        
        const queryIns = `
        UPDATE public."UserInfo"
            SET "ProfilePicture" = decode('`+data+`', 'base64')
            WHERE 
            "UserID" = `+UserID+`
        `;
        // console.log(queryIns);
        dbClient.query(queryIns, (err, result) => {
            if (!err) {
                res.json({
                    'status': 'success'
                })
            } else {
                console.log(err)
                res.json({
                    'status': 'error'
                })
            }
        });
        dbClient.end;
    })

    app.post('/user/register', (req, res, next) => {

        var randOTP = Math.floor((Math.random() * 10000) + 1);
        randOTP += 10000;

        const { body } = req;
        const { username } = body;
        const { password } = body;
        const { email } = body;

        const queryIns = `
        INSERT INTO public."Login"(
            "Email", "Password", "OTP","Username")
            VALUES ('`+ email + `','` + password + `','` + randOTP + `','` + username + `');
        `;
        dbClient.query(queryIns, (err, result) => {
            if (!err) {
                res.json({
                    // 'token': token,
                    'status': 'success',
                    'gotoOTP': 'true',
                    'dummyOTP': randOTP,
                    'userVAR': body
                })
            } else {
                res.json({
                    'Status': 'Error'
                })
            }
        });
        dbClient.end;
    })

    app.post('/user/checkOTP', (req, res, next) => {
        const { body } = req;
        const { username } = body;
        const { password } = body;
        const { email } = body;
        const { OTP } = body;

        const queryIns = `
        SELECT 
            "Email", "ID", "Username"
        FROM 
            public."Login"
        WHERE
            "Email" = '${email}' AND
            "Password" = '${password}' AND
            "OTP" = ${OTP} AND
            "Username" = '${username}'
        `;
        dbClient.query(queryIns, (err, result) => {
            if (!err) {
                res.send(result.rows);
            } else {
                res.json({
                    'Status': 'Error'
                })
            }
        });
        dbClient.end;
    })

    //This is a protected route 
    app.get('/user/data', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.token, privateKey, (err, authorizedData) => {
            if (err) {
                res.send({
                    "Status": 403,
                    "Message": err.Message
                })
            } else {
                const queryIns = `
                SELECT 
                    *,
                    encode(ui."ProfilePicture",'base64') as base64ProfilePicture  
                FROM
                public."UserInfo" ui right join public."Login" lgn on ui."UserID" = lgn."ID"
                                WHERE
                                lgn."ID" = ${authorizedData.user.ID}
                `

                // SELECT 
				// lgn."ID",
				// lgn."Biography",
				// Email,
				// DOB,
				// Intentions,
				// Job Title,
				
                //    encode(ui."ProfilePicture",'base64') as base64ProfilePicture
				 
                // FROM
                // public."UserInfo" ui right join public."Login" lgn on ui."UserID" = lgn."ID"
                //                 WHERE
                //                 lgn."ID" = 1
                dbClient.query(queryIns, (err, result) => {
                    if (!err) {
                        // res.send(result.rows);
                        res.json({
                            'message': 'Successful log in',
                            // 'authorizedData': authorizedData,
                            'userInfo': result.rows
                        });

                    } else {
                        res.json({
                            'Status': 'Error'
                        })
                    }
                });
                dbClient.end;
            }
        })
    });

    //This is a protected route 
    app.get('/user/demodata', checkToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, authorizedData) => {
            if (err) {
                // console.log(err);
                // console.log('ERROR: Could not connect to the protected route');
                // res.sendStatus(403);
                res.send({
                    "Status": 403,
                    "Message": err.Message
                })
            } else {
                dbClient.query(`Select * from public."Login"`, (err, result) => {
                    if (!err) {
                        res.send(result.rows);
                    }
                });
                dbClient.end;
            }
        })
    });
    app.get('/user/userinfo', checkToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, authorizedData) => {
            if (err) {
                // console.log(err);
                // console.log('ERROR: Could not connect to the protected route');
                // res.sendStatus(403);
                res.send({
                    "Status": 403,
                    "Message": err.Message
                })
            } else {
                dbClient.query(`select 
                *
            from public."UserInfo" ui
                inner join public."SexualOrientations" so on so."ID" = ui."OrientationID"
            where
                ui."UserID" = 1`, (err, result) => {
                    if (!err) {
                        res.send(result.rows);
                    }
                });
                dbClient.end;
            }
        })
    });
    app.get('/user/newMatches', checkToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, authorizedData) => {
            if (err) {
                // console.log(err);
                // console.log('ERROR: Could not connect to the protected route');
                // res.sendStatus(403);
                res.send({
                    "Status": 403,
                    "Message": err.Message
                })
            } else {

                res.send([
                    {
                        "Name": "Cindy Vd Merwe"
                    },
                    {
                        "Name": "Melany Olivier"
                    },
                    {
                        "Name": "Stacy Frisby"
                    },
                    {
                        "Name": "Ashleigh Tisdale"
                    },
                    {
                        "Name": "Mila Kunis"
                    }
                ]);

                //     dbClient.query(`select 
                //     *
                // from public."UserInfo" ui
                //     inner join public."SexualOrientations" so on so."ID" = ui."OrientationID"
                // where
                //     ui."UserID" = 1`, (err, result) => {
                //         if (!err) {
                //             res.send(result.rows);
                //         }
                //     });
                //     dbClient.end;
            }
        })
    });
    app.get('/user/userinterests', checkToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, authorizedData) => {
            if (err) {
                // console.log(err);
                // console.log('ERROR: Could not connect to the protected route');
                // res.sendStatus(403);
                res.send({
                    "Status": 403,
                    "Message": err.Message
                })
            } else {
                dbClient.query(`
                select 
                    *
                from 
                    public."UserInterests"
                where "UserID" = 1 ;
                `, (err, result) => {
                    if (!err) {
                        res.send(result.rows);
                    }
                });
                dbClient.end;
            }
        })
    });
    dbClient.connect();
}


//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {

        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}