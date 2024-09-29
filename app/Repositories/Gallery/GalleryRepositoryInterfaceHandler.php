<?php

namespace App\Repositories\Gallery;

use App\Models\Gallery;
use App\Models\GalleryAttachment;

class GalleryRepositoryInterfaceHandler implements  GalleryRepositoryInterface
{
     public function all($perPage=5, $searchText){
        
        return Gallery::orderBy('order', 'ASC')->paginate($perPage);
     }

     public function findBySlug(string $slug)
    {
        return Gallery::where('slug', $slug)->first();
    }

     public function create(array $data)
    {
      
        return Gallery::create($data);
    }
    public function getPage(string $id){

        return Gallery::find(id: $id);
    }
    public function updatePage($data, $id){
        
        $updatePage = Gallery::find($id);
        if ($updatePage === null) {
            throw new \Exception("Page not found");
        }
        $updatePage->title = $data["title"];
        $updatePage->slug = $data["slug"];
        $updatePage->subtitle = $data["subtitle"];
        $updatePage->order = $data["order"];
        $updatePage->publish_status = "Draft";
        $updatePage->attachment_url = $data["attachment_url"];
        $updatePage->attachment_path = $data["attachment_path"];
        $updatePage->attachment_name = $data["attachment_name"];
        $updatePage->attachment_mime= $data["attachment_mime"];
        // dd($updatePage);
        return $updatePage->save();
    }

    public function deletePage($id){
      $page = Gallery::find($id);
        if (!$page) {
            throw new \Exception('Page not found.');
        }
       return  $page->delete();
    }

      public function updateDraftStatus($id){

        $post = Gallery::findOrFail($id);

        $post->publish_status = "Draft";

        $post->update();

        return $post;
        
    }

    public function updatePublishStatus($id){

        $post = Gallery::findOrFail($id);

        $post->publish_status = "Published";

        $post->update();

        return $post;
    }

    public function createGalleryImage ($data){
        return GalleryAttachment::create(attributes: $data);
    }

    public function deleteGalleryImagePage($id){
        $galleryAttachment = GalleryAttachment::find($id);
          if (!$galleryAttachment) {
            throw new \Exception('Page not found.');
        }
       return  $galleryAttachment->delete();

    }

    public function allGallery(){
        
        return Gallery::where('publish_status', 'Published')->get();
    }

}
