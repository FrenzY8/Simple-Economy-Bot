# Economy Bot ( with Register System )
- A Discord.js economy bot without any database module needed. only saved on your pc's
- > Installtation
- npm install // npm i

# Commands
> Player (User)
- rps
- inventory
- store
- buy
- register
- unregister
# MORE COMMAND WILL BE UPDATED LATER.

> Owner
- unregisterperson
- ban
- unban

# Configurations
- Open ```configuration/botconfig.json``` file or click [here](https://github.com/FrenzY8/Simple-Economy-Bot/blob/main/configuration/botconfig.json)
```json
{
    "token": "token",
    "owner": "owner-account-id",
    "prefix": "-"
}
```

# Starter Pack Edit
- Look at ```configuration/starterpack``` and edit them whenever you want,
- For what is this?
- if the bot get new user, they'll get money & items like this (below/down)
```json
{
    "NOTED": "THIS CONFIGURATION IS FOR A NEW USER WHO HAS REGISTERED IN YOUR BOT",
    "money": 10000,
    "rpsLimit": 3,
    "gambleLimit": 3
}
```

# Store Modif
- See at ```main.js``` line **234** then you can add your items there, and set your price at [here](https://github.com/FrenzY8/Simple-Economy-Bot/blob/main/configuration/storeprice.json)
```js
// Next store (you can create your own)
if(buywhat == "ITEMS/ASSETSNAME" || buywhat == "ITEMS/ASSETSNAME" || buywhat == "ITEMS/ASSETSNAME") {
    const price = `/*** PUT THE PRICE HERE, OR SET IT ON STOREPRICE.JSON **/`
        if(DoAPayment(price) == true) {
     // give em
const replaceTheyLimit = Calculator.add(rpsLimit, 5) // ADD THEY LIMIT
const replaceTheyMoney = Calculator.substract(money, price)
    // replace em
GantiJSONString.replace(databasePath, 'money', replaceTheyMoney)
GantiJSONString.replace(databasePath, 'rpsLimit', replaceTheyLimit)
    // notify
message.reply("Succes bought SOME ITEMS NAME! your limit is now MAX (5)!")
    } else {
message.reply("Your money is not enough for this ITEMS")
}
```
