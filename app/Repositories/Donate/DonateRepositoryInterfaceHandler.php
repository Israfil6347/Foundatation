<?php

namespace App\Repositories\Donate;

use App\Models\AdminDonate;
use App\Repositories\Donate\DonateRepositoryInterface;

class DonateRepositoryInterfaceHandler implements  DonateRepositoryInterface
{
    public function findBySlug(string $slug)
    {
        return AdminDonate::where('slug', $slug)->first();
    }

    public function create(array $data)
    {
        
        return AdminDonate::create($data);
    }

    public function all($perPage=5, $searchText){
        return AdminDonate::orderBy('order', 'ASC')->paginate($perPage);
    }
    public function getPage(string $id){

        return AdminDonate::find($id);
    }

    public function updatePage($data, $id){
        
        $updatePage = AdminDonate::find($id);

        if ($updatePage === null) {
            throw new \Exception("Page not found");
        }

        $updatePage->slug = $data["slug"];
        $updatePage->order = $data["order"];
        $updatePage->company_name = $data["company_name"];
        $updatePage->accounts_name = $data["accounts_name"];
        $updatePage->account_number = $data["account_number"];
        $updatePage->branch_name = "branch_name";       
       return $updatePage->save();
    }
    public function deletePage($id){
      $page = AdminDonate::find($id);
        if (!$page) {
            throw new \Exception('Page not found.');
        }
       return  $page->delete();
    }
    public function updateDraftStatus($id){

        $post = AdminDonate::findOrFail($id);

        $post->publish_status = "Draft";

        $post->update();

        return $post;
        
    }

    public function updatePublishStatus($id){

        $post = AdminDonate::findOrFail($id);

        $post->publish_status = "Published";

        $post->update();

        return $post;
    }

    public function removeImage($id){
        $page = AdminDonate::find($id);

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

    public function getAllDonateAccounts(){
        
        return AdminDonate::where('publish_status', 'Published')->get();
    }
}
