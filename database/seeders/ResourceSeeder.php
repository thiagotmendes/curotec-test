<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $resources = [
            [
                'name' => 'Development Server',
                'description' => 'Main development server for the team',
                'status' => 'active',
                'priority' => 1,
            ],
            [
                'name' => 'Production Database',
                'description' => 'Primary production database server',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Backup System',
                'description' => 'Automated backup system for all servers',
                'status' => 'pending',
                'priority' => 3,
            ],
            [
                'name' => 'Load Balancer',
                'description' => 'Distributes traffic across multiple servers',
                'status' => 'inactive',
                'priority' => 2,
            ],
            [
                'name' => 'Monitoring System',
                'description' => 'System health monitoring and alerting',
                'status' => 'active',
                'priority' => 1,
            ],
        ];

        foreach ($resources as $resource) {
            Resource::create($resource);
        }
    }
} 