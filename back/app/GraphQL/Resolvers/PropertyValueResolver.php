<?php

namespace App\GraphQL\Resolvers;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PropertyValueResolver
{
    public function getValue($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): array
    {
        // Пример возврата строкового значения
        return [
            '__typename' => 'StringType',
            'value' => 'Это строка',
        ];

        /*// Пример возврата числового значения
        return [
            '__typename' => 'IntType',
            'value' => 42,
        ];

        //Пример возврата булевого значения
        return [
            '__typename' => 'BooleanType',
            'value' => true,
        ];*/
    }
}
