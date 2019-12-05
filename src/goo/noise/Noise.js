import * as MathUtils from "../math/MathUtils";
var functionObject_fractal4d;
var functionObject_fractal3d;
var functionObject_fractal2d;
var functionObject_fractal1d;
var functionObject_split;
var functionObject_shifter;

/**
 * A base class for procedural noise functions.
 * Only used to define the class. Should never be instantiated.
 */
function Noise() {}

functionObject_shifter = [
    37,
    91,
    12,
    128,
    216,
    96,
    51,
    153,
    39,
    231,
    223,
    180,
    160,
    157,
    135,
    179,
    74,
    50,
    205,
    151,
    4,
    213,
    196,
    58,
    212,
    120,
    53,
    45,
    10,
    195,
    137,
    159,
    103,
    144,
    109,
    170,
    202,
    48,
    121,
    13,
    245,
    68,
    232,
    28,
    210,
    174,
    197,
    80,
    107,
    206,
    156,
    116,
    155,
    240,
    162,
    79,
    41,
    59,
    147,
    117,
    0,
    242,
    118,
    164,
    129,
    101,
    98,
    126,
    214,
    105,
    89,
    26,
    130,
    254,
    85,
    199,
    8,
    165,
    76,
    75,
    187,
    166,
    64,
    143,
    217,
    149,
    78,
    7,
    172,
    230,
    87,
    119,
    42,
    247,
    84,
    139,
    16,
    141,
    134,
    86,
    154,
    71,
    253,
    60,
    99,
    235,
    168,
    30,
    34,
    55,
    113,
    140,
    191,
    69,
    31,
    106,
    40,
    82,
    73,
    33,
    81,
    14,
    234,
    131,
    255,
    88,
    169,
    136,
    248,
    148,
    220,
    138,
    219,
    102,
    44,
    127,
    36,
    200,
    95,
    208,
    54,
    152,
    47,
    20,
    23,
    15,
    52,
    123,
    177,
    224,
    122,
    171,
    215,
    173,
    211,
    188,
    190,
    133,
    244,
    167,
    236,
    35,
    63,
    145,
    221,
    104,
    65,
    24,
    70,
    100,
    56,
    150,
    49,
    77,
    110,
    228,
    112,
    209,
    198,
    1,
    237,
    185,
    250,
    225,
    93,
    201,
    124,
    108,
    218,
    72,
    243,
    21,
    22,
    6,
    114,
    38,
    125,
    29,
    66,
    249,
    222,
    111,
    241,
    11,
    186,
    61,
    176,
    183,
    17,
    163,
    229,
    161,
    57,
    238,
    227,
    132,
    67,
    83,
    207,
    226,
    46,
    189,
    115,
    193,
    194,
    233,
    182,
    192,
    18,
    27,
    25,
    2,
    3,
    252,
    97,
    62,
    184,
    239,
    175,
    92,
    246,
    142,
    251,
    204,
    203,
    32,
    146,
    90,
    19,
    9,
    178,
    158,
    181,
    94,
    43,
    5
];

functionObject_split = function(x) {
    var i = Math.floor(x);
    var f = MathUtils.scurve5(x - i);

    return {
        "i0": i + 0,
        "i1": i + 1,
        "f0": 1 - f,
        "f1": 0 + f
    };
};

functionObject_fractal1d = function(x, scale, octaves, persistance, lacunarity, type) {
    var result = 0;
    var amplitude = 1;
    var normalizer = 0;

    for (var i = 0; i < octaves; i++) {
        result += amplitude * type.evaluate1d(x, scale);
        normalizer += amplitude;
        amplitude *= persistance;
        x *= lacunarity;
    }

    return result / normalizer;
};

functionObject_fractal2d = function(x, y, scale, octaves, persistance, lacunarity, type) {
    var result = 0;
    var amplitude = 1;
    var normalizer = 0;

    for (var i = 0; i < octaves; i++) {
        result += amplitude * type.evaluate2d(x, y, scale);
        normalizer += amplitude;
        amplitude *= persistance;
        x *= lacunarity;
        y *= lacunarity;
    }

    return result / normalizer;
};

functionObject_fractal3d = function(x, y, z, scale, octaves, persistance, lacunarity, type) {
    var result = 0;
    var amplitude = 1;
    var normalizer = 0;

    for (var i = 0; i < octaves; i++) {
        result += amplitude * type.evaluate3d(x, y, z, scale);
        normalizer += amplitude;
        amplitude *= persistance;
        x *= lacunarity;
        y *= lacunarity;
        z *= lacunarity;
    }

    return result / normalizer;
};

functionObject_fractal4d = function(x, y, z, w, scale, octaves, persistance, lacunarity, type) {
    var result = 0;
    var amplitude = 1;
    var normalizer = 0;

    for (var i = 0; i < octaves; i++) {
        result += amplitude * type.evaluate4d(x, y, z, w, scale);
        normalizer += amplitude;
        amplitude *= persistance;
        x *= lacunarity;
        y *= lacunarity;
        z *= lacunarity;
        w *= lacunarity;
    }

    return result / normalizer;
};

export { functionObject_shifter as shifter, functionObject_split as split };
