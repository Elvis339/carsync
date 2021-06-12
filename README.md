## Requirements
1. MySQL 5+
1. Node.js
1. Yarn

## Installation
1. `yarn install`
1. Create one `.env` file copy/paste values from the `.env.example`
1. Rename `ormconfig.example` to `ormconfig.json` this is used for the cli and it is required
1. Create a databse in MySQL make sure to give it the same name as you did in the `.env`
1. Run `./bin/cli mig:run` to run the migrations
1. `yarn run dev` should start the app

### Routes
1. `http://127.0.0.1:5000` is the app host and port by default (you can change it).
1. `/api/v1/regiser` - Initiates registration & creates security code & sends it to your email
1. `/api/v1/verify/:code` - Make sure to pass your code from email `:code` - Verifies your email & creates a new account returns jwt token
1. `/api/v1/login` - `{ email: string, password: string }` returns jwt token
1. `/api/v1/change-password` - `{ currentPassword: string; newPassword: string }` change your password.