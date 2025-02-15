<?php
namespace App\GraphQL\Resolvers;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class QueryResolver
{
    public function getValue($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): array
    {
        // Пример возврата строкового значения
        return [
            'value' => [
                '__typename' => 'StringValue',
                'value' => 'Это строка'
            ]
        ];

        // Пример возврата числового значения
        // return [
        //     'value' => [
        //         '__typename' => 'IntValue',
        //         'value' => 42
        //     ]
        // ];

        // Пример возврата булевого значения
        // return [
        //     'value' => [
        //         '__typename' => 'BooleanValue',
        //         'value' => true
        //     ]
        // ];
    }
}
