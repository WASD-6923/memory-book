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

            // Собрания
            'menuAdminMeetings',
            'adminMeetings',
            'adminMeetingUpdate',
            'adminMeetingCreate',
            'meetingCreate',
            'meetingUpdate',
            'meetingDelete',

            // Новичики
            'menuAdminNewcomers',
            'adminNewcomers',
            'adminNewcomerCreate',
            'adminNewcomerUpdate',
            'newcomerCreate',
            'newcomerUpdate',
            'newcomerDelete',

            // Казначей
            'menuAdminTreasurer',
            'adminTreasurer',



            // библиотекарь
            'menuAdminLibrarian',
            'adminBooks',
            'adminBookCreate',
            'adminBookUpdate',
            'bookCreate',
            'bookUpdate',
            'bookDelete',

            // Продвижение
            'menuAdminLocations',
            'adminLocations',
            'adminLocationCreate',
            'adminLocationUpdate',
            'adminLocationDelete',
            'locationCreate',
            'locationUpdate',
            'locationDelete',

            'menuAdminLocationEvents',
            'adminLocationEvents',
            'adminLocationEventCreate',
            'adminLocationEventUpdate',
            'adminLocationEventDelete',
            'locationEventCreate',
            'locationEventUpdate',
            'locationEventDelete',



            'menuAdminGroups',
            'menuAdminDaily',
            'menuAdminUsers',
            'menuAdminProfiles',
            'menuAdminRoles',
            'adminGroups',
            'adminGroupCreate',
            'adminGroupUpdate',




        ];

        foreach ($permissions as $permission) {
            Permission::query()->create(['name' => $permission]);
        }


        // Председатель группы
        $chairpersonRole = Role::query()->where('name', 'chairperson')->first();
        $chairpersonRole->givePermissionTo(
            [
                'dashboard',
                'menuDashboard',
                'menuAdminMeetings',

                'adminMeetings',
                'adminMeetingUpdate',
                'adminMeetingCreate',
                'meetingCreate',
                'meetingUpdate',
                'meetingDelete',
            ],
        );

        $treasurerRole = Role::query()->where('name', 'treasurer')->first();
        $treasurerRole->givePermissionTo(
            ['dashboard', 'menuDashboard', 'menuAdminTreasurer', 'meetingCreate', 'meetingUpdate'],
        );

        // ПГО
        $groupRepresentativeRole = Role::query()->where('name', 'group_representative')->first();
        $groupRepresentativeRole->givePermissionTo(
            ['dashboard', 'menuDashboard', 'menuAdminMeetings', 'meetingCreate', 'meetingUpdate'],
        );

        // Куратор новичков
        $newcomersCurator = Role::query()->where('name', 'newcomers_curator')->first();
        if (!$newcomersCurator) {
            $newcomersCurator = Role::create(['name' => 'newcomers_curator', 'title' => 'Куратор новичков']);
        }
        $newcomersCurator->givePermissionTo(
            [
                'menuDashboard',
                'menuAdminNewcomers',
                'dashboard',
                'adminNewcomers',
                'adminNewcomerCreate',
                'adminNewcomerUpdate',
                'newcomerCreate',
                'newcomerUpdate',
                'newcomerDelete',
            ],
        );

        // библиотекарь
        $librarian = Role::query()->where('name', 'librarian')->first();
        if (!$librarian) {
            $librarian = Role::create(['name' => 'librarian', 'title' => 'Библиотекарь']);
        }
        $librarian->givePermissionTo(
            [
                'menuDashboard',
                'dashboard',

                'menuAdminLibrarian',
                'adminBooks',
                'adminBookCreate',
                'adminBookUpdate',
                'bookCreate',
                'bookUpdate',
                'bookDelete',
            ],
        );

        $medicalCommitteeChair = Role::query()->where('name', 'medical_committee_chair')->first();
        if (!$medicalCommitteeChair) {
            $medicalCommitteeChair = Role::create(['name' => 'medical_committee_chair', 'title' => 'Председатель КЛУ']);
        }
        $medicalCommitteeChair->givePermissionTo(
            [
                'menuDashboard',
                'dashboard',

                'menuAdminLocations',
                'adminLocations',
                'adminLocationCreate',
                'adminLocationUpdate',
                'adminLocationDelete',
                'locationCreate',
                'locationUpdate',
                'locationDelete',

                'menuAdminLocationEvents',
                'adminLocationEvents',
                'adminLocationEventCreate',
                'adminLocationEventUpdate',
                'adminLocationEventDelete',
                'locationEventCreate',
                'locationEventUpdate',
                'locationEventDelete',
            ],
        );
    }
}
