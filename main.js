// Requirements
const Discord = require('discord.js');
var fs = require('fs');
const GantiJSONString = require('replace-json-property');
let MathSolver = require('math.solver');
const Calculator = new MathSolver.Calculator;
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const bulan = new Date();
const lineReader = require('line-reader');

// Configurations (Setting)
const { owner, prefix, token, haspermission } = require('./configuration/botconfig.json')
const { money, rpsLimit, } = require('./configuration/starterpack.json')
const { rpsLimit_price } = require(`./configuration/storeprice.json`)

function logCoy(teksnya, teksnyaLagi) {
    console.log(`${teksnya} SAMAAA ${teksnyaLagi}`)
}

client.on('ready', () => {
    console.log("ACTIVE NOW! :)")
});

// Only for user who have registered
client.on("message", message => {
// Create teh arguments
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if(message.content.startsWith(prefix)) {
// Local database file path
const databasePath = `./database/${message.author.id}.json`
const bannedUserPath = `./banned/${message.author.id}.json`

// detection
const isBanned = fs.existsSync(`./banned/${message.author.id}.json`)
// All function
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}

function isOwner(id) {
    if(owner == id) {
        return true;
    } else {
        return false;
    }
}

function isthatLetter(character) {
	try {
		eval("let " + character + ";");
		let regExSpecial = /[^\$_]/;
    		return regExSpecial.test(character);
  	} catch (error) {
    		return false;
  	}
}

function saveLimit(userid, howmuch) { // Give RPS Limit
    if(!fs.existsSync(`./database/${user}.json`)) {
        console.log("Player/users not found")
    }
    GantiJSONString.replace(`./database/${user}.json`, 'rpsLimit', howmuch)
}

function DoAPayment(price) { // Price is, the ITEMS price
    const { money } = require(databasePath)
    if(money >= price) {
        return true // Succes
    } else {
        return false // Failed
    }
}
    /*** COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND ****/
    /*** COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND ****/
    /*** COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND COMMAND ****/
    if(fs.existsSync(databasePath)) {
    try {
        if(isBanned == true) {
            message.reply(`You have been banned from this bot!`)
            return;
        }
        // The users has registered so. lets give them command
            if(command == "hi") {
                message.reply("this your first command!...")
            } else {
                if(command == "unregister") {
                    fs.unlinkSync(databasePath);
                    message.reply("youre now unregistered!");
                } else {
                if(command == "inventory") {
                    if(fs.existsSync(databasePath)) {
                    const { money, rpsLimit, name } = require(databasePath)
                    lineReader.eachLine(databasePath, function(accountdata) {
                        message.reply("```json\n" + accountdata + "```")
                    })
                      } else {
                    message.reply("somethign went wrong");
                      }
                   } else {
                if(command == "unregisterperson") {
                    if(message.author.id == owner || message.author.id == haspermission) {
                    const thePerson = args[0]
                    if(!thePerson) { // the Blank Message
                        message.reply(`idk whos thats, ${prefix}unregisterperson <author id>`)
                    } else {
                    const path = `./database/${thePerson}.json`
                    if(fs.existsSync(path)) {
                        fs.unlinkSync(path) // We unregister the person. <delete from db>
                        message.reply("succes unregister the person!") // Gave the notify
                    } else {
                        message.reply("No users with ID" + thePerson + "")
                    }
                    }
                    //here
                    } else {
                        message.reply("only owner/admin can do that.")
                    }
                     } else {
                         if(command == "rps") {
                             const { rpsLimit } = require(databasePath)
                             function deleteLimit() {
                                const limitresult = Calculator.substract(rpsLimit, 1) // Delete the limit '1'
                                GantiJSONString.replace(databasePath, `rpsLimit`, limitresult)
                                console.log("Limits reduced!")
                             }
                             const apayangdikeluarkan = [ "rock", "paper", "scissors" ]
                             // Create the system
                             const userThrow = args[0] // User RPS
                             if(userThrow == "rock" || userThrow == "paper" || userThrow == "scissors") {
                                 console.log("new RPS game started!")
                             } else {
                                 message.reply(`usage : ${prefix}rps (your throw) || ${prefix}rps rock`)
                                 return;
                             }
                             const sendrsendrandmoney = between(100, 2000)
                             const botThrow = apayangdikeluarkan[Math.floor(Math.random() * apayangdikeluarkan.length)] // Bot
                             // We make it as function
                             function playRPS() {
                                function loseMessage() {
                                    message.reply(`You lost!, i throw ${botThrow}, and you ${userThrow}`)
                                    return;
                                }

                                function tieMessage() {
                                    message.reply(`DRAW!, i throw ${botThrow}, and you ${userThrow}`)
                                    return;
                                }

                                function winMessage() {
                                    const { money } = require(databasePath)
                                    const moneyresult = Calculator.add(money, sendrsendrandmoney)
                                    message.reply(`You win! congrats! bot thrown ${botThrow} and you ${userThrow}! congrats and ${sendrsendrandmoney}k money has been added to your bag`)
                                    GantiJSONString.replace(databasePath, `money`, moneyresult)
                                }
                                deleteLimit() // min
                                
                                //Start
                                if(botThrow == "rock") {
                                    if(userThrow == "scissors") {
                                        loseMessage()
                                    } else {
                                        if(userThrow == "rock") {
                                            tieMessage()
                                        } else {
                                            if(userThrow == "paper") {
                                                winMessage()
                                            }
                                        }
                                    }
                                } else {
                                    if(botThrow == "paper") {
                                        if(userThrow == "scissors") {
                                            winMessage()
                                        } else {
                                            if(userThrow == "rock") {
                                                loseMessage()
                                            } else {
                                                if(userThrow == "paper") {
                                                    tieMessage()
                                                }
                                            }
                                        }
                                    } else {
                                        if(botThrow == "scissors") {
                                            if(userThrow == "scissors") {
                                                tieMessage()
                                            } else {
                                                if(userThrow == "rock") {
                                                    winMessage()
                                                } else {
                                                    if(userThrow == "paper") {
                                                        loseMessage()
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                             } 
                // then play it
                playRPS() // sorry for bad code!
                         } else {
                         if(command == "store") {
                         let storeText = `
Store Bot
- rps limit - price : ${rpsLimit_price} (Get 5)
- Next items will be added soon!`
message.reply(storeText)
                         } else {
                            if(command == "buy") {
                                const buywhat = args[0]
                                const { money, rpsLimit } = require(databasePath)
                                if(!buywhat) {
                                    message.reply("what to buy?")
                                    return;   
                                }

                                // Our first STORE!
                                if(buywhat == "rpslimit" || buywhat == "rps" || buywhat == "limit") {
                                    if(DoAPayment(rpsLimit_price) == true) {
                                    const replaceTheyLimit = Calculator.add(rpsLimit, 5) // ADD THEY LIMIT
                                    const replaceTheyMoney = Calculator.substract(money, rpsLimit_price)
                                    GantiJSONString.replace(databasePath, 'money', replaceTheyMoney)
                                    GantiJSONString.replace(databasePath, 'rpsLimit', replaceTheyLimit)
                                    message.reply("Succes bought rps limit! your limit is now (5)!")
                                    } else {
                                    message.reply("Your money is not enough for this ITEMS")
                                    }

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

                                }    
                            }
                        } else {
                            if(command == "ban") {
                            if(!isOwner(message.author.id)) {
                            message.reply("not a bot owner!")
                            return;
                            }
                            const person = args[0]
                            const reason = args[1]
                            const reasonWrite = args.slice(1).join(' ');
                            if(!reason) {
                                message.reply(`usage ${prefix}ban 999999 cheating`)
                            }
                            if(isthatLetter(person) == true) {
                                message.reply("please send the userid! not a username")
                                return;
                            }
                            const contentTowrite = `{ "reason": "${reasonWrite}" }`
                            fs.writeFileSync(bannedUserPath, contentTowrite)
                            client.users.fetch(person, false).then((user) => {
                                user.send(`you have been banned from this bot for reason: ${reasonWrite}`);
                            });
                            message.reply(`${person} has banned for ${reasonWrite}`)
                            } else {
                            if(command == "unban") {
                            if(!isOwner(message.author.id)) {
                            message.reply("not a bot owner!")
                            return;
                            }
                            const person = args[0]
                            if(!person) {
                                message.reply("user id?")
                                return;
                            }
                            if(isthatLetter(person) == true) {
                                message.reply("please send the userid! not a username")
                                return;
                            }
                            fs.unlinkSync(bannedUserPath)
                            client.users.fetch(person, false).then((user) => {
                                user.send(`you have been unbanned from this bot!`);
                            });
                            message.reply(`${person} has unbanned from this bot!`)
                            }
                            }
                        }
                    }
                }
            }
        }
    }
}
    } catch(e) {
    message.reply(e) // post the err
    return;
}
        } else {
            if(command == "register") {
        
            } else {
                message.reply(`idk who are you, try to ${prefix}register`)
            }
        }
}
})

// And here. the command only for users who didnt registered.
client.on("messageCreate", message => {

// Create teh arguments
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
// Local database file path
const databasePath = `./database/${message.author.id}.json`

if(command == "register") {
    const hisName = args[0];
    if(!hisName) {
        message.reply(`registered without name? thats a Crazy ;Think. ${prefix}register frenzy`)
    } else {
    if(fs.existsSync(databasePath)) {
    // They already registered. so what they want?
        message.reply("register, since u are already? how?!");
    } else {
const content = `{ "name": "${hisName}", "id": "${message.author.id}", "rpsLimit": ${rpsLimit}, "money": "${money}" }`;
fs.writeFileSync(databasePath, content);
message.reply("succes registered!")
    }
    }
}

})

client.login(token);