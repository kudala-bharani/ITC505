const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

// Middleware
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib route handler with styled response
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { adjective1, noun1, verb1, adverb1, noun2 } = req.body;
    
    // Check if all fields are filled
    if (!adjective1 || !noun1 || !verb1 || !adverb1 || !noun2) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <title>Mad Lib Error</title>
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Space Grotesk', sans-serif;
                        background-image: url('https://ideogram.ai/assets/image/lossless/response/D_xPRLScSKCjYxBKm3O-jA');
                        background-size: cover;
                        background-position: center;
                        background-attachment: fixed;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                    }
                    .error-container {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                        padding: 2rem;
                        max-width: 500px;
                    }
                    h1 { color: #ff4081; }
                    a {
                        display: inline-block;
                        background-color: #3f51b5;
                        color: white;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        margin-top: 1rem;
                        transition: background-color 0.3s ease;
                    }
                    a:hover {
                        background-color: #1a237e;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>🚨 Oops! Submission Failed</h1>
                    <p>Please fill out ALL fields in your space adventure story!</p>
                    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
                </div>
            </body>
            </html>
        `);
        return;
    }
    
    // Create the styled mad lib story response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Your Space Adventure Story</title>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Space Grotesk', sans-serif;
                    background-image: url('https://ideogram.ai/assets/image/lossless/response/D_xPRLScSKCjYxBKm3O-jA');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 1rem;
                }
                .story-container {
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    padding: 2rem;
                    max-width: 600px;
                    text-align: center;
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                h1 {
                    color: #1a237e;
                    margin-bottom: 1rem;
                }
                .story-text {
                    line-height: 1.6;
                    color: #333;
                }
                .highlighted {
                    color: #ff4081;
                    font-weight: bold;
                }
                .action-link {
                    display: inline-block;
                    background-color: #3f51b5;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    margin-top: 1rem;
                    transition: background-color 0.3s ease;
                }
                .action-link:hover {
                    background-color: #1a237e;
                }
            </style>
        </head>
        <body>
            <div class="story-container">
                <h1>🚀 Your Cosmic Tale Unfolds!</h1>
                <div class="story-text">
                    <p>
                        Once upon a time, in the vast expanse of the universe, there was a 
                        <span class="highlighted">${adjective1}</span> 
                        <span class="highlighted">${noun1}</span> 
                        who loved to <span class="highlighted">${verb1}</span>. 
                        One day, while <span class="highlighted">${adverb1}</span> 
                        exploring the uncharted regions of space, they discovered a mysterious 
                        <span class="highlighted">${noun2}</span>. 
                        This extraordinary encounter would change their cosmic journey forever!
                    </p>
                </div>
                <a href="/ITC505/lab-7/index.html" class="action-link">Create Another Space Story 🌠</a>
            </div>
        </body>
        </html>
    `);
});

const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

let port = 80
if (process.argv[2] === 'local') {
    port = 8080
}

server.listen(port, () => console.log('Ready on localhost!'))