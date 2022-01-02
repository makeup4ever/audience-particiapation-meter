# Garnet
> Automatic market maker on Stellar Network

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![dependencies Status][david-image]][david-url]

**Garnet** is a market-maker bot for the [Stellar network](https://www.stellar.org). It automatically creates *offers* on the market depending on its wallets and on market prices.

Its main goal is not to earn money but to help the *expansion* and introduction of *anchors* into Stellar network. It allows anchors to diffuse their assets, and users to send path payments with assets they do not hold. It is made to play the essential role of real market-makers until there are enough players on the network.

This repository shows my original idea to strengthen the network and to show a proof-of-concept implementation. It is not intended to be used on public network for now, but to serve as a starter-kit for an anchor.

The bot is launched with an account seed created specifically for it. It first checks his trustlines and balances. Then it creates **passive offers** for everything the account holds, with rates defined by an **oracle**.
The Oracle is an independent module that tells the bot prices and amount to sell for a pair of assets.

In this project, there are three different oracles:
- One very basic, that sells everything it holds for a price of 1:1 (`oracles/simple.js`)
- One that fetch current market prices of common currences (USD, EUR, BTC, ...) from public APIs (currently [Fixer.io](https://fixer.io)) (`oracles/realWorld.js`)
- One that reads prices and amount in a *Redis* database. (`oracles/redis.js`)


## Use case

When an anchor wants to get into the stellar network, no one holds its assets. There must be market makers that trust this new anchor to allow path payments and trading of its assets. At the very beginning, an anchor can become its own market maker, choose to trust some others anchor's assets, inject its own asset into the bot and get others assets in exchange. The bot will then, lose anchor assets, but gain others. 
The anchor must invest money into the market, but it will get others currencies claimable on the real world afterwards.
At the end, the anchor assets will be flowing on the network and exchanged by Stellar users.
To stay fair and not to lose money, the bot must use an oracle that announce correct market prices.

## Running demo

You can watch the current balances and offers for on our demo bot running on testnet on [Stellar Portal](https://stellar-portal.ngfar.io/?accountId=GDEROTTYIQZSVLECX2DDBZVLSPCRZAMUP5V7JRH2GTNYG3XJ3TAJ3KNG)

https://stellar-portal.ngfar.io/?accountId=GDEROTTYIQZSVLECX2DDBZVLSPCRZAMUP5V7JRH2GTNYG3XJ3TAJ3KNG

On this account, you can see that the bot holds EUR, USD, and BTC and has offers with current market prices. If you send it assets, you will see that it is updating his offers. *(If you want to receive some assets, send us a message with your public key and we will fund you)*

## Running

You can run your own bot and test its behaviour on the testnet. You can use tools like [Stellar Portal](https://stellar-portal.ngfar.io/) or [Stellar Laboratory](https://www.stellar.org/laboratory) for managing and monitoring bot accounts.

- Create a bot account
- Create some issuer accounts, create trus