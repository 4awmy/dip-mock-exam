import type { TrueFalseQuestion, MCQQuestion, EssayQuestion, ExamMetadata } from './examData';

export const EXAM_METADATA_2: ExamMetadata = {
  courseCode: "CCS4505",
  courseTitle: "Digital Image Processing",
  institution: "College of Computing & Information Technology — AASTMT",
  examTitle: "Midterm Real Mock Examination 2 (Comprehensive Midterm Simulation)",
  sourceDoc: "Course Lectures Weeks 01, 02 & 03 (Core Exam Syllabi)",
  lectures: [
    "Week 01 - Lecture 01: Light, Eye, Sensing, Sampling, Quantization, Representation & Applications",
    "Week 02 - Lecture 02: Neighbors, Adjacency, m-Adjacency, Paths, Distances, Linear vs Non-Linear",
    "Week 03 - Lecture 03 & Part 1: Spatial Domain, Point Processing, Arithmetic, Set & Logic Operations"
  ],
  totalTF: 30,
  totalMCQ: 16,
  totalEssay: 6,
  totalPoints: 76,
  timeLimitMinutes: 45
};

export const TF_QUESTIONS_2: TrueFalseQuestion[] = [
  {
    id: "M2-TF-01",
    num: 1,
    question: "The colors that humans perceive in an object are determined by the nature of the light reflected from the object.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 11,
    slideTitle: "What Are Image Sources ? - 2",
    quote: "The colors that humans perceive in an object are determined by the nature of the light reflected from the object.",
    explanation: "True. Human color perception depends on the spectral distribution of electromagnetic wavelengths reflected from the object's surface into the eye.",
    topic: "Color Perception"
  },
  {
    id: "M2-TF-02",
    num: 2,
    question: "An object that favors reflectance in a limited range of the visible spectrum appears white.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 11,
    slideTitle: "What Are Image Sources ? - 2",
    quote: "However, an object that favors reflectance in a limited range of the visible spectrum exhibits some shades of color.",
    explanation: "False. An object favoring reflectance in a narrow range exhibits color; balanced reflectance across all visible wavelengths produces white.",
    topic: "Color Perception"
  },
  {
    id: "M2-TF-03",
    num: 3,
    question: "Achromatic light is another term used to describe monochromatic light.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 11,
    slideTitle: "What Are Image Sources ? - 2",
    quote: "Light that is void of color is called monochromatic (achromatic) light, where its only attribute is its intensity or amount.",
    explanation: "True. 'Achromatic' literally means without color, making it synonymous with monochromatic or grayscale light.",
    topic: "Light Properties"
  },
  {
    id: "M2-TF-04",
    num: 4,
    question: "Radiance is a subjective descriptor of light perception that cannot be physically measured.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 12,
    slideTitle: "What Are Image Sources ? - 3",
    quote: "Radiance is the total amount of energy that flows from the light source, and it is usually measured in watts.",
    explanation: "False. Radiance is an objective, measurable physical quantity (in watts). Brightness is the subjective descriptor.",
    topic: "Photometric Quantities"
  },
  {
    id: "M2-TF-05",
    num: 5,
    question: "A procedure which makes an image look better for human interpretation may be the worst procedure for machine perception.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 20,
    slideTitle: "What Is Image Processing?",
    quote: "Procedure which satisfies condition (1) -makes an image look better- may be the very worst procedure for satisfying condition (2) and vice versa.",
    explanation: "True. Human visual enhancement (e.g. sharp high contrast, aesthetic textures) often introduces noise or complexity detrimental to algorithmic segmentation.",
    topic: "DIP Objectives"
  },
  {
    id: "M2-TF-06",
    num: 6,
    question: "In low-level processing of images, both the input and the output are images.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 27,
    slideTitle: "What Is Digital Image Processing? - 2",
    quote: "Low Level Process | Input: Image | Output: Image | Examples: Noise Removal, Image Sharpening",
    explanation: "True. Low-level processing consists of primitive image-to-image operations such as noise reduction, filtering, and sharpening.",
    topic: "Processing Continuum"
  },
  {
    id: "M2-TF-07",
    num: 7,
    question: "In high-level processing of images, the input is an image and the output is attributes.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 27,
    slideTitle: "What Is Digital Image Processing? - 2",
    quote: "Mid Level Process | Input: Image | Output: Attributes... High Level Process | Input: Attributes | Output: Understanding",
    explanation: "False. Mid-level processing converts an image to attributes (e.g. edges, segments). High-level takes attributes and produces semantic understanding/decisions.",
    topic: "Processing Continuum"
  },
  {
    id: "M2-TF-08",
    num: 8,
    question: "As we move from low-level to high-level processing, the amount of data decreases while algorithmic complexity increases.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 28,
    slideTitle: "What Is Digital Image Processing? - 3",
    quote: "Algorithm Complexity Increases (Low -> High). Amount of Data Decreases (Raw data -> Classification/decision).",
    explanation: "True. Raw multidimensional pixel grids are condensed into compact attribute vectors and symbolic classifications, requiring higher algorithmic intelligence.",
    topic: "Processing Continuum"
  },
  {
    id: "M2-TF-09",
    num: 9,
    question: "In a flatbed scanner, an entire 2D image is captured simultaneously on a stationary large sensor array.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 32,
    slideTitle: "How Is A Digital Image Captured? - 2",
    quote: "Flat Bed Scanner: Instead of the entire image being captured at once on a large array, a single row of photosites (sensors) is moved across the image, capturing it row-by-row as it moves.",
    explanation: "False. A flatbed scanner moves a single 1D row of photosensors mechanically across the document row-by-row.",
    topic: "Image Acquisition"
  },
  {
    id: "M2-TF-10",
    num: 10,
    question: "Image sampling is dividing the continuous spatial coordinates of an image into discrete pixels.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 35,
    slideTitle: "How Is A Digital Image Sensed? - 2",
    quote: "Image sampling is dividing the captured continuous image coordinates into discrete pixels of the same size and shape.",
    explanation: "True. Sampling discretizes the continuous spatial domain (x, y) into a grid of discrete picture elements (pixels).",
    topic: "Sampling & Quantization"
  },
  {
    id: "M2-TF-11",
    num: 11,
    question: "Image quantization is dividing the continuous intensity range into a discrete number of gray levels.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 39,
    slideTitle: "How Is A Digital Image Sensed? - 6",
    quote: "Image quantization is dividing the captured image continuous intensity range of values into discrete number of intensity (gray) levels according to the number of assigned bits to encode gray level.",
    explanation: "True. Quantization discretizes the continuous voltage/radiance amplitude into integer brightness levels.",
    topic: "Sampling & Quantization"
  },
  {
    id: "M2-TF-12",
    num: 12,
    question: "False contouring occurs on smooth areas of an image when the number of quantization levels is insufficient.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 40,
    slideTitle: "How Is A Digital Image Sensed? - 7",
    quote: "If levels are not enough, false contouring can occur on the smooth area.",
    explanation: "True. Coarse quantization breaks smooth gradients into visible discrete bands or ridges known as false contouring.",
    topic: "Sampling & Quantization"
  },
  {
    id: "M2-TF-13",
    num: 13,
    question: "Spatial resolution is measured by the number of bits, k, used to quantize intensity.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 44,
    slideTitle: "How Is A Digital Image Represented? - 2",
    quote: "Spatial resolution refers to the smallest detectable detail in an image, and it is measured by the number of dots (pixels) per unit distance, i.e., inch (dpi). Intensity resolution (pixel depth) refers to... the number of bits, k...",
    explanation: "False. Spatial resolution is measured in dots per unit distance (dpi). The number of bits k measures intensity resolution (pixel depth).",
    topic: "Image Representation"
  },
  {
    id: "M2-TF-14",
    num: 14,
    question: "The number of bits required to store an N x N digitized image with k bits intensity resolution is b = N^2 * k.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 44,
    slideTitle: "How Is A Digital Image Represented? - 2",
    quote: "The number, b, of bits required to store a digitized image is b=M*N*k. If M = N, then b = N^2*k.",
    explanation: "True. Total bits is the product of total pixels (N x N) and the bits per pixel (k).",
    topic: "Image Storage"
  },
  {
    id: "M2-TF-15",
    num: 15,
    question: "An image with low dynamic range typically has a dim, washed-out look and low contrast.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 45,
    slideTitle: "How Is A Digital Image Represented? - 3",
    quote: "Conversely, an image with low dynamic range typically has a dim, washed-out gray look and low contrast.",
    explanation: "True. When pixels occupy a compressed sub-range of available intensities, the image appears flat, washed-out, and lacking contrast.",
    topic: "Image Representation"
  },
  {
    id: "M2-TF-16",
    num: 16,
    question: "Saturation is a variation of the intensity level from its true value due to random noise in the pipeline.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 46,
    slideTitle: "How Is A Digital Image Represented? - 4",
    quote: "Saturation is the highest value beyond which all intensity levels are clipped. Noise is a variation of the intensity level from its true value by a small (random) amount...",
    explanation: "False. Saturation is the sensor clipping ceiling. Noise is the random variation in intensity.",
    topic: "Image Representation"
  },
  {
    id: "M2-TF-17",
    num: 17,
    question: "An intensity (monochrome) image uses one byte per pixel to represent 256 gray shades.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 55,
    slideTitle: "Intensity (Monochrome) Image",
    quote: "Each pixel is commonly stored in one byte to represent the shades of gray, so it's also called Gray Level (Scale) image.",
    explanation: "True. 1 byte = 8 bits, providing 2^8 = 256 gray shades from 0 (black) to 255 (white).",
    topic: "Image Types"
  },
  {
    id: "M2-TF-18",
    num: 18,
    question: "In an indexed color image, each pixel contains the 24-bit RGB values directly.",
    correctAnswer: false,
    lecture: "Week 01 - Lecture 01",
    slide: 60,
    slideTitle: "Indexed (Palette) Colored Image",
    quote: "Each pixel contains an index number pointing to a 3-values color in a color table (palette). Stores not color but instead an index into a LUT/palette...",
    explanation: "False. Indexed color pixels contain an index pointing into a color lookup table (palette), not direct 24-bit RGB values.",
    topic: "Image Types"
  },
  {
    id: "M2-TF-19",
    num: 19,
    question: "A 640x480 indexed 8-bit color image requires about 300 KB of storage compared to about 922 KB for a true color image.",
    correctAnswer: true,
    lecture: "Week 01 - Lecture 01",
    slide: 61,
    slideTitle: "What Are Digital Image Types? - 9",
    quote: "Note the great savings in space for 8-bit images over 24-bit ones, i.e., 640 x 480 8-bit color image requires about 300 KB of storage, compared to 922 KB for a color image.",
    explanation: "True. Storing 1 byte per pixel saves roughly two-thirds of the memory required for 3 bytes per pixel.",
    topic: "Image Types"
  },
  {
    id: "M2-TF-20",
    num: 20,
    question: "If pixel q is in the diagonal neighborhood ND(p) of pixel p, then pixel p must be in ND(q).",
    correctAnswer: true,
    lecture: "Week 02 - Lecture 02",
    slide: 5,
    slideTitle: "Some Basic Relationships Between Pixels-2",
    quote: "Note: q in ND(p) implies p in ND(q).",
    explanation: "True. Neighborhood relationships are symmetric: if q is a neighbor of p, p is inherently a neighbor of q.",
    topic: "Pixel Relationships"
  },
  {
    id: "M2-TF-21",
    num: 21,
    question: "Two pixels with the same intensity value are always 4-adjacent regardless of their spatial coordinates.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 7,
    slideTitle: "Some Basic Relationships Between Pixels-4",
    quote: "Two pixels are adjacent if they have the same intensity or color and they are neighbors of one another.",
    explanation: "False. Adjacency strictly requires two conditions: (1) matching intensity from set V, AND (2) spatial neighborhood proximity.",
    topic: "Pixel Adjacency"
  },
  {
    id: "M2-TF-22",
    num: 22,
    question: "Mixed adjacency (m-adjacency) allows multiple paths between two adjacent pixels to prevent disconnected regions.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 9,
    slideTitle: "Some Basic Relationships Between Pixels-6",
    quote: "m-adjacency is a modification of 8-adjacency, so it is introduced to eliminate the ambiguities that often arise when 8-adjacency is used.",
    explanation: "False. M-adjacency eliminates multiple ambiguous paths by discarding diagonal links when 4-neighbor connections already exist.",
    topic: "Pixel Adjacency & Paths"
  },
  {
    id: "M2-TF-23",
    num: 23,
    question: "A digital path from pixel p to pixel q is a closed path if its starting pixel and ending pixel are identical.",
    correctAnswer: true,
    lecture: "Week 02 - Lecture 02",
    slide: 11,
    slideTitle: "Some Basic Relationships Between Pixels-8",
    quote: "If (x0,y0) = (xn,yn), then path is a closed path.",
    explanation: "True. By definition, a digital curve that begins and ends at the exact same pixel coordinates forms a closed path.",
    topic: "Paths & Connectivity"
  },
  {
    id: "M2-TF-24",
    num: 24,
    question: "An edge is a global concept because it encircles the entire boundary of an object.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 15,
    slideTitle: "Some Basic Relationships Between Pixels-12",
    quote: "There is a key difference between boundary and edge concepts, where boundary of a finite region forms a closed path and is thus a 'global' while edge is a 'local' concept...",
    explanation: "False. An edge is a local concept based on intensity discontinuity at a point. The boundary of a region is the global concept.",
    topic: "Edge vs Boundary"
  },
  {
    id: "M2-TF-25",
    num: 25,
    question: "The pixels having a Euclidean distance De from (x, y) less than or equal to r form a diamond centered at (x, y).",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 17,
    slideTitle: "Pixels Distance Measures",
    quote: "The pixels having an Euclidean distance from (x,y) less than or equal to some value r form a disk of radius r centered at (x,y).",
    explanation: "False. Euclidean distance forms a circular disk. City-block (D4) distance forms a diamond.",
    topic: "Distance Metrics"
  },
  {
    id: "M2-TF-26",
    num: 26,
    question: "The D4-distance (city-block) between pixels (x, y) and (s, t) depends on the values of the pixels along the path.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 18,
    slideTitle: "Pixels Distance Measures-2 & 4",
    quote: "D4 depends only on the coordinates of the pixels: |x-s| + |y-t|. Dm-distance depends on the values of the pixels along the shortest m-path...",
    explanation: "False. D4, D8, and De depend strictly on pixel coordinates. Only Dm-distance depends on pixel intensity values along the path.",
    topic: "Distance Metrics"
  },
  {
    id: "M2-TF-27",
    num: 27,
    question: "Matrix multiplication of images is identical to the array product of images.",
    correctAnswer: false,
    lecture: "Week 02 - Lecture 02",
    slide: 21,
    slideTitle: "Digital Image Mathematics",
    quote: "An array operation involving one or more images is carried out on a pixel-by-pixel basis, so it is for this reason that a clear distinction must be made between array and matrix operation.",
    explanation: "False. Array operations are element-wise (pixel-by-pixel). Matrix multiplication follows row-by-column linear algebra rules.",
    topic: "Digital Image Mathematics"
  },
  {
    id: "M2-TF-28",
    num: 28,
    question: "Image averaging across multiple registered noisy frames of the same scene is used for noise reduction.",
    correctAnswer: true,
    lecture: "Week 03 - Lecture 03",
    slide: 11,
    slideTitle: "Arithmetic Operations-4",
    quote: "A clear example of using image addition operation is in calculating the average image of a scene for noise reduction.",
    explanation: "True. Adding and averaging K noisy images reduces uncorrelated zero-mean noise variance by a factor of K.",
    topic: "Image Arithmetic"
  },
  {
    id: "M2-TF-29",
    num: 29,
    question: "Image division by a flat-field illumination image is commonly used for shading correction.",
    correctAnswer: true,
    lecture: "Week 03 - Lecture 03",
    slide: 20,
    slideTitle: "Arithmetic Operations-13",
    quote: "A clear example of using image division operation is in image shading correction. Suppose that an imaging sensor produces non-uniform lighting...",
    explanation: "True. Dividing an image by a calibration image of a uniform surface compensates for non-uniform illumination and vignetting.",
    topic: "Image Arithmetic"
  },
  {
    id: "M2-TF-30",
    num: 30,
    question: "Complementing only part of an image creates an interesting special effect known as solarization.",
    correctAnswer: true,
    lecture: "Week 03 - Lecture 03",
    slide: 32,
    slideTitle: "Set Operations-5",
    quote: "Interesting special effects can be obtained by complementing only part of the image (solarization).",
    explanation: "True. Solarization in digital image processing is achieved by partially inverting gray levels above or below a threshold.",
    topic: "Set Operations"
  }
];

export const MCQ_QUESTIONS_2: MCQQuestion[] = [
  {
    id: "M2-MCQ-01",
    num: 1,
    question: "The visible spectrum of electromagnetic radiation sensed by the human eye roughly spans wavelengths from ……….",
    options: [
      { key: "A", text: "400 nm to 700 nm" },
      { key: "B", text: "100 nm to 300 nm" },
      { key: "C", text: "800 nm to 1200 nm" },
      { key: "D", text: "1 nm to 100 nm" }
    ],
    correctOption: "A",
    correctText: "400 nm to 700 nm",
    lecture: "Week 01 - Lecture 01",
    slide: 10,
    slideTitle: "What Are Image Sources ?",
    quote: "The visible band of the EM spectrum spans from approximately 0.43 to 0.79 um (400 to 700 nm).",
    explanation: "The human visual system is sensitive to electromagnetic radiation within approximately 400 nm (violet) to 700 nm (red).",
    topic: "Light & EM Spectrum"
  },
  {
    id: "M2-MCQ-02",
    num: 2,
    question: "Which quantity gives an objective measure of the amount of energy an observer perceives from a light source, measured in lumens?",
    options: [
      { key: "A", text: "Radiance" },
      { key: "B", text: "Luminance" },
      { key: "C", text: "Brightness" },
      { key: "D", text: "Reflectance" }
    ],
    correctOption: "B",
    correctText: "Luminance",
    lecture: "Week 01 - Lecture 01",
    slide: 13,
    slideTitle: "What Are Image Sources ? - 4",
    quote: "Luminance, measured in lumens, gives a measure of the amount of energy an observer perceives from a light source.",
    explanation: "Luminance measures perceived optical energy in lumens, scaled by the human spectral sensitivity curve.",
    topic: "Photometric Quantities"
  },
  {
    id: "M2-MCQ-03",
    num: 3,
    question: "Which stage in digital image processing takes an image as input and produces an image as output?",
    options: [
      { key: "A", text: "Low-level processing" },
      { key: "B", text: "Mid-level processing" },
      { key: "C", text: "High-level processing" },
      { key: "D", text: "Cognitive interpretation" }
    ],
    correctOption: "A",
    correctText: "Low-level processing",
    lecture: "Week 01 - Lecture 01",
    slide: 27,
    slideTitle: "What Is Digital Image Processing? - 2",
    quote: "Low Level Process: Input: Image, Output: Image (e.g. noise removal, sharpening).",
    explanation: "Low-level processing is characterized by image-in, image-out transformations.",
    topic: "Processing Hierarchy"
  },
  {
    id: "M2-MCQ-04",
    num: 4,
    question: "The process of digitizing continuous spatial coordinates into discrete spatial grid points is called ……….",
    options: [
      { key: "A", text: "Quantization" },
      { key: "B", text: "Sampling" },
      { key: "C", text: "Interpolation" },
      { key: "D", text: "Thresholding" }
    ],
    correctOption: "B",
    correctText: "Sampling",
    lecture: "Week 01 - Lecture 01",
    slide: 34,
    slideTitle: "How Is A Digital Image Sensed?",
    quote: "Digitizing the coordinates values is called image sampling. Digitizing the amplitude values is called image quantization.",
    explanation: "Spatial coordinate discretization is sampling; amplitude discretization is quantization.",
    topic: "Sampling & Quantization"
  },
  {
    id: "M2-MCQ-05",
    num: 5,
    question: "The storage size in bytes required for a 512x512 monochrome image quantized at 8 bits per pixel is ……….",
    options: [
      { key: "A", text: "262,144 bytes" },
      { key: "B", text: "524,288 bytes" },
      { key: "C", text: "2,097,152 bytes" },
      { key: "D", text: "65,536 bytes" }
    ],
    correctOption: "A",
    correctText: "262,144 bytes",
    lecture: "Week 01 - Lecture 01",
    slide: 44,
    slideTitle: "How Is A Digital Image Represented? - 2",
    quote: "b = M * N * k bits = 512 * 512 * 8 = 2,097,152 bits. Total Bytes = 2,097,152 / 8 = 262,144 bytes.",
    explanation: "512 x 512 = 262,144 pixels. At 1 byte per pixel (8 bits), the storage is exactly 262,144 bytes (256 KB).",
    topic: "Image Storage"
  },
  {
    id: "M2-MCQ-06",
    num: 6,
    question: "The difference in intensity between the highest and lowest intensity levels in an image is defined as ……….",
    options: [
      { key: "A", text: "Saturation" },
      { key: "B", text: "Contrast" },
      { key: "C", text: "Dynamic Range" },
      { key: "D", text: "Noise" }
    ],
    correctOption: "B",
    correctText: "Contrast",
    lecture: "Week 01 - Lecture 01",
    slide: 45,
    slideTitle: "How Is A Digital Image Represented? - 3",
    quote: "Closely associated with the dynamic range concept is image contrast, which is the difference in intensity between the highest and lowest intensity levels in an image.",
    explanation: "Contrast measures the span or difference between maximum and minimum intensity levels present in the image.",
    topic: "Image Representation"
  },
  {
    id: "M2-MCQ-07",
    num: 7,
    question: "In an indexed color image with 256 colors, each pixel is stored using ……….",
    options: [
      { key: "A", text: "1 bit" },
      { key: "B", text: "1 byte" },
      { key: "C", text: "3 bytes" },
      { key: "D", text: "4 bytes" }
    ],
    correctOption: "B",
    correctText: "1 byte",
    lecture: "Week 01 - Lecture 01",
    slide: 61,
    slideTitle: "What Are Digital Image Types? - 9",
    quote: "8-bit color image (so-called 256 colors) files use the concept of a lookup table (LUT)/palette to store color information... 1 byte per pixel.",
    explanation: "Each pixel stores an 8-bit index (1 byte) pointing to one of 256 RGB entries in the palette.",
    topic: "Image Types"
  },
  {
    id: "M2-MCQ-08",
    num: 8,
    question: "How many bytes of storage does a single true-color RGB pixel require?",
    options: [
      { key: "A", text: "1 byte" },
      { key: "B", text: "2 bytes" },
      { key: "C", text: "3 bytes" },
      { key: "D", text: "4 bytes" }
    ],
    correctOption: "C",
    correctText: "3 bytes",
    lecture: "Week 01 - Lecture 01",
    slide: 63,
    slideTitle: "What Are Digital Image Types? - 11",
    quote: "True Color (RGB) Image: Each pixel requires 24 bits (3 bytes: 1 byte Red, 1 byte Green, 1 byte Blue).",
    explanation: "True color RGB allocates 8 bits (1 byte) for each of the three color primaries (Red, Green, Blue) = 3 bytes total.",
    topic: "Image Types"
  },
  {
    id: "M2-MCQ-09",
    num: 9,
    question: "The diagonal neighborhood ND(p) of a central pixel p(x, y) contains exactly ……… pixels.",
    options: [
      { key: "A", text: "two" },
      { key: "B", text: "three" },
      { key: "C", text: "four" },
      { key: "D", text: "eight" }
    ],
    correctOption: "C",
    correctText: "four",
    lecture: "Week 02 - Lecture 02",
    slide: 5,
    slideTitle: "Some Basic Relationships Between Pixels-2",
    quote: "ND(p) = (X-1,Y-1), (X+1,Y-1), (X-1,Y+1), (X+1,Y+1). Diagonal-neighborhood relation considers only diagonal neighbors.",
    explanation: "ND(p) consists of the 4 corner pixels at coordinates (x±1, y±1).",
    topic: "Pixel Neighborhoods"
  },
  {
    id: "M2-MCQ-10",
    num: 10,
    question: "Pixels having a D4-distance (city-block) from (x, y) less than or equal to r form a ……… centered at (x, y).",
    options: [
      { key: "A", text: "circular disk" },
      { key: "B", text: "square" },
      { key: "C", text: "diamond" },
      { key: "D", text: "triangle" }
    ],
    correctOption: "C",
    correctText: "diamond",
    lecture: "Week 02 - Lecture 02",
    slide: 18,
    slideTitle: "Pixels Distance Measures-2",
    quote: "The pixels having a D4-distance from (x,y) less than or equal to some value r form a diamond centered at (x,y).",
    explanation: "The D4 locus of points $|x-s| + |y-t| \le r$ forms a diamond rotated by 45 degrees.",
    topic: "Distance Measures"
  },
  {
    id: "M2-MCQ-11",
    num: 11,
    question: "Which distance metric between two pixels depends on the intensity values of the pixels along the path?",
    options: [
      { key: "A", text: "Euclidean distance (De)" },
      { key: "B", text: "City-block distance (D4)" },
      { key: "C", text: "Chessboard distance (D8)" },
      { key: "D", text: "Mixed-path distance (Dm)" }
    ],
    correctOption: "D",
    correctText: "Mixed-path distance (Dm)",
    lecture: "Week 02 - Lecture 02",
    slide: 20,
    slideTitle: "Pixels Distance Measures-4",
    quote: "Dm-distance will depend on the values of the pixels along the shortest m-path, as well as the values of their neighbors, other than previously defined three distances (De, D4, D8) which depend only on coordinates.",
    explanation: "Dm depends on pixel intensity connectivity V along the path; De, D4, and D8 depend solely on spatial coordinates.",
    topic: "Distance Measures"
  },
  {
    id: "M2-MCQ-12",
    num: 12,
    question: "An operator H that satisfies H[a * f1 + b * f2] = a * H[f1] + b * H[f2] is mathematically defined as a ……… operator.",
    options: [
      { key: "A", text: "Linear" },
      { key: "B", text: "Nonlinear" },
      { key: "C", text: "Median" },
      { key: "D", text: "Morphological" }
    ],
    correctOption: "A",
    correctText: "Linear",
    lecture: "Week 02 - Lecture 02",
    slide: 22,
    slideTitle: "Linear Vs Non-Linear Operations",
    quote: "H is said to be a linear operator if: H[ ai fi + aj fj ] = ai H[fi] + aj H[fj].",
    explanation: "Linear operators obey both additivity (superposition) and homogeneity (scalar scaling).",
    topic: "Linear Operators"
  },
  {
    id: "M2-MCQ-13",
    num: 13,
    question: "Spatial domain image enhancement methods that operate with a neighborhood size of 1x1 are called ……….",
    options: [
      { key: "A", text: "Mask (local) methods" },
      { key: "B", text: "Point (single-pixel) methods" },
      { key: "C", text: "Geometric (global) methods" },
      { key: "D", text: "Frequency domain filters" }
    ],
    correctOption: "B",
    correctText: "Point (single-pixel) methods",
    lecture: "Week 03 - Part 1",
    slide: 10,
    slideTitle: "Spatial Image Enhancement Methods",
    quote: "(a) Point (Single-Pixel) Methods: The neighbourhood is simply of size 1x1 (the pixel itself).",
    explanation: "Point operations process each pixel individually without referencing surrounding spatial neighbors.",
    topic: "Spatial Enhancement"
  },
  {
    id: "M2-MCQ-14",
    num: 14,
    question: "Which arithmetic operation is commonly used to extract a Region of Interest (ROI) using a binary mask?",
    options: [
      { key: "A", text: "Addition" },
      { key: "B", text: "Subtraction" },
      { key: "C", text: "Multiplication" },
      { key: "D", text: "Division" }
    ],
    correctOption: "C",
    correctText: "Multiplication",
    lecture: "Week 03 - Lecture 03",
    slide: 18,
    slideTitle: "Arithmetic Operations-11",
    quote: "A clear example of using image multiplication operation is in masking, also called region of interest (ROI) extraction.",
    explanation: "Multiplying an image by a binary mask (1 for ROI, 0 elsewhere) extracts the desired region and zeroes the background.",
    topic: "Image Arithmetic"
  },
  {
    id: "M2-MCQ-15",
    num: 15,
    question: "In digital image set operations, the union of two intensity images corresponds to the ………. of corresponding pixel pairs.",
    options: [
      { key: "A", text: "Minimum" },
      { key: "B", text: "Maximum" },
      { key: "C", text: "Average" },
      { key: "D", text: "Product" }
    ],
    correctOption: "B",
    correctText: "Maximum",
    lecture: "Week 03 - Lecture 03",
    slide: 29,
    slideTitle: "Set Operations-2",
    quote: "The Union and intersection operations on two images are defined as the max and min of corresponding pixel pairs, respectively.",
    explanation: "Image Set Union maps to the element-wise maximum: max(A(x,y), B(x,y)).",
    topic: "Set Operations"
  },
  {
    id: "M2-MCQ-16",
    num: 16,
    question: "When rescaling arithmetic operation results into the 8-bit [0, 255] range, the first step calculates fm = f - min(f) to ensure the minimum value is ……….",
    options: [
      { key: "A", text: "-1" },
      { key: "B", text: "0" },
      { key: "C", text: "1" },
      { key: "D", text: "255" }
    ],
    correctOption: "B",
    correctText: "0",
    lecture: "Week 03 - Lecture 03",
    slide: 27,
    slideTitle: "Arithmetic Operations-20",
    quote: "(1) Calculate fm = f – min(f) which creates an image whose minimum value is 0.",
    explanation: "Subtracting min(f) shifts the lowest intensity in the image down to exactly 0.",
    topic: "Image Rescaling"
  }
];

export const ESSAY_QUESTIONS_2: EssayQuestion[] = [
  {
    id: "M2-ESSAY-01",
    num: 1,
    question: "Explain the difference between image sampling and image quantization, and describe the visual artifact that appears when each is insufficient.",
    maxPoints: 5,
    lecture: "Week 01 - Lecture 01",
    slides: [34, 35, 39, 40],
    topic: "Sampling vs Quantization",
    keyPoints: [
      "Sampling: Discretization of continuous spatial coordinates (x, y)",
      "Quantization: Discretization of continuous amplitude/intensity f(x, y)",
      "Insufficient sampling artifact: Checkerboard effect / pixelation / spatial aliasing",
      "Insufficient quantization artifact: False contouring (banding on smooth gradients)"
    ],
    modelAnswer: `1. Image Sampling:
   • Definition: The process of digitizing continuous spatial coordinates (x, y) into a discrete 2D grid of pixels.
   • Artifact when insufficient: Under-sampling causes the 'checkerboard effect' (pixelation, blockiness, and high-frequency spatial aliasing/Moiré patterns).

2. Image Quantization:
   • Definition: The process of dividing continuous sensor amplitude/intensity values into a finite number of discrete gray levels (L = 2^k).
   • Artifact when insufficient: When quantization levels are too low (e.g., 2, 4, or 8 levels), smooth gradations of light are broken into visible steps and artificial ridges known as 'false contouring' (banding).`,
    rubric: [
      { criteria: "Sampling definition (spatial coordinate discretization)", points: 1.25 },
      { criteria: "Quantization definition (intensity amplitude discretization)", points: 1.25 },
      { criteria: "Under-sampling artifact explained (checkerboard / pixelation)", points: 1.25 },
      { criteria: "Under-quantization artifact explained (false contouring / banding)", points: 1.25 }
    ]
  },
  {
    id: "M2-ESSAY-02",
    num: 2,
    question: "Given a 512x512 grayscale image and a 512x512 true-color (RGB) image, calculate the required storage size for each in bytes and kilobytes (KB). Explain why true-color images require three times as much memory.",
    maxPoints: 5,
    lecture: "Week 01 - Lecture 01",
    slides: [44, 55, 63],
    topic: "Storage Calculation",
    keyPoints: [
      "Total pixels = 512 * 512 = 262,144 pixels",
      "Grayscale: 8 bits/pixel = 1 byte/pixel -> 262,144 bytes = 256 KB",
      "True Color: 24 bits/pixel = 3 bytes/pixel -> 786,432 bytes = 768 KB",
      "Explanation: True color stores 3 distinct 8-bit channels (Red, Green, Blue) for every pixel"
    ],
    modelAnswer: `1. Total Pixel Count:
   Total Pixels = 512 × 512 = 262,144 pixels.

2. Grayscale (Monochrome) Image Storage:
   • Depth: 8 bits per pixel = 1 byte per pixel.
   • Total Bytes = 262,144 pixels × 1 byte = 262,144 bytes.
   • In KB (binary, 1024 bytes/KB): 262,144 / 1024 = 256 KB.

3. True Color (RGB) Image Storage:
   • Depth: 24 bits per pixel = 3 bytes per pixel (8 bits Red, 8 bits Green, 8 bits Blue).
   • Total Bytes = 262,144 pixels × 3 bytes = 786,432 bytes.
   • In KB: 786,432 / 1024 = 768 KB.

4. Explanation of 3x Ratio:
   A grayscale pixel stores a single scalar luminance value (1 channel). A true-color pixel stores three independent color components (Red, Green, Blue) with 8 bits each, tripling the required memory.`,
    rubric: [
      { criteria: "Total pixel count computed correctly (262,144 pixels)", points: 1.0 },
      { criteria: "Grayscale size computed correctly (262,144 bytes / 256 KB)", points: 1.5 },
      { criteria: "True color size computed correctly (786,432 bytes / 768 KB)", points: 1.5 },
      { criteria: "Explanation of 3-channel RGB storage architecture", points: 1.0 }
    ]
  },
  {
    id: "M2-ESSAY-03",
    num: 3,
    question: "Define 4-neighbors N4(p), diagonal neighbors ND(p), and 8-neighbors N8(p). Under what circumstances does 8-adjacency produce ambiguity, and how does m-adjacency resolve it?",
    maxPoints: 5,
    lecture: "Week 02 - Lecture 02",
    slides: [4, 5, 6, 7, 9],
    topic: "Neighbors & Adjacency",
    keyPoints: [
      "N4(p): (x+1,y), (x-1,y), (x,y+1), (x,y-1)",
      "ND(p): (x-1,y-1), (x+1,y-1), (x-1,y+1), (x+1,y+1)",
      "N8(p): Union of N4(p) and ND(p)",
      "8-adjacency ambiguity: Multiple simultaneous paths connecting the same pixels (e.g. 2x2 blocks)",
      "m-adjacency solution: Disallows diagonal connection if 4-neighbor connection already exists"
    ],
    modelAnswer: `1. Neighborhood Definitions for Pixel p at (x, y):
   • 4-Neighbors N4(p): Horizontal and vertical neighbors:
     {(x+1, y), (x-1, y), (x, y+1), (x, y-1)}
   • Diagonal Neighbors ND(p): Corner neighbors:
     {(x-1, y-1), (x+1, y-1), (x-1, y+1), (x+1, y+1)}
   • 8-Neighbors N8(p): All 8 surrounding pixels:
     N8(p) = N4(p) U ND(p)

2. 8-Adjacency Ambiguity:
   When 8-adjacency is used, multiple paths can exist between two pixels in a connected region (for example, in a 2×2 block of 1s, paths can go orthogonally or diagonally). This creates ambiguity in contour tracing, region borders, and boundary length calculation.

3. M-Adjacency Resolution:
   M-adjacency (mixed adjacency) defines p and q to be adjacent if:
   a) q is in N4(p), OR
   b) q is in ND(p) AND N4(p) ∩ N4(q) has no pixels with values from V.
   This guarantees that if an orthogonal path exists, the diagonal path is discarded, eliminating multiple redundant paths.`,
    rubric: [
      { criteria: "N4(p), ND(p), and N8(p) defined with coordinates", points: 1.5 },
      { criteria: "Explanation of 8-adjacency path ambiguity", points: 1.75 },
      { criteria: "M-adjacency rule and how it eliminates ambiguity", points: 1.75 }
    ]
  },
  {
    id: "M2-ESSAY-04",
    num: 4,
    question: "Compare the three pixel distance metrics: Euclidean distance (De), City-block distance (D4), and Chessboard distance (D8). State the formula for each and the geometric shape formed by all pixels within distance r.",
    maxPoints: 5,
    lecture: "Week 02 - Lecture 02",
    slides: [17, 18, 19],
    topic: "Distance Metrics",
    keyPoints: [
      "Euclidean De: sqrt((x-s)^2 + (y-t)^2) -> forms circular disk",
      "City-block D4: |x-s| + |y-t| -> forms diamond",
      "Chessboard D8: max(|x-s|, |y-t|) -> forms square",
      "All three metrics depend purely on spatial coordinates"
    ],
    modelAnswer: `For pixel p at (x, y) and pixel q at (s, t):

1. Euclidean Distance (De):
   • Formula: De(p, q) = sqrt[(x - s)^2 + (y - t)^2]
   • Geometric Shape: Pixels with De(p, q) <= r form a circular DISK of radius r centered at (x, y).

2. City-Block Distance (D4):
   • Formula: D4(p, q) = |x - s| + |y - t|
   • Geometric Shape: Pixels with D4(p, q) <= r form a DIAMOND centered at (x, y).
   • Note: Movement is restricted to 4-neighbor directions (horizontal and vertical).

3. Chessboard Distance (D8):
   • Formula: D8(p, q) = max(|x - s|, |y - t|)
   • Geometric Shape: Pixels with D8(p, q) <= r form a SQUARE with sides of length 2r centered at (x, y).
   • Note: Movement corresponds to King's moves in chess (8-neighbor directions).`,
    rubric: [
      { criteria: "Euclidean formula and circular disk shape", points: 1.75 },
      { criteria: "City-block D4 formula and diamond shape", points: 1.75 },
      { criteria: "Chessboard D8 formula and square shape", points: 1.5 }
    ]
  },
  {
    id: "M2-ESSAY-05",
    num: 5,
    question: "Prove mathematically why the Max operator, which finds the maximum pixel intensity in an image, is a non-linear operator.",
    maxPoints: 5,
    lecture: "Week 02 - Lecture 02",
    slides: [22, 23],
    topic: "Linear vs Nonlinear",
    keyPoints: [
      "Linear operator test: H[a*f1 + b*f2] = a*H[f1] + b*H[f2]",
      "Select counter-example images (e.g. f1 and f2)",
      "Evaluate LHS: max(a*f1 + b*f2)",
      "Evaluate RHS: a*max(f1) + b*max(f2)",
      "Demonstrate inequality (LHS != RHS)"
    ],
    modelAnswer: `Mathematical Proof that the Max Operator is Non-Linear:

1. Condition for Linearity:
   An operator H is linear if and only if:
   H[ a1*f1(x, y) + a2*f2(x, y) ] = a1*H[f1(x, y)] + a2*H[f2(x, y)]
   for arbitrary constants a1, a2 and images f1, f2.

2. Counter-Example:
   Consider two 1x2 images:
   f1 = [ 10, 0 ]
   f2 = [ 0, 15 ]
   Let constants a1 = 1 and a2 = 1.

3. Evaluate Left-Hand Side (LHS):
   g = a1*f1 + a2*f2 = [ 10 + 0, 0 + 15 ] = [ 10, 15 ]
   H[ g ] = max(g) = max([ 10, 15 ]) = 15.

4. Evaluate Right-Hand Side (RHS):
   H[ f1 ] = max([ 10, 0 ]) = 10
   H[ f2 ] = max([ 0, 15 ]) = 15
   a1*H[ f1 ] + a2*H[ f2 ] = 1*(10) + 1*(15) = 25.

5. Conclusion:
   LHS (15) ≠ RHS (25).
   Since additivity fails, the Max operator is mathematically NON-LINEAR.`,
    rubric: [
      { criteria: "Statement of linearity equation (additivity & homogeneity)", points: 1.5 },
      { criteria: "Construction of valid image matrices/pixels counter-example", points: 1.5 },
      { criteria: "Step-by-step computation of LHS and RHS", points: 1.5 },
      { criteria: "Formal conclusion that LHS != RHS", points: 0.5 }
    ]
  },
  {
    id: "M2-ESSAY-06",
    num: 6,
    question: "Describe four distinct practical applications of image arithmetic operations (Addition, Subtraction, Multiplication, Division) in digital image processing, citing the specific problem each solves.",
    maxPoints: 6,
    lecture: "Week 03 - Lecture 03",
    slides: [10, 11, 14, 15, 18, 20],
    topic: "Arithmetic Operations",
    keyPoints: [
      "Addition: Image averaging for noise reduction (averaging K noisy frames)",
      "Subtraction: Medical difference imaging (e.g. digital angiography / background subtraction)",
      "Multiplication: Masking and Region of Interest (ROI) extraction",
      "Division: Shading correction (normalizing non-uniform sensor illumination)"
    ],
    modelAnswer: `Four Distinct Practical Applications of Image Arithmetic:

1. Image Addition — Multi-Image Averaging for Noise Reduction:
   • Problem: Thermal and transmission noise degrades images captured in low-light or remote sensing.
   • Solution: Adding K registered images of a static scene and dividing by K:
     g(x, y) = (1/K) * Sum[ fi(x, y) ]
   • Because zero-mean random noise cancels out across frames, the noise variance is reduced by a factor of K while preserving image details.

2. Image Subtraction — Medical Difference Imaging & Angiography:
   • Problem: Detecting vascular blockages obscured by dense bone structures.
   • Solution: Mask mode radiography subtracts a baseline pre-contrast X-ray from a post-contrast X-ray:
     g(x, y) = I_contrast(x, y) - I_mask(x, y)
   • Bones and static tissue cancel to 0, leaving only the blood vessels clearly visible.

3. Image Multiplication — Region of Interest (ROI) Masking:
   • Problem: Restricting subsequent processing (e.g. feature extraction) to a specific anatomical region or object.
   • Solution: Multiplying the original image by a binary mask image M(x, y) where ROI pixels are 1 and background is 0:
     g(x, y) = f(x, y) * M(x, y)
   • Leaves the ROI intact while setting irrelevant background pixels to black.

4. Image Division — Sensor Shading Correction:
   • Problem: Optical vignetting or non-uniform lens illumination causes brightness variations across a uniform field.
   • Solution: Dividing the acquired image by an illumination calibration image s(x, y) captured of a flat white surface:
     g(x, y) = f(x, y) / s(x, y)
   • Eliminates illumination gradient artifacts across the sensor array.`,
    rubric: [
      { criteria: "Addition: Image averaging for noise reduction explained", points: 1.5 },
      { criteria: "Subtraction: Medical differencing / angiography explained", points: 1.5 },
      { criteria: "Multiplication: ROI masking explained", points: 1.5 },
      { criteria: "Division: Shading correction explained", points: 1.5 }
    ]
  }
];
