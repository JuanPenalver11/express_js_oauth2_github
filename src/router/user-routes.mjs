import { Router } from "express";
import passport from "passport";
import '../strategies/github-strategies.mjs'

const route = Router()

route.get('/api/login', passport.authenticate('github'))

route.get('/api/github/redirect', passport.authenticate('github'), (request, response)=>{
    response.sendStatus(200)
})

export default route