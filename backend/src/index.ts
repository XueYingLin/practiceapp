import cors from 'cors';
import { Child, Session } from './types';
import express from 'express';
import { Request, Response } from 'express';

const app = express()
app.use(express.json())
app.use(cors())

var children: Child[] = [
  {
    name: "Michael",
    total_seconds: 0,
    picture: "https://storage.googleapis.com/discobubble-quiz/IMG_2071.jpg",
    logged_in: true
  },
  {
    name: "Caitlin",
    total_seconds: 0,
    picture: "https://storage.googleapis.com/discobubble-quiz/IMG_3196.jpg",
    logged_in: true
  },
  {
    name: "Dan",
    total_seconds: 0,
    picture: "https://storage.googleapis.com/discobubble-quiz/country_detail_pokemon.png"
  }
]

type QueryParams = {
  childId: number
}

app.post("/api/children/:childId/session", (req: Request<QueryParams, {}, Session, {}>, res: Response) => {
  children[req.params.childId].total_seconds += req.body.elapsed_seconds
  res.json(req.body)
})

app.get("/api/children", (req: Request, res: Response) => {
  // Sort the children by their practice time, descending.
  children.sort((a, b) => b.total_seconds - a.total_seconds)

  res.json(children)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
