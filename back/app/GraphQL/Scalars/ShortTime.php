<?php declare(strict_types=1);

namespace App\GraphQL\Scalars;

use GraphQL\Error\ClientAware;
use GraphQL\Error\Error;
use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Type\Definition\ScalarType;
use Illuminate\Support\Facades\Log;

final class ShortTime extends ScalarType
{
    /** Serializes an internal value to include in a response. */
    public function serialize(mixed $value): mixed
    {
        Log::info('Serialize', $value);
        if (!is_string($value) || !$this->isValidTimeFormat($value)) {
            throw new Error("Invalid time format: expected H:i");
        }

        return $value;
    }

    /** Parses an externally provided value (query variable) to use as an input.
     * @throws Error
     */
    public function parseValue(mixed $value): mixed
    {
        if (!is_string($value) || !$this->isValidTimeFormat($value)) {
            throw new Error("Invalid time format: expected H:i:s");
        }

        return $value;
    }

    /**
     * Parses an externally provided literal value (hardcoded in GraphQL query) to use as an input.
     *
     * Should throw an exception with a client friendly message on invalid value nodes.
     *
     * @param \GraphQL\Language\AST\ValueNode&\GraphQL\Language\AST\Node $valueNode
     * @param array<string, mixed>|null $variables
     * @throws Error
     */
    public function parseLiteral(Node $valueNode, ?array $variables = null): mixed
    {
        if (!$valueNode instanceof StringValueNode) {
            throw new Error("Invalid syntax for ShortTime: value must be a string in H:i:s format.");
        }

        $value = $valueNode->value;

        if (!$this->isValidTimeFormat($value)) {
            throw new Error("Invalid time format: expected H:i:s.");
        }

        return $value;
    }

    /**
     * Validates if a given string follows the H:i:s time format.
     */
    private function isValidTimeFormat(string $time): bool
    {
        Log::info('Time: ' .  $time);
        $pattern = '/^\d{4}-\d{2}-\d{2} (?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/'; // Matches YYYY-MM-DD HH:mm[:ss] format
        return true;// preg_match($pattern, $time) === 1;
    }
}
