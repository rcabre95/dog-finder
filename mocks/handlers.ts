import { rest } from 'msw';

export const handlers = [
    rest.post(`/auth/login`, (req, res, ctx) => {
        return res(ctx.status(200))
    }),
    rest.post(`/auth/logout`, (req, res, ctx) => {
        return res(ctx.status(200))
    }),
    rest.get(`/dogs/breeds`, (req, res, ctx) => {
        return res(ctx.status(200),
        ctx.json({
            breeds: [ "Affenpinscher", "Afghan Hound", "African Hunting Dog", "Airedale", "American Staffordshire Terrier", "Appenzeller", "Australian Terrier", "Basenji", "Basset", "Beagle", "Bedlington Terrier", "Bernese Mountain Dog", "Black-and-tan Coonhound", "Blenheim Spaniel", "Bloodhound", "Bluetick", "Border Collie", "Border Terrier", "Borzoi", "Boston Bull", "Bouvier Des Flandres", "Boxer", "Brabancon Griffon", "Briard", "Brittany Spaniel", "Bull Mastiff", "Cairn", "Cardigan", "Chesapeake Bay Retriever", "Chihuahua", "Chow", "Clumber", "Cocker Spaniel", "Collie", "Curly-coated Retriever", "Dandie Dinmont", "Dhole", "Dingo", "Doberman", "English Foxhound", "English Setter", "English Springer", "EntleBucher", "Eskimo Dog", "Flat-coated Retriever", "French Bulldog", "German Shepherd", "German Short-haired Pointer", "Giant Schnauzer", "Golden Retriever", "Gordon Setter", "Great Dane", "Great Pyrenees", "Greater Swiss Mountain Dog", "Groenendael", "Ibizan Hound", "Irish Setter", "Irish Terrier", "Irish Water Spaniel", "Irish Wolfhound", "Italian Greyhound", "Japanese Spaniel", "Keeshond", "Kelpie", "Kerry Blue Terrier", "Komondor", "Kuvasz", "Labrador Retriever", "Lakeland Terrier", "Leonberg", "Lhasa", "Malamute", "Malinois", "Maltese Dog", "Mexican Hairless", "Miniature Pinscher", "Miniature Poodle", "Miniature Schnauzer", "Newfoundland", "Norfolk Terrier", "Norwegian Elkhound", "Norwich Terrier", "Old English Sheepdog", "Otterhound", "Papillon", "Pekinese", "Pembroke", "Pomeranian", "Pug", "Redbone", "Rhodesian Ridgeback", "Rottweiler", "Saint Bernard", "Saluki", "Samoyed", "Schipperke", "Scotch Terrier", "Scottish Deerhound", "Sealyham Terrier", "Shetland Sheepdog", "Shih-Tzu", "Siberian Husky", "Silky Terrier", "Soft-coated Wheaten Terrier", "Staffordshire Bullterrier", "Standard Poodle", "Standard Schnauzer", "Sussex Spaniel", "Tibetan Mastiff", "Tibetan Terrier", "Toy Poodle", "Toy Terrier", "Vizsla", "Walker Hound", "Weimaraner", "Welsh Springer Spaniel", "West Highland White Terrier", "Whippet", "Wire-haired Fox Terrier", "Yorkshire Terrier"
            ],
            status: 200
        }))
    }),
    rest.post(`/locations/search`, (req, res, ctx) => {
        return res(ctx.json([ "60004", "60005", "60006", "60007", "60009", "60016", "60017", "60018", "60019", "60022", "60025", "60026", "60029", "60038", "60043", "60053", "60055", "60056", "60062", "60065", "60068", "60070", "60076", "60077", "60078" ]))
    }),
    rest.get(`/dogs/search`, (req, res, ctx) => {
        return res(ctx.json({ resultIds: [ "ZXGFTIcBOvEgQ5OCx8w8", "mnGFTIcBOvEgQ5OCx6Qn", "LHGFTIcBOvEgQ5OCx5cg", "b3GFTIcBOvEgQ5OCx8U4", "fXGFTIcBOvEgQ5OCx9VB", "qXGFTIcBOvEgQ5OCx6Yo", "-HGFTIcBOvEgQ5OCx64s", "NHGFTIcBOvEgQ5OCx6kp", "6XGFTIcBOvEgQ5OCx9ZC", "a3GFTIcBOvEgQ5OCx849", "wHGFTIcBOvEgQ5OCx6Im", "hXGFTIcBOvEgQ5OCx48Z", "a3GFTIcBOvEgQ5OCx6sq", "yXGFTIcBOvEgQ5OCx5oi", "O3GFTIcBOvEgQ5OCx5Aa"],
        total: 15}))
    }),
    rest.post(`/dogs`, (req, res, ctx) => {
        return res(ctx.json({
            dogs: [
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02110806-basenji/n02110806_5114.jpg",
                    "name": "Carlee",
                    "age": 10,
                    "breed": "Basenji",
                    "zip_code": "60043",
                    "id": "ZXGFTIcBOvEgQ5OCx8w8"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_4070.jpg",
                    "name": "Anjali",
                    "age": 11,
                    "breed": "Beagle",
                    "zip_code": "60068",
                    "id": "mnGFTIcBOvEgQ5OCx6Qn"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02088632-bluetick/n02088632_4686.jpg",
                    "name": "Neoma",
                    "age": 2,
                    "breed": "Bluetick",
                    "zip_code": "60026",
                    "id": "LHGFTIcBOvEgQ5OCx5cg"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02096585-Boston_bull/n02096585_507.jpg",
                    "name": "Kaylah",
                    "age": 8,
                    "breed": "Boston Bull",
                    "zip_code": "60026",
                    "id": "b3GFTIcBOvEgQ5OCx8U4"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02096177-cairn/n02096177_4916.jpg",
                    "name": "Destany",
                    "age": 7,
                    "breed": "Cairn",
                    "zip_code": "60029",
                    "id": "fXGFTIcBOvEgQ5OCx9VB"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02100735-English_setter/n02100735_1534.jpg",
                    "name": "Christ",
                    "age": 8,
                    "breed": "English Setter",
                    "zip_code": "60005",
                    "id": "qXGFTIcBOvEgQ5OCx6Yo"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_7238.jpg",
                    "name": "Verna",
                    "age": 2,
                    "breed": "German Shepherd",
                    "zip_code": "60076",
                    "id": "-HGFTIcBOvEgQ5OCx64s"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02105056-groenendael/n02105056_3679.jpg",
                    "name": "Orlo",
                    "age": 6,
                    "breed": "Groenendael",
                    "zip_code": "60019",
                    "id": "NHGFTIcBOvEgQ5OCx6kp"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02093859-Kerry_blue_terrier/n02093859_428.jpg",
                    "name": "Lauriane",
                    "age": 0,
                    "breed": "Kerry Blue Terrier",
                    "zip_code": "60062",
                    "id": "6XGFTIcBOvEgQ5OCx9ZC"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02110063-malamute/n02110063_18782.jpg",
                    "name": "Jesus",
                    "age": 13,
                    "breed": "Malamute",
                    "zip_code": "60022",
                    "id": "a3GFTIcBOvEgQ5OCx849"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02085936-Maltese_dog/n02085936_2999.jpg",
                    "name": "Alejandrin",
                    "age": 5,
                    "breed": "Maltese Dog",
                    "zip_code": "60018",
                    "id": "wHGFTIcBOvEgQ5OCx6Im"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02086079-Pekinese/n02086079_2209.jpg",
                    "name": "Sandy",
                    "age": 3,
                    "breed": "Pekinese",
                    "zip_code": "60038",
                    "id": "hXGFTIcBOvEgQ5OCx48Z"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02105855-Shetland_sheepdog/n02105855_7708.jpg",
                    "name": "Kamron",
                    "age": 14,
                    "breed": "Shetland Sheepdog",
                    "zip_code": "60038",
                    "id": "a3GFTIcBOvEgQ5OCx6sq"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02086240-Shih-Tzu/n02086240_5994.jpg",
                    "name": "Myrtice",
                    "age": 10,
                    "breed": "Shih-Tzu",
                    "zip_code": "60076",
                    "id": "yXGFTIcBOvEgQ5OCx5oi"
                },
                {
                    "img": "https://frontend-take-home.fetch.com/dog-images/n02098286-West_Highland_white_terrier/n02098286_484.jpg",
                    "name": "Felipe",
                    "age": 2,
                    "breed": "West Highland White Terrier",
                    "zip_code": "60009",
                    "id": "O3GFTIcBOvEgQ5OCx5Aa"
                }
            ],
            total: 15
        }))
    }),
    rest.post(`/dogs`, (req, res, ctx) => {
        return res(ctx.json({
            dog: {
                id: "string",
                img: "string",
                name: "string",
                age: 0,
                zip_code: "string",
                breed: "string"
            },
            status: 200
        }))
    }),
    rest.post(`/dogs/match`, (req, res, ctx) => {
        return res(ctx.json("abcdefg"))
    }),
    rest.post(`${process.env.NEXT_PUBLIC_HOME_URL}/api/send-mail`, (req, res, ctx) => {
        return res(ctx.status(200))
    })
]