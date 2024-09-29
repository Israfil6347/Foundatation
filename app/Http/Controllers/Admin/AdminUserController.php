<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserRequest;
use App\Http\Resources\user\UserCollection;
use App\Http\Resources\user\UserResource;
use App\Service\UsersService;
use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    protected $userService;

    public function __construct(UsersService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    
        $perPage = request()->filled('per_page') ? request()->query('per_page') : 10;
        $searchText = request()->filled('search_text') ? request()->query('search_text') : '';
        $pages= UserCollection::collection($this->userService->all($perPage, $searchText))->additional([
            'createNew' => Auth::user()?->role === 'Super Admin' ? new LinkObject("create", "Create New", route('users.create'), "GET") : null,
        ]);
        return Inertia::render('Admin/Users/Index', [
            'pages' => $pages,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
         return Inertia::render('Admin/Users/PageCreateView', [
        'Page' => Auth::user()?->role === 'Super Admin' 
                ? new LinkObject("index", "Pages", route('users.index'), "GET", 'fa-solid fa-list-ul') 
                : null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $validatedData = $request->validated();

        $result =new UserResource($this->userService->store($validatedData));

        if ($result->status === 'error') {
            return redirect()->back()->with('error', $result->message);
        }
        return redirect()->route('users.index')->with('message', $result->message);
        
        // return new UserResource($this->userService->store($request));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        $page = $this->userService->getPage($id);
        $pageView = new UserResource($page);
        return Inertia::render('Admin/Users/PageView', [
            'pageView' => $pageView,
        ]);

     
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $pageData = new UserResource($this->userService->getPage($id));    
        $pageData->additional([
            'update' => Auth::user()?->role === 'Super Admin' ? new LinkObject(
                "update", 
                "Update Page", 
                "", 
                ""
            ) : null,
        ]); 

        return Inertia::render('Admin/Users/PageUpdateView', [
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
        // dd($request);

         try {

        $this->userService->updatePage($request, $id);

        return redirect()->route('users.edit', $id)
                         ->with('message', 'Page updated successfully');
        } catch (\Exception $e) {
            
            return redirect()->route('users.index')
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
             $this->userService->deletePage($id);

            return redirect()->route('users.index')
                         ->with('message', 'Page deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('users.index')
                            ->with('error', 'Failed to delete page: ' . $e->getMessage());
        }
    }

    public function updateUserActiveStatus($id)
    {
        try {
            new UserCollection($this->userService->updateUserActiveStatus($id));

            return redirect()->route('users.index')
                         ->with('message', 'user update successfully');
        } catch (\Exception $e) {
            return redirect()->route('users.index')
                            ->with('error', 'Failed to update page: ' . $e->getMessage());
        }
    }
}
