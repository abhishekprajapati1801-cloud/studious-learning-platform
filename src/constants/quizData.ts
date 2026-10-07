export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface SubjectQuiz {
  [grade: string]: Question[];
}

export const quizData: Record<string, SubjectQuiz> = {
  Maths: {
    "11th": [
      { id: 1, question: "What is the value of sin(90°)?", options: ["0", "1", "0.5", "-1"], correctAnswer: 1 },
      { id: 2, question: "The set of all possible outcomes of an experiment is called?", options: ["Event", "Sample Space", "Outcome", "Probability"], correctAnswer: 1 },
      { id: 3, question: "Derivative of x^2 is?", options: ["x", "2x", "x^2", "2"], correctAnswer: 1 },
      { id: 4, question: "What is the slope of a horizontal line?", options: ["1", "Undefined", "0", "-1"], correctAnswer: 2 },
      { id: 5, question: "i^2 is equal to?", options: ["1", "-1", "0", "i"], correctAnswer: 1 },
      { id: 6, question: "The sum of angles in a triangle is?", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1 },
      { id: 7, question: "log(1) to any base is?", options: ["1", "e", "0", "10"], correctAnswer: 2 },
      { id: 8, question: "What is the degree of the polynomial x^3 + 2x + 1?", options: ["1", "2", "3", "0"], correctAnswer: 2 },
      { id: 9, question: "The value of 5! is?", options: ["60", "120", "24", "100"], correctAnswer: 1 },
      { id: 10, question: "A quadratic equation has how many roots?", options: ["1", "2", "3", "4"], correctAnswer: 1 }
    ],
    "12th": [
      { id: 1, question: "Integral of 1/x dx is?", options: ["x", "log|x|", "e^x", "1"], correctAnswer: 1 },
      { id: 2, question: "What is the order of a 3x3 identity matrix?", options: ["1", "3", "9", "0"], correctAnswer: 1 },
      { id: 3, question: "The dot product of two perpendicular vectors is?", options: ["1", "-1", "0", "Product of magnitudes"], correctAnswer: 2 },
      { id: 4, question: "Derivative of e^x is?", options: ["e^x", "xe^{x-1}", "log x", "1"], correctAnswer: 0 },
      { id: 5, question: "What is the value of cos(0°)?", options: ["0", "1", "0.5", "-1"], correctAnswer: 1 },
      { id: 6, question: "The probability of a certain event is?", options: ["0", "0.5", "1", "Undefined"], correctAnswer: 2 },
      { id: 7, question: "What is the transpose of a symmetric matrix?", options: ["Inverse", "Negative", "Itself", "Zero"], correctAnswer: 2 },
      { id: 8, question: "The area under a curve is found using?", options: ["Differentiation", "Integration", "Limits", "Algebra"], correctAnswer: 1 },
      { id: 9, question: "What is the value of tan(45°)?", options: ["0", "1", "Infinite", "0.5"], correctAnswer: 1 },
      { id: 10, question: "The cross product of a vector with itself is?", options: ["1", "0", "Magnitude squared", "Unit vector"], correctAnswer: 1 }
    ]
  },
  Physics: {
    "11th": [
      { id: 1, question: "Unit of Force is?", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: 2 },
      { id: 2, question: "Acceleration due to gravity on Earth is approx?", options: ["8.9 m/s²", "9.8 m/s²", "10.5 m/s²", "7.5 m/s²"], correctAnswer: 1 },
      { id: 3, question: "Work done is zero when angle between F and d is?", options: ["0°", "45°", "90°", "180°"], correctAnswer: 2 },
      { id: 4, question: "Dimensional formula for velocity is?", options: ["LT^-1", "LT^-2", "MLT^-1", "L^2"], correctAnswer: 0 },
      { id: 5, question: "Which law is called Law of Inertia?", options: ["Newton's 1st", "Newton's 2nd", "Newton's 3rd", "Kepler's 1st"], correctAnswer: 0 },
      { id: 6, question: "Unit of Power is?", options: ["Joule", "Newton", "Watt", "Volt"], correctAnswer: 2 },
      { id: 7, question: "Escape velocity on Earth is approx?", options: ["11.2 km/s", "9.8 km/s", "5.5 km/s", "2.1 km/s"], correctAnswer: 0 },
      { id: 8, question: "Friction always acts ___ to the motion?", options: ["Parallel", "Perpendicular", "Opposite", "At 45°"], correctAnswer: 2 },
      { id: 9, question: "The value of Universal Gravitational Constant G is?", options: ["6.67x10^-11", "9.8", "3x10^8", "1.6x10^-19"], correctAnswer: 0 },
      { id: 10, question: "Kinetic Energy formula is?", options: ["mgh", "1/2 mv^2", "ma", "F.d"], correctAnswer: 1 }
    ],
    "12th": [
      { id: 1, question: "Unit of Electric Charge is?", options: ["Ampere", "Volt", "Coulomb", "Ohm"], correctAnswer: 2 },
      { id: 2, question: "Ohm's Law is V = ?", options: ["I/R", "IR", "I+R", "R/I"], correctAnswer: 1 },
      { id: 3, question: "Speed of light in vacuum is approx?", options: ["3x10^5 m/s", "3x10^8 m/s", "3x10^10 m/s", "3x10^6 m/s"], correctAnswer: 1 },
      { id: 4, question: "Which lens is used to correct Myopia?", options: ["Convex", "Concave", "Bifocal", "Cylindrical"], correctAnswer: 1 },
      { id: 5, question: "SI unit of Magnetic Field is?", options: ["Weber", "Tesla", "Gauss", "Henry"], correctAnswer: 1 },
      { id: 6, question: "The energy of a photon is E = ?", options: ["mc^2", "hf", "1/2 mv^2", "mgh"], correctAnswer: 1 },
      { id: 7, question: "A transformer works on the principle of?", options: ["Self Induction", "Mutual Induction", "Eddy Currents", "Heating Effect"], correctAnswer: 1 },
      { id: 8, question: "The resistance of an ideal ammeter is?", options: ["Infinite", "Zero", "High", "Low"], correctAnswer: 1 },
      { id: 9, question: "Refractive index of water is approx?", options: ["1.0", "1.33", "1.5", "2.42"], correctAnswer: 1 },
      { id: 10, question: "De Broglie wavelength λ = ?", options: ["h/p", "mc", "hf", "E/c"], correctAnswer: 0 }
    ]
  },
  Chemistry: {
    "11th": [
      { id: 1, question: "Atomic number of Carbon is?", options: ["4", "6", "8", "12"], correctAnswer: 1 },
      { id: 2, question: "pH of pure water is?", options: ["0", "5", "7", "14"], correctAnswer: 2 },
      { id: 3, question: "Avogadro's number is approx?", options: ["6.022x10^23", "3x10^8", "1.6x10^-19", "9.1x10^-31"], correctAnswer: 0 },
      { id: 4, question: "Which gas is known as Laughing Gas?", options: ["CO2", "N2O", "NO2", "SO2"], correctAnswer: 1 },
      { id: 5, question: "The most electronegative element is?", options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"], correctAnswer: 2 },
      { id: 6, question: "Ideal Gas Equation is?", options: ["PV=nRT", "P/V=RT", "V/P=nRT", "PV=kT"], correctAnswer: 0 },
      { id: 7, question: "Oxidation is ___ of electrons?", options: ["Gain", "Loss", "Sharing", "None"], correctAnswer: 1 },
      { id: 8, question: "Methane formula is?", options: ["CH4", "C2H6", "C3H8", "CH3OH"], correctAnswer: 0 },
      { id: 9, question: "Hardness of water is due to?", options: ["Na/K", "Ca/Mg", "Fe/Cu", "Cl/F"], correctAnswer: 1 },
      { id: 10, question: "Which is an alkali metal?", options: ["Mg", "Ca", "Na", "Al"], correctAnswer: 2 }
    ],
    "12th": [
      { id: 1, question: "What is the oxidation state of Fe in [Fe(CN)6]4-?", options: ["+2", "+3", "+4", "0"], correctAnswer: 0 },
      { id: 2, question: "Which is a strong acid?", options: ["CH3COOH", "HCl", "H2CO3", "HCN"], correctAnswer: 1 },
      { id: 3, question: "Functional group of Alcohol is?", options: ["-CHO", "-COOH", "-OH", "-CO-"], correctAnswer: 2 },
      { id: 4, question: "The catalyst used in Haber's process is?", options: ["Pt", "Fe", "Ni", "V2O5"], correctAnswer: 1 },
      { id: 5, question: "Which carbohydrate is known as Cane Sugar?", options: ["Glucose", "Fructose", "Sucrose", "Lactose"], correctAnswer: 2 },
      { id: 6, question: "Molarity is defined as moles of solute per?", options: ["kg solvent", "L solution", "g solution", "mL solvent"], correctAnswer: 1 },
      { id: 7, question: "The monomer of Natural Rubber is?", options: ["Neoprene", "Isoprene", "Styrene", "Ethylene"], correctAnswer: 1 },
      { id: 8, question: "Which vitamin is water soluble?", options: ["A", "D", "E", "C"], correctAnswer: 3 },
      { id: 9, question: "Half-life of a first order reaction is?", options: ["0.693/k", "k/0.693", "1/k", "ln2"], correctAnswer: 0 },
      { id: 10, question: "Which is a noble gas?", options: ["N2", "O2", "He", "Cl2"], correctAnswer: 2 }
    ]
  },
  Biology: {
    "11th": [
      { id: 1, question: "Powerhouse of the cell is?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], correctAnswer: 2 },
      { id: 2, question: "Photosynthesis occurs in?", options: ["Mitochondria", "Chloroplast", "Vacuole", "Lysosome"], correctAnswer: 1 },
      { id: 3, question: "Human heart has how many chambers?", options: ["2", "3", "4", "1"], correctAnswer: 2 },
      { id: 4, question: "Which is the largest organ in human body?", options: ["Liver", "Brain", "Skin", "Heart"], correctAnswer: 2 },
      { id: 5, question: "Structural unit of nervous system is?", options: ["Nephron", "Neuron", "Cell", "Axon"], correctAnswer: 1 },
      { id: 6, question: "Blood group known as Universal Donor is?", options: ["A+", "B-", "AB+", "O-"], correctAnswer: 3 },
      { id: 7, question: "Which hormone is called Emergency Hormone?", options: ["Insulin", "Thyroxine", "Adrenaline", "Estrogen"], correctAnswer: 2 },
      { id: 8, question: "Xylem transports ___ in plants?", options: ["Food", "Water", "Oxygen", "Hormones"], correctAnswer: 1 },
      { id: 9, question: "The study of fungi is called?", options: ["Phycology", "Mycology", "Virology", "Bacteriology"], correctAnswer: 1 },
      { id: 10, question: "Which vitamin is synthesized by sunlight?", options: ["A", "B", "C", "D"], correctAnswer: 3 }
    ],
    "12th": [
      { id: 1, question: "Who is the Father of Genetics?", options: ["Darwin", "Mendel", "Watson", "Morgan"], correctAnswer: 1 },
      { id: 2, question: "DNA stands for?", options: ["Deoxyribonucleic Acid", "Deoxyribose Acid", "Dinucleic Acid", "None"], correctAnswer: 0 },
      { id: 3, question: "Which is a double stranded genetic material?", options: ["mRNA", "tRNA", "DNA", "rRNA"], correctAnswer: 2 },
      { id: 4, question: "The process of copying DNA to RNA is?", options: ["Translation", "Transcription", "Replication", "Mutation"], correctAnswer: 1 },
      { id: 5, question: "Which is a viral disease?", options: ["Typhoid", "Cholera", "AIDS", "Malaria"], correctAnswer: 2 },
      { id: 6, question: "The first antibiotic discovered was?", options: ["Streptomycin", "Penicillin", "Tetracycline", "Ampicillin"], correctAnswer: 1 },
      { id: 7, question: "Ecology deals with relationship between?", options: ["Organisms and Environment", "Cells and Tissues", "Plants and Animals", "None"], correctAnswer: 0 },
      { id: 8, question: "Which is a primary consumer in a food chain?", options: ["Lion", "Snake", "Rabbit", "Eagle"], correctAnswer: 2 },
      { id: 9, question: "PCR stands for?", options: ["Polymerase Chain Reaction", "Protein Chain Reaction", "Primary Cell Ratio", "None"], correctAnswer: 0 },
      { id: 10, question: "Which gas is majorly responsible for Global Warming?", options: ["O2", "N2", "CO2", "Ar"], correctAnswer: 2 }
    ]
  },
  English: {
    "11th": [
      { id: 1, question: "Who wrote 'The Portrait of a Lady'?", options: ["Khushwant Singh", "Nani Palkhivala", "A.R. Williams", "Gordon Cook"], correctAnswer: 0 },
      { id: 2, question: "Identify the noun: 'The cat sat on the mat.'", options: ["Sat", "On", "Cat", "The"], correctAnswer: 2 },
      { id: 3, question: "Antonym of 'Beautiful' is?", options: ["Pretty", "Ugly", "Nice", "Smart"], correctAnswer: 1 },
      { id: 4, question: "Which is a conjunction?", options: ["And", "Quickly", "He", "Under"], correctAnswer: 0 },
      { id: 5, question: "Past tense of 'Go' is?", options: ["Gone", "Going", "Went", "Goes"], correctAnswer: 2 },
      { id: 6, question: "A person who writes poems is a?", options: ["Author", "Poet", "Painter", "Singer"], correctAnswer: 1 },
      { id: 7, question: "Which is a silent letter in 'Knife'?", options: ["n", "i", "f", "k"], correctAnswer: 3 },
      { id: 8, question: "Plural of 'Child' is?", options: ["Childs", "Children", "Childrens", "Childes"], correctAnswer: 1 },
      { id: 9, question: "Synonym of 'Happy' is?", options: ["Sad", "Joyful", "Angry", "Bored"], correctAnswer: 1 },
      { id: 10, question: "Which is an adjective?", options: ["Run", "Blue", "Slowly", "Table"], correctAnswer: 1 }
    ],
    "12th": [
      { id: 1, question: "Who is the author of 'The Last Lesson'?", options: ["Alphonse Daudet", "Anees Jung", "Louis Fischer", "Selma Lagerlof"], correctAnswer: 0 },
      { id: 2, question: "What is the theme of 'My Mother at Sixty-six'?", options: ["Childhood", "Ageing", "Nature", "War"], correctAnswer: 1 },
      { id: 3, question: "Identify the figure of speech: 'Life is a dream.'", options: ["Simile", "Metaphor", "Personification", "Alliteration"], correctAnswer: 1 },
      { id: 4, question: "Which is a preposition?", options: ["But", "In", "They", "Run"], correctAnswer: 1 },
      { id: 5, question: "The passive voice of 'He eats an apple' is?", options: ["An apple is eaten by him", "An apple was eaten by him", "He is eating an apple", "None"], correctAnswer: 0 },
      { id: 6, question: "Meaning of 'Fragile' is?", options: ["Strong", "Easily broken", "Heavy", "Expensive"], correctAnswer: 1 },
      { id: 7, question: "Which is a correctly spelled word?", options: ["Accomodation", "Accommodation", "Acomodation", "Accommodaton"], correctAnswer: 1 },
      { id: 8, question: "A story of a person's life written by themselves is?", options: ["Biography", "Autobiography", "Novel", "Essay"], correctAnswer: 1 },
      { id: 9, question: "What does 'The Rattrap' symbolize?", options: ["A toy", "The world", "A trap for rats", "A gift"], correctAnswer: 1 },
      { id: 10, question: "Who wrote 'A Thing of Beauty'?", options: ["John Keats", "Robert Frost", "Pablo Neruda", "Stephen Spender"], correctAnswer: 0 }
    ]
  }
};
