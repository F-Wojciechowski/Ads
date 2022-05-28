import {AdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
interface NewAdEntity extends Omit<AdEntity, 'id'>{
    id?: string;
}

type AdRecordResults = [AdEntity[], FieldPacket[]]
export class AddReccord implements AdEntity{
   public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;
    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100){
            throw new ValidationError('Nazwa nie może być pusta ani przekraczać 100 znaków')
        }
        if(obj.description.length > 1024){
            throw new ValidationError('Opis nie może być dłuższy niz 1000znaki')
        }
        if(obj.price < 0 || obj.price > 999999 ){
            throw new ValidationError('Cena nie może być większa niż 999999')
        }
        if(obj.url.length < 1){
            throw new ValidationError('Musisz podać link do ogłoszenia')
        }
        if(typeof obj.lat !=='number'|| typeof obj.lon !=="number"){
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }
        this.name = obj.name;
        this.description = obj.description;
        this.id = obj.id;
        this.lon = obj.lon;
        this.lat = obj.lat
        this.price = obj.price
        this.url = obj.url
    }
    static async getOne(id: string): Promise<AddReccord | null> {
      const [results] = await pool.execute("SELECT * FROM `ads` WHERE id= :id", {
            id
        }) as AdRecordResults
        return results.length === 0 ? null : new AddReccord(results[0])
    }
    static async findAll(name: string):Promise<SimpleAdEntity[]> {
       const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults
        return results.map(result => {
            const {id, lat, lon} = result;
            return{id, lat, lon}
        });
    }

    async insert():Promise<void> {
        if(!this.id){
            this.id = uuid()
        }else {
            throw new Error("cannot insert same id!")
        };
        await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)", this)
    }
}