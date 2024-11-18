const products = [
    { 
        id: 1, 
        name: "Melody Maker", 
        description: "A perfect instrument for creating beautiful melodies.", 
        brand: "Harmony Instruments", 
        category: "Guitars", 
        image: "img/image2.jpg",
        enabled: false,
        inStock: true,
        dimensions: "40 x 15 x 5",
        weight: 3.5,
        details: "Includes a built-in tuner and a set of strings."
    },
    { 
        id: 2, 
        name: "Rhythm Ruler", 
        description: "Keep your beats in check with this reliable metronome.", 
        brand: "Tempo Tech", 
        category: "Percussion", 
        image: "img/image5.jpeg",
        enabled: true,
        inStock: true,
        dimensions: "5 x 3 x 1",
        weight: 0.5,
        details: "Features multiple time signatures and sounds."
    },
    { 
        id: 3, 
        name: "Vocal Vortex", 
        description: "Enhance your vocal performance with this premium mic.", 
        brand: "Sonic Sound", 
        category: "Microphones", 
        image: "img/image2.jpg",
        enabled: true,
        inStock: true,
        dimensions: "10 x 5 x 5",
        weight: 1.2,
        details: "Includes a pop filter and a stand."
    },
    { 
        id: 4, 
        name: "Bass Blaster", 
        description: "Experience deep bass like never before with this speaker.", 
        brand: "Bassline Beats", 
        category: "Speakers", 
        image: "img/image3.jpg",
        enabled: true,
        inStock: false, // Exemplo de produto fora de estoque
        dimensions: "12 x 10 x 10",
        weight: 8.0,
        details: "Bluetooth enabled with deep bass technology."
    },
    { 
        id: 5, 
        name: "Treble Triumph", 
        description: "A treble booster for those high notes!", 
        brand: "Sound Surge", 
        category: "Effects Pedals", 
        image: "img/image.jpg",
        enabled: true,
        inStock: true,
        dimensions: "6 x 4 x 2",
        weight: 1.0,
        details: "Perfect for electric guitars."
    },
    { 
        id: 6, 
        name: "Chord Conductor", 
        description: "Master your chords with this innovative app.", 
        brand: "Chordify Co.", 
        category: "Apps", 
        image: "img/image3.jpg",
        enabled: true,
        inStock: true,
        dimensions: "",
        weight: 10,
        details: "Available on iOS and Android."
    },
    { 
        id: 7, 
        name : "Harmony Hub", 
        description : "The ultimate mixer for all your sound needs.",
        brand : "MixMaster Pro" ,
        category : "Mixers" ,
        image : "img/image.jpg",
        enabled : true, 
        inStock : true, 
        dimensions : "12 x 8 x 4",
         weight : 2.5, 
         details : "Features multiple inputs and outputs."
    },
    { 
        id : 8,
        name : "Beat Box Pro",
        description : "Create beats on the go with this portable device." ,
        brand : "Rhythm Republic",
        category : "Drum Machines",
        image : "img/image2.jpg",
        enabled : true, 
        inStock : true, 
        dimensions : "10 x 6 x 3", 
        weight : 1.8, 
        details : "Includes various drum sounds and patterns."
    },
    {
    id: 9,
        name: "Lyric Legend",
        description: "Write and organize your lyrics effortlessly.",
        brand: "Songwriter's Companion",
        category: "Software",
        image: "img/image4.jpg",
        enabled: true,
        inStock: true,
        dimensions: "",
        weight: 0,
        details: "Perfect for songwriters and poets."
    },
    {
        id: 10,
        name: "Stage Star",
        description: "A compact stage setup for live performances.",
        brand: "Live Sound Solutions",
        category: "Stage Equipment",
        image: "img/image.jpg",
        enabled: true,
        inStock: true,
        dimensions: "24 x 18 x 6",
        weight: 15.0,
        details: "Includes lights and sound equipment."
    },
    {
        id: 11,
        name: "Sonic Synthesizer",
        description: "Craft unique sounds with this advanced synthesizer.",
        brand: "SynthWave Instruments",
        category: "Synthesizers",
        image: "img/image5.jpeg",
        enabled: true,
        inStock: true,
        dimensions: "18 x 12 x 4",
        weight: 3.0,
        details: "Features multiple sound banks and presets."
    },
    {
        id: 12,
        name: "Echo Enhancer",
        description: "Add depth to your recordings with echo effects.",
        brand: "Echo Labs",
        category: "Effects Units",
        image: "img/image4.jpg",
        enabled: true,
        inStock: true,
        dimensions: "8 x 6 x 2",
        weight: 1.0,
        details: "Perfect for studio recordings."
    },
    {
        id: 13,
        name: "Fretboard Wizard",
        description: "Learn guitar chords and scales like a pro.",
        brand: "Guitar Guru Inc.",
        category: "Learning Tools",
        image: "img/image.jpg",
        enabled: true,
        inStock: true,
        dimensions: "N/A",
        weight: 0.5,
        details: "Includes an instructional guide."
    }
]


if (!localStorage.getItem('products')) {
   localStorage.setItem('products', JSON.stringify(products));
}
