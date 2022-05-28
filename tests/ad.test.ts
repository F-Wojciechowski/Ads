import {AddReccord} from "../records/add.reccord";

test("Can build AdRecord", ()=>{
    const ad = new AddReccord({
        name: 'Test name',
        description: 'dadad',
        lat: 0,
        lon: 0,
        url: 'https://wp.pl',
        price: 5,
    });
    expect(ad.name).toBe('Test name')
});
test("Validate invalid price", ()=>{
    expect(()=> new AddReccord({
        name: 'Test name',
        description: 'dadad',
        lat: 0,
        lon: 0,
        url: 'https://wp.pl',
        price: -5,
    })).toThrow("Cena nie może być większa niż 999999")
})