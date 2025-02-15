<?php

namespace App\Contracts;

trait ImportHelper {
    function transliterate($text): string
    {
        $transliteration = [
            'á' => 'a', 'Á' => 'A',
            'é' => 'e', 'É' => 'E',
            'í' => 'i', 'Í' => 'I',
            'ó' => 'o', 'Ó' => 'O',
            'ú' => 'u', 'Ú' => 'U',
            'ü' => 'u', 'Ü' => 'U',
            'ñ' => 'n', 'Ñ' => 'N'
        ];

        return strtr($text, $transliteration);
    }
}
