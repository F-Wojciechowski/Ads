import {AddReccord} from "../records/add.reccord";
import {pool} from "../utils/db";
afterAll(async ()=>{
    await pool.end();
})
test('AdRecord returns data from db one entry', async()=>{

    const ad = await AddReccord.getOne('abc');
    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');

});

test('AdRecord.findall returns array of found entries', async()=>{
    const ads = await AddReccord.findAll('');
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findall returns array of found entries when searching for "a"', async()=>{
    const ads = await AddReccord.findAll('');
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})
test('Addrecord.insert return new UUID', async()=>{
    const ad = new AddReccord({
            name: 'Test name2',
            description: 'dadad',
             lat: 0,
            lon: 0,
            url: 'https://wp.pl',
            price: 5,
        });

  await ad.insert();
  expect(ad.id).toBeDefined();
})