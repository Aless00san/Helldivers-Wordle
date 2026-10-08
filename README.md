
# Helldivers Worlde

This project takes inspiration on Wordle and Stratagem Hero, it was made as a learning experiencie and it takes absolutely no profit on intellectual property
### Tech Stack

This is a full-stack web application but the client and server layers are separated and can be deployed on different machines if needed

### Server

- Express.js 5.1.0

- Axios 1.11.0

- Prisma 6.13.0

-  Jest 30.0.5

- Dotenv 17.2.1

- SQLite

### Client

- React 18.3.1

- Vite 7.1.2

## Environment Variables

### Server
To run this project, you will need to add the following environment variables to your .env file inside /server

`DATABASE_URL`

`DISCORD_CLIENT_ID`

`DISCORD_CLIENT_SECRET`

`FRONTEND_URL`

## Local Deployment Steps (Single Machine/VPS)

One box serves static frontend + proxies `/api|/auth|/game|/user` to Express, SQLite file stays on local disk.

1. **DNS + host prep**
   - Point `A` record (e.g. `yourdomain.xyz`) to your machine IP.
   - Install Node 22, pnpm 11, Nginx, Certbot on your machine.
2. **Deploy code**
   ```bash
   git clone https://github.com/Aless00san/Helldivers-Wordle.git
   cd Helldivers-Wordle
   pnpm install --frozen-lockfile
   # Make sure server/.env has at least DATABASE_URL pointing to an actual sqlite file by this point:
   pnpm build
   # DB (requiered on first deploy):
   npx --prefix server prisma migrate deploy
   pnpm seed
   ```

   Note: Do NOT re-run `seed` on every deploy (it deletes stratagems). Back up the SQLite file before migrations

## Try it out

A live version of this web app is running on [02082024.xyz](https://02082024.xyz), although it's still in development, is fully playable right now

## Acknowledgements

 - [Wordle](https://www.nytimes.com/games/wordle/index.html)
 - [Helldivers](https://www.arrowheadgamestudios.com/aboutarrowhead/games/)

## License

- [GNU](https://choosealicense.com/licenses/gpl-3.0/)

