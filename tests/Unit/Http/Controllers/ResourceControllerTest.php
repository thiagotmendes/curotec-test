<?php

namespace Tests\Unit\Http\Controllers;

use App\Http\Controllers\ResourceController;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class ResourceControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    /** @test */
    public function it_can_list_resources_with_pagination()
    {
        // Create 15 resources
        Resource::factory()->count(15)->create();

        $response = $this->get(route('resources.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('resources/index')
            ->has('resources.data', 10) // Default pagination size
            ->has('resources.links')
            ->has('filters')
        );
    }

    /** @test */
    public function it_can_filter_resources_by_status()
    {
        // Create resources with different statuses
        Resource::factory()->create(['status' => 'active']);
        Resource::factory()->create(['status' => 'inactive']);
        Resource::factory()->create(['status' => 'pending']);

        $response = $this->get(route('resources.index', ['status' => 'active']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('resources/index')
            ->has('resources.data', 1)
            ->where('filters.status', 'active')
        );
    }

    /** @test */
    public function it_can_filter_resources_by_priority()
    {
        // Create resources with different priorities
        Resource::factory()->create(['priority' => 1]);
        Resource::factory()->create(['priority' => 2]);
        Resource::factory()->create(['priority' => 3]);

        $response = $this->get(route('resources.index', ['priority' => 1]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('resources/index')
            ->has('resources.data', 1)
            ->where('filters.priority', '1')
        );
    }

    /** @test */
    public function it_can_search_resources_by_name()
    {
        // Create resources with different names
        Resource::factory()->create(['name' => 'Development Server']);
        Resource::factory()->create(['name' => 'Production Server']);
        Resource::factory()->create(['name' => 'Test Server']);

        $response = $this->get(route('resources.index', ['search' => 'Development']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('resources/index')
            ->has('resources.data', 1)
            ->where('filters.search', 'Development')
        );
    }

    /** @test */
    public function it_can_create_a_new_resource()
    {
        $resourceData = [
            'name' => 'New Resource',
            'description' => 'Resource Description',
            'status' => 'active',
            'priority' => 1,
        ];

        $response = $this->post(route('resources.store'), $resourceData);

        $response->assertRedirect();
        $this->assertDatabaseHas('resources', $resourceData);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_resource()
    {
        $response = $this->post(route('resources.store'), []);

        $response->assertSessionHasErrors(['name', 'description', 'status', 'priority']);
    }

    /** @test */
    public function it_can_update_an_existing_resource()
    {
        $resource = Resource::factory()->create();
        $updateData = [
            'name' => 'Updated Resource',
            'description' => 'Updated Description',
            'status' => 'inactive',
            'priority' => 2,
        ];

        $response = $this->put(route('resources.update', $resource), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('resources', $updateData);
    }

    /** @test */
    public function it_validates_required_fields_when_updating_resource()
    {
        $resource = Resource::factory()->create();

        $response = $this->put(route('resources.update', $resource), []);

        $response->assertSessionHasErrors(['name', 'description', 'status', 'priority']);
    }

    /** @test */
    public function it_can_delete_a_resource()
    {
        $resource = Resource::factory()->create();

        $response = $this->delete(route('resources.destroy', $resource));

        $response->assertRedirect();
        $this->assertDatabaseMissing('resources', ['id' => $resource->id]);
    }

    /** @test */
    public function it_can_combine_filters()
    {
        // Create test resources
        Resource::factory()->create([
            'name' => 'Development Server',
            'status' => 'active',
            'priority' => 1
        ]);
        Resource::factory()->create([
            'name' => 'Production Server',
            'status' => 'active',
            'priority' => 2
        ]);
        Resource::factory()->create([
            'name' => 'Test Server',
            'status' => 'inactive',
            'priority' => 1
        ]);

        $response = $this->get(route('resources.index', [
            'status' => 'active',
            'priority' => 1,
            'search' => 'Development'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('resources/index')
            ->has('resources.data', 1)
            ->where('filters.status', 'active')
            ->where('filters.priority', '1')
            ->where('filters.search', 'Development')
        );
    }
} 