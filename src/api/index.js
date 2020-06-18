import { Router } from 'express'
import leagueRouter from './leagues/routes'
import teamRouter from './teams/routes'
import playerRouter from './players/routes'

const router = new Router()

router.use('/leagues', leagueRouter)
router.use('/teams', teamRouter)
router.use('/players', playerRouter)

export default router
