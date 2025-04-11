<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('status');
        $priority = $request->query('priority');
        $search = $request->query('search');

        $resources = Resource::query()
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->status($status)
            ->priority($priority)
            ->orderBy('priority', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('resources/index', [
            'resources' => $resources,
            'filters' => [
                'status' => $status,
                'priority' => $priority,
                'search' => $search,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:active,inactive,pending',
            'priority' => 'required|integer|min:1|max:3',
        ]);

        Resource::create($validated);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:active,inactive,pending',
            'priority' => 'required|integer|min:1|max:3',
        ]);

        $resource->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resource $resource)
    {
        $resource->delete();

        return redirect()->back();
    }
}
