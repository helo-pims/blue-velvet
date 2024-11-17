const products = [
    { id: 1, name: "Melody Maker", description: "A perfect instrument for creating beautiful melodies.", brand: "Harmony Instruments", category: "Guitars", image: "img/image2.jpg" },
    { id: 2, name: "Rhythm Ruler", description: "Keep your beats in check with this reliable metronome.", brand: "Tempo Tech", category: "Percussion", image: "img/image5.jpeg" },
    { id: 3, name: "Vocal Vortex", description: "Enhance your vocal performance with this premium mic.", brand: "Sonic Sound", category: "Microphones", image: "img/image2.jpg" },
    { id: 4, name: "Bass Blaster", description: "Experience deep bass like never before with this speaker.", brand: "Bassline Beats", category: "Speakers", image: "img/image3.jpg" },
    { id: 5, name: "Treble Triumph", description: "A treble booster for those high notes!", brand: "Sound Surge", category: "Effects Pedals", image: "img/image.jpg" },
    { id: 6, name: "Chord Conductor", description: "Master your chords with this innovative app.", brand: "Chordify Co.", category: "Apps", image: "img/image3.jpg" },
    { id: 7, name: "Harmony Hub", description: "The ultimate mixer for all your sound needs.", brand: "MixMaster Pro", category: "Mixers", image: "img/image.jpg" },
    { id: 8, name: "Beat Box Pro", description: "Create beats on the go with this portable device.", brand: "Rhythm Republic", category: "Drum Machines", image: "img/image2.jpg" },
    { id: 9, name: "Lyric Legend", description: "Write and organize your lyrics effortlessly.", brand: "Songwriter's Companion", category: "Software", image: "img/image4.jpg" },
    { id: 10, name: "Stage Star", description: "A compact stage setup for live performances.", brand: "Live Sound Solutions", category: "Stage Equipment", image: "img/image.jpg" },
    { id: 11, name: "Sonic Synthesizer", description: "Craft unique sounds with this advanced synthesizer.", brand: "SynthWave Instruments", category: "Synthesizers", image: "img/image5.jpeg" },
    { id: 12, name: "Echo Enhancer", description: "Add depth to your recordings with echo effects.", brand: "Echo Labs", category: "Effects Units", image: "img/image4.jpg" },
    { id: 13, name: "Fretboard Wizard", description: "Learn guitar chords and scales like a pro.", brand:"Guitar Guru Inc.", category:"Learning Tools", image:"img/image.jpg"}
];


if (!localStorage.getItem('products')) {
   localStorage.setItem('products', JSON.stringify(products));
}
