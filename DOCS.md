# apidoc-pes2020-api v0.0.1

apiDoc Pes 2020 stats

- [leagues](#leagues)
	- [Get all leagues](#get-all-leagues)
	
- [players](#players)
	- [Get all Players in Team](#get-all-players-in-team)
	
- [teams](#teams)
	- [Get all Teams in League](#get-all-teams-in-league)
	


# leagues

## Get all leagues



	GET /leagues/allLeagues


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
    {
        "_id": "5eeb0d9b84b5ac340b21de99",
        "title": "3F Superliga",
        "logo": "https://www.pesmaster.com/pes-2020/graphics/leaguelogos/emb_0128.png?w=36",
        "link": "https://www.pesmaster.com/3f-superliga/pes-2020/league/128/",
        "code": "3f-superliga",
        "__v": 0
    },
    {
        "_id": "5eeb0d9b84b5ac340b21de90",
        "title": "AFC Champions League",
        "logo": "https://www.pesmaster.com/pes-2020/graphics/leaguelogos/emb_0008.png?w=36",
        "link": "https://www.pesmaster.com/afc-champions-league/pes-2020/league/8/",
        "code": "afc-champions-league",
        "__v": 0
    }
  ]
```
# players

## Get all Players in Team



	GET /players/allPlayersInTeam


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| teamId			| String			|  <p>Team id</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
    {
      "_id": "5eeb2cf305f7c739ba3a88bb",
      "stats": {
          "ovr": "73",
          "pas": "64",
          "sht": "45",
          "str": "74",
          "def": "65",
          "spd": "60",
          "dri": "60"
      },
      "name": "J. Rinne",
      "logo": "https://www.pesmaster.com/pes-2020/graphics/players/player_117357.png",
      "link": "https://www.pesmaster.com/j-rinne/pes-2020/player/117357/",
      "country": "https://www.pesmaster.com/pes-2019/graphics/nteamlogos/flag_SWE.png?w=40",
      "age": "26",
      "height": "188",
      "position": "GK",
      "code": "j-rinne",
      "teamId": "5eeb10e1cd8b5734f90d082f",
      "__v": 0
    },
  ]
```
# teams

## Get all Teams in League



	GET /teams/allTeamsInLeague


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| leagueId			| String			|  <p>League id</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
[
    {
      "_id": "5eeb10e1cd8b5734f90d082f",
      "stat": "67",
      "name": "Aab",
      "logo": "https://www.pesmaster.com/pes-2020/graphics/teamlogos/e_001818.png?w=36",
      "link": "https://www.pesmaster.com/aab/pes-2020/team/1818/",
      "code": "aab",
      "leagueId": "5eeb0d9b84b5ac340b21de99",
      "__v": 0,
      "stats": {
          "attack": "66",
          "defence": "66",
          "midfield": "69"
      }
    }
  ]
```

