const axios = require('axios');

// createBot: instancia el código principal con la base de datos y el proveedor
// createProvider: instancia el código del proveedor
// createFlow: instancia todos los flujos del ChatBot
// addKeyword: strings de activación de flujos
// EVENTS.WELCOME: activar un flujo con un string cualquiera
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')


// Portal QR de sesiones
const QRPortalWeb = require('@bot-whatsapp/portal')

// Proveedor de conexión a WhatpsApp
const BaileysProvider = require('@bot-whatsapp/provider/baileys')

// Adaptador de datos en memoria
const MockAdapter = require('@bot-whatsapp/database/mock')

// Variables de entorno
const dotenv = require('dotenv');
dotenv.config();

// Flujos hijos -------------------------------------------------------------->
const flujoSaludo = addKeyword(['hola', 'buenas', 'saludos'])
    .addAnswer('¡Bienvenido al WhatsApp de El Embeleco! ¿En qué podemos ayudarlo? ☺');

const flujoDespedida = addKeyword(['chao', 'adios', 'gracias'])
    .addAnswer('¡Muchas gracias! ☺');


// Flujo padre -------------------------------------------------------------->


// Función principal
const main = async () => {

    const adapterDB = new MockAdapter()
    const adapterProvider = createProvider(BaileysProvider)
    const adapterFlow = createFlow([

        flujoSaludo,
        flujoDespedida

        // Flujo padre

    ])

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

// Función de ejecución del ChatBot
main()
