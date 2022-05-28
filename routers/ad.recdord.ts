import {Router} from "express";
import {AddReccord} from "../records/add.reccord";

export const adRouter = Router()
    .get("/search/:name?", async (req, res)=>{
    const ads = await AddReccord.findAll(req.params.name ?? "" );
        res.json(ads)
    })
    .get('/:id', async (req, res) =>{
        const ad = await AddReccord.getOne(req.params.id);
        res.json(ad)
})
    .post('/', async (req,res)=>{
        const ad = new AddReccord(req.body);
        await ad.insert();
        res.json(ad)
    })