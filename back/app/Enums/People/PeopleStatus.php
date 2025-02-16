<?php

namespace App\Enums\People;

enum PeopleStatus: int
{
    case DRAFT = 1;
    case PUBLISHED = 2;
    case DELETED = 3;
}
