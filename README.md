# Getting Started

- First, you should install the dependencies:

    ```bash
    yarn install
    ```

- Rename `.env.development` to `.env` and then,

- Run postgresql on your computer

- Run this commant on terminal:

    ```bash
    npx prisma migrate reset
    ```
- Run this commant on terminal:

    ```bash
    node prisma/CategorySeeder.js
    ```
- Run the development server:

    ```bash
    yarn dev
    ```

## API Specification

- [User API Spec](docs/user.md)
- [Learning Content API Spec](docs/learning-content.md)
- [Game API Spec](docs/game.md)
- [Category API Spec](docs/category.md)

## Tech Stack
![Alt Text](https://skillicons.dev/icons?i=js,express,postgres,prisma)
