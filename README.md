# Treeder 🌳🍃

> A web-based game of conquests… and trees

* * *

## Introduction

Based on [external data](https://data.gov.be/en/node/48556), we will create a WebApp consisting of a REST-like API (back-end) and a React SPA (front-end). This WebApp will consist be an online [IDLE Game](https://en.wikipedia.org/wiki/Incremental_game), based in Liège.

## Treeder - game rules

In a map of Liège, there will be trees. Each tree as a _value_ (which is the product of his _diameter_ by his _height_, *rounded to top*). 

> This value will use the "leaf" as unit. For instance, a tree of 9m of diameter and 17.3m of size will have a value of (`9 × 17.3 = 155.7 ≈ 156`) **156 leaves**.

When a player enter the game, he needs to create an account, will choose a color, and will receive three random, *free* trees (and some bonus leaves, following the formula: `[total leaves of players] / [amount of players]`).  
Every fifteen minutes **in real life**, each player will receive an amount of leaves equals to the total of each of his trees.  
Every hour **in real life**, each player loose half his leaves.

Whenever he wants, a player can _buy_ a tree. 

- If the tree is *free*, the _value_ of the tree is its price. When a player buy a *free tree*, a [random name](https://www.npmjs.com/package/fantasy-name-generator) is affected to that tree.
- If the tree belongs to another player, the price is computed with the following formula: `[value of the targetted tree] + ([value of all the targetted player's trees in 100m radius] × ([amount of trees in 100m radius] / [amount of tree of targetted player in 100m radius])) + [value of all the other players trees in 100m radius] - [value of all your tree in 100m radius]`.

Whenever he wants, a player can *lock* a tree by paying the following formula: `[value of the tree] × 10 + ([value of all the trees in 100m radius] × [amount of players in 100m radius]) - ([value of all player's trees in 100m radius] / [amount of players in 100m radius])`. A *locked tree* can't be buy by another player.

At anytime, a player can check the *leaderboard*, to see each player score, amount of trees, etc.  
At anytime, a player can consult the *gamelog*, which record all actions in the game.

When clicking on a tree, a player can see its value, name, owner, history of buys, and a link to the relative wikipedia article for this tree's species (if applicable). Any player can also leave a comment on a tree.

### Data

We are using the data of the trees in the JSON file stored in the `data` folder. These data came from the [Belgium OpenData Initiative website](https://data.gov.be).

We will need to convert and store the data into a database.

### Interactive map

**StadiaMaps**.

### Mockup & Design

We are going to make our own design with a custom graphic chart.

### Technical Stack

#### Back-end

A `REST-like API` using:

- **Node.JS**
- **MySql**

#### Front-end

A `Single Page App` using:

- **React**
- **StadiaMaps**

#### Toolchain / Dev Env

The project is divided in two distinct parts: back-end and front-end. We prepared a starter with a premade dev environment that can be used again for other following projects. 

##### Environment

##### Back-end

We son't know yet what we are going to use to compile the back-end. The back-end's code is located in  `src/server`.
 

##### Front-end

For the front-end part our code will be compiled/packaged with [Vite](https://vitejs.dev/). The code is written in `src/client`.

Like the back-end part, we prepared a little snippet of code displaying a React component with the text "*Hello, World*".


* * *

