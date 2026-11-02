export interface TrueFalseQuestion {
  id: string;
  num: number;
  question: string;
  correctAnswer: boolean;
  lecture: string;
  slide: number;
  slideTitle: string;
  quote: string;
  explanation: string;
  topic: string;
}

export interface MCQQuestion {
  id: string;
  num: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  correctText: string;
  lecture: string;
  slide: number;
  slideTitle: string;
  quote: string;
  explanation: string;
  topic: string;
}

export interface RubricItem {
  criteria: string;
  points: number;
}

export interface EssayQuestion {
  id: string;
  num: number;
  question: string;
  maxPoints: number;
  lecture: string;
  slides: number[];
  modelAnswer: string;
  keyPoints: string[];
  rubric: RubricItem[];
  topic: string;
}

export interface ExamMetadata {
  courseCode: string;
  courseTitle: string;
  institution: string;
  examTitle: string;
  sourceDoc: string;
  lectures: string[];
  totalTF: number;
  totalMCQ: number;
  totalEssay: number;
  totalPoints: number;
  timeLimitMinutes: number;
}

export const EXAM_METADATA: ExamMetadata = {
  courseCode: "CCS4505",
  courseTitle: "Digital Image Processing",
  institution: "College of Computing & Information Technology — AASTMT",
  examTitle: "Midterm / Practice Comprehensive Examination (Weeks 01–04)",
  sourceDoc: "Week 04 - Sample practice questions (TF, MCQ, and ESSAY) - 1.pdf",
  lectures: [
    "Week 01 - Lecture 01: Introduction & Fundamentals of DIP, Perception, Sampling & Quantization, Image Types",
    "Week 02 - Lecture 02: Pixel Relationships, Adjacency, Connectivity, Distances, Linear vs Nonlinear Operations",
    "Week 03 - Digital Image Enhancement (Part 1 & Lecture 03): Point Processing, Arithmetic, Set & Logical Operations"
  ],
  totalTF: 30,
  totalMCQ: 16,
  totalEssay: 6,
  totalPoints: 76, // 30 TF (1 pt) + 16 MCQ (1 pt) + 30 Essay
  timeLimitMinutes: 45
};

export const TF_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: "TF-01",
    num: 1,
    question: "An object appears white to observer when it reflects light relatively balanced in all visible wavelengths of EM energy.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 11,
    slideTitle: "What Are Image Sources ? - 2",
    quote: "An object that reflects light relatively balanced in all visible wavelengths appears white to the observer. However, an object that favors reflectance in a limited range of the visible spectrum exhibits some shades of color.",
    explanation: "True. When reflected light is evenly distributed across all wavelengths in the visible spectrum (~400 nm to ~700 nm), the human eye perceives the object as white.",
    topic: "Light & Color Perception"
  },
  {
    id: "TF-02",
    num: 2,
    question: "Light that is void of color is named chromatic light.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 11,
    slideTitle: "What Are Image Sources ? - 2",
    quote: "Light that is void of color is called monochromatic (achromatic) light, where its only attribute is its intensity or amount. The other type of light is the chromatic (colored) light.",
    explanation: "False. Light void of color is called monochromatic (or achromatic) light. Chromatic light refers specifically to colored light.",
    topic: "Light & Color Perception"
  },
  {
    id: "TF-03",
    num: 3,
    question: "The only attribute of monochromatic light is its intensity or amount.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 11,
    slideTitle: "What Are Image Sources ? - 2",
    quote: "Light that is void of color is called monochromatic (achromatic) light, where its only attribute is its intensity or amount.",
    explanation: "True. Monochromatic light has no chromaticity (hue/saturation); it is characterized solely by its scalar radiant energy or intensity (gray level).",
    topic: "Light & Color Perception"
  },
  {
    id: "TF-04",
    num: 4,
    question: "Luminance is a subjective descriptor (that is practically impossible to measure) of reflected or absorbed light perception from an object by an observer, and it is affected by the background.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 13,
    slideTitle: "What Are Image Sources ? - 4",
    quote: "Luminance, measured in lumens, gives a measure of the amount of energy an observer perceives from a light source. Brightness is a subjective descriptor (that is practically impossible to measure) of reflected or absorbed light perception from an object by an observer, and it is affected by the background.",
    explanation: "False. That is the definition of 'Brightness'. Luminance is an objective photometric measurement (in lumens), whereas Brightness is subjective perception.",
    topic: "Photometric Quantities"
  },
  {
    id: "TF-05",
    num: 5,
    question: "Machines prefer their images for processing to be detailed and cluttered.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 20,
    slideTitle: "What Is Image Processing?",
    quote: "Humans like their images to be sharp, clear and detailed. Machines prefer their images to be simple and uncluttered.",
    explanation: "False. Computer vision algorithms operate much more effectively and reliably on simple, segmented, uncluttered images.",
    topic: "Fundamentals of DIP"
  },
  {
    id: "TF-06",
    num: 6,
    question: "In the mid-level processing of images, the input is image and output is attributes.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 27,
    slideTitle: "What Is Digital Image Processing? - 2",
    quote: "Mid Level Process | Input: Image | Output: Attributes | Examples: Object Segmentation, Object Recognition",
    explanation: "True. Low-level: Image -> Image. Mid-level: Image -> Attributes. High-level: Attributes -> Understanding.",
    topic: "Processing Hierarchy"
  },
  {
    id: "TF-07",
    num: 7,
    question: "Noise removal is one of the most important areas in low-level processing of images.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 27,
    slideTitle: "What Is Digital Image Processing? - 2",
    quote: "Low Level Process | Input: Image | Output: Image | Examples: Noise Removal, Image Sharpening",
    explanation: "True. Noise removal (filtering) takes an image as input and outputs a cleaned image, making it a foundational low-level process.",
    topic: "Processing Hierarchy"
  },
  {
    id: "TF-08",
    num: 8,
    question: "The algorithms of high-level processing are the most complex.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 28,
    slideTitle: "What Is Digital Image Processing? - 3",
    quote: "Algorithm Complexity Increases from Low to High. High Level: Recognition, Interpretation — Intelligent.",
    explanation: "True. High-level algorithms (cognitive reasoning, scene understanding, autonomous navigation) have the highest computational and algorithmic complexity.",
    topic: "Processing Hierarchy"
  },
  {
    id: "TF-09",
    num: 9,
    question: "In CCD camera, a single row of sensors is moved across the image, capturing it row-by-row as the row moves.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 31,
    slideTitle: "How Is A Digital Image Captured?",
    quote: "1. Charged Coupled Device (CCD) Camera: Such a camera has a 2D-array of silicon electronic devices (sensors)... 2. Flat Bed Scanner: ...a single row of photosites (sensors) is moved across the image, capturing it row-by-row as it moves.",
    explanation: "False. That describes a Flat Bed Scanner. A CCD camera captures the full 2D scene at once using a 2D sensor array.",
    topic: "Image Acquisition"
  },
  {
    id: "TF-10",
    num: 10,
    question: "Digitizing the spatial coordinate's values of a captured image is named image quantization.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 34,
    slideTitle: "How Is A Digital Image Sensed?",
    quote: "Digitizing the coordinates values is called image sampling. Digitizing the amplitude values is called image quantization.",
    explanation: "False. Digitizing coordinate values is image sampling. Digitizing amplitude/intensity values is image quantization.",
    topic: "Sampling & Quantization"
  },
  {
    id: "TF-11",
    num: 11,
    question: "Resolution is measure of how much the detail of an image could be seen or perceived.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 39,
    slideTitle: "How Is A Digital Image Sensed? - 6",
    quote: "Resolution is measure of how much the detail of an image could be seen or perceived.",
    explanation: "True. Resolution governs the finest discernible feature size in the image.",
    topic: "Sampling & Quantization"
  },
  {
    id: "TF-12",
    num: 12,
    question: "Quantization resolution is measure of the smallest perceptible change in intensity level in image, and it is dependent on the used number of quantization levels.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 39,
    slideTitle: "How Is A Digital Image Sensed? - 6",
    quote: "Quantization resolution is measure of the smallest perceptible change in intensity level in the image and it is dependent on the used number of quantization levels.",
    explanation: "True. Quantization resolution (intensity resolution / pixel depth) determines the smallest detectable step in brightness, set by L = 2^k levels.",
    topic: "Sampling & Quantization"
  },
  {
    id: "TF-13",
    num: 13,
    question: "If intensity quantization levels are not enough, checkerboards effect can occur in image.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 40,
    slideTitle: "How Is A Digital Image Sensed? - 7",
    quote: "Varying Image Quantization... If levels are not enough, false contouring can occur on the smooth area.",
    explanation: "False. Insufficient quantization causes false contouring (banding). The checkerboard effect happens when spatial sampling resolution is drastically reduced.",
    topic: "Sampling & Quantization"
  },
  {
    id: "TF-14",
    num: 14,
    question: "The number of dots (pixels) per unit distance measures pixel depth.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 44,
    slideTitle: "How Is A Digital Image Represented? - 2",
    quote: "Spatial resolution refers to the smallest detectable detail in an image, and it is measured by the number of dots (pixels) per unit distance, i.e., inch (dpi). Intensity resolution (pixel depth) refers to... the number of bits, k...",
    explanation: "False. Dots per unit distance (e.g. dpi) measures spatial resolution. Pixel depth is measured in bits per pixel.",
    topic: "Image Representation"
  },
  {
    id: "TF-15",
    num: 15,
    question: "As the dynamic range of an image increases as the contrast of the image decreases.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 45,
    slideTitle: "How Is A Digital Image Represented? - 3",
    quote: "When an appreciable number of pixels in an image have a high dynamic range, we can expect the image to have high contrast. Conversely, an image with low dynamic range typically has a dim, washed-out gray look and low contrast.",
    explanation: "False. Higher dynamic range produces higher contrast. Low dynamic range corresponds to low contrast.",
    topic: "Image Representation"
  },
  {
    id: "TF-16",
    num: 16,
    question: "Noise is the highest value beyond which all intensity levels are clipped.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 46,
    slideTitle: "How Is A Digital Image Represented? - 4",
    quote: "Saturation is the highest value beyond which all intensity levels are clipped. Noise is a variation of the intensity level from its true value by a small (random) amount...",
    explanation: "False. Saturation is the upper clipping threshold. Noise is random variation in pixel intensity values.",
    topic: "Image Representation"
  },
  {
    id: "TF-17",
    num: 17,
    question: "Black and white image stores pixel values in 2-bits.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 53,
    slideTitle: "Binary (Black & White) Image",
    quote: "Binary (Black & White) Image: Each pixel is stored in one bit: 1 Represents White, 0 Represents Black.",
    explanation: "False. A binary (black and white) image uses exactly 1 bit per pixel (0 = black, 1 = white).",
    topic: "Image Types"
  },
  {
    id: "TF-18",
    num: 18,
    question: "Image compression is one of the computer vision applications.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 27,
    slideTitle: "What Is Digital Image Processing? - 2",
    quote: "Image Processing: Image Acquisition, Image Enhancement, Image Restoration, Image Compression... Computer Vision: Object Detection, Object Recognition...",
    explanation: "False. Image compression is a fundamental Digital Image Processing step, not a Computer Vision application.",
    topic: "Fundamentals of DIP"
  },
  {
    id: "TF-19",
    num: 19,
    question: "Image restoration is subjective process where the observer is the only judger of its output.",
    correctAnswer: false,
    lecture: "Week 01 & Week 03-1",
    slide: 3,
    slideTitle: "How Is Enhancement Different From Restoration?",
    quote: "The visual evaluation of enhanced image quality is a highly subjective process because the viewer is the ultimate judge. Restoration is an objective process based on mathematical models.",
    explanation: "False. Restoration is an objective mathematical reconstruction of degradation. Enhancement is subjective.",
    topic: "Enhancement vs Restoration"
  },
  {
    id: "TF-20",
    num: 20,
    question: "M-adjacency is introduced to eliminate the ambiguities that arise when 4-adjacency is used.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 9,
    slideTitle: "Some Basic Relationships Between Pixels-6",
    quote: "m-adjacency is a modification of 8-adjacency, so it is introduced to eliminate the ambiguities that often arise when 8-adjacency is used.",
    explanation: "False. M-adjacency (mixed adjacency) resolves ambiguities that arise from 8-adjacency, not 4-adjacency.",
    topic: "Pixel Adjacency & Paths"
  },
  {
    id: "TF-21",
    num: 21,
    question: "Edge concept is local that is based on a measure of intensity-level discontinuity at a pixel.",
    correctAnswer: true,
    lecture: "Week 02 - Lecture 02",
    slide: 15,
    slideTitle: "Some Basic Relationships Between Pixels-12",
    quote: "...while edge is a 'local' concept that is based on a measure of intensity-level discontinuity at a point.",
    explanation: "True. An edge is computed using local neighborhood derivatives/gradients at a specific point.",
    topic: "Pixel Relationships"
  },
  {
    id: "TF-22",
    num: 22,
    question: "Boundary of a finite region forms a closed path.",
    correctAnswer: true,
    lecture: "Week 02 - Lecture 02",
    slide: 15,
    slideTitle: "Some Basic Relationships Between Pixels-12",
    quote: "...boundary of a finite region forms a closed path and is thus a 'global' concept.",
    explanation: "True. The complete contour perimeter of a finite connected region forms a closed loop/path.",
    topic: "Pixel Relationships"
  },
  {
    id: "TF-23",
    num: 23,
    question: "Most of the arithmetic operations performed on images are matrix-based.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 21,
    slideTitle: "Digital Image Mathematics",
    quote: "Although images can be viewed equivalently as matrices, but most of the arithmetic operations performed on images are array-based (carried out on a pixel-by-pixel basis).",
    explanation: "False. They are array-based (element-by-element / pixel-by-pixel), not standard linear algebra matrix multiplication.",
    topic: "Image Mathematics"
  },
  {
    id: "TF-24",
    num: 24,
    question: "Nonlinear operators are based on a large body of theoretical and practical results.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 24,
    slideTitle: "Linear Vs Non-Linear Operations-3",
    quote: "Linear operations are exceptionally important because they are based on a large body of theoretical and practical results that are applicable to image processing. Nonlinear operators are not nearly as well understood...",
    explanation: "False. Linear operators have the rich theoretical foundation; nonlinear operators do not.",
    topic: "Linear vs Nonlinear Operations"
  },
  {
    id: "TF-25",
    num: 25,
    question: "Max operator is mathematically nonlinear.",
    correctAnswer: true,
    lecture: "Week 02 - Lecture 02",
    slide: 23,
    slideTitle: "Linear Vs Non-Linear Operations-2",
    quote: "For example, the max operator whose function is to find the maximum value of the pixels in an image, is nonlinear.",
    explanation: "True. The max operator fails the additivity test (max(A + B) != max(A) + max(B)).",
    topic: "Linear vs Nonlinear Operations"
  },
  {
    id: "TF-26",
    num: 26,
    question: "The visual evaluation of enhanced image quality is a highly objective process.",
    correctAnswer: false,
    lecture: "Week 03 - Part 1",
    slide: 3,
    slideTitle: "Digital Image Enhancement",
    quote: "Also the visual evaluation of enhanced image quality is a highly subjective process because the viewer is the ultimate judge of how well a specific method works.",
    explanation: "False. Visual evaluation of enhancement is subjective because human eyes and preferences differ.",
    topic: "Image Enhancement"
  },
  {
    id: "TF-27",
    num: 27,
    question: "Image Enhancement methods are very much problem oriented.",
    correctAnswer: true,
    lecture: "Week 03 - Part 1",
    slide: 3,
    slideTitle: "Digital Image Enhancement",
    quote: "Enhancement methods are very much problem oriented, for example, a method that is quite useful for enhancing X-ray images may not necessarily be the best approach for enhancing pictures of Mars...",
    explanation: "True. Enhancement techniques must be customized to the specific imaging modality and application.",
    topic: "Image Enhancement"
  },
  {
    id: "TF-28",
    num: 28,
    question: "Frequency domain enhancement methods are based on direct manipulation of image pixels.",
    correctAnswer: false,
    lecture: "Week 03 - Part 1",
    slide: 9,
    slideTitle: "Digital Image Enhancement Methods",
    quote: "Spatial domain methods: are based on direct manipulation of the image pixels. Frequency domain methods: are based on modifying the Fourier transform of the image.",
    explanation: "False. Direct manipulation of image pixels is spatial domain. Frequency domain modifies Fourier transforms.",
    topic: "Image Enhancement"
  },
  {
    id: "TF-29",
    num: 29,
    question: "Intensity transformation and histogram based enhancement methods operate on one image.",
    correctAnswer: true,
    lecture: "Week 03 - Part 1",
    slide: 10,
    slideTitle: "Spatial Image Enhancement Methods",
    quote: "Point (Single-Pixel) Methods: The neighbourhood is simply of size 1x1 (the pixel itself). Operates as g(x,y) = T[f(x,y)] on a single image.",
    explanation: "True. Point operations (intensity transformations and histogram equalization) map single pixel values of one image into new values.",
    topic: "Point Processing"
  },
  {
    id: "TF-30",
    num: 30,
    question: "Arithmetic enhancement operations may be performed between an image and a constant.",
    correctAnswer: true,
    lecture: "Week 03 - Part 1 / Lecture 03",
    slide: 13,
    slideTitle: "Arithmetic Operations",
    quote: "They are performed between the corresponding pixels of two images... or between an image IA and a constant value C: Ioutput = IA + C, IA - C, IA * C, IA / C",
    explanation: "True. An image can be combined with a scalar constant C (e.g. adding brightness or multiplying contrast) or with another image.",
    topic: "Arithmetic Operations"
  }
];

export const MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: "MCQ-01",
    num: 1,
    question: "The visible color spectrum is divided into ……… broad regions.",
    options: [
      { key: "A", text: "three" },
      { key: "B", text: "four" },
      { key: "C", text: "five" },
      { key: "D", text: "six" }
    ],
    correctOption: "D",
    correctText: "six",
    lecture: "Week 01 - Lecture 01",
    slide: 11,
    slideTitle: "What Are Image Sources ? - 2",
    quote: "The visible color spectrum is divided into six broad regions: violet, blue, green, yellow, orange, and red.",
    explanation: "The six broad regions of visible EM spectrum are violet, blue, green, yellow, orange, and red.",
    topic: "Light & Color"
  },
  {
    id: "MCQ-02",
    num: 2,
    question: ".......... basic quantities are used to describe the quality of chromatic light source.",
    options: [
      { key: "A", text: "three" },
      { key: "B", text: "four" },
      { key: "C", text: "five" },
      { key: "D", text: "six" }
    ],
    correctOption: "A",
    correctText: "three",
    lecture: "Week 01 - Lecture 01",
    slide: 12,
    slideTitle: "What Are Image Sources ? - 3",
    quote: "Three basic quantities are used to describe the quality of a chromatic light source: radiance, luminance, and brightness.",
    explanation: "The three quantities are Radiance (energy flow in watts), Luminance (perceived energy in lumens), and Brightness (subjective descriptor).",
    topic: "Light Quantities"
  },
  {
    id: "MCQ-03",
    num: 3,
    question: "……… is the total amount of energy that flows from the light source, and it is usually measured in watts.",
    options: [
      { key: "A", text: "Radiance" },
      { key: "B", text: "Luminance" },
      { key: "C", text: "Brightness" },
      { key: "D", text: "None of Above Choices" }
    ],
    correctOption: "A",
    correctText: "Radiance",
    lecture: "Week 01 - Lecture 01",
    slide: 12,
    slideTitle: "What Are Image Sources ? - 3",
    quote: "Radiance is the total amount of energy that flows from the light source, and it is usually measured in watts.",
    explanation: "Radiance is physical power in watts radiated by the source.",
    topic: "Light Quantities"
  },
  {
    id: "MCQ-04",
    num: 4,
    question: "The continuum from image processing to computer vision can be broken up into ……… levels.",
    options: [
      { key: "A", text: "three" },
      { key: "B", text: "four" },
      { key: "C", text: "five" },
      { key: "D", text: "six" }
    ],
    correctOption: "A",
    correctText: "three",
    lecture: "Week 01 - Lecture 01",
    slide: 26,
    slideTitle: "What Is Digital Image Processing?",
    quote: "The continuum from image processing to computer vision can be broken up into low-, mid- and high-level processes.",
    explanation: "The 3 levels are: Low-level (image-to-image), Mid-level (image-to-attributes), and High-level (attributes-to-understanding).",
    topic: "Processing Continuum"
  },
  {
    id: "MCQ-05",
    num: 5,
    question: "Segmentation of objects in image is considered …….. –level vision.",
    options: [
      { key: "A", text: "low" },
      { key: "B", text: "mid" },
      { key: "C", text: "high" },
      { key: "D", text: "no" }
    ],
    correctOption: "B",
    correctText: "mid",
    lecture: "Week 01 - Lecture 01",
    slide: 27,
    slideTitle: "What Is Digital Image Processing? - 2",
    quote: "Mid Level Process | Input: Image | Output: Attributes | Examples: Object Segmentation, Object Recognition",
    explanation: "Object segmentation extracts region attributes from input images, classifying it as mid-level vision.",
    topic: "Processing Continuum"
  },
  {
    id: "MCQ-06",
    num: 6,
    question: "The 2D Image function may be mathematically characterized by ………. components.",
    options: [
      { key: "A", text: "two" },
      { key: "B", text: "three" },
      { key: "C", text: "four" },
      { key: "D", text: "five" }
    ],
    correctOption: "A",
    correctText: "two",
    lecture: "Week 01 - Lecture 01",
    slide: 18,
    slideTitle: "How Is An Image Formed?",
    quote: "Most of the images are generated by the combination of an 'illumination' source and the reflection or absorption of energy... f(x,y) = i(x,y) * r(x,y)",
    explanation: "f(x,y) consists of two components: Illumination i(x,y) and Reflectance r(x,y).",
    topic: "Image Formation"
  },
  {
    id: "MCQ-07",
    num: 7,
    question: "Each pixel is commonly stored in one byte to represent the shades of gray in ………. Image.",
    options: [
      { key: "A", text: "binary" },
      { key: "B", text: "monochrome" },
      { key: "C", text: "color" },
      { key: "D", text: "indexed" }
    ],
    correctOption: "B",
    correctText: "monochrome",
    lecture: "Week 01 - Lecture 01",
    slide: 55,
    slideTitle: "Intensity (Monochrome) Image",
    quote: "Each pixel is commonly stored in one byte to represent the shades of gray, so it's also called Gray Level (Scale) image.",
    explanation: "Monochrome (grayscale) pixels use 1 byte (8 bits) spanning values 0 to 255.",
    topic: "Image Types"
  },
  {
    id: "MCQ-08",
    num: 8,
    question: "There are ……… types of image compression.",
    options: [
      { key: "A", text: "two" },
      { key: "B", text: "three" },
      { key: "C", text: "four" },
      { key: "D", text: "five" }
    ],
    correctOption: "A",
    correctText: "two",
    lecture: "Week 01 - Lecture 01",
    slide: 67,
    slideTitle: "Fields Use Digital Image Processing - 4 (Image Compression)",
    quote: "Image compression is divided into two types: Lossless and Lossy.",
    explanation: "The two categories are Lossless compression and Lossy compression.",
    topic: "Image Compression"
  },
  {
    id: "MCQ-09",
    num: 9,
    question: "Image ……… aims to invert known or estimated degradation to images.",
    options: [
      { key: "A", text: "enhancement" },
      { key: "B", text: "restoration" },
      { key: "C", text: "compression" },
      { key: "D", text: "segmentation" }
    ],
    correctOption: "B",
    correctText: "restoration",
    lecture: "Week 01 & Week 03-1",
    slide: 8,
    slideTitle: "Image Restoration",
    quote: "Image restoration aims to invert known or estimated degradation to images.",
    explanation: "Restoration uses degradation modeling to invert damage (blur, sensor noise).",
    topic: "Restoration"
  },
  {
    id: "MCQ-10",
    num: 10,
    question: "………-neighborhood relation considers only the vertical and horizontal neighbors.",
    options: [
      { key: "A", text: "Four" },
      { key: "B", text: "Diagonal" },
      { key: "C", text: "Six" },
      { key: "D", text: "Eight" }
    ],
    correctOption: "A",
    correctText: "Four",
    lecture: "Week 02 - Lecture 02",
    slide: 4,
    slideTitle: "Some Basic Relationships Between Pixels",
    quote: "4-neighbors of pixel p at (X,Y): (X+1,Y), (X-1,Y), (X,Y+1), (X,Y-1). Four-neighborhood relation considers only the vertical and horizontal neighbors.",
    explanation: "The 4-neighborhood contains only orthogonal (horizontal and vertical) neighbors.",
    topic: "Pixel Neighborhoods"
  },
  {
    id: "MCQ-11",
    num: 11,
    question: "Due to storage and quantizing hardware considerations, the number of intensity quantization levels typically is an integer ……… of 2.",
    options: [
      { key: "A", text: "square root" },
      { key: "B", text: "logarithm" },
      { key: "C", text: "exponential" },
      { key: "D", text: "power" }
    ],
    correctOption: "D",
    correctText: "power",
    lecture: "Week 01 - Lecture 01",
    slide: 44,
    slideTitle: "How Is A Digital Image Represented? - 2",
    quote: "...measured by the number of bits, k, (usually is an integer power of two due to hardware considerations) used to quantize intensity, L = 2^k.",
    explanation: "L = 2^k is an integer power of two because digital computers store values in k-bit registers.",
    topic: "Quantization"
  },
  {
    id: "MCQ-12",
    num: 12,
    question: "……….-distance is also called city-block distance.",
    options: [
      { key: "A", text: "De" },
      { key: "B", text: "D4" },
      { key: "C", text: "D8" },
      { key: "D", text: "Dm" }
    ],
    correctOption: "B",
    correctText: "D4",
    lecture: "Week 02 - Lecture 02",
    slide: 18,
    slideTitle: "Pixels Distance Measures-2",
    quote: "D4-distance (city-block distance) between p and q is defined as: D4(p,q) = |x - s| + |y - t|",
    explanation: "D4 metric corresponds to city-block (Manhattan) distance.",
    topic: "Distance Measures"
  },
  {
    id: "MCQ-13",
    num: 13,
    question: "The pixels having a D8-distance from a pixel (x,y) are less than or equal to some value r from a …….. centered at (x,y).",
    options: [
      { key: "A", text: "disk" },
      { key: "B", text: "diamond" },
      { key: "C", text: "square" },
      { key: "D", text: "triangle" }
    ],
    correctOption: "C",
    correctText: "square",
    lecture: "Week 02 - Lecture 02",
    slide: 19,
    slideTitle: "Pixels Distance Measures-3",
    quote: "The pixels having a D8-distance from (x,y) less than or equal to some value r form a square centered at (x,y).",
    explanation: "D8 (chessboard) metric forms a square of side 2r centered at (x,y). De forms a disk; D4 forms a diamond.",
    topic: "Distance Measures"
  },
  {
    id: "MCQ-14",
    num: 14,
    question: "You studied that any linear operator must satisfy ……… properties.",
    options: [
      { key: "A", text: "two" },
      { key: "B", text: "three" },
      { key: "C", text: "four" },
      { key: "D", text: "five" }
    ],
    correctOption: "A",
    correctText: "two",
    lecture: "Week 02 - Lecture 02",
    slide: 22,
    slideTitle: "Linear Vs Non-Linear Operations",
    quote: "H is said to be a linear operator if it satisfies two properties: 1. Additivity, and 2. Homogeneity.",
    explanation: "The two properties required for linearity are Additivity (superposition) and Homogeneity (scalar multiplication).",
    topic: "Linear Operators"
  },
  {
    id: "MCQ-15",
    num: 15,
    question: "Spatial image enhancement methods are divided into ……….",
    options: [
      { key: "A", text: "two" },
      { key: "B", text: "three" },
      { key: "C", text: "four" },
      { key: "D", text: "five" }
    ],
    correctOption: "B",
    correctText: "three",
    lecture: "Week 03 - Part 1",
    slide: 10,
    slideTitle: "Spatial Image Enhancement Methods",
    quote: "Spatial enhancement methods are divided into: (a) Point (Single-Pixel) Methods, (b) Mask (Local) Methods, (c) Geometric (Global) Methods.",
    explanation: "Spatial enhancements are classified into 3 scales: Point methods, Mask/neighborhood methods, and Geometric/global methods.",
    topic: "Spatial Enhancement"
  },
  {
    id: "MCQ-16",
    num: 16,
    question: "Point processing-based enhancement methods are divided into ……….",
    options: [
      { key: "A", text: "two" },
      { key: "B", text: "three" },
      { key: "C", text: "four" },
      { key: "D", text: "five" }
    ],
    correctOption: "D",
    correctText: "five",
    lecture: "Week 03 - Part 1",
    slide: 12,
    slideTitle: "Point (Single-Pixel) Methods",
    quote: "Point (Single-Pixel) methods are divided into: 1. Arithmetic Operations, 2. Set Operations, 3. Logical Operations, 4. Intensity Transformation Methods, 5. Histogram Based Methods.",
    explanation: "The 5 categories are: Arithmetic, Set, Logical, Intensity Transformations, and Histogram Based Methods.",
    topic: "Point Processing"
  }
];

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: "ESSAY-01",
    num: 1,
    question: "What are types of image?",
    maxPoints: 5,
    lecture: "Week 01 - Lecture 01",
    slides: [53, 55, 60, 63],
    topic: "Digital Image Types",
    keyPoints: [
      "Binary (Black & White): 1 bit/pixel, values 0 (black) and 1 (white)",
      "Intensity (Monochrome / Grayscale): 8 bits (1 byte) per pixel, 256 gray shades (0 to 255)",
      "Indexed (Palette) Colored: Pixel holds an 8-bit index into a 24-bit color look-up table (LUT)",
      "True Color (RGB): 24 bits (3 bytes) per pixel (8-bit Red, 8-bit Green, 8-bit Blue), ~16.7M colors"
    ],
    modelAnswer: `Digital images are categorized into four primary types based on pixel depth and representation:

1. Binary (Black & White) Image:
   • Each pixel is stored using exactly 1 bit.
   • Pixel value 0 represents Black, while 1 represents White.
   • Ideal for document images, binary masks, and simple silhouettes.

2. Intensity (Monochrome / Grayscale) Image:
   • Each pixel is stored in 1 byte (8 bits).
   • Represents 256 gray levels ranging from 0 (Black) to 255 (White).
   • Commonly utilized in medical imaging (X-rays, MRI, CT scans) and satellite panchromatic imagery.

3. Indexed (Palette) Colored Image:
   • Each pixel contains an index number (typically 8 bits) pointing into a Color Map (Palette / Look-Up Table).
   • The palette specifies full 24-bit RGB values for up to 256 colors.
   • Provides major storage reduction (~300 KB vs ~922 KB for 640x480).

4. True Color (RGB) Image:
   • Each pixel is represented by 24 bits (3 bytes): 8 bits Red, 8 bits Green, and 8 bits Blue.
   • Capable of displaying 2^24 = 16,777,216 distinct colors.
   • Used in photographic imaging, digital cameras, and high-fidelity computer vision.`,
    rubric: [
      { criteria: "Binary image explained (1 bit/pixel, 0=black, 1=white)", points: 1.25 },
      { criteria: "Monochrome/grayscale explained (8 bits/1 byte, 256 gray levels)", points: 1.25 },
      { criteria: "Indexed color image explained (8-bit index + Look-Up Table / palette)", points: 1.25 },
      { criteria: "True color RGB image explained (24 bits, 3 channels R/G/B, 16.7M colors)", points: 1.25 }
    ]
  },
  {
    id: "ESSAY-02",
    num: 2,
    question: "Explain the differences between indexed colored images and true colored images?",
    maxPoints: 5,
    lecture: "Week 01 - Lecture 01",
    slides: [60, 61, 62, 63],
    topic: "Indexed vs True Color",
    keyPoints: [
      "Indexed stores an 8-bit index; True Color stores 24 bits (3 separate bytes: R, G, B)",
      "Indexed displays up to 256 palette colors; True Color displays up to 16,777,216 colors",
      "Indexed requires 3x less storage (e.g., 640x480 is ~300 KB vs ~922 KB for True Color)",
      "Indexed uses an auxiliary Look-Up Table (LUT) / Color Palette"
    ],
    modelAnswer: `Key Differences Between Indexed Colored Images and True Colored Images:

1. Data Stored per Pixel:
   • Indexed Color: Each pixel stores an 8-bit integer index (0–255) referencing a row in an external color palette table.
   • True Color: Each pixel directly stores 24 bits (3 distinct bytes: 8 bits for Red, 8 bits for Green, 8 bits for Blue).

2. Number of Simultaneous Colors:
   • Indexed Color: Limited to a maximum of 256 unique colors at any one time, chosen to represent the specific image contents best.
   • True Color: Can display up to 2^24 ≈ 16.7 million colors simultaneously without palette restriction.

3. Memory and Storage Footprint:
   • Indexed Color: High space savings (~3x smaller). For a 640×480 image:
     Size = (640 × 480 × 1 byte) + (256 × 3 bytes palette) ≈ 308 KB.
   • True Color: Much larger file size. For a 640×480 image:
     Size = 640 × 480 × 3 bytes ≈ 922 KB.

4. Lookup Mechanism:
   • Indexed Color requires an indirect memory lookup (LUT) before displaying the RGB value.
   • True Color directly feeds the red, green, and blue digital-to-analog converters (DACs).`,
    rubric: [
      { criteria: "Pixel storage mechanism (8-bit index vs 24-bit 3 bytes per pixel)", points: 1.5 },
      { criteria: "Color capacity (256 palette colors vs 16.7 million colors)", points: 1.5 },
      { criteria: "Storage size contrast (e.g. ~300 KB vs ~922 KB for 640x480)", points: 1.0 },
      { criteria: "Role of the Color Lookup Table (LUT / Palette)", points: 1.0 }
    ]
  },
  {
    id: "ESSAY-03",
    num: 3,
    question: "Compare between: A. Enhancement versus Restoration? B. Set versus Logical operations based images enhancements?",
    maxPoints: 6,
    lecture: "Week 01 & Week 03 (Part 1 & Lecture 03)",
    slides: [3, 8, 28, 34],
    topic: "Comparison of Techniques",
    keyPoints: [
      "Enhancement: Problem-oriented, subjective (observer is ultimate judge), no degradation model",
      "Restoration: Objective process, inverts known/estimated degradation using mathematical models",
      "Set operations: Union (max), Intersection (min), Complement (255 - I, negative/solarization)",
      "Logical operations: Bitwise AND, OR, NOT, XOR applied on binary/bit-planes for masking"
    ],
    modelAnswer: `Part A: Enhancement versus Restoration:
• Image Enhancement:
  1. Purpose: To process an image so that the result is more suitable or visually pleasing than the original for a specific application or viewer.
  2. Nature: A largely SUBJECTIVE process; the human observer is the ultimate judge.
  3. Modeling: Does not rely on a mathematical model of degradation. It is heuristic and problem-oriented (e.g., contrast stretching, unsharp masking).
• Image Restoration:
  1. Purpose: To reconstruct or recover an image by inverting known or estimated degradations (e.g., motion blur, atmospheric turbulence, sensor noise).
  2. Nature: An OBJECTIVE process grounded in mathematical, physical, or probabilistic degradation functions.
  3. Modeling: Formulates an inverse or Wiener filter to invert the degradation mechanism.

Part B: Set versus Logical Operations Based Image Enhancements:
• Set Operations:
  - Treat image components as sets of pixels (objects and backgrounds).
  - Main operations:
    * Union: g(x,y) = max[A(x,y), B(x,y)]
    * Intersection: g(x,y) = min[A(x,y), B(x,y)]
    * Complement: g(x,y) = 255 - f(x,y) (creates digital negative; partial complement creates solarization).
• Logical Operations:
  - Boolean algebraic operations: AND, OR, NOT, and XOR.
  - Typically performed bitwise on binary images or individual bit-planes of grayscale images.
  - Applications: Masking / ROI extraction (AND with binary mask), combining regions (OR), and difference detection (XOR).`,
    rubric: [
      { criteria: "Enhancement (subjective, viewer judge, problem-oriented)", points: 1.5 },
      { criteria: "Restoration (objective, mathematical degradation inversion)", points: 1.5 },
      { criteria: "Set operations (Union=max, Intersection=min, Complement=negative/solarization)", points: 1.5 },
      { criteria: "Logical operations (Bitwise AND/OR/NOT/XOR on binary/bitplanes for masks)", points: 1.5 }
    ]
  },
  {
    id: "ESSAY-04",
    num: 4,
    question: "Draw / Describe the types of the neighborhood relationship between pixels?",
    maxPoints: 5,
    lecture: "Week 02 - Lecture 02",
    slides: [4, 5, 6],
    topic: "Pixel Neighborhoods",
    keyPoints: [
      "4-neighbors N4(p): (x+1,y), (x-1,y), (x,y+1), (x,y-1) — horizontal and vertical neighbors",
      "Diagonal neighbors ND(p): (x+1,y+1), (x+1,y-1), (x-1,y+1), (x-1,y-1) — 4 diagonal corners",
      "8-neighbors N8(p): N4(p) U ND(p) — all 8 surrounding pixels in a 3x3 window"
    ],
    modelAnswer: `Given a central pixel p at spatial coordinates (x, y):

1. 4-Neighbors of p, denoted N4(p):
   • Consists solely of the 4 horizontal and vertical orthogonal neighbors:
     - (x, y - 1)   [North / Above]
     - (x, y + 1)   [South / Below]
     - (x - 1, y)   [West / Left]
     - (x + 1, y)   [East / Right]
   • Coordinates are at Euclidean distance 1 from (x, y).

2. Diagonal Neighbors of p, denoted ND(p):
   • Consists of the 4 corner diagonal neighbors:
     - (x - 1, y - 1)  [North-West]
     - (x + 1, y - 1)  [North-East]
     - (x - 1, y + 1)  [South-West]
     - (x + 1, y + 1)  [South-East]
   • Coordinates are at Euclidean distance sqrt(2) ≈ 1.414 from (x, y).

3. 8-Neighbors of p, denoted N8(p):
   • Formed by the union of 4-neighbors and diagonal neighbors:
     N8(p) = N4(p) U ND(p)
   • Encompasses all 8 pixels surrounding p in a 3×3 grid.`,
    rubric: [
      { criteria: "N4(p) exact coordinates and horizontal/vertical orthogonal definition", points: 1.75 },
      { criteria: "ND(p) exact coordinates and diagonal corner definition", points: 1.75 },
      { criteria: "N8(p) union definition (N4 U ND) covering all 8 neighbors", points: 1.5 }
    ]
  },
  {
    id: "ESSAY-05",
    num: 5,
    question: "Why is an edge considered a local concept?",
    maxPoints: 4,
    lecture: "Week 02 - Lecture 02",
    slides: [15],
    topic: "Edge vs Boundary",
    keyPoints: [
      "Edge is computed locally using intensity discontinuity / gradient at a point",
      "Edge does not require global knowledge of the object or closed path",
      "Boundary is a global concept forming a closed path enclosing a finite region"
    ],
    modelAnswer: `An edge is considered a local concept for the following reasons:

1. Local Discontinuity Measurement:
   • An edge is detected and computed purely from a local measure of intensity-level discontinuity (such as spatial gradient or Laplacian derivative) evaluated within an immediate small neighborhood (e.g., 3×3 window) centered at that pixel.

2. Absence of Global Topology Requirement:
   • An edge pixel does not need to connect to an overall shape or form a continuous closed loop. Isolated edge points, texture lines, or internal surface features (such as ridges on a coin) are classified as edges.

3. Contrast with Boundary:
   • In direct contrast, a 'boundary' (contour / border) is a GLOBAL concept because it represents the continuous perimeter of a finite connected region, forming an unbroken closed path that delineates an entire object from its surrounding background.`,
    rubric: [
      { criteria: "Explanation of local intensity discontinuity / gradient calculation", points: 2.0 },
      { criteria: "Contrast with boundary as a global closed-path concept", points: 2.0 }
    ]
  },
  {
    id: "ESSAY-06",
    num: 6,
    question: "Calculate the size of an 256x256 true colored image?",
    maxPoints: 5,
    lecture: "Week 01 - Lecture 01",
    slides: [44, 63],
    topic: "Storage Calculation",
    keyPoints: [
      "Dimensions: 256 x 256 = 65,536 pixels",
      "True Color depth: 24 bits/pixel = 3 bytes/pixel (8 bits each for R, G, B)",
      "Total bits: 256 * 256 * 24 = 1,572,864 bits",
      "Total bytes: 256 * 256 * 3 = 196,608 bytes",
      "In KB: 196,608 / 1024 = 192 KB (or 196.6 KB decimal)"
    ],
    modelAnswer: `Step-by-Step Calculation of Image File Size:

1. Given Parameters:
   • Image Width (M) = 256 pixels
   • Image Height (N) = 256 pixels
   • Total Pixels = M × N = 256 × 256 = 65,536 pixels
   • Image Type = True Color (RGB)
   • Intensity Resolution (k) = 24 bits per pixel (8 bits for Red, 8 bits for Green, 8 bits for Blue), which equals 3 bytes per pixel.

2. Calculation in Bits:
   Total Bits (b) = M × N × k
   b = 256 × 256 × 24 = 1,572,864 bits.

3. Calculation in Bytes:
   Total Bytes = Total Bits / 8 = M × N × 3
   Total Bytes = 256 × 256 × 3 = 196,608 bytes.

4. Conversion to Kilobytes (KB):
   • Binary standard (1 KB = 1024 bytes):
     Size = 196,608 / 1024 = 192 KB.
   • Decimal standard (1 KB = 1000 bytes):
     Size = 196,608 / 1000 = 196.608 KB.

Final Answer:
Total Size = 196,608 Bytes = 192 KB.`,
    rubric: [
      { criteria: "Correct pixel count (256 x 256 = 65,536 pixels)", points: 1.0 },
      { criteria: "Correct color depth (24 bits = 3 bytes per pixel)", points: 1.5 },
      { criteria: "Correct total bytes calculation (196,608 bytes)", points: 1.5 },
      { criteria: "Accurate KB conversion (192 KB binary)", points: 1.0 }
    ]
  }
];
