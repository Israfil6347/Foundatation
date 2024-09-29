<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Publication\PublicationStoreRequest;
use App\Http\Resources\Publication\AdminPublicationCollection;
use App\Http\Resources\Publication\AdminPublicationResource;
use App\Service\PublicationService;
use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminPublicationController extends Controller
{

    protected $publicationService;

    public function __construct(PublicationService $publicationService)
    {
        $this->publicationService = $publicationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $perPage = request()->filled('per_page') ? request()->query('per_page') : 10;
        $searchText = request()->filled('search_text') ? request()->query('search_text') : '';
        $pages= AdminPublicationCollection::collection($this->publicationService->all($perPage, $searchText))->additional([
            'createNew' => Auth::user()?->role === 'Super Admin' ? new LinkObject("create", "Create New", route('adminPublication.create'), "GET") : null,
        ]);
        return Inertia::render('Admin/Publication/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

        return Inertia::render('Admin/Publication/PageCreateView', [
        'Page' => Auth::user()?->role === 'Super Admin' 
                ? new LinkObject("index", "Pages", route('adminPublication.index'), "GET", 'fa-solid fa-list-ul') 
                : null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PublicationStoreRequest $request)
    {
     
        $validatedData = $request->validated();
        $result =new AdminPublicationResource($this->publicationService->createPage($validatedData));

        if ($result['status'] === 'error') {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route('adminPublication.index')->with('message', $result['message']);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $page = $this->publicationService->getPage($id);
        $pageView = new AdminPublicationResource($page);
        return Inertia::render('Admin/Pages/PageView', [
            'pageView' => $pageView,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $pageData = new AdminPublicationResource($this->publicationService->getPage($id));    
        $pageData->additional([
            'update' => Auth::user()?->role === 'Super Admin' ? new LinkObject(
                "update", 
                "Update Page", 
                "", 
                ""
            ) : null,
        ]); 

        return Inertia::render('Admin/Publication/PageUpdateView', [
            'pageView' => $pageData,
            "id"=> $id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

 
         try {

        $this->publicationService->updatePage($request, $id);

        return redirect()->route('adminPublication.edit', $id)
                         ->with('message', 'Page updated successfully');
        } catch (\Exception $e) {
            
            return redirect()->route('adminPublication.index')
                            ->with('error', 'Failed to update page: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        try {
             $this->publicationService->deletePage($id);

            return redirect()->route('adminPublication.index')
                         ->with('message', 'Page deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminPublication.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

     public function updateDraftStatus($id)
    {
         try {
            new AdminPublicationResource($this->publicationService->updateDraftStatus($id));

            return redirect()->route('adminPublication.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminPublication.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

    public function updatePublishStatus($id){

        try {
            new AdminPublicationResource($this->publicationService->updatePublishStatus($id));

            return redirect()->route('adminPublication.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminPublication.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }
}
