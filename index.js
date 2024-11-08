const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token from BotFather
const bot = new TelegramBot('7535617272:AAG3trQrqhs2EKMC9NBcnCkiOHXegbcMA3w', { polling: true });
const walletAddresses = {
    BTC: [
        '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
        'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080',
        '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
        '1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY',
        '3Ai1JZ8pdJb2ksieUV8FsxSNVJCpoPi8W6',
        'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf00rf',
        '1Ez69SnzzmePmZX3WpEzMKTrcBF2gpNQ55',
        '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC',
        'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        '12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S',
        '3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd'
    ],
    LTC: [
        'LY2ZfVjcQ3czcjtY68gK7wfJXjVHZj2gLx',
        'LcHKtqL8dKnNn8Y7q6RZLfoF9fQdyQzZKd',
        'LZTj4tPc9vLzNfYJpeDqqfvWypZfR7RTrB',
        'LV5uKXnRprybKtMTzdXXKf8c6Zy8e1Fm1J',
        'Ld8yWgNtWRCXaiLNi67FQQppFcRJc3HGnB',
        'LT7xtFZwWgpyEKsnYFv9BPApWuYX8AmXZ3',
        'LU4RmV7RsrFXpd8gL4t28V5LNffpzeA4mG',
        'LLDQmHYYFwv9DyK55ApHShyUazjxqVUnQE',
        'LaZYBv7PrPrD76svZbBhMPr3oYtR6EZMnJ',
        'Lg3osB3xusxTir4nDbUkW3w6DktR3emTAE',
        'LUHD6D5FQDpftQxCMkqqHhx1W7EcAKkY5d',
        'LLW9rKpi9knRuESj3WEjUVRDt5YYQxsQFo'
    ],
    USDT: [
        'TQpX8Rxyva5Z7ntFe9gyYPoJ1CrBs3k6gd',
        'TGm4csShAtyQURunipjyPZRtdPiH7U1HRR',
        'TVhHtXhvNxZZGn9csdmUDmUVgyRtYFo3SA',
        'TXrY8LZ7KTPZTAXQ6uy7WakdjWmVpF9GHU',
        'THkXSoU8F3fCg9ytJLD9QJ3MhrD4EQzAm2',
        'TJ7YiLPHrCszJ5UZoBaMNRPnRx2UoVGQ5h',
        'TYsnxu2dzLUukokgh7EoTK68GhzUm1zMjA',
        'TPYNb3ndbnk1DpDhLbVVxGhdcmTJBNnRWr',
        'TH6ZcTP3kLiujBeN9brVP5W8WDtD3T4XYP',
        'TPXwXeEzFcNokmfWZaJ7C4tkPBpE6VybFg',
        'TWjDLCuHZakZKN78cLoFWYNGk8Vugtk3CF',
        'TAz6hhgniybL7hbT98vNS7bwE3b4SztdFB'
    ]
};

const purchaseOptions = [
    { text: 'Premium 1 Day - $70', price: 70 },
    { text: 'Premium 2 Days - $120', price: 120 },
    { text: 'Premium 3 Days - $190', price: 190 },
    { text: 'Premium 1 Week - $360', price: 360 },
    { text: 'Premium 1 Month - $800', price: 800 }
];

const cryptoOptions = ['Bitcoin', 'LTC', 'USDT (Tron)'];

// Store user selections
const userSelections = {};

// Command to handle the /start message
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const startMessage = `
OTP Bot Commands 

🚩Basic Commands
📂 /start - Shows the welcome message
📂 /purchase - Shows link to our shop
📂 /redeem <license> - Redeem a license key
📂 /aboutme - Check your subscription details
📂 /help - Contact our support

                        
                
📞BASIC CALL COMMANDS
📂 /call - Use this to capture OTP of your target service!
📂 /callerid - Use this to view caller IDs of popular targets! (RECOMMENDED)


💵FINANCE
📂 /paypal - PayPal preset
📂 /venmo - Venmo preset
📂 /coinbase - Coinbase preset
📂 /cashapp - Cashapp preset
📂 /xbank - Bank Mode includes name 🏦
📂 /xbank_fr - Bank Mode (French Accent) 🏦 (under rework)
📂 /email - Email Mode 📧 
📂 /speed - Call Via One Line Commands⚡
📂 /amazon : Amazon OTP Mode 🤑
📂 /vbv: Verified By VISA Mode 💳
📂 /apple: ApplePay Mode 📱
📂 /google: GooglePay Mode 📱
📂 /samsung: SamsungPay Mode 📱 
📂 /paypalx: Paypalx OTP Mode 🤑
📂 /logs: OTP + CC Capture Mode 💳 
📂 /logx: CC Capture Mode 💳 
📂 /carrier: Carrier PIN Mode 📶 
📂 /zelle: Zelle Mode 🏦
  
                                      

⚙️Advance Commands
📂 /custom - Call using your custom config                                    
📂 /newconfig - Create a new custom config
📂 /deleteconfig <config_name> - Delete your config
📂 /myconfigs - List all of your configs
📂 /editconfig <config_name> - Edit/show your custom config


⚙️ Settings
📂 /voicemail on|off - Turn on/off voicemail detection
📂 /setvoice - Set a new default voice, this will be used for all your calls                     
📂 /mode auto|manual - Set capture mode, manual = ends capture with #, auto = ends capture if more than digit counts


ℹ️ Only send the OTP when the bot specifically tells you to
ℹ️ Customer service is end to end encrypted
ℹ️ Type /cancel to exit any mode before placing new call`;
    bot.sendMessage(chatId, startMessage);
});

// Command to handle the /purchase message
bot.onText(/\/purchase/, (msg) => {
    const chatId = msg.chat.id;

    const purchaseMessage = `
Please select a purchase option:
PREMIUM: REGULAR + CALLER ID SPOOFING (DOES NOT COME WITH DPGP/PGP) 🚀
PGP/DPGP IS NOT PRESENT IN THIS BOT! PM @Anon_Wealth for DPGP LINE (SPOOFER)🚀
READ THE DESCRIPTION ABOVE CLOSELY, IF YOU BOUGHT THE WRONG KEY YOU WILL HAVE TO BUY THE CORRECT ONE AGAIN.
NO REFUNDS WILL BE MADE ❌
`;

    // Create inline keyboard with purchase options
    const options = {
        reply_markup: {
            inline_keyboard: purchaseOptions.map(option => [
                {
                    text: option.text,
                    callback_data: JSON.stringify({ type: 'purchase', price: option.price })
                }
            ])
        }
    };

    bot.sendMessage(chatId, purchaseMessage, options);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    bot.answerCallbackQuery(query.id);

    if (typeof data === 'string' && data.startsWith('{')) {
        // JSON data for purchase
        const parsedData = JSON.parse(data);
        if (parsedData.type === 'purchase') {
            userSelections[chatId] = parsedData.price;
            const cryptoOptionsMarkup = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'BTC', callback_data: 'crypto_BTC' }],
                        [{ text: 'LTC', callback_data: 'crypto_LTC' }],
                        [{ text: 'USDT (Tron)', callback_data: 'crypto_USDT' }]
                    ]
                }
            };
            bot.sendMessage(chatId, 'Please choose your cryptocurrency for payment:', cryptoOptionsMarkup);
        }
    } else if (data.startsWith('crypto_')) {
        // Handle cryptocurrency selection
        const selectedCrypto = data.split('_')[1];
        const amountInUSD = userSelections[chatId];

        if (amountInUSD !== undefined) {
            let exchangeRate, walletAddress;
            switch (selectedCrypto) {
                case 'BTC':
                    exchangeRate = 68643.60;
                    walletAddress = walletAddresses.BTC[Math.floor(Math.random() * walletAddresses.BTC.length)];
                    break;
                case 'LTC':
                    exchangeRate = 66.93;
                    walletAddress = walletAddresses.LTC[Math.floor(Math.random() * walletAddresses.LTC.length)];
                    break;
                case 'USDT':
                    exchangeRate = 1;
                    walletAddress = walletAddresses.USDT[Math.floor(Math.random() * walletAddresses.USDT.length)];
                    break;
                default:
                    bot.sendMessage(chatId, '⚠️ Invalid cryptocurrency option.');
                    return;
            }

            const amountToPay = (amountInUSD / exchangeRate).toFixed(6);
            const uniquePaymentID = Math.floor(100000000 + Math.random() * 900000000);
const invoiceMessage = `
🔑 Invoice For Your Plan License

1. Send the Exact Amount: $${amountInUSD}
- Address: \${walletAddress}\
- Amount to Pay in ${selectedCrypto}: ${amountToPay}
- It's crucial to send the exact amount specified to ensure your payment is correctly processed.
            
2. Your Unique Payment ID: ${uniquePaymentID}
- Keep this ID handy. You'll need it to check your payment status and for any support queries.
            
3. After Sending Your Payment:
- Payments are confirmed on the blockchain. This process can take some time, depending on network activity.
                 
4. Awaiting Your Subscription Key:
- Once your payment is confirmed, your subscription key will be automatically allocated to you. This key grants access to your Premium 1 day License.
            
5. Need Help?
- If you don't receive your subscription key within 1 hour after the payment, or if you encounter any issues, please contact our support team at @Anon_Wealth. Have a screenshot of your payment ready to help us assist you faster.
            
📌 Important:
- The subscription key will be allocated after the payment is confirmed on the blockchain. Please be patient, as blockchain confirmations can vary in time.
            
Thank you for choosing us! We're excited to have you on board
`
            
            bot.sendMessage(chatId, invoiceMessage);
        } else {
            bot.sendMessage(chatId, '⚠️ Please select a purchase option first using /purchase.');
        }
    }
});
// Command to handle the /help message
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = 'Please Message @Anon_Wealth for assistance 🆘';
    bot.sendMessage(chatId, helpMessage);
});

// Command to handle the /aboutme message
bot.onText(/\/aboutme/, (msg) => {
    const chatId = msg.chat.id;
    // Dummy data for demonstration, replace with your logic to fetch user details
    const userInfo = {
        username: msg.from.username || 'Unknown',
        userId: msg.from.id,
        activeSubscription: 'Premium 3-Day License',
        licenseExpiry: '3 days from activation',
        recentPurchases: ['Premium 1 Week', 'Premium 1 Month']
    };

//     const aboutMeMessage = `
// ℹ️ Your Account Overview

// 👤 Username: @${userInfo.username}
// 🆔 User ID: ${userInfo.userId}

// 🔑 Active Subscription: ${userInfo.activeSubscription}
// ⏳ License Expiry: ${userInfo.licenseExpiry}

// 💰 Recent Purchases: ${userInfo.recentPurchases.join(', ')}

// Note: Ensure that your subscription details are up to date. Contact support if there are any discrepancies.

// For further assistance or questions, use the /help command.
//     `;
const aboutMeMessage = 'Please first make subscription to the plan by /purchase'
    bot.sendMessage(chatId, aboutMeMessage);
});