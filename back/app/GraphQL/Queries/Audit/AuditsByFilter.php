<?php

namespace App\GraphQL\Queries\Audit;

use App\Models\Share\Audit;
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
        return Audit::query()->filter($args['filter'])->sort($args)->paginate(
            perPage: $args['first'],
            page: $args['page']
        );
    }
}
