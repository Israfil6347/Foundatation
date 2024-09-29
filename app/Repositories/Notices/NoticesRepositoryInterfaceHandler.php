<?php

namespace App\Repositories\Notices;

use App\Models\Notice;


class NoticesRepositoryInterfaceHandler implements  NoticesRepositoryInterface
{
    public function findBySlug(string $slug)
    {
        return Notice::where('slug', $slug)->first();
    }

    public function create(array $data)
    {
        return Notice::create($data);
    }

    public function all($perPage=5, $searchText){
        
        return Notice::orderBy('order', 'ASC')->paginate($perPage);
    }
    public function getPage(string $id){

        return Notice::find($id);
    }

    public function updatePage($data, $id){
        
        $updatePage = Notice::find($id);

        if ($updatePage === null) {
            throw new \Exception("Page not found");
        }

        $updatePage->title = $data["title"];
        $updatePage->slug = $data["slug"];
        $updatePage->subtitle = $data["subtitle"];
        $updatePage->body = $data["body"];
        $updatePage->order = $data["order"];
        $updatePage->publish_status = "Draft";
        $updatePage->attachment_url = $data["attachment_url"];
        $updatePage->attachment_path = $data["attachment_path"];
        $updatePage->attachment_name = $data["attachment_name"];
        $updatePage->attachment_mime= $data["attachment_mime"];
        
       return $updatePage->save();
    }
    public function deletePage($id){
      $page = Notice::find($id);
        if (!$page) {
            throw new \Exception('Page not found.');
        }
       return  $page->delete();
    }
    public function updateDraftStatus($id){

        $post = Notice::findOrFail($id);

        $post->publish_status = "Draft";

        $post->update();

        return $post;
        
    }

    public function updatePublishStatus($id){

        $post = Notice::findOrFail($id);

        $post->publish_status = "Published";

        $post->update();

        return $post;
    }

    public function removeImage($id){
            $page = Notice::find($id);
            if ($page && $page->attachment_name) {
        
            $imagePath = public_path('attachments/' . $page->attachment_name);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            $page->attachment_url = '';
            $page->attachment_path = '';
            $page->attachment_name = '';
            $page->attachment_mime = '';
            $page->save();
        }

    }

    public function getAllPost(){
        
        $posts = Notice::where('publish_status', 'Published')
                   ->orderBy('created_at', 'desc')
                   ->get();
        
       return $posts ;
    }
}
