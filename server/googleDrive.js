const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const async = require('async');

// Import the emailer
const nodemailer = require('nodemailer');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const offkiemail = "offki@offkiproductions.com"

module.exports = class GoogleDriveAPI {
    constructor(credentialsJsonLocation){
        this.authorize = this.authorize.bind(this);
        this.assignDrive = this.assignDrive.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.authorize = this.authorize.bind(this);
        this.sendOffKiErrorNotice = this.sendOffKiErrorNotice.bind(this);

        this.drive = {};

        // Load client secrets from a local file.
        fs.readFile(credentialsJsonLocation, (err, content) => {
          if (err) return console.error('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Drive API.
          this.authorize(JSON.parse(content), this.assignDrive);
        });

        // Nodemailer used to notify Off Ki Productions of errors happening with their GMail automated account.
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

    }

    sendOffKiErrorNotice(err) {  // Send order confirmation email to purchaser
        let mailOptions = {
          from: process.env.EMAIL_NAME,
          to: offkiemail,
          subject: 'IMPORTANT: Website Error Notification!!',
          text: err
        };
      
        this.transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.error(error);
          } else {
            console.error('Error message sent to ' + offkiemail);
          }
        });
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return this.getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

      
    /**
     * Assigns the authorized google drive to the drive global varaible.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    assignDrive(auth) {
        this.drive = google.drive({version: 'v3', auth});
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES
        //   prompt: "consent" // - Forces the consent page.  Provides refresh token.
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
          });
        });
      }

    /**
     * Lists the names and IDs of up to 10 files.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    providePermissionsToSong(songName, description, email) {
        // First, find the ID of the folder for the license tier
        var licenseTier = description.split("License Tier: ")[1]
        var mimeType = "mimeType = 'application/vnd.google-apps.folder' and name = '" + licenseTier + " Packages'";

        this.drive.files.list({
            pageSize: 1,
            fields: 'nextPageToken, files(id, name)',
            q: mimeType
        }, (err, res) => {
            // Handle errors finding the license tier directory
            if (err) {
                console.error('The API returned an error: ' + err);
                this.sendOffKiErrorNotice("Google Drive Error - Failed to find " + licenseTier + " Package/ directory on Google Drive.  Google Error Message = " + err);
            }

            const files = res.data.files;
            if (files.length) {
                console.log('License Directory Found: ' + licenseTier + " Packages/");
                files.map((file) => {
                    mimeType = "mimeType = 'application/vnd.google-apps.folder' and name = '" + songName + "' and '" + file.id + "' in parents";
                    this.drive.files.list({
                        pageSize: 1,
                        fields: 'nextPageToken, files(id, name)',
                        q: mimeType
                    }, function(nestedErr, nestedRes) {
                        const nestedFiles = nestedRes.data.files;
                        // Handle errors finding the song name directory
                        if (nestedErr) {
                            console.error('The API returned an error: ' + nestedErr);
                            this.sendOffKiErrorNotice("Google Drive Error - Failed to execute search for " + songName + "Within the " + licenseTier + " Package/ directory on Google Drive.  Google Error Message = " + JSON.stringify(nestedErr));
                        }

                        if (nestedFiles.length) {
                            var permissions = [{
                                'type' : 'user',
                                'role' : 'reader',
                                'emailAddress' : email
                            }];

                            nestedFiles.map((nestedFile) => {
                                // Using the NPM module 'async'
                                async.eachSeries(permissions, function (permission) {
                                    this.drive.permissions.create({
                                        resource: permission,
                                        fileId: nestedFile.id,
                                        fields: 'id',
                                    }, function (err, res) {
                                        if (err) {
                                            // Handle error...
                                            console.error(err);
                                            this.sendOffKiErrorNotice(JSON.stringify(err));
                                        } else {
                                            console.log('Permission ID: ', res.data.id);
                                        }
                                    });
                                }.bind(this), function (err) {
                                    if (err) {
                                        // Handle error
                                        console.error(err);
                                        this.sendOffKiErrorNotice("Failed to provide permissions to " + email + " for the song " + songName + " " + licenseTier);
                                    } else {
                                        // All permissions inserted
                                        console.log("Successfully provided permissiosn to: " + email);
                                    }
                                });
                            });
                        } else {
                            console.error('No Song directory found for: ' + songName + "/");
                            this.sendOffKiErrorNotice("Google Drive Error - Failed to find " + songName + "/ directory within the " + licenseTier + " Package/ directory on Google Drive.  Please check that the website matches the Google Drive directory name!  -  Also provide the customer at " + email + " with their music since they failed to receive " + songName + " " + licenseTier);
                        }
        
                    }.bind(this));
                });
            } else {
                console.error('No license directory found for: ' + licenseTier);
                this.sendOffKiErrorNotice('No license directory found for: ' + licenseTier);
            }
        });
    }
}
