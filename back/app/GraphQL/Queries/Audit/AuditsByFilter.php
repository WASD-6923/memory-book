<?php

namespace App\GraphQL\Queries\Audit;

use App\Models\Share\AuditModel;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final readonly class AuditsByFilter
{
    public function __invoke(
        null $_,
        array $args,
        GraphQLContext $context,
        ResolveInfo $resolveInfo
    ): LengthAwarePaginator {
        return AuditModel::query()->filter($args['filter'])->sort($args)->paginate(
            perPage: $args['first'],
            page: $args['page']
        );
    }
}
