define({ "api": [
  {
    "type": "get",
    "url": "/leagues/allLeagues",
    "title": "Get all leagues",
    "name": "Get_Leagues",
    "group": "leagues",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5eeb0d9b84b5ac340b21de99\",\n        \"title\": \"3F Superliga\",\n        \"logo\": \"https://www.pesmaster.com/pes-2020/graphics/leaguelogos/emb_0128.png?w=36\",\n        \"link\": \"https://www.pesmaster.com/3f-superliga/pes-2020/league/128/\",\n        \"code\": \"3f-superliga\",\n        \"__v\": 0\n    },\n    {\n        \"_id\": \"5eeb0d9b84b5ac340b21de90\",\n        \"title\": \"AFC Champions League\",\n        \"logo\": \"https://www.pesmaster.com/pes-2020/graphics/leaguelogos/emb_0008.png?w=36\",\n        \"link\": \"https://www.pesmaster.com/afc-champions-league/pes-2020/league/8/\",\n        \"code\": \"afc-champions-league\",\n        \"__v\": 0\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/leagues/routes.js",
    "groupTitle": "leagues"
  },
  {
    "type": "get",
    "url": "/players/allPlayersInTeam",
    "title": "Get all Players in Team",
    "name": "Get_Players",
    "group": "players",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamId",
            "description": "<p>Team id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n      \"_id\": \"5eeb2cf305f7c739ba3a88bb\",\n      \"stats\": {\n          \"ovr\": \"73\",\n          \"pas\": \"64\",\n          \"sht\": \"45\",\n          \"str\": \"74\",\n          \"def\": \"65\",\n          \"spd\": \"60\",\n          \"dri\": \"60\"\n      },\n      \"name\": \"J. Rinne\",\n      \"logo\": \"https://www.pesmaster.com/pes-2020/graphics/players/player_117357.png\",\n      \"link\": \"https://www.pesmaster.com/j-rinne/pes-2020/player/117357/\",\n      \"country\": \"https://www.pesmaster.com/pes-2019/graphics/nteamlogos/flag_SWE.png?w=40\",\n      \"age\": \"26\",\n      \"height\": \"188\",\n      \"position\": \"GK\",\n      \"code\": \"j-rinne\",\n      \"teamId\": \"5eeb10e1cd8b5734f90d082f\",\n      \"__v\": 0\n    },\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/players/routes.js",
    "groupTitle": "players"
  },
  {
    "type": "get",
    "url": "/teams/allTeamsInLeague",
    "title": "Get all Teams in League",
    "name": "Get_Teams",
    "group": "teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "leagueId",
            "description": "<p>League id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n      \"_id\": \"5eeb10e1cd8b5734f90d082f\",\n      \"stat\": \"67\",\n      \"name\": \"Aab\",\n      \"logo\": \"https://www.pesmaster.com/pes-2020/graphics/teamlogos/e_001818.png?w=36\",\n      \"link\": \"https://www.pesmaster.com/aab/pes-2020/team/1818/\",\n      \"code\": \"aab\",\n      \"leagueId\": \"5eeb0d9b84b5ac340b21de99\",\n      \"__v\": 0,\n      \"stats\": {\n          \"attack\": \"66\",\n          \"defence\": \"66\",\n          \"midfield\": \"69\"\n      }\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/teams/routes.js",
    "groupTitle": "teams"
  }
] });
