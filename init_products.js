const products = [
    { 
        id: 1, 
        name: "Melody Maker", 
        shortDescription: "A perfect instrument for creating beautiful melodies.", 
        fullDescription: "teste",
        brand: "Harmony Instruments", 
        category: "Guitars", 
        mainImage: "img/image2.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "40 x 15 x 5",
        weight: 3.5,
        cost: null,
        details: "Includes a built-in tuner and a set of strings."
    },
    { 
        id: 2, 
        name: "Rhythm Ruler", 
        shortDescription: "Keep your beats in check with this reliable metronome.", 
        fullDescription: "teste",
        brand: "Tempo Tech", 
        category: "Percussion", 
        mainImage: "img/image5.jpeg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "5 x 3 x 1",
        weight: 0.5,
        cost: null,
        details: "Features multiple time signatures and sounds."
    },
    { 
        id: 3, 
        name: "Vocal Vortex", 
        shortDescription: "Enhance your vocal performance with this premium mic.", 
        fullDescription: "teste",
        brand: "Sonic Sound", 
        category: "Microphones", 
        mainImage: "img/image2.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "10 x 5 x 5",
        weight: 1.2,
        cost: null,
        details: "Includes a pop filter and a stand."
    },
    { 
        id: 4, 
        name: "Bass Blaster", 
        shortDescription: "Experience deep bass like never before with this speaker.", 
        fullDescription: "teste",
        brand: "Bassline Beats", 
        category: "Speakers", 
        mainImage: "img/image3.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: false, // Exemplo de produto fora de estoque
        dimensions: "12 x 10 x 10",
        weight: 8.0,
        cost: null,
        details: "Bluetooth enabled with deep bass technology."
    },
    { 
        id: 5, 
        name: "Treble Triumph", 
        shortDescription: "A treble booster for those high notes!", 
        fullDescription: "teste",
        brand: "Sound Surge", 
        category: "Effects Pedals", 
        mainImage: "img/image.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "6 x 4 x 2",
        weight: 1.0,
        cost: null,
        details: "Perfect for electric guitars."
    },
    { 
        id: 6, 
        name: "Chord Conductor", 
        shortDescription: "Master your chords with this innovative app.", 
        fullDescription: "teste",
        brand: "Chordify Co.", 
        category: "Apps", 
        mainImage: "img/image3.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "",
        weight: 10,
        cost: null,
        details: "Available on iOS and Android."
    },
    { 
        id: 7, 
        name : "Harmony Hub", 
        shortDescription : "The ultimate mixer for all your sound needs.",
        fullDescription: "teste",
        brand : "MixMaster Pro" ,
        category : "Mixers" ,
        mainImage: "img/image.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled : true, 
        inStock : true, 
        dimensions : "12 x 8 x 4",
         weight : 2.5, 
         cost: null,
         details : "Features multiple inputs and outputs."
    },
    { 
        id : 8,
        name : "Beat Box Pro",
        shortDescription : "Create beats on the go with this portable device." ,
        fullDescription: "teste",
        brand : "Rhythm Republic",
        category : "Drum Machines",
        mainImage: "img/image2.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled : true, 
        inStock : true, 
        dimensions : "10 x 6 x 3", 
        weight : 1.8, 
        cost: null,
        details : "Includes various drum sounds and patterns."
    },
    {
    id: 9,
        name: "Lyric Legend",
        shortDescription: "Write and organize your lyrics effortlessly.",
        fullDescription: "teste",
        brand: "Songwriter's Companion",
        category: "Software",
        mainImage: "img/image4.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "",
        weight: 0,
        cost: null,
        details: "Perfect for songwriters and poets."
    },
    {
        id: 10,
        name: "Stage Star",
        shortDescription: "A compact stage setup for live performances.",
        fullDescription: "teste",
        brand: "Live Sound Solutions",
        category: "Stage Equipment",
        mainImage: "img/image.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "24 x 18 x 6",
        weight: 15.0,
        cost: null,
        details: "Includes lights and sound equipment."
    },
    {
        id: 11,
        name: "Sonic Synthesizer",
        shortDescription: "Craft unique sounds with this advanced synthesizer.",
        fullDescription: "teste",
        brand: "SynthWave Instruments",
        category: "Synthesizers",
        mainImage: "img/image5.jpeg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "18 x 12 x 4",
        weight: 3.0,
        cost: null,
        details: "Features multiple sound banks and presets."
    },
    {
        id: 12,
        name: "Echo Enhancer",
        shortDescription: "Add depth to your recordings with echo effects.",
        fullDescription: "teste",
        brand: "Echo Labs",
        category: "Effects Units",
        mainImage: "img/image4.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "8 x 6 x 2",
        weight: 1.0,
        cost: null,
        details: "Perfect for studio recordings."
    },
    {
        id: 13,
        name: "Fretboard Wizard",
        shortDescription: "Learn guitar chords and scales like a pro.",
        fullDescription: "teste",
        brand: "Guitar Guru Inc.",
        category: "Learning Tools",
        mainImage: "img/image.jpg",
        extraImages: null,
        price: null,
        discount: null,
        enabled: true,
        inStock: true,
        dimensions: "N/A",
        weight: 0.5,
        cost: null,
        details: "Includes an instructional guide."
    }
]


if (!localStorage.getItem('products')) {
   localStorage.setItem('products', JSON.stringify(products));
}
