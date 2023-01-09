import express from 'express';
import keys from './keys.js';

import sequelize from './database/conectDB.js';

/*quizas sea mejor inicializarlos desde un modulo con sync*/
import { userSchema } from './models/user.js';
import { postSchema } from './models/post.js';
import { comentarySchema } from './models/comentary.js';
import { likeSchema } from './models/like.js';
import { followerSchema } from './models/followers.js';

//routes
import auth_router from './routes/auth_routes.js';
import user_router from './routes/user_routes.js';
import post_router from './routes/post_routes.js';
import coment_router from './routes/comentary_routes.js';
import follower_routes from './routes/follower_routes.js';
import likes_router from './routes/like_routes.js';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(auth_router);
app.use(user_router);
app.use(follower_routes);
app.use(post_router);
app.use(coment_router);
app.use(likes_router);

async function main() {

    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(keys.server_port, () => {
            console.log("server on port: " + keys.server_port);
        });
    } catch (error) {
        console.log(error.message);
    }
};

main();

