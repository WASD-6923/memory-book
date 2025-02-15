<?php

return [
    'user' => [
        'validation' => [
            0 => [
                'mime' => 'file|max:50000',
                'multi' => false,
            ],
        ],
    ],
    'realty' => [
        'validation' => [
            0 => [
                'mime' => 'file|max:50000',
                'multi' => true,
            ],
            1 => [
                'mime' => 'file|max:50000',
                'multi' => true,
            ],
        ],
    ],
    'realtyProperty' => [
        'validation' => [
            // Photos
            0 => [
                'mime' => 'file|max:50000',
                'multi' => true,
            ],
            // Documents
            1 => [
                'mime' => 'file|max:50000',
                'multi' => true,
            ],
        ],
    ],
    'applicationSampleDocument' => [
        'validation' => [
            0 => [
                'mime' => 'file|max:50000',
                'multi' => true,
            ],
        ],
    ],
    'applicationDocument' => [
        'validation' => [
            0 => [
                'mime' => 'file|max:50000',
                'multi' => true,
            ],
        ],
    ],
];
