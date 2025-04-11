<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * It was possible to use the faker library to generate the data, but I wanted to have some data to work with.
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
            [
                'name' => 'CDN Network',
                'description' => 'Content Delivery Network for global distribution',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Firewall System',
                'description' => 'Network security and traffic filtering',
                'status' => 'active',
                'priority' => 1,
            ],
            [
                'name' => 'CI/CD Pipeline',
                'description' => 'Continuous Integration and Deployment system',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Log Management',
                'description' => 'Centralized log collection and analysis',
                'status' => 'pending',
                'priority' => 3,
            ],
            [
                'name' => 'DNS Servers',
                'description' => 'Domain Name System infrastructure',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Cache Servers',
                'description' => 'Distributed caching system',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Email Servers',
                'description' => 'Corporate email infrastructure',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'VPN Gateway',
                'description' => 'Secure remote access solution',
                'status' => 'active',
                'priority' => 1,
            ],
            [
                'name' => 'Storage System',
                'description' => 'Network attached storage for file sharing',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'API Gateway',
                'description' => 'API management and routing system',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Message Queue',
                'description' => 'Asynchronous message processing system',
                'status' => 'pending',
                'priority' => 3,
            ],
            [
                'name' => 'Container Registry',
                'description' => 'Docker image storage and distribution',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Identity Provider',
                'description' => 'Single sign-on and authentication service',
                'status' => 'active',
                'priority' => 1,
            ],
            [
                'name' => 'Analytics Engine',
                'description' => 'Data processing and analytics platform',
                'status' => 'pending',
                'priority' => 3,
            ],
            [
                'name' => 'Search Engine',
                'description' => 'Full-text search and indexing service',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Web Servers',
                'description' => 'Apache/Nginx web server cluster',
                'status' => 'active',
                'priority' => 1,
            ],
            [
                'name' => 'Configuration Management',
                'description' => 'Infrastructure as code management',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Disaster Recovery',
                'description' => 'Backup and recovery procedures',
                'status' => 'pending',
                'priority' => 3,
            ],
            [
                'name' => 'Security Scanner',
                'description' => 'Vulnerability assessment tool',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Documentation Server',
                'description' => 'Technical documentation platform',
                'status' => 'active',
                'priority' => 3,
            ],
            [
                'name' => 'Testing Environment',
                'description' => 'QA and testing infrastructure',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Asset Management',
                'description' => 'IT asset tracking system',
                'status' => 'pending',
                'priority' => 3,
            ],
            [
                'name' => 'Network Monitoring',
                'description' => 'Network performance monitoring',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Backup Storage',
                'description' => 'Long-term backup storage system',
                'status' => 'active',
                'priority' => 2,
            ],
            [
                'name' => 'Compliance System',
                'description' => 'Regulatory compliance management',
                'status' => 'pending',
                'priority' => 3,
            ],
        ];

        foreach ($resources as $resource) {
            Resource::create($resource);
        }
    }
} 