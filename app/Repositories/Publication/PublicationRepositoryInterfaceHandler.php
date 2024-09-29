<?php

namespace App\Repositories\Publication;

use App\Models\Publication;

class PublicationRepositoryInterfaceHandler implements PublicationRepositoryInterface
{


    public function findBySlug(string $slug)
    {
        return Publication::where('slug', $slug)->first();
    }

    public function create(array $data)
    {
        return Publication::create($data);
    }
    public function all($perPage=5, $searchText){
        
        return Publication::orderBy('order', 'ASC')->paginate($perPage);
    }

      public function getPage(string $id){

        return Publication::find($id);
    }
    public function updatePage($data, $id){
        
        $updatePage = Publication::find($id);

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
      $page = Publication::find($id);
        if (!$page) {
            throw new \Exception('Page not found.');
        }
       return  $page->delete();
    }

    public function updateDraftStatus($id){

        $post = Publication::findOrFail($id);

        $post->publish_status = "Draft";

        $post->update();

        return $post;
        
    }

    public function updatePublishStatus($id){

        $post = Publication::findOrFail($id);

        $post->publish_status = "Published";

        $post->update();

        return $post;
    }

    public function allPublication(){
       return Publication::where('publish_status', 'Published')->get();
    }
}