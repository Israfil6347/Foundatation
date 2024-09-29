<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Notice\StoreNoticeRequest;
use App\Http\Resources\Notices\NoticesCollection;
use App\Http\Resources\Notices\NoticesResource;
use App\Service\NoticesService;
use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminNoticeController extends Controller
{

       protected $noticesService;

    public function __construct(NoticesService $NoticesService)
    {
        $this->noticesService = $NoticesService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        

        $perPage = request()->filled('per_page') ? request()->query('per_page') : 10;
        $searchText = request()->filled('search_text') ? request()->query('search_text') : '';
        $pages= NoticesCollection::collection($this->noticesService->all($perPage, $searchText))->additional([
            'createNew' => Auth::user()?->role === 'Super Admin' ? new LinkObject("create", "Create Notice", route('adminNotices.create'), "GET") : null,
        ]);
        return Inertia::render('Admin/Notices/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Notices/PageCreateView', [
        'Page' => Auth::user()?->role === 'Super Admin' 
                ? new LinkObject("index", "Pages", route('adminNotices.index'), "GET", 'fa-solid fa-list-ul') 
                : null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNoticeRequest $request)
    {
        $validatedData = $request->validated();
        $result =new NoticesResource($this->noticesService->createPage($validatedData));

        if ($result['status'] === 'error') {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route('adminNotices.index')->with('message', $result['message']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $page = $this->noticesService->getPage($id);
        $pageView = new NoticesResource($page);
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
        $pageData = new NoticesResource($this->noticesService->getPage($id));    
        $pageData->additional([
            'update' => Auth::user()?->role === 'Super Admin' ? new LinkObject(
                "update", 
                "Update Page", 
                "", 
                ""
            ) : null,
        ]); 

        return Inertia::render('Admin/Pages/PageUpdateView', [
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

        $this->noticesService->updatePage($request, $id);

        return redirect()->route('adminNotices.edit', $id)
                         ->with('message', 'Page updated successfully');
        } catch (\Exception $e) {
            
            return redirect()->route('adminNotices.index')
                            ->with('error', 'Failed to update page: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        try {
             $this->noticesService->deletePage($id);

            return redirect()->route('adminNotices.index')
                         ->with('message', 'Page deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminNotices.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }
     public function removeImage(string $id){

        try {
             $this->noticesService->removeImage($id);
            return redirect()->route('adminNotices.edit', $id)
                         ->with('message', 'image remove successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminNotices.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }

    }

    public function updateDraftStatus($id)
    {
         try {
            new NoticesResource($this->noticesService->updateDraftStatus($id));

            return redirect()->route('adminNotices.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminNotices.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }
    public function updatePublishStatus($id){

        try {
            new NoticesResource($this->noticesService->updatePublishStatus($id));

            return redirect()->route('adminNotices.index')
                         ->with('message', 'Page Draft successfully');
        } catch (\Exception $e) {
            return redirect()->route('adminNotices.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }
        public function getAllPost()
    {
        return NoticesCollection::collection($this->noticesService->getAllPost());
    }
}
