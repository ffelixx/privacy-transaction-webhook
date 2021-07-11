const express = require('express');
const axios = require('axios')
const app = express();
const { webhook } = require('./config.json')

app.use(express.json())
app.listen(process.env.PORT || 5000, () => {
  console.log("Server live")
})

app.post('/transaction', (req, res) => {
  res.status(200);
  res.send('Success')
  const e = req.body.merchant.descriptor.toLowerCase()
  axios({
    method: 'post',
    url: webhook,
    data: {
      "embeds": [{
        "title": "New Privacy Transaction",
        "url": "https://privacy.com/transactions",
        "color": 1367124,
        "fields": [{
            "name": "Amount",
            "value": `$${(req.body.amount * .01).toFixed(2)}`,
            "inline": true
          },
          {
            "name": "Merchant",
            "value": e.charAt(0).toUpperCase() + e.slice(1),
            "inline": true
          },
          {
            "name": "Card",
            "value": `${req.body.card.memo} - ${req.body.card.last_four}`,
            "inline": true
          }
        ]
      }]
    }
  })
})