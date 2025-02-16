<?php

namespace Database\Seeders;

use App\Models\Share\Permission;
use App\Models\Share\Role;
use App\Models\Share\RoleHasPermission;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::query()->truncate();
        RoleHasPermission::query()->truncate();
        $permissions = [
            // Общие
            'menuDashboard',
            'dashboard',

            'menuAdminGroups',
            'menuAdminDaily',
            'menuAdminUsers',
            'menuAdminProfiles',
            'menuAdminRoles',

            'menuAdminPeoples',

            'adminPeoples',
            'adminPeopleUpdate',
            'adminPeopleView',
            'adminPeopleCreate',
        ];

        foreach ($permissions as $permission) {
            Permission::query()->create(['name' => $permission]);
        }

        $moderatorRole = Role::query()->where('name', 'moderator')->first();
        $moderatorRole->givePermissionTo(
            [
                'dashboard',
                'menuDashboard',
                'menuAdminPeoples',

                'adminPeoples',
                'adminPeopleUpdate',
                'adminPeopleView',
                'adminPeopleCreate',
            ],
        );
    }
}
