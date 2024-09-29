<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminDonate;
use App\Models\Gallery;
use App\Models\Notice;
use App\Models\Page;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Response;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $res = array(

            "publishedPages" => Page::where('publish_status', 'Published')->count(),
            "draftPages" => Page::where('publish_status', 'Draft')->count(),

            "publishedNotices" => Notice::where('publish_status', 'Published')->count(),
            "draftNotices" => Notice::where('publish_status', 'Draft')->count(),

            "publishedDonate" => AdminDonate::where('publish_status', 'Published')->count(),
            "draftDonate" => AdminDonate::where('publish_status', 'Draft')->count(),

            "publishedPublication" => Publication::where('publish_status', 'Published')->count(),
            "draftPublication" => Publication::where('publish_status', 'Draft')->count(),

            "publishedGallery" => Gallery::where('publish_status', 'Published')->count(),
            "draftGallery" => Gallery::where('publish_status', 'Draft')->count(),

            "publishedUsers" => User::where('status', 0)->count(),
            "draftUsers" => User::where('status', 1)->count(),
    
        );
        return response()->json([
            "data" => $res,
            "message" => 'Success',
            'errors' => null,
        ], Response::HTTP_OK);
    }
    
}
